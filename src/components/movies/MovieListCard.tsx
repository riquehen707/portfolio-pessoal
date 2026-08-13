import Link from "next/link";
import type { Movie } from "@/content/movies/movieSchema";
import { MovieOrganizations } from "./MovieOrganizations";
import { MoviePoster } from "./MoviePoster";
import styles from "./MovieListCard.module.scss";

type Props = {
  movie: Movie;
  variant?: "library" | "organization" | "editorial";
  context?: string;
  position?: number;
  priority?: boolean;
  compact?: boolean;
  showAction?: boolean;
};

export function MovieListCard({ movie, variant = "library", context, position, priority, compact, showAction = true }: Props) {
  const published = movie.status === "published";
  return <article className={styles.card} data-compact={compact || undefined} data-has-poster={movie.poster ? "true" : "false"} data-variant={variant} id={movie.slug}>
    <MoviePoster className={styles.poster} movie={movie} priority={priority} sizes="(max-width: 520px) 116px, 128px" />
    <div className={styles.content}>
      <header className={styles.header}>
        {position ? <span className={styles.position} aria-label={`${position}º lugar`}>{position}</span> : null}
        <div className={styles.titles}>
          <h3>{published ? <Link href={`/filmes/${movie.slug}`}>{movie.titleBr}</Link> : movie.titleBr}</h3>
          {movie.originalTitle !== movie.titleBr ? <p>{movie.originalTitle}</p> : null}
        </div>
      </header>
      <div className={styles.meta}>
        <span>{movie.year}</span>
        {movie.durationMinutes ? <span>{movie.durationMinutes} min</span> : null}
        {variant === "organization" ? <span>{movie.directors.join(" · ")}</span> : null}
      </div>
      {variant !== "organization" ? <MovieOrganizations movie={movie} /> : null}
      {!compact ? <p className={styles.description}>{movie.shortDescription}</p> : null}
      {context ? <p className={styles.context}>{context}</p> : null}
      {variant === "library" ? <><div className={styles.tags}>{[...movie.genres, ...movie.subgenres].slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div><small>{movie.countries.join(" · ")}</small></> : null}
      {showAction && published && variant === "editorial" ? <Link className={styles.action} href={`/filmes/${movie.slug}`}>Ver página do filme</Link> : null}
    </div>
  </article>;
}
