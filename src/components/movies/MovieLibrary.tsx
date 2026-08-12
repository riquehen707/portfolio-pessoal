"use client";

import { useMemo, useState } from "react";
import type { Movie } from "@/content/movies/movieSchema";
import { MovieListCard } from "./MovieListCard";
import styles from "./MovieLibrary.module.scss";

type SortMode = "editorial" | "newest" | "oldest" | "title";

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

function uniqueSorted(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function MovieLibrary({ movies }: { movies: readonly Movie[] }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [decade, setDecade] = useState("all");
  const [country, setCountry] = useState("all");
  const [sort, setSort] = useState<SortMode>("editorial");

  const facets = useMemo(() => ({
    genres: uniqueSorted(movies.flatMap((movie) => [...movie.genres, ...movie.subgenres]).filter((item) => item !== "Terror")),
    decades: uniqueSorted(movies.map((movie) => `${Math.floor(movie.year / 10) * 10}`)).reverse(),
    countries: uniqueSorted(movies.flatMap((movie) => movie.countries)),
  }), [movies]);

  const visibleMovies = useMemo(() => {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    const result = movies.filter((movie) => {
      const searchable = normalize([
        movie.titleBr, movie.originalTitle, ...movie.directors, ...movie.countries,
        ...movie.genres, ...movie.subgenres, ...movie.themes, movie.shortDescription,
      ].join(" "));
      const matchesQuery = tokens.every((token) => searchable.includes(token));
      const matchesGenre = genre === "all" || [...movie.genres, ...movie.subgenres].includes(genre);
      const matchesDecade = decade === "all" || Math.floor(movie.year / 10) * 10 === Number(decade);
      const matchesCountry = country === "all" || movie.countries.includes(country);
      return matchesQuery && matchesGenre && matchesDecade && matchesCountry;
    });

    return result.sort((a, b) => {
      if (sort === "newest") return b.year - a.year;
      if (sort === "oldest") return a.year - b.year;
      if (sort === "title") return a.titleBr.localeCompare(b.titleBr, "pt-BR");
      return movies.indexOf(a) - movies.indexOf(b);
    });
  }, [country, decade, genre, movies, query, sort]);

  const hasFilters = Boolean(query || genre !== "all" || decade !== "all" || country !== "all" || sort !== "editorial");
  const clearFilters = () => {
    setQuery(""); setGenre("all"); setDecade("all"); setCountry("all");
    setSort("editorial");
  };

  return (
    <>
      <div className={styles.filterPanel} aria-label="Filtros do acervo">
        <label className={styles.searchField}>
          <span>Buscar no acervo</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Título, direção, tema ou país"
            type="search"
            value={query}
          />
        </label>

        <div className={styles.facets}>
          <label><span>Vertente</span><select onChange={(event) => setGenre(event.target.value)} value={genre}><option value="all">Todas</option>{facets.genres.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Década</span><select onChange={(event) => setDecade(event.target.value)} value={decade}><option value="all">Todas</option>{facets.decades.map((item) => <option key={item} value={item}>Anos {item}</option>)}</select></label>
          <label><span>País</span><select onChange={(event) => setCountry(event.target.value)} value={country}><option value="all">Todos</option>{facets.countries.map((item) => <option key={item}>{item}</option>)}</select></label>
          <label><span>Ordem</span><select onChange={(event) => setSort(event.target.value as SortMode)} value={sort}><option value="editorial">Seleção editorial</option><option value="newest">Mais recentes</option><option value="oldest">Mais antigos</option><option value="title">Título A–Z</option></select></label>
        </div>
      </div>

      <div className={styles.resultBar}>
        <p className={styles.resultCount} aria-live="polite">{visibleMovies.length} {visibleMovies.length === 1 ? "filme encontrado" : "filmes encontrados"}</p>
        {hasFilters ? <button onClick={clearFilters} type="button">Limpar filtros</button> : null}
      </div>

      {visibleMovies.length ? (
        <div className={styles.grid}>
          {visibleMovies.map((movie, index) => <MovieListCard key={movie.id} movie={movie} priority={index < 2} />)}
        </div>
      ) : (
        <div className={styles.empty}><strong>Nenhum filme combina com esses filtros.</strong><p>Tente remover uma opção ou buscar por um termo mais amplo.</p><button onClick={clearFilters} type="button">Mostrar todo o acervo</button></div>
      )}
      <p className={styles.posterCredit}>
        Pôsteres promocionais via <a href="https://www.themoviedb.org/" rel="noreferrer" target="_blank">TMDB</a>;
        direitos pertencem aos respectivos titulares.
      </p>
    </>
  );
}
