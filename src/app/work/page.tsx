// src/app/work/page.tsx
import { Suspense } from "react";
import {
  Column,
  Heading,
  Schema,
  Text,
  Line,
  Grid,
  Card,
  Tag,
  Row,
  Button,
} from "@once-ui-system/core";
import { baseURL, about, person, work, servicesPage } from "@/resources";
import { Projects } from "@/components/work/Projects"; // Server Component
import { getPosts } from "@/utils/utils";

// ISR + renderização estática estável
export const revalidate = false;
export const dynamic = "force-static";

// (Opcional) Metadata estática; se preferir, pode manter o Meta.generate aqui,
// desde que não use searchParams/headers/cookies.
export async function generateMetadata() {
  return {
    title: work.title,
    description: work.description,
    alternates: { canonical: `${baseURL}${work.path}` },
    openGraph: {
      title: work.title,
      description: work.description,
      url: `${baseURL}${work.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(work.title)}` }],
    },
  };
}

// Skeleton simples
function ProjectsSkeleton() {
  return (
    <Column gap="16">
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
      <div style={{ height: 220, borderRadius: 16, background: "var(--layer-2)" }} />
    </Column>
  );
}

export default function WorkPage() {
  const ogImage = `/api/og/generate?title=${encodeURIComponent(work.title)}`;
  const projects = getPosts(["src", "app", "work", "projects"]);
  const totalProjects = projects.length;
  const latestProject = projects[0];
  const latestDate = latestProject?.metadata.updatedAt ?? latestProject?.metadata.publishedAt;
  const latestLabel = latestDate
    ? new Date(latestDate).toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;
  const tagCounts = new Map<string, number>();
  projects.forEach((project) => {
    const tags = project.metadata.tags ?? (project.metadata.tag ? [project.metadata.tag] : []);
    tags.forEach((tag) => {
      const label = String(tag).trim();
      if (!label) return;
      tagCounts.set(label, (tagCounts.get(label) ?? 0) + 1);
    });
  });
  const topTags = Array.from(tagCounts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([label]) => label);
  const highlights = [
    { label: "Projetos publicados", value: totalProjects.toString() },
    { label: "Última atualização", value: latestLabel ?? "Em andamento" },
    { label: "Foco", value: "Produto, dados e SEO técnico" },
  ];
  const process = [
    {
      title: "Mapeamento e diagnóstico",
      description: "Entendimento do contexto, objetivos e métricas antes de qualquer execução.",
    },
    {
      title: "Construção com performance",
      description: "Design, desenvolvimento e SEO técnico orientados para velocidade e conversão.",
    },
    {
      title: "Evolução contínua",
      description: "Ajustes baseados em dados reais, feedbacks e novas oportunidades.",
    },
  ];

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={ogImage}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Heading as="h1" variant="heading-strong-xl" align="center">
        {work.title}
      </Heading>

      {work.description && (
        <Text align="center" onBackground="neutral-weak" marginBottom="8">
          {work.description}
        </Text>
      )}

      <Line maxWidth="40" />

      <Grid columns="3" s={{ columns: 1 }} gap="16">
        {highlights.map((item) => (
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

      {topTags.length > 0 && (
        <Column gap="12">
          <Heading as="h2" variant="display-strong-s">
            Áreas exploradas nos projetos
          </Heading>
          <Row gap="8" wrap>
            {topTags.map((tag) => (
              <Tag key={tag} size="m" background="neutral-alpha-weak">
                {tag}
              </Tag>
            ))}
          </Row>
        </Column>
      )}

      <Column gap="16">
        <Heading as="h2" variant="display-strong-s">
          Como eu conduzo os projetos
        </Heading>
        <Grid columns="3" s={{ columns: 1 }} gap="16">
          {process.map((step, index) => (
            <Card
              key={step.title}
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
              <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                Etapa {index + 1}
              </Tag>
              <Heading as="h3" variant="heading-strong-m">
                {step.title}
              </Heading>
              <Text onBackground="neutral-weak">{step.description}</Text>
            </Card>
          ))}
        </Grid>
      </Column>

      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects />
      </Suspense>

      <Column
        fillWidth
        gap="16"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
      >
        <Heading as="h2" variant="display-strong-s">
          Quer tirar um projeto do papel?
        </Heading>
        <Text onBackground="neutral-weak">
          Veja os serviços disponíveis e escolha a melhor forma de começar.
        </Text>
        <Row gap="12" s={{ direction: "column" }}>
          <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
            Explorar serviços
          </Button>
          <Button href="/about" variant="secondary" size="m" arrowIcon>
            Conhecer o estúdio
          </Button>
        </Row>
      </Column>
    </Column>
  );
}
