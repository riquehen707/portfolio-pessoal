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
import styles from "./home.module.scss";
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
      tags: post.metadata.tags,
      categories: post.metadata.categories,
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
      tags: post.metadata.tags,
      categories: post.metadata.categories,
      image: post.metadata.image,
    },
  }));
  const focusTags = [
    "Sites de alta conversão",
    "SEO técnico",
    "Automação e dados",
    "Conteúdo estratégico",
  ];
  const portfolioTags = ["Estudos de caso", "UX/UI", "Performance", "SEO técnico"];
  const servicesTags = ["Websites", "SEO", "Automação"];
  const portfolioEntry = {
    title: "Portfólio",
    description:
      "Estudos de caso e projetos em produção que conectam estratégia, UX e execução técnica.",
    href: work.path,
    cta: "Ver portfólio",
  };
  const servicesEntry = {
    title: "Serviços",
    description:
      "Websites profissionais, SEO técnico e automações sob medida para crescer com previsibilidade.",
    href: servicesPage.path,
    cta: "Explorar serviços",
  };
  const contentEntries = [
    {
      title: blog.title,
      description:
        "Ensaios longos, frameworks e análises que conectam estratégia e execução.",
      href: blog.path,
      cta: "Ver todos os artigos",
      variant: "primary" as const,
      tags: ["Longform", "Estratégia", "Pesquisa"],
      data: blogData,
    },
    {
      title: daily.title,
      description:
        "Bastidores, aprendizados rápidos e experiências em andamento.",
      href: daily.path,
      cta: "Ver diário",
      variant: "secondary" as const,
      tags: ["Bastidores", "Processo", "Aprendizado"],
      data: dailyData,
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
    <Column className={styles.page} maxWidth="m" gap="xl" paddingY="12" horizontal="center">
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
      <Column className={styles.heroGlow} fillWidth horizontal="center" gap="m">
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

      {/* Para contratar */}
      <Column
        className={styles.sectionPanel}
        fillWidth
        gap="16"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        s={{ paddingX: "16", paddingY: "20" }}
      >
        <Row gap="8" wrap vertical="center">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Para contratar
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Portfólio e serviços
          </Heading>
        </Row>
        <div className={styles.accentLine} />
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Uma visão clara do que já está em produção e das ofertas disponíveis para o seu negócio.
        </Text>
        <Grid columns="2" s={{ columns: 1 }} gap="16">
          <Card
            className={styles.cardTint}
            direction="column"
            gap="12"
            paddingX="24"
            paddingY="24"
            radius="l"
            background="surface"
            style={{ background: "var(--surface-weak)" }}
            fillHeight
          >
            <Row wrap gap="8">
              {portfolioTags.map((tag) => (
                <Tag key={tag} size="s" background="neutral-alpha-weak">
                  {tag}
                </Tag>
              ))}
            </Row>
            <Heading as="h3" variant="heading-strong-l">
              {portfolioEntry.title}
            </Heading>
            <Text onBackground="neutral-weak">{portfolioEntry.description}</Text>
            <Button href={portfolioEntry.href} variant="primary" size="s" arrowIcon>
              {portfolioEntry.cta}
            </Button>
          </Card>
          <Card
            className={`${styles.cardTint} ${styles.cardAccent}`}
            direction="column"
            gap="12"
            paddingX="24"
            paddingY="24"
            radius="l"
            background="surface"
            style={{ background: "var(--surface-weak)" }}
            fillHeight
          >
            <Row wrap gap="8">
              {servicesTags.map((tag) => (
                <Tag key={tag} size="s" background="neutral-alpha-weak">
                  {tag}
                </Tag>
              ))}
            </Row>
            <Heading as="h3" variant="heading-strong-l">
              {servicesEntry.title}
            </Heading>
            <Text onBackground="neutral-weak">{servicesEntry.description}</Text>
            <Row gap="12" wrap>
              <Button href={servicesEntry.href} variant="primary" size="s" arrowIcon>
                {servicesEntry.cta}
              </Button>
              <Button href={calendarLink} variant="secondary" size="s" arrowIcon>
                {calendarLabel}
              </Button>
            </Row>
            <Text onBackground="neutral-weak" variant="body-default-s">
              {serviceHighlight.hero.budget} / {serviceHighlight.hero.price} / {serviceHighlight.hero.duration}
            </Text>
          </Card>
        </Grid>
      </Column>

      {/* Projetos em destaque */}
      <Column fillWidth gap="12">
        <div className={styles.accentLine} />
        <Heading as="h2" variant="display-strong-s">
          Projetos em destaque
        </Heading>
        <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          Alguns sistemas e websites recentes que traduzem estratégia em execução real.
        </Text>
        <Row gap="8" wrap>
          {portfolioTags.map((tag) => (
            <Tag key={`portfolio-${tag}`} size="s" background="neutral-alpha-weak">
              {tag}
            </Tag>
          ))}
        </Row>
        <Row gap="12" wrap>
          <Button href={work.path} variant="primary" size="s" arrowIcon>
            Ver portfólio completo
          </Button>
          <Button href={calendarLink} variant="secondary" size="s" arrowIcon>
            {calendarLabel}
          </Button>
        </Row>
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
        <Row gap="12" wrap>
          <Button href={calendarLink} variant="primary" size="m" arrowIcon>
            {calendarLabel}
          </Button>
          <Button href={servicesPage.path} variant="secondary" size="m" arrowIcon>
            Ver serviços
          </Button>
        </Row>
      </Column>


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
          className={styles.sectionPanel}
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
          <div className={styles.accentLine} />
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
            {serviceHighlight.hero.budget} / {serviceHighlight.hero.price} / {serviceHighlight.hero.duration}
          </Text>
        </Column>
      </RevealFx>

      {/* Conteúdo */}
      {(routes["/blog"] || routes["/diario"]) && (
        <Column
          className={`${styles.sectionPanel} ${styles.contentPanel}`}
          fillWidth
          gap="16"
          paddingX="24"
          paddingY="24"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
          marginBottom="xl"
          s={{ paddingX: "16", paddingY: "20" }}
        >
          <Row gap="8" wrap>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Conteúdo editorial
            </Tag>
          </Row>
          <div className={styles.accentLine} />
          <Heading as="h2" variant="display-strong-s">
            Blog + Diário
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            Conteúdo profundo para reflexão e um diário aberto para acompanhar o processo.
          </Text>
          <Grid columns="2" s={{ columns: 1 }} gap="16">
            {contentEntries.map((item) => (
              <Column
                className={`${styles.cardTint} ${styles.cardNeutral}`}
                key={item.title}
                fillWidth
                paddingX="24"
                paddingY="24"
                radius="l"
                background="page"
                style={{ background: "var(--page)" }}
                gap="16"
                s={{ paddingX: "16", paddingY: "20" }}
              >
                <Row wrap gap="8">
                  {item.tags.map((tag) => (
                    <Tag key={`${item.title}-${tag}`} size="s" background="neutral-alpha-weak">
                      {tag}
                    </Tag>
                  ))}
                </Row>
                <Heading as="h3" variant="heading-strong-l" wrap="balance">
                  {item.title}
                </Heading>
                <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                  {item.description}
                </Text>
                <Posts range={[1, 3]} columns="1" thumbnail direction="row" data={item.data} />
                <Button href={item.href} variant={item.variant} size="m" arrowIcon>
                  {item.cta}
                </Button>
              </Column>
            ))}
          </Grid>
        </Column>
      )}

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
