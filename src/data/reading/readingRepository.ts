import type { ReadingEdition, ReadingOffer, ReadingSeries, ReadingVolume, ReadingWork } from "@/content/reading/readingSchema";

export interface ReadingRepository {
  getWorks(): Promise<readonly ReadingWork[]>;
  getWorkById(id: string): Promise<ReadingWork | undefined>;
  getWorkBySlug(slug: string): Promise<ReadingWork | undefined>;
  getPublishedWorks(): Promise<readonly ReadingWork[]>;
  getPublishedBooks(): Promise<readonly ReadingWork[]>;
  getPublishedComics(): Promise<readonly ReadingWork[]>;
  findWork(value: string): Promise<ReadingWork | undefined>;
  getSeries(): Promise<readonly ReadingSeries[]>;
  getSeriesById(id: string): Promise<ReadingSeries | undefined>;
  getVolumesForWork(workId: string): Promise<readonly ReadingVolume[]>;
  getInstallmentsForWork(workId: string): Promise<readonly import("@/content/reading/readingSchema").ReadingInstallment[]>;
  getEditionsForWork(workId: string): Promise<readonly ReadingEdition[]>;
  getOffersForEdition(editionId: string): Promise<readonly ReadingOffer[]>;
}
