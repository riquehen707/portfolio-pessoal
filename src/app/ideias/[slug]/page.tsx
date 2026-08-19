import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { IdeaCard } from "@/components/ideas/IdeaCard";
import { IdeaTimeline } from "@/components/ideas/IdeaTimeline";
import { formatIdeaDate, ideaStatusLabels } from "@/components/ideas/ideaLabels";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getIdeaBySlug, getPublishedIdeas, getRelatedIdeas } from "@/data/ideas";
import { baseURL } from "@/resources";
import styles from "../ideas.module.scss";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() { return (await getPublishedIdeas()).map((idea)=>({slug:idea.slug})); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const idea = await getIdeaBySlug(slug);
  if (!idea || idea.publicationStatus !== "published") return { title:"Ideia não encontrada",robots:{index:false,follow:false} };
  const url = `${baseURL}/ideias/${idea.slug}`;
  return { title:idea.seo.title,description:idea.seo.description,alternates:{canonical:url},openGraph:{title:idea.seo.title,description:idea.seo.description,url,type:"article",publishedTime:idea.createdAt,modifiedTime:idea.updatedAt} };
}

export default async function IdeaPage({ params }: Props) {
  const { slug } = await params;
  const idea = await getIdeaBySlug(slug);
  if (!idea || idea.publicationStatus !== "published") notFound();
  const related = await getRelatedIdeas(idea.id);
  const jsonLd = { "@context":"https://schema.org","@type":"CreativeWork",name:idea.title,description:idea.description,dateCreated:idea.createdAt,dateModified:idea.updatedAt,url:`${baseURL}/ideias/${idea.slug}`,keywords:[...idea.categories,...idea.tags].join(", ") };
  const derivedLinks = [
    ...idea.relatedArticleSlugs.map((value)=>({label:`Artigo: ${value.replaceAll("-"," ")}`,href:`/blog/${value}`})),
    ...idea.relatedProjectSlugs.map((value)=>({label:`Projeto: ${value.replaceAll("-"," ")}`,href:`/work/${value}`})),
  ];

  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{name:"Início",url:baseURL},{name:"Ideias",url:`${baseURL}/ideias`},{name:idea.title,url:`${baseURL}/ideias/${idea.slug}`}]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}} />
    <header className={styles.detailHero}><Link className={styles.back} href="/ideias">← Todas as ideias</Link><span className={styles.kicker}>Documento vivo</span><h1>{idea.title}</h1><p className={styles.lead}>{idea.description}</p><div className={styles.metadata}><span className={styles.status}>{ideaStatusLabels[idea.status]}</span><span>Criada em <time dateTime={idea.createdAt}>{formatIdeaDate(idea.createdAt)}</time></span><span>Atualizada em <time dateTime={idea.updatedAt}>{formatIdeaDate(idea.updatedAt)}</time></span>{[...idea.categories,...idea.tags].map((tag)=><span key={tag}>{tag}</span>)}</div></header>
    <div className={styles.article}>
      <nav className={styles.articleNav} aria-label="Nesta ideia"><a href="#a-ideia">A ideia</a><a href="#por-que">Por que pensei nisso</a><a href="#estado-atual">Estado atual</a><a href="#proximos-passos">Próximos passos</a><a href="#progresso">Registro de progresso</a></nav>
      <article className={styles.content}>
        <section id="a-ideia"><h2>A ideia</h2>{idea.idea.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}</section>
        <section id="por-que"><h2>Por que pensei nisso</h2>{idea.motivation.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}</section>
        <section id="estado-atual"><h2>Estado atual</h2>{idea.currentState.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}</section>
        <section id="proximos-passos"><h2>Próximos passos</h2>{idea.nextSteps.length ? <ul>{idea.nextSteps.map((step)=><li key={step}>{step}</li>)}</ul> : <p>Não há próximos passos definidos. A ideia pode permanecer aberta sem que isso seja tratado como problema.</p>}</section>
        <section id="progresso"><h2>Registro de progresso</h2><IdeaTimeline updates={idea.updates}/></section>
        {derivedLinks.length ? <section><h2>O que nasceu desta ideia</h2><ul className={styles.relatedLinks}>{derivedLinks.map((link)=><li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></section> : null}
        {related.length ? <section><h2>Ideias relacionadas</h2>{related.map((item)=><IdeaCard compact idea={item} key={item.id}/>)}</section> : null}
      </article>
    </div>
  </main>;
}

