import type { Game } from "@/content/games/gameSchema";
import { baseURL } from "@/resources";
export function GameLibraryJsonLd({ games }: { games: readonly Game[] }) {
  if (!games.length) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Acervo de jogos brasileiros",
    url: `${baseURL}/jogos`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: games.length,
      itemListElement: games.map((game, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "VideoGame",
          name: game.title,
          datePublished: game.releaseDate ?? String(game.year),
          image: game.cover ? `${baseURL}${game.cover.src}` : undefined,
          url: `${baseURL}/jogos/${game.slug}`,
        },
      })),
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
