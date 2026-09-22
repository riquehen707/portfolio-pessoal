import { amazonBrazilReadingOffer } from "./amazonBrazil";
import type { ReadingOffer } from "./readingSchema";

// ASINs conferidos nos links "Compre on-line" das fichas oficiais da JBC em
// 2026-09-22. A obra continua no acervo de leitura; a oferta pertence à edição.
const checked = "2026-09-22";

export const animeMangaOffers: ReadingOffer[] = [
  amazonBrazilReadingOffer({
    id: "read_offer_amazon_hellsing_jbc_1",
    editionId: "read_edition_hellsing_jbc_1",
    asin: "6555949074",
    availability: "available",
    checkedAt: checked,
  }),
  amazonBrazilReadingOffer({
    id: "read_offer_amazon_blue_box_jbc_1",
    editionId: "read_edition_blue_box_jbc_1",
    asin: "6555946806",
    availability: "available",
    checkedAt: checked,
  }),
  amazonBrazilReadingOffer({
    id: "read_offer_amazon_parasyte_jbc_1",
    editionId: "read_edition_parasyte_jbc_1",
    asin: "8545700725",
    availability: "available",
    checkedAt: checked,
  }),
];
