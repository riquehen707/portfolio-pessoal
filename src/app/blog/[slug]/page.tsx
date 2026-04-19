import { notFound } from "next/navigation";
import { Metadata } from "next";

import {
  Avatar,
  Column,
  Grid,
  Heading,
  Media,
  Meta,
  Row,
  Schema,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

import { CustomMDX, ScrollToHash } from "@/components";
import { Posts } from "@/components/blog/Posts";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, about, blog, person } from "@/resources";
import { buildOgImage } from "@/utils/og";
import { getPosts } from "@/utils/utils";

import styles from "./page.module.scss";

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

  return {
    ...Meta.generate({
      title: post.metadata.title,
      description: post.metadata.summary ?? post.metadata.title,
      baseURL,
      image: toAbs(image),
      path: `${blog.path}/${post.slug}`,
    }),
    keywords: [...(post.metadata.categories ?? []), ...(post.metadata.tags ?? []), person.name].filter(
      (value): value is string => Boolean(value),
    ),
  };
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

  const metaImage =
    post.metadata.image ||
    buildOgImage(
      post.metadata.title,
      post.metadata.tag ?? post.metadata.tags?.[0] ?? post.metadata.categories?.[0] ?? "Blog",
    );
  const coverImage = post.metadata.image?.trim() || post.metadata.images?.[0];
  const categories = post.metadata.categories ?? [];
  const tags = post.metadata.tags ?? (post.metadata.tag ? [post.metadata.tag] : []);

  return (
    <Column className={styles.page} maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={`${blog.path}/${post.slug}`}
        title={post.metadata.title}
        description={post.metadata.summary ?? post.metadata.title}
        datePublished={post.metadata.publishedAt}
        dateModified={post.metadata.updatedAt ?? post.metadata.publishedAt}
        image={toAbs(metaImage)}
        author={{
          name: authors[0].name,
          url: authors[0].url,
          image: authors[0].imageAbs,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
          { name: post.metadata.title, url: `${baseURL}${blog.path}/${post.slug}` },
        ]}
      />

      <Column className={styles.hero} gap="24" padding="24">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <SmartLink href="/blog">Voltar para o blog</SmartLink>

            {categories.length > 0 && (
              <Row className={styles.categoryRow} gap="8" wrap>
                {categories.slice(0, 3).map((category) => (
                  <Tag key={category} size="s" background="brand-alpha-weak" onBackground="brand-strong">
                    {category}
                  </Tag>
                ))}
              </Row>
            )}

            <Heading variant="display-strong-m" wrap="balance">
              {post.metadata.title}
            </Heading>
            <div className={styles.accentLine} />
            {post.metadata.summary && (
              <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                {post.metadata.summary}
              </Text>
            )}
          </Column>

          <Column className={styles.heroAside} gap="12">
            <Column className={styles.metaCard} gap="12">
              <Text className={styles.metaLabel} variant="label-default-s" onBackground="neutral-weak">
                Publicado
              </Text>
              <Text variant="heading-strong-s">
                {post.metadata.publishedAt
                  ? new Date(post.metadata.publishedAt).toLocaleDateString("pt-BR")
                  : "Sem data definida"}
              </Text>
            </Column>

            <Column className={styles.metaCard} gap="12">
              <Text className={styles.metaLabel} variant="label-default-s" onBackground="neutral-weak">
                Autor
              </Text>
              <div className={styles.authorCard}>
                <Avatar size="s" src={authors[0].imageLocal} />
                <Text variant="body-default-m">{authors[0].name}</Text>
              </div>
            </Column>

            {tags.length > 0 && (
              <Column className={styles.metaCard} gap="12">
                <Text className={styles.metaLabel} variant="label-default-s" onBackground="neutral-weak">
                  Termos
                </Text>
                <Row className={styles.tagRow} gap="8" wrap>
                  {tags.slice(0, 5).map((tag) => (
                    <Tag key={tag} size="s" background="neutral-alpha-weak">
                      {tag}
                    </Tag>
                  ))}
                </Row>
              </Column>
            )}
          </Column>
        </Grid>
      </Column>

      {coverImage && (
        <div className={styles.coverShell}>
          <Media
            src={toLocal(coverImage) ?? coverImage}
            alt={post.metadata.title}
            aspectRatio="16/9"
            priority
            sizes="(min-width: 768px) 100vw, 768px"
            border="neutral-alpha-weak"
            radius="l"
          />
        </div>
      )}

      <Column className={styles.articleShell} horizontal="center">
        <Column className={styles.article} as="article" maxWidth="s">
          <CustomMDX source={post.content} glossary={post.metadata.glossary ?? {}} />
        </Column>
      </Column>

      <Column className={styles.relatedPanel} fillWidth gap="20" padding="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Continue lendo
        </Tag>
        <Heading as="h2" variant="heading-strong-xl">
          Mais textos do caderno editorial
        </Heading>
        <Posts
          exclude={[post.slug]}
          range={[1, 2]}
          columns="2"
          thumbnail
          direction="column"
          showSummary
          marginBottom="0"
        />
      </Column>
      <ScrollToHash />
    </Column>
  );
}
