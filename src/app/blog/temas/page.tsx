import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Link from "next/link";

import { getBlogCollectionIndex } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./topics.module.scss";

const topicsPath = "/blog/temas";
const topicsTitle = "Temas";
const topicsDescription = "Artigos agrupados por assunto.";

export async function generateMetadata() {
  const image = buildOgImage(topicsTitle, "blog");
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
        image={`/api/og/generate?title=${encodeURIComponent(topicsTitle)}`}
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
        <Text className={styles.kicker} variant="label-default-s" onBackground="neutral-weak">
          Blog
        </Text>
        <Heading as="h1" variant="display-strong-l">
          Temas.
        </Heading>
        <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
          Uma lista simples para encontrar artigos por assunto.
        </Text>
      </section>

      <section className={styles.gridSection}>
        <div className={styles.grid}>
          {topics.map((topic) => (
            <Link className={styles.card} href={`/blog/temas/${topic.slug}`} key={topic.slug}>
              <div className={styles.cardHeader}>
                <Heading as="h2" className={styles.cardTitle} variant="heading-strong-m">
                  {topic.label}
                </Heading>
                <span className={styles.cardCount}>
                  {topic.count} {topic.count === 1 ? "artigo" : "artigos"}
                </span>
              </div>
              <Text
                className={styles.cardSummary}
                onBackground="neutral-weak"
                variant="body-default-s"
              >
                {topic.description}
              </Text>
            </Link>
          ))}
        </div>
      </section>
    </Column>
  );
}
