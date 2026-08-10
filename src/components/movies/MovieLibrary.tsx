"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import type { Movie } from "@/content/movies/movieSchema";

import styles from "./MovieLibrary.module.scss";

type LibraryMovie = Pick<
  Movie,
  | "slug"
  | "titleBr"
  | "originalTitle"
  | "year"
  | "countries"
  | "genres"
  | "subgenres"
  | "shortDescription"
  | "status"
  | "poster"
>;

const filters = [
  { id: "all", label: "Todos" },
  { id: "supernatural", label: "Sobrenatural" },
  { id: "psychological", label: "Psicológico" },
  { id: "folk", label: "Folk horror" },
  { id: "body", label: "Body horror" },
  { id: "undead", label: "Zumbis e infectados" },
  { id: "slasher", label: "Slasher" },
  { id: "experimental", label: "Experimental" },
] as const;

function matchesFilter(movie: LibraryMovie, filter: (typeof filters)[number]["id"]) {
  if (filter === "all") return true;
  const terms = [...movie.genres, ...movie.subgenres].join(" ").toLocaleLowerCase("pt-BR");
  const patterns: Record<Exclude<typeof filter, "all">, string[]> = {
    supernatural: ["sobrenatural", "possessão", "casa assombrada"],
    psychological: ["psicológico"],
    folk: ["folk horror", "horror rural"],
    body: ["body horror", "extremo"],
    undead: ["zumbi", "infectados"],
    slasher: ["slasher"],
    experimental: ["experimental", "screenlife", "metalinguagem"],
  };
  return patterns[filter].some((pattern) => terms.includes(pattern));
}

export function MovieLibrary({ movies }: { movies: LibraryMovie[] }) {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]["id"]>("all");
  const visibleMovies = useMemo(
    () => movies.filter((movie) => matchesFilter(movie, activeFilter)),
    [activeFilter, movies],
  );

  return (
    <>
      <div className={styles.filterBar} aria-label="Filtrar filmes por vertente">
        {filters.map((filter) => (
          <button
            aria-pressed={activeFilter === filter.id}
            data-active={activeFilter === filter.id || undefined}
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            type="button"
          >
            {filter.label}
          </button>
        ))}
      </div>

      <p className={styles.resultCount} aria-live="polite">
        {visibleMovies.length} {visibleMovies.length === 1 ? "filme" : "filmes"}
      </p>

      <div className={styles.grid}>
        {visibleMovies.map((movie, index) => {
          const content = (
            <>
              <div className={styles.poster} data-placeholder={!movie.poster || undefined}>
                {movie.poster ? (
                  <Image
                    alt={movie.poster.alt}
                    fill
                    sizes="(max-width: 640px) 84px, 128px"
                    src={movie.poster.src}
                  />
                ) : (
                  <>
                    <span className={styles.posterIndex}>{String(index + 1).padStart(2, "0")}</span>
                    <span className={styles.posterMark} aria-hidden="true" />
                    <strong>{movie.year}</strong>
                  </>
                )}
              </div>

              <div className={styles.cardContent}>
                <div className={styles.cardTopline}>
                  <span className={styles.status} data-published={movie.status === "published" || undefined}>
                    {movie.status === "published" ? "Perfil publicado" : "Em preparação"}
                  </span>
                  <span>{movie.year}</span>
                </div>

                <div className={styles.titles}>
                  <h3>{movie.titleBr}</h3>
                  {movie.originalTitle !== movie.titleBr ? <p>{movie.originalTitle}</p> : null}
                </div>

                <p className={styles.description}>{movie.shortDescription}</p>
                <div className={styles.tags}>
                  {[...movie.genres, ...movie.subgenres].slice(0, 3).map((genre) => (
                    <span key={genre}>{genre}</span>
                  ))}
                </div>
                <span className={styles.country}>{movie.countries.join(" · ")}</span>
              </div>
            </>
          );

          return movie.status === "published" ? (
            <Link className={styles.card} href={`/filmes/${movie.slug}`} key={movie.slug}>
              {content}
            </Link>
          ) : (
            <article className={styles.card} data-draft key={movie.slug}>
              {content}
            </article>
          );
        })}
      </div>
    </>
  );
}
