import Link from "next/link";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import { getAllBlogPosts } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getKnowledgeMap } from "@/lib/knowledge";
import { publicTrailAreas } from "@/lib/knowledgeConfig";
import { baseURL, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./trilhas.module.scss";

const pageTitle = "Trilhas por Area";
const pageDescription = "Sequencias de leitura organizadas por area, modulo e artigo.";
const pagePath = "/trilhas";

const usageSteps = [
  {
    label: "Area",
    title: "Escolha o territorio",
    description: "Marketing, Design, Renda Digital, Aprendizado ou Ferramentas.",
  },
  {
    label: "Trilha",
    title: "Siga uma sequencia",
    description: "Cada area tem uma trilha principal com modulos em ordem.",
  },
  {
    label: "Artigo",
    title: "Leia uma unidade",
    description: "Dentro de cada modulo ficam artigos especificos para resolver perguntas.",
  },
] as const;

function formatCount(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export async function generateMetadata() {
  const image = buildOgImage(pageTitle, "area, modulo e artigo");
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
          Uma sequencia para cada area.
        </Heading>
        <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
          {pageDescription}
        </Text>
      </section>

      <section className={styles.usageSection} aria-label="Como usar as trilhas">
        {usageSteps.map((step) => (
          <div className={styles.usageItem} key={step.title}>
            <span>{step.label}</span>
            <div>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.trailGrid} aria-label="Trilhas disponiveis">
        {mapItems.map(
          ({
            area,
            publishedCount,
            moduleCount,
            readingMinutes,
            modules,
            startItem,
            stageCounts,
          }) => (
            <Link className={styles.trailCard} href={area.path} key={area.slug}>
              <div className={styles.trailHeader}>
                <span>Area</span>
                <span>{formatCount(publishedCount, "artigo", "artigos")}</span>
              </div>
              <div className={styles.trailCopy}>
                <Heading as="h2" className={styles.trailTitle} variant="heading-strong-l">
                  {area.title}
                </Heading>
                <Text
                  className={styles.trailDescription}
                  variant="body-default-s"
                  onBackground="neutral-weak"
                >
                  {area.description}
                </Text>
              </div>
              <div className={styles.trailPreview}>
                <span>Comece por</span>
                <strong>{startItem?.title ?? `Trilha de ${area.title}`}</strong>
                <small>
                  {formatCount(moduleCount, "modulo", "modulos")}
                  {readingMinutes > 0 ? ` - ${readingMinutes} min de leitura` : ""}
                </small>
              </div>
              {stageCounts.length > 0 ? (
                <div className={styles.stageList}>
                  {stageCounts.slice(0, 3).map((stage) => (
                    <span key={stage.stage}>
                      {stage.label}: {stage.count}
                    </span>
                  ))}
                </div>
              ) : null}
              <div className={styles.moduleList}>
                {modules.slice(0, 4).map((module) => (
                  <span key={module.slug}>{module.title}</span>
                ))}
              </div>
              <div className={styles.trailFooter}>
                <span>Sequencia recomendada</span>
                <strong>Abrir trilha</strong>
              </div>
            </Link>
          ),
        )}
      </section>

      <Link className={styles.mapLink} href="/mapa">
        Voltar para o mapa geral
      </Link>
    </Column>
  );
}
