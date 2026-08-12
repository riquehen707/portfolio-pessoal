import { z } from "zod";

export const MovieOfferSchema = z.object({
  id: z.string().regex(/^offer_[a-z0-9_]+$/),
  movieId: z.string().min(1),
  provider: z.string().min(1),
  offerType: z.enum(["stream", "rent", "buy", "physical"]),
  url: z.string().url(),
  region: z.string().min(2),
  affiliateId: z.string().optional(),
  commissionDisclosure: z.string().min(1).optional(),
  checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export type MovieOffer = z.infer<typeof MovieOfferSchema>;

// Ofertas são temporais e opcionais. Nenhuma disponibilidade foi confirmada nesta revisão.
export const movieOffers: MovieOffer[] = [];
