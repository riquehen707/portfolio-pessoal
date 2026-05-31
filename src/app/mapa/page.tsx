import Link from "next/link";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import { getAllBlogPosts } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";
import { getKnowledgeMap } from "@/lib/knowledge";

import styles from "./mapa.module.scss";

const pageTitle = "Mapa de Aprendizado";
const pageDescription =
  "Uma forma simples de navegar pelos conteudos do basico ao avancado, entendendo o que vem antes, o que vem depois e quais caminhos seguir.";
const pagePath = "/mapa";

export async function generateMetadata() {
  const image = buildOgImage("Mapa de Aprendizado", "conteudos do basico ao avancado");
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
  const totalPublished = mapItems.reduce((sum, item) => sum + item.publishedCount, 0);
  const totalPlanned = mapItems.reduce((sum, item) => sum + item.plannedCount, 0);
  const totalEssentials = mapItems.reduce((sum, item) => sum + item.essentialCount, 0);

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
          <Link className={styles.primaryAction} href="/trilhas/renda-digital#diagnostico">
            Comecar pelo diagnostico
          </Link>
          <Link className={styles.secondaryAction} href="/blog">
            Ver biblioteca geral
          </Link>
        </div>
      </section>

      <section className={styles.stats} aria-label="Resumo do mapa">
        <div>
          <span>{totalPublished}</span>
          <p>publicados</p>
        </div>
        <div>
          <span>{totalEssentials}</span>
          <p>essenciais</p>
        </div>
        <div>
          <span>{totalPlanned}</span>
          <p>em construcao</p>
        </div>
      </section>

      <section className={styles.areaSection} aria-labelledby="areas-title">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Caminhos principais
          </Text>
          <Heading id="areas-title" as="h2" variant="heading-strong-xl">
            Escolha uma area para seguir.
          </Heading>
        </div>

        <div className={styles.areaGrid}>
          {mapItems.map(
            ({ area, publishedCount, plannedCount, essentialCount, modules }, index) => (
              <Link className={styles.areaCard} href={area.path} key={area.slug}>
                <div className={styles.areaCardTop}>
                  <span className={styles.areaIndex}>{String(index + 1).padStart(2, "0")}</span>
                  <span className={styles.areaCount}>{publishedCount} publicados</span>
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

                <div className={styles.moduleChips} aria-label={`Modulos de ${area.title}`}>
                  {modules.slice(0, 3).map((module) => (
                    <span key={module.slug}>{module.title}</span>
                  ))}
                </div>

                <div className={styles.areaMeta}>
                  <span>{essentialCount} essenciais</span>
                  <span>{plannedCount} planejados</span>
                  <strong>{area.slug === "projetos" ? "Ver projetos" : "Ver caminho"}</strong>
                </div>
              </Link>
            ),
          )}
        </div>
      </section>

      <section className={styles.flowSection} aria-labelledby="flow-title">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Progressao
          </Text>
          <Heading id="flow-title" as="h2" variant="heading-strong-xl">
            Uma ordem simples para nao se perder.
          </Heading>
        </div>

        <ol className={styles.flowList}>
          {[
            "Diagnostico",
            "Aprendizado",
            "Ambiente digital",
            "Habilidades-base",
            "Ramificacao",
            "Projetos",
            "Monetizacao",
            "Ativos",
          ].map((step, index) => (
            <li key={step}>
              <span>{index}</span>
              <strong>{step}</strong>
            </li>
          ))}
        </ol>
      </section>
    </Column>
  );
}
