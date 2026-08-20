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
  const navigation = [
    { href: "#a-ideia", label: "A ideia", visible: true },
    { href: "#por-que", label: "Por que pensei nisso", visible: idea.motivation.length > 0 },
    { href: "#estado-atual", label: "Estado atual", visible: idea.currentState.length > 0 },
    ...idea.sections.map((section) => ({ href: `#${section.id}`, label: section.title, visible: true })),
    { href: "#proximos-passos", label: "Próximos passos", visible: true },
    { href: "#progresso", label: "Registro de progresso", visible: idea.updates.length > 0 },
  ].filter((item) => item.visible);

  return <main className={styles.page}>
    <BreadcrumbJsonLd items={[{name:"Início",url:baseURL},{name:"Ideias",url:`${baseURL}/ideias`},{name:idea.title,url:`${baseURL}/ideias/${idea.slug}`}]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}} />
    <header className={styles.detailHero}><Link className={styles.back} href="/ideias">← Todas as ideias</Link><span className={styles.kicker}>Documento vivo</span><h1>{idea.title}</h1><p className={styles.lead}>{idea.description}</p><div className={styles.metadata}><span className={styles.status}>{ideaStatusLabels[idea.status]}</span><span>Criada em <time dateTime={idea.createdAt}>{formatIdeaDate(idea.createdAt)}</time></span><span>Atualizada em <time dateTime={idea.updatedAt}>{formatIdeaDate(idea.updatedAt)}</time></span>{[...idea.categories,...idea.tags].map((tag)=><span key={tag}>{tag}</span>)}</div></header>
    <div className={styles.article}>
      <nav className={styles.articleNav} aria-label="Nesta ideia">{navigation.map((item)=><a href={item.href} key={item.href}>{item.label}</a>)}</nav>
      <article className={styles.content}>
        <section id="a-ideia"><h2>A ideia</h2>{idea.idea.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}</section>
        {idea.motivation.length ? <section id="por-que"><h2>Por que pensei nisso</h2>{idea.motivation.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}</section> : null}
        {idea.currentState.length ? <section id="estado-atual"><h2>Estado atual</h2>{idea.currentState.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}</section> : null}
        {idea.sections.map((section)=><section className={styles.flexibleSection} data-tone={section.tone} id={section.id} key={section.id}><h2>{section.title}</h2>{section.content.map((paragraph)=><p key={paragraph}>{paragraph}</p>)}{section.items.length ? <ul>{section.items.map((item)=><li key={item}>{item}</li>)}</ul> : null}</section>)}
        <section id="proximos-passos"><h2>Próximos passos</h2>{idea.nextSteps.length ? <ul>{idea.nextSteps.map((step)=><li key={step}>{step}</li>)}</ul> : <p>Não há próximos passos definidos. A ideia pode permanecer aberta sem que isso seja tratado como problema.</p>}</section>
        {idea.updates.length ? <section id="progresso"><h2>Registro de progresso</h2><IdeaTimeline updates={idea.updates}/></section> : null}
        {derivedLinks.length ? <section><h2>O que nasceu desta ideia</h2><ul className={styles.relatedLinks}>{derivedLinks.map((link)=><li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul></section> : null}
        {related.length ? <section><h2>Relacionado a</h2>{related.map((item)=><IdeaCard compact idea={item} key={item.id}/>)}</section> : null}
      </article>
    </div>
  </main>;
}
