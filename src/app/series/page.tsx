import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { SeriesLibraryJsonLd } from "@/components/seo/SeriesLibraryJsonLd";
import { SeriesLibrary } from "@/components/series/SeriesLibrary";
import { getAllSeries, getAllSeriesOffers, getPublishedSeries } from "@/data/series";
import { baseURL } from "@/resources";
import styles from "../filmes/movies.module.scss";

const path="/series";
const title="Biblioteca de séries";
const description="Séries organizadas por gênero, país, período, formato e disponibilidade atual no Brasil.";
export const metadata:Metadata={title,description,alternates:{canonical:`${baseURL}${path}`},openGraph:{title,description,url:`${baseURL}${path}`,type:"website"}};

export default async function SeriesPage(){
  const [all,published,offers]=await Promise.all([getAllSeries(),getPublishedSeries(),getAllSeriesOffers()]);
  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{name:"Início",url:baseURL},{name:title,url:`${baseURL}${path}`}]}/><SeriesLibraryJsonLd series={published}/>
    <header className={styles.hero}><div className={styles.heroMain}><span className={styles.kicker}>Biblioteca cultural · televisão</span><h1>Séries para acompanhar por mundos, temporadas e formatos.</h1><p>Produções longas, minisséries, animações e experiências seriadas reunidas num catálogo único, com disponibilidade separada por temporada.</p></div><div className={styles.heroAside}><span>Estado do acervo</span><strong>{published.length}</strong><p>séries com registros públicos e relações reutilizáveis.</p><div className={styles.counts}><span>{published.length} publicadas</span><span>{all.length-published.length} em preparação</span></div></div></header>
    <section className={styles.library} aria-labelledby="series-library-title"><div className={styles.sectionHeader}><h2 id="series-library-title">Acervo de séries</h2><p>Combine busca e filtros. A disponibilidade informa somente temporadas verificadas no Brasil.</p></div><SeriesLibrary series={published} offers={offers}/></section>
  </main>;
}
