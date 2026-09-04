import { creators } from "@/content/creators/creators";
import { editorialWorks } from "@/content/works/works";
import { seriesCatalog } from "@/content/series/series";
import { getAllMovies } from "@/data/movies";
import { getReadingWorks } from "@/data/reading";

export function getPublishedPersonalities() {
  return creators.filter((person) => person.status === "published" && person.biography.length > 0);
}

export function getPersonalityBySlug(slug: string) {
  return getPublishedPersonalities().find((person) => person.slug === slug);
}

export function getRelatedPersonalities(personIds: string[]) {
  const requested = new Set(personIds);
  return creators.filter((person) => requested.has(person.id));
}

export async function getWorksForPerson(personId: string) {
  const [movies, reading] = await Promise.all([getAllMovies(), getReadingWorks()]);
  return {
    movies: movies.filter((work) => work.status !== "draft" && work.personRelationships.some((relation) => relation.personId === personId)),
    reading: reading.filter((work) => work.status !== "draft" && work.credits.some((credit) => credit.personId === personId)),
    series: seriesCatalog.filter((work) => work.status === "published" && work.personRelationships.some((relation) => relation.personId === personId)),
    editorial: editorialWorks.filter((work) => work.status === "published" && work.contributors.some((credit) => credit.personId === personId)),
  };
}

export async function getFilmographyForPerson(personId: string) {
  const movies = await getAllMovies();
  return movies
    .filter((movie) => movie.personRelationships.some((relation) => relation.personId === personId))
    .sort((a, b) => a.year - b.year || a.titleBr.localeCompare(b.titleBr, "pt-BR"));
}
