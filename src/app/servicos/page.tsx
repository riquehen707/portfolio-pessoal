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
} as const;

export default function ServicesPage() {
  const offerCounts = {
    package: products.filter((item) => item.category === "package").length,
    microservice: products.filter((item) => item.category === "microservice").length,
  };
  const serviceSignals = [
    {
      label: "Sob medida",
      value: `${services.length} frentes principais`,
      description: "Web, SEO, automação e landings pensadas para contexto real.",
    },
    {
      label: "Entradas rápidas",
      value: `${offerCounts.package + offerCounts.microservice} formatos`,
      description: "Pacotes e micro-serviços para quando você precisa resolver algo sem alongar demais.",
    },
    {
      label: "Escolha",
      value: "Comece pelo problema",
      description: "O formato certo fica claro quando a necessidade está bem definida.",
    },
  ];

  const lanes = [
    {
      label: "Sob medida",
      title: "Projetos sob medida",
      description: "Para site, SEO ou automação quando o problema pede leitura mais cuidadosa e solução feita para o seu caso.",
      meta: `${services.length} serviços principais`,
      href: servicesPage.path,
      cta: "Ver serviços",
    },
    {
      label: "Entrada fechada",
      title: "Pacotes",
      description: "Escopos mais fechados para resolver algo comum com mais rapidez e menos atrito.",
      meta: `${offerCounts.package} opções`,
      href: productsPage.path,
      cta: "Ver pacotes",
    },
    {
      label: "Ajuste pontual",
      title: "Micro-serviços",
      description: "Entregas menores para corrigir, refinar ou destravar um ponto específico sem virar projeto grande.",
      meta: `${offerCounts.microservice} opções`,
      href: productsPage.path,
      cta: "Ver micro-serviços",
    },
  ];

  const offerHighlights = [
    {
      title: "Pacotes para entrar sem abrir projeto maior",
      description:
        "Uma boa porta de entrada para quem precisa sair do zero sem abrir um projeto maior de cara.",
      meta: `${offerCounts.package} pacotes`,
    },
    {
      title: "Micro-serviços técnicos",
      description:
        "Úteis para refino visual, SEO técnico, Core Web Vitals ou integrações pontuais.",
      meta: `${offerCounts.microservice} micro-serviços`,
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

      <Column className={styles.hero} gap="24" padding="24">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Serviços
            </Tag>
            <Heading as="h1" variant="heading-strong-xl">
              {servicesPage.title}
            </Heading>
            <div className={sectionStyles.accentLine} />
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              {servicesPage.intro.headline}
            </Text>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {servicesPage.intro.lead}
            </Text>
            <Row className={styles.heroActions} gap="12" wrap>
              <Button href={productsPage.path} variant="primary" size="m" arrowIcon>
                Ver pacotes
              </Button>
              <Button href={work.path} variant="secondary" size="m" arrowIcon>
                Ver projetos
              </Button>
            </Row>
          </Column>

          <Column className={styles.heroAside} gap="16">
            <Column className={styles.heroPanel} gap="12">
              <Text className={styles.heroEyebrow} variant="label-default-s" onBackground="neutral-weak">
                Escolha rápida
              </Text>
              <Text variant="heading-strong-m" wrap="balance">
                O melhor ponto de entrada depende mais do problema do que do nome do serviço.
              </Text>
              <Text onBackground="neutral-weak">
                Se você precisa de uma página nova, de um ajuste pontual ou de uma ferramenta para destravar a rotina,
                esta página já separa os caminhos para facilitar sua decisão.
              </Text>
            </Column>

            <Grid className={styles.signalGrid} columns="2" s={{ columns: 1 }} gap="12">
              {serviceSignals.map((item) => (
                <Column key={item.label} className={styles.signalCard} gap="8">
                  <Text className={styles.heroEyebrow} variant="label-default-s" onBackground="neutral-weak">
                    {item.label}
                  </Text>
                  <Text variant="heading-strong-s">{item.value}</Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {item.description}
                  </Text>
                </Column>
              ))}
            </Grid>
          </Column>
        </Grid>
      </Column>

      <Grid className={styles.lanesGrid} columns="2" s={{ columns: 1 }} gap="16">
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
            Cada serviço mostra o que ele resolve, para quem faz mais sentido e qual costuma ser o melhor ponto de partida.
          </Text>
        </Column>

        <Grid className={styles.servicesGrid} columns="2" s={{ columns: 1 }} gap="16">
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
                Ver detalhes
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
            Pacotes e micro-serviços
          </Heading>
          <Text onBackground="neutral-weak">
            Nem toda demanda precisa virar projeto completo. Às vezes o que você precisa é só do próximo passo certo.
          </Text>
        </Column>

        <Grid columns="2" s={{ columns: 1 }} gap="16">
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
                {index === 0 ? categoryLabels.package : categoryLabels.microservice}
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
          Se a demanda é mais estrutural, a entrada costuma ser um serviço sob medida. Se o problema é
          pontual, pacote ou micro-serviço costumam fazer mais sentido.
        </Text>
        <Row className={styles.ctaBar} gap="12" wrap>
          <Button href={`mailto:${person.email}`} variant="primary" size="m" arrowIcon>
            Conversar sobre o escopo
          </Button>
          <Button href={work.path} variant="secondary" size="m" arrowIcon>
            Ver projetos
          </Button>
        </Row>
      </Card>
    </Column>
  );
}
