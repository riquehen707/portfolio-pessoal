// src/app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import { Metadata } from "next";
import React, { Suspense } from "react";

import {
  Meta,
  Schema,
  Column,
  Heading,
  HeadingNav,
  Icon,
  Row,
  Text,
  SmartLink,
  Avatar,
  Media,
  Line,
  Badge,
} from "@once-ui-system/core";

import { CustomMDX, ScrollToHash } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { ShareSection } from "@/components/blog/ShareSection";

import { baseURL, about, blog, person } from "@/resources";
import { getPosts } from "@/utils/utils";
import { formatDate } from "@/utils/formatDate";

import ReadingProgress from "@/components/mdx/ReadingProgress";
import MetaBar from "@/components/mdx/MetaBar";

// Revalidação incremental e renderização estática
export const revalidate = 60;
export const dynamic = "force-static";

// Helpers
function normalizeSlug(slugParam: string | string[] | undefined): string {
  if (!slugParam) return "";
  return Array.isArray(slugParam) ? slugParam.join("/") : slugParam;
}

// Gera URL absoluta (para SEO/Schema)
function toAbs(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;
  try {
    return new URL(pathOrUrl, baseURL).toString();
  } catch {
    return pathOrUrl;
  }
}

// Força caminho local (root-relative) para next/image (Avatar/Media)
function toLocal(src?: string): string | undefined {
  if (!src) return undefined;
  try {
    const u = new URL(src, baseURL);
    return u.pathname;
  } catch {
    return src;
  }
}

// helper simples de tempo de leitura (~220 wpm)
function readingTimeMinutes(text: string, wpm = 220): number {
  const words = text?.trim()?.split(/\s+/g).length || 0;
  return Math.max(1, Math.round(words / wpm));
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  return posts.map((p) => ({ slug: p.slug }));
}

// ====== SEO / OpenGraph por post ======
export async function generateMetadata({
  params,
}: {
  params: { slug: string | string[] };
}): Promise<Metadata> {
  const slugPath = normalizeSlug(params.slug);
  const posts = getPosts(["src", "app", "blog", "posts"]);
  const post = posts.find((p) => p.slug === slugPath);

  if (!post) return {};

  const title = post.metadata.title;
  const description = post.metadata.summary;
  const image =
    post.metadata.image || `/api/og/generate?title=${encodeURIComponent(title)}`;
  const urlPath = `${blog.path}/${post.slug}`;

  const keywords: string[] = Array.isArray(post.metadata?.categories)
    ? post.metadata.categories
    : [];

  return Meta.generate({
    title,
    description,
    baseURL,
    image: toAbs(image),
    path: urlPath,
    keywords,
  });
}

// ====== Página ======
export default async function BlogPost({
  params,
}: {
  params: { slug: string | string[] };
}) {
  const slugPath = normalizeSlug(params.slug);
  const post = getPosts(["src", "app", "blog", "posts"]).find(
    (p) => p.slug === slugPath
  );

  if (!post) {
    notFound();
  }

  const datePublished =
    post.metadata.publishedAt ?? post.metadata.date ?? undefined;
  const dateModified =
    post.metadata.updatedAt ??
    post.metadata.updated ??
    post.metadata.publishedAt ??
    post.metadata.date ??
    undefined;

  const pillar: string | undefined = post.metadata?.pillar;
  const categories: string[] = Array.isArray(post.metadata?.categories)
    ? post.metadata.categories
    : [];

  const authors =
    post.metadata.team && post.metadata.team.length > 0
      ? post.metadata.team.map((a: any) => {
          const img = a.avatar || person.avatar;
          return {
            name: a.name || person.name,
            url: toAbs(a.url || about.path)!,
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

  const ogImage =
    toAbs(
      post.metadata.image ||
        `/api/og/generate?title=${encodeURIComponent(post.metadata.title)}`
    ) || undefined;

  const canonicalPath = `${blog.path}/${post.slug}`;
  const readTimeMin = readingTimeMinutes(post.content);

  return (
    <>
      {/* ✅ Progress bar fixa no topo (observa o artigo com id="article-content") */}
      <ReadingProgress watchId="article-content" />

      <Row fillWidth>
        <Row maxWidth={12} m={{ hide: true }} />
        <Row fillWidth horizontal="center">
          <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
            {/* Schema para SEO */}
            <Schema
              as="blogPosting"
              baseURL={baseURL}
              path={canonicalPath}
              title={post.metadata.title}
              description={post.metadata.summary}
              datePublished={datePublished}
              dateModified={dateModified}
              image={ogImage}
              author={{
                name: authors[0].name,
                url: authors[0].url,
                image: authors[0].imageAbs,
              }}
              articleSection={pillar}
              keywords={categories?.join(", ")}
            />

            {/* Cabeçalho editorial (à esquerda) */}
            <Column maxWidth="s" gap="16">
              {/* breadcrumb discreto */}
              <SmartLink href="/blog" underline="hover">
                <Text variant="label-strong-m">← Blog</Text>
              </SmartLink>

              {/* título forte */}
              <Heading variant="display-strong-m">
                {post.metadata.title}
              </Heading>

              {/* autor */}
              <Row gap="12" vertical="center" wrap>
                {authors.slice(0, 3).map((a, i) => (
                  <Avatar key={i} size="s" src={a.imageLocal} />
                ))}
                <Text variant="label-default-m" onBackground="brand-weak">
                  {authors.map((a) => a.name).join(", ")}
                </Text>
              </Row>

              {/* datas + tempo de leitura */}
              {(datePublished || dateModified) && (
                <MetaBar
                  publishedAt={datePublished!}
                  updatedAt={dateModified}
                  readTimeMin={readTimeMin}
                />
              )}

              {/* tags (pilar e categorias) */}
              {(pillar || (categories && categories.length > 0)) && (
                <Row gap="8" wrap>
                  {pillar && (
                    <Badge
                      href={`/blog?pillar=${encodeURIComponent(pillar)}`}
                      background="brand-alpha-weak"
                      onBackground="brand-strong"
                      textVariant="label-default-s"
                      paddingX="12"
                      paddingY="6"
                      arrow={false}
                    >
                      {pillar}
                    </Badge>
                  )}
                  {categories?.map((cat) => (
                    <Badge
                      key={cat}
                      href={`/blog?tag=${encodeURIComponent(cat)}`}
                      background="neutral-alpha-weak"
                      onBackground="neutral-strong"
                      textVariant="label-default-s"
                      paddingX="12"
                      paddingY="6"
                      arrow={false}
                    >
                      {cat}
                    </Badge>
                  ))}
                </Row>
              )}
            </Column>

            {/* Capa */}
            {post.metadata.image && (
              <Media
                src={toLocal(post.metadata.image)}
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

            {/* Conteúdo */}
            <Column as="article" maxWidth="s" id="article-content">
              <CustomMDX source={post.content} />
            </Column>

            {/* Compartilhar */}
            <ShareSection title={post.metadata.title} url={`${baseURL}${canonicalPath}`} />

            {/* Posts recentes */}
            <Column fillWidth gap="32" horizontal="center" marginTop="40">
              <Line maxWidth="40" />
              <Heading as="h2" variant="heading-strong-xl" marginBottom="12" align="center">
                Publicações recentes
              </Heading>
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

        {/* TOC lateral (sticky) */}
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
            Nesta página
          </Row>
          <HeadingNav fitHeight />
        </Column>
      </Row>
    </>
  );
}
