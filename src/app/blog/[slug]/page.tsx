import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HiOutlineBookOpen, HiOutlineClock, HiOutlineTag } from "react-icons/hi2";

import { Column, Heading, Meta, Schema, SmartLink, Text } from "@once-ui-system/core";

import { getBlogCollectionLabel, getBlogCollectionSlug } from "@/app/blog/postData";
import { CustomMDX, ScrollToHash } from "@/components";
import { ArticleTools } from "@/components/blog/ArticleTools";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";
import { type BlogFile, getPosts } from "@/utils/utils";

import styles from "./page.module.scss";

type PageProps = {
  params: Promise<{ slug: string | string[] }>;
};

type ContinuationCard = {
  title: string;
  href: string;
  summary?: string;
  image?: string;
  imageAlt?: string;
};

function normalizeSlug(slugParam: string | string[] | undefined): string {
  if (!slugParam) return "";
  return Array.isArray(slugParam) ? slugParam.join("/") : slugParam;
}

function toAbs(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  try {
    return new URL(pathOrUrl, baseURL).toString();
  } catch {
    return pathOrUrl;
  }
}

function toSet(values?: string[]) {
  return new Set((values ?? []).filter(Boolean));
}

function getDateScore(post: BlogFile) {
  const timestamp = new Date(post.metadata.updatedAt ?? post.metadata.publishedAt ?? 0).getTime();
  return Number.isFinite(timestamp) ? timestamp / 1_000_000_000_000 : 0;
}

function getRelatedScore(current: BlogFile, candidate: BlogFile) {
  const currentCategories = toSet(current.metadata.categories);
  const currentTags = toSet(current.metadata.tags);
  const candidateCategories = candidate.metadata.categories ?? [];
  const candidateTags = candidate.metadata.tags ?? [];

  const collectionScore = current.collection && candidate.collection === current.collection ? 16 : 0;
  const categoryScore =
    candidateCategories.filter((category) => currentCategories.has(category)).length * 5;
  const tagScore = candidateTags.filter((tag) => currentTags.has(tag)).length * 3;

  return collectionScore + categoryScore + tagScore + getDateScore(candidate);
}

function getReadingTrail(current: BlogFile, posts: BlogFile[]) {
  return posts
    .filter((candidate) => candidate.slug !== current.slug)
    .sort((left, right) => getRelatedScore(current, right) - getRelatedScore(current, left))
    .slice(0, 3);
}

function postToContinuation(post: BlogFile | undefined): ContinuationCard | null {
  if (!post) return null;

  return {
    title: post.metadata.title,
    href: `${blog.path}/${post.slug}`,
    summary: post.metadata.summary,
    image: post.metadata.image,
    imageAlt: post.metadata.imageAlt,
  };
}

function uniqueContinuations(cards: Array<ContinuationCard | null>) {
  const seen = new Set<string>();

  return cards.filter((card): card is ContinuationCard => {
    if (!card || seen.has(card.href)) return false;
    seen.add(card.href);
    return true;
  });
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = normalizeSlug(slug);

  const posts = getPosts(["src", "app", "blog", "posts"]);
  const post = posts.find((item) => item.slug === slugPath);

  if (!post) return {};

  const image =
    post.metadata.image ||
    buildOgImage(
      post.metadata.title,
      post.metadata.tag ?? post.metadata.tags?.[0] ?? post.metadata.categories?.[0] ?? "Blog",
    );
  const absoluteImage = toAbs(image);
  const generatedMeta = Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary ?? post.metadata.title,
    baseURL,
    image: absoluteImage,
    path: `${blog.path}/${post.slug}`,
  });

  return {
    ...generatedMeta,
    openGraph: {
      ...generatedMeta.openGraph,
      images: buildDiscoverImageMetadata(absoluteImage, post.metadata.imageAlt ?? post.metadata.title),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: absoluteImage ? [absoluteImage] : undefined,
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = normalizeSlug(slug);

  const posts = getPosts(["src", "app", "blog", "posts"]);
  const post = posts.find((item) => item.slug === slugPath);

  if (!post) notFound();

  const collectionSlug = getBlogCollectionSlug(post);
  const collectionLabel = getBlogCollectionLabel(collectionSlug);
  const publishedDate = post.metadata.publishedAt
    ? formatDate(post.metadata.publishedAt, false)
    : undefined;
  const articlePath = `${blog.path}/${post.slug}`;
  const readingTrail = getReadingTrail(post, posts);
  const continuationCards = uniqueContinuations(readingTrail.map(postToContinuation));
  const visibleTags = (post.metadata.tags ?? post.metadata.categories ?? []).slice(0, 3);

  return (
    <Column className={styles.page} paddingTop="24" gap="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={articlePath}
        title={post.metadata.title}
        description={post.metadata.summary ?? post.metadata.title}
        datePublished={post.metadata.publishedAt}
        dateModified={
          post.metadata.reviewedAt ?? post.metadata.updatedAt ?? post.metadata.publishedAt
        }
        image={toAbs(post.metadata.image)}
        author={{
          name: person.name,
          url: `${baseURL}${blog.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
          { name: post.metadata.title, url: `${baseURL}${blog.path}/${post.slug}` },
        ]}
      />

      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroKicker}>
            <span className={styles.brandSquare} aria-hidden="true" />
            <SmartLink href="/blog">Painel editorial</SmartLink>
          </div>
          <div className={styles.metaLine}>
            {collectionSlug && collectionLabel ? (
              <Link href={`/blog/temas/${collectionSlug}`}>
                <HiOutlineTag aria-hidden="true" />
                {collectionLabel}
              </Link>
            ) : null}
            {publishedDate ? <span>{publishedDate}</span> : null}
            {post.metadata.readingTime ? (
              <span>
                <HiOutlineClock aria-hidden="true" />
                {post.metadata.readingTime} min
              </span>
            ) : null}
          </div>
          <Heading as="h1" className={styles.heroTitle} variant="display-strong-l" wrap="balance">
            {post.metadata.title}
          </Heading>
          {post.metadata.summary ? (
            <Text
              className={styles.heroLead}
              onBackground="neutral-weak"
              variant="heading-default-m"
              wrap="balance"
            >
              {post.metadata.summary}
            </Text>
          ) : null}
          {visibleTags.length > 0 ? (
            <div className={styles.tagRow} aria-label="Marcadores do artigo">
              <span className={styles.tagLead}>
                <HiOutlineBookOpen aria-hidden="true" />
                Nota de estudo
              </span>
              {visibleTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.heroMedia}>
          {post.metadata.image ? (
            <Image
              src={post.metadata.image}
              alt={post.metadata.imageAlt ?? post.metadata.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 960px) 100vw, 430px"
            />
          ) : (
            <div className={styles.heroMediaFallback} aria-hidden="true" />
          )}
        </div>
      </header>

      {post.metadata.reviewedAt ? (
        <p className={styles.reviewNotice}>
          Revisado em {formatDate(post.metadata.reviewedAt, false)}.
        </p>
      ) : null}

      <div className={styles.articleShell}>
        <Column className={styles.article} id="article-content" as="article">
          <CustomMDX source={post.content} glossary={post.metadata.glossary ?? {}} />
        </Column>
        <ArticleTools
          title={post.metadata.title}
          readingTime={post.metadata.readingTime}
          url={articlePath}
        />
      </div>

      {continuationCards.length > 0 ? (
        <section className={styles.relatedPanel} aria-labelledby="reading-trail-title">
          <div className={styles.relatedHeader}>
            <span>Próximas leituras</span>
            <Heading id="reading-trail-title" as="h2" className={styles.relatedTitle}>
              Continue por assuntos próximos.
            </Heading>
          </div>
          <div className={styles.secondaryReadings}>
            {continuationCards.map((item) => (
              <Link className={styles.secondaryReading} href={item.href} key={item.href}>
                <span className={styles.secondaryMedia}>
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.imageAlt ?? item.title}
                      fill
                      unoptimized
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                  ) : null}
                </span>
                <span className={styles.secondaryContent}>
                  <strong>{item.title}</strong>
                  {item.summary ? <span>{item.summary}</span> : null}
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <ScrollToHash />
    </Column>
  );
}
