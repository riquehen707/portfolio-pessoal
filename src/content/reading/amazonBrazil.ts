import {
  AMAZON_BR_AFFILIATE_PROGRAM,
  AMAZON_BR_ASSOCIATE_TAG,
  AMAZON_BR_COMMISSION_DISCLOSURE,
  AMAZON_BR_RETAILER,
  buildAmazonBrazilAffiliateUrl,
} from "../products/amazonBrazil";

import type { ReadingOffer } from "./readingSchema";
import { ReadingOfferSchema } from "./readingSchema";

type AmazonBrazilReadingOfferInput = Omit<
  ReadingOffer,
  "store" | "url" | "region" | "affiliateProgram" | "affiliateId" | "asin" | "commissionDisclosure"
> & {
  asin: string;
};

export function amazonBrazilReadingOffer(
  input: AmazonBrazilReadingOfferInput,
): ReadingOffer {
  const asin = input.asin.trim().toUpperCase();

  return ReadingOfferSchema.parse({
    ...input,
    asin,
    store: AMAZON_BR_RETAILER,
    url: buildAmazonBrazilAffiliateUrl(asin),
    region: "BR",
    affiliateProgram: AMAZON_BR_AFFILIATE_PROGRAM,
    affiliateId: AMAZON_BR_ASSOCIATE_TAG,
    commissionDisclosure: AMAZON_BR_COMMISSION_DISCLOSURE,
  });
}
