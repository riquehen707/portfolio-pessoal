import type { Product, ProductOffer, ProductVariant } from "@/data/products";
import { baseURL } from "@/resources";

export function ProductJsonLd({ product, variants, offers }: { product: Product; variants: readonly ProductVariant[]; offers: readonly ProductOffer[] }) {
  const activeOffers = offers.filter((offer) => offer.availability === "available" || offer.availability === "preorder");
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    url: `${baseURL}/produtos/${product.slug}`,
    image: product.mainImage ? `${baseURL}${product.mainImage.src}` : undefined,
    sku: variants[0]?.manufacturerModelNumber,
    gtin: variants[0]?.gtin,
    offers: activeOffers.map((offer) => ({
      "@type": "Offer",
      url: offer.url,
      price: offer.observedPrice?.amount,
      priceCurrency: offer.observedPrice?.currency,
      availability: offer.availability === "available" ? "https://schema.org/InStock" : "https://schema.org/PreOrder",
      seller: { "@type": "Organization", name: offer.retailer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
