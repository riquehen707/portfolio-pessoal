import { creators } from "@/content/creators/creators";
import { organizationsById } from "@/content/organizations/organizations";
import { getReadingWorkPath, isComicWork } from "@/content/reading/readingDomain";
import { getPublishedProducts, getProductOffers } from "@/data/products";
import { getPublishedReadingWorks, getReadingEditions, getReadingOffersForEdition } from "@/data/reading";

export type CommercialStoreItem = {
  id: string;
  kind: "product" | "reading-edition";
  title: string;
  subtitle?: string;
  category: string;
  subcategories: string[];
  description: string;
  href: string;
  image?: { src: string; alt: string };
  offer: { retailer: string; url: string; affiliate: boolean; availability: "available" | "preorder"; observedPrice?: { amount: number; currency: string }; disclosure?: string };
  searchTerms: string[];
};

const active = <T extends { availability: string }>(offers: readonly T[]) => offers.filter((offer) => offer.availability === "available" || offer.availability === "preorder");
const selectOffer = <T extends { affiliateProgram?: string }>(offers: readonly T[]) => offers.find((offer) => Boolean(offer.affiliateProgram)) ?? offers[0];

export async function getCommercialStoreItems(): Promise<CommercialStoreItem[]> {
  const [products, works, editions] = await Promise.all([getPublishedProducts(), getPublishedReadingWorks(), getReadingEditions()]);
  const workById = new Map(works.map((work) => [work.id, work]));
  const peopleById = new Map(creators.map((person) => [person.id, person]));
  const productItems = (await Promise.all(products.map(async (product) => {
    const offer = selectOffer(active(await getProductOffers(product.id)));
    if (!offer) return undefined;
    return { id: product.id, kind: "product" as const, title: product.name, subtitle: product.line, category: product.category, subcategories: product.categories.filter((category) => category !== product.category), description: product.shortDescription, href: `/produtos/${product.slug}`, image: product.mainImage ? { src: product.mainImage.src, alt: product.mainImage.alt } : undefined, offer: { retailer: offer.retailer, url: offer.url, affiliate: Boolean(offer.affiliateProgram), availability: offer.availability as "available" | "preorder", observedPrice: offer.observedPrice, disclosure: offer.commissionDisclosure }, searchTerms: [product.name, product.line, ...product.aliases, product.category, ...product.categories, ...product.tags].filter((value): value is string => Boolean(value)) };
  }))).filter((item): item is NonNullable<typeof item> => item !== undefined);
  const readingItems = (await Promise.all(editions.map(async (edition) => {
    if (edition.status !== "published") return undefined;
    const work = edition.workId ? workById.get(edition.workId) : undefined;
    if (!work) return undefined;
    const offer = selectOffer(active(await getReadingOffersForEdition(edition.id)));
    if (!offer) return undefined;
    const authors = work.credits.map((credit) => peopleById.get(credit.personId)?.name).filter((name): name is string => Boolean(name));
    const publisher = organizationsById.get(edition.publisherId)?.name;
    const category = isComicWork(work) ? "Quadrinhos" : "Livros";
    return { id: edition.id, kind: "reading-edition" as const, title: edition.title, subtitle: authors.join(", ") || work.titleBr || work.originalTitle, category, subcategories: [...work.categories, ...work.genres].filter((value) => value !== category), description: work.shortDescription, href: getReadingWorkPath(work), image: edition.cover ? { src: edition.cover.src, alt: edition.cover.alt } : work.image ? { src: work.image.src, alt: work.image.alt } : undefined, offer: { retailer: offer.store, url: offer.url, affiliate: Boolean(offer.affiliateProgram), availability: offer.availability as "available" | "preorder", disclosure: offer.commissionDisclosure }, searchTerms: [edition.title, work.titleBr, work.originalTitle, work.romanizedTitle, ...work.aliases, ...authors, publisher, edition.medium, ...work.categories, ...work.genres, ...work.themes].filter((value): value is string => Boolean(value)) };
  }))).filter((item): item is NonNullable<typeof item> => item !== undefined);
  return [...productItems, ...readingItems].sort((left, right) => left.title.localeCompare(right.title, "pt-BR"));
}
