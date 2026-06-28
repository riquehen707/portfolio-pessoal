import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import Link from "next/link";

import {
  getAllBlogPosts,
  getBlogPostFormat,
  getBlogPrimaryCategory,
  getRecentBlogPosts,
} from "@/app/blog/postData";
import { EditorialFeed, type EditorialFeedPost } from "@/components/blog/EditorialFeed";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "./blog.module.scss";

const libraryPageTitle = "Artigos";
const blogHomeDescription = "Todos os artigos do blog.";

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
  const feedPosts: EditorialFeedPost[] = posts.map((post) => ({
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

      <section className={styles.heroSection}>
        <div className={styles.hero}>
          <Text className={styles.kicker} variant="label-default-s" onBackground="neutral-weak">
            Blog
          </Text>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-l">
            Artigos.
          </Heading>
          <nav className={styles.heroNav} aria-label="Atalhos">
            <Link href="/blog/temas">Temas</Link>
            <Link href="/rss.xml">RSS</Link>
          </nav>
        </div>
      </section>

      <section className={styles.feedSection}>
        <EditorialFeed posts={feedPosts} initialCount={12} step={12} />
      </section>
    </Column>
  );
}
