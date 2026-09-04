import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/content/games/gameSchema";
import { organizationsById } from "@/content/organizations/organizations";
import styles from "./GameListCard.module.scss";

export function GameListCard({ game, priority = false }: { game: Game; priority?: boolean }) {
  const studios = game.organizationRelationships
    .map(({ organizationId }) => organizationsById.get(organizationId)?.name)
    .filter(Boolean);
  return (
    <article className={styles.card}>
      {game.cover ? (
        <Link
          className={styles.cover}
          href={`/jogos/${game.slug}`}
          aria-label={`Abrir ${game.title}`}
        >
          <Image
            src={game.cover.src}
            alt={game.cover.alt}
            fill
            priority={priority}
            sizes="(max-width: 520px) 104px, 140px"
          />
        </Link>
      ) : (
        <div className={styles.cover} />
      )}
      <div className={styles.content}>
        <span className={styles.eyebrow}>
          {game.year} · {studios.join(" · ")}
        </span>
        <h3>
          <Link href={`/jogos/${game.slug}`}>{game.title}</Link>
        </h3>
        <p>{game.description}</p>
        <div className={styles.tags}>
          {[...game.genres, ...game.subgenres].slice(0, 3).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <small>{game.platforms.slice(0, 4).join(" · ")}</small>
      </div>
    </article>
  );
}
