import { EditorialTable } from "@/components/mdx/EditorialBlocks";
import type { Movie } from "@/content/movies/movieSchema";
import { getMovieBySlug } from "@/data/movies";

const releaseTypeLabel: Record<Movie["releaseType"], string> = {
  theatrical: "cinema",
  television: "televisão",
  "television-and-theatrical": "TV e cinema",
};

export async function MovieFilmography({ slugs }: { slugs: string }) {
  const requestedSlugs = slugs.split(",").map((slug) => slug.trim()).filter(Boolean);
  const movies = await Promise.all(requestedSlugs.map((slug) => getMovieBySlug(slug)));
  const missingSlugs = requestedSlugs.filter((_, index) => !movies[index]);

  if (missingSlugs.length > 0) {
    throw new Error(`Filmes ausentes na filmografia: ${missingSlugs.join(", ")}`);
  }

  return (
    <EditorialTable
      title="Longas no catálogo oficial"
      caption="Datas e durações seguem o catálogo oficial do Studio Ghibli; a relação de cada obra com o estúdio é indicada no texto ao redor da tabela."
      mobileMode="cards"
      columns={[
        { key: "movie", label: "Filme" },
        { key: "direction", label: "Direção" },
        { key: "release", label: "Lançamento" },
      ]}
      rows={(movies as Movie[]).map((movie) => ({
        movie: movie.titleBr,
        direction: movie.directors.join(", "),
        release: `${movie.year} · ${movie.durationMinutes} min · ${releaseTypeLabel[movie.releaseType]}`,
      }))}
    />
  );
}
