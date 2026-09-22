import type { ProductOffer } from "@/data/products";

import styles from "./ProductListCard.module.scss";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  timeZone: "UTC",
});

function formatPrice(offer: ProductOffer) {
  if (!offer.observedPrice) {
    return null;
  }

  if (offer.observedPrice.currency === "BRL") {
    return currencyFormatter.format(offer.observedPrice.amount);
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: offer.observedPrice.currency,
  }).format(offer.observedPrice.amount);
}

function formatDate(date: string) {
  return dateFormatter.format(
    new Date(`${date}T12:00:00Z`),
  );
}

export function ProductOffers({
  offers,
}: {
  offers: readonly ProductOffer[];
}) {
  const activeOffers = offers
    .filter(
      (offer) =>
        offer.availability === "available" ||
        offer.availability === "preorder",
    )
    .filter((offer) => Boolean(offer.affiliateProgram))
    .sort((left, right) => {
      return right.checkedAt.localeCompare(left.checkedAt);
    });

  if (!activeOffers.length) {
    return null;
  }

  const [primaryOffer, ...secondaryOffers] = activeOffers;

  const primaryPrice = formatPrice(primaryOffer);

  return (
    <aside
      className={styles.offers}
      aria-label="Ofertas verificadas"
    >
      <div className={styles.offerHeader}>
        <span className={styles.offerStatus}>
          <span aria-hidden="true" />
          Oferta verificada
        </span>

        <span className={styles.offerDate}>
          {formatDate(primaryOffer.checkedAt)}
        </span>
      </div>

      <div className={styles.primaryOffer}>
        <span className={styles.retailer}>
          {primaryOffer.retailer}
        </span>

        {primaryPrice ? (
          <>
            <span className={styles.priceLabel}>
              Preço observado
            </span>

            <strong className={styles.offerPrice}>
              {primaryPrice}
            </strong>
          </>
        ) : (
          <span className={styles.availabilityText}>
            Disponível na última verificação
          </span>
        )}

        <a
          className={styles.offerButton}
          href={primaryOffer.url}
          rel={
            primaryOffer.affiliateProgram
              ? "sponsored nofollow noreferrer"
              : "nofollow noreferrer"
          }
          target="_blank"
        >
          Ver na {primaryOffer.retailer}
          <span aria-hidden="true">↗</span>
        </a>

        {primaryOffer.commissionDisclosure ? (
          <small className={styles.disclosure}>
            {primaryOffer.commissionDisclosure}
          </small>
        ) : null}
      </div>

      {secondaryOffers.length ? (
        <div className={styles.secondaryOffers}>
          <span className={styles.secondaryTitle}>
            Outras lojas
          </span>

          {secondaryOffers.map((offer) => {
            const price = formatPrice(offer);

            return (
              <a
                key={offer.id}
                className={styles.secondaryOffer}
                href={offer.url}
                rel={
                  offer.affiliateProgram
                    ? "sponsored nofollow noreferrer"
                    : "nofollow noreferrer"
                }
                target="_blank"
              >
                <span>{offer.retailer}</span>

                <strong>
                  {price ?? "Ver preço"}
                </strong>
              </a>
            );
          })}
        </div>
      ) : null}
    </aside>
  );
}
