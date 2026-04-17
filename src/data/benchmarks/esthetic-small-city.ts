import type { Benchmark } from "@/domain/types";

export const estheticSmallCityBenchmark: Benchmark = {
  id: "benchmark_esthetic_small_city",
  segmentId: "segment_esthetic",
  cityProfile: "small",
  paidTraffic: {
    avgCtr: 0.021,
    avgCpc: 1.9,
    avgCpm: 16.5,
    avgCpl: 14,
  },
  funnel: {
    leadToBookingRate: 0.46,
    bookingToShowRate: 0.78,
    showToSaleRate: 0.66,
  },
  retention: {
    returnRate: 0.41,
    repeatVisitsAverage: 1.7,
  },
  organic: {
    followerGrowthRateBase: 0.028,
    organicLeadRate: 0.013,
    profileVisitRate: 0.084,
  },
  googleLocal: {
    reviewsImpactFactor: 0.88,
    googlePresenceImpactFactor: 0.82,
    mapIntentFactor: 0.76,
  },
  confidence: 0.74,
};
