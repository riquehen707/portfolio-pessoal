import type { Metadata } from "next";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

import { getAllBlogPosts } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getAllMovies, getPublishedMovies } from "@/data/movies";
import { getAllGames, getPublishedGames } from "@/data/games";
import { getAllSeries, getPublishedSeries } from "@/data/series";
import { getPublishedBooks, getPublishedComics } from "@/data/reading";
import { getPublishedPersonalities } from "@/data/personalities";
import { getPublishedStudios } from "@/data/organizations";
import { baseURL } from "@/resources";

import styles from "./page.module.scss";

const path = "/acervo";
const title = "Acervo cultural";
const description =
  "Jogos, filmes, livros, mangás, quadrinhos e séries organizados em bibliotecas e curadorias editoriais.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, url: `${baseURL}${path}`, type: "website" },
};

const sections = [
  {
    id: "jogos", index: "01", title: "Jogos brasileiros",
    description: "Obras feitas no Brasil organizadas por estúdio, gênero, plataforma e decisões de design.",
    href: "/jogos", action: "Explorar jogos", slugs: [],
  },
  {
    id: "filmes",
    index: "02",
    title: "Filmes",
    description:
      "Uma biblioteca navegável por título, ano, país, gênero, direção e organizações relacionadas.",
    href: "/filmes",
    action: "Explorar filmes",
    slugs: ["melhores-filmes-terror-seculo-21", "melhores-filmes-de-2025", "melhores-filmes-de-vampiro"],
  },
  {
    id: "livros",
    index: "03",
    title: "Livros",
    description:
      "Obras, autores, séries e edições brasileiras separados corretamente em uma biblioteca pública.",
    href: "/livros",
    action: "Explorar livros",
    slugs: ["melhores-livros-de-terror", "melhores-livros-de-vampiro", "livros-para-quem-gostou-de-it-bem-vindos-a-derry"],
  },
  {
    id: "quadrinhos",
    index: "04",
    title: "Mangás e quadrinhos",
    description:
      "Mangás, HQs, graphic novels, manhwas e webtoons convivem no mesmo modelo, sem confundir formato, tradição e demografia.",
    href: "/quadrinhos",
    action: "Explorar quadrinhos",
    slugs: ["melhores-mangas-de-romance-para-homens", "melhores-quadrinhos-mangas-de-terror", "melhores-quadrinhos-mangas-de-vampiro"],
  },
  {
    id: "series",
    index: "05",
    title: "Séries",
    description:
      "Uma biblioteca navegável por título, período, país, gênero, formato e disponibilidade por temporada.",
    href: "/series",
    action: "Explorar séries",
    slugs: ["melhores-series-de-terror", "melhores-series-de-vampiro", "series-para-quem-gostou-de-it-bem-vindos-a-derry"],
  },
  {
    id: "personalidades",
    index: "06",
    title: "Personalidades",
    description: "Autores, cineastas, artistas e pensadores conectados automaticamente às obras que integram o acervo.",
    href: "/personalidades",
    action: "Explorar personalidades",
    slugs: [],
  },
  {
    id: "estudios",
    index: "07",
    title: "Estúdios",
    description: "Organizações criativas com identidade, especialidades e obras derivadas dos relacionamentos centrais.",
    href: "/estudios",
    action: "Explorar estúdios",
    slugs: [],
  },
] as const;

export default async function CollectionPage() {
  const [games, publishedGames, movies, publishedMovies, series, publishedSeries, books, comics] = await Promise.all([
    getAllGames(),
    getPublishedGames(),
    getAllMovies(),
    getPublishedMovies(),
    getAllSeries(),
    getPublishedSeries(),
    getPublishedBooks(),
    getPublishedComics(),
  ]);
  const postBySlug = new Map(getAllBlogPosts().map((post) => [post.slug, post]));
  const personalities = getPublishedPersonalities();
  const studios = getPublishedStudios();

  return (
    <main className={styles.page}>
      <BreadcrumbJsonLd
        items={[{ name: "Início", url: baseURL }, { name: title, url: `${baseURL}${path}` }]}
      />

      <header className={styles.hero}>
        <div>
          <span className={styles.kicker}>Biblioteca cultural</span>
          <h1>Obras para encontrar, comparar e descobrir.</h1>
        </div>
        <p>
          O acervo é a base do site: cada obra é cadastrada uma vez e pode reaparecer em listas,
          perfis e caminhos de descoberta sem duplicar seus dados.
        </p>
      </header>

      <nav className={styles.jumpNav} aria-label="Áreas do acervo">
        {sections.map((section) => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}
      </nav>

      <section className={styles.catalog} aria-label="Catálogos e curadorias">
        {sections.map((section) => {
          const posts = section.slugs.flatMap((slug) => {
            const post = postBySlug.get(slug);
            return post ? [post] : [];
          });
          const isMovies = section.id === "filmes";
          const isGames = section.id === "jogos";
          const isSeries = section.id === "series";
          const isBooks = section.id === "livros";
          const isComics = section.id === "quadrinhos";
          const isPersonalities = section.id === "personalidades";
          const isStudios = section.id === "estudios";

          return (
            <article className={styles.area} id={section.id} key={section.id}>
              <div className={styles.areaIntro}>
                <span className={styles.number}>{section.index}</span>
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </div>
                <div className={styles.state}>
                  {isGames ? (
                    <><strong>{games.length}</strong><span>jogos cadastrados · {publishedGames.length} perfis publicados</span></>
                  ) : isMovies ? (
                    <><strong>{movies.length}</strong><span>filmes cadastrados · {publishedMovies.length} perfis publicados</span></>
                  ) : isSeries ? (
                    <><strong>{series.length}</strong><span>séries cadastradas · {publishedSeries.length} perfis publicados</span></>
                  ) : isBooks ? (
                    <><strong>{books.length}</strong><span>livros e light novels publicados</span></>
                  ) : isComics ? (
                    <><strong>{comics.length}</strong><span>quadrinhos e mangás publicados</span></>
                  ) : isPersonalities ? (
                    <><strong>{personalities.length}</strong><span>perfis públicos com conteúdo suficiente</span></>
                  ) : isStudios ? (
                    <><strong>{studios.length}</strong><span>perfis institucionais publicados</span></>
                  ) : (
                    <><strong>{posts.length}</strong><span>curadorias publicadas · biblioteca em revisão</span></>
                  )}
                </div>
              </div>

              {"href" in section && (
                <Link className={styles.primaryLink} href={section.href}>
                  {section.action}<HiOutlineArrowRight aria-hidden="true" />
                </Link>
              )}

              <div className={styles.curations}>
                {posts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.slug}>
                    <span>Curadoria</span>
                    <strong>{post.metadata.title}</strong>
                    <HiOutlineArrowRight aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
