import {
  Heading,
  Text,
  Button,
  Column,
  Card,
  Grid,
  Badge,
  Row,
  Schema,
  Meta,
  Tag,
  SmartLink,
} from "@once-ui-system/core";

import {
  home,
  about,
  person,
  baseURL,
  routes,
  services,
  servicesPage,
  blog,
  work,
} from "@/resources";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { DecodedText } from "@/components/DecodedText";
import { InteractiveSurface } from "@/components/InteractiveSurface";
import { getPosts } from "@/utils/utils";

import styles from "./home.module.scss";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const serviceHighlight = services[0];
  const blogPosts = getPosts(["src", "app", "blog", "posts"]);
  const workPosts = getPosts(["src", "app", "work", "projects"]);

  const featuredArticle = blogPosts.slice(0, 1).map((post) => ({
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

  const heroWords = ["clareza", "performance", "autoridade", "conversao"];
  const heroDescription =
    "Eu desenho, desenvolvo e organizo a camada digital para transformar posicionamento em operacao enxuta, navegacao simples e resultado real.";

  const priorityLinks = [
    {
      label: "Para contratar",
      title: "Servicos",
      description: "Websites, SEO tecnico e automacoes sob medida.",
      href: servicesPage.path,
      cta: "Explorar servicos",
    },
    {
      label: "Para validar execucao",
      title: "Portfolio",
      description: "Projetos que mostram como estrategia vira entrega.",
      href: work.path,
      cta: "Ver portfolio",
    },
    {
      label: "Para entender o metodo",
      title: "Blog",
      description: "Artigos para aprofundar produto, dados e decisao.",
      href: blog.path,
      cta: "Ler artigos",
    },
  ];

  const signals = [
    {
      label: "Portfolio",
      value: `${workPosts.length} projetos publicados`,
    },
    {
      label: "Servicos",
      value: `${services.length} frentes principais`,
    },
    {
      label: "Conteudo",
      value: `${blogPosts.length} artigos para consulta`,
    },
  ];

  const focusedServices = services.slice(0, 3).map((service) => ({
    title: service.title,
    badge: service.badge,
    description: service.summary,
    meta: `${service.hero.duration} | ${service.hero.price}`,
    href: `${servicesPage.path}/${service.slug}`,
  }));

  const calendarLink = about.calendar?.display ? about.calendar.link : about.path;
  const calendarLabel = about.calendar?.display ? "Agendar conversa" : "Conhecer o estudio";

  return (
    <Column className={styles.page} maxWidth="m" gap="40" paddingY="16" horizontal="center">
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

      <InteractiveSurface className={styles.heroGlow}>
        <div aria-hidden="true" className={styles.heroField}>
          <span className={`${styles.glowOrb} ${styles.glowOrbPrimary}`} />
          <span className={`${styles.glowOrb} ${styles.glowOrbSecondary}`} />
          <span className={styles.glowVeil} />
        </div>

        <Column fillWidth gap="24">
          <Grid className={styles.heroLayout} columns="2" s={{ columns: 1 }} gap="24">
            <Column className={styles.heroMain} gap="16">
              <Badge
                background="brand-alpha-weak"
                paddingX="12"
                paddingY="4"
                onBackground="neutral-strong"
                textVariant="label-default-s"
                arrow={false}
                href={servicesPage.path}
              >
                Disponivel para novos projetos
              </Badge>

              <Text className={styles.heroCode} variant="label-default-s" onBackground="neutral-weak">
                Next.js • Vue • SCSS • SEO tecnico
              </Text>

              <Heading className={styles.heroTitle} wrap="balance" variant="display-strong-l">
                <span className={styles.heroTitleTop}>Sites, produto e automacao</span>
                <span className={styles.heroTitleBottom}>
                  para negocios que precisam crescer com{" "}
                  <DecodedText className={styles.decodedWord} words={heroWords} />
                </span>
              </Heading>

              <Text className={styles.heroCopy} wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                {heroDescription}
              </Text>

              <Row className={styles.heroActions} gap="12" wrap>
                <Button href={work.path} variant="primary" size="m" arrowIcon>
                  Ver portfolio
                </Button>
                <Button href={servicesPage.path} variant="secondary" size="m" arrowIcon>
                  Explorar servicos
                </Button>
              </Row>
            </Column>

            <Column
              className={`${styles.cardTint} ${styles.heroAside}`}
              gap="16"
              paddingX="24"
              paddingY="24"
              radius="l"
              background="surface"
              style={{ background: "var(--surface-weak)" }}
            >
              <Text className={styles.priorityMeta} variant="label-default-s" onBackground="neutral-weak">
                Comece por aqui
              </Text>
              <Column className={styles.priorityList} gap="12">
                {priorityLinks.map((item) => (
                  <Column className={styles.priorityItem} key={item.title} gap="8">
                    <Text className={styles.priorityMeta} variant="label-default-s" onBackground="neutral-weak">
                      {item.label}
                    </Text>
                    <Heading as="h2" variant="heading-strong-m">
                      {item.title}
                    </Heading>
                    <Text onBackground="neutral-weak" variant="body-default-s">
                      {item.description}
                    </Text>
                    <SmartLink className={styles.inlineLink} suffixIcon="arrowRight" href={item.href}>
                      {item.cta}
                    </SmartLink>
                  </Column>
                ))}
              </Column>
            </Column>
          </Grid>

          <Grid className={styles.signalGrid} columns="3" s={{ columns: 1 }} gap="12">
            {signals.map((signal) => (
              <Column
                className={styles.signal}
                key={signal.label}
                gap="12"
                paddingX="24"
                paddingY="24"
                radius="l"
                background="surface"
              >
                <Text className={styles.priorityMeta} variant="label-default-s" onBackground="neutral-weak">
                  {signal.label}
                </Text>
                <Heading as="h3" variant="heading-strong-m">
                  {signal.value}
                </Heading>
              </Column>
            ))}
          </Grid>
        </Column>
      </InteractiveSurface>

      <Column fillWidth gap="16">
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
          <Column className={styles.sectionCopy} gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Portfolio
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Veja primeiro como a execucao acontece na pratica
            </Heading>
            <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
              Um case em destaque para mostrar produto, interface e entrega sem sobrecarregar a navegação.
            </Text>
          </Column>
          <Button href={work.path} variant="secondary" size="s" arrowIcon>
            Ver todos os projetos
          </Button>
        </Row>

        <Projects range={[1, 1]} compact marginBottom="0" paddingX="0" />
      </Column>

      <Column
        className={styles.sectionPanel}
        fillWidth
        gap="24"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        s={{ paddingX: "16", paddingY: "20" }}
      >
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
          <Column className={styles.sectionCopy} gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Servicos
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              O que eu entrego hoje
            </Heading>
            <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
              Tres frentes principais para tirar o projeto do papel sem abrir dezenas de caminhos na Home.
            </Text>
          </Column>
          <Button href={servicesPage.path} variant="secondary" size="s" arrowIcon>
            Abrir servicos
          </Button>
        </Row>

        <Grid columns="3" s={{ columns: 1 }} gap="16">
          {focusedServices.map((service, index) => (
            <Card
              className={`${styles.cardTint} ${index === 0 ? styles.cardAccent : ""} ${styles.serviceCard}`}
              key={service.title}
              direction="column"
              gap="16"
              paddingX="24"
              paddingY="24"
              radius="l"
              background="surface"
              style={{ background: "var(--surface-weak)" }}
              fillHeight
            >
              <Tag size="s" background="neutral-alpha-weak">
                {service.badge}
              </Tag>
              <Heading as="h3" variant="heading-strong-m">
                {service.title}
              </Heading>
              <Text onBackground="neutral-weak">{service.description}</Text>
              <Text className={styles.serviceMeta} variant="body-default-s" onBackground="neutral-weak">
                {service.meta}
              </Text>
              <SmartLink className={styles.inlineLink} suffixIcon="arrowRight" href={service.href}>
                Ver detalhes
              </SmartLink>
            </Card>
          ))}
        </Grid>
      </Column>

      {routes["/blog"] && featuredArticle.length > 0 && (
        <Column
          className={`${styles.sectionPanel} ${styles.contentPanel}`}
          fillWidth
          gap="24"
          paddingX="24"
          paddingY="24"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
          s={{ paddingX: "16", paddingY: "20" }}
        >
          <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="end" s={{ direction: "column" }}>
            <Column className={styles.sectionCopy} gap="8">
              <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                Artigo recente
              </Tag>
              <Heading as="h2" variant="display-strong-s">
                Se quiser entender meu raciocinio, comece por aqui
              </Heading>
              <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
                Um texto para aprofundar metodo, produto e dados sem transformar a Home em uma lista de posts.
              </Text>
            </Column>
            <Button href={blog.path} variant="secondary" size="s" arrowIcon>
              Ir para o blog
            </Button>
          </Row>

          <Posts
            columns="1"
            thumbnail
            direction="row"
            data={featuredArticle}
            marginBottom="0"
          />
        </Column>
      )}

      <Column
        className={`${styles.sectionPanel} ${styles.ctaPanel}`}
        fillWidth
        gap="20"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
        s={{ paddingX: "16", paddingY: "20" }}
      >
        <Row className={styles.sectionHeader} fillWidth horizontal="between" vertical="center" s={{ direction: "column" }}>
          <Column className={styles.sectionCopy} gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Conversa inicial
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Tem um projeto em mente?
            </Heading>
            <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
              Se voce precisa de um site claro, SEO tecnico ou automacao aplicada, posso ajudar a organizar
              o escopo e definir a melhor proxima etapa.
            </Text>
          </Column>

          <Row gap="12" wrap s={{ direction: "column" }}>
            <Button href={calendarLink} variant="primary" size="m" arrowIcon>
              {calendarLabel}
            </Button>
            <Button href={`mailto:${person.email}`} variant="tertiary" size="m" arrowIcon>
              Enviar e-mail
            </Button>
          </Row>
        </Row>

        <Text onBackground="neutral-weak" variant="body-default-s">
          {serviceHighlight.hero.price} | {serviceHighlight.hero.duration}
        </Text>
      </Column>
    </Column>
  );
}
