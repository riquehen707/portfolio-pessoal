import Link from "next/link";

import type { Movie } from "@/content/movies/movieSchema";
import type { ReadingWork } from "@/content/reading/readingSchema";
import type { Series } from "@/content/series/seriesSchema";
import type { EditorialWork } from "@/content/works/workSchema";
import { MovieListCard } from "@/components/movies/MovieListCard";
import { SeriesCard } from "@/components/series/SeriesCard";
import { CollectionCarousel } from "@/components/collections/CollectionCarousel";
import { ReadingShelfCard } from "@/components/reading/ReadingShelfCard";

import styles from "./PersonalityWorks.module.scss";

type Props = {
  personId: string;
  movies: Movie[];
  reading: ReadingWork[];
  series: Series[];
  editorial: EditorialWork[];
};

const roleLabels: Record<string, string> = { direction:"Direção", screenplay:"Roteiro", animation:"Animação", production:"Produção", story:"História" };

function rolesFor(movie: Movie, personId: string) {
  return movie.personRelationships.find((relation) => relation.personId === personId)?.roles ?? [];
}

export function PersonalityWorks({ personId, movies, reading, series, editorial }: Props) {
  const hasWorks = movies.length + reading.length + series.length + editorial.length > 0;
  if (!hasWorks) return null;

  return <section className={styles.section} aria-labelledby="personality-works-title">
    <header><span>Obras no acervo</span><h2 id="personality-works-title">Trabalhos relacionados</h2><p>Os vínculos abaixo vêm dos créditos das próprias obras e são atualizados automaticamente.</p></header>
    {reading.length > 0 ? <ReadingBibliography reading={reading} /> : null}
    {movies.length > 0 ? <MovieFilmography movies={movies} personId={personId} /> : null}
    {series.length > 0 ? <div className={styles.group}><h3>Séries</h3><div className={styles.grid}>{series.map((item)=><SeriesCard key={item.id} seriesId={item.id} context="Obra relacionada pelos créditos estruturados do acervo." />)}</div></div> : null}
    {editorial.length > 0 ? <div className={styles.group}><h3>Outras obras</h3><div className={styles.grid}>{editorial.map((work)=><article className={styles.editorialCard} key={work.id}><span>{work.kind === "animated-short" ? "Curta de animação" : "Documentário"} · {work.year}</span><h4>{work.title}</h4><p>{work.summary}</p><Link href={`/obras/${work.slug}`}>Conhecer a obra</Link></article>)}</div></div> : null}
  </section>;
}

function ReadingBibliography({ reading }: { reading: ReadingWork[] }) {
  const ordered = [...reading].sort((a, b) => (a.publicationStart ?? "").localeCompare(b.publicationStart ?? ""));
  return <div className={styles.group} id="bibliografia">
    <div className={styles.groupHeading}><h3>Livros no acervo</h3><p>Percorra as capas para explorar a bibliografia. Imagens históricas são identificadas no cadastro e não representam uma edição brasileira atual.</p></div>
    <CollectionCarousel label="Livros no acervo">{ordered.map((work)=><ReadingShelfCard key={work.id} work={work} />)}</CollectionCarousel>
  </div>;
}

function MovieFilmography({ movies, personId }: { movies: Movie[]; personId: string }) {
  const directed = movies.filter((movie) => rolesFor(movie, personId).includes("direction"));
  const collaborations = movies.filter((movie) => !rolesFor(movie, personId).includes("direction"));
  const renderStrip = (items: Movie[]) => <div className={styles.filmStrip}>{items.map((movie) => {
    const roles = rolesFor(movie, personId).map((role) => roleLabels[role] ?? role).join(" · ");
    return <div className={styles.filmItem} key={movie.id}><MovieListCard movie={movie} variant="organization" context={roles} compact showAction={false} /></div>;
  })}</div>;
  return <div className={styles.group} id="filmografia">
    <div className={styles.groupHeading}><h3>Filmografia no acervo</h3><p>Arraste horizontalmente para percorrer as capas. Os créditos vêm dos registros centrais de cada filme.</p></div>
    {directed.length ? <section className={styles.filmRole}><h4>Longas dirigidos</h4>{renderStrip(directed)}</section> : null}
    {collaborations.length ? <section className={styles.filmRole}><h4>Roteiros e outras colaborações</h4>{renderStrip(collaborations)}</section> : null}
  </div>;
}
