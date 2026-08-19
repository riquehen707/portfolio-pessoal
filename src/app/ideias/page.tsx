import type { Metadata } from "next";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { IdeaLibrary } from "@/components/ideas/IdeaLibrary";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getPublishedIdeas } from "@/data/ideas";
import { baseURL } from "@/resources";
import styles from "./ideas.module.scss";

const path = "/ideias";
const title = "Ideias — arquivo público de pensamentos em desenvolvimento";
const description = "Um caderno público para registrar ideias, acompanhar mudanças de direção e preservar o histórico do que ainda está sendo pensado.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${baseURL}${path}` },
  openGraph: { title, description, url: `${baseURL}${path}`, type: "website" },
};

export default async function IdeasPage() {
  const ideas = await getPublishedIdeas();
  const newestUpdate = ideas.map((idea)=>idea.updatedAt).sort().at(-1);
  const recentCutoff = newestUpdate ? new Date(`${newestUpdate}T12:00:00Z`) : new Date(0);
  recentCutoff.setUTCDate(recentCutoff.getUTCDate() - 45);
  const active = ideas.filter((idea)=>idea.status === "em-desenvolvimento" || new Date(`${idea.updatedAt}T12:00:00Z`) >= recentCutoff).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)).slice(0,3);
  const collectionJsonLd = { "@context":"https://schema.org","@type":"CollectionPage",name:title,description,url:`${baseURL}${path}`,hasPart:ideas.map((idea)=>({"@type":"CreativeWork",name:idea.title,url:`${baseURL}/ideias/${idea.slug}`})) };

  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{name:"Início",url:baseURL},{name:"Ideias",url:`${baseURL}${path}`}]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(collectionJsonLd)}} />
    <header className={styles.hero}>
      <div><span className={styles.kicker}>Caderno público · processo</span><h1>Ideias não precisam nascer prontas.</h1><p>Um arquivo de pensamentos em desenvolvimento, decisões revistas e caminhos que talvez levem a artigos, projetos ou apenas a uma compreensão melhor.</p></div>
      <aside className={styles.heroNote}><strong>Como ler este espaço</strong><span>Inacabado não significa atrasado. Cada registro mostra o estado atual sem apagar o caminho anterior.</span></aside>
    </header>
    <section className={styles.section} aria-labelledby="active-ideas"><div className={styles.sectionHeader}><h2 id="active-ideas">O que estou desenvolvendo agora</h2><p>Registros em desenvolvimento ou atualizados recentemente, selecionados automaticamente.</p></div>{active.length ? <div>{active.map((idea)=><IdeaCard compact idea={idea} key={idea.id}/>)}</div> : <p>Nenhuma ideia está em desenvolvimento agora. O arquivo continua disponível abaixo.</p>}</section>
    <section className={styles.section} aria-labelledby="all-ideas"><div className={styles.sectionHeader}><h2 id="all-ideas">Todas as ideias</h2><p>Ordene pelo surgimento ou pela última mudança. Os filtros permanecem discretos enquanto o arquivo é pequeno.</p></div><IdeaLibrary ideas={ideas}/></section>
  </main>;
}

