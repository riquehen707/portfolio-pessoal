import type { ProductOffer } from "./productSchema";
import { ProductOfferSchema } from "./productSchema";

export const AMAZON_BR_ASSOCIATE_TAG = "riquehen-20" as const;
export const AMAZON_BR_RETAILER = "Amazon Brasil" as const;
export const AMAZON_BR_AFFILIATE_PROGRAM = "Amazon Associados" as const;
export const AMAZON_BR_COMMISSION_DISCLOSURE = "Link de afiliado: posso receber uma comissão sem custo adicional para você." as const;

const asinPattern = /^[A-Z0-9]{10}$/;

export function buildAmazonBrazilAffiliateUrl(asin: string) {
  const normalizedAsin = asin.trim().toUpperCase();
  if (!asinPattern.test(normalizedAsin)) throw new Error(`ASIN inválido: ${asin}`);
  return `https://www.amazon.com.br/dp/${normalizedAsin}?tag=${AMAZON_BR_ASSOCIATE_TAG}`;
}

type AmazonBrazilOfferInput = Omit<ProductOffer, "retailer" | "url" | "region" | "affiliateProgram" | "affiliateId" | "commissionDisclosure" | "asin"> & {
  asin: string;
};

export function amazonBrazilOffer(input: AmazonBrazilOfferInput): ProductOffer {
  const asin = input.asin.trim().toUpperCase();
  return ProductOfferSchema.parse({
    ...input,
    asin,
    retailer: AMAZON_BR_RETAILER,
    url: buildAmazonBrazilAffiliateUrl(asin),
    region: "BR",
    affiliateProgram: AMAZON_BR_AFFILIATE_PROGRAM,
    affiliateId: AMAZON_BR_ASSOCIATE_TAG,
    commissionDisclosure: AMAZON_BR_COMMISSION_DISCLOSURE,
  });
}
