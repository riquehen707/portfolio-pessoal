import Image from "next/image";
import Link from "next/link";

import { getMovie } from "@/content/movies/movies";

import styles from "./MovieCard.module.scss";

type MovieCardProps = {
  movie: string;
  context: string;
  position?: number;
  compact?: boolean;
};

export function MovieCard({ movie: slug, context, position, compact = false }: MovieCardProps) {
  const movie = getMovie(slug);

  if (!movie) {
    throw new Error(`MovieCard recebeu um slug inexistente: ${slug}`);
  }

  const isPublished = movie.status === "published";
  const title = isPublished ? (
    <Link href={`/filmes/${movie.slug}`}>{movie.titleBr}</Link>
  ) : (
    movie.titleBr
  );

  return (
    <article className={styles.card} data-compact={compact || undefined}>
      <div className={styles.poster} data-placeholder={!movie.poster || undefined}>
        {movie.poster ? (
          <Image
            src={movie.poster.src}
            alt={movie.poster.alt}
            fill
            sizes="(max-width: 520px) 72px, 112px"
          />
        ) : (
          <>
            <span className={styles.posterLabel} aria-hidden="true">filme</span>
            <span className={styles.posterMark} aria-hidden="true" />
            <span className={styles.posterYear} aria-hidden="true">{movie.year}</span>
          </>
        )}
      </div>

      <div className={styles.content}>
        <header className={styles.header}>
          {position ? <span className={styles.position} aria-label={`${position}º lugar`}>{position}</span> : null}
          <div className={styles.titles}>
            <h2>{title}</h2>
            {movie.originalTitle !== movie.titleBr ? <p>{movie.originalTitle}</p> : null}
          </div>
        </header>

        <div className={styles.meta}>
          <span>{movie.year}</span>
          {movie.durationMinutes ? <span>{movie.durationMinutes} min</span> : null}
          <span>{movie.genres.slice(0, 2).join(" · ")}</span>
        </div>

        {!compact ? <p className={styles.description}>{movie.shortDescription}</p> : null}
        <p className={styles.context}>{context}</p>

        {isPublished ? <Link className={styles.action} href={`/filmes/${movie.slug}`}>Ver página do filme</Link> : null}
      </div>
    </article>
  );
}
