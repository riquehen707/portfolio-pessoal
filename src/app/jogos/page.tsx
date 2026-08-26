import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { GameLibraryJsonLd } from "@/components/seo/GameLibraryJsonLd";
import { GameLibrary } from "@/components/games/GameLibrary";
import { getAllGames, getPublishedGames } from "@/data/games";
import { baseURL } from "@/resources";
import styles from "../filmes/movies.module.scss";
const path = "/jogos";
const title = "Acervo de jogos brasileiros";
const description =
  "Jogos desenvolvidos no Brasil organizados por estúdio, gênero, plataforma e escolhas de design, com páginas editoriais e fontes.";
export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, url: `${baseURL}${path}`, type: "website" },
};
export default async function GamesPage() {
  const [all, published] = await Promise.all([getAllGames(), getPublishedGames()]);
  return (
    <main className={styles.page}>
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Jogos", url: `${baseURL}${path}` },
        ]}
      />
      <GameLibraryJsonLd games={published} />
      <header className={styles.hero}>
        <div className={styles.heroMain}>
          <span className={styles.kicker}>Biblioteca cultural · jogos</span>
          <h1>Jogos brasileiros para conhecer e entender.</h1>
          <p>
            Um acervo editorial sobre obras feitas no Brasil: como jogam, que escolhas fazem e por
            que importam. A origem brasileira é documentada sem inventar uma ambientação nacional
            onde ela não existe.
          </p>
        </div>
        <div className={styles.heroAside}>
          <span>Estado do acervo</span>
          <strong>{published.length}</strong>
          <p>perfis completos no recorte inaugural.</p>
          <div className={styles.counts}>
            <span>{all.length - published.length} registros em preparação</span>
          </div>
        </div>
      </header>
      <section className={styles.library} aria-labelledby="game-library-title">
        <div className={styles.sectionHeader}>
          <h2 id="game-library-title">Seleção inicial</h2>
          <p>
            Busque por título, gênero, mecânica ou plataforma. Os filtros existem para descoberta e
            podem crescer com o catálogo.
          </p>
        </div>
        <GameLibrary games={published} />
      </section>
    </main>
  );
}
