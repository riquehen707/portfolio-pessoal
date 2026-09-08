import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Column, Meta, Schema } from "@once-ui-system/core";
import {
  getAllWorkProjects, getWorkProjectBySlug, getWorkProjectPath,
  getWorkProjectSeoImage, getWorkProjectService, getWorkProjectStaticParams,
  normalizeWorkProjectSlug, toAbsoluteWorkProjectUrl,
} from "@/app/work/projectData";
import { CustomMDX, ScrollToHash } from "@/components";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Projects } from "@/components/work/Projects";
import { baseURL, person, work } from "@/resources";
import { buildDiscoverImageMetadata } from "@/utils/og";
import styles from "./page.module.scss";

type PageProps = { params: Promise<{ slug: string | string[] }> };

export async function generateStaticParams() { return getWorkProjectStaticParams(); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = getWorkProjectBySlug(normalizeWorkProjectSlug((await params).slug));
  if (!post) return {};
  const image = toAbsoluteWorkProjectUrl(getWorkProjectSeoImage(post));
  const meta = Meta.generate({
    title: post.metadata.title, description: post.metadata.summary ?? post.metadata.title,
    baseURL, image, path: getWorkProjectPath(post.slug),
  });
  return {
    ...meta,
    openGraph: { ...meta.openGraph, images: buildDiscoverImageMetadata(image, post.metadata.imageAlt ?? post.metadata.title) },
    twitter: { ...meta.twitter, images: image ? [image] : undefined },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const slug = normalizeWorkProjectSlug((await params).slug);
  const post = getWorkProjectBySlug(slug);
  if (!post) notFound();
  const service = getWorkProjectService(post);
  const cover = post.metadata.image ?? post.metadata.images?.[0];
  const related = getAllWorkProjects().filter(project => project.slug !== slug);
  const example = post.metadata.kind === "study";
  return (
    <Column className={styles.page} fillWidth>
      <Schema as="article" baseURL={baseURL} path={getWorkProjectPath(slug)}
        title={post.metadata.title} description={post.metadata.summary ?? post.metadata.title}
        datePublished={post.metadata.publishedAt} dateModified={post.metadata.updatedAt}
        image={toAbsoluteWorkProjectUrl(getWorkProjectSeoImage(post))}
        author={{ name: person.name, url: baseURL + "/about", image: baseURL + person.avatar }} />
      <BreadcrumbJsonLd items={[
        { name: "Início", url: baseURL },
        { name: "Portfólio", url: baseURL + work.path },
        { name: post.metadata.title, url: baseURL + getWorkProjectPath(slug) },
      ]} />
      <nav className={styles.navigation} aria-label="Navegação do case">
        <Link href={work.path}>← Voltar ao portfólio</Link>
        <Link href="/servicos">Serviços</Link>
      </nav>
      <header className={styles.hero}>
        <p className={styles.type}>{post.metadata.category} · {example ? "Exemplo ilustrativo" : post.metadata.kind === "client" ? "Projeto de cliente" : "Projeto próprio"}</p>
        <h1>{post.metadata.title}</h1>
        {post.metadata.project?.audience && <p>{post.metadata.project.audience}</p>}
        <p>{post.metadata.summary}</p>
        <p className={styles.byline}>Criação e implementação: {person.name}</p>
        {post.metadata.link && <Link className={styles.action} href={post.metadata.link}>
          {example ? "Ver exemplo de interface" : "Abrir projeto"} <span aria-hidden="true">↗</span>
        </Link>}
      </header>
      {cover && <figure className={styles.cover}>
        <div><Image src={cover} alt={post.metadata.imageAlt ?? post.metadata.title} fill priority sizes="(max-width: 900px) 100vw, 1000px" /></div>
        <figcaption>{example ? "Captura do componente implementado, com conteúdo ilustrativo." : "Captura da interface do site."}</figcaption>
      </figure>}
      <article className={styles.article}>
        <CustomMDX source={post.content} glossary={post.metadata.glossary ?? {}} />
      </article>
      {service && <section className={styles.service} aria-labelledby="related-service-title">
        <div><h2 id="related-service-title">Serviço relacionado</h2><p>{service.label}</p></div>
        <Link className={styles.action} href={service.href}>Ver serviço <span aria-hidden="true">→</span></Link>
      </section>}
      {related.length > 0 && <section className={styles.related} aria-labelledby="related-projects-title">
        <h2 id="related-projects-title">Outros trabalhos</h2>
        <Projects projects={related} range={[1, 2]} layout="grid" cardVariant="compact" marginBottom="0" paddingX="0" />
      </section>}
      <ScrollToHash />
    </Column>
  );
}
