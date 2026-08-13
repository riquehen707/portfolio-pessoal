import type { ReadingOffer } from "@/content/reading/readingSchema";
import styles from "./ReadingLibrary.module.scss";

export function ReadingOffers({ offers }: { offers: readonly ReadingOffer[] }) {
  if (!offers.length) return null;
  return <aside className={styles.offers} aria-label="Ofertas desta edição">{offers.filter((offer) => offer.availability === "available" || offer.availability === "preorder").map((offer) => <div key={offer.id}><a href={offer.url} rel="sponsored nofollow">{offer.store}</a>{offer.commissionDisclosure && <small> · {offer.commissionDisclosure}</small>}</div>)}</aside>;
}
