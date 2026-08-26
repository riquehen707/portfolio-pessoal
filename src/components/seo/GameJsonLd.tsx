import type { Game } from "@/content/games/gameSchema";
import { organizationsById } from "@/content/organizations/organizations";
import { baseURL } from "@/resources";
export function GameJsonLd({ game }: { game: Game }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: game.title,
    datePublished: game.releaseDate ?? String(game.year),
    description: game.description,
    genre: [...game.genres, ...game.subgenres],
    gamePlatform: game.platforms,
    playMode: game.modes,
    author: game.organizationRelationships
      .filter((item) => item.roles.includes("development"))
      .map((item) => ({
        "@type": "Organization",
        name: organizationsById.get(item.organizationId)?.name,
      })),
    image: game.cover ? `${baseURL}${game.cover.src}` : undefined,
    url: `${baseURL}/jogos/${game.slug}`,
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
