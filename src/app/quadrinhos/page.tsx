import type { Metadata } from "next";
import { ReadingCatalogLibrary } from "@/components/reading";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { ReadingLibraryJsonLd } from "@/components/seo/ReadingLibraryJsonLd";
import { getPublishedComics } from "@/data/reading";
import { baseURL } from "@/resources";
import styles from "../livros/reading.module.scss";

const path="/quadrinhos";const title="Biblioteca de quadrinhos e mangás";const description="HQs, graphic novels, mangás, manhwas, manhuas e webtoons reunidos em um único acervo editorial, sem duplicar obras por edição ou tradição.";
export const metadata:Metadata={title,description,alternates:{canonical:`${baseURL}${path}`},openGraph:{title,description,url:`${baseURL}${path}`,type:"website"}};
export default async function ComicsPage(){const works=[...(await getPublishedComics())];return <main className={styles.page}><ReadingLibraryJsonLd works={works} name={title} path={path}/><BreadcrumbJsonLd items={[{name:"Início",url:baseURL},{name:title,url:`${baseURL}${path}`}]}/><header className={styles.hero}><span>Biblioteca cultural · arte sequencial</span><h1>Quadrinhos de tradições diferentes, no mesmo acervo.</h1><p>Mangá, manhwa e manhua indicam tradições editoriais; HQ e graphic novel descrevem outras origens e formas de publicação. Gêneros e demografias permanecem separados.</p></header>{works.length?<section><h2>Acervo publicado</h2><p className={styles.sectionIntro}>Combine autoria e gênero com tradição, demografia, situação da publicação, país e disponibilidade de edição.</p><ReadingCatalogLibrary works={works} mode="comics"/></section>:<section className={styles.empty}><span>Acervo em preparação</span><h2>Nenhum quadrinho foi publicado ainda.</h2><p>A biblioteca só exibe obras pesquisadas e completas.</p></section>}</main>}
