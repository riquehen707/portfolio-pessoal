import { EditorialTable } from "@/components/mdx/EditorialBlocks";
import type { Movie } from "@/content/movies/movieSchema";
import { getAllMovies } from "@/data/movies";

const releaseTypeLabel: Record<Movie["releaseType"], string> = {
  theatrical: "cinema", television: "televisão", "television-and-theatrical": "TV e cinema",
};

export async function MovieFilmography({ organizationId }: { organizationId: string }) {
  const movies = (await getAllMovies())
    .filter((movie) => movie.productionStatus === "released" && movie.organizationRelationships.some((relationship) =>
      relationship.organizationId === organizationId
      && relationship.status === "published"
      && relationship.roles.some((role) => ["production", "co-production", "animation"].includes(role))))
    .sort((a, b) => a.year - b.year || a.titleBr.localeCompare(b.titleBr, "pt-BR"));

  return <EditorialTable
    title="Longas relacionados ao estúdio"
    caption="A tabela é gerada automaticamente pelas relações estruturadas do catálogo central. Coproduções são identificadas no registro da obra."
    mobileMode="cards"
    columns={[{ key: "movie", label: "Filme" }, { key: "direction", label: "Direção" }, { key: "release", label: "Lançamento" }]}
    rows={movies.map((movie) => ({
      movie: movie.titleBr,
      direction: movie.directors.join(", "),
      release: `${movie.year} · ${movie.durationMinutes ?? "duração não registrada"}${movie.durationMinutes ? " min" : ""} · ${releaseTypeLabel[movie.releaseType]}`,
    }))}
  />;
}
