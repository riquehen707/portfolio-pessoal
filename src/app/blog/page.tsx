import { Card, Column, Grid, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import {
  getFeaturedBlogPosts,
  getStrategicBlogPosts,
  strategicBlogCategories,
} from "@/app/blog/postData";
import BlogExplorer from "@/components/blog/BlogExplorer";
import { PostData, PostFrontmatter } from "@/components/blog/Posts";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { baseURL, blog, contentStrategy, person } from "@/resources";

import styles from "./blog.module.scss";

const blogStrategy = contentStrategy.pages.blog;

const categoryDescriptions: Record<string, string> = {
  "Negocios locais":
    "Leituras para mercados reais que precisam de presença forte, contexto comercial e operação mais previsível.",
  Marketing:
    "Aquisição, conversão, oferta e leitura comercial aplicadas a negócios que precisam crescer com critério.",
  Design:
    "Percepção de valor, hierarquia visual e clareza editorial usadas para transmitir mais confiança.",
  Operacao:
    "Processos, CRM, follow-up e estrutura para reduzir atrito e organizar a rotina digital.",
  Tecnologia:
    "Sites, SEO, automação e infraestrutura colocados a serviço de performance e decisão.",
  Growth:
    "Crescimento com base em consistência, dados úteis e leitura mais inteligente da operação.",
};

const trackMeta: Record<string, string> = {
  "Negocios locais": "Mercado",
  Marketing: "Aquisição",
  Design: "Percepção",
  Operacao: "Estrutura",
  Tecnologia: "Base técnica",
  Growth: "Crescimento",
};

function formatCategoryLabel(category: string) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: blog.title,
      description: blog.description,
      baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(blog.title)}`,
      path: blog.path,
    }),
    keywords: blogStrategy.seo.keywords,
  };
}

export default function Blog() {
  const rawPosts = getStrategicBlogPosts();
  const featuredPosts = getFeaturedBlogPosts(3, rawPosts);
  const allPosts = rawPosts.map((post) => ({
    slug: post.slug,
    metadata: post.metadata as PostFrontmatter,
  })) as PostData[];

  const orderedPosts =
    featuredPosts.length > 0 && allPosts.length > featuredPosts.length
      ? [
          ...featuredPosts.map((post) => ({
            slug: post.slug,
            metadata: post.metadata as PostFrontmatter,
          })),
          ...allPosts.filter((post) => !featuredPosts.some((featured) => featured.slug === post.slug)),
        ]
      : allPosts;

  const categories = strategicBlogCategories
    .map((category) => ({
      key: category,
      label: formatCategoryLabel(category),
      description:
        categoryDescriptions[category] ??
        "Textos reunidos por afinidade tematica para facilitar leitura, contexto e navegacao.",
      count: allPosts.filter((post) => post.metadata.categories?.includes(category)).length,
    }))
    .filter((category) => category.count > 0);

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={blog.title}
        description={blog.description}
        path={blog.path}
        image={`/api/og/generate?title=${encodeURIComponent(blog.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Blog", url: `${baseURL}${blog.path}` },
        ]}
      />

      <Column className={styles.hero} gap="16" padding="24">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          {blogStrategy.hero.eyebrow}
        </Tag>
        <Heading variant="heading-strong-xl">{blogStrategy.hero.headline}</Heading>
        <Text
          className={styles.heroLead}
          onBackground="neutral-weak"
          variant="heading-default-m"
          wrap="balance"
        >
          {blogStrategy.hero.subheadline}
        </Text>
      </Column>

      <Grid className={styles.laneGrid} columns="3" s={{ columns: 1 }} gap="16">
        {categories.map((lane) => (
          <Card
            className={styles.laneCard}
            key={lane.key}
            direction="column"
            gap="12"
            paddingX="20"
            paddingY="20"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            fillHeight
          >
            <Text className={styles.laneMeta} variant="label-default-s" onBackground="neutral-weak">
              {trackMeta[lane.key] ?? "Insight"}
            </Text>
            <Heading as="h2" variant="heading-strong-m">
              {lane.label}
            </Heading>
            <Text onBackground="neutral-weak">{lane.description}</Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              {`${lane.count} artigo${lane.count === 1 ? "" : "s"}`}
            </Text>
          </Card>
        ))}
      </Grid>

      <Row className={styles.infoPanel} gap="12" padding="20" wrap vertical="center">
        <Tag size="s" background="neutral-alpha-weak">
          Direção editorial
        </Tag>
        <Text onBackground="neutral-weak">
          A linha principal do blog escreve para empresários e decisores. Os destaques abaixo
          priorizam negócio, conversão, operação e crescimento com linguagem direta.
        </Text>
      </Row>

      <BlogExplorer posts={orderedPosts} categories={categories} />
    </Column>
  );
}
