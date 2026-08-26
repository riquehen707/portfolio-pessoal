import { organizations } from "@/content/organizations/organizations";
import { animationWorks } from "@/content/animationWorks/animationWorks";
import { games } from "@/content/games/games";
import { seriesCatalog } from "@/content/series/series";
import { getAllMovies } from "@/data/movies";
import { getReadingWorks } from "@/data/reading";
export function getPublishedStudios() {
  return organizations.filter(
    (organization) =>
      organization.kind === "studio" &&
      organization.status === "published" &&
      organization.profilePath,
  );
}
export function getStudioBySlug(slug: string) {
  return getPublishedStudios().find(
    (studio) => studio.slug === slug || studio.aliases.includes(slug),
  );
}
export async function getWorksForOrganization(organizationId: string) {
  const [movies, reading] = await Promise.all([getAllMovies(), getReadingWorks()]);
  return {
    movies: movies.filter(
      (work) =>
        work.status === "published" &&
        work.organizationRelationships.some(
          (relation) =>
            relation.organizationId === organizationId && relation.status === "published",
        ),
    ),
    series: seriesCatalog.filter(
      (work) =>
        work.status === "published" &&
        work.organizationRelationships.some(
          (relation) => relation.organizationId === organizationId,
        ),
    ),
    reading: reading.filter(
      (work) =>
        work.status === "published" &&
        work.organizationRelationships.some(
          (relation) => relation.organizationId === organizationId,
        ),
    ),
    animation: animationWorks.filter(
      (work) =>
        work.status === "published" &&
        work.relationships.some((relation) => relation.organizationId === organizationId),
    ),
    games: games.filter(
      (work) =>
        work.status === "published" &&
        work.organizationRelationships.some(
          (relation) => relation.organizationId === organizationId,
        ),
    ),
  };
}
