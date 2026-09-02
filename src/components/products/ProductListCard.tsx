import Image from "next/image";
import Link from "next/link";
import type { Product, ProductOffer, ProductVariant } from "@/data/products";
import type { ProductCardProps } from "./ProductCard";
import { ProductOffers } from "./ProductOffers";
import styles from "./ProductListCard.module.scss";

export function ProductListCard({ product, variants, offers, recommendation }: {
  product: Product;
  variants: readonly ProductVariant[];
  offers: readonly ProductOffer[];
  recommendation?: ProductCardProps;
}) {
  return <article className={styles.card}>
    <div className={styles.media}>{product.mainImage ? <Image src={product.mainImage.src} alt={product.mainImage.alt} fill sizes="(max-width: 720px) 100vw, 240px" /> : <span aria-hidden="true">{product.name.slice(0, 1)}</span>}</div>
    <div className={styles.content}>
      <span className={styles.eyebrow}>{product.category}{product.line ? ` · ${product.line}` : ""}</span>
      <h3>{product.status === "published" ? <Link href={`/produtos/${product.slug}`}>{product.name}</Link> : product.name}</h3>
      <p>{product.shortDescription}</p>
      {variants.length ? <small>{variants.map((variant) => variant.name).join(" · ")}</small> : null}
      {recommendation ? <dl className={styles.analysis}>
        <div><dt>Por que está nesta lista?</dt><dd>{recommendation.whyIncluded}</dd></div>
        <div><dt>Para quem faz sentido?</dt><dd>{recommendation.bestFor}</dd></div>
        <div><dt>Principal diferencial</dt><dd>{recommendation.mainDifference}</dd></div>
        <div><dt>Onde perde</dt><dd>{recommendation.tradeOff}</dd></div>
        <div><dt>Faixa em que faz sentido</dt><dd>{recommendation.sensiblePriceRange}</dd></div>
        <div><dt>Quando não recomendamos</dt><dd>{recommendation.avoidWhen}</dd></div>
        <div><dt>Concorrente mais próximo</dt><dd>{recommendation.closestCompetitor}</dd></div>
      </dl> : null}
      <ProductOffers offers={offers} />
    </div>
  </article>;
}
