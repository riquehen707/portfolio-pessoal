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
};

export function OrganizationWorks({ organizationId, roles, releaseStatus = "released" }: Props) {
  const works = getOrganizationMovies(organizationId, roles).filter((movie) => movie.productionStatus === releaseStatus);

  if (!works.length) return null;

  return <div className={styles.list}>
    {works.map((movie) => <MovieListCard key={movie.id} movie={movie} showAction={false} variant="organization" />)}
  </div>;
}
