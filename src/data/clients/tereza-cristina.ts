import type { Client } from "@/domain/types";

export const terezaCristina: Client = {
  id: "client_tereza_cristina",
  slug: "tereza-cristina",
  name: "Tereza Cristina Estetica Avancada",
  cityId: "city_cruz_das_almas",
  segmentId: "segment_esthetic",
  brandType: "hybrid",
  serviceSummary: [
    "tratamentos de pele",
    "sobrancelhas",
    "cilios",
    "unhas",
    "podologia",
    "drenagem",
    "preenchimento facial",
  ],
  primaryOffer: null,
  businessData: {},
  instagramData: {
    followers: 908,
    following: 1480,
    postsCount: 367,
  },
  googleData: {
    reviews: 0,
    rating: 0,
  },
  diagnosisScores: {
    bio: 4,
    humanization: 3,
    conversion: 4,
    branding: 6,
    googlePresence: 1,
    socialProof: 4,
    highlights: 4,
    offerClarity: 3,
  },
  diagnosisNotes: [
    "Bio com excesso de informacao",
    "Pouca humanizacao em videos",
    "Google local subutilizado",
    "Destaques extensos e pouco segmentados",
  ],
};
