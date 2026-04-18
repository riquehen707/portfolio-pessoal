export type City = {
  id: string;
  slug: string;
  name: string;
  state: string;
  population: number;
  populationYear: number;
  femaleRate: number;
  maleRate: number;
  ageDistribution: {
    age15_24: number;
    age25_34: number;
    age35_44: number;
    age45_59: number;
    age60Plus: number;
  };
  pibPerCapita?: number | null;
  densityIndex?: number | null;
  regionalFlowIndex?: number | null;
  competitionIndex?: number | null;
};

export type Segment = {
  id: string;
  slug: string;
  name: string;
  audienceProfile: {
    primaryGender: "female" | "male" | "mixed";
    primaryAgeRanges: string[];
    recurringNature: boolean;
    localIntentImportance: number;
    reputationImportance: number;
  };
  revenueProfile: {
    typicalTicketLow: number;
    typicalTicketMid: number;
    typicalTicketHigh: number;
    recurrencePotential: number;
  };
};

export type Benchmark = {
  id: string;
  segmentId: string;
  cityProfile: "small" | "medium" | "large";
  paidTraffic: {
    avgCtr: number;
    avgCpc?: number | null;
    avgCpm?: number | null;
    avgCpl: number;
  };
  funnel: {
    leadToBookingRate: number;
    bookingToShowRate: number;
    showToSaleRate: number;
  };
  retention: {
    returnRate: number;
    repeatVisitsAverage: number;
  };
  organic: {
    followerGrowthRateBase: number;
    organicLeadRate: number;
    profileVisitRate: number;
  };
  googleLocal: {
    reviewsImpactFactor: number;
    googlePresenceImpactFactor: number;
    mapIntentFactor: number;
  };
  confidence: number;
};

export type ModelConstant = {
  marketModel: {
    geographicReachDefault: number;
    incomeCompatibilityDefault: number;
    intentRateDefault: number;
  };
  saturationModel: {
    saturationK: number;
    minimumEfficiencyFactor: number;
    competitionPenaltyMultiplier: number;
  };
  scoringModel: {
    bioWeight: number;
    humanizationWeight: number;
    conversionWeight: number;
    brandingWeight: number;
    googlePresenceWeight: number;
    socialProofWeight: number;
  };
  fallbackModel: {
    defaultAvgTicket: number;
    defaultMonthlyCapacity: number;
    defaultNoShowRate: number;
    defaultReturnRate: number;
  };
};

export type Client = {
  id: string;
  slug: string;
  name: string;
  cityId: string;
  segmentId: string;
  brandType: "personal" | "business" | "hybrid";
  serviceSummary: string[];
  primaryOffer?: string | null;
  businessData: {
    avgTicket?: number | null;
    monthlyCapacity?: number | null;
    currentCustomersPerMonth?: number | null;
    returnRate?: number | null;
    noShowRate?: number | null;
    currentRevenueEstimate?: number | null;
  };
  instagramData: {
    followers?: number | null;
    following?: number | null;
    postsCount?: number | null;
    monthlyReach?: number | null;
    monthlyEngagement?: number | null;
    profileVisits?: number | null;
    linkClicks?: number | null;
    reelViewsAverage?: number | null;
    messagesPerMonth?: number | null;
    followerGrowthRate?: number | null;
  };
  googleData: {
    reviews?: number | null;
    rating?: number | null;
    profileViews?: number | null;
    callsClicks?: number | null;
    routeClicks?: number | null;
    websiteClicks?: number | null;
    photosCount?: number | null;
    rankingEstimate?: number | null;
  };
  diagnosisScores: {
    bio: number;
    humanization: number;
    conversion: number;
    branding: number;
    googlePresence: number;
    socialProof: number;
    highlights: number;
    offerClarity: number;
  };
  diagnosisNotes: string[];
};

export type DerivedReport = {
  id: string;
  clientId: string;
  createdAt: string;
  derivedMetrics: {
    eligibleMarket: number;
    intentMarket: number;
    capturableMarket: number;
    baseLeadsPotential: number;
    baseBookingsPotential: number;
    baseShowsPotential: number;
    baseCustomersPotential: number;
    baseMonthlyRevenuePotential: number;
    benchmarkTicket: number;
    saturationFactor: number;
  };
  scenarios: {
    conservative: ProjectProposalSummary;
    realistic: ProjectProposalSummary;
    aggressive: ProjectProposalSummary;
  };
  recommendations: string[];
};

export type DataClassification = "real" | "estimated" | "projected";

export type MetricSourceKind = "observed" | "benchmark" | "fallback" | "derived";

export type MetricTrace = {
  key: string;
  label: string;
  section: string;
  value: number;
  classification: DataClassification;
  sourceKind: MetricSourceKind;
  sourceLabel: string;
  confidence: number;
};

export type ScenarioKey = keyof DerivedReport["scenarios"];

export type ProjectProposalSummary = {
  chartLabel: string;
  title: string;
  summary: string;
  investment: number;
  timeline: string;
  ctaHref: string;
  ctaLabel: string;
  monthlyRevenue: number;
  annualRevenue: number;
  netReturn: number;
  paybackMonths: number | null;
  leads: number;
  bookings: number;
  shows: number;
  customers: number;
  roas: number;
};

export type ProjectProposalTimelinePoint = {
  month: string;
  investment: number;
  monthlyReturn: number;
  cumulativeReturn: number;
  netReturn: number;
  customers: number;
  roas: number;
};

export type ProjectProposalReturnPoint = {
  proposal: string;
  spend: number;
  monthlyReturn: number;
  annualReturn: number;
  netReturn: number;
  paybackMonths: number;
  customers: number;
  roas: number;
};

export type ProjectDashboardClassificationCounts = Record<DataClassification, number>;

export type ProjectDashboardPrecision = {
  overall: number;
  coverage: number;
  conservative: number;
  realistic: number;
  aggressive: number;
};

export type ProjectScenarioChartPoint = {
  month: string;
  conservador: number;
  realista: number;
  agressivo: number;
};

export type ProjectFunnelChartPoint = {
  stage: string;
  conservador: number;
  realista: number;
  agressivo: number;
};

export type ProjectPrecisionChartPoint = {
  label: string;
  precision: number;
  certainty: number;
};

export type ProjectCoverageChartPoint = {
  section: string;
  coverage: number;
  confidence: number;
};

export type ProjectHighlight = {
  label: string;
  value: string;
  classification: DataClassification;
  sourceLabel: string;
};

export type ProjectBusinessNarrative = {
  headline: string;
  stage: string;
  primaryBottleneck: string;
  primaryOpportunity: string;
  dataQuality: string;
};

export type ProjectDashboardSnapshot = {
  slug: string;
  clientName: string;
  cityName: string;
  cityLabel: string;
  cityProfile: Benchmark["cityProfile"];
  segmentName: string;
  benchmarkLabel: string;
  report: DerivedReport;
  classificationCounts: ProjectDashboardClassificationCounts;
  precision: ProjectDashboardPrecision;
  narrative: ProjectBusinessNarrative;
  quickMetrics: {
    benchmarkTicket: number;
    benchmarkTicketClassification: DataClassification;
    baseMonthlyRevenuePotential: number;
    baseCustomersPotential: number;
    bestProposalInvestment: number;
    bestProposalAnnualReturn: number;
    bestProposalPaybackMonths: number | null;
  };
  scenarioChartData: ProjectScenarioChartPoint[];
  funnelChartData: ProjectFunnelChartPoint[];
  precisionChartData: ProjectPrecisionChartPoint[];
  proposalTimelineChartData: Record<ScenarioKey, ProjectProposalTimelinePoint[]>;
  proposalReturnChartData: ProjectProposalReturnPoint[];
  coverageChartData: ProjectCoverageChartPoint[];
  highlights: ProjectHighlight[];
  insights: string[];
  nextDataPoints: string[];
  traces: MetricTrace[];
};

export type ExecutiveSummarySection = {
  id: string;
  title: string;
  problem: string;
  impact: string[];
  improvement: string[];
  diagnosis: string;
};

export type ProjectExecutiveSummary = {
  id: string;
  clientId: string;
  title: string;
  summary: string;
  businessSummary: string[];
  scorecard: {
    localPresence: number;
    socialAuthority: number;
    brandHumanization: number;
    contentStrategy: number;
    visualIdentity: number;
    growthPotential: string;
  };
  sections: ExecutiveSummarySection[];
  closingNote: string;
};
