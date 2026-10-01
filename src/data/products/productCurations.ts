import { getAllArticles } from "@/data/articles";
import { getPublishedProducts } from "@/data/products";

import { getCommercialStoreItems } from "./commercialDiscovery";

export type ProductCuration = {
  slug: string;
  title: string;
  summary: string;
  image?: { src: string; alt: string };
  category?: string;
  productCount: number;
};

export async function getProductCurations(): Promise<ProductCuration[]> {
  const [products, items] = await Promise.all([getPublishedProducts(), getCommercialStoreItems()]);
  const commercialProductIds = new Set(items.filter((item) => item.kind === "product").map((item) => item.id));
  const postsBySlug = new Map(getAllArticles().map((post) => [post.slug, post]));
  const counts = new Map<string, number>();

  products
    .filter((product) => commercialProductIds.has(product.id))
    .flatMap((product) => product.relatedArticleSlugs)
    .forEach((slug) => counts.set(slug, (counts.get(slug) ?? 0) + 1));

  return [...counts.entries()]
    .map(([slug, productCount]) => {
      const post = postsBySlug.get(slug);
      if (!post) return undefined;
      return {
        slug,
        title: post.metadata.title,
        summary: post.metadata.summary ?? "",
        image: post.metadata.image ? { src: post.metadata.image, alt: post.metadata.imageAlt ?? post.metadata.title } : undefined,
        category: post.metadata.category ?? post.collection,
        productCount,
        featured: Boolean(post.metadata.featured),
        updatedAt: post.metadata.updatedAt ?? post.metadata.publishedAt ?? "",
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((left, right) => Number(right.featured) - Number(left.featured) || right.productCount - left.productCount || right.updatedAt.localeCompare(left.updatedAt))
    .slice(0, 6)
    .map(({ featured: _featured, updatedAt: _updatedAt, ...item }) => item);
}
