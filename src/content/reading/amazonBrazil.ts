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

/**
 * Fallback para edição cujo ISBN é conhecido, mas sem ASIN comercial confirmado.
 * O link abre uma BUSCA na Amazon; não identifica uma oferta ou confirma estoque.
 */
export function amazonBrazilIsbnSearchUrl(isbn13: string): string {
  const isbn = isbn13.replace(/[-\s]/g, "");
  if (!/^\d{13}$/.test(isbn)) throw new Error(`ISBN-13 inválido para busca: ${isbn13}`);
  const checksum = isbn.split("").reduce((sum, digit, index) => sum + Number(digit) * (index % 2 === 0 ? 1 : 3), 0);
  if (checksum % 10 !== 0) throw new Error(`Dígito verificador ISBN-13 inválido: ${isbn13}`);
  return `https://www.amazon.com.br/s?k=${encodeURIComponent(isbn)}&tag=${AMAZON_BR_ASSOCIATE_TAG}`;
}
