import Link from "next/link";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import { getAllBlogPosts } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getKnowledgeMap } from "@/lib/knowledge";
import { publicTrailAreas } from "@/lib/knowledgeConfig";
import { baseURL, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./trilhas.module.scss";

const pageTitle = "Trilhas de Conteudo";
const pageDescription =
  "Caminhos organizados por area para aprender em ordem, sem depender de uma lista cronologica de posts.";
const pagePath = "/trilhas";

export async function generateMetadata() {
  const image = buildOgImage("Trilhas de Conteudo", "aprendizado por area");
  const generatedMeta = Meta.generate({
    title: pageTitle,
    description: pageDescription,
    baseURL,
    image,
    path: pagePath,
  });

  return {
    ...generatedMeta,
    alternates: {
      canonical: `${baseURL}${pagePath}`,
    },
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, pageTitle),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default function TrailsPage() {
  const posts = getAllBlogPosts();
  const mapItems = getKnowledgeMap(posts).filter(({ area }) =>
    publicTrailAreas.some((publicArea) => publicArea.slug === area.slug),
  );

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={pageTitle}
        description={pageDescription}
        path={pagePath}
        author={{
          name: person.name,
          url: baseURL,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: baseURL },
          { name: pageTitle, url: `${baseURL}${pagePath}` },
        ]}
      />

      <section className={styles.hero}>
        <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
          Trilhas
        </Text>
        <Heading as="h1" className={styles.heroTitle} variant="display-strong-l" wrap="balance">
          Caminhos por area.
        </Heading>
        <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
          {pageDescription}
        </Text>
      </section>

      <section className={styles.trailGrid} aria-label="Trilhas disponiveis">
        {mapItems.map(({ area, publishedCount, plannedCount, modules }) => (
          <Link className={styles.trailCard} href={area.path} key={area.slug}>
            <div className={styles.trailHeader}>
              <Heading as="h2" className={styles.trailTitle} variant="heading-strong-l">
                {area.title}
              </Heading>
              <span>{publishedCount} publicados</span>
            </div>
            <Text
              className={styles.trailDescription}
              variant="body-default-s"
              onBackground="neutral-weak"
            >
              {area.description}
            </Text>
            <div className={styles.moduleList}>
              {modules.slice(0, 4).map((module) => (
                <span key={module.slug}>{module.title}</span>
              ))}
            </div>
            <div className={styles.trailFooter}>
              <span>{plannedCount} planejados</span>
              <strong>Abrir trilha</strong>
            </div>
          </Link>
        ))}
      </section>

      <Link className={styles.mapLink} href="/mapa">
        Voltar para o mapa geral
      </Link>
    </Column>
  );
}
