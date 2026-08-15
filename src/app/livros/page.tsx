import type { Metadata } from "next";
import { ReadingCatalogLibrary } from "@/components/reading";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ReadingLibraryJsonLd } from "@/components/seo/ReadingLibraryJsonLd";
import { getPublishedBooks } from "@/data/reading";
import { baseURL } from "@/resources";
import styles from "./reading.module.scss";

const path="/livros";const title="Biblioteca de livros";const description="Livros, ensaios e light novels cadastrados em um acervo editorial com autoria, temas, séries e edições verificadas.";
export const metadata:Metadata={title,description,alternates:{canonical:`${baseURL}${path}`},openGraph:{title,description,url:`${baseURL}${path}`,type:"website"}};
export default async function BooksPage(){const works=[...(await getPublishedBooks())];return <main className={styles.page}><ReadingLibraryJsonLd works={works} name={title} path={path}/><BreadcrumbJsonLd items={[{name:"Início",url:baseURL},{name:title,url:`${baseURL}${path}`}]}/><header className={styles.hero}><span>Biblioteca cultural · leitura</span><h1>Livros para encontrar, comparar e continuar lendo.</h1><p>Um único acervo para ficção, não ficção, ensaios e light novels. Cada obra é separada de suas edições, capas, ISBNs e disponibilidade.</p></header>{works.length?<section><h2>Acervo publicado</h2><p className={styles.sectionIntro}>Busque por título ou autoria e combine gênero, país, formato, ano e disponibilidade de edição.</p><ReadingCatalogLibrary works={works} mode="books"/></section>:<section className={styles.empty}><span>Acervo em preparação</span><h2>Nenhum livro foi publicado ainda.</h2><p>A biblioteca só exibe obras pesquisadas e completas.</p></section>}</main>}
