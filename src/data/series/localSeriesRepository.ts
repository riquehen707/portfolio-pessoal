import { seriesCurations } from "@/content/series/curations";
import { seriesById, seriesBySlug, seriesCatalog } from "@/content/series/series";
import { seriesOffers } from "@/content/series/seriesOffers";
import type { SeriesRepository } from "./seriesRepository";

const invalidCurations = seriesCurations.flatMap((curation) => curation.items.filter((item) => !seriesById.has(item.seriesId)).map((item) => `${curation.slug}:${item.seriesId}`));
const invalidOffers = seriesOffers.filter((offer) => !seriesById.has(offer.seriesId)).map((offer) => offer.id);
if (invalidCurations.length || invalidOffers.length) throw new Error(`Relações de séries inválidas: ${[...invalidCurations, ...invalidOffers].join(", ")}`);

export const localSeriesRepository: SeriesRepository = {
  async getAll() { return seriesCatalog; },
  async getPublished() { return seriesCatalog.filter((series) => series.status === "published"); },
  async getById(id) { return seriesById.get(id); },
  async getBySlug(slug) { return seriesBySlug.get(slug); },
  async getCurationsForSeries(seriesId) {
    return seriesCurations.flatMap((curation) => {
      const item = curation.items.find((entry) => entry.seriesId === seriesId);
      return item ? [{ curation, item }] : [];
    });
  },
  async getOffers() { return seriesOffers; },
};
