import type {
  Benchmark,
  Client,
  DataClassification,
  DerivedReport,
  MetricTrace,
  ModelConstant,
  ProjectCoverageChartPoint,
  ProjectDashboardClassificationCounts,
  ProjectDashboardPrecision,
  ProjectDashboardSnapshot,
  ScenarioKey,
  Segment,
  City,
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

type ScenarioConfig = {
  label: string;
  demandMultiplier: number;
  contactMultiplier: number;
  revenueMultiplier: number;
  retentionMultiplier: number;
  saturationMultiplier: number;
  precisionMultiplier: number;
};

const monthLabels = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const seasonalityCurve = [0.97, 0.99, 1, 1.02, 1.04, 1.06, 1.05, 1.03, 1, 0.99, 0.97, 0.98];

const scenarioConfigs: Record<ScenarioKey, ScenarioConfig> = {
  conservative: {
    label: "Conservador",
    demandMultiplier: 0.96,
    contactMultiplier: 0.98,
    revenueMultiplier: 1.01,
    retentionMultiplier: 1.03,
    saturationMultiplier: 1.02,
    precisionMultiplier: 0.98,
  },
  realistic: {
    label: "Realista",
    demandMultiplier: 1.08,
    contactMultiplier: 1.06,
    revenueMultiplier: 1.04,
    retentionMultiplier: 1.08,
    saturationMultiplier: 0.97,
    precisionMultiplier: 0.92,
  },
  aggressive: {
    label: "Agressivo",
    demandMultiplier: 1.2,
    contactMultiplier: 1.12,
    revenueMultiplier: 1.08,
    retentionMultiplier: 1.14,
    saturationMultiplier: 0.92,
    precisionMultiplier: 0.84,
  },
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

function buildPrecisionFromTraces(
  traces: MetricTrace[],
): ProjectDashboardPrecision {
  const classificationCounts = countTraceClassifications(traces);
  const overallConfidence =
    traces.reduce((sum, item) => sum + item.confidence, 0) / Math.max(traces.length, 1);
  const coverage = classificationCounts.real / Math.max(traces.length, 1);
  const precisionOverall = clamp(overallConfidence * 0.62 + coverage * 0.38, 0.44, 0.97);

  return {
    overall: precisionOverall,
    coverage,
    conservative: clamp(precisionOverall * scenarioConfigs.conservative.precisionMultiplier, 0.4, 0.97),
    realistic: clamp(precisionOverall * scenarioConfigs.realistic.precisionMultiplier, 0.38, 0.94),
    aggressive: clamp(precisionOverall * scenarioConfigs.aggressive.precisionMultiplier, 0.34, 0.9),
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

function combineClassifications(...classifications: DataClassification[]): DataClassification {
  if (classifications.every((classification) => classification === "real")) {
    return "real";
  }

  if (classifications.some((classification) => classification === "projected")) {
    return "projected";
  }

  return "estimated";
}

function buildScenarioSeries(
  currentRevenueEstimate: number,
  targetRevenue: number,
  multiplier: number,
) {
  return monthLabels.map((month, index) => {
    const progress = (index + 1) / monthLabels.length;
    const eased = progress * progress * (3 - 2 * progress);
    const seasonalFactor = seasonalityCurve[index];
    const value =
      currentRevenueEstimate +
      (targetRevenue * multiplier - currentRevenueEstimate) * eased * seasonalFactor;

    return {
      month,
      value: round(value),
    };
  });
}

function buildKpiTimelineSeries(params: {
  config: ScenarioConfig;
  currentCustomers: number;
  currentRevenueEstimate: number;
  targetCustomers: number;
  targetRevenue: number;
  targetMonthlySpend: number;
  monthlyReach: number;
  avgCpl: number;
  avgCpm: number;
  avgCpc: number;
  avgTicket: number;
  monthlyCapacity: number;
  returnRate: number;
  repeatVisitsAverage: number;
  followerGrowthRate: number;
  baseConversionRate: number;
  eligibleMarket: number;
  exposureIndex: number;
  competitionIndex: number;
  saturationFactor: number;
  diagnosisWeightedScore: number;
  humanizationScore: number;
  conversionScore: number;
  modelConstant: ModelConstant;
  recurringNature: boolean;
}) {
  const {
    config,
    currentCustomers,
    currentRevenueEstimate,
    targetCustomers,
    targetRevenue,
    targetMonthlySpend,
    monthlyReach,
    avgCpl,
    avgCpm,
    avgCpc,
    avgTicket,
    monthlyCapacity,
    returnRate,
    repeatVisitsAverage,
    followerGrowthRate,
    baseConversionRate,
    eligibleMarket,
    exposureIndex,
    competitionIndex,
    saturationFactor,
    diagnosisWeightedScore,
    humanizationScore,
    conversionScore,
    modelConstant,
    recurringNature,
  } = params;

  let accumulatedExposure = Math.max(exposureIndex * 0.42, 0.08);

  return monthLabels.map((month, index) => {
    const progress = (index + 1) / monthLabels.length;
    const eased = progress * progress * (3 - 2 * progress);
    const seasonalFactor = seasonalityCurve[index];
    const learningGain = clamp(
      (Math.log1p(index + 1) / Math.log(13)) *
        (0.14 + diagnosisWeightedScore * 0.08 + (conversionScore / 10) * 0.05),
      0.02,
      0.24,
    );
    const organicLift =
      1 + followerGrowthRate * (index + 1) * (0.92 + (humanizationScore / 10) * 0.18);
    const dynamicSaturation = Math.max(
      modelConstant.saturationModel.minimumEfficiencyFactor,
      Math.exp(
        -modelConstant.saturationModel.saturationK *
          (1 + competitionIndex * modelConstant.saturationModel.competitionPenaltyMultiplier) *
          accumulatedExposure *
          config.saturationMultiplier,
      ),
    );
    const saturationPenalty = clamp(
      Math.pow(1 - dynamicSaturation, 2) * (1.48 + config.demandMultiplier * 0.18),
      0,
      0.96,
    );
    const effectiveCpl = clamp(
      avgCpl * (1 - learningGain * 0.32 + saturationPenalty * 0.34),
      avgCpl * 0.72,
      avgCpl * 1.74,
    );
    const effectiveConversion = clamp(
      baseConversionRate *
        (0.88 + diagnosisWeightedScore * 0.08 + (conversionScore / 10) * 0.06) *
        (0.94 + config.contactMultiplier * 0.06) *
        dynamicSaturation,
      baseConversionRate * 0.55,
      baseConversionRate * 1.14,
    );
    const targetCustomersThisMonth = clamp(
      currentCustomers + (targetCustomers - currentCustomers) * eased * seasonalFactor,
      0,
      monthlyCapacity,
    );
    const customersFromDemand = targetCustomersThisMonth * clamp(dynamicSaturation / saturationFactor, 0.82, 1.14);
    const leadsNeeded = customersFromDemand / Math.max(effectiveConversion, 0.02);
    const investment = Math.max(leadsNeeded * effectiveCpl, targetMonthlySpend * 0.45);
    const leads = investment / Math.max(effectiveCpl, 1);
    const customers = Math.min(monthlyCapacity, leads * effectiveConversion);
    const recurringRevenue =
      customers *
      returnRate *
      repeatVisitsAverage *
      avgTicket *
      (recurringNature ? 1 : 0.45) *
      (0.48 + eased * 0.4);
    const revenueTarget = currentRevenueEstimate + (targetRevenue - currentRevenueEstimate) * eased * seasonalFactor;
    const rawRevenue = customers * avgTicket + recurringRevenue;
    const revenue = clamp(
      rawRevenue * 0.58 + revenueTarget * 0.42,
      currentRevenueEstimate * 0.72,
      targetRevenue * 1.08,
    );
    const incrementalRevenue = Math.max(revenue - currentRevenueEstimate, 0);
    const cac = investment / Math.max(customers, 1);
    const roas = incrementalRevenue / Math.max(investment, 1);
    const occupancy = clamp(customers / Math.max(monthlyCapacity, 1), 0, 1.18);

    const paidImpressions = avgCpm > 0 ? (investment / avgCpm) * 1000 : investment / Math.max(avgCpc, 0.5);
    const organicReach = monthlyReach * (0.74 + eased * 0.46) * organicLift;

    accumulatedExposure += (organicReach + paidImpressions) / Math.max(eligibleMarket, 1);

    return {
      month,
      investment: round(investment),
      revenue: round(revenue),
      customers: round(customers),
      leads: round(leads),
      cac: round(cac),
      roas: Number(roas.toFixed(2)),
      saturation: Number(dynamicSaturation.toFixed(3)),
      occupancy: Number(occupancy.toFixed(3)),
    };
  });
}

function buildInvestmentCurveSeries(params: {
  config: ScenarioConfig;
  currentCustomers: number;
  currentRevenueEstimate: number;
  baseMonthlySpend: number;
  monthlyReach: number;
  avgCpl: number;
  avgCpm: number;
  avgTicket: number;
  monthlyCapacity: number;
  returnRate: number;
  repeatVisitsAverage: number;
  baseConversionRate: number;
  eligibleMarket: number;
  competitionIndex: number;
  saturationFactor: number;
  diagnosisWeightedScore: number;
  conversionScore: number;
  modelConstant: ModelConstant;
  recurringNature: boolean;
}) {
  const {
    config,
    currentCustomers,
    currentRevenueEstimate,
    baseMonthlySpend,
    monthlyReach,
    avgCpl,
    avgCpm,
    avgTicket,
    monthlyCapacity,
    returnRate,
    repeatVisitsAverage,
    baseConversionRate,
    eligibleMarket,
    competitionIndex,
    saturationFactor,
    diagnosisWeightedScore,
    conversionScore,
    modelConstant,
    recurringNature,
  } = params;

  const spendMultipliers = [0.45, 0.65, 0.85, 1, 1.2, 1.45, 1.75];
  const optimalSpendMultiplier = clamp(
    0.84 + saturationFactor * 0.48 + diagnosisWeightedScore * 0.12 - competitionIndex * 0.08,
    0.78,
    1.42,
  );

  return spendMultipliers.map((multiplier) => {
    const spend = baseMonthlySpend * multiplier;
    const paidImpressions = avgCpm > 0 ? (spend / avgCpm) * 1000 : spend / Math.max(avgCpl, 1) * 18;
    const reachShare = ((monthlyReach * 0.9) + paidImpressions) / Math.max(eligibleMarket, 1);
    const curveSaturation = Math.max(
      modelConstant.saturationModel.minimumEfficiencyFactor,
      Math.exp(
        -modelConstant.saturationModel.saturationK *
          (1 + competitionIndex * modelConstant.saturationModel.competitionPenaltyMultiplier) *
          reachShare *
          config.saturationMultiplier,
      ),
    );
    const learningGain = clamp(
      (Math.log1p(multiplier * 4) / Math.log(8)) * (0.08 + diagnosisWeightedScore * 0.08),
      0.03,
      0.2,
    );
    const parabolicPenalty =
      1 +
      Math.pow(multiplier - optimalSpendMultiplier, 2) *
        (0.5 + (1 - curveSaturation) * 2.1 + config.demandMultiplier * 0.08);
    const effectiveCpl = clamp(
      avgCpl * (1 - learningGain * 0.2) * parabolicPenalty,
      avgCpl * 0.78,
      avgCpl * 2.4,
    );
    const effectiveConversion = clamp(
      baseConversionRate *
        (0.9 + diagnosisWeightedScore * 0.06 + (conversionScore / 10) * 0.06) *
        curveSaturation,
      baseConversionRate * 0.55,
      baseConversionRate * 1.08,
    );
    const leads = spend / Math.max(effectiveCpl, 1);
    const customers = Math.min(monthlyCapacity, leads * effectiveConversion);
    const recurringRevenue =
      customers *
      returnRate *
      repeatVisitsAverage *
      avgTicket *
      (recurringNature ? 1 : 0.45) *
      0.82;
    const growthRevenue = customers * avgTicket + recurringRevenue;
    const revenue = currentRevenueEstimate + growthRevenue;
    const totalCustomers = Math.min(monthlyCapacity, currentCustomers + customers);
    const cac = spend / Math.max(customers, 1);
    const roas = growthRevenue / Math.max(spend, 1);
    const incrementalRevenue = Math.max(growthRevenue, 0);
    const efficiency = incrementalRevenue / Math.max(spend, 1);

    return {
      label: `R$ ${formatCompact(spend)}`,
      spend: round(spend),
      revenue: round(revenue),
      incrementalRevenue: round(incrementalRevenue),
      customers: round(totalCustomers),
      cac: round(cac),
      roas: Number(roas.toFixed(2)),
      saturation: Number(curveSaturation.toFixed(3)),
      efficiency: Number(efficiency.toFixed(2)),
    };
  });
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

  const monthlyCapacityResolved = resolveMetricWithTrace({
    key: "monthly-capacity",
    label: "Capacidade mensal",
    section: "Operacao",
    observed: client.businessData.monthlyCapacity,
    benchmark: null,
    fallback: modelConstant.fallbackModel.defaultMonthlyCapacity,
    benchmarkLabel,
  });
  registerTrace(traces, sectionStats, monthlyCapacityResolved.trace);
  const monthlyCapacity = monthlyCapacityResolved.value;

  const currentCustomersResolved = resolveMetricWithTrace({
    key: "current-customers",
    label: "Clientes atuais por mes",
    section: "Comercial",
    observed: client.businessData.currentCustomersPerMonth,
    benchmark: Math.round(monthlyCapacity * 0.46),
    fallback: Math.round(modelConstant.fallbackModel.defaultMonthlyCapacity * 0.42),
    benchmarkLabel: `Estimativa pela capacidade para ${segment.name}`,
  });
  registerTrace(traces, sectionStats, currentCustomersResolved.trace);
  const currentCustomers = currentCustomersResolved.value;

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

  const currentRevenueResolved = resolveMetricWithTrace({
    key: "current-revenue",
    label: "Faturamento atual",
    section: "Comercial",
    observed: client.businessData.currentRevenueEstimate,
    benchmark: currentCustomers * avgTicket,
    fallback: avgTicket * currentCustomers,
    benchmarkLabel: "Estimativa derivada do ticket e clientes atuais",
  });
  registerTrace(traces, sectionStats, currentRevenueResolved.trace);
  const currentRevenueEstimate = currentRevenueResolved.value;

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

  pushObservedScoreTrace(
    traces,
    sectionStats,
    "diagnosis-bio",
    "Score bio",
    "Diagnostico",
    client.diagnosisScores.bio,
  );
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
    benchmark.funnel.leadToBookingRate * (0.9 + client.diagnosisScores.conversion / 10 * 0.1),
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
      (0.9 + client.diagnosisScores.offerClarity / 10 * 0.07 + client.diagnosisScores.socialProof / 10 * 0.05),
    0.18,
    0.9,
  );

  const projectedLeads = capturableMarket * contactRate;
  const projectedBookings = projectedLeads * leadToBookingRate;
  const projectedShows = projectedBookings * bookingToShowRate;
  const projectedCustomers = projectedShows * showToSaleRate;
  const projectedInitialRevenue = projectedCustomers * avgTicket;
  const repeatVisitsAverage = benchmark.retention.repeatVisitsAverage;
  const projectedRecurringRevenue =
    projectedCustomers *
    returnRate *
    repeatVisitsAverage *
    avgTicket *
    (segment.audienceProfile.recurringNature ? 1 : 0.45);

  const impliedMediaSpend = projectedLeads * avgCpl;
  const paidImpressions = avgCpm > 0 ? (impliedMediaSpend / avgCpm) * 1000 : impliedMediaSpend / avgCpc;
  const exposureIndex = (monthlyReach + paidImpressions) / Math.max(eligibleMarket, 1);
  const saturationFactor = Math.max(
    modelConstant.saturationModel.minimumEfficiencyFactor,
    Math.exp(
      -modelConstant.saturationModel.saturationK *
        (1 + competitionIndex * modelConstant.saturationModel.competitionPenaltyMultiplier) *
        exposureIndex,
    ),
  );

  const projectedTotalRevenue = (projectedInitialRevenue + projectedRecurringRevenue) * saturationFactor;
  const baseConversionRate = clamp(leadToBookingRate * bookingToShowRate * showToSaleRate, 0.04, 0.72);
  const adjustedCac = (impliedMediaSpend / Math.max(projectedCustomers, 1)) / Math.max(saturationFactor, 0.42);
  const currentShowsEstimate = currentCustomers / Math.max(showToSaleRate, 0.18);
  const currentBookingsEstimate = currentShowsEstimate / Math.max(bookingToShowRate, 0.3);
  const currentLeadsEstimate = currentBookingsEstimate / Math.max(leadToBookingRate, 0.12);

  const scenarioGrowthSummaries = Object.entries(scenarioConfigs).reduce<
    Record<ScenarioKey, { leads: number; bookings: number; shows: number; customers: number; revenue: number }>
  >((acc, [scenarioKey, config]) => {
    const growthLeads = projectedLeads * config.demandMultiplier;
    const growthBookings = projectedBookings * config.contactMultiplier;
    const growthShows = projectedShows * config.contactMultiplier;
    const growthCustomers =
      projectedCustomers * config.demandMultiplier * config.contactMultiplier * config.retentionMultiplier;
    const growthRevenue =
      projectedTotalRevenue *
      config.revenueMultiplier *
      config.demandMultiplier *
      config.contactMultiplier *
      config.retentionMultiplier *
      config.saturationMultiplier;

    acc[scenarioKey as ScenarioKey] = {
      leads: round(growthLeads),
      bookings: round(growthBookings),
      shows: round(growthShows),
      customers: round(growthCustomers),
      revenue: round(growthRevenue),
    };

    return acc;
  }, {} as Record<ScenarioKey, { leads: number; bookings: number; shows: number; customers: number; revenue: number }>);

  const scenarioSummaries = Object.entries(scenarioGrowthSummaries).reduce<
    Record<ScenarioKey, { customers: number; revenue: number }>
  >((acc, [scenarioKey, growth]) => {
    acc[scenarioKey as ScenarioKey] = {
      customers: round(Math.min(monthlyCapacity, currentCustomers + growth.customers)),
      revenue: round(currentRevenueEstimate + growth.revenue),
    };

    return acc;
  }, {} as Record<ScenarioKey, { customers: number; revenue: number }>);

  const recommendations: string[] = [];

  if (client.diagnosisScores.bio <= 4 || client.diagnosisScores.offerClarity <= 4) {
    recommendations.push("Enxugar a bio e deixar a oferta principal mais clara ja na primeira dobra.");
  }
  if (client.diagnosisScores.humanization <= 4) {
    recommendations.push("Aumentar a presenca humana em video com voz real, bastidores e explicacao de procedimentos.");
  }
  if (client.diagnosisScores.socialProof <= 4) {
    recommendations.push("Organizar prova social recorrente com depoimentos, antes e depois autorizado e feedback de clientes.");
  }
  if (reviews === 0 || client.diagnosisScores.googlePresence <= 3) {
    recommendations.push("Estruturar Google Perfil da Empresa com reviews, fotos e prova local.");
  }
  if (client.diagnosisScores.conversion <= 4) {
    recommendations.push("Reforcar CTA, proposta principal e caminho de contato para reduzir atrito ate o WhatsApp.");
  }
  if (returnRate < 0.38) {
    recommendations.push("Criar fluxo de retorno em 30 e 60 dias para aumentar recorrencia e LTV.");
  }
  if (bookingToShowRate < 0.8) {
    recommendations.push("Implementar confirmacao ativa para reduzir faltas e proteger ocupacao.");
  }

  const report: DerivedReport = {
    id: `report_${client.id}`,
    clientId: client.id,
    createdAt: new Date().toISOString(),
    derivedMetrics: {
      eligibleMarket: round(eligibleMarket),
      intentMarket: round(intentMarket),
      capturableMarket: round(capturableMarket),
      projectedLeads: round(projectedLeads),
      projectedBookings: round(projectedBookings),
      projectedShows: round(projectedShows),
      projectedCustomers: round(projectedCustomers),
      projectedInitialRevenue: round(projectedInitialRevenue),
      projectedRecurringRevenue: round(projectedRecurringRevenue),
      projectedTotalRevenue: round(projectedTotalRevenue),
      saturationFactor,
    },
    scenarios: scenarioSummaries,
    recommendations: dedupeStrings(recommendations, 6),
  };

  const conservativeSeries = buildScenarioSeries(
    currentRevenueEstimate,
    report.scenarios.conservative.revenue,
    scenarioConfigs.conservative.revenueMultiplier,
  );
  const realisticSeries = buildScenarioSeries(
    currentRevenueEstimate,
    report.scenarios.realistic.revenue,
    scenarioConfigs.realistic.revenueMultiplier,
  );
  const aggressiveSeries = buildScenarioSeries(
    currentRevenueEstimate,
    report.scenarios.aggressive.revenue,
    scenarioConfigs.aggressive.revenueMultiplier,
  );
  const actualSeries = buildScenarioSeries(currentRevenueEstimate, currentRevenueEstimate * 1.06, 1);

  const scenarioChartData = monthLabels.map((month, index) => ({
    month,
    atual: actualSeries[index]?.value ?? round(currentRevenueEstimate),
    conservador: conservativeSeries[index]?.value ?? report.scenarios.conservative.revenue,
    realista: realisticSeries[index]?.value ?? report.scenarios.realistic.revenue,
    agressivo: aggressiveSeries[index]?.value ?? report.scenarios.aggressive.revenue,
  }));

  const funnelChartData = [
    {
      stage: "Leads",
      atual: round(currentLeadsEstimate),
      conservador: round(currentLeadsEstimate + scenarioGrowthSummaries.conservative.leads),
      realista: round(currentLeadsEstimate + scenarioGrowthSummaries.realistic.leads),
      agressivo: round(currentLeadsEstimate + scenarioGrowthSummaries.aggressive.leads),
    },
    {
      stage: "Agenda",
      atual: round(currentBookingsEstimate),
      conservador: round(currentBookingsEstimate + scenarioGrowthSummaries.conservative.bookings),
      realista: round(currentBookingsEstimate + scenarioGrowthSummaries.realistic.bookings),
      agressivo: round(currentBookingsEstimate + scenarioGrowthSummaries.aggressive.bookings),
    },
    {
      stage: "Comparece",
      atual: round(currentShowsEstimate),
      conservador: round(currentShowsEstimate + scenarioGrowthSummaries.conservative.shows),
      realista: round(currentShowsEstimate + scenarioGrowthSummaries.realistic.shows),
      agressivo: round(currentShowsEstimate + scenarioGrowthSummaries.aggressive.shows),
    },
    {
      stage: "Clientes",
      atual: round(currentCustomers),
      conservador: report.scenarios.conservative.customers,
      realista: report.scenarios.realistic.customers,
      agressivo: report.scenarios.aggressive.customers,
    },
  ];

  const organicFollowersPerMonth = followers * followerGrowthRate;
  const organicLeadsPerMonth = followers * benchmark.organic.organicLeadRate;
  const organicCustomersPerMonth = organicLeadsPerMonth * showToSaleRate * 0.72;
  const valuePerFollower =
    (organicCustomersPerMonth * avgTicket) / Math.max(organicFollowersPerMonth, 1);

  const organicChartData = [
    {
      metric: "Seguidores",
      atual: round(organicFollowersPerMonth * 0.9),
      conservador: round(organicFollowersPerMonth * scenarioConfigs.conservative.revenueMultiplier),
      realista: round(organicFollowersPerMonth * scenarioConfigs.realistic.revenueMultiplier),
      agressivo: round(organicFollowersPerMonth * scenarioConfigs.aggressive.revenueMultiplier),
    },
    {
      metric: "Leads organicos",
      atual: round(organicLeadsPerMonth * 0.92),
      conservador: round(organicLeadsPerMonth * scenarioConfigs.conservative.contactMultiplier),
      realista: round(organicLeadsPerMonth * scenarioConfigs.realistic.contactMultiplier),
      agressivo: round(organicLeadsPerMonth * scenarioConfigs.aggressive.contactMultiplier),
    },
    {
      metric: "Clientes organicos",
      atual: round(organicCustomersPerMonth * 0.94),
      conservador: round(organicCustomersPerMonth * scenarioConfigs.conservative.retentionMultiplier),
      realista: round(organicCustomersPerMonth * scenarioConfigs.realistic.retentionMultiplier),
      agressivo: round(organicCustomersPerMonth * scenarioConfigs.aggressive.retentionMultiplier),
    },
  ];

  const scenarioMonthlySpend = {
    conservative: Math.max(
      scenarioGrowthSummaries.conservative.leads * avgCpl * 0.82,
      scenarioGrowthSummaries.conservative.customers * adjustedCac * 0.84,
    ),
    realistic: Math.max(
      scenarioGrowthSummaries.realistic.leads * avgCpl * 0.92,
      scenarioGrowthSummaries.realistic.customers * adjustedCac * 0.92,
    ),
    aggressive: Math.max(
      scenarioGrowthSummaries.aggressive.leads * avgCpl * 1.04,
      scenarioGrowthSummaries.aggressive.customers * adjustedCac,
    ),
  } satisfies Record<ScenarioKey, number>;

  const kpiTimelineChartData = {
    conservative: buildKpiTimelineSeries({
      config: scenarioConfigs.conservative,
      currentCustomers,
      currentRevenueEstimate,
      targetCustomers: report.scenarios.conservative.customers,
      targetRevenue: report.scenarios.conservative.revenue,
      targetMonthlySpend: scenarioMonthlySpend.conservative,
      monthlyReach,
      avgCpl,
      avgCpm,
      avgCpc,
      avgTicket,
      monthlyCapacity,
      returnRate,
      repeatVisitsAverage,
      followerGrowthRate,
      baseConversionRate,
      eligibleMarket,
      exposureIndex,
      competitionIndex,
      saturationFactor,
      diagnosisWeightedScore,
      humanizationScore: client.diagnosisScores.humanization,
      conversionScore: client.diagnosisScores.conversion,
      modelConstant,
      recurringNature: segment.audienceProfile.recurringNature,
    }),
    realistic: buildKpiTimelineSeries({
      config: scenarioConfigs.realistic,
      currentCustomers,
      currentRevenueEstimate,
      targetCustomers: report.scenarios.realistic.customers,
      targetRevenue: report.scenarios.realistic.revenue,
      targetMonthlySpend: scenarioMonthlySpend.realistic,
      monthlyReach,
      avgCpl,
      avgCpm,
      avgCpc,
      avgTicket,
      monthlyCapacity,
      returnRate,
      repeatVisitsAverage,
      followerGrowthRate,
      baseConversionRate,
      eligibleMarket,
      exposureIndex,
      competitionIndex,
      saturationFactor,
      diagnosisWeightedScore,
      humanizationScore: client.diagnosisScores.humanization,
      conversionScore: client.diagnosisScores.conversion,
      modelConstant,
      recurringNature: segment.audienceProfile.recurringNature,
    }),
    aggressive: buildKpiTimelineSeries({
      config: scenarioConfigs.aggressive,
      currentCustomers,
      currentRevenueEstimate,
      targetCustomers: report.scenarios.aggressive.customers,
      targetRevenue: report.scenarios.aggressive.revenue,
      targetMonthlySpend: scenarioMonthlySpend.aggressive,
      monthlyReach,
      avgCpl,
      avgCpm,
      avgCpc,
      avgTicket,
      monthlyCapacity,
      returnRate,
      repeatVisitsAverage,
      followerGrowthRate,
      baseConversionRate,
      eligibleMarket,
      exposureIndex,
      competitionIndex,
      saturationFactor,
      diagnosisWeightedScore,
      humanizationScore: client.diagnosisScores.humanization,
      conversionScore: client.diagnosisScores.conversion,
      modelConstant,
      recurringNature: segment.audienceProfile.recurringNature,
    }),
  } satisfies ProjectDashboardSnapshot["kpiTimelineChartData"];

  const investmentCurveChartData = {
    conservative: buildInvestmentCurveSeries({
      config: scenarioConfigs.conservative,
      currentCustomers,
      currentRevenueEstimate,
      baseMonthlySpend: scenarioMonthlySpend.conservative,
      monthlyReach,
      avgCpl,
      avgCpm,
      avgTicket,
      monthlyCapacity,
      returnRate,
      repeatVisitsAverage,
      baseConversionRate,
      eligibleMarket,
      competitionIndex,
      saturationFactor,
      diagnosisWeightedScore,
      conversionScore: client.diagnosisScores.conversion,
      modelConstant,
      recurringNature: segment.audienceProfile.recurringNature,
    }),
    realistic: buildInvestmentCurveSeries({
      config: scenarioConfigs.realistic,
      currentCustomers,
      currentRevenueEstimate,
      baseMonthlySpend: scenarioMonthlySpend.realistic,
      monthlyReach,
      avgCpl,
      avgCpm,
      avgTicket,
      monthlyCapacity,
      returnRate,
      repeatVisitsAverage,
      baseConversionRate,
      eligibleMarket,
      competitionIndex,
      saturationFactor,
      diagnosisWeightedScore,
      conversionScore: client.diagnosisScores.conversion,
      modelConstant,
      recurringNature: segment.audienceProfile.recurringNature,
    }),
    aggressive: buildInvestmentCurveSeries({
      config: scenarioConfigs.aggressive,
      currentCustomers,
      currentRevenueEstimate,
      baseMonthlySpend: scenarioMonthlySpend.aggressive,
      monthlyReach,
      avgCpl,
      avgCpm,
      avgTicket,
      monthlyCapacity,
      returnRate,
      repeatVisitsAverage,
      baseConversionRate,
      eligibleMarket,
      competitionIndex,
      saturationFactor,
      diagnosisWeightedScore,
      conversionScore: client.diagnosisScores.conversion,
      modelConstant,
      recurringNature: segment.audienceProfile.recurringNature,
    }),
  } satisfies ProjectDashboardSnapshot["investmentCurveChartData"];

  const roi = impliedMediaSpend > 0 ? (projectedTotalRevenue - impliedMediaSpend) / impliedMediaSpend : 0;
  const roas = impliedMediaSpend > 0 ? projectedTotalRevenue / impliedMediaSpend : 0;
  const availableSlots = Math.max(monthlyCapacity - currentCustomers, 0);
  const occupancyRate = clamp(currentCustomers / Math.max(monthlyCapacity, 1), 0, 1.4);
  const availableSlotsClassification = combineClassifications(
    monthlyCapacityResolved.classification,
    currentCustomersResolved.classification,
  );

  const highlights = [
    {
      label: "Receita atual / mes",
      value: formatCurrency(round(currentRevenueEstimate)),
      classification: currentRevenueResolved.classification,
      sourceLabel: currentRevenueResolved.trace.sourceLabel,
    },
    {
      label: "Capacidade livre / mes",
      value: `${round(availableSlots)}`,
      classification: availableSlotsClassification,
      sourceLabel: "Capacidade mensal comparada com clientes atuais por mes",
    },
    {
      label: "Seguidores observados",
      value: String(round(followers)),
      classification: followersResolved.classification,
      sourceLabel: followersResolved.trace.sourceLabel,
    },
    {
      label: "Incremento projetado / mes",
      value: `R$ ${round(report.derivedMetrics.projectedTotalRevenue)}`,
      classification: "projected" as DataClassification,
      sourceLabel: "Motor derivado do caso sobre a base atual",
    },
  ];

  const nextDataPoints: string[] = [];
  if (client.businessData.currentRevenueEstimate == null) {
    nextDataPoints.push("Faturamento fechado do ultimo mes ou media dos ultimos 3 meses.");
  }
  if (client.businessData.avgTicket == null) {
    nextDataPoints.push("Ticket medio real por procedimento ou ticket medio mensal.");
  }
  if (client.businessData.monthlyCapacity == null) {
    nextDataPoints.push("Capacidade mensal da agenda considerando equipe, horarios e duracao media.");
  }
  if (client.businessData.currentCustomersPerMonth == null) {
    nextDataPoints.push("Quantidade real de clientes atendidos por mes.");
  }
  if (
    client.instagramData.monthlyReach == null ||
    client.instagramData.profileVisits == null ||
    client.instagramData.linkClicks == null ||
    client.instagramData.messagesPerMonth == null
  ) {
    nextDataPoints.push("Instagram dos ultimos 30 dias: alcance, visitas ao perfil, cliques no link e mensagens.");
  }
  if ((client.googleData.reviews ?? 0) <= 0 || client.googleData.profileViews == null) {
    nextDataPoints.push("Google Perfil da Empresa: reviews, nota, visualizacoes, ligacoes e rotas nos ultimos 30 dias.");
  }
  if (client.businessData.noShowRate == null) {
    nextDataPoints.push("Taxa media de faltas ou remarcacoes por mes.");
  }
  if (client.businessData.returnRate == null) {
    nextDataPoints.push("Percentual de clientes que retornam em 30 e 60 dias.");
  }

  const derivedMarketTraces = [
    createDerivedTrace(
      "eligible-market",
      "Mercado elegivel",
      "Mercado derivado",
      report.derivedMetrics.eligibleMarket,
      "Formula de mercado elegivel",
    ),
    createDerivedTrace(
      "intent-market",
      "Mercado com intencao",
      "Mercado derivado",
      report.derivedMetrics.intentMarket,
      "Formula de intencao",
    ),
    createDerivedTrace(
      "capturable-market",
      "Mercado capturavel",
      "Mercado derivado",
      report.derivedMetrics.capturableMarket,
      "Formula de captacao",
    ),
  ];

  for (const trace of derivedMarketTraces) {
    registerTrace(traces, sectionStats, trace);
  }

  const classificationCounts = countTraceClassifications(traces);
  const precision = buildPrecisionFromTraces(traces);

  const precisionChartData = [
    {
      label: "Conservador",
      precision: round(precision.conservative * 100),
      certainty: round((precision.coverage * 0.98) * 100),
    },
    {
      label: "Realista",
      precision: round(precision.realistic * 100),
      certainty: round((precision.coverage * 0.94) * 100),
    },
    {
      label: "Agressivo",
      precision: round(precision.aggressive * 100),
      certainty: round((precision.coverage * 0.88) * 100),
    },
  ];

  const coverageChartData = buildCoverageChartData(sectionStats);
  const weakestCoverageSections = coverageChartData
    .slice(0, 3)
    .map((item) => item.section.toLowerCase())
    .join(", ");

  const stageLabel =
    occupancyRate >= 0.78
      ? "Operacao aquecida"
      : occupancyRate >= 0.45 || followers >= 700
        ? "Negocio ativo em consolidacao"
        : "Presenca digital em estruturacao";
  const primaryBottleneck =
    reviews === 0 || client.diagnosisScores.googlePresence <= 3
      ? "Google local e prova social ainda nao sustentam a demanda de alta intencao."
      : client.diagnosisScores.offerClarity <= 4 || client.diagnosisScores.conversion <= 4
        ? "Oferta principal e caminho de contato ainda geram atrito na conversao."
        : client.diagnosisScores.humanization <= 4
          ? "Conteudo pouco humano reduz confianca antes do contato."
          : returnRate < benchmark.retention.returnRate * 0.9
            ? "Recorrencia abaixo do benchmark limita previsibilidade de receita."
            : "A falta de dado observado ainda enfraquece a leitura operacional.";
  const primaryOpportunity =
    availableSlots > monthlyCapacity * 0.25
      ? `Existe folga estimada para cerca de ${round(availableSlots)} clientes por mes sem ampliar estrutura.`
      : followers >= 700
        ? "A base social atual ja permite aumentar captacao com CTA, oferta e prova social melhores."
        : returnRate < benchmark.retention.returnRate * 0.9
          ? "Recorrencia e reativacao podem crescer a receita sem depender so de novos leads."
          : "O motor indica espaco para captacao incremental com melhor distribuicao e acompanhamento.";
  const dataQualityLabel =
    precision.overall >= 0.8
      ? "Base forte: o painel ja pode orientar execucao com pouca margem de correcao."
      : precision.overall >= 0.68
        ? "Base mista: vale combinar o painel com confirmacao operacional antes de escalar investimento."
        : `Base fragil: ${weakestCoverageSections || "comercial, operacao e funil"} ainda dependem mais de estimativa do que de dado observado.`;
  const headline =
    reviews === 0 || client.diagnosisScores.googlePresence <= 3
      ? `${client.name} ja tem presenca ativa e folga para crescer, mas ainda converte pouco da demanda local por falta de prova social e estrutura de captura.`
      : `${client.name} ja mostra operacao ativa e espaco para crescer, mas ainda perde eficiencia entre interesse, agenda e fechamento.`;

  const narrative = {
    headline,
    stage: stageLabel,
    primaryBottleneck,
    primaryOpportunity,
    dataQuality: dataQualityLabel,
  } satisfies ProjectDashboardSnapshot["narrative"];

  const insights: string[] = [
    `${stageLabel}: a leitura atual aponta cerca de ${round(currentCustomers)} clientes por mes, ${formatCurrency(round(currentRevenueEstimate))} de receita mensal e ocupacao estimada em ${round(occupancyRate * 100)}% da capacidade.`,
    `A base social existe (${round(followers)} seguidores observados), mas o Google local ainda registra ${round(reviews)} review(s), o que enfraquece a captura de demanda de alta intencao.`,
    primaryBottleneck,
    primaryOpportunity,
    dataQualityLabel,
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
      currentCustomersEstimate: currentCustomers,
      currentRevenueEstimate,
      occupancyRate,
      growthRevenuePotential: projectedTotalRevenue,
      growthCustomersPotential: projectedCustomers,
      adjustedCac,
      roi,
      roas,
      availableSlots,
      organicFollowersPerMonth,
      organicLeadsPerMonth,
      organicCustomersPerMonth,
      valuePerFollower,
    },
    scenarioChartData,
    funnelChartData,
    organicChartData,
    precisionChartData,
    kpiTimelineChartData,
    investmentCurveChartData,
    coverageChartData,
    highlights,
    insights: dedupeStrings(insights, 5),
    nextDataPoints: dedupeStrings(nextDataPoints, 8),
    traces,
  };
}
