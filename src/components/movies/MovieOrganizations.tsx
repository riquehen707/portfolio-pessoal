import Link from "next/link";
import type { Movie } from "@/content/movies/movieSchema";
import { organizationsById } from "@/content/organizations/organizations";
import styles from "./MovieOrganizations.module.scss";

const roleLabels = {
  production: "produção", "co-production": "coprodução", animation: "animação",
  distribution: "distribuição", licensing: "licenciamento", collaboration: "colaboração", services: "serviços",
} satisfies Record<Movie["organizationRelationships"][number]["roles"][number], string>;

export function MovieOrganizations({ movie }: { movie: Pick<Movie, "organizationRelationships"> }) {
  const relationships = movie.organizationRelationships.filter((item) => item.status === "published");
  if (!relationships.length) return null;

  return <div className={styles.organizations} aria-label="Organizações relacionadas">
    {relationships.map((relationship) => {
      const organization = organizationsById.get(relationship.organizationId);
      const name = organization?.name ?? relationship.organizationId;
      const ambiguous = relationship.roles.some((role) => !["production", "animation"].includes(role));
      return <span key={relationship.organizationId}>
        {organization?.profilePath ? <Link href={organization.profilePath}>{name}</Link> : name}
        {ambiguous ? <small> · {relationship.roles.map((role) => roleLabels[role]).join(" / ")}</small> : null}
      </span>;
    })}
  </div>;
}
