import { z } from "zod";

import { getProductById, getProductVariants } from "@/data/products";
import { AMAZON_BR_ASSOCIATE_TAG, AMAZON_BR_COMMISSION_DISCLOSURE } from "@/content/products/amazonBrazil";
import { OfferAction } from "@/components/offers/OfferAction";
import { ProductListCard } from "./ProductListCard";
import type { ProductCardProps } from "./ProductCard";
import styles from "./MangaBoxCard.module.scss";

const schema = z.object({
  productId: z.string().regex(/^prod_manga_box_[a-z0-9_]+$/),
  whyIncluded: z.string().min(20),
  bestFor: z.string().min(20),
  mainDifference: z.string().min(20),
  tradeOff: z.string().min(20),
  sensiblePriceRange: z.string().min(10),
  avoidWhen: z.string().min(20),
  closestCompetitor: z.string().min(10),
});

const buildSearchUrl = (title: string, code: string) => {
  // Consulta por código da editora e nome. Trata-se de BUSCA, nunca de ASIN verificado.
  const query = [title, code].filter(Boolean).join(" ");
  return `https://www.amazon.com.br/s?k=${encodeURIComponent(query)}&tag=${AMAZON_BR_ASSOCIATE_TAG}`;
};

export async function MangaBoxCard(props: ProductCardProps) {
  const recommendation = schema.parse(props);
  const product = await getProductById(recommendation.productId);
  if (!product) throw new Error(`MangaBoxCard: produto não cadastrado ${recommendation.productId}`);

  const variants = await getProductVariants(product.id, "BR");
  if (!variants.length) throw new Error(`MangaBoxCard: nenhuma variante brasileira para ${product.id}`);
  const sku = variants[0].manufacturerModelNumber ?? "";

  const offer = {
    retailer: "Amazon Brasil",
    url: buildSearchUrl(product.name, sku),
    affiliateProgram: "Amazon Associados",
    commissionDisclosure: AMAZON_BR_COMMISSION_DISCLOSURE,
  };

  return (
    <section className={styles.wrapper} aria-label={`${product.name} e busca do box`}>
      <ProductListCard product={product} variants={variants} offers={[]} recommendation={recommendation} />
      <div className={styles.search}>
        <p className={styles.notice}><strong>Busca afiliada por box e código da editora.</strong> Sem anúncio Amazon específico ou estoque confirmado. Confira se o resultado contém os volumes e a caixa descritos acima.</p>
        <OfferAction offer={offer} label="Buscar este box na Amazon" />
      </div>
    </section>
  );
}
