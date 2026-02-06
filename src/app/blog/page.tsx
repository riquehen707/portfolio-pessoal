// src/app/blog/page.tsx
import { Suspense } from "react";
import { Column, Heading, Schema, Text, Button, Row, Line, Grid, Card, Tag } from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";
import { baseURL, blog, person, daily, servicesPage } from "@/resources";
import { getPosts } from "@/utils/utils";
import { formatDate } from "@/utils/formatDate";
import { getAllCategories, getAllTags } from "@/utils/posts";

const FEATURED_RANGE: [number, number] = [1, 1];
const RECENTS_RANGE: [number, number] = [2, 3];
const EARLIER_RANGE: [number] = [4];

// Mantém a página estática com revalidação
export const revalidate = false;
export const dynamic = "force-static";

function SectionHeading({
  children,
  as = "h2",
  marginTop = "0",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  marginTop?: "0" | "m" | "l" | "xl";
}) {
  return (
    <Heading as={as} variant="heading-strong-xl" marginTop={marginTop} marginBottom="l">
      {children}
    </Heading>
  );
}

function PostsSkeleton() {
  return (
    <Column gap="16">
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
    </Column>
  );
}

export default function BlogPage() {
  const pageTitle = blog.title;
  const ogImage = `/api/og/generate?title=${encodeURIComponent(pageTitle)}`;
  const posts = getPosts(["src", "app", "blog", "posts"]);
  const totalPosts = posts.length;
  const latestPost = posts[0];
  const latestLabel = latestPost?.metadata?.publishedAt
    ? formatDate(latestPost.metadata.publishedAt, true)
    : null;
  const categories = getAllCategories();
  const tags = getAllTags();
  const featuredCategories = categories.slice(0, 6);
  const featuredTags = tags.slice(0, 12);
  const editorialTracks = [
    {
      title: "Estratégia e posicionamento",
      description:
        "Textos que organizam decisões de negócio, diferenciação e posicionamento de marca.",
    },
    {
      title: "Produto e execução",
      description:
        "Como transformar visão em experiências digitais: arquitetura, UX e desenvolvimento.",
    },
    {
      title: "Dados, SEO e performance",
      description:
        "Métricas, SEO técnico e automações que mantêm crescimento consistente no médio prazo.",
    },
  ];
  const blogHighlights = [
    { label: "Artigos publicados", value: totalPosts.toString() },
    { label: "Última atualização", value: latestLabel ?? "Em andamento" },
    { label: "Formato", value: "Longform e estudos aplicados" },
  ];

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      {/* Schema estático (não interfere no SSG) */}
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={pageTitle}
        description={blog.description}
        path={blog.path}
        image={ogImage}
        author={{
          name: person.name,
          url: `${baseURL}/blog`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column gap="12">
        <SectionHeading as="h1">{pageTitle}</SectionHeading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          {blog.description}
        </Text>
        <Row gap="8" wrap>
          {["Longform", "Frameworks", "Pesquisa aplicada", "Decisões de produto"].map((tag) => (
            <Tag key={tag} size="s" background="neutral-alpha-weak">
              {tag}
            </Tag>
          ))}
        </Row>
        <Row gap="12" wrap>
          <Button href={daily.path} variant="secondary" size="m" arrowIcon>
            Ver diário aberto
          </Button>
          <Button href={servicesPage.path} variant="tertiary" size="m" arrowIcon>
            Conhecer serviços
          </Button>
        </Row>
      </Column>

      <Grid columns="3" s={{ columns: 1 }} gap="16">
        {blogHighlights.map((item) => (
          <Card
            key={item.label}
            direction="column"
            gap="8"
            paddingX="20"
            paddingY="20"
            radius="l"
            background="surface"
            style={{ background: "var(--surface-weak)" }}
            border="neutral-alpha-weak"
            fillHeight
          >
            <Text variant="label-default-s" onBackground="neutral-weak">
              {item.label}
            </Text>
            <Heading as="h3" variant="heading-strong-l">
              {item.value}
            </Heading>
          </Card>
        ))}
      </Grid>

      <Column gap="12">
        <Heading as="h2" variant="heading-strong-xl">
          Trilhas de leitura
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Use as trilhas para escolher o tema certo e aprofundar nas discussões que mais importam.
        </Text>
      </Column>

      <Grid columns="3" s={{ columns: 1 }} gap="16">
        {editorialTracks.map((track) => (
          <Card
            key={track.title}
            direction="column"
            gap="12"
            paddingX="20"
            paddingY="20"
            radius="l"
            background="surface"
            style={{ background: "var(--surface-weak)" }}
            border="neutral-alpha-weak"
            fillHeight
          >
            <Heading as="h3" variant="heading-strong-m">
              {track.title}
            </Heading>
            <Text onBackground="neutral-weak">{track.description}</Text>
          </Card>
        ))}
      </Grid>

      <Line maxWidth="40" />

      {/* Destaque */}
      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={FEATURED_RANGE} thumbnail />
      </Suspense>

      {/* Recentes */}
      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={RECENTS_RANGE} columns="2" thumbnail direction="column" />
      </Suspense>

      {/* Anteriores */}
      <SectionHeading as="h2" marginTop="l">
        Posts anteriores
      </SectionHeading>

      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={EARLIER_RANGE} columns="2" thumbnail />
      </Suspense>

      <Column
        fillWidth
        padding="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        gap="16"
        s={{ padding: "16" }}
      >
        <Heading as="h2" variant="heading-strong-s">
          Categorias e temas
        </Heading>
        <Text onBackground="neutral-weak">
          Cada categoria agrupa posts alinhados com estratégias, cultura e narrativas de produto.
          Use-as para guiar o que você quer estudar hoje.
        </Text>
        <Row wrap gap="8">
          {featuredCategories.map((category) => (
            <Button
              key={category}
              href={`/blog/category/${encodeURIComponent(category)}`}
              variant="tertiary"
              size="s"
            >
              {category}
            </Button>
          ))}
        </Row>
        <Heading as="h3" variant="heading-strong-s" marginTop="m">
          Palavras-chave
        </Heading>
        <Row wrap gap="8">
          {featuredTags.map((tag) => (
            <Button
              key={tag}
              href={`/blog/tag/${encodeURIComponent(tag)}`}
              variant="tertiary"
              size="s"
            >
              {tag}
            </Button>
          ))}
        </Row>
        <Line maxWidth="40" />
        <Row gap="12" wrap>
          <Button href={daily.path} variant="secondary" size="m" arrowIcon>
            Ver diário aberto
          </Button>
          <Button href="/about" variant="tertiary" size="m" arrowIcon>
            Sobre o estúdio
          </Button>
        </Row>
      </Column>
    </Column>
  );
}

