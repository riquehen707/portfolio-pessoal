import type { ProductOffer } from "./productSchema";
import { ProductOfferSchema } from "./productSchema";

export const AMAZON_US_RETAILER = "Amazon.com" as const;
export const AMAZON_US_AFFILIATE_PROGRAM = "Amazon Associates" as const;
export const AMAZON_US_COMMISSION_DISCLOSURE =
  "Affiliate link: I may earn a commission at no extra cost to you." as const;

const asinPattern = /^[A-Z0-9]{10}$/;

export function getAmazonUnitedStatesAssociateTag() {
  return process.env.AMAZON_US_ASSOCIATE_TAG?.trim() || undefined;
}

export function buildAmazonUnitedStatesAffiliateUrl(asin: string, associateTag: string) {
  const normalizedAsin = asin.trim().toUpperCase();
  if (!asinPattern.test(normalizedAsin)) throw new Error(`Invalid ASIN: ${asin}`);
  if (!associateTag.trim()) throw new Error("AMAZON_US_ASSOCIATE_TAG is required for Amazon.com offers");
  return `https://www.amazon.com/dp/${normalizedAsin}?tag=${associateTag.trim()}`;
}

type AmazonUnitedStatesOfferInput = Omit<
  ProductOffer,
  "retailer" | "url" | "region" | "affiliateProgram" | "affiliateId" | "commissionDisclosure" | "asin"
> & { asin: string };

// No US offer can be created until the separate Associates tag is supplied in AMAZON_US_ASSOCIATE_TAG.
export function amazonUnitedStatesOffer(input: AmazonUnitedStatesOfferInput): ProductOffer {
  const associateTag = getAmazonUnitedStatesAssociateTag();
  if (!associateTag) throw new Error("AMAZON_US_ASSOCIATE_TAG is not configured");
  const asin = input.asin.trim().toUpperCase();
  return ProductOfferSchema.parse({
    ...input,
    asin,
    retailer: AMAZON_US_RETAILER,
    url: buildAmazonUnitedStatesAffiliateUrl(asin, associateTag),
    region: "US",
    affiliateProgram: AMAZON_US_AFFILIATE_PROGRAM,
    affiliateId: associateTag,
    commissionDisclosure: AMAZON_US_COMMISSION_DISCLOSURE,
  });
}
