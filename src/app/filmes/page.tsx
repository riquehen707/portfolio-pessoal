import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { MovieLibrary } from "@/components/movies/MovieLibrary";
import { getPublishedMovies, movies } from "@/content/movies/movies";
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

export default function MoviesPage() {
  const publishedCount = getPublishedMovies().length;

  return (
    <main className={styles.page}>
      <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: title, url: `${baseURL}${path}` }]} />

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
          <p>Explore por vertente. Perfis em preparação aparecem sem link até receberem análise própria.</p>
        </div>
        <MovieLibrary movies={movies} />
      </section>
    </main>
  );
}
