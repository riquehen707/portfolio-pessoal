// src/app/diario/[slug]/page.tsx

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
  Grid,
  Card,
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

import { baseURL, about, daily, person, blog, servicesPage } from "@/resources";
import { getPosts } from "@/utils/utils";

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
    return u.pathname;
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
  const posts = getPosts(["src", "app", "diario", "posts"]);
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const slugPath = normalizeSlug(slug);
  const posts = getPosts(["src", "app", "diario", "posts"]);
  const post = posts.find((p) => p.slug === slugPath);

  if (!post) return {};

  const title = post.metadata.title;
  const description = post.metadata.summary ?? post.metadata.title;
  const image =
    post.metadata.image || `/api/og/generate?title=${encodeURIComponent(title)}`;
  const urlPath = `${daily.path}/${post.slug}`;

  return Meta.generate({
    title,
    description,
    baseURL,
    image: toAbs(image),
    path: urlPath,
  });
}

export default async function DiarioPost({
  params,
}: PageProps) {
  const { slug } = await params;
  const slugPath = normalizeSlug(slug);
  const posts = getPosts(["src", "app", "diario", "posts"]);
  const post = posts.find((p) => p.slug === slugPath);

  if (!post) {
    notFound();
  }

  const datePublished = post.metadata.publishedAt ?? undefined;
  const dateModified = post.metadata.updatedAt ?? post.metadata.publishedAt ?? undefined;

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

  const canonicalPath = `${daily.path}/${post.slug}`;
  const readTimeMin = readingTimeMinutes(post.content);

  const tags = post.metadata.tags ?? (post.metadata.tag ? [post.metadata.tag] : []);
  const keywords = post.metadata.keywords ?? [];
  const badgeTopics = Array.from(new Set([...categories, ...tags]));
  const diary = post.metadata.diary;

  const quickFacts = [
    { label: "Foco do dia", value: diary?.focus },
    { label: "Humor", value: diary?.mood },
    { label: "Energia", value: diary?.energy },
  ].filter((item) => item.value);

  const detailBlocks = [
    { label: "Vitórias", items: diary?.wins },
    { label: "Desafios", items: diary?.blockers },
    { label: "Aprendizados", items: diary?.learnings },
    { label: "Métricas", items: diary?.metrics },
    { label: "Próximos passos", items: diary?.next },
  ].filter((block) => block.items && block.items.length);

  const postsData = posts.map((p) => ({
    slug: p.slug,
    metadata: {
      title: p.metadata.title,
      publishedAt: p.metadata.publishedAt || "",
      tag: p.metadata.tag,
      image: p.metadata.image,
    },
  }));

  return (
    <>
      <ReadingProgress watchId="article-content" />

      <Row fillWidth>
        <Row maxWidth={12} m={{ hide: true }} />
        <Row fillWidth horizontal="center">
          <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
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

            <Column maxWidth="s" gap="16">
              <SmartLink href={daily.path}>
                <Text variant="label-strong-m">← Diário</Text>
              </SmartLink>

              <Heading variant="display-strong-m">{post.metadata.title}</Heading>

              <Row gap="8" wrap>
                <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                  Diário aberto
                </Tag>
                <Tag size="s" background="neutral-alpha-weak">
                  {readTimeMin} min de leitura
                </Tag>
              </Row>

              <Row gap="12" vertical="center" wrap>
                {authors.slice(0, 3).map((a, i) => (
                  <Avatar key={i} size="s" src={a.imageLocal} />
                ))}
                <Text variant="label-default-m" onBackground="brand-weak">
                  {authors.map((a) => a.name).join(", ")}
                </Text>
              </Row>

              {(datePublished || dateModified) && (
                <MetaBar
                  publishedAt={datePublished!}
                  updatedAt={dateModified}
                  readTimeMin={readTimeMin}
                />
              )}

              {badgeTopics.length > 0 && (
                <Row gap="8" wrap>
                  {badgeTopics.map((topic) => (
                    <Badge
                      key={topic}
                      href={`/diario/tag/${encodeURIComponent(topic)}`}
                      background="neutral-alpha-weak"
                      onBackground="neutral-strong"
                      textVariant="label-default-s"
                      paddingX="12"
                      paddingY="8"
                      arrow={false}
                    >
                      {topic}
                    </Badge>
                  ))}
                </Row>
              )}
            </Column>

            {(post.metadata.summary || quickFacts.length > 0 || detailBlocks.length > 0) && (
              <Column
                fillWidth
                gap="12"
                paddingX="24"
                paddingY="20"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
              >
                <Heading as="h2" variant="heading-strong-s">
                  Registro do dia
                </Heading>
                {post.metadata.summary && (
                  <Text onBackground="neutral-weak">{post.metadata.summary}</Text>
                )}

                {quickFacts.length > 0 && (
                  <Grid columns="3" s={{ columns: 1 }} gap="12">
                    {quickFacts.map((fact) => (
                      <Card
                        key={fact.label}
                        direction="column"
                        gap="8"
                        paddingX="16"
                        paddingY="16"
                        radius="m"
                        background="page"
                        style={{ border: "1px solid var(--neutral-alpha-weak)" }}
                      >
                        <Text variant="label-default-s" onBackground="neutral-weak">
                          {fact.label}
                        </Text>
                        <Text variant="heading-default-m">{fact.value}</Text>
                      </Card>
                    ))}
                  </Grid>
                )}

                {detailBlocks.length > 0 && (
                  <Grid columns="2" s={{ columns: 1 }} gap="12">
                    {detailBlocks.map((block) => (
                      <Column
                        key={block.label}
                        padding="16"
                        radius="m"
                        background="page"
                        style={{ border: "1px solid var(--neutral-alpha-weak)" }}
                        gap="8"
                      >
                        <Text variant="label-default-s">{block.label}</Text>
                        <Column as="ul" gap="8">
                          {block.items?.map((item, index) => (
                            <Text as="li" variant="body-default-s" key={`${block.label}-${index}`}>
                              {item}
                            </Text>
                          ))}
                        </Column>
                      </Column>
                    ))}
                  </Grid>
                )}

                <Row gap="12" wrap>
                  <Button href={blog.path} variant="secondary" size="s" arrowIcon>
                    Ler artigos longos
                  </Button>
                  <Button href={servicesPage.path} variant="tertiary" size="s" arrowIcon>
                    Ver serviços
                  </Button>
                </Row>
              </Column>
            )}

            {post.metadata.image && (
              <Media
                src={toLocal(post.metadata.image) ?? post.metadata.image}
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
              pillar={undefined}
              categories={categories}
              tags={tags}
              keywords={keywords}
              limit={4}
            />

            <ShareSection title={post.metadata.title} url={`${baseURL}${canonicalPath}`} />

            <Column fillWidth gap="32" horizontal="center" marginTop="40">
              <Line maxWidth="40" />

              <Heading as="div" variant="heading-strong-xl" marginBottom="12" align="center">
                Entradas recentes
              </Heading>

              <Suspense fallback={<div style={{ height: 220 }} />}>
                <Posts exclude={[post.slug]} range={[1, 2]} columns="2" thumbnail direction="column" data={postsData} />
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
          <Row gap="12" paddingLeft="2" vertical="center" onBackground="neutral-medium" textVariant="label-default-s">
            <Icon name="document" size="xs" />
            Nesta página
          </Row>

          <ArticleToc containerId="article-content" />
        </Column>
      </Row>
    </>
  );
}
