import Image from "next/image";
import { OfferAction } from "@/components/offers/OfferAction";
import { organizationsById } from "@/content/organizations/organizations";
import { readingEditions } from "@/content/reading/reading";
import type { ReadingEdition, ReadingOffer } from "@/content/reading/readingSchema";

import styles from "./ReadingLibrary.module.scss";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" });

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T12:00:00Z`));
}

function formatPrice(offer: ReadingOffer) {
  if (!offer.observedPrice) return null;
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: offer.observedPrice.currency }).format(offer.observedPrice.amount);
}

function editionAvailabilityLabel(edition: ReadingEdition) {
  const labels = { available: "disponível", preorder: "pré-venda", unavailable: "indisponível", "out-of-print": "fora de catálogo", unknown: "disponibilidade da edição não confirmada" };
  return labels[edition.availabilityStatus];
}

export function ReadingOffers({ offers, editions = readingEditions }: { offers: readonly ReadingOffer[]; editions?: readonly ReadingEdition[] }) {
  const editionsById = new Map(editions.map((edition) => [edition.id, edition]));
  const activeOffers = offers
    .filter((offer) => offer.availability === "available" || offer.availability === "preorder")
    .sort((left, right) => right.checkedAt.localeCompare(left.checkedAt));
  if (!activeOffers.length) return null;

  return (
    <aside className={styles.offers} aria-label="Edições com oferta verificada">
      {activeOffers.map((offer) => {
        const edition = editionsById.get(offer.editionId);
        const publisher = edition ? organizationsById.get(edition.publisherId)?.name : undefined;
        const price = formatPrice(offer);

        return <article key={offer.id} className={styles.offer}>
          {edition?.cover ? <Image className={styles.offerCover} src={edition.cover.src} alt={edition.cover.alt} width={edition.cover.width} height={edition.cover.height} sizes="72px" /> : <div className={styles.offerCoverFallback}>Capa não confirmada</div>}
          <div className={styles.offerBody}>
            {edition ? <><strong>{edition.title}</strong><span>{publisher ?? "Editora cadastrada"} · {editionAvailabilityLabel(edition)}</span></> : null}
            {price ? <span>Preço observado: {price}</span> : null}
            <span>Oferta verificada em {formatDate(offer.checkedAt)}</span>
            <OfferAction offer={offer} kind="reading" />
          </div>
        </article>;
      })}
    </aside>
  );
}
