import { localSeriesRepository } from "./localSeriesRepository";

export type { SeriesRepository } from "./seriesRepository";
export const seriesRepository = localSeriesRepository;
export const getAllSeries = () => seriesRepository.getAll();
export const getPublishedSeries = () => seriesRepository.getPublished();
export const getSeriesById = (id: string) => seriesRepository.getById(id);
export const getSeriesBySlug = (slug: string) => seriesRepository.getBySlug(slug);
export const getSeriesCurations = (seriesId: string) => seriesRepository.getCurationsForSeries(seriesId);
export const getAllSeriesOffers = () => seriesRepository.getOffers();
