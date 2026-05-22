import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import { getBlogCollectionIndex } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./topics.module.scss";

const topicsPath = "/blog/temas";
const topicsTitle = "Guias por tema";
const topicsDescription =
  "Artigos agrupados por problema para navegar com mais contexto.";

export async function generateMetadata() {
  const image = buildOgImage(topicsTitle, "artigos por problema");
  const generatedMeta = Meta.generate({
    title: topicsTitle,
    description: topicsDescription,
    baseURL,
    image,
    path: topicsPath,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, topicsTitle),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default function BlogTopicsPage() {
  const topics = getBlogCollectionIndex();

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={topicsTitle}
        description={topicsDescription}
        path={topicsPath}
        image={`/api/og/generate?title=${encodeURIComponent(topicsTitle)}&subtitle=${encodeURIComponent("artigos por problema")}`}
        author={{
          name: person.name,
          url: `${baseURL}${topicsPath}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
          { name: "Temas", url: `${baseURL}${topicsPath}` },
        ]}
      />

      <section className={styles.hero}>
        <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
          Blog
        </Text>
        <Heading as="h1" variant="display-strong-l">
          Guias por tema
        </Heading>
        <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
          Trilhas curtas para chegar ao artigo certo.
        </Text>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionLabel} variant="label-default-s" onBackground="brand-strong">
            Problemas agrupados
          </Text>
          <Text className={styles.sectionLead} onBackground="neutral-weak" variant="body-default-s">
            Cada guia reúne textos com aplicação próxima.
          </Text>
        </div>

        <div className={styles.grid}>
          {topics.map((topic) => (
            <a className={styles.card} href={`/blog/temas/${topic.slug}`} key={topic.slug}>
              <div className={styles.cardHeader}>
                <Heading as="h2" className={styles.cardTitle} variant="heading-strong-m">
                  {topic.label}
                </Heading>
                <span className={styles.cardCount}>
                  {topic.count} {topic.count === 1 ? "artigo" : "artigos"}
                </span>
              </div>
              <Text className={styles.cardSummary} onBackground="neutral-weak" variant="body-default-s">
                {topic.description}
              </Text>
            </a>
          ))}
        </div>
      </section>
    </Column>
  );
}
