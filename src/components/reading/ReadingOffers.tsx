import { OfferAction } from "@/components/offers/OfferAction";
import type { ReadingOffer } from "@/content/reading/readingSchema";

import styles from "./ReadingLibrary.module.scss";

export function ReadingOffers({ offers }: { offers: readonly ReadingOffer[] }) {
  const activeOffers = offers.filter((offer) => offer.availability === "available" || offer.availability === "preorder");
  if (!activeOffers.length) return null;

  return (
    <aside className={styles.offers} aria-label="Ofertas desta edição">
      {activeOffers.map((offer) => <OfferAction key={offer.id} offer={offer} kind="reading" />)}
    </aside>
  );
}
