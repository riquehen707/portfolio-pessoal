import { creators } from "@/content/creators/creators";
import { organizationsById } from "@/content/organizations/organizations";
import { readingEditions, readingOffers, readingVolumes, readingWorks } from "@/content/reading/reading";
import type { ReadingEdition, ReadingOffer, ReadingWork } from "@/content/reading/readingSchema";

const graphicFormats = new Set<ReadingWork["format"]>([
  "manga", "manhwa", "manhua", "webtoon", "graphic-novel", "comic", "serialized-series", "one-shot", "comic-strip", "anthology",
]);

export const isGraphicReadingWork = (work: ReadingWork) => Boolean(work.comicTradition || work.comicFormat || graphicFormats.has(work.format));

export function getReadingWorkOrThrow(workId: string) {
  const work = readingWorks.find((item) => item.id === workId);
  if (!work) throw new Error(`Obra de leitura não encontrada: ${workId}`);
  return work;
}

export function getReadingCardEdition(work: ReadingWork): ReadingEdition | undefined {
  const volumeIds = new Set(readingVolumes.filter((item) => item.workId === work.id).map((item) => item.id));
  const editions = readingEditions.filter((item) => item.workId === work.id || Boolean(item.volumeId && volumeIds.has(item.volumeId)));
  return editions.find((item) => item.country === "Brasil" && item.status === "published")
    ?? editions.find((item) => item.country === "Brasil")
    ?? editions.find((item) => item.status === "published")
    ?? editions[0];
}

export function getReadingCardOffers(edition?: ReadingEdition): ReadingOffer[] {
  if (!edition) return [];
  return readingOffers.filter((offer) => offer.editionId === edition.id && (offer.availability === "available" || offer.availability === "preorder"));
}

export function getReadingCreditNames(work: ReadingWork) {
  const people = new Map(creators.map((person) => [person.id, person]));
  return work.credits
    .filter((credit) => credit.roles.some((role) => ["author", "original-creator", "writer", "artist", "illustrator"].includes(role)))
    .map((credit) => people.get(credit.personId)?.name ?? credit.personId)
    .filter((name, index, names) => names.indexOf(name) === index);
}

export const readingTitle = (work: ReadingWork) => work.titleBr ?? work.originalTitle;
export const readingYear = (work: ReadingWork) => work.publicationStart?.slice(0, 4);
export const readingPublisher = (edition?: ReadingEdition) => edition ? organizationsById.get(edition.publisherId)?.name : undefined;
