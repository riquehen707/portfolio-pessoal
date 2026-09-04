import type { Series } from "@/content/series/seriesSchema";
import type { SeriesList } from "@/content/series/curations";
import type { SeriesOffer } from "@/content/series/seriesOffers";

export interface SeriesRepository {
  getAll(): Promise<readonly Series[]>;
  getPublished(): Promise<Series[]>;
  getById(id: string): Promise<Series | undefined>;
  getBySlug(slug: string): Promise<Series | undefined>;
  getCurationsForSeries(seriesId: string): Promise<Array<{ curation: SeriesList; item: SeriesList["items"][number] }>>;
  getOffers(): Promise<readonly SeriesOffer[]>;
}
