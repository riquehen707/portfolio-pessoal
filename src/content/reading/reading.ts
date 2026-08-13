import { ReadingCatalogSchema } from "./readingSchema";

// O domínio nasce vazio de propósito: o primeiro lote real deve usar fontes e passar pela auditoria.
export const readingCatalog = ReadingCatalogSchema.parse({ works: [], series: [], installments:[], volumes: [], editions: [], offers: [] });
export const readingWorks = readingCatalog.works;
export const readingSeries = readingCatalog.series;
export const readingVolumes = readingCatalog.volumes;
export const readingInstallments = readingCatalog.installments;
export const readingEditions = readingCatalog.editions;
export const readingOffers = readingCatalog.offers;
