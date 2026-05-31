import Link from "next/link";
import { notFound } from "next/navigation";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import { getAllBlogPosts } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { getKnowledgeTrail, type KnowledgeItem, type KnowledgeStatus } from "@/lib/knowledge";
import { publicTrailAreas } from "@/lib/knowledgeConfig";
import { baseURL, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./page.module.scss";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const statusLabels: Record<KnowledgeStatus, string> = {
  publicado: "Publicado",
  "em breve": "Em breve",
  planejado: "Planejado",
};

function isPublicTrail(slug: string) {
  return publicTrailAreas.some((area) => area.slug === slug);
}

function ArticleCard({ item, compact = false }: { item: KnowledgeItem; compact?: boolean }) {
  const content = (
    <>
      <div className={styles.articleTop}>
        <span className={styles.statusBadge} data-status={item.status}>
          {statusLabels[item.status]}
        </span>
        <span className={styles.articleMeta}>{item.level}</span>
      </div>

      <div className={styles.articleCopy}>
        <Heading
          as="h3"
          className={styles.articleTitle}
          variant={compact ? "heading-strong-s" : "heading-strong-m"}
        >
          {item.title}
        </Heading>
        {compact ? null : (
          <Text
            className={styles.articleDescription}
            variant="body-default-s"
            onBackground="neutral-weak"
          >
            {item.description}
          </Text>
        )}
      </div>

      <div className={styles.articleFooter}>
        <span>{item.type}</span>
        {item.estimatedReadingTime ? <span>{item.estimatedReadingTime} min</span> : null}
        {item.prerequisites.length > 0 ? <span>{item.prerequisites.length} prereq.</span> : null}
      </div>
    </>
  );

  if (item.href) {
    return (
      <Link className={styles.articleCard} data-compact={compact} href={item.href}>
        {content}
      </Link>
    );
  }

  return (
    <article className={styles.articleCard} data-compact={compact} data-disabled="true">
      {content}
    </article>
  );
}

export function generateStaticParams() {
  return publicTrailAreas.map((area) => ({
    slug: area.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const posts = getAllBlogPosts();
  const trail = getKnowledgeTrail(slug, posts);

  if (!trail || !isPublicTrail(slug)) return {};

  const title = `${trail.area.title} | Trilha de conteudo`;
  const image = buildOgImage(trail.area.title, "trilha de aprendizado");
  const path = `/trilhas/${trail.area.slug}`;
  const generatedMeta = Meta.generate({
    title,
    description: trail.area.description,
    baseURL,
    image,
    path,
  });

  return {
    ...generatedMeta,
    alternates: {
      canonical: `${baseURL}${path}`,
    },
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, title),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default async function KnowledgeTrailPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = getAllBlogPosts();
  const trail = getKnowledgeTrail(slug, posts);

  if (!trail || !isPublicTrail(slug)) notFound();

  const path = `/trilhas/${trail.area.slug}`;
  const firstModuleWithItems = trail.modules.find((module) => module.items.length > 0);

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={`${trail.area.title} | Trilha de conteudo`}
        description={trail.area.description}
        path={path}
        author={{
          name: person.name,
          url: baseURL,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: baseURL },
          { name: "Mapa de Aprendizado", url: `${baseURL}/mapa` },
          { name: trail.area.title, url: `${baseURL}${path}` },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <Link className={styles.backLink} href="/mapa">
            Mapa de aprendizado
          </Link>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Trilha
          </Text>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-l" wrap="balance">
            {trail.area.title}
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            {trail.area.description}
          </Text>
        </div>

        <div className={styles.heroStats} aria-label="Resumo da trilha">
          <div>
            <span>{trail.publishedCount}</span>
            <p>publicados</p>
          </div>
          <div>
            <span>{trail.essentials.length}</span>
            <p>essenciais</p>
          </div>
          <div>
            <span>{trail.plannedCount}</span>
            <p>planejados</p>
          </div>
        </div>
      </section>

      {firstModuleWithItems ? (
        <section className={styles.startPanel} aria-labelledby="start-title">
          <div>
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Primeiro passo
            </Text>
            <Heading id="start-title" as="h2" variant="heading-strong-xl">
              Comece por {firstModuleWithItems.title}.
            </Heading>
          </div>
          <Link className={styles.startAction} href={`#${firstModuleWithItems.slug}`}>
            Ir para o modulo
          </Link>
        </section>
      ) : null}

      {trail.essentials.length > 0 ? (
        <section className={styles.essentialSection} aria-labelledby="essential-title">
          <div className={styles.sectionHeader}>
            <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
              Essenciais
            </Text>
            <Heading id="essential-title" as="h2" variant="heading-strong-xl">
              Leituras que sustentam a trilha.
            </Heading>
          </div>

          <div className={styles.essentialGrid}>
            {trail.essentials.map((item) => (
              <ArticleCard item={item} compact key={item.slug} />
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.moduleSection} aria-labelledby="modules-title">
        <div className={styles.sectionHeader}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Modulos
          </Text>
          <Heading id="modules-title" as="h2" variant="heading-strong-xl">
            Ordem sugerida.
          </Heading>
        </div>

        <div className={styles.moduleStack}>
          {trail.modules.map((module, index) => (
            <details
              className={styles.moduleBlock}
              id={module.slug}
              key={module.slug}
              open={index < 2}
            >
              <summary>
                <span className={styles.moduleNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.moduleSummaryCopy}>
                  <strong>{module.title}</strong>
                  <small>{module.description}</small>
                </span>
                <span className={styles.moduleCount}>
                  {module.publishedCount}/{module.items.length}
                </span>
              </summary>

              {module.items.length > 0 ? (
                <div className={styles.articleGrid}>
                  {module.items.map((item) => (
                    <ArticleCard item={item} key={item.slug} />
                  ))}
                </div>
              ) : (
                <p className={styles.emptyModule}>Conteudos ainda planejados para esta etapa.</p>
              )}
            </details>
          ))}
        </div>
      </section>
    </Column>
  );
}
