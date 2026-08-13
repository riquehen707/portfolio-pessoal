import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ReadingLibrary } from "@/components/reading";
import { getPublishedComics } from "@/data/reading";
import { baseURL } from "@/resources";
import styles from "../livros/reading.module.scss";

const path="/quadrinhos";const title="Biblioteca de quadrinhos e mangás";const description="HQs, graphic novels, mangás, manhwas, manhuas e webtoons reunidos em um único acervo editorial, sem duplicar obras por edição ou tradição.";
export const metadata:Metadata={title,description,alternates:{canonical:`${baseURL}${path}`},openGraph:{title,description,url:`${baseURL}${path}`,type:"website"}};
export default async function ComicsPage(){const works=[...(await getPublishedComics())];return <main className={styles.page}><BreadcrumbJsonLd items={[{name:"Início",url:baseURL},{name:title,url:`${baseURL}${path}`}]}/><header className={styles.hero}><span>Biblioteca cultural · arte sequencial</span><h1>Quadrinhos de tradições diferentes, no mesmo acervo.</h1><p>Mangá, manhwa e manhua indicam tradições editoriais; graphic novel, webtoon e série descrevem formas de publicação. Gêneros e demografias permanecem campos separados.</p></header>{works.length?<section><h2>Acervo publicado</h2><ReadingLibrary works={works}/></section>:<section className={styles.empty}><span>Acervo em preparação</span><h2>Nenhum quadrinho foi publicado ainda.</h2><p>A estrutura está pronta, mas só exibirá obras verificadas. Índices especializados serão criados quando houver quantidade suficiente, sempre como filtros deste mesmo catálogo.</p></section>}</main>}
