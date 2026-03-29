import {
  Button,
  Card,
  Column,
  Grid,
  Heading,
  Row,
  Schema,
  Tag,
  Text,
} from "@once-ui-system/core";

import { baseURL, person, products, productsPage, services, servicesPage, work } from "@/resources";

import sectionStyles from "../section.module.scss";
import styles from "./services.module.scss";

export async function generateMetadata() {
  return {
    title: servicesPage.title,
    description: servicesPage.description,
    alternates: { canonical: `${baseURL}${servicesPage.path}` },
    openGraph: {
      title: servicesPage.title,
      description: servicesPage.description,
      url: `${baseURL}${servicesPage.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(servicesPage.title)}` }],
    },
  };
}

const categoryLabels = {
  package: "Pacotes",
  microservice: "Micro-serviços",
  saas: "SaaS",
} as const;

export default function ServicesPage() {
  const offerCounts = {
    package: products.filter((item) => item.category === "package").length,
    microservice: products.filter((item) => item.category === "microservice").length,
    saas: products.filter((item) => item.category === "saas").length,
  };

  const lanes = [
    {
      label: "Sob medida",
      title: "Projetos completos",
      description: "Para site, SEO ou automação quando o problema pede diagnóstico, execução e entrega mais ampla.",
      meta: `${services.length} serviços principais`,
      href: servicesPage.path,
      cta: "Ver serviços",
    },
    {
      label: "Entrada fechada",
      title: "Pacotes",
      description: "Escopos mais fechados para resolver algo comum com mais rapidez e previsibilidade.",
      meta: `${offerCounts.package} opções`,
      href: productsPage.path,
      cta: "Ver pacotes",
    },
    {
      label: "Ajuste pontual",
      title: "Micro-serviços",
      description: "Entregas menores para corrigir, refinar ou destravar um ponto específico.",
      meta: `${offerCounts.microservice} opções`,
      href: productsPage.path,
      cta: "Ver micro-serviços",
    },
    {
      label: "Ferramentas",
      title: "SaaS e ferramentas",
      description: "Produtos próprios, gratuitos, pagos ou em beta, para apoiar diagnóstico e execução.",
      meta: `${offerCounts.saas} opções`,
      href: productsPage.path,
      cta: "Ver ferramentas",
    },
  ];

  const offerHighlights = [
    {
      title: "Pacotes para entrar sem abrir projeto maior",
      description:
        "Bom para quem precisa sair do zero com mais clareza e menos atrito.",
      meta: `${offerCounts.package} pacotes`,
    },
    {
      title: "Micro-serviços técnicos",
      description:
        "Útil para refino visual, SEO técnico, Core Web Vitals ou integrações pontuais.",
      meta: `${offerCounts.microservice} micro-serviços`,
    },
    {
      title: "Ferramentas e SaaS autorais",
      description:
        "Inclui itens gratuitos e ofertas em beta para tornar escopo, diagnóstico e rotina mais claros.",
      meta: `${offerCounts.saas} ferramentas`,
    },
  ];

  return (
    <Column className={sectionStyles.page} maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={servicesPage.title}
        description={servicesPage.description}
        path={servicesPage.path}
        image={`/api/og/generate?title=${encodeURIComponent(servicesPage.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${servicesPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column className={sectionStyles.heroGlow} gap="16">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Formatos de serviço
        </Tag>
        <Heading as="h1" variant="heading-strong-xl">
          {servicesPage.title}
        </Heading>
        <div className={sectionStyles.accentLine} />
        <Text variant="heading-default-xs" onBackground="neutral-weak">
          {servicesPage.intro.headline}
        </Text>
        <Text variant="body-default-m" onBackground="neutral-weak">
          {servicesPage.intro.lead}
        </Text>
        <Row className={styles.heroActions} gap="12" wrap>
          <Button href={productsPage.path} variant="primary" size="m" arrowIcon>
            Ver pacotes e ferramentas
          </Button>
          <Button href={work.path} variant="secondary" size="m" arrowIcon>
            Ver projetos
          </Button>
        </Row>
      </Column>

      <Grid columns="4" s={{ columns: 1 }} gap="16">
        {lanes.map((lane) => (
          <Card
            className={styles.laneCard}
            key={lane.title}
            direction="column"
            gap="12"
            paddingX="20"
            paddingY="20"
            radius="l"
            background="surface"
            border="neutral-alpha-weak"
            fillHeight
          >
            <Text variant="label-default-s" onBackground="neutral-weak">
              {lane.label}
            </Text>
            <Heading as="h2" variant="heading-strong-m">
              {lane.title}
            </Heading>
            <Text onBackground="neutral-weak">{lane.description}</Text>
            <Text className={styles.serviceMeta} variant="body-default-s" onBackground="neutral-weak">
              {lane.meta}
            </Text>
            <Button href={lane.href} variant="tertiary" size="s" arrowIcon>
              {lane.cta}
            </Button>
          </Card>
        ))}
      </Grid>

      <Column
        className={sectionStyles.sectionPanel}
        gap="16"
        padding="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
      >
        <Column gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Serviços sob medida
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Frentes principais
          </Heading>
          <Text onBackground="neutral-weak">
            Cada serviço mostra o problema principal, para quem ele serve e qual é o ponto de entrada.
          </Text>
        </Column>

        <Grid columns="3" s={{ columns: 1 }} gap="16">
          {services.map((service) => (
            <Card
              className={styles.serviceCard}
              key={service.slug}
              direction="column"
              gap="12"
              paddingX="20"
              paddingY="20"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
              fillHeight
            >
              <Row gap="8" wrap>
                <Tag size="s">{service.badge}</Tag>
                {service.tags.slice(0, 2).map((tag) => (
                  <Tag key={`${service.slug}-${tag}`} size="s" background="neutral-alpha-weak">
                    {tag}
                  </Tag>
                ))}
              </Row>
              <Heading as="h3" variant="heading-strong-m">
                {service.title}
              </Heading>
              <Text onBackground="neutral-weak">{service.summary}</Text>
              <Text className={styles.serviceMeta} variant="body-default-s" onBackground="neutral-weak">
                {service.hero.price} | {service.hero.duration}
              </Text>
              <Button href={`${servicesPage.path}/${service.slug}`} variant="primary" size="s" arrowIcon>
                Ver landing
              </Button>
            </Card>
          ))}
        </Grid>
      </Column>

      <Column
        className={sectionStyles.sectionPanel}
        gap="16"
        padding="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
      >
        <Column gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Entrada menor
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Pacotes, micro-serviços e SaaS
          </Heading>
          <Text onBackground="neutral-weak">
            Nem toda demanda precisa virar projeto completo. Aqui entram ajustes pontuais, pacotes e ferramentas próprias.
          </Text>
        </Column>

        <Grid columns="3" s={{ columns: 1 }} gap="16">
          {offerHighlights.map((item, index) => (
            <Card
              className={styles.statCard}
              key={item.title}
              direction="column"
              gap="12"
              paddingX="20"
              paddingY="20"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
              fillHeight
            >
              <Tag size="s" background="neutral-alpha-weak">
                {index === 0 ? categoryLabels.package : index === 1 ? categoryLabels.microservice : categoryLabels.saas}
              </Tag>
              <Heading as="h3" variant="heading-strong-m">
                {item.title}
              </Heading>
              <Text onBackground="neutral-weak">{item.description}</Text>
              <Text className={styles.serviceMeta} variant="body-default-s" onBackground="neutral-weak">
                {item.meta}
              </Text>
            </Card>
          ))}
        </Grid>

        <Row className={styles.ctaBar} gap="12" wrap>
          <Button href={productsPage.path} variant="primary" size="m" arrowIcon>
            Abrir catálogo completo
          </Button>
          <Button href={`mailto:${person.email}`} variant="tertiary" size="m" arrowIcon>
            Tirar uma dúvida
          </Button>
        </Row>
      </Column>

      <Card
        className={styles.ctaPanel}
        direction="column"
        gap="16"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        border="neutral-alpha-weak"
      >
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Escolha simples
        </Tag>
        <Heading as="h2" variant="display-strong-s">
          Se você ainda não sabe o formato certo, comece pelo problema
        </Heading>
        <Text onBackground="neutral-weak">
          Se a demanda é estrutural, a entrada costuma ser um serviço sob medida. Se o problema é
          pontual, pacote, micro-serviço ou ferramenta fazem mais sentido.
        </Text>
        <Row className={styles.ctaBar} gap="12" wrap>
          <Button href={`mailto:${person.email}`} variant="primary" size="m" arrowIcon>
            Conversar sobre o escopo
          </Button>
          <Button href={work.path} variant="secondary" size="m" arrowIcon>
            Ver projetos antes
          </Button>
        </Row>
      </Card>
    </Column>
  );
}
