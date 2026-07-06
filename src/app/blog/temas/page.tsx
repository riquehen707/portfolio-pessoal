import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineSquares2X2 } from "react-icons/hi2";

import { getBlogCollectionIndex } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./topics.module.scss";

const topicsPath = "/blog/temas";
const topicsTitle = "Editorias";
const topicsDescription = "Artigos agrupados por assunto e contexto de trabalho.";

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
        <div className={styles.heroIcon} aria-hidden="true">
          <HiOutlineSquares2X2 />
        </div>
        <div className={styles.heroCopy}>
          <div className={styles.heroMeta}>
            <span>Mapa de estudos</span>
            <span>{topics.length} caminhos de leitura</span>
          </div>
          <Heading as="h1" variant="display-strong-l">
            Editorias para encontrar o tipo certo de pergunta.
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            Use cada editoria como uma gaveta de aprendizado: comunicação, aquisição, design,
            operação e presença digital.
          </Text>
        </div>
      </section>

      <section className={styles.gridSection} aria-label="Editorias do blog">
        <div className={styles.grid}>
          {topics.map((topic, index) => (
            <Link
              className={styles.card}
              data-card-type="category"
              href={`/blog/temas/${topic.slug}`}
              key={topic.slug}
            >
              <div className={styles.cardHeader}>
                <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.cardCount}>
                  {topic.count} {topic.count === 1 ? "nota" : "notas"}
                </span>
              </div>
              <Heading as="h2" className={styles.cardTitle} variant="heading-strong-m">
                {topic.label}
              </Heading>
              <Text
                className={styles.cardSummary}
                onBackground="neutral-weak"
                variant="body-default-s"
              >
                {topic.description}
              </Text>
              <span className={styles.cardAction}>
                Abrir editoria
                <HiOutlineArrowRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </Column>
  );
}
