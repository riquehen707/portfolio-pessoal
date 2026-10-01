import Image from "next/image";
import Link from "next/link";

import type {
  Product,
  ProductOffer,
  ProductVariant,
} from "@/data/products";

import type { ProductCardProps } from "./ProductCard";
import { ProductOffers } from "./ProductOffers";
import type { ContentLocale } from "@/lib/contentLocale";

import styles from "./ProductListCard.module.scss";

type ProductListCardProps = {
  product: Product;
  variants: readonly ProductVariant[];
  offers: readonly ProductOffer[];
  recommendation?: ProductCardProps;
  locale?: ContentLocale;
};

function essentialSpecifications(variants: readonly ProductVariant[]) {
  const specification = variants[0]?.specifications;
  if (!specification) return [] as Array<[string, string]>;

  switch (specification.type) {
    case "washer-dryer":
      return [["Lavagem", `${specification.washCapacityKg} kg`], ["Secagem", `${specification.dryCapacityKg} kg`], ["Motor", specification.motor], ["Tensão", specification.voltage]];
    case "notebook":
      return [["Processador", specification.processor], ["Memória", `${specification.ramGb} GB`], ["Armazenamento", `${specification.storageGb} GB`], ["Tela", `${specification.display.sizeInches}\"`]];
    case "smartphone":
      return [["Processador", specification.processor], ["Memória", `${specification.ramGb} GB / ${specification.storageGb} GB`], ["Tela", `${specification.display.sizeInches}\"`], ["Bateria", `${specification.batteryMah} mAh`]];
    case "television":
      return [["Tela", `${specification.screenSizeInches}\"`], ["Painel", specification.panelTechnology], ["Sistema", specification.operatingSystem], ["HDMI", `${specification.hdmiPorts} entradas`]];
    case "blender":
      return [["Potência", `${specification.powerNominalWatts} W`], ["Capacidade", `${specification.totalCapacityLiters} L`], ["Copo", specification.jarMaterial], ["Tensão", specification.voltage]];
    case "stand-mixer":
      return [["Potência", `${specification.powerWatts} W`], ["Tigela", `${specification.bowlCapacityLiters} L`], ["Movimento", specification.planetaryMovement ? "Planetário" : "Convencional"], ["Tensão", specification.voltage]];
    case "camera":
      return [["Sensor", specification.sensorFormat], ["Resolução", `${specification.resolutionMegapixels} MP`], ["Vídeo", specification.video], ["Mount", specification.lensMount]];
    case "generic":
      return specification.groups.flatMap((group) => group.entries.map((entry) => [entry.label, entry.value] as [string, string])).slice(0, 4);
  }
}

export function ProductListCard({
  product,
  variants,
  offers,
  recommendation,
  locale = "pt-BR",
}: ProductListCardProps) {
  const specs = essentialSpecifications(variants);
  const localized = product.localizedContent?.[locale];
  const productName = localized?.name ?? product.name;
  const description = localized?.shortDescription ?? product.shortDescription;
  const labels = locale === "en"
    ? { why: "Why we recommend it", best: "Best for", strength: "Main advantage", tradeOff: "Watch out for", analysis: "Read full analysis", price: "A sensible price", avoid: "When to avoid", alternative: "Closest alternative", specifications: "Key specifications" }
    : { why: "Por que recomendamos", best: "Melhor para", strength: "Principal vantagem", tradeOff: "Ponto de atenção", analysis: "Ver análise completa", price: "Preço que faz sentido", avoid: "Quando evitar", alternative: "Alternativa mais próxima", specifications: "Informações essenciais" };

  return (
    <article className={styles.card}>
      <div className={styles.productArea}>
        <div className={styles.media}>
          {product.mainImage ? (
            <Image
              src={product.mainImage.src}
              alt={product.mainImage.alt}
              fill
              sizes="(max-width: 760px) 100vw, 280px"
            />
          ) : (
            <span className={styles.imageFallback} aria-hidden="true">
              {productName.slice(0, 1)}
            </span>
          )}
        </div>

        <div className={styles.content}>
          <header className={styles.header}>
            <div className={styles.meta}>
              <span>{product.category}</span>

              {product.line ? (
                <>
                  <span className={styles.metaSeparator}>/</span>
                  <span>{product.line}</span>
                </>
              ) : null}
            </div>

            <h3 className={styles.title}>
              {product.status === "published" ? (
                <Link href={`/produtos/${product.slug}`}>
                  {productName}
                </Link>
              ) : (
                productName
              )}
            </h3>

            <p className={styles.description}>
              {description}
            </p>

            {variants.length ? (
              <div className={styles.variants}>
                {variants.map((variant) => (
                  <span key={variant.id}>{variant.name}</span>
                ))}
              </div>
            ) : null}
          </header>

          {recommendation ? (
            <div className={styles.recommendation}>
              <div className={styles.verdict}>
                <span className={styles.sectionLabel}>
                  {labels.why}
                </span>

                <p>{recommendation.whyIncluded}</p>
              </div>

              <div className={styles.decisionGrid}>
                <div className={styles.decisionItem}>
                  <span className={styles.decisionLabel}>
                    {labels.best}
                  </span>

                  <p>{recommendation.bestFor}</p>
                </div>

                <div className={styles.decisionItem}>
                  <span className={styles.decisionLabel}>
                    {labels.strength}
                  </span>

                  <p>{recommendation.mainDifference}</p>
                </div>

                <div className={styles.decisionItem}>
                  <span className={styles.decisionLabel}>
                    {labels.tradeOff}
                  </span>

                  <p>{recommendation.tradeOff}</p>
                </div>
              </div>

              <details className={styles.details}>
                <summary>
                  <span>{labels.analysis}</span>
                </summary>

                <div className={styles.detailsGrid}>
                  <div>
                    <span>{labels.price}</span>
                    <p>{recommendation.sensiblePriceRange}</p>
                  </div>

                  <div>
                    <span>{labels.avoid}</span>
                    <p>{recommendation.avoidWhen}</p>
                  </div>

                  <div>
                    <span>{labels.alternative}</span>
                    <p>{recommendation.closestCompetitor}</p>
                  </div>
                </div>
              </details>
            </div>
          ) : null}

          {specs.length ? (
            <dl className={styles.specifications} aria-label={labels.specifications}>
              {specs.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>

      <ProductOffers offers={offers} locale={locale} />
    </article>
  );
}
