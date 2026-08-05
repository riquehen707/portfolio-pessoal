import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineArrowRight } from "react-icons/hi2";

import {
  getAllBlogPosts,
  getBlogPostFormat,
  getBlogPrimaryCategory,
  getFeaturedBlogPosts,
  getRecentBlogPosts,
} from "@/app/blog/postData";
import { seoLibraryPath } from "@/app/blog/seo/seoLibraryData";
import { EditorialFeed, type EditorialFeedPost } from "@/components/blog/EditorialFeed";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./blog.module.scss";

const libraryPageTitle = "Painel editorial";
const blogHomeDescription = "Um painel editorial de aprendizado sobre design, marketing e produto.";

export async function generateMetadata() {
  const image = buildOgImage(libraryPageTitle, "blog");
  const generatedMeta = Meta.generate({
    title: libraryPageTitle,
    description: blogHomeDescription,
    baseURL,
    image,
    path: blog.path,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, libraryPageTitle),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default function Blog() {
  const posts = getRecentBlogPosts(100, getAllBlogPosts());
  const featuredPosts = getFeaturedBlogPosts(3, posts);
  const primaryPost = featuredPosts[0] ?? posts[0];
  const totalReadingTime = posts.reduce(
    (total, post) => total + (post.metadata.readingTime ?? 0),
    0,
  );
  const feedPosts: EditorialFeedPost[] = posts.map((post) => ({
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

  return (
    <Column className={styles.page} fillWidth gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={libraryPageTitle}
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
          { name: "Início", url: baseURL },
          { name: libraryPageTitle, url: `${baseURL}${blog.path}` },
        ]}
      />

      <section className={styles.workspace} aria-labelledby="blog-panel-title">
        <div className={styles.workspaceHeader}>
          <span className={styles.brandSquare} aria-hidden="true" />
          <span>Painel editorial de aprendizado</span>
        </div>

        <div className={styles.heroGrid}>
          <div className={styles.heroIntro}>
            <div className={styles.heroMeta}>
              <span>Caderno digital</span>
              <span>{posts.length} notas publicadas</span>
            </div>
            <Heading
              id="blog-panel-title"
              as="h1"
              className={styles.heroTitle}
              variant="display-strong-l"
            >
              Estudos práticos para melhorar presença, página e decisão.
            </Heading>
            <Text
              className={styles.heroLead}
              onBackground="neutral-weak"
              variant="heading-default-m"
            >
              Um arquivo organizado para estudar conceitos, testar ideias e transformar descobertas
              em ações simples.
            </Text>
          </div>

          {primaryPost ? (
            <Link
              className={styles.focusCard}
              data-card-type="featured"
              href={`/blog/${primaryPost.slug}`}
            >
              <span className={styles.focusContent}>
                <span className={styles.focusCategory}>{getBlogPrimaryCategory(primaryPost)}</span>
                <strong>{primaryPost.metadata.title}</strong>
                {primaryPost.metadata.summary ? <span>{primaryPost.metadata.summary}</span> : null}
                <span className={styles.focusButton}>
                  Comece por aqui
                  <HiOutlineArrowRight aria-hidden="true" />
                </span>
              </span>
              <span className={styles.focusMedia}>
                {primaryPost.metadata.image ? (
                  <Image
                    src={primaryPost.metadata.image}
                    alt={primaryPost.metadata.imageAlt ?? primaryPost.metadata.title}
                    fill
                    priority
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 360px"
                  />
                ) : null}
              </span>
            </Link>
          ) : null}
        </div>

        <div className={styles.panelRail} aria-label="Resumo do painel">
          <div className={styles.statCard}>
            <span>Notas</span>
            <strong>{posts.length}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Leitura</span>
            <strong>{totalReadingTime || "40+"} min</strong>
          </div>
        </div>
      </section>

      <section className={styles.topicSection} aria-labelledby="study-paths-title">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Caminhos de leitura</span>
          <Heading id="study-paths-title" as="h2" className={styles.sectionTitle}>
            Encontre um assunto antes de percorrer o arquivo.
          </Heading>
        </div>
        <div className={styles.topicGrid}>
          {[
            {
              mark: "SEO",
              title: "Biblioteca de SEO",
              summary: "Busca, relevância, medição e desenvolvimento profissional em SEO.",
              href: seoLibraryPath,
            },
            {
              mark: "PRO",
              title: "Carreiras digitais",
              summary: "Compare sete profissões e descubra uma rota realista para começar.",
              href: "/blog/melhores-profissoes-digitais",
            },
            {
              mark: "CUL",
              title: "Cultura",
              summary: "Pensadores, estúdios e obras apresentados com contexto e fontes.",
              href: "/blog/cultura",
            },
          ].map((path) => (
            <Link className={styles.topicCard} href={path.href} key={path.href}>
              <span className={styles.topicIcon}>{path.mark}</span>
              <strong>{path.title}</strong>
              <Text onBackground="neutral-weak" variant="body-default-s">
                {path.summary}
              </Text>
              <span className={styles.seoGatewayLink}>
                Abrir caminho
                <HiOutlineArrowRight aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.feedSection} id="artigos" aria-labelledby="blog-feed-title">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Notas do caderno</span>
          <Heading id="blog-feed-title" as="h2" className={styles.sectionTitle}>
            Blocos limpos para ler, guardar e aplicar.
          </Heading>
        </div>
        <EditorialFeed posts={feedPosts} initialCount={12} step={12} />
      </section>
    </Column>
  );
}
