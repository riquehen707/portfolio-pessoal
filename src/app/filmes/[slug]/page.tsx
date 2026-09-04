import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { MovieJsonLd } from "@/components/seo/MovieJsonLd";
import { getMovieBySlug, getMovieCurations, getPublishedMovies } from "@/data/movies";
import { baseURL } from "@/resources";

import styles from "./movie.module.scss";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPublishedMovies()).map((movie) => ({ slug: movie.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const movie = await getMovieBySlug(slug);

  if (!movie || movie.status !== "published") {
    return { robots: { index: false, follow: false } };
  }

  const url = `${baseURL}/filmes/${movie.slug}`;
  return {
    title: movie.seo.title,
    description: movie.seo.description,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { title: movie.seo.title, description: movie.seo.description, url, type: "video.movie" },
  };
}

export default async function MoviePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const movie = await getMovieBySlug(slug);

  if (!movie || movie.status !== "published" || !movie.editorial) notFound();

  const curations = await getMovieCurations(movie.id);

  return (
    <main className={styles.page}>
      <MovieJsonLd movie={movie} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: baseURL },
        { name: "Filmes", url: `${baseURL}/filmes` },
        { name: movie.titleBr, url: `${baseURL}/filmes/${movie.slug}` },
      ]} />

      <header className={styles.hero}>
        <span>{movie.year} · {movie.durationMinutes} min</span>
        <h1>{movie.titleBr}</h1>
        {movie.originalTitle !== movie.titleBr ? <p className={styles.original}>{movie.originalTitle}</p> : null}
        <p>{movie.editorial.introduction}</p>
      </header>

      <div className={styles.layout}>
        <article>
          <h2>Como é a experiência</h2>
          <p>{movie.editorial.styleAndPace}</p>
          <h2>Por que assistir</h2>
          <ul>{movie.editorial.reasonsToWatch.map((reason) => <li key={reason}>{reason}</li>)}</ul>
          {movie.editorial.limitations.length ? <><h2>Possíveis limitações</h2><ul>{movie.editorial.limitations.map((item) => <li key={item}>{item}</li>)}</ul></> : null}
          {curations.length ? <><h2>Onde este filme aparece</h2>{curations.map(({ curation, item }) => <p key={curation.href}><Link href={curation.href}>{curation.title}</Link>{item.position ? ` — ${item.position}º lugar.` : "."}</p>)}</> : null}
        </article>

        <aside>
          <h2>Ficha essencial</h2>
          <dl>
            <div><dt>Direção</dt><dd>{movie.directors.join(" e ")}</dd></div>
            <div><dt>Países</dt><dd>{movie.countries.join(", ")}</dd></div>
            <div><dt>Gêneros</dt><dd>{[...movie.genres, ...movie.subgenres].join(", ")}</dd></div>
            <div><dt>Experiência</dt><dd>{movie.experience}</dd></div>
          </dl>
          {movie.contentWarnings.length ? <><h2>Alertas</h2><p>{movie.contentWarnings.join(", ")}.</p></> : null}
        </aside>
      </div>
    </main>
  );
}
