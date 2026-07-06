import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineArrowRight,
  HiOutlineAcademicCap,
  HiOutlineBookOpen,
  HiOutlineMegaphone,
  HiOutlinePaintBrush,
  HiOutlineSquares2X2,
  HiOutlineWrenchScrewdriver,
} from "react-icons/hi2";

import {
  blogEntryCategories,
  getAllBlogPosts,
  getBlogCollectionIndex,
  getBlogPostFormat,
  getBlogPrimaryCategory,
  getFeaturedBlogPosts,
  getRecentBlogPosts,
} from "@/app/blog/postData";
import { EditorialFeed, type EditorialFeedPost } from "@/components/blog/EditorialFeed";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./blog.module.scss";

const entryCategoryCards = [
  {
    slug: "criar",
    icon: HiOutlinePaintBrush,
    ...blogEntryCategories.criar,
  },
  {
    slug: "vender",
    icon: HiOutlineMegaphone,
    ...blogEntryCategories.vender,
  },
  {
    slug: "estudar",
    icon: HiOutlineAcademicCap,
    ...blogEntryCategories.estudar,
  },
  {
    slug: "ferramentas",
    icon: HiOutlineWrenchScrewdriver,
    ...blogEntryCategories.ferramentas,
  },
] as const;

const libraryPageTitle = "Painel editorial";
const blogHomeDescription = "Um painel editorial de aprendizado sobre design, marketing e produto.";

const editorialSeries = [
  {
    title: "Aprendendo SEO do zero",
    text: "Testes práticos para entender tráfego, palavras-chave e monetização.",
    href: "/blog/categorias/ferramentas",
    currentPosts: 3,
    totalPosts: 10,
  },
  {
    title: "Design para iniciantes",
    text: "Noções de hierarquia, leitura visual e interface sem complicar.",
    href: "/blog/categorias/criar",
    currentPosts: 2,
    totalPosts: 8,
  },
  {
    title: "Ferramentas que estou testando",
    text: "Experimentos com canais, automações, busca e rotinas de publicação.",
    href: "/blog/categorias/ferramentas",
    currentPosts: 4,
    totalPosts: 12,
  },
  {
    title: "Estudos de faculdade sem complicar",
    text: "Resumos aplicáveis para organizar conceitos, trabalhos e repertório.",
    href: "/blog/categorias/estudar",
    currentPosts: 1,
    totalPosts: 8,
  },
] as const;

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
  const allTopicCards = getBlogCollectionIndex(posts);
  const totalReadingTime = posts.reduce((total, post) => total + (post.metadata.readingTime ?? 0), 0);
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
            <Heading id="blog-panel-title" as="h1" className={styles.heroTitle} variant="display-strong-l">
              Estudos práticos para melhorar presença, página e decisão.
            </Heading>
            <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
              Um arquivo organizado para estudar conceitos, testar ideias e transformar descobertas em ações simples.
            </Text>
            <nav className={styles.heroNav} aria-label="Atalhos do painel">
              <Link href="/blog/temas">
                <HiOutlineSquares2X2 aria-hidden="true" />
                Editorias
              </Link>
              <Link href="#artigos">
                <HiOutlineBookOpen aria-hidden="true" />
                Notas recentes
              </Link>
            </nav>
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
            <span>Editorias</span>
            <strong>{allTopicCards.length}</strong>
          </div>
          <div className={styles.statCard}>
            <span>Leitura</span>
            <strong>{totalReadingTime || "40+"} min</strong>
          </div>
        </div>
      </section>

      <section className={styles.categorySection} aria-labelledby="blog-categories-title">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Categorias principais</span>
          <Heading id="blog-categories-title" as="h2" className={styles.sectionTitle}>
            Quatro portas para entender a lógica do blog.
          </Heading>
        </div>
        <div className={styles.categoryGrid}>
          {entryCategoryCards.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                className={styles.categoryCard}
                data-card-type="category"
                href={`/blog/categorias/${category.slug}`}
                key={category.slug}
              >
                <span className={styles.categoryIcon} aria-hidden="true">
                  <Icon />
                </span>
                <strong>{category.label}</strong>
                <span className={styles.categoryDescription}>{category.description}</span>
                <span className={styles.categoryAction} aria-hidden="true">
                  <HiOutlineArrowRight />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className={styles.seriesSection} aria-labelledby="series-title">
        <div className={styles.sectionHeader}>
          <span className={styles.sectionLabel}>Séries de estudo</span>
          <Heading id="series-title" as="h2" className={styles.sectionTitle}>
            Caminhos recorrentes para estudar sem reorganizar tudo do zero.
          </Heading>
        </div>
        <div className={styles.seriesGrid}>
          {editorialSeries.map((series) => {
            const progressLabel = `${series.currentPosts} de ${series.totalPosts} posts`;

            return (
              <Link
                className={styles.seriesCard}
                data-card-type="series"
                href={series.href}
                key={series.title}
              >
                <strong>{series.title}</strong>
                <span>{series.text}</span>
                <span className={styles.seriesProgress}>
                  <span className={styles.seriesProgressHeader}>
                    <span>{progressLabel}</span>
                    <HiOutlineArrowRight aria-hidden="true" />
                  </span>
                  <span className={styles.seriesProgressBar} aria-label={progressLabel}>
                    {Array.from({ length: series.totalPosts }).map((_, index) => (
                      <span
                        aria-hidden="true"
                        className={index < series.currentPosts ? styles.seriesStepActive : undefined}
                        key={index}
                      />
                    ))}
                  </span>
                </span>
              </Link>
            );
          })}
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
