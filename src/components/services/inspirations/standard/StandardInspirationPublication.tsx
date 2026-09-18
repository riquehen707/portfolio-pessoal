import Image from "next/image";
import Link from "next/link";

import type { ServiceInspiration } from "@/data/service-inspirations";
import styles from "./StandardInspirationPublication.module.scss";

type RelatedInspiration = Pick<ServiceInspiration, "slug" | "title" | "category" | "image" | "alt" | "width" | "height">;

export function StandardInspirationPublication({ inspiration, contactHref, relatedInspirations }: { inspiration: ServiceInspiration; contactHref: string; relatedInspirations: RelatedInspiration[] }) {
  const isPortrait = inspiration.height > inspiration.width;
  return <main className={styles.publication}>
    <Link className={styles.backLink} href="/servicos/inspiracoes"><span aria-hidden="true">←</span> Voltar para inspirações</Link>
    <header className={styles.intro}><div><p>{inspiration.category}</p><h1>{inspiration.title}</h1><div className={styles.tags}>{inspiration.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div></div><aside><strong>Referência visual</strong><p>Uma possibilidade para orientar composição, ritmo e conteúdo. Não é um projeto realizado nem um template pronto.</p></aside></header>
    <figure className={`${styles.figure} ${isPortrait ? styles.portrait : ""}`}><Image src={inspiration.image} alt={inspiration.alt} width={inspiration.width} height={inspiration.height} priority sizes={isPortrait ? "(max-width:760px) 100vw,48rem" : "(max-width:1320px) 100vw,75rem"} /><figcaption>Direção visual demonstrativa. A implementação final usa conteúdo, identidade e objetivos próprios.</figcaption></figure>
    <section className={styles.direction} aria-labelledby={`${inspiration.slug}-direction`}><div><p>O que essa direção propõe</p><h2 id={`${inspiration.slug}-direction`}>Uma estrutura para explorar, compreender e agir.</h2></div><p>{inspiration.description}</p></section>
    {inspiration.journey?.length ? <section className={styles.journey} aria-labelledby={`${inspiration.slug}-journey`}><div className={styles.sectionHeading}><p>Jornada possível</p><h2 id={`${inspiration.slug}-journey`}>Do primeiro contato visual ao próximo passo.</h2></div><ol>{inspiration.journey.map((step) => <li key={step.label}><span>{step.label}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol></section> : null}
    <section className={styles.adaptation} aria-labelledby={`${inspiration.slug}-adaptation`}><div><p>Adaptação</p><h2 id={`${inspiration.slug}-adaptation`}>A referência muda para caber no projeto.</h2></div><ul><li><strong>Conteúdo</strong><span>Textos, imagens e ordem respondem ao que seu público precisa encontrar.</span></li><li><strong>Identidade</strong><span>Cores, tipografia e detalhes partem da sua marca ou de uma direção criada para ela.</span></li><li><strong>Objetivo</strong><span>Navegação e CTA priorizam a ação adequada ao negócio, sem copiar uma estrutura por hábito.</span></li></ul></section>
    <section className={styles.related} aria-labelledby={`${inspiration.slug}-related`}><div className={styles.sectionHeading}><p>Continue explorando</p><h2 id={`${inspiration.slug}-related`}>Outras possibilidades visuais</h2></div><div>{relatedInspirations.map((related) => <Link key={related.slug} href={`/servicos/inspiracoes/${related.slug}`}><Image src={related.image} alt={related.alt} width={related.width} height={related.height} loading="eager" sizes="(max-width:600px) 44vw,12rem" /><span><small>{related.category}</small><strong>{related.title}</strong></span></Link>)}</div></section>
    <section className={styles.cta} aria-labelledby={`${inspiration.slug}-cta`}><div><p>Vamos conversar?</p><h2 id={`${inspiration.slug}-cta`}>Quero um site nessa direção</h2><span>Cores, conteúdo, imagens e estrutura serão adaptados ao seu projeto.</span></div><a href={contactHref} data-analytics-event="services_help_click" data-analytics-location={`service_inspiration_${inspiration.slug}`}>Falar sobre meu projeto <span aria-hidden="true">→</span></a></section>
  </main>;
}
