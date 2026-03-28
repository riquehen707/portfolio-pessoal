import { Suspense } from "react";
import {
  Column,
  Heading,
  Schema,
  Text,
  Grid,
  Card,
  Tag,
  Row,
  Button,
} from "@once-ui-system/core";

import { baseURL, about, person, work, servicesPage } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { ProjectsTimeline } from "@/components/work/ProjectsTimeline";
import { PortfolioStack } from "@/components/work/PortfolioStack";
import { getPosts } from "@/utils/utils";

import styles from "../section.module.scss";

export const revalidate = false;
export const dynamic = "force-static";

const kindLabels = {
  client: "Case de cliente",
  personal: "Projeto pessoal",
  study: "Estudo de caso",
} as const;

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

  const counts = projects.reduce(
    (acc, project) => {
      const kind = project.metadata.kind ?? "personal";
      acc[kind] += 1;
      return acc;
    },
    { client: 0, personal: 0, study: 0 },
  );

  const highlights = [
    { label: "Projetos publicados", value: projects.length.toString() },
    { label: "Projetos pessoais", value: counts.personal.toString() },
    { label: "Estudos de caso", value: counts.study.toString() },
  ];

  const timelineProjects = [...projects]
    .sort((a, b) => {
      const aDate = a.metadata.publishedAt ? +new Date(a.metadata.publishedAt) : 0;
      const bDate = b.metadata.publishedAt ? +new Date(b.metadata.publishedAt) : 0;
      return aDate - bDate;
    })
    .map((project) => ({
      slug: project.slug,
      title: project.metadata.title,
      summary: project.metadata.summary ?? project.metadata.title,
      year: project.metadata.publishedAt
        ? new Date(project.metadata.publishedAt).getFullYear().toString()
        : "Sem data",
      kindLabel: kindLabels[project.metadata.kind ?? "personal"],
      stack: project.metadata.stack ?? project.metadata.tags ?? [],
    }));

  const technologyItems = [
    {
      title: "Next.js",
      icon: "nextjs" as const,
      note: "Base principal para sites rapidos, blogs e estrutura tecnica orientada a SEO.",
      focus: "Sites e conteudo",
    },
    {
      title: "Vue",
      icon: "vue" as const,
      note: "Uso quando o projeto pede interface modular, painis internos ou componentes mais independentes.",
      focus: "Interfaces e paineis",
    },
    {
      title: "SCSS",
      icon: "sass" as const,
      note: "Camada visual organizada para sistemas responsivos, componentes e escalabilidade de estilos.",
      focus: "Design system",
    },
    {
      title: "SEO",
      icon: "seo" as const,
      note: "Especialidade em estrutura tecnica, indexacao e performance para lojas virtuais e blogs.",
      focus: "E-commerce e editorial",
    },
    {
      title: "Shopify",
      icon: "shopify" as const,
      note: "Aparece em estudos de caso e consultorias para arquitetura de loja e experiencia de compra.",
      focus: "Lojas virtuais",
    },
    {
      title: "Python",
      icon: "python" as const,
      note: "Uso em dashboards, automacoes e organizacao de dados para operacoes e diagnostico.",
      focus: "Automacao e analise",
    },
    {
      title: "Google Analytics",
      icon: "ga" as const,
      note: "Leitura de comportamento, performance e conversao para orientar iteracao e SEO.",
      focus: "Mensuracao",
    },
    {
      title: "Vercel",
      icon: "vercel" as const,
      note: "Deploy rapido, ambiente limpo e pipeline eficiente para projetos em producao.",
      focus: "Infra e entrega",
    },
  ];

  return (
    <Column className={styles.page} maxWidth="m" paddingTop="24" gap="24">
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

      <Column className={styles.heroGlow} gap="16">
        <Row gap="8" wrap horizontal="center">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Portfolio
          </Tag>
          <Tag size="s" background="neutral-alpha-weak">
            Projetos pessoais
          </Tag>
          <Tag size="s" background="neutral-alpha-weak">
            Estudos de caso
          </Tag>
        </Row>

        <Heading as="h1" variant="heading-strong-xl" align="center">
          {work.title}
        </Heading>
        <div className={styles.accentLine} />
        <Text align="center" onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Enquanto os primeiros cases de clientes entram, este portfolio usa projetos pessoais e
          estudos de caso para mostrar como eu penso produto, SEO, interface e implementacao.
        </Text>
      </Column>

      <Grid columns="3" s={{ columns: 1 }} gap="16">
        {highlights.map((item) => (
          <Card
            className={styles.cardTint}
            key={item.label}
            direction="column"
            gap="8"
            paddingX="20"
            paddingY="20"
            radius="l"
            background="surface"
            style={{ background: "var(--surface-weak)" }}
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

      <Column
        className={styles.sectionPanel}
        fillWidth
        gap="20"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        s={{ paddingX: "16", paddingY: "20" }}
      >
        <ProjectsTimeline projects={timelineProjects} />
      </Column>

      <Column
        className={styles.sectionPanel}
        fillWidth
        gap="20"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        s={{ paddingX: "16", paddingY: "20" }}
      >
        <PortfolioStack items={technologyItems} />
      </Column>

      <Column gap="12">
        <Heading as="h2" variant="display-strong-s">
          Cases completos para leitura
        </Heading>
        <div className={styles.accentLine} />
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Cada projeto abaixo detalha contexto, decisao tecnica, stack e resultado esperado ou
          obtido. E a parte mais proxima do formato de case que vou usar para clientes reais.
        </Text>
      </Column>

      <Suspense fallback={<ProjectsSkeleton />}>
        <Projects marginBottom="0" />
      </Suspense>

      <Column
        className={styles.sectionPanel}
        fillWidth
        gap="16"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
      >
        <Heading as="h2" variant="display-strong-s">
          Quer transformar isso em um case real?
        </Heading>
        <div className={styles.accentLine} />
        <Text onBackground="neutral-weak">
          Se o seu projeto precisa de estrutura tecnica, SEO para e-commerce ou blog, e uma camada
          de interface bem executada, podemos comecar por servicos ou por uma conversa direta.
        </Text>
        <Row gap="12" s={{ direction: "column" }}>
          <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
            Explorar servicos
          </Button>
          <Button href="/about" variant="secondary" size="m" arrowIcon>
            Conhecer o estudio
          </Button>
        </Row>
      </Column>
    </Column>
  );
}
