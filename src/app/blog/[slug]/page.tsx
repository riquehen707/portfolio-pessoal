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
import { getBlogCollectionLabel, getBlogCollectionSlug } from "@/app/blog/postData";
import { ArticleNativeCTA } from "@/components/blog/ArticleNativeCTA";
import { ArticleTools } from "@/components/blog/ArticleTools";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, about, blog, person } from "@/resources";
import { buildDiscoverImageMetadata, buildOgImage } from "@/utils/og";
import { type BlogFile, getPosts } from "@/utils/utils";

import styles from "./page.module.scss";

type PageProps = {
  params: Promise<{ slug: string | string[] }>;
};

const readingTrailLabels = ["Para aplicar", "Para aprofundar", "Relacionado"] as const;

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
  const categoryScore = candidateCategories.filter((category) => currentCategories.has(category)).length * 5;
  const tagScore = candidateTags.filter((tag) => currentTags.has(tag)).length * 3;
  const primaryCategoryScore =
    current.metadata.category && candidate.metadata.category === current.metadata.category ? 4 : 0;

  return collectionScore + categoryScore + tagScore + primaryCategoryScore + getDateScore(candidate);
}

function getReadingTrail(current: BlogFile, posts: BlogFile[]) {
  return posts
    .filter((candidate) => candidate.slug !== current.slug)
    .sort((left, right) => getRelatedScore(current, right) - getRelatedScore(current, left))
    .slice(0, 4);
}

function toVisualTagLabel(tag: string) {
  const normalized = tag.toLowerCase();

  if (normalized.includes("seo") || normalized.includes("google") || normalized.includes("busca")) {
    return "Encontrar no Google";
  }
  if (normalized.includes("whatsapp") || normalized.includes("contato")) return "Contato mais direto";
  if (normalized.includes("agenda") || normalized.includes("agendamento")) return "Agenda mais clara";
  if (normalized.includes("instagram") || normalized.includes("redes")) return "Prova social";
  if (normalized.includes("cliente") || normalized.includes("paciente") || normalized.includes("aluno")) {
    return "Mais conversas certas";
  }
  if (normalized.includes("convers")) return "Decisão com menos atrito";
  if (normalized.includes("conteúdo")) return "Conteúdo com função";
  if (normalized.includes("operação")) return "Rotina mais organizada";
  if (normalized.includes("tráfego") || normalized.includes("anúncio")) return "Verba com mais critério";
  if (normalized.includes("matrícula")) return "Captação mais previsível";

  return tag;
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
      images: buildDiscoverImageMetadata(
        absoluteImage,
        post.metadata.imageAlt ?? post.metadata.title,
      ),
    },
    twitter: {
      ...generatedMeta.twitter,
      images: absoluteImage ? [absoluteImage] : undefined,
    },
    keywords: [...(post.metadata.categories ?? []), ...(post.metadata.tags ?? []), person.name].filter(
      (value): value is string => Boolean(value),
    ),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const slugPath = normalizeSlug(slug);

  const posts = getPosts(["src", "app", "blog", "posts"]);
  const post = posts.find((item) => item.slug === slugPath);

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
  const visualTags = Array.from(new Set(tags.map(toVisualTagLabel))).slice(0, 5);
  const collectionSlug = getBlogCollectionSlug(post);
  const collectionLabel = getBlogCollectionLabel(collectionSlug);
  const publishedDate = post.metadata.publishedAt
    ? new Date(post.metadata.publishedAt).toLocaleDateString("pt-BR")
    : "Sem data definida";
  const updatedDate = post.metadata.updatedAt
    ? new Date(post.metadata.updatedAt).toLocaleDateString("pt-BR")
    : publishedDate;
  const articlePath = `${blog.path}/${post.slug}`;
  const readingTrail = getReadingTrail(post, posts);
  const [primaryReading, ...secondaryReadings] = readingTrail;

  return (
    <Column className={styles.page} maxWidth="l" paddingTop="24" gap="24">
      <Schema
        as="blogPosting"
        baseURL={baseURL}
        path={articlePath}
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

      <Column className={styles.hero} gap="24">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="24">
          <Column className={styles.heroMain} gap="20">
            <SmartLink href="/blog">Voltar para o blog</SmartLink>

            <Row className={styles.eyebrowRow} gap="12" wrap>
              {collectionSlug && collectionLabel ? (
                <SmartLink href={`/blog/temas/${collectionSlug}`}>{collectionLabel}</SmartLink>
              ) : null}
              {categories.slice(0, 2).map((category) => (
                <Text key={category} as="span" variant="label-default-s" onBackground="neutral-weak">
                  {category}
                </Text>
              ))}
            </Row>

            <Heading as="h1" className={styles.heroTitle} variant="display-strong-l" wrap="balance">
              {post.metadata.title}
            </Heading>

            {post.metadata.summary && (
              <Text className={styles.heroLead} onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                {post.metadata.summary}
              </Text>
            )}
          </Column>

          <aside className={styles.heroAside} aria-label="Metadados do artigo">
            <div className={styles.byline}>
              <Text className={styles.metaLabel} variant="label-default-s" onBackground="neutral-weak">
                Por
              </Text>
              <div className={styles.authorCard}>
                <Avatar size="s" src={authors[0].imageLocal} />
                <Text variant="body-strong-m">{authors[0].name}</Text>
              </div>
            </div>

            <dl className={styles.metaList}>
              <div>
                <dt>Publicado</dt>
                <dd>{publishedDate}</dd>
              </div>
              <div>
                <dt>Atualizado</dt>
                <dd>{updatedDate}</dd>
              </div>
            </dl>

            {visualTags.length > 0 && (
              <Row className={styles.tagRow} gap="8" wrap>
                {visualTags.map((tag) => (
                  <Tag key={tag} size="s" background="neutral-alpha-weak">
                    {tag}
                  </Tag>
                ))}
              </Row>
            )}
          </aside>
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

      <div className={styles.articleShell}>
        <ArticleNativeCTA theme={collectionLabel ?? categories[0]} />
        <Column className={styles.article} id="article-content" as="article" maxWidth="s">
          <CustomMDX source={post.content} glossary={post.metadata.glossary ?? {}} />
        </Column>
        <ArticleTools
          title={post.metadata.title}
          summary={post.metadata.summary}
          readingTime={post.metadata.readingTime}
          url={articlePath}
        />
      </div>

      {primaryReading ? (
        <section className={styles.relatedPanel} aria-labelledby="reading-trail-title">
          <div className={styles.relatedHeader}>
            <Text className={styles.metaLabel} variant="label-default-s" onBackground="neutral-weak">
              Continue lendo
            </Text>
            <Heading id="reading-trail-title" as="h2" variant="heading-strong-xl">
              Uma trilha para continuar a leitura
            </Heading>
          </div>

          <a className={styles.primaryReading} href={`${blog.path}/${primaryReading.slug}`}>
            <span className={styles.readingLabel}>Próximo passo</span>
            <span className={styles.primaryReadingTitle}>{primaryReading.metadata.title}</span>
            {primaryReading.metadata.summary ? (
              <span className={styles.primaryReadingSummary}>{primaryReading.metadata.summary}</span>
            ) : null}
          </a>

          {secondaryReadings.length > 0 ? (
            <div className={styles.secondaryReadings}>
              {secondaryReadings.slice(0, 3).map((item, index) => (
                <a className={styles.secondaryReading} href={`${blog.path}/${item.slug}`} key={item.slug}>
                  <span className={styles.readingLabel}>{readingTrailLabels[index] ?? "Relacionado"}</span>
                  <span className={styles.secondaryReadingTitle}>{item.metadata.title}</span>
                  {item.metadata.readingTime ? (
                    <span className={styles.secondaryReadingMeta}>{item.metadata.readingTime} min de leitura</span>
                  ) : null}
                </a>
              ))}
            </div>
          ) : null}
        </section>
      ) : null}
      <ScrollToHash />
    </Column>
  );
}
