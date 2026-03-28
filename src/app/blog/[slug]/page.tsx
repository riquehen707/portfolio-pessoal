import { notFound } from "next/navigation";
import { Metadata } from "next";
import React, { Suspense } from "react";

import {
  Meta,
  Schema,
  Column,
  Heading,
  Icon,
  Row,
  Text,
  Button,
  Tag,
  SmartLink,
  Avatar,
  Media,
  Line,
  Badge,
} from "@once-ui-system/core";

import { CustomMDX, ScrollToHash } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";
import ArticleToc from "@/components/blog/ArticleToc";
import RelatedPosts from "@/components/blog/RelatedPosts";

import { baseURL, about, blog, person, servicesPage, work } from "@/resources";
import { getPosts } from "@/utils/utils";
import { buildOgImage } from "@/utils/og";
import styles from "../../section.module.scss";

import ReadingProgress from "@/components/mdx/ReadingProgress";
import MetaBar from "@/components/mdx/MetaBar";

export const revalidate = false;
export const dynamic = "force-static";

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

function toLocal(src?: string): string | undefined {
  if (!src) return undefined;
  try {
    const u = new URL(src, baseURL);
    return u.pathname + u.search;
  } catch {
    return src;
  }
}

function readingTimeMinutes(text: string, wpm = 220): number {
  const words = text?.trim()?.split(/\s+/g).length || 0;
  return Math.max(1, Math.round(words / wpm));
}

type PageProps = {
  params: Promise<{ slug: string | string[] }>;
};

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = normalizeSlug(slug);
  const posts = getPosts(["src", "app", "blog", "posts"]);
  const post = posts.find((item) => item.slug === slugPath);

  if (!post) return {};

  const title = post.metadata.title;
  const description = post.metadata.summary ?? post.metadata.title;
  const image =
    post.metadata.image ||
    buildOgImage(
      title,
      post.metadata.tag ?? post.metadata.tags?.[0] ?? post.metadata.categories?.[0] ?? "Blog",
    );

  return Meta.generate({
    title,
    description,
    baseURL,
    image: toAbs(image),
    path: `${blog.path}/${post.slug}`,
  });
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = normalizeSlug(slug);
  const post = getPosts(["src", "app", "blog", "posts"]).find((item) => item.slug === slugPath);

  if (!post) notFound();

  const datePublished = post.metadata.publishedAt ?? (post.metadata as { date?: string }).date;
  const dateModified =
    post.metadata.updatedAt ??
    (post.metadata as { updated?: string }).updated ??
    post.metadata.publishedAt ??
    (post.metadata as { date?: string }).date;

  const pillar = post.metadata.pillar;
  const categories = Array.isArray(post.metadata.categories) ? post.metadata.categories : [];
  const tags = post.metadata.tags ?? (post.metadata.tag ? [post.metadata.tag] : []);
  const keywords = post.metadata.keywords ?? [];
  const summary = post.metadata.summary;
  const highlightTags = tags.slice(0, 6);

  const authors =
    post.metadata.team && post.metadata.team.length > 0
      ? post.metadata.team.map((author) => {
          const img = author.avatar || person.avatar;
          const authorUrl = (author as { url?: string }).url;
          return {
            name: author.name || person.name,
            url: toAbs(authorUrl || about.path)!,
            imageAbs: toAbs(img)!,
            imageLocal: toLocal(img)!,
          };
        })
      : [
          {
            name: person.name,
            url: toAbs(about.path)!,
            imageAbs: toAbs(person.avatar)!,
            imageLocal: toLocal(person.avatar)!,
          },
        ];

  const coverImage =
    post.metadata.image ||
    buildOgImage(
      post.metadata.title,
      post.metadata.tag ?? post.metadata.tags?.[0] ?? post.metadata.categories?.[0] ?? "Blog",
    );
  const ogImage = toAbs(coverImage) || undefined;
  const canonicalPath = `${blog.path}/${post.slug}`;
  const readTimeMin = readingTimeMinutes(post.content);

  return (
    <>
      <ReadingProgress watchId="article-content" />

      <Row fillWidth>
        <Row maxWidth={12} m={{ hide: true }} />
        <Row fillWidth horizontal="center">
          <Column
            as="section"
            className={styles.page}
            maxWidth="m"
            horizontal="center"
            gap="l"
            paddingTop="24"
          >
            <Schema
              as="blogPosting"
              baseURL={baseURL}
              path={canonicalPath}
              title={post.metadata.title}
              description={post.metadata.summary ?? post.metadata.title}
              datePublished={datePublished}
              dateModified={dateModified}
              image={ogImage}
              author={{
                name: authors[0].name,
                url: authors[0].url,
                image: authors[0].imageAbs,
              }}
            />

            <Column className={styles.heroGlow} maxWidth="s" gap="16">
              <SmartLink href="/blog">
                <Text variant="label-strong-m">← Blog</Text>
              </SmartLink>

              <Heading variant="display-strong-m">{post.metadata.title}</Heading>
              <div className={styles.accentLine} />

              <Row gap="8" wrap>
                <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                  Artigo longo
                </Tag>
                <Tag size="s" background="neutral-alpha-weak">
                  {readTimeMin} min de leitura
                </Tag>
              </Row>

              <Row gap="12" vertical="center" wrap>
                {authors.slice(0, 3).map((author, index) => (
                  <Avatar key={index} size="s" src={author.imageLocal} />
                ))}
                <Text variant="label-default-m" onBackground="brand-weak">
                  {authors.map((author) => author.name).join(", ")}
                </Text>
              </Row>

              {(datePublished || dateModified) && (
                <MetaBar
                  publishedAt={datePublished!}
                  updatedAt={dateModified}
                  readTimeMin={readTimeMin}
                />
              )}

              {(pillar || categories.length > 0) && (
                <Row gap="8" wrap>
                  {pillar && (
                    <Badge
                      href={`/blog?pillar=${encodeURIComponent(pillar)}`}
                      background="brand-alpha-weak"
                      onBackground="brand-strong"
                      textVariant="label-default-s"
                      paddingX="12"
                      paddingY="8"
                      arrow={false}
                    >
                      {pillar}
                    </Badge>
                  )}
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      href={`/blog?tag=${encodeURIComponent(category)}`}
                      background="neutral-alpha-weak"
                      onBackground="neutral-strong"
                      textVariant="label-default-s"
                      paddingX="12"
                      paddingY="8"
                      arrow={false}
                    >
                      {category}
                    </Badge>
                  ))}
                </Row>
              )}
            </Column>

            {summary && (
              <Column
                className={styles.sectionPanel}
                fillWidth
                gap="12"
                paddingX="24"
                paddingY="20"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
              >
                <Heading as="h2" variant="heading-strong-s">
                  Resumo do artigo
                </Heading>
                <Text onBackground="neutral-weak">{summary}</Text>
                {highlightTags.length > 0 && (
                  <Row gap="8" wrap>
                    {highlightTags.map((tag) => (
                      <Tag key={tag} size="s" background="neutral-alpha-weak">
                        {tag}
                      </Tag>
                    ))}
                  </Row>
                )}
                <Row gap="12" wrap>
                  <Button href={work.path} variant="secondary" size="s" arrowIcon>
                    Ver projetos
                  </Button>
                  <Button href={servicesPage.path} variant="tertiary" size="s" arrowIcon>
                    Conhecer servicos
                  </Button>
                </Row>
              </Column>
            )}

            {coverImage && (
              <Media
                src={toLocal(coverImage) ?? coverImage}
                alt={post.metadata.title}
                aspectRatio="16/9"
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                border="neutral-alpha-weak"
                radius="l"
                marginTop="8"
                marginBottom="8"
              />
            )}

            <Column as="article" maxWidth="s" id="article-content">
              <CustomMDX source={post.content} glossary={post.metadata.glossary ?? {}} />
            </Column>

            <RelatedPosts
              currentSlug={post.slug}
              pillar={pillar}
              categories={categories}
              tags={tags}
              keywords={keywords}
              limit={4}
            />

            <ShareSection title={post.metadata.title} url={`${baseURL}${canonicalPath}`} />

            <Column fillWidth gap="32" horizontal="center" marginTop="40">
              <Line maxWidth="40" />
              <Heading as="div" variant="heading-strong-xl" marginBottom="12" align="center">
                Publicacoes recentes
              </Heading>
              <div className={styles.accentLine} />

              <Suspense fallback={<div style={{ height: 220 }} />}>
                <Posts
                  exclude={[post.slug]}
                  range={[1, 2]}
                  columns="2"
                  thumbnail
                  direction="column"
                />
              </Suspense>
            </Column>

            <ScrollToHash />
          </Column>
        </Row>

        <Column
          maxWidth={12}
          paddingLeft="40"
          fitHeight
          position="sticky"
          top="80"
          gap="16"
          m={{ hide: true }}
        >
          <Row
            gap="12"
            paddingLeft="2"
            vertical="center"
            onBackground="neutral-medium"
            textVariant="label-default-s"
          >
            <Icon name="document" size="xs" />
            Nesta pagina
          </Row>

          <ArticleToc containerId="article-content" />
        </Column>
      </Row>
    </>
  );
}
