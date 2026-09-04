import type { Metadata } from "next";
import Link from "next/link";
import { ReadingCatalogLibrary } from "@/components/reading";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ReadingLibraryJsonLd } from "@/components/seo/ReadingLibraryJsonLd";
import { getPublishedBooks, getReadingEditions, getReadingVolumes } from "@/data/reading";
import { baseURL } from "@/resources";
import styles from "./reading.module.scss";

const path = "/livros";
const title = "Biblioteca de livros";
const description = "Encontre livros por título, autoria, gênero, país, formato e ano em um acervo editorial com sinopses e edições verificadas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, url: `${baseURL}${path}`, type: "website" },
};

export default async function BooksPage() {
  const [works, editions, volumes] = await Promise.all([getPublishedBooks(), getReadingEditions(), getReadingVolumes()]);
  const workIds = new Set(works.map((work) => work.id));
  const volumeWork = new Map(volumes.map((volume) => [volume.id, volume.workId]));
  const bookEditions = editions.filter((edition) => edition.status === "published" && (Boolean(edition.workId && workIds.has(edition.workId)) || Boolean(edition.volumeId && workIds.has(volumeWork.get(edition.volumeId) ?? ""))));
  const coveredWorkIds = new Set(works.filter((work) => work.image).map((work) => work.id));
  bookEditions.forEach((edition) => { const workId = edition.workId ?? (edition.volumeId ? volumeWork.get(edition.volumeId) : undefined); if (workId && edition.cover) coveredWorkIds.add(workId); });
  const countries = new Set(works.flatMap((work) => work.originCountries));

  return <main className={styles.page}>
    <ReadingLibraryJsonLd works={works} name={title} path={path} />
    <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }, { name: title, url: `${baseURL}${path}` }]} />

    <header className={`${styles.hero} ${styles.libraryHero}`}>
      <div className={styles.heroMain}>
        <span className={styles.kicker}>Biblioteca cultural · leitura</span>
        <h1>Encontre a próxima leitura no acervo.</h1>
        <p>Ficção, filosofia, ensaios e light novels organizados por obra. Sinopses, autoria e temas permanecem separados das capas, ISBNs e disponibilidade de cada edição.</p>
        <nav className={styles.collectionLinks} aria-label="Outros caminhos do acervo"><Link href="/acervo">Visão geral do acervo</Link><Link href="/quadrinhos">Quadrinhos e mangás</Link></nav>
      </div>
      <div className={styles.heroAside}>
        <span>Livros publicados</span><strong>{works.length}</strong>
        <p>fichas disponíveis para busca, comparação e descoberta.</p>
        <dl className={styles.catalogStats}><div><dt>{coveredWorkIds.size}</dt><dd>com imagem cadastrada</dd></div><div><dt>{bookEditions.length}</dt><dd>edições verificadas</dd></div><div><dt>{countries.size}</dt><dd>países de origem</dd></div></dl>
      </div>
    </header>

    {works.length ? <section className={styles.librarySection} aria-labelledby="book-library-title">
      <div className={styles.sectionHeader}><span className={styles.kicker}>Explorar</span><h2 id="book-library-title">Todos os livros</h2><p>Busque por título, autoria, tema ou país. Combine os filtros para reduzir o acervo sem perder a página atual.</p></div>
      <ReadingCatalogLibrary works={works} mode="books" />
    </section> : <section className={styles.empty}><span>Acervo em preparação</span><h2>Nenhum livro foi publicado ainda.</h2><p>A biblioteca só exibe obras pesquisadas e completas.</p></section>}
  </main>;
}
