import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import { getBlogCollectionIndex } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./topics.module.scss";

const topicsPath = "/blog/temas";
const topicsTitle = "Índices do blog";
const topicsDescription =
  "Hubs editoriais por tema para navegar pelos artigos do blog com mais contexto e ligacao interna.";

export async function generateMetadata() {
  const image = buildOgImage(topicsTitle, "hubs editoriais por tema");
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
        image={`/api/og/generate?title=${encodeURIComponent(topicsTitle)}&subtitle=${encodeURIComponent("hubs editoriais por tema")}`}
        author={{
          name: person.name,
          url: `${baseURL}${topicsPath}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
          { name: "Temas", url: `${baseURL}${topicsPath}` },
        ]}
      />

      <section className={styles.hero}>
        <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
          Blog
        </Text>
        <Heading as="h1" variant="display-strong-l">
          Índices
        </Heading>
        <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
          Hubs por tema para fortalecer leitura, links internos e descoberta dos artigos.
        </Text>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionLabel} variant="label-default-s" onBackground="brand-strong">
            Temas
          </Text>
          <Text className={styles.sectionLead} onBackground="neutral-weak" variant="body-default-s">
            Cada índice agrupa textos relacionados e ajuda a navegar por assunto.
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
