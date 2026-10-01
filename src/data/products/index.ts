import { productCatalog, productsById, productsBySlug } from "@/content/products/products";
import type { ContentLocale, Market } from "@/lib/contentLocale";
import { defaultMarketForLocale } from "@/lib/contentLocale";

export const getAllProducts = async () => productCatalog.products;
export const getPublishedProducts = async () => productCatalog.products.filter((product) => product.status === "published");
export const getProductById = async (id: string) => productsById.get(id);
export const getProductBySlug = async (slug: string) => productsBySlug.get(slug);
export const getProductVariants = async (productId: string, market: Market = "BR") => productCatalog.variants.filter((variant) => variant.productId === productId && variant.market === market);
export const getProductOffers = async (productId: string, market: Market = "BR") => {
  const variantIds = new Set(productCatalog.variants.filter((variant) => variant.productId === productId && variant.market === market).map((variant) => variant.id));
  return productCatalog.offers.filter((offer) => variantIds.has(offer.variantId) && offer.region === market);
};

export function resolveProductMarket(locale: ContentLocale, market?: Market) {
  return market ?? defaultMarketForLocale(locale);
}

export type { Product, ProductOffer, ProductVariant } from "@/content/products/productSchema";
