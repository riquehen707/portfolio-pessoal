// src/app/page.tsx

import {
  Heading,
  Text,
  Button,
  Avatar,
  RevealFx,
  Column,
  Card,
  Grid,
  Badge,
  Row,
  Schema,
  Meta,
  Line,
  Tag,
} from "@once-ui-system/core";
import {
  home,
  about,
  person,
  baseURL,
  routes,
  services,
  servicesPage,
  productsPage,
  daily,
  blog,
  work,
} from "@/resources";
import { Mailchimp } from "@/components";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { getPosts } from "@/utils/utils";
// import { BlogPillars } from "@/components/blog/BlogPillars"; // fica pra depois

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const serviceHighlight = services[0];
  const blogPosts = getPosts(["src", "app", "blog", "posts"]);
  const blogData = blogPosts.map((post) => ({
    slug: post.slug,
    metadata: {
      title: post.metadata.title,
      publishedAt: post.metadata.publishedAt || "",
      tag: post.metadata.tag,
      image: post.metadata.image,
    },
  }));
  const dailyPosts = getPosts(["src", "app", "diario", "posts"]);
  const dailyData = dailyPosts.map((post) => ({
    slug: post.slug,
    metadata: {
      title: post.metadata.title,
      publishedAt: post.metadata.publishedAt || "",
      tag: post.metadata.tag,
      image: post.metadata.image,
    },
  }));
  const focusTags = [
    "Sites de alta conversão",
    "SEO técnico",
    "Automação e dados",
    "Conteúdo estratégico",
  ];
  const entryPoints = [
    {
      title: "Portfólio",
      description:
        "Estudos de caso, sistemas e websites que conectam estratégia, design e execução técnica.",
      href: work.path,
      cta: "Ver projetos",
      variant: "secondary" as const,
      tags: ["Web", "Dados", "Automação"],
    },
    {
      title: "Blog",
      description:
        "Ensaios e análises profundas sobre produto, dados, marketing e construção de negócios.",
      href: blog.path,
      cta: "Ler blog",
      variant: "primary" as const,
      tags: ["Estratégia", "Pesquisa", "Decisão"],
    },
    {
      title: "Diário",
      description:
        "Notas rápidas com bastidores, aprendizados diários e experimentos em andamento.",
      href: daily.path,
      cta: "Abrir diário",
      variant: "secondary" as const,
      tags: ["Processo", "Bastidores", "Aprendizado"],
    },
  ];
  const workflow = [
    {
      title: "Diagnóstico e estratégia",
      description:
        "Entendimento do contexto, objetivos e métricas. Traduzo isso em um plano claro e executável.",
    },
    {
      title: "Construção com foco em resultado",
      description:
        "Design, desenvolvimento e SEO técnico alinhados para performance, conversão e clareza.",
    },
    {
      title: "Evolução guiada por dados",
      description:
        "Acompanho indicadores e ajustes finos para melhorar conteúdo, automações e resultados.",
    },
  ];
  const calendarLink = about.calendar?.display ? about.calendar.link : about.path;
  const calendarLabel = about.calendar?.display ? "Agendar conversa" : "Conhecer o estúdio";
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      {/* Hero */}
      <Column fillWidth horizontal="center" gap="m">
        <Column maxWidth="s" horizontal="center" align="center">
          {home.featured.display && (
            <RevealFx
              fillWidth
              horizontal="center"
              paddingTop="16"
              paddingBottom="32"
              paddingLeft="12"
            >
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={home.featured.href}
              >
                <Row paddingY="2">{home.featured.title}</Row>
              </Badge>
            </RevealFx>
          )}

          <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
            <Heading wrap="balance" variant="display-strong-l">
              {home.headline}
            </Heading>
          </RevealFx>

          <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
            <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
              {home.subline}
            </Text>
          </RevealFx>

          <RevealFx translateY={6} delay={0.3} fillWidth horizontal="center" paddingBottom="20">
            <Row gap="8" wrap horizontal="center">
              {focusTags.map((tag) => (
                <Tag key={tag} size="s" background="neutral-alpha-weak">
                  {tag}
                </Tag>
              ))}
            </Row>
          </RevealFx>

          <RevealFx paddingTop="12" delay={0.4} horizontal="center" paddingLeft="12">
            <Button
              id="about"
              data-border="rounded"
              href={about.path}
              variant="secondary"
              size="m"
              weight="default"
              arrowIcon
            >
              <Row gap="8" vertical="center" paddingRight="4">
                {about.avatar.display && (
                  <Avatar
                    marginRight="8"
                    style={{ marginLeft: "-0.75rem" }}
                    src={person.avatar}
                    size="m"
                  />
                )}
                {about.title}
              </Row>
            </Button>
          </RevealFx>
        </Column>
      </Column>

      {/* Entradas principais */}
      <Column fillWidth gap="16">
        <Heading as="h2" variant="display-strong-s">
          Três frentes do estúdio
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Portfólio, blog e diário convivem no mesmo lugar para mostrar estratégia aplicada, conteúdo
          profundo e bastidores do processo.
        </Text>
        <Grid columns="3" s={{ columns: 1 }} gap="16">
          {entryPoints.map((item) => (
            <Card
              key={item.title}
              direction="column"
              gap="12"
              paddingX="24"
              paddingY="24"
              radius="l"
              background="surface"
              style={{ background: "var(--surface-weak)" }}
              border="neutral-alpha-weak"
              fillHeight
            >
              <Heading as="h3" variant="heading-strong-l">
                {item.title}
              </Heading>
              <Text onBackground="neutral-weak">{item.description}</Text>
              <Row wrap gap="8">
                {item.tags.map((tag) => (
                  <Tag key={`${item.title}-${tag}`} size="s" background="neutral-alpha-weak">
                    {tag}
                  </Tag>
                ))}
              </Row>
              <Button href={item.href} variant={item.variant} size="s" arrowIcon>
                {item.cta}
              </Button>
            </Card>
          ))}
        </Grid>
      </Column>

      {/* Projetos em destaque */}
      <Column fillWidth gap="12">
        <Heading as="h2" variant="display-strong-s">
          Projetos em destaque
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Alguns sistemas e websites recentes que traduzem estratégia em execução real.
        </Text>
      </Column>

      {/* Projeto em destaque */}
      <RevealFx translateY="16" delay={0.6}>
        <Projects range={[1, 1]} />
      </RevealFx>

      {/* Como trabalho */}
      <Column fillWidth gap="16">
        <Heading as="h2" variant="display-strong-s">
          Como trabalho
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Um processo simples para entregar clareza, velocidade e resultado sem complicar o
          essencial.
        </Text>
        <Grid columns="3" s={{ columns: 1 }} gap="16">
          {workflow.map((step, index) => (
            <Card
              key={step.title}
              direction="column"
              gap="12"
              paddingX="24"
              paddingY="24"
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

      {/* Conteúdo */}
      {(routes["/blog"] || routes["/diario"]) && (
        <Column fillWidth gap="16" marginBottom="xl">
          <Row fillWidth paddingRight="64">
            <Line maxWidth={56} />
          </Row>

          <Column gap="8">
            <Heading as="h2" variant="display-strong-s">
              Conteúdo para pensar e executar
            </Heading>
            <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
              Duas trilhas complementares: o Blog com textos mais densos e o Diário com notas rápidas
              sobre o que estou testando no dia a dia.
            </Text>
          </Column>

          <Row fillWidth gap="16" s={{ direction: "column" }}>
            {routes["/blog"] && (
              <Column
                fillWidth
                paddingX="24"
                paddingY="24"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
                gap="16"
                s={{ paddingX: "16", paddingY: "20" }}
              >
                <Heading as="h3" variant="heading-strong-l" wrap="balance">
                  {blog.title}
                </Heading>
                <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                  Ensaios longos, frameworks e análises que conectam estratégia e execução.
                </Text>
                <Posts range={[1, 3]} columns="1" thumbnail direction="row" data={blogData} />
                <Button href={blog.path} variant="primary" size="m" arrowIcon>
                  Ver todos os artigos
                </Button>
              </Column>
            )}

            {routes["/diario"] && (
              <Column
                fillWidth
                paddingX="24"
                paddingY="24"
                radius="l"
                background="surface"
                style={{ background: "var(--surface-weak)" }}
                gap="16"
                s={{ paddingX: "16", paddingY: "20" }}
              >
                <Heading as="h3" variant="heading-strong-l" wrap="balance">
                  {daily.title}
                </Heading>
                <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                  Bastidores, aprendizados rápidos e experimentos em andamento.
                </Text>
                <Posts range={[1, 3]} columns="1" thumbnail direction="row" data={dailyData} />
                <Button href={daily.path} variant="secondary" size="m" arrowIcon>
                  Ver diário
                </Button>
              </Column>
            )}
          </Row>

          <Row fillWidth paddingLeft="64" horizontal="end">
            <Line maxWidth={56} />
          </Row>
        </Column>
      )}

      {/* Mais projetos */}
      <Column fillWidth gap="12">
        <Heading as="h2" variant="display-strong-s">
          Mais projetos e estudos
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Trabalhos recentes, testes e projetos paralelos que também fazem parte da trajetória.
        </Text>
      </Column>
      <Projects range={[2]} />

      {/* Serviços e produtos */}
      <RevealFx delay={0.4} paddingTop="8">
        <Column
          fillWidth
          gap="16"
          paddingX="24"
          paddingY="24"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
          s={{ paddingX: "16", paddingY: "20" }}
        >
          <Heading as="h2" variant="display-strong-s">
            {servicesPage.title}
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            {servicesPage.description}
          </Text>
          <Text onBackground="neutral-weak">{servicesPage.intro.lead}</Text>
          <Row gap="12" s={{ direction: "column" }}>
            <Button href={servicesPage.path} variant="primary" size="m" arrowIcon>
              Explorar serviços
            </Button>
            <Button href={productsPage.path} variant="secondary" size="m" arrowIcon>
              Ver produtos digitais
            </Button>
          </Row>
          <Text onBackground="neutral-weak" variant="body-default-s">
            {serviceHighlight.hero.budget} · {serviceHighlight.hero.price} · {serviceHighlight.hero.duration}
          </Text>
        </Column>
      </RevealFx>

      {/* CTA final */}
      <Column
        fillWidth
        gap="16"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        s={{ paddingX: "16", paddingY: "20" }}
      >
        <Heading as="h2" variant="display-strong-s">
          Vamos conversar sobre o seu projeto?
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Se você precisa de um site que converte, SEO técnico ou automação de processos, posso ajudar
          com diagnóstico e execução.
        </Text>
        <Row gap="12" s={{ direction: "column" }}>
          <Button href={calendarLink} variant="primary" size="m" arrowIcon>
            {calendarLabel}
          </Button>
          <Button href={`mailto:${person.email}`} variant="tertiary" size="m" arrowIcon>
            Enviar e-mail
          </Button>
        </Row>
      </Column>

      {/* Newsletter */}
      <Mailchimp />
    </Column>
  );
}
