import type { ModelConstant } from "@/domain/types";

export const defaultModelConstant: ModelConstant = {
  marketModel: {
    geographicReachDefault: 0.34,
    incomeCompatibilityDefault: 0.28,
    intentRateDefault: 0.048,
  },
  saturationModel: {
    saturationK: 0.25,
    minimumEfficiencyFactor: 0.42,
    competitionPenaltyMultiplier: 0.22,
  },
  scoringModel: {
    bioWeight: 0.16,
    humanizationWeight: 0.15,
    conversionWeight: 0.2,
    brandingWeight: 0.14,
    googlePresenceWeight: 0.18,
    socialProofWeight: 0.17,
  },
  fallbackModel: {
    defaultAvgTicket: 180,
    defaultMonthlyCapacity: 96,
    defaultNoShowRate: 0.12,
    defaultReturnRate: 0.28,
  },
};
