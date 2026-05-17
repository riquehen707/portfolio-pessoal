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

import styles from "./blog.module.scss";

const blogHomeDescription =
  "Artigos sobre marketing, paginas e aquisicao para negocios de servico.";

export async function generateMetadata() {
  return Meta.generate({
    title: blog.title,
    description: blogHomeDescription,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Insights")}&subtitle=${encodeURIComponent("marketing e aquisicao")}`,
    path: blog.path,
  });
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
      title: "Antes de investir",
      summary: "Margem, CAC e meta.",
      href: "/blog/termos-de-marketing",
    },
    {
      title: "Antes de melhorar uma pagina",
      summary: "Clareza, hierarquia e oferta.",
      href: "/blog/termos-de-design",
    },
    {
      title: "Antes de gerar leads",
      summary: "Canal, anuncio e custo.",
      href: "/blog/termos-de-publicidade",
    },
  ];

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={blog.title}
        description={blogHomeDescription}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent("Insights")}&subtitle=${encodeURIComponent("marketing e aquisicao")}`}
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
            Blog
          </Text>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-l">
            Insights
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            Artigos sobre marketing, paginas e aquisicao para negocios de servico.
          </Text>
        </div>
      </section>

      {featuredPost ? (
        <section className={styles.featuredSection}>
          <Text className={styles.sectionLabel} variant="label-default-s" onBackground="brand-strong">
            Em destaque
          </Text>

          <article className={styles.featuredCard}>
            <a className={styles.featuredLink} href={`/blog/${featuredPost.slug}`}>
              <div className={styles.featuredMedia}>
                <Media
                  src={featuredPost.metadata.image ?? "/api/og/generate?title=Insights"}
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
                <span className={styles.featuredBadge}>Em destaque</span>
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
              Indices
            </Text>
            <Text className={styles.sectionLead} onBackground="neutral-weak" variant="body-default-s">
              Hubs por tema para fortalecer leitura e navegacao interna.
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
            Ultimos artigos
          </Text>
          <Text className={styles.sectionLead} onBackground="neutral-weak" variant="body-default-s">
            Leitura direta, temas especificos e links internos claros.
          </Text>
        </div>

        <EditorialFeed posts={feedPosts} />
      </section>
    </Column>
  );
}
