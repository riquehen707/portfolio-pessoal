import Link from "next/link";

import { getMovieBySlug } from "@/data/movies";
import { MoviePoster } from "./MoviePoster";

import styles from "./MovieCard.module.scss";

type MovieCardProps = {
  movie: string;
  context: string;
  position?: number;
  compact?: boolean;
  showAction?: boolean;
};

export async function MovieCard({ movie: slug, context, position, compact = false, showAction = true }: MovieCardProps) {
  const movie = await getMovieBySlug(slug);

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
      <MoviePoster className={styles.poster} movie={movie} sizes="(max-width: 520px) 72px, 112px" />

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

        {showAction && isPublished ? <Link className={styles.action} href={`/filmes/${movie.slug}`}>Ver página do filme</Link> : null}
      </div>
    </article>
  );
}
