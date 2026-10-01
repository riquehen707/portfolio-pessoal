import { OfferAction } from "@/components/offers/OfferAction";
import type { ProductOffer } from "@/data/products";
import type { ContentLocale } from "@/lib/contentLocale";

import styles from "./ProductListCard.module.scss";

function formatPrice(offer: ProductOffer, locale: ContentLocale) {
  if (!offer.observedPrice) return null;
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "pt-BR", { style: "currency", currency: offer.observedPrice.currency }).format(offer.observedPrice.amount);
}

function formatDate(date: string, locale: ContentLocale) {
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "pt-BR", { timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}

export function ProductOffers({ offers, locale = "pt-BR" }: { offers: readonly ProductOffer[]; locale?: ContentLocale }) {
  const activeOffers = offers
    .filter((offer) => offer.availability === "available" || offer.availability === "preorder")
    .filter((offer) => Boolean(offer.affiliateProgram))
    .sort((left, right) => right.checkedAt.localeCompare(left.checkedAt));

  if (!activeOffers.length) return null;

  const [primaryOffer, ...secondaryOffers] = activeOffers;
  const primaryPrice = formatPrice(primaryOffer, locale);
  const labels = locale === "en" ? { verified: "Verified offer", observed: "Observed price", available: "Available when last checked", others: "Other stores", price: "View price" } : { verified: "Oferta verificada", observed: "Preço observado", available: "Disponível na última verificação", others: "Outras lojas", price: "Ver preço" };

  return (
    <aside className={styles.offers} aria-label={labels.verified}>
      <div className={styles.offerHeader}>
        <span className={styles.offerStatus}><span aria-hidden="true" />{labels.verified}</span>
        <span className={styles.offerDate}>{formatDate(primaryOffer.checkedAt, locale)}</span>
      </div>
      <div className={styles.primaryOffer}>
        <span className={styles.retailer}>{primaryOffer.retailer}</span>
        {primaryPrice ? <><span className={styles.priceLabel}>{labels.observed}</span><strong className={styles.offerPrice}>{primaryPrice}</strong></> : <span className={styles.availabilityText}>{labels.available}</span>}
        <OfferAction offer={primaryOffer} className={styles.offerAction} locale={locale} />
      </div>
      {secondaryOffers.length ? (
        <div className={styles.secondaryOffers}>
          <span className={styles.secondaryTitle}>{labels.others}</span>
          {secondaryOffers.map((offer) => (
            <a key={offer.id} className={styles.secondaryOffer} href={offer.url} rel={offer.affiliateProgram ? "sponsored nofollow noreferrer" : "nofollow noreferrer"} target="_blank">
              <span>{offer.retailer}</span><strong>{formatPrice(offer, locale) ?? labels.price}</strong>
            </a>
          ))}
        </div>
      ) : null}
    </aside>
  );
}
