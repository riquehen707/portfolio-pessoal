import type { Metadata } from "next";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

import { getAllBlogPosts } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getAllMovies, getPublishedMovies } from "@/data/movies";
import { baseURL } from "@/resources";

import styles from "./page.module.scss";

const path = "/acervo";
const title = "Acervo cultural";
const description =
  "Filmes, livros, mangás, quadrinhos e séries organizados em bibliotecas e curadorias editoriais.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, url: `${baseURL}${path}`, type: "website" },
};

const sections = [
  {
    id: "filmes",
    index: "01",
    title: "Filmes",
    description:
      "Uma biblioteca navegável por título, ano, país, gênero, direção e organizações relacionadas.",
    href: "/filmes",
    action: "Explorar filmes",
    slugs: ["melhores-filmes-terror-seculo-21", "melhores-filmes-de-2025", "melhores-filmes-de-vampiro"],
  },
  {
    id: "livros",
    index: "02",
    title: "Livros",
    description:
      "Obras, autores, séries e edições brasileiras separados corretamente. Por enquanto, a entrada pública acontece pelas curadorias.",
    action: "Ver curadorias de livros",
    slugs: ["melhores-livros-de-terror", "melhores-livros-de-vampiro", "livros-para-quem-gostou-de-it-bem-vindos-a-derry"],
  },
  {
    id: "quadrinhos",
    index: "03",
    title: "Mangás e quadrinhos",
    description:
      "Mangás, HQs, graphic novels, manhwas e webtoons convivem no mesmo modelo, sem confundir formato, tradição e demografia.",
    action: "Ver curadorias gráficas",
    slugs: ["melhores-mangas-de-romance-para-homens", "melhores-quadrinhos-mangas-de-terror", "melhores-quadrinhos-mangas-de-vampiro"],
  },
  {
    id: "series",
    index: "04",
    title: "Séries",
    description:
      "Seleções por experiência, tema e disponibilidade no Brasil, apoiadas por registros centrais ainda em revisão.",
    action: "Ver curadorias de séries",
    slugs: ["melhores-series-de-terror", "melhores-series-de-vampiro", "series-para-quem-gostou-de-it-bem-vindos-a-derry"],
  },
] as const;

export default async function CollectionPage() {
  const [movies, publishedMovies] = await Promise.all([getAllMovies(), getPublishedMovies()]);
  const postBySlug = new Map(getAllBlogPosts().map((post) => [post.slug, post]));

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

          return (
            <article className={styles.area} id={section.id} key={section.id}>
              <div className={styles.areaIntro}>
                <span className={styles.number}>{section.index}</span>
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.description}</p>
                </div>
                <div className={styles.state}>
                  {isMovies ? (
                    <><strong>{movies.length}</strong><span>filmes cadastrados · {publishedMovies.length} perfis publicados</span></>
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
