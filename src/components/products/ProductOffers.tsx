import type { ProductOffer } from "@/data/products";
import styles from "./ProductListCard.module.scss";

export function ProductOffers({ offers }: { offers: readonly ProductOffer[] }) {
  const active = offers.filter((offer) => offer.availability === "available" || offer.availability === "preorder");
  if (!active.length) return null;
  return <aside className={styles.offers} aria-label="Ofertas verificadas">
    <strong>Ofertas verificadas</strong>
    {active.map((offer) => <div key={offer.id}>
      <a href={offer.url} rel={offer.affiliateProgram ? "sponsored nofollow noreferrer" : "nofollow noreferrer"} target="_blank">Ver em {offer.retailer}</a>
      {offer.observedPrice ? <span>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: offer.observedPrice.currency }).format(offer.observedPrice.amount)} observado em {new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${offer.checkedAt}T12:00:00Z`))}</span> : <span>Disponibilidade verificada em {new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(new Date(`${offer.checkedAt}T12:00:00Z`))}</span>}
      {offer.commissionDisclosure ? <small>{offer.commissionDisclosure}</small> : null}
    </div>)}
  </aside>;
}
