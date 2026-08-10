import { getMovie } from "@/content/movies/movies";
import { baseURL } from "@/resources";

export function MovieRankingJsonLd({ slugs, path }: { slugs: string; path: string }) {
  const items = slugs.split(",").map((rawSlug, index) => {
    const slug = rawSlug.trim();
    const movie = getMovie(slug);
    if (!movie) throw new Error(`MovieRankingJsonLd recebeu um slug inexistente: ${slug}`);
    return {
      "@type": "ListItem",
      position: index + 1,
      name: movie.titleBr,
      url: movie.status === "published" ? `${baseURL}/filmes/${movie.slug}` : `${baseURL}${path}#${movie.slug}`,
    };
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: items }),
      }}
    />
  );
}
