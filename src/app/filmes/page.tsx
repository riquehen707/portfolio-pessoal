import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { MovieLibraryJsonLd } from "@/components/seo/MovieLibraryJsonLd";
import { MovieLibrary } from "@/components/movies/MovieLibrary";
import { getAllMovies, getPublishedMovies } from "@/data/movies";
import { baseURL } from "@/resources";

import styles from "./movies.module.scss";

const path = "/filmes";
const title = "Biblioteca de filmes";
const description =
  "Filmes cadastrados para rankings e curadorias, com dados verificados e páginas editoriais publicadas somente após revisão.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, url: `${baseURL}${path}`, type: "website" },
};

export default async function MoviesPage() {
  const [movies, publishedMovies] = await Promise.all([getAllMovies(), getPublishedMovies()]);
  const publishedCount = publishedMovies.length;

  return (
    <main className={styles.page}>
      <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: title, url: `${baseURL}${path}` }]} />
      <MovieLibraryJsonLd movies={publishedMovies} />

      <header className={styles.hero}>
        <div className={styles.heroMain}>
          <span className={styles.kicker}>Biblioteca cultural · cinema</span>
          <h1>Um acervo para escolher o próximo filme.</h1>
          <p>
            Terror popular, descobertas menos óbvias e caminhos para comparar estilos. Cada obra é
            cadastrada uma vez e recebe novas leituras quando aparece em rankings e curadorias.
          </p>
        </div>
        <div className={styles.heroAside}>
          <span>Estado do acervo</span>
          <strong>{movies.length}</strong>
          <p>filmes pesquisados e organizados para as primeiras curadorias.</p>
          <div className={styles.counts}>
            <span>{publishedCount} perfis completos</span>
            <span>{movies.length - publishedCount} em preparação</span>
          </div>
        </div>
      </header>

      <section className={styles.library} aria-labelledby="movie-library-title">
        <div className={styles.sectionHeader}>
          <h2 id="movie-library-title">Acervo inicial</h2>
          <p>Combine busca e filtros. As imagens são capas editoriais próprias; perfis em preparação aparecem sem link.</p>
        </div>
        <MovieLibrary movies={movies} />
      </section>
    </main>
  );
}
