import { Column, Meta, Schema } from "@once-ui-system/core";

import { getAllWorkProjects } from "@/app/work/projectData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Projects } from "@/components/work/Projects";
import { ServicesAreaNav } from "@/components/services/ServicesAreaNav";
import Link from "next/link";
import {
  about,
  baseURL,
  contentStrategy,
  person,
  servicesPage,
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
        <h1>{workStrategy.hero.headline}</h1>
        <p>{workStrategy.hero.subheadline}</p>
      </header>
      <section aria-labelledby="projects-title" className={styles.projects}>
        <div className={styles.sectionHeading}>
          <h2 id="projects-title">Trabalhos em destaque</h2>
          <p>Um projeto próprio e estudos de interface. Os exemplos usam conteúdo ilustrativo.</p>
        </div>
        <Projects projects={projects} layout="editorial" marginBottom="0" paddingX="0" />
      </section>
      <footer className={styles.nextStep}>
        <div><h2>Precisa de um site ou portfólio?</h2><p>Veja formatos, preços e o que está incluído.</p></div>
        <Link href={servicesPage.path}>Ver serviços <span aria-hidden="true">→</span></Link>
      </footer>
    </Column>
  );
}
