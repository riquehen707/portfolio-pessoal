import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ReadingLibrary } from "@/components/reading";
import { getPublishedBooks as getPublishedReadingWorks } from "@/data/reading";
import { baseURL } from "@/resources";
import styles from "./reading.module.scss";

const path="/livros"; const title="Biblioteca de livros"; const description="Livros, ensaios e light novels cadastrados em um acervo editorial com autoria, temas, séries e edições verificadas.";
export const metadata:Metadata={title,description,alternates:{canonical:`${baseURL}${path}`},openGraph:{title,description,url:`${baseURL}${path}`,type:"website"}};

export default async function BooksPage(){const works=[...(await getPublishedReadingWorks())];return <main className={styles.page}><BreadcrumbJsonLd items={[{name:"Início",url:baseURL},{name:title,url:`${baseURL}${path}`}]}/><header className={styles.hero}><span>Biblioteca cultural · leitura</span><h1>Livros para encontrar, comparar e continuar lendo.</h1><p>Um único acervo para ficção, não ficção, ensaios e light novels. Cada obra é separada de suas edições, capas, ISBNs e ofertas comerciais.</p></header>{works.length?<section><h2>Acervo publicado</h2><ReadingLibrary works={works}/></section>:<section className={styles.empty}><span>Acervo em preparação</span><h2>Nenhum livro foi publicado ainda.</h2><p>A estrutura está pronta, mas esta biblioteca só exibirá obras pesquisadas e completas. Registros de teste ou edições insuficientes não criam páginas vazias.</p></section>}</main>}
