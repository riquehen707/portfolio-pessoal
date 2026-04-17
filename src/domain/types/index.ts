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
    projectedLeads: number;
    projectedBookings: number;
    projectedShows: number;
    projectedCustomers: number;
    projectedInitialRevenue: number;
    projectedRecurringRevenue: number;
    projectedTotalRevenue: number;
    saturationFactor: number;
  };
  scenarios: {
    conservative: { customers: number; revenue: number };
    realistic: { customers: number; revenue: number };
    aggressive: { customers: number; revenue: number };
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

export type ProjectDashboardSnapshot = {
  slug: string;
  clientName: string;
  cityName: string;
  cityLabel: string;
  cityProfile: Benchmark["cityProfile"];
  segmentName: string;
  benchmarkLabel: string;
  report: DerivedReport;
  classificationCounts: Record<DataClassification, number>;
  precision: {
    overall: number;
    coverage: number;
    conservative: number;
    realistic: number;
    aggressive: number;
  };
  quickMetrics: {
    currentRevenueEstimate: number;
    adjustedCac: number;
    roi: number;
    roas: number;
    availableSlots: number;
    organicFollowersPerMonth: number;
    organicLeadsPerMonth: number;
    organicCustomersPerMonth: number;
    valuePerFollower: number;
  };
  scenarioChartData: Array<{
    month: string;
    atual: number;
    conservador: number;
    realista: number;
    agressivo: number;
  }>;
  funnelChartData: Array<{
    stage: string;
    atual: number;
    conservador: number;
    realista: number;
    agressivo: number;
  }>;
  organicChartData: Array<{
    metric: string;
    atual: number;
    conservador: number;
    realista: number;
    agressivo: number;
  }>;
  precisionChartData: Array<{
    label: string;
    precision: number;
    certainty: number;
  }>;
  coverageChartData: Array<{
    section: string;
    coverage: number;
    confidence: number;
  }>;
  highlights: Array<{
    label: string;
    value: string;
    classification: DataClassification;
    sourceLabel: string;
  }>;
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
