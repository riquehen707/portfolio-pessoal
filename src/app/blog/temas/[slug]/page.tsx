import { notFound } from "next/navigation";
import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";

import {
  getBlogCollectionDescription,
  getBlogCollectionIndex,
  getBlogCollectionLabel,
  getBlogPostsByCollection,
  getBlogPostFormat,
  getBlogPrimaryCategory,
} from "@/app/blog/postData";
import { EditorialFeed, type EditorialFeedPost } from "@/components/blog/EditorialFeed";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";

import styles from "../topics.module.scss";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getTopicPath(slug: string) {
  return `/blog/temas/${slug}`;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getBlogCollectionIndex().map((topic) => ({
    slug: topic.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const posts = getBlogPostsByCollection(slug);

  if (!posts.length) {
    return {};
  }

  const label = getBlogCollectionLabel(slug) ?? slug;
  const description =
    getBlogCollectionDescription(slug) ??
    `Artigos sobre ${label.toLowerCase()} no blog.`;

  return Meta.generate({
    title: `${label} | Blog`,
    description,
    baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(label)}&subtitle=${encodeURIComponent("indice editorial do blog")}`,
    path: getTopicPath(slug),
  });
}

export default async function BlogTopicPage({ params }: PageProps) {
  const { slug } = await params;
  const posts = getBlogPostsByCollection(slug);

  if (!posts.length) {
    notFound();
  }

  const label = getBlogCollectionLabel(slug) ?? slug;
  const description =
    getBlogCollectionDescription(slug) ??
    `Artigos sobre ${label.toLowerCase()} no blog.`;

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
    <Column className={styles.page} fillWidth paddingTop="24" gap="32">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={`${label} | Blog`}
        description={description}
        path={getTopicPath(slug)}
        image={`/api/og/generate?title=${encodeURIComponent(label)}&subtitle=${encodeURIComponent("indice editorial do blog")}`}
        author={{
          name: person.name,
          url: `${baseURL}${getTopicPath(slug)}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Inicio", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
          { name: "Temas", url: `${baseURL}/blog/temas` },
          { name: label, url: `${baseURL}${getTopicPath(slug)}` },
        ]}
      />

      <section className={styles.hero}>
        <Text className={styles.kicker} variant="label-default-s" onBackground="brand-strong">
          Tema
        </Text>
        <Heading as="h1" variant="display-strong-l">
          {label}
        </Heading>
        <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
          {description}
        </Text>
        <Text className={styles.topicMeta} onBackground="brand-strong" variant="label-default-s">
          {posts.length} {posts.length === 1 ? "artigo" : "artigos"}
        </Text>
      </section>

      <section className={styles.feedSection}>
        <div className={styles.sectionHeader}>
          <Text className={styles.sectionLabel} variant="label-default-s" onBackground="brand-strong">
            Artigos
          </Text>
          <Text className={styles.sectionLead} onBackground="neutral-weak" variant="body-default-s">
            Uma leitura agrupada para fortalecer navegacao, contexto e descoberta.
          </Text>
        </div>

        <EditorialFeed posts={feedPosts} initialCount={6} step={6} />
      </section>
    </Column>
  );
}
