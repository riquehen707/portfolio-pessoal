import type { Movie } from "@/content/movies/movieSchema";

import { baseURL } from "@/resources";

export function MovieJsonLd({ movie }: { movie: Movie }) {
  if (movie.status !== "published") return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.titleBr,
    alternateName: movie.originalTitle,
    dateCreated: String(movie.year),
    duration: movie.durationMinutes ? `PT${movie.durationMinutes}M` : undefined,
    countryOfOrigin: movie.countries.map((name) => ({ "@type": "Country", name })),
    director: movie.directors.map((name) => ({ "@type": "Person", name })),
    genre: [...movie.genres, ...movie.subgenres],
    description: movie.shortDescription,
    image: movie.poster ? `${baseURL}${movie.poster.src}` : undefined,
    url: `${baseURL}/filmes/${movie.slug}`,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
