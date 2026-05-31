import Link from "next/link";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import { getAllBlogPosts } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";
import { getKnowledgeMap, knowledgeStageFlow } from "@/lib/knowledge";

import styles from "./mapa.module.scss";

const pageTitle = "Mapa de Aprendizado";
const pageDescription =
  "Visao geral para escolher uma area, seguir uma trilha e encontrar a proxima leitura sem depender de uma lista cronologica.";
const pagePath = "/mapa";

const structureLevels = [
  {
    label: "Area",
    title: "Grande tema",
    description: "Campo de conhecimento, como Marketing, Design ou Renda Digital.",
  },
  {
    label: "Trilha",
    title: "Sequencia recomendada",
    description: "Ordem de estudo dentro de uma area.",
  },
  {
    label: "Modulo",
    title: "Etapa da trilha",
    description: "Agrupa artigos que resolvem uma parte do aprendizado.",
  },
  {
    label: "Artigo",
    title: "Leitura especifica",
    description: "Conteudo pratico para uma pergunta ou problema.",
  },
] as const;

function formatCount(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}

export async function generateMetadata() {
  const image = buildOgImage("Mapa de Aprendizado", "areas, trilhas e modulos");
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

export default function KnowledgeMapPage() {
  const posts = getAllBlogPosts();
  const mapItems = getKnowledgeMap(posts);
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
        <div className={styles.heroCopy}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Base de conhecimento
          </Text>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-l" wrap="balance">
            {pageTitle}
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            {pageDescription}
          </Text>
        </div>

        <div className={styles.heroActions}>
          <Link className={styles.primaryAction} href="/trilhas">
            Ver trilhas por area
          </Link>
        </div>
      </section>

      <section className={styles.flowSection} aria-labelledby="flow-title">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Estrutura
          </Text>
          <Heading id="flow-title" as="h2" variant="heading-strong-xl">
            Como a biblioteca se organiza.
          </Heading>
        </div>

        <ol className={styles.flowList}>
          {structureLevels.map((level, index) => (
            <li key={level.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{level.label}</strong>
              <small>{level.description}</small>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.journeySection} aria-labelledby="journey-title">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Ordem de aprendizado
          </Text>
          <Heading id="journey-title" as="h2" variant="heading-strong-xl">
            Comece pela base. Depois avance para escolha, pratica e casos.
          </Heading>
        </div>

        <ol className={styles.stageRail}>
          {knowledgeStageFlow.map((stage, index) => (
            <li key={stage.stage}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{stage.label}</strong>
              <small>{stage.description}</small>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.areaSection} aria-labelledby="areas-title">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Areas
          </Text>
          <Heading id="areas-title" as="h2" variant="heading-strong-xl">
            Escolha uma area. Depois siga a trilha.
          </Heading>
        </div>

        <div className={styles.areaGrid}>
          {mapItems.map(
            (
              {
                area,
                publishedCount,
                moduleCount,
                readingMinutes,
                modules,
                startItem,
                stageCounts,
              },
              index,
            ) => (
              <Link className={styles.areaCard} href={area.path} key={area.slug}>
                <div className={styles.areaCardTop}>
                  <span className={styles.areaIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.areaCount}>Area</span>
                </div>

                <div className={styles.areaCardCopy}>
                  <Heading as="h3" className={styles.areaTitle} variant="heading-strong-l">
                    {area.title}
                  </Heading>
                  <Text
                    className={styles.areaDescription}
                    variant="body-default-s"
                    onBackground="neutral-weak"
                  >
                    {area.shortDescription}
                  </Text>
                </div>

                <div className={styles.trailPreview}>
                  <span>Comece por</span>
                  <strong>{startItem?.title ?? `Trilha de ${area.title}`}</strong>
                  <small>
                    {formatCount(moduleCount, "modulo", "modulos")} -{" "}
                    {formatCount(publishedCount, "artigo", "artigos")}
                    {readingMinutes > 0 ? ` - ${readingMinutes} min de leitura` : ""}
                  </small>
                </div>

                <div
                  className={styles.moduleChips}
                  aria-label={`Modulos da trilha de ${area.title}`}
                >
                  {modules.slice(0, 3).map((module) => (
                    <span key={module.slug}>{module.title}</span>
                  ))}
                </div>

                {stageCounts.length > 0 ? (
                  <div
                    className={styles.stageChips}
                    aria-label={`Etapas da trilha de ${area.title}`}
                  >
                    {stageCounts.slice(0, 3).map((stage) => (
                      <span key={stage.stage}>
                        {stage.label}: {stage.count}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className={styles.areaMeta}>
                  <span>Sequencia recomendada</span>
                  <strong>{area.slug === "projetos" ? "Abrir area" : "Abrir trilha"}</strong>
                </div>
              </Link>
            ),
          )}
        </div>
      </section>
    </Column>
  );
}
