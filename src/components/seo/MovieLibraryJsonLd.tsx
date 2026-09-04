import type { Movie } from "@/content/movies/movieSchema";
import { baseURL } from "@/resources";

export function MovieLibraryJsonLd({ movies }: { movies: readonly Movie[] }) {
  if (movies.length === 0) return null;

  const itemListElement = movies.map((movie, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Movie",
      name: movie.titleBr,
      alternateName: movie.originalTitle,
      dateCreated: String(movie.year),
      director: movie.directors.map((name) => ({ "@type": "Person", name })),
      image: movie.poster ? `${baseURL}${movie.poster.src}` : undefined,
      url: `${baseURL}/filmes/${movie.slug}`,
    },
  }));

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Biblioteca de filmes",
    url: `${baseURL}/filmes`,
    mainEntity: { "@type": "ItemList", numberOfItems: movies.length, itemListElement },
  }) }} />;
}
