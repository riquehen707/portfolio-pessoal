import { notFound } from "next/navigation";
import { Metadata } from "next";

import {
  Avatar,
  Column,
  Heading,
  Line,
  Media,
  Meta,
  Row,
  Schema,
  SmartLink,
  Text,
} from "@once-ui-system/core";

import { CustomMDX, ScrollToHash } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { baseURL, about, blog, person } from "@/resources";
import { buildOgImage } from "@/utils/og";
import { getPosts } from "@/utils/utils";

type PageProps = {
  params: Promise<{ slug: string | string[] }>;
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

function toLocal(src?: string): string | undefined {
  if (!src) return undefined;
  try {
    const u = new URL(src, baseURL);
    return u.pathname + u.search;
  } catch {
    return src;
  }
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

  return Meta.generate({
    title: post.metadata.title,
    description: post.metadata.summary ?? post.metadata.title,
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

  return (
    <Row fillWidth>
      <Row maxWidth={12} m={{ hide: true }} />
      <Row fillWidth horizontal="center">
        <Column as="section" maxWidth="m" horizontal="center" gap="l" paddingTop="24">
          <Schema
            as="blogPosting"
            baseURL={baseURL}
            path={`${blog.path}/${post.slug}`}
            title={post.metadata.title}
            description={post.metadata.summary ?? post.metadata.title}
            datePublished={post.metadata.publishedAt}
            dateModified={post.metadata.updatedAt ?? post.metadata.publishedAt}
            image={toAbs(coverImage)}
            author={{
              name: authors[0].name,
              url: authors[0].url,
              image: authors[0].imageAbs,
            }}
          />
          <Column maxWidth="s" gap="16" horizontal="center" align="center">
            <SmartLink href="/blog">
              <Text variant="label-strong-m">Blog</Text>
            </SmartLink>
            {post.metadata.publishedAt && (
              <Text variant="body-default-xs" onBackground="neutral-weak" marginBottom="12">
                {new Date(post.metadata.publishedAt).toLocaleDateString("pt-BR")}
              </Text>
            )}
            <Heading variant="display-strong-m">{post.metadata.title}</Heading>
          </Column>
          <Row marginBottom="32" horizontal="center">
            <Row gap="16" vertical="center">
              <Avatar size="s" src={authors[0].imageLocal} />
              <Text variant="label-default-m" onBackground="brand-weak">
                {authors[0].name}
              </Text>
            </Row>
          </Row>
          {coverImage && (
            <Media
              src={toLocal(coverImage) ?? coverImage}
              alt={post.metadata.title}
              aspectRatio="16/9"
              priority
              sizes="(min-width: 768px) 100vw, 768px"
              border="neutral-alpha-weak"
              radius="l"
              marginTop="12"
              marginBottom="8"
            />
          )}
          <Column as="article" maxWidth="s">
            <CustomMDX source={post.content} glossary={post.metadata.glossary ?? {}} />
          </Column>
          <Column fillWidth gap="40" horizontal="center" marginTop="40">
            <Line maxWidth="40" />
            <Heading as="h2" variant="heading-strong-xl" marginBottom="24">
              Artigos recentes
            </Heading>
            <Posts exclude={[post.slug]} range={[1, 2]} columns="2" thumbnail direction="column" />
          </Column>
          <ScrollToHash />
        </Column>
      </Row>
    </Row>
  );
}
