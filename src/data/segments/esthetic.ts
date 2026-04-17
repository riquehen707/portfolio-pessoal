import type { Segment } from "@/domain/types";

export const estheticSegment: Segment = {
  id: "segment_esthetic",
  slug: "esthetic",
  name: "Estetica e Beleza",
  audienceProfile: {
    primaryGender: "female",
    primaryAgeRanges: ["18-24", "25-34", "35-44", "45-59"],
    recurringNature: true,
    localIntentImportance: 0.85,
    reputationImportance: 0.9,
  },
  revenueProfile: {
    typicalTicketLow: 80,
    typicalTicketMid: 180,
    typicalTicketHigh: 450,
    recurrencePotential: 0.75,
  },
};
