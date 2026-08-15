import { localReadingRepository } from "./localReadingRepository";
import { readingCurations } from "@/content/reading/curations";

export type { ReadingRepository } from "./readingRepository";
export const readingRepository = localReadingRepository;
export const getReadingWorks = () => readingRepository.getWorks();
export const getPublishedReadingWorks = () => readingRepository.getPublishedWorks();
export const getPublishedBooks = () => readingRepository.getPublishedBooks();
export const getPublishedComics = () => readingRepository.getPublishedComics();
export const getReadingWorkById = (id: string) => readingRepository.getWorkById(id);
export const getReadingWorkBySlug = (slug: string) => readingRepository.getWorkBySlug(slug);
export const getReadingSeries = () => readingRepository.getSeries();
export const getReadingSeriesById = (id: string) => readingRepository.getSeriesById(id);
export const getReadingVolumesForWork = (workId: string) => readingRepository.getVolumesForWork(workId);
export const getReadingInstallmentsForWork = (workId: string) => readingRepository.getInstallmentsForWork(workId);
export const getReadingEditionsForWork = (workId: string) => readingRepository.getEditionsForWork(workId);
export const getReadingOffersForEdition = (editionId: string) => readingRepository.getOffersForEdition(editionId);
export const getReadingCurationsForWork = (workId: string) => readingCurations.flatMap((curation) => {
  const item = curation.items.find((entry) => entry.workId === workId);
  return item ? [{ curation, item }] : [];
});
