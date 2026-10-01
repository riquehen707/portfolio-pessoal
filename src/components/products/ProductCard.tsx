import { z } from "zod";

import {
  getProductById,
  getProductOffers,
  getProductVariants,
} from "@/data/products";
import { defaultMarketForLocale, type ContentLocale, type Market } from "@/lib/contentLocale";

import { ProductListCard } from "./ProductListCard";

const RecommendationSchema = z.object({
  productId: z.string().regex(/^prod_[a-z0-9_]+$/),
  whyIncluded: z.string().min(20),
  bestFor: z.string().min(20),
  mainDifference: z.string().min(20),
  tradeOff: z.string().min(20),
  sensiblePriceRange: z.string().min(10),
  avoidWhen: z.string().min(20),
  closestCompetitor: z.string().min(10),
});

export type ProductCardProps = z.infer<typeof RecommendationSchema>;
type ProductCardContext = { locale?: ContentLocale; market?: Market };

export async function ProductCard(props: ProductCardProps & ProductCardContext) {
  const recommendation =
    RecommendationSchema.parse(props);

  const product = await getProductById(
    recommendation.productId,
  );

  if (!product) {
    throw new Error(
      `ProductCard referencia produto inexistente: ${recommendation.productId}`,
    );
  }

  const [variants, offers] = await Promise.all([
    getProductVariants(product.id, props.market ?? defaultMarketForLocale(props.locale ?? "pt-BR")),
    getProductOffers(product.id, props.market ?? defaultMarketForLocale(props.locale ?? "pt-BR")),
  ]);

  return (
    <ProductListCard
      product={product}
      variants={variants}
      offers={offers}
      recommendation={recommendation}
      locale={props.locale}
    />
  );
}
