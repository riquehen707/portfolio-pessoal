import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Link from "next/link";

import {
  getAllBlogPosts,
  getBlogCollectionIndex,
  getBlogPostFormat,
  getBlogPrimaryCategory,
  getRecentBlogPosts,
} from "@/app/blog/postData";
import { EditorialFeed, type EditorialFeedPost } from "@/components/blog/EditorialFeed";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, home, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./blog/blog.module.scss";

const homePageTitle = "Blog";
const homePageDescription = "Artigos simples sobre marketing, design e presença digital.";

export async function generateMetadata() {
  const image = buildOgImage("Blog", "artigos simples");
  const generatedMeta = Meta.generate({
    title: homePageTitle,
    description: homePageDescription,
    baseURL,
    image,
    path: home.path,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, homePageTitle),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default function Home() {
  const posts = getAllBlogPosts();
  const recentPosts = getRecentBlogPosts(10, posts);
  const topics = getBlogCollectionIndex(posts).slice(0, 6);

  const feedPosts: EditorialFeedPost[] = recentPosts.map((post) => ({
    slug: post.slug,
    title: post.metadata.title,
    summary: post.metadata.summary,
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
        title={homePageTitle}
        description={homePageDescription}
        path={home.path}
        author={{
          name: person.name,
          url: baseURL,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd items={[{ name: "Início", url: baseURL }]} />

      <section className={styles.heroSection}>
        <div className={styles.hero}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="neutral-weak">
            Henrique Reis
          </Text>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-l">
            Blog.
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            Textos curtos e organizados para pensar melhor antes de mexer em conteúdo, página ou
            tráfego.
          </Text>
          <nav className={styles.heroNav} aria-label="Atalhos">
            <a href="#artigos">Artigos</a>
            <a href="#temas">Temas</a>
            <Link href="/rss.xml">RSS</Link>
          </nav>
        </div>
      </section>

      <section className={styles.feedSection} id="artigos">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Recentes
          </Text>
        </div>
        <EditorialFeed posts={feedPosts} initialCount={6} step={6} />
      </section>

      <section className={styles.startSection} id="temas">
        <div className={styles.sectionHeader}>
          <Text
            className={styles.sectionLabel}
            variant="label-default-s"
            onBackground="neutral-weak"
          >
            Temas
          </Text>
        </div>
        <div className={styles.startGrid}>
          {topics.map((topic) => (
            <Link
              className={styles.startCard}
              href={`${blog.path}/temas/${topic.slug}`}
              key={topic.slug}
            >
              <div className={styles.startCopy}>
                <Heading as="h2" className={styles.startTitle} variant="heading-strong-m">
                  {topic.label}
                </Heading>
                <Text
                  className={styles.startSummary}
                  onBackground="neutral-weak"
                  variant="body-default-s"
                >
                  {topic.count} artigo{topic.count === 1 ? "" : "s"}
                </Text>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Column>
  );
}
