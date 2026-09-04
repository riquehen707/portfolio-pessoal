"use client";

import { useMemo, useState } from "react";
import type { Movie } from "@/content/movies/movieSchema";
import { CatalogControls, CatalogEmpty, CatalogLoadMore } from "@/components/entertainment/CatalogControls";
import { normalizeCatalogText, uniqueCatalogValues, useProgressiveCatalog } from "@/components/entertainment/catalog";
import { MovieListCard } from "./MovieListCard";
import styles from "./MovieLibrary.module.scss";

type SortMode = "editorial" | "newest" | "oldest" | "title";

export function MovieLibrary({ movies }: { movies: readonly Movie[] }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [decade, setDecade] = useState("all");
  const [country, setCountry] = useState("all");
  const [sort, setSort] = useState<SortMode>("editorial");

  const facets = useMemo(() => ({
    genres: uniqueCatalogValues(movies.flatMap((movie) => [...movie.genres, ...movie.subgenres]).filter((item) => item !== "Terror")),
    decades: uniqueCatalogValues(movies.map((movie) => `${Math.floor(movie.year / 10) * 10}`)).reverse(),
    countries: uniqueCatalogValues(movies.flatMap((movie) => movie.countries)),
  }), [movies]);

  const visibleMovies = useMemo(() => {
    const tokens = normalizeCatalogText(query).split(/\s+/).filter(Boolean);
    const result = movies.filter((movie) => {
      const searchable = normalizeCatalogText([
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

  const resetKey = [query, genre, decade, country, sort].join("|");
  const progressive = useProgressiveCatalog(resetKey, visibleMovies.length);

  const hasFilters = Boolean(query || genre !== "all" || decade !== "all" || country !== "all" || sort !== "editorial");
  const clearFilters = () => {
    setQuery(""); setGenre("all"); setDecade("all"); setCountry("all");
    setSort("editorial");
  };

  return (
    <>
      <CatalogControls query={query} onQueryChange={setQuery} placeholder="Título, direção, tema ou país" filters={[
        {id:"genre",label:"Vertente",value:genre,allLabel:"Todas",options:facets.genres.map((item)=>({value:item,label:item})),onChange:setGenre},
        {id:"decade",label:"Década",value:decade,allLabel:"Todas",options:facets.decades.map((item)=>({value:item,label:`Anos ${item}`})),onChange:setDecade},
        {id:"country",label:"País",value:country,allLabel:"Todos",options:facets.countries.map((item)=>({value:item,label:item})),onChange:setCountry},
      ]} sort={sort} sortOptions={[{value:"editorial",label:"Seleção editorial"},{value:"newest",label:"Mais recentes"},{value:"oldest",label:"Mais antigos"},{value:"title",label:"Título A–Z"}]} onSortChange={(value)=>setSort(value as SortMode)} resultCount={visibleMovies.length} singular="filme encontrado" plural="filmes encontrados" hasFilters={hasFilters} onClear={clearFilters}/>

      {visibleMovies.length ? (
        <div className={styles.grid}>
          {visibleMovies.slice(0, progressive.visibleCount).map((movie, index) => <MovieListCard key={movie.id} movie={movie} priority={index < 2} />)}
        </div>
      ) : (
        <CatalogEmpty noun="filme" onClear={clearFilters}/>
      )}
      {progressive.hasMore ? <CatalogLoadMore onLoadMore={progressive.loadMore}/> : null}
      <p className={styles.posterCredit}>
        Pôsteres promocionais via <a href="https://www.themoviedb.org/" rel="noreferrer" target="_blank">TMDB</a>;
        direitos pertencem aos respectivos titulares.
      </p>
    </>
  );
}
