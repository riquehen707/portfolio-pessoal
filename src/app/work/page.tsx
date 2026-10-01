import { Column, Meta, Schema } from "@once-ui-system/core";

import { getAllWorkProjects } from "@/app/work/projectData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Projects } from "@/components/work/Projects";
import { ServicesAreaNav } from "@/components/services/ServicesAreaNav";
import { ServicesNextStep } from "@/components/services/ServicesNextStep";
import {
  about,
  baseURL,
  contentStrategy,
  person,
  work,
} from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./work.module.scss";

const workStrategy = contentStrategy.pages.work;

export async function generateMetadata() {
  const image = buildOgImage(work.title);
  const generatedMeta = Meta.generate({
    title: work.title,
    description: work.description,
    baseURL,
    image,
    path: work.path,
  });

  return {
    ...generatedMeta,
    alternates: {
      canonical: `${baseURL}${work.path}`,
    },
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, work.title),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
    keywords: workStrategy.seo.keywords,
  };
}

export default function Work() {
  const projects = getAllWorkProjects();

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: work.label, url: `${baseURL}${work.path}` },
        ]}
      />

      <ServicesAreaNav active="portfolio" />

      <header className={styles.hero}>
        <p className={styles.eyebrow}>Portfólio</p>
        <h1>Trabalhos e estudos de interface.</h1>
        <p>Um site próprio publicado e dois estudos demonstrativos. Os cases explicam objetivos, decisões e o estado de cada projeto.</p>
      </header>
      <section aria-labelledby="work-projects-title" className={styles.projects}>
        <h2 className={styles.visuallyHidden} id="work-projects-title">Trabalhos selecionados</h2>
        <Projects projects={projects} layout="editorial" marginBottom="0" paddingX="0" />
      </section>
      <ServicesNextStep
        eyebrow="Seu projeto"
        title="Precisa de um site ou portfólio?"
        description="Veja o escopo, as mensalidades e como iniciar uma conversa."
        href="/servicos"
        label="Ver serviços"
      />
    </Column>
  );
}
