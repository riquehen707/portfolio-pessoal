import { services } from "@/resources/services";
import type {
  Benchmark,
  City,
  Client,
  DataClassification,
  DerivedReport,
  MetricTrace,
  ModelConstant,
  ProjectCoverageChartPoint,
  ProjectDashboardClassificationCounts,
  ProjectDashboardPrecision,
  ProjectDashboardSnapshot,
  ProjectProposalSummary,
  ProjectProposalTimelinePoint,
  ScenarioKey,
  Segment,
} from "@/domain/types";
import { resolveMetricWithTrace } from "@/domain/calculations/resolveMetric";

type SectionStats = Record<
  string,
  {
    total: number;
    real: number;
    confidenceSum: number;
  }
>;

type ProposalScopeConfig = {
  chartLabel: string;
  title: string;
  summary: string;
  investment: number;
  investmentLabel: string;
  timeline: string;
  ctaHref: string;
  ctaLabel: string;
  contactLift: number;
  bookingLift: number;
  showLift: number;
  saleLift: number;
  returnLift: number;
  authorityLift: number;
  googleLift: number;
  rampMultiplier: number;
  precisionPenalty: number;
};

type ProposalPotential = {
  config: ProposalScopeConfig;
  leads: number;
  bookings: number;
  shows: number;
  customers: number;
  monthlyRevenue: number;
  annualRevenue: number;
  netReturn: number;
  paybackMonths: number | null;
  roas: number;
  timeline: ProjectProposalTimelinePoint[];
};

const monthLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const seasonalityCurve = [0.97, 0.99, 1, 1.02, 1.04, 1.06, 1.05, 1.03, 1, 0.99, 0.97, 0.98];
const scenarioKeys: ScenarioKey[] = ["conservative", "realistic", "aggressive"];
const precisionMultipliers: Record<ScenarioKey, number> = {
  conservative: 0.99,
  realistic: 0.95,
  aggressive: 0.9,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function round(value: number) {
  return Math.round(value);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function parsePriceFloor(value: string) {
  const match = value.match(/R\$\s*([\d\.\,]+)/);

  if (!match) {
    return null;
  }

  const normalized = match[1].replace(/\./g, "").replace(",", ".");
  const parsedValue = Number(normalized);
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function inferCityProfile(city: City): Benchmark["cityProfile"] {
  if (city.population < 120000) return "small";
  if (city.population < 500000) return "medium";
  return "large";
}

function getGenderShare(city: City, segment: Segment) {
  if (segment.audienceProfile.primaryGender === "female") {
    return city.femaleRate;
  }

  if (segment.audienceProfile.primaryGender === "male") {
    return city.maleRate;
  }

  return 1;
}

function getAgeShare(city: City, segment: Segment) {
  const ranges = new Set(segment.audienceProfile.primaryAgeRanges);
  let share = 0;

  if (ranges.has("15-24") || ranges.has("18-24")) {
    share += city.ageDistribution.age15_24;
  }
  if (ranges.has("25-34")) {
    share += city.ageDistribution.age25_34;
  }
  if (ranges.has("35-44")) {
    share += city.ageDistribution.age35_44;
  }
  if (ranges.has("45-59")) {
    share += city.ageDistribution.age45_59;
  }
  if (ranges.has("60+") || ranges.has("60-plus")) {
    share += city.ageDistribution.age60Plus;
  }

  return clamp(share || 0.32, 0.08, 1);
}

function pushObservedScoreTrace(
  traces: MetricTrace[],
  sectionStats: SectionStats,
  key: string,
  label: string,
  section: string,
  value: number,
) {
  traces.push({
    key,
    label,
    section,
    value,
    classification: "real",
    sourceKind: "observed",
    sourceLabel: "Diagnostico manual do cliente",
    confidence: 0.94,
  });

  if (!sectionStats[section]) {
    sectionStats[section] = { total: 0, real: 0, confidenceSum: 0 };
  }

  sectionStats[section].total += 1;
  sectionStats[section].real += 1;
  sectionStats[section].confidenceSum += 0.94;
}

function registerTrace(traces: MetricTrace[], sectionStats: SectionStats, trace: MetricTrace) {
  traces.push(trace);

  if (!sectionStats[trace.section]) {
    sectionStats[trace.section] = { total: 0, real: 0, confidenceSum: 0 };
  }

  sectionStats[trace.section].total += 1;
  sectionStats[trace.section].confidenceSum += trace.confidence;

  if (trace.classification === "real") {
    sectionStats[trace.section].real += 1;
  }
}

function createDerivedTrace(
  key: string,
  label: string,
  section: string,
  value: number,
  sourceLabel: string,
): MetricTrace {
  return {
    key,
    label,
    section,
    value,
    classification: "projected",
    sourceKind: "derived",
    sourceLabel,
    confidence: 0.82,
  };
}

function countTraceClassifications(traces: MetricTrace[]): ProjectDashboardClassificationCounts {
  return traces.reduce<ProjectDashboardClassificationCounts>(
    (acc, trace) => {
      acc[trace.classification] += 1;
      return acc;
    },
    {
      real: 0,
      estimated: 0,
      projected: 0,
    },
  );
}

function buildPrecisionFromTraces(traces: MetricTrace[]): ProjectDashboardPrecision {
  const classificationCounts = countTraceClassifications(traces);
  const overallConfidence =
    traces.reduce((sum, item) => sum + item.confidence, 0) / Math.max(traces.length, 1);
  const coverage = classificationCounts.real / Math.max(traces.length, 1);
  const precisionOverall = clamp(overallConfidence * 0.62 + coverage * 0.38, 0.44, 0.97);

  return {
    overall: precisionOverall,
    coverage,
    conservative: clamp(precisionOverall * precisionMultipliers.conservative, 0.42, 0.97),
    realistic: clamp(precisionOverall * precisionMultipliers.realistic, 0.4, 0.94),
    aggressive: clamp(precisionOverall * precisionMultipliers.aggressive, 0.38, 0.9),
  };
}

function buildCoverageChartData(sectionStats: SectionStats): ProjectCoverageChartPoint[] {
  return Object.entries(sectionStats)
    .map(([section, stats]) => ({
      section,
      coverage: round((stats.real / Math.max(stats.total, 1)) * 100),
      confidence: round((stats.confidenceSum / Math.max(stats.total, 1)) * 100),
    }))
    .sort((a, b) => {
      if (a.coverage !== b.coverage) {
        return a.coverage - b.coverage;
      }

      if (a.confidence !== b.confidence) {
        return a.confidence - b.confidence;
      }

      return a.section.localeCompare(b.section);
    });
}

function dedupeStrings(items: string[], limit: number): string[] {
  const uniqueItems: string[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    const normalized = item.trim();

    if (!normalized || seen.has(normalized)) {
      continue;
    }

    seen.add(normalized);
    uniqueItems.push(normalized);

    if (uniqueItems.length >= limit) {
      break;
    }
  }

  return uniqueItems;
}

function getProposalChartLabel(title: string) {
  const normalizedTitle = title.toLowerCase();

  if (normalizedTitle.includes("sprint")) {
    return "Sprint";
  }

  if (normalizedTitle.includes("site")) {
    return "Site";
  }

  if (normalizedTitle.includes("landing")) {
    return "Landing";
  }

  return title.split(" ").slice(0, 2).join(" ");
}

function buildProposalScopeConfig(scope: {
  title: string;
  summary: string;
  investment: string;
  timeline: string;
}, ctaHref: string, ctaLabel: string): ProposalScopeConfig {
  const normalizedTitle = `${scope.title} ${scope.summary}`.toLowerCase();
  const investment = parsePriceFloor(scope.investment) ?? 0;

  if (normalizedTitle.includes("sprint") || normalizedTitle.includes("refino")) {
    return {
      chartLabel: "Sprint",
      title: scope.title,
      summary: scope.summary,
      investment,
      investmentLabel: scope.investment,
      timeline: scope.timeline,
      ctaHref,
      ctaLabel,
      contactLift: 0.14,
      bookingLift: 0.08,
      showLift: 0.03,
      saleLift: 0.04,
      returnLift: 0.02,
      authorityLift: 0.06,
      googleLift: 0.03,
      rampMultiplier: 0.92,
      precisionPenalty: 0.01,
    };
  }

  if (normalizedTitle.includes("site")) {
    return {
      chartLabel: "Site",
      title: scope.title,
      summary: scope.summary,
      investment,
      investmentLabel: scope.investment,
      timeline: scope.timeline,
      ctaHref,
      ctaLabel,
      contactLift: 0.28,
      bookingLift: 0.14,
      showLift: 0.06,
      saleLift: 0.08,
      returnLift: 0.05,
      authorityLift: 0.16,
      googleLift: 0.1,
      rampMultiplier: 0.82,
      precisionPenalty: 0.08,
    };
  }

  return {
    chartLabel: "Landing",
    title: scope.title,
    summary: scope.summary,
    investment,
    investmentLabel: scope.investment,
    timeline: scope.timeline,
    ctaHref,
    ctaLabel,
    contactLift: 0.22,
    bookingLift: 0.12,
    showLift: 0.05,
    saleLift: 0.07,
    returnLift: 0.03,
    authorityLift: 0.12,
    googleLift: 0.06,
    rampMultiplier: 0.87,
    precisionPenalty: 0.04,
  };
}

function buildProposalTimelineSeries(params: {
  investment: number;
  monthlyReturnPotential: number;
  incrementalCustomersPotential: number;
  rampMultiplier: number;
}): ProjectProposalTimelinePoint[] {
  const { investment, monthlyReturnPotential, incrementalCustomersPotential, rampMultiplier } = params;

  let cumulativeReturn = 0;
  let cumulativeCustomers = 0;

  return monthLabels.map((month, index) => {
    const progress = (index + 1) / monthLabels.length;
    const eased = progress * progress * (3 - 2 * progress);
    const seasonalFactor = seasonalityCurve[index];
    const realization = clamp((0.14 + eased * 0.96) * rampMultiplier * seasonalFactor, 0.1, 1.12);
    const monthlyReturn = monthlyReturnPotential * realization;
    const monthlyCustomers = incrementalCustomersPotential * realization;

    cumulativeReturn += monthlyReturn;
    cumulativeCustomers += monthlyCustomers;

    return {
      month,
      investment: index === 0 ? round(investment) : 0,
      monthlyReturn: round(monthlyReturn),
      cumulativeReturn: round(cumulativeReturn),
      netReturn: round(cumulativeReturn - investment),
      customers: round(cumulativeCustomers),
      roas: Number((cumulativeReturn / Math.max(investment, 1)).toFixed(2)),
    };
  });
}

function getSegmentProposalConfigs(segment: Segment): Record<ScenarioKey, ProposalScopeConfig> {
  const serviceSlug = segment.slug === "esthetic" ? "landing-page-para-estetica" : "websites-profissionais";
  const service =
    services.find((item) => item.slug === serviceSlug) ??
    services.find((item) => item.slug === "websites-profissionais") ??
    services[0];

  const rankedScopes = [...(service?.scopes ?? [])]
    .map((scope) => ({
      scope,
      investment: parsePriceFloor(scope.investment) ?? Number.MAX_SAFE_INTEGER,
    }))
    .sort((a, b) => a.investment - b.investment);

  const fallbackScope = rankedScopes[0]?.scope ?? {
    title: "Proposta inicial",
    summary: "Entrada enxuta para estruturar a captação.",
    investment: "A partir de R$ 1.000",
    timeline: "1 a 2 semanas",
  };

  const conservativeScope = rankedScopes[0]?.scope ?? fallbackScope;
  const realisticScope = rankedScopes[1]?.scope ?? rankedScopes[0]?.scope ?? fallbackScope;
  const aggressiveScope = rankedScopes[2]?.scope ?? rankedScopes[rankedScopes.length - 1]?.scope ?? fallbackScope;

  return {
    conservative: buildProposalScopeConfig(conservativeScope, service.hero.ctaHref, service.hero.ctaLabel),
    realistic: buildProposalScopeConfig(realisticScope, service.hero.ctaHref, service.hero.ctaLabel),
    aggressive: buildProposalScopeConfig(aggressiveScope, service.hero.ctaHref, service.hero.ctaLabel),
  };
}

export function createProjectDashboardSnapshot(params: {
  client: Client;
  city: City;
  segment: Segment;
  benchmark: Benchmark;
  modelConstant: ModelConstant;
}): ProjectDashboardSnapshot {
  const { client, city, segment, benchmark, modelConstant } = params;

  const traces: MetricTrace[] = [];
  const sectionStats: SectionStats = {};
  const benchmarkLabel = `${segment.name} • ${benchmark.cityProfile}`;

  const avgTicketResolved = resolveMetricWithTrace({
    key: "avg-ticket",
    label: "Ticket medio",
    section: "Comercial",
    observed: client.businessData.avgTicket,
    benchmark: segment.revenueProfile.typicalTicketMid,
    fallback: modelConstant.fallbackModel.defaultAvgTicket,
    benchmarkLabel: `Segmento: ${segment.name}`,
  });
  registerTrace(traces, sectionStats, avgTicketResolved.trace);
  const avgTicket = avgTicketResolved.value;

  const returnRateResolved = resolveMetricWithTrace({
    key: "return-rate",
    label: "Taxa de retorno",
    section: "Recorrencia",
    observed: client.businessData.returnRate,
    benchmark: benchmark.retention.returnRate,
    fallback: modelConstant.fallbackModel.defaultReturnRate,
    benchmarkLabel,
    benchmarkConfidence: benchmark.confidence,
  });
  registerTrace(traces, sectionStats, returnRateResolved.trace);
  const returnRate = clamp(returnRateResolved.value, 0.01, 0.95);

  const noShowRateResolved = resolveMetricWithTrace({
    key: "no-show-rate",
    label: "Taxa de no-show",
    section: "Funil",
    observed: client.businessData.noShowRate,
    benchmark: 1 - benchmark.funnel.bookingToShowRate,
    fallback: modelConstant.fallbackModel.defaultNoShowRate,
    benchmarkLabel,
    benchmarkConfidence: benchmark.confidence,
  });
  registerTrace(traces, sectionStats, noShowRateResolved.trace);
  const noShowRate = clamp(noShowRateResolved.value, 0.01, 0.45);

  const followersResolved = resolveMetricWithTrace({
    key: "followers",
    label: "Seguidores",
    section: "Instagram",
    observed: client.instagramData.followers,
    benchmark: null,
    fallback: 420,
    benchmarkLabel,
  });
  registerTrace(traces, sectionStats, followersResolved.trace);
  const followers = followersResolved.value;

  const monthlyReachResolved = resolveMetricWithTrace({
    key: "monthly-reach",
    label: "Alcance mensal",
    section: "Instagram",
    observed: client.instagramData.monthlyReach,
    benchmark: followers * 4.1,
    fallback: followers * 3.2,
    benchmarkLabel: "Estimativa a partir da base e do perfil do nicho",
    benchmarkConfidence: benchmark.confidence,
  });
  registerTrace(traces, sectionStats, monthlyReachResolved.trace);
  const monthlyReach = monthlyReachResolved.value;

  const monthlyEngagementResolved = resolveMetricWithTrace({
    key: "monthly-engagement",
    label: "Engajamento mensal",
    section: "Instagram",
    observed: client.instagramData.monthlyEngagement,
    benchmark: monthlyReach * benchmark.paidTraffic.avgCtr * 1.8,
    fallback: monthlyReach * 0.045,
    benchmarkLabel,
  });
  registerTrace(traces, sectionStats, monthlyEngagementResolved.trace);
  const monthlyEngagement = monthlyEngagementResolved.value;

  const profileVisitsResolved = resolveMetricWithTrace({
    key: "profile-visits",
    label: "Visitas ao perfil",
    section: "Instagram",
    observed: client.instagramData.profileVisits,
    benchmark: monthlyReach * benchmark.organic.profileVisitRate,
    fallback: monthlyReach * 0.06,
    benchmarkLabel,
  });
  registerTrace(traces, sectionStats, profileVisitsResolved.trace);
  const profileVisits = profileVisitsResolved.value;

  const linkClicksResolved = resolveMetricWithTrace({
    key: "link-clicks",
    label: "Cliques no link",
    section: "Instagram",
    observed: client.instagramData.linkClicks,
    benchmark: profileVisits * 0.22,
    fallback: profileVisits * 0.18,
    benchmarkLabel: "Estimativa do funil de perfil para clique",
  });
  registerTrace(traces, sectionStats, linkClicksResolved.trace);
  const linkClicks = linkClicksResolved.value;

  const messagesResolved = resolveMetricWithTrace({
    key: "messages",
    label: "Mensagens por mes",
    section: "Funil",
    observed: client.instagramData.messagesPerMonth,
    benchmark: linkClicks * 0.34,
    fallback: Math.max(6, linkClicks * 0.24),
    benchmarkLabel: "Estimativa do clique para conversa",
  });
  registerTrace(traces, sectionStats, messagesResolved.trace);
  const messagesPerMonth = messagesResolved.value;

  const followerGrowthResolved = resolveMetricWithTrace({
    key: "follower-growth",
    label: "Crescimento de seguidores",
    section: "Organico",
    observed: client.instagramData.followerGrowthRate,
    benchmark: benchmark.organic.followerGrowthRateBase,
    fallback: 0.018,
    benchmarkLabel,
    benchmarkConfidence: benchmark.confidence,
  });
  registerTrace(traces, sectionStats, followerGrowthResolved.trace);
  const followerGrowthRate = followerGrowthResolved.value;

  const reviewsResolved = resolveMetricWithTrace({
    key: "google-reviews",
    label: "Reviews Google",
    section: "Google local",
    observed: client.googleData.reviews,
    benchmark: null,
    fallback: 0,
    benchmarkLabel,
  });
  registerTrace(traces, sectionStats, reviewsResolved.trace);
  const reviews = reviewsResolved.value;

  const ratingResolved = resolveMetricWithTrace({
    key: "google-rating",
    label: "Nota Google",
    section: "Google local",
    observed: client.googleData.rating && client.googleData.rating > 0 ? client.googleData.rating : null,
    benchmark: null,
    fallback: reviews > 0 ? 4.6 : 0,
    benchmarkLabel,
  });
  registerTrace(traces, sectionStats, ratingResolved.trace);
  const rating = ratingResolved.value;

  const profileViewsResolved = resolveMetricWithTrace({
    key: "google-profile-views",
    label: "Visualizacoes Google",
    section: "Google local",
    observed: client.googleData.profileViews,
    benchmark: profileVisits * 0.58,
    fallback: 80,
    benchmarkLabel: "Estimativa do comportamento local no Google",
  });
  registerTrace(traces, sectionStats, profileViewsResolved.trace);
  const googleProfileViews = profileViewsResolved.value;

  const rankingResolved = resolveMetricWithTrace({
    key: "google-ranking",
    label: "Ranking local",
    section: "Google local",
    observed: client.googleData.rankingEstimate,
    benchmark: 12 - client.diagnosisScores.googlePresence * 0.7,
    fallback: 10,
    benchmarkLabel: "Estimativa de ranking a partir da presenca local",
  });
  registerTrace(traces, sectionStats, rankingResolved.trace);
  const rankingEstimate = clamp(rankingResolved.value, 1, 20);

  const avgCplResolved = resolveMetricWithTrace({
    key: "avg-cpl",
    label: "CPL medio",
    section: "Midia paga",
    observed: null,
    benchmark: benchmark.paidTraffic.avgCpl,
    fallback: 18,
    benchmarkLabel,
    benchmarkConfidence: benchmark.confidence,
  });
  registerTrace(traces, sectionStats, avgCplResolved.trace);
  const avgCpl = avgCplResolved.value;

  const avgCpcResolved = resolveMetricWithTrace({
    key: "avg-cpc",
    label: "CPC medio",
    section: "Midia paga",
    observed: null,
    benchmark: benchmark.paidTraffic.avgCpc ?? null,
    fallback: 1.8,
    benchmarkLabel,
    benchmarkConfidence: benchmark.confidence,
  });
  registerTrace(traces, sectionStats, avgCpcResolved.trace);
  const avgCpc = avgCpcResolved.value;

  const avgCpmResolved = resolveMetricWithTrace({
    key: "avg-cpm",
    label: "CPM medio",
    section: "Midia paga",
    observed: null,
    benchmark: benchmark.paidTraffic.avgCpm ?? null,
    fallback: 16,
    benchmarkLabel,
    benchmarkConfidence: benchmark.confidence,
  });
  registerTrace(traces, sectionStats, avgCpmResolved.trace);
  const avgCpm = avgCpmResolved.value;

  pushObservedScoreTrace(traces, sectionStats, "diagnosis-bio", "Score bio", "Diagnostico", client.diagnosisScores.bio);
  pushObservedScoreTrace(
    traces,
    sectionStats,
    "diagnosis-humanization",
    "Score humanizacao",
    "Diagnostico",
    client.diagnosisScores.humanization,
  );
  pushObservedScoreTrace(
    traces,
    sectionStats,
    "diagnosis-conversion",
    "Score conversao",
    "Diagnostico",
    client.diagnosisScores.conversion,
  );
  pushObservedScoreTrace(
    traces,
    sectionStats,
    "diagnosis-branding",
    "Score branding",
    "Diagnostico",
    client.diagnosisScores.branding,
  );
  pushObservedScoreTrace(
    traces,
    sectionStats,
    "diagnosis-google",
    "Score Google",
    "Diagnostico",
    client.diagnosisScores.googlePresence,
  );
  pushObservedScoreTrace(
    traces,
    sectionStats,
    "diagnosis-social-proof",
    "Score prova social",
    "Diagnostico",
    client.diagnosisScores.socialProof,
  );

  const cityProfile = inferCityProfile(city);
  const genderShare = getGenderShare(city, segment);
  const ageShare = getAgeShare(city, segment);
  const densityFactor = city.densityIndex ?? 0.5;
  const regionalFlowFactor = city.regionalFlowIndex ?? 0.28;
  const competitionIndex = city.competitionIndex ?? 0.5;
  const incomeCompatibility = clamp(
    modelConstant.marketModel.incomeCompatibilityDefault +
      ((city.pibPerCapita ?? 18000) - 18000) / 120000 +
      (segment.revenueProfile.recurrencePotential - 0.5) * 0.04,
    0.16,
    0.92,
  );
  const geographicReach = clamp(
    modelConstant.marketModel.geographicReachDefault + densityFactor * 0.12 + regionalFlowFactor * 0.08,
    0.18,
    0.86,
  );

  const eligibleMarket = city.population * genderShare * ageShare * incomeCompatibility * geographicReach;

  const diagnosisWeightedScore =
    (client.diagnosisScores.bio * modelConstant.scoringModel.bioWeight +
      client.diagnosisScores.humanization * modelConstant.scoringModel.humanizationWeight +
      client.diagnosisScores.conversion * modelConstant.scoringModel.conversionWeight +
      client.diagnosisScores.branding * modelConstant.scoringModel.brandingWeight +
      client.diagnosisScores.googlePresence * modelConstant.scoringModel.googlePresenceWeight +
      client.diagnosisScores.socialProof * modelConstant.scoringModel.socialProofWeight) /
    (10 *
      (modelConstant.scoringModel.bioWeight +
        modelConstant.scoringModel.humanizationWeight +
        modelConstant.scoringModel.conversionWeight +
        modelConstant.scoringModel.brandingWeight +
        modelConstant.scoringModel.googlePresenceWeight +
        modelConstant.scoringModel.socialProofWeight));

  const socialReachStrength = clamp(Math.log1p(followers) / Math.log1p(2500), 0.18, 1);
  const engagementRate = monthlyEngagement / Math.max(monthlyReach, 1);
  const googleProofStrength = clamp(
    (reviews / 40) * benchmark.googleLocal.reviewsImpactFactor +
      (rating > 0 ? rating / 5 : 0) * 0.26 +
      (1 - (rankingEstimate - 1) / 20) * benchmark.googleLocal.googlePresenceImpactFactor * 0.24,
    0,
    1.05,
  );
  const digitalPresenceFactor = clamp(
    diagnosisWeightedScore * 0.42 +
      socialReachStrength * 0.18 +
      clamp(engagementRate * 5, 0, 1) * 0.12 +
      googleProofStrength * 0.28,
    0.32,
    1.16,
  );

  const offerFactor = clamp(
    0.54 +
      (client.diagnosisScores.offerClarity / 10) * 0.18 +
      (client.diagnosisScores.highlights / 10) * 0.08 +
      (client.diagnosisScores.conversion / 10) * 0.08 +
      segment.audienceProfile.reputationImportance * 0.08 +
      (client.primaryOffer ? 0.04 : 0),
    0.45,
    1.12,
  );

  const competitionFactor = clamp(
    1 -
      competitionIndex * modelConstant.saturationModel.competitionPenaltyMultiplier -
      benchmark.googleLocal.reviewsImpactFactor * 0.05,
    0.38,
    0.92,
  );

  const intentRate = clamp(
    modelConstant.marketModel.intentRateDefault +
      segment.audienceProfile.localIntentImportance * 0.035 +
      benchmark.googleLocal.mapIntentFactor * 0.024 +
      regionalFlowFactor * 0.02 +
      (googleProfileViews / Math.max(city.population, 1)) * 9 +
      (messagesPerMonth / Math.max(city.population, 1)) * 12,
    0.02,
    0.18,
  );

  const intentMarket = eligibleMarket * intentRate;
  const capturableMarket = intentMarket * competitionFactor * digitalPresenceFactor * offerFactor;

  const contactRate = clamp(
    0.03 +
      (linkClicks / Math.max(profileVisits, 1)) * 0.18 +
      (messagesPerMonth / Math.max(profileVisits, 1)) * 0.16 +
      (client.diagnosisScores.conversion / 10) * 0.06 +
      digitalPresenceFactor * 0.05,
    0.025,
    0.22,
  );

  const leadToBookingRate = clamp(
    benchmark.funnel.leadToBookingRate * (0.9 + (client.diagnosisScores.conversion / 10) * 0.1),
    0.12,
    0.88,
  );
  const bookingToShowRate = clamp(
    benchmark.funnel.bookingToShowRate * 0.45 + (1 - noShowRate) * 0.55,
    0.3,
    0.97,
  );
  const showToSaleRate = clamp(
    benchmark.funnel.showToSaleRate *
      (0.9 + (client.diagnosisScores.offerClarity / 10) * 0.07 + (client.diagnosisScores.socialProof / 10) * 0.05),
    0.18,
    0.9,
  );

  const baseLeadsPotential = capturableMarket * contactRate;
  const baseBookingsPotential = baseLeadsPotential * leadToBookingRate;
  const baseShowsPotential = baseBookingsPotential * bookingToShowRate;
  const baseCustomersPotential = baseShowsPotential * showToSaleRate;
  const repeatVisitsAverage = benchmark.retention.repeatVisitsAverage;
  const recurringFactor = segment.audienceProfile.recurringNature ? 1 : 0.45;
  const baseRecurringRevenuePotential =
    baseCustomersPotential * returnRate * repeatVisitsAverage * avgTicket * recurringFactor;
  const impliedMediaSpend = baseLeadsPotential * avgCpl;
  const paidImpressions = avgCpm > 0 ? (impliedMediaSpend / avgCpm) * 1000 : impliedMediaSpend / Math.max(avgCpc, 1);
  const exposureIndex = (monthlyReach + paidImpressions) / Math.max(eligibleMarket, 1);
  const saturationFactor = Math.max(
    modelConstant.saturationModel.minimumEfficiencyFactor,
    Math.exp(
      -modelConstant.saturationModel.saturationK *
        (1 + competitionIndex * modelConstant.saturationModel.competitionPenaltyMultiplier) *
        exposureIndex,
    ),
  );
  const baseMonthlyRevenuePotential =
    (baseCustomersPotential * avgTicket + baseRecurringRevenuePotential) * saturationFactor;

  const proposalConfigs = getSegmentProposalConfigs(segment);
  const proposalPotentials = scenarioKeys.reduce<Record<ScenarioKey, ProposalPotential>>((acc, key) => {
    const proposalConfig = proposalConfigs[key];
    const proposalPresenceFactor = clamp(
      digitalPresenceFactor * (1 + proposalConfig.authorityLift + proposalConfig.googleLift * (reviews <= 0 ? 0.7 : 0.35)),
      0.34,
      1.42,
    );
    const proposalOfferFactor = clamp(
      offerFactor * (1 + proposalConfig.contactLift * 0.42 + proposalConfig.authorityLift * 0.24),
      0.48,
      1.26,
    );
    const proposalCapturableMarket = intentMarket * competitionFactor * proposalPresenceFactor * proposalOfferFactor;
    const proposalContactRate = clamp(contactRate * (1 + proposalConfig.contactLift), 0.03, 0.28);
    const proposalLeadToBookingRate = clamp(leadToBookingRate * (1 + proposalConfig.bookingLift), 0.14, 0.92);
    const proposalBookingToShowRate = clamp(bookingToShowRate * (1 + proposalConfig.showLift), 0.35, 0.98);
    const proposalShowToSaleRate = clamp(showToSaleRate * (1 + proposalConfig.saleLift), 0.22, 0.94);
    const proposalReturnRate = clamp(returnRate * (1 + proposalConfig.returnLift), 0.02, 0.96);

    const grossLeadsPotential = proposalCapturableMarket * proposalContactRate;
    const grossBookingsPotential = grossLeadsPotential * proposalLeadToBookingRate;
    const grossShowsPotential = grossBookingsPotential * proposalBookingToShowRate;
    const grossCustomersPotential = grossShowsPotential * proposalShowToSaleRate;
    const grossRecurringRevenue =
      grossCustomersPotential * proposalReturnRate * repeatVisitsAverage * avgTicket * recurringFactor;
    const grossMonthlyRevenuePotential =
      (grossCustomersPotential * avgTicket + grossRecurringRevenue) * saturationFactor;

    const incrementalLeads = Math.max(grossLeadsPotential - baseLeadsPotential, 0);
    const incrementalBookings = Math.max(grossBookingsPotential - baseBookingsPotential, 0);
    const incrementalShows = Math.max(grossShowsPotential - baseShowsPotential, 0);
    const incrementalCustomers = Math.max(grossCustomersPotential - baseCustomersPotential, 0);
    const monthlyReturnPotential = Math.max(grossMonthlyRevenuePotential - baseMonthlyRevenuePotential, 0);
    const timeline = buildProposalTimelineSeries({
      investment: proposalConfig.investment,
      monthlyReturnPotential,
      incrementalCustomersPotential: incrementalCustomers,
      rampMultiplier: proposalConfig.rampMultiplier,
    });
    const annualRevenue = timeline[timeline.length - 1]?.cumulativeReturn ?? 0;
    const netReturn = annualRevenue - proposalConfig.investment;
    const paybackIndex = timeline.findIndex((item) => item.netReturn >= 0);
    const paybackMonths = paybackIndex >= 0 ? paybackIndex + 1 : null;
    const roas = annualRevenue / Math.max(proposalConfig.investment, 1);

    acc[key] = {
      config: proposalConfig,
      leads: round(incrementalLeads),
      bookings: round(incrementalBookings),
      shows: round(incrementalShows),
      customers: round(incrementalCustomers),
      monthlyRevenue: round(monthlyReturnPotential),
      annualRevenue: round(annualRevenue),
      netReturn: round(netReturn),
      paybackMonths,
      roas: Number(roas.toFixed(2)),
      timeline,
    };

    return acc;
  }, {} as Record<ScenarioKey, ProposalPotential>);

  const reportScenarios = scenarioKeys.reduce<Record<ScenarioKey, ProjectProposalSummary>>((acc, key) => {
    const proposal = proposalPotentials[key];

    acc[key] = {
      chartLabel: proposal.config.chartLabel,
      title: proposal.config.title,
      summary: proposal.config.summary,
      investment: proposal.config.investment,
      timeline: proposal.config.timeline,
      ctaHref: proposal.config.ctaHref,
      ctaLabel: proposal.config.ctaLabel,
      monthlyRevenue: proposal.monthlyRevenue,
      annualRevenue: proposal.annualRevenue,
      netReturn: proposal.netReturn,
      paybackMonths: proposal.paybackMonths,
      leads: proposal.leads,
      bookings: proposal.bookings,
      shows: proposal.shows,
      customers: proposal.customers,
      roas: proposal.roas,
    };

    return acc;
  }, {} as Record<ScenarioKey, ProjectProposalSummary>);

  const recommendations: string[] = [];

  if (client.diagnosisScores.bio <= 4 || client.diagnosisScores.offerClarity <= 4) {
    recommendations.push("A proposta precisa deixar procedimento, promessa e CTA mais claros ja na primeira dobra.");
  }
  if (client.diagnosisScores.humanization <= 4) {
    recommendations.push("Usar voz, rosto e bastidores para reduzir friccao antes do clique no WhatsApp.");
  }
  if (client.diagnosisScores.socialProof <= 4) {
    recommendations.push("Organizar prova social recorrente com depoimentos, antes e depois autorizado e respostas a duvidas frequentes.");
  }
  if (reviews === 0 || client.diagnosisScores.googlePresence <= 3) {
    recommendations.push("Se a meta for captar demanda local, priorizar proposta com Google Perfil da Empresa, FAQ e prova local bem visiveis.");
  }
  if (client.businessData.avgTicket == null) {
    recommendations.push("Na consulta, trocar o ticket benchmark por ticket real melhora muito a leitura financeira do retorno.");
  }

  const report: DerivedReport = {
    id: `report_${client.id}`,
    clientId: client.id,
    createdAt: new Date().toISOString(),
    derivedMetrics: {
      eligibleMarket: round(eligibleMarket),
      intentMarket: round(intentMarket),
      capturableMarket: round(capturableMarket),
      baseLeadsPotential: round(baseLeadsPotential),
      baseBookingsPotential: round(baseBookingsPotential),
      baseShowsPotential: round(baseShowsPotential),
      baseCustomersPotential: round(baseCustomersPotential),
      baseMonthlyRevenuePotential: round(baseMonthlyRevenuePotential),
      benchmarkTicket: round(avgTicket),
      saturationFactor,
    },
    scenarios: reportScenarios,
    recommendations: dedupeStrings(recommendations, 6),
  };

  const scenarioChartData = monthLabels.map((month, index) => ({
    month,
    conservador: proposalPotentials.conservative.timeline[index]?.netReturn ?? 0,
    realista: proposalPotentials.realistic.timeline[index]?.netReturn ?? 0,
    agressivo: proposalPotentials.aggressive.timeline[index]?.netReturn ?? 0,
  }));

  const funnelChartData = [
    {
      stage: "Leads extras",
      conservador: report.scenarios.conservative.leads,
      realista: report.scenarios.realistic.leads,
      agressivo: report.scenarios.aggressive.leads,
    },
    {
      stage: "Agendas extras",
      conservador: report.scenarios.conservative.bookings,
      realista: report.scenarios.realistic.bookings,
      agressivo: report.scenarios.aggressive.bookings,
    },
    {
      stage: "Comparecimentos extras",
      conservador: report.scenarios.conservative.shows,
      realista: report.scenarios.realistic.shows,
      agressivo: report.scenarios.aggressive.shows,
    },
    {
      stage: "Clientes extras",
      conservador: report.scenarios.conservative.customers,
      realista: report.scenarios.realistic.customers,
      agressivo: report.scenarios.aggressive.customers,
    },
  ];

  const proposalTimelineChartData = {
    conservative: proposalPotentials.conservative.timeline,
    realistic: proposalPotentials.realistic.timeline,
    aggressive: proposalPotentials.aggressive.timeline,
  } satisfies ProjectDashboardSnapshot["proposalTimelineChartData"];

  const proposalReturnChartData = scenarioKeys.map((key) => {
    const proposal = report.scenarios[key];

    return {
      proposal: proposal.chartLabel,
      spend: proposal.investment,
      monthlyReturn: proposal.monthlyRevenue,
      annualReturn: proposal.annualRevenue,
      netReturn: proposal.netReturn,
      paybackMonths: proposal.paybackMonths ?? 0,
      customers: proposal.customers,
      roas: proposal.roas,
    };
  });

  const derivedMarketTraces = [
    createDerivedTrace("eligible-market", "Mercado elegivel", "Mercado derivado", report.derivedMetrics.eligibleMarket, "Formula de mercado elegivel"),
    createDerivedTrace("intent-market", "Mercado com intencao", "Mercado derivado", report.derivedMetrics.intentMarket, "Formula de intencao"),
    createDerivedTrace("capturable-market", "Mercado capturavel", "Mercado derivado", report.derivedMetrics.capturableMarket, "Formula de captacao"),
    createDerivedTrace(
      "base-monthly-revenue-potential",
      "Receita potencial mensal da base atual",
      "Mercado derivado",
      report.derivedMetrics.baseMonthlyRevenuePotential,
      "Formula da estrutura digital atual",
    ),
  ];

  for (const trace of derivedMarketTraces) {
    registerTrace(traces, sectionStats, trace);
  }

  const classificationCounts = countTraceClassifications(traces);
  const precision = buildPrecisionFromTraces(traces);

  const precisionChartData = scenarioKeys.map((key) => {
    const proposal = report.scenarios[key];
    const penalty = proposalConfigs[key].precisionPenalty;
    const proposalPrecision = clamp(precision.overall * (1 - penalty), 0.42, 0.96);
    const proposalCertainty = clamp(precision.coverage * (1 - penalty * 0.6), 0.2, 0.94);

    return {
      label: proposal.chartLabel,
      precision: round(proposalPrecision * 100),
      certainty: round(proposalCertainty * 100),
    };
  });

  const coverageChartData = buildCoverageChartData(sectionStats);
  const weakestCoverageSections = coverageChartData
    .slice(0, 3)
    .map((item) => item.section.toLowerCase())
    .join(", ");

  const bestScenarioKey = scenarioKeys.reduce((best, key) => {
    const currentBest = report.scenarios[best];
    const candidate = report.scenarios[key];

    if (candidate.netReturn !== currentBest.netReturn) {
      return candidate.netReturn > currentBest.netReturn ? key : best;
    }

    if ((candidate.paybackMonths ?? Number.MAX_SAFE_INTEGER) !== (currentBest.paybackMonths ?? Number.MAX_SAFE_INTEGER)) {
      return (candidate.paybackMonths ?? Number.MAX_SAFE_INTEGER) < (currentBest.paybackMonths ?? Number.MAX_SAFE_INTEGER)
        ? key
        : best;
    }

    return best;
  }, scenarioKeys[0]);

  const bestProposal = report.scenarios[bestScenarioKey];
  const stage =
    followers >= 800
      ? "Presenca digital ativa com estrutura comercial incompleta"
      : followers >= 350
        ? "Presenca digital em consolidacao"
        : "Presenca digital inicial";
  const primaryBottleneck =
    reviews === 0 || client.diagnosisScores.googlePresence <= 3
      ? "Google local e prova social ainda nao sustentam bem a demanda de alta intencao."
      : client.diagnosisScores.offerClarity <= 4 || client.diagnosisScores.conversion <= 4
        ? "A oferta ainda explica pouco o proximo passo e perde forca no clique para contato."
        : client.diagnosisScores.humanization <= 4
          ? "A comunicacao ainda parece fria demais para converter confianca em conversa."
          : "O principal gargalo hoje esta na estrutura de conversao, nao na falta de presenca.";
  const primaryOpportunity =
    bestProposal.paybackMonths != null
      ? `${bestProposal.title} tende a recuperar o investimento em cerca de ${bestProposal.paybackMonths} meses e pode gerar ${formatCurrency(bestProposal.annualRevenue)} em 12 meses.`
      : `${bestProposal.title} entrega hoje a melhor relacao entre investimento e retorno potencial dentro do caso.`;
  const dataQuality =
    avgTicketResolved.classification === "real"
      ? "A simulacao ja usa ticket real, mas ainda depende de benchmark para demanda e conversao local."
      : `A simulacao financeira ainda usa ticket benchmark do nicho. ${weakestCoverageSections || "instagram, google local e funil"} pedem mais dado observado para refino.`;

  const narrative = {
    headline:
      "Sem consulta, este painel nao estima clientes nem faturamento atual. Ele compara o retorno potencial das suas propostas a partir da presenca digital observada e dos benchmarks do nicho.",
    stage,
    primaryBottleneck,
    primaryOpportunity,
    dataQuality,
  } satisfies ProjectDashboardSnapshot["narrative"];

  const highlights = [
    {
      label: "Seguidores observados",
      value: String(round(followers)),
      classification: followersResolved.classification,
      sourceLabel: followersResolved.trace.sourceLabel,
    },
    {
      label: "Reviews Google",
      value: String(round(reviews)),
      classification: reviewsResolved.classification,
      sourceLabel: reviewsResolved.trace.sourceLabel,
    },
    {
      label: "Ticket usado na simulacao",
      value: formatCurrency(round(avgTicket)),
      classification: avgTicketResolved.classification,
      sourceLabel: avgTicketResolved.trace.sourceLabel,
    },
    {
      label: "Melhor payback",
      value: bestProposal.paybackMonths != null ? `${bestProposal.paybackMonths} meses` : "Acima de 12 meses",
      classification: "projected" as DataClassification,
      sourceLabel: `${bestProposal.title}`,
    },
  ];

  const nextDataPoints: string[] = [
    "Ticket medio real dos procedimentos mais vendidos.",
    "Faixa de preco do procedimento de entrada e do procedimento principal.",
    "Capacidade semanal para novos agendamentos sem comprometer a operacao.",
    "Leads ou agendamentos atuais vindo de Instagram, Google e WhatsApp.",
    "Percentual de clientes que retornam em 30 e 60 dias.",
    "Clientes por mes e faturamento entram so na consulta, para validar payback com dado real.",
  ];

  const insights = [
    "O painel agora compara propostas comerciais e nao tenta inferir faturamento atual do negocio.",
    `${round(followers)} seguidores e ${round(reviews)} review(s) sugerem presenca social existente, mas ainda pouca prova local para demanda de alta intencao.`,
    `A estrutura digital atual pode capturar algo perto de ${formatCurrency(round(baseMonthlyRevenuePotential))} por mes em potencial teorico antes das melhorias de proposta.`,
    primaryBottleneck,
    primaryOpportunity,
    dataQuality,
  ];

  return {
    slug: client.slug,
    clientName: client.name,
    cityName: city.name,
    cityLabel: `${city.name} / ${city.state}`,
    cityProfile,
    segmentName: segment.name,
    benchmarkLabel,
    report,
    classificationCounts,
    precision,
    narrative,
    quickMetrics: {
      benchmarkTicket: avgTicket,
      benchmarkTicketClassification: avgTicketResolved.classification,
      baseMonthlyRevenuePotential,
      baseCustomersPotential,
      bestProposalInvestment: bestProposal.investment,
      bestProposalAnnualReturn: bestProposal.annualRevenue,
      bestProposalPaybackMonths: bestProposal.paybackMonths,
    },
    scenarioChartData,
    funnelChartData,
    precisionChartData,
    proposalTimelineChartData,
    proposalReturnChartData,
    coverageChartData,
    highlights,
    insights: dedupeStrings(insights, 6),
    nextDataPoints: dedupeStrings(nextDataPoints, 6),
    traces,
  };
}
