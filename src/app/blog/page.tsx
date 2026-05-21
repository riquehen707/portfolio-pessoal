import { Column, Heading, Media, Meta, Schema, Text } from "@once-ui-system/core";

import {
  getAllBlogPosts,
  getBlogCollectionIndex,
  getBlogPostFormat,
  getBlogPrimaryCategory,
  getFeaturedHomeBlogPost,
  getRecentBlogPosts,
} from "@/app/blog/postData";
import { EditorialFeed, type EditorialFeedPost } from "@/components/blog/EditorialFeed";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./blog.module.scss";

const blogHomeDescription =
  "Critérios práticos para decidir melhor em marketing e produto.";

export async function generateMetadata() {
  const image = buildOgImage("Guias", "critérios para decidir");
  const generatedMeta = Meta.generate({
    title: blog.title,
    description: blogHomeDescription,
    baseURL,
    image,
    path: blog.path,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, blog.title),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default function Blog() {
  const posts = getAllBlogPosts();
  const topics = getBlogCollectionIndex(posts);
  const featuredPost = getFeaturedHomeBlogPost(posts);
  const recentPosts = getRecentBlogPosts(24, posts).filter((post) => post.slug !== featuredPost?.slug);

  const feedPosts: EditorialFeedPost[] = recentPosts.map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    summary: post.metadata.summary,
    image: post.metadata.image,
    imageAlt: post.metadata.imageAlt,
    category: getBlogPrimaryCategory(post),
    format: getBlogPostFormat(post),
    readingTime: post.metadata.readingTime,
    publishedAt: post.metadata.updatedAt ?? post.metadata.publishedAt,
  }));

  const startCards = [
    {
      title: "Antes de investir em tráfego",
      summary: "Margem, CAC e meta antes da verba.",
      href: "/blog/termos-de-marketing",
    },
    {
      title: "Antes de redesenhar uma página",
      summary: "Hierarquia, oferta e CTA em primeiro lugar.",
      href: "/blog/termos-de-design",
    },
    {
      title: "Antes de gerar mais leads",
      summary: "Canal, custo e qualidade do contato.",
      href: "/blog/termos-de-publicidade",
    },
  ];

  const readingModes = [
    { label: "Entender", value: "conceitos sem jargão" },
    { label: "Aplicar", value: "checklists e exemplos" },
    { label: "Comparar", value: "temas, formatos e próximos passos" },
  ];

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={blog.title}
        description={blogHomeDescription}
        path={blog.path}
        author={{
          name: person.name,
          url: `${baseURL}${blog.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
        ]}
      />

      <section className={styles.heroSection}>
        <div className={styles.hero}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
            Biblioteca
          </Text>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-l">
            Guias
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            Textos para escolher com mais critério antes de executar.
          </Text>
        </div>
      </section>

      {featuredPost ? (
        <section className={styles.featuredSection}>
          <Text className={styles.sectionLabel} variant="label-default-s" onBackground="brand-strong">
            Leitura principal
          </Text>

          <article className={styles.featuredCard}>
            <a className={styles.featuredLink} href={`/blog/${featuredPost.slug}`}>
              <div className={styles.featuredMedia}>
                  <Media
                  src={featuredPost.metadata.image ?? "/api/og/generate?title=Guias"}
                  alt={
                    featuredPost.metadata.imageAlt ?? `Capa do artigo ${featuredPost.metadata.title}`
                  }
                  aspectRatio="16 / 9"
                  radius="l"
                  border="transparent"
                  sizes="(max-width: 768px) 100vw, 720px"
                  priority
                />
              </div>

              <div className={styles.featuredContent}>
                <span className={styles.featuredBadge}>Melhor ponto de entrada</span>
                <Heading as="h2" className={styles.featuredTitle} variant="display-strong-s">
                  {featuredPost.metadata.title}
                </Heading>
                <Text className={styles.featuredSummary} onBackground="neutral-weak" variant="body-default-m">
                  {featuredPost.metadata.summary}
                </Text>
                <div className={styles.featuredMeta}>
                  <span className={styles.featuredTag}>{getBlogPrimaryCategory(featuredPost)}</span>
                  <span>{getBlogPostFormat(featuredPost)}</span>
                  {featuredPost.metadata.readingTime ? (
                    <span>{featuredPost.metadata.readingTime} min</span>
                  ) : null}
                </div>
              </div>
            </a>
          </article>
        </section>
      ) : null}

      <section className={styles.modeSection}>
        <div className={styles.modeHeader}>
          <Text className={styles.sectionLabel} variant="label-default-s" onBackground="brand-strong">
            Como ler
          </Text>
          <h2 className={styles.modeTitle}>Leia pela pergunta do momento.</h2>
        </div>

        <div className={styles.modeList}>
          {readingModes.map((mode) => (
            <div className={styles.modeItem} key={mode.label}>
              <Text className={styles.modeLabel} variant="label-default-s" onBackground="neutral-weak">
                {mode.label}
              </Text>
              <Text className={styles.modeValue} variant="body-default-s" onBackground="neutral-medium">
                {mode.value}
              </Text>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.startSection}>
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionLabel} variant="label-default-s" onBackground="brand-strong">
            Comece por aqui
          </Text>
        </div>

        <div className={styles.startGrid}>
          {startCards.map((item) => (
            <a className={styles.startCard} href={item.href} key={item.title}>
              <span className={styles.startMarker} aria-hidden="true" />
              <div className={styles.startCopy}>
                <Heading as="h3" className={styles.startTitle} variant="heading-strong-m">
                  {item.title}
                </Heading>
                <Text className={styles.startSummary} onBackground="neutral-weak" variant="body-default-s">
                  {item.summary}
                </Text>
              </div>
              <span className={styles.startArrow} aria-hidden="true">
                {">"}
              </span>
            </a>
          ))}
        </div>
      </section>

      {topics.length > 0 ? (
        <section className={styles.startSection}>
          <div className={styles.sectionHeader}>
            <Text className={styles.sectionLabel} variant="label-default-s" onBackground="brand-strong">
              Mapas por assunto
            </Text>
            <Text className={styles.sectionLead} onBackground="neutral-weak" variant="body-default-s">
              Quando você já sabe onde investigar.
            </Text>
          </div>

          <div className={styles.startGrid}>
            {topics.map((topic) => (
              <a className={styles.startCard} href={`/blog/temas/${topic.slug}`} key={topic.slug}>
                <span className={styles.startMarker} aria-hidden="true" />
                <div className={styles.startCopy}>
                  <Heading as="h3" className={styles.startTitle} variant="heading-strong-m">
                    {topic.label}
                  </Heading>
                  <Text className={styles.startSummary} onBackground="neutral-weak" variant="body-default-s">
                    {topic.description}
                  </Text>
                </div>
                <span className={styles.startArrow} aria-hidden="true">
                  {topic.count}
                </span>
              </a>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.feedSection} id="artigos">
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionLabel} variant="label-default-s" onBackground="brand-strong">
            Leituras recentes
          </Text>
          <Text className={styles.sectionLead} onBackground="neutral-weak" variant="body-default-s">
            Publicações novas e ajustes editoriais.
          </Text>
        </div>

        <EditorialFeed posts={feedPosts} initialCount={3} step={3} />
      </section>
    </Column>
  );
}
