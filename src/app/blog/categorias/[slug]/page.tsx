import { Column, Heading, Meta, Schema, Text } from "@once-ui-system/core";
import { notFound } from "next/navigation";
import { HiOutlineSquares2X2 } from "react-icons/hi2";

import {
  getBlogEntryCategory,
  getBlogEntryCategoryIndex,
  getBlogPostsByEntryCategory,
  getBlogPostFormat,
  getBlogPrimaryCategory,
} from "@/app/blog/postData";
import { EditorialFeed, type EditorialFeedPost } from "@/components/blog/EditorialFeed";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";

import styles from "../../temas/topics.module.scss";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getCategoryPath(slug: string) {
  return `/blog/categorias/${slug}`;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  return getBlogEntryCategoryIndex().map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = getBlogEntryCategory(slug);

  if (!category) {
    return {};
  }

  const image = buildOgImage(category.label, "categoria editorial do blog");
  const generatedMeta = Meta.generate({
    title: `${category.label} | Blog`,
    description: category.longDescription,
    baseURL,
    image,
    path: getCategoryPath(slug),
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(image, `${category.label} | Blog`),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: [image],
    },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getBlogEntryCategory(slug);
  const posts = getBlogPostsByEntryCategory(slug);

  if (!category || !posts.length) {
    notFound();
  }

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
        title={`${category.label} | Blog`}
        description={category.longDescription}
        path={getCategoryPath(slug)}
        author={{
          name: person.name,
          url: `${baseURL}${getCategoryPath(slug)}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
          { name: "Categorias", url: `${baseURL}${blog.path}` },
          { name: category.label, url: `${baseURL}${getCategoryPath(slug)}` },
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.heroIcon} aria-hidden="true">
          <HiOutlineSquares2X2 />
        </div>
        <div className={styles.heroCopy}>
          <div className={styles.heroMeta}>
            <span>Categoria editorial</span>
            <span>{posts.length} leituras</span>
          </div>
          <Heading as="h1" variant="display-strong-l">
            {category.label}
          </Heading>
          <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m">
            {category.longDescription}
          </Text>
        </div>
      </section>

      <section className={styles.gridSection} aria-label={`Artigos em ${category.label}`}>
        <EditorialFeed posts={feedPosts} initialCount={9} step={9} />
      </section>
    </Column>
  );
}
