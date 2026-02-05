import { Suspense } from "react";
import {
  Column,
  Heading,
  Schema,
  Text,
  Button,
  Row,
  Line,
  Grid,
  Card,
  Tag,
} from "@once-ui-system/core";
import { Posts } from "@/components/blog/Posts";
import { baseURL, daily, person, blog, servicesPage } from "@/resources";
import { getPosts } from "@/utils/utils";
import { getAllTags } from "@/utils/posts";
import { formatDate } from "@/utils/formatDate";

const FEATURED_RANGE: [number, number] = [1, 1];
const RECENTS_RANGE: [number, number] = [2, 4];
const EARLIER_RANGE: [number] = [5];

export const revalidate = false;
export const dynamic = "force-static";

export async function generateMetadata() {
  return {
    title: daily.title,
    description: daily.description,
    alternates: { canonical: `${baseURL}${daily.path}` },
    openGraph: {
      title: daily.title,
      description: daily.description,
      url: `${baseURL}${daily.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(daily.title)}` }],
    },
  };
}

function PostsSkeleton() {
  return (
    <Column gap="16">
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
    </Column>
  );
}

export default function DiarioPage() {
  const pageTitle = daily.title;
  const ogImage = `/api/og/generate?title=${encodeURIComponent(pageTitle)}`;
  const posts = getPosts(["src", "app", "diario", "posts"]);
  const data = posts.map((post) => ({
    slug: post.slug,
    metadata: {
      title: post.metadata.title,
      publishedAt: post.metadata.publishedAt || "",
      tag: post.metadata.tag,
      image: post.metadata.image,
    },
  }));

  const featuredTags = getAllTags(posts).slice(0, 10);
  const totalEntries = posts.length;
  const latestEntry = posts[0];
  const latestLabel = latestEntry?.metadata?.publishedAt
    ? formatDate(latestEntry.metadata.publishedAt, true)
    : null;
  const diaryFormat = [
    {
      title: "Registro diário",
      description: "Atividades, tarefas e entregas para acompanhar consistência e ritmo.",
    },
    {
      title: "Pensamentos e decisões",
      description: "Hipóteses, escolhas difíceis e o raciocínio por trás das mudanças.",
    },
    {
      title: "Experimentos em andamento",
      description: "Testes rápidos de conteúdo, produto e automação para gerar aprendizado.",
    },
    {
      title: "Aprendizados e métricas",
      description: "O que funcionou, o que falhou e quais métricas importam daqui para frente.",
    },
  ];
  const diaryHighlights = [
    { label: "Entradas publicadas", value: totalEntries.toString() },
    { label: "Última atualização", value: latestLabel ?? "Em andamento" },
    { label: "Formato", value: "Diário aberto e transparente" },
  ];

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={pageTitle}
        description={daily.description}
        path={daily.path}
        image={ogImage}
        author={{
          name: person.name,
          url: `${baseURL}${daily.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column gap="12">
        <Heading as="h1" variant="heading-strong-xl">
          {pageTitle}
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          {daily.description}
        </Text>
        <Row gap="8" wrap>
          {["Diário público", "Open log", "Bastidores", "Aprendizado contínuo"].map((tag) => (
            <Tag key={tag} size="s" background="neutral-alpha-weak">
              {tag}
            </Tag>
          ))}
        </Row>
        <Row gap="12" wrap>
          <Button href={blog.path} variant="secondary" size="m" arrowIcon>
            Ir para o blog
          </Button>
          <Button href={servicesPage.path} variant="tertiary" size="m" arrowIcon>
            Ver serviços
          </Button>
        </Row>
      </Column>

      <Grid columns="3" s={{ columns: 1 }} gap="16">
        {diaryHighlights.map((item) => (
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
          Como funciona este diário
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Um registro aberto do que estou fazendo, pensando e aprendendo. A ideia é documentar o
          processo real, não apenas o resultado final.
        </Text>
      </Column>

      <Grid columns="2" s={{ columns: 1 }} gap="16">
        {diaryFormat.map((item) => (
          <Card
            key={item.title}
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
              {item.title}
            </Heading>
            <Text onBackground="neutral-weak">{item.description}</Text>
          </Card>
        ))}
      </Grid>

      <Line maxWidth="40" />

      <Heading as="h2" variant="heading-strong-xl">
        Últimas entradas
      </Heading>

      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={FEATURED_RANGE} thumbnail data={data} />
      </Suspense>

      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={RECENTS_RANGE} columns="2" thumbnail direction="column" data={data} />
      </Suspense>

      <Heading as="h2" variant="heading-strong-xl" marginTop="l">
        Entradas anteriores
      </Heading>

      <Suspense fallback={<PostsSkeleton />}>
        <Posts range={EARLIER_RANGE} columns="2" data={data} />
      </Suspense>

      {featuredTags.length > 0 && (
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
            Temas frequentes
          </Heading>
          <Row wrap gap="8">
            {featuredTags.map((tag) => (
              <Button
                key={tag}
                href={`/diario/tag/${encodeURIComponent(tag)}`}
                variant="tertiary"
                size="s"
              >
                {tag}
              </Button>
            ))}
          </Row>
          <Line maxWidth="40" />
          <Row gap="12" wrap>
            <Button href={`mailto:${person.email}`} variant="primary" size="m" arrowIcon>
              Falar comigo
            </Button>
            <Button href={blog.path} variant="secondary" size="m" arrowIcon>
              Ler artigos longos
            </Button>
          </Row>
        </Column>
      )}
    </Column>
  );
}

