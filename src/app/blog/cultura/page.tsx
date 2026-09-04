import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Link from "next/link";
import { HiOutlineArrowRight, HiOutlineBookOpen } from "react-icons/hi2";

import { getAllBlogPosts } from "@/app/blog/postData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "../temas/topics.module.scss";

const culturePath = "/blog/cultura";
const cultureTitle = "Cultura";
const cultureDescription =
  "Perfis editoriais para entender pensadores, estúdios, obras e movimentos com contexto e fontes.";
const cultureSlugs = [
  "judith-butler",
  "frantz-fanon",
  "simone-de-beauvoir",
  "michel-foucault",
  "hannah-arendt",
  "byung-chul-han",
  "platao",
  "arthur-schopenhauer",
  "friedrich-nietzsche",
  "studio-ghibli",
];

export async function generateMetadata() {
  const image = buildOgImage(cultureTitle, "blog");
  const generatedMeta = Meta.generate({
    title: cultureTitle,
    description: cultureDescription,
    baseURL,
    image,
    path: culturePath,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, cultureTitle),
    },
    twitter: { ...generatedMeta.twitter, images: [image] },
  };
}

export default function CulturePage() {
  const postBySlug = new Map(getAllBlogPosts().map((post) => [post.slug, post]));
  const profiles = cultureSlugs.flatMap((slug) => {
    const post = postBySlug.get(slug);
    return post ? [post] : [];
  });

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={cultureTitle}
        description={cultureDescription}
        path={culturePath}
        image={`/api/og/generate?title=${encodeURIComponent(cultureTitle)}`}
        author={{
          name: person.name,
          url: `${baseURL}${culturePath}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
          { name: cultureTitle, url: `${baseURL}${culturePath}` },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroIcon} aria-hidden="true">
          <HiOutlineBookOpen />
        </div>
        <div className={styles.heroCopy}>
          <div className={styles.heroMeta}>
            <span>Biblioteca cultural</span>
            <span>{profiles.length} perfis publicados</span>
          </div>
          <Heading as="h1" variant="display-strong-l">
            Cultura com contexto, fontes e caminhos para continuar.
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            Perfis longos para conhecer ideias, obras e trajetórias sem reduzir o assunto a listas ou
            curiosidades soltas.
          </Text>
        </div>
      </section>

      <section className={styles.gridSection} aria-label="Perfis de cultura">
        <div className={styles.grid}>
          {profiles.map((post, index) => (
            <Link className={styles.card} href={`/blog/${post.slug}`} key={post.slug}>
              <div className={styles.cardHeader}>
                <span className={styles.cardNumber}>{String(index + 1).padStart(2, "0")}</span>
                <span className={styles.cardCount}>{post.metadata.readingTime ?? 0} min</span>
              </div>
              <Heading as="h2" className={styles.cardTitle} variant="heading-strong-m">
                {post.metadata.title}
              </Heading>
              <Text className={styles.cardSummary} onBackground="neutral-weak" variant="body-default-s">
                {post.metadata.summary}
              </Text>
              <span className={styles.cardAction}>
                Ler perfil
                <HiOutlineArrowRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </Column>
  );
}
