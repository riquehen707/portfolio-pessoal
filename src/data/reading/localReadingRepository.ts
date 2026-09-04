import { readingCatalog } from "@/content/reading/reading";
import type { ReadingRepository } from "./readingRepository";
import { isComicWork } from "@/content/reading/readingDomain";

const normalize = (value: string) => value.trim().toLocaleLowerCase("pt-BR");

export const localReadingRepository: ReadingRepository = {
  async getWorks() { return readingCatalog.works; },
  async getWorkById(id) { return readingCatalog.works.find((work) => work.id === id); },
  async getWorkBySlug(slug) { return readingCatalog.works.find((work) => work.slug === slug || work.aliases.includes(slug)); },
  async getPublishedWorks() { return readingCatalog.works.filter((work) => work.status === "published"); },
  async getPublishedBooks() { return readingCatalog.works.filter((work) => work.status === "published" && !isComicWork(work)); },
  async getPublishedComics() { return readingCatalog.works.filter((work) => work.status === "published" && isComicWork(work)); },
  async findWork(value) {
    const candidate = normalize(value);
    return readingCatalog.works.find((work) => [work.id, work.slug, work.originalTitle, work.titleBr, work.romanizedTitle, ...work.aliases].filter(Boolean).some((field) => normalize(String(field)) === candidate));
  },
  async getSeries() { return readingCatalog.series; },
  async getSeriesById(id) { return readingCatalog.series.find((series) => series.id === id); },
  async getVolumesForWork(workId) { return readingCatalog.volumes.filter((volume) => volume.workId === workId); },
  async getVolumes() { return readingCatalog.volumes; },
  async getInstallmentsForWork(workId) { return readingCatalog.installments.filter((item) => item.workId === workId); },
  async getEditionsForWork(workId) {
    const volumeIds = new Set(readingCatalog.volumes.filter((volume) => volume.workId === workId).map((volume) => volume.id));
    return readingCatalog.editions.filter((edition) => edition.workId === workId || (edition.volumeId && volumeIds.has(edition.volumeId)));
  },
  async getEditions() { return readingCatalog.editions; },
  async getOffersForEdition(editionId) { return readingCatalog.offers.filter((offer) => offer.editionId === editionId); },
};
