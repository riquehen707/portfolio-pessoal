import type { Movie } from "@/content/movies/movieSchema";
import { movies } from "@/content/movies/movies";
import { MovieListCard } from "@/components/movies/MovieListCard";
import styles from "./OrganizationWorks.module.scss";

export type OrganizationRole = Movie["organizationRelationships"][number]["roles"][number];

export function getOrganizationMovies(organizationId: string, roles: readonly OrganizationRole[]) {
  return movies
    .filter((movie) => movie.organizationRelationships.some((relationship) =>
      relationship.organizationId === organizationId
      && relationship.status === "published"
      && relationship.roles.some((role) => roles.includes(role))))
    .sort((a, b) => a.year - b.year || a.titleBr.localeCompare(b.titleBr, "pt-BR"));
}

type Props = {
  organizationId: string;
  roles: readonly OrganizationRole[];
  releaseStatus?: Movie["productionStatus"];
  limit?: number;
};

export function OrganizationWorks({ organizationId, roles, releaseStatus = "released", limit }: Props) {
  const relatedWorks = getOrganizationMovies(organizationId, roles).filter((movie) => movie.productionStatus === releaseStatus);
  const works = typeof limit === "number" ? relatedWorks.slice(0, limit) : relatedWorks;

  if (!works.length) return null;

  return <div className={styles.list}>
    {works.map((movie) => <MovieListCard key={movie.id} movie={movie} showAction={false} variant="organization" />)}
  </div>;
}
