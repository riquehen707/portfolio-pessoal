import Link from "next/link";

import type { Movie } from "@/content/movies/movieSchema";
import type { ReadingWork } from "@/content/reading/readingSchema";
import type { Series } from "@/content/series/seriesSchema";
import type { EditorialWork } from "@/content/works/workSchema";
import { MovieListCard } from "@/components/movies/MovieListCard";
import { ReadingCard } from "@/components/reading/ReadingCard";
import { SeriesCard } from "@/components/series/SeriesCard";

import styles from "./PersonalityWorks.module.scss";

type Props = {
  movies: Movie[];
  reading: ReadingWork[];
  series: Series[];
  editorial: EditorialWork[];
};

export function PersonalityWorks({ movies, reading, series, editorial }: Props) {
  const hasWorks = movies.length + reading.length + series.length + editorial.length > 0;
  if (!hasWorks) return null;

  return <section className={styles.section} aria-labelledby="personality-works-title">
    <header><span>Obras no acervo</span><h2 id="personality-works-title">Trabalhos relacionados</h2><p>Os vínculos abaixo vêm dos créditos das próprias obras e são atualizados automaticamente.</p></header>
    {reading.length > 0 ? <div className={styles.group}><h3>Livros e quadrinhos</h3><div className={styles.grid}>{reading.map((work)=><ReadingCard key={work.id} work={work} variant="compact" />)}</div></div> : null}
    {movies.length > 0 ? <div className={styles.group}><h3>Filmes</h3><div className={styles.grid}>{movies.map((movie)=><MovieListCard key={movie.id} movie={movie} variant="organization" compact />)}</div></div> : null}
    {series.length > 0 ? <div className={styles.group}><h3>Séries</h3><div className={styles.grid}>{series.map((item)=><SeriesCard key={item.id} series={item.slug} context="Obra relacionada pelos créditos estruturados do acervo." />)}</div></div> : null}
    {editorial.length > 0 ? <div className={styles.group}><h3>Outras obras</h3><div className={styles.grid}>{editorial.map((work)=><article className={styles.editorialCard} key={work.id}><span>{work.kind === "animated-short" ? "Curta de animação" : "Documentário"} · {work.year}</span><h4>{work.title}</h4><p>{work.summary}</p><Link href={`/obras/${work.slug}`}>Conhecer a obra</Link></article>)}</div></div> : null}
  </section>;
}
