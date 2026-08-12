import { getMovieBySlug } from "@/data/movies";
import { baseURL } from "@/resources";

export async function MovieRankingJsonLd({ slugs, path }: { slugs: string; path: string }) {
  const items = await Promise.all(slugs.split(",").map(async (rawSlug, index) => {
    const slug = rawSlug.trim();
    const movie = await getMovieBySlug(slug);
    if (!movie) throw new Error(`MovieRankingJsonLd recebeu um slug inexistente: ${slug}`);
    return {
      "@type": "ListItem",
      position: index + 1,
      name: movie.titleBr,
      image: movie.poster ? `${baseURL}${movie.poster.src}` : undefined,
      url: movie.status === "published" ? `${baseURL}/filmes/${movie.slug}` : `${baseURL}${path}#${movie.slug}`,
    };
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@type": "ItemList", itemListElement: items }),
      }}
    />
  );
}
