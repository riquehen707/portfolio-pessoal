import { productCatalog, productsById, productsBySlug } from "@/content/products/products";

export const getAllProducts = async () => productCatalog.products;
export const getPublishedProducts = async () => productCatalog.products.filter((product) => product.status === "published");
export const getProductById = async (id: string) => productsById.get(id);
export const getProductBySlug = async (slug: string) => productsBySlug.get(slug);
export const getProductVariants = async (productId: string) => productCatalog.variants.filter((variant) => variant.productId === productId);
export const getProductOffers = async (productId: string) => {
  const variantIds = new Set(productCatalog.variants.filter((variant) => variant.productId === productId).map((variant) => variant.id));
  return productCatalog.offers.filter((offer) => variantIds.has(offer.variantId));
};

export type { Product, ProductOffer, ProductVariant } from "@/content/products/productSchema";
