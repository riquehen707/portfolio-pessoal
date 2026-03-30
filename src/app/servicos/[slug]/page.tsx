import { notFound } from "next/navigation";
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

import BeautyServiceLanding from "@/components/services/BeautyServiceLanding";
import CreativeServiceLanding from "@/components/services/CreativeServiceLanding";
import { WebsiteEstimator } from "@/components/services/WebsiteEstimator";
import { baseURL, person, services, servicesPage } from "@/resources";

import sectionStyles from "../../section.module.scss";
import styles from "../services.module.scss";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};

  const metaTitle = service.seo?.title ?? `${service.title} | ${servicesPage.title}`;
  const metaDescription = service.seo?.description ?? service.summary;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: service.seo?.keywords,
    alternates: { canonical: `${baseURL}${servicesPage.path}/${service.slug}` },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${baseURL}${servicesPage.path}/${service.slug}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(service.title)}` }],
    },
  };
}

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) notFound();

  const metaTitle = service.seo?.title ?? `${service.title} | ${servicesPage.title}`;
  const metaDescription = service.seo?.description ?? service.summary;

  if (service.layout === "beauty") {
    return (
      <BeautyServiceLanding
        service={service}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />
    );
  }

  if (service.layout === "creative") {
    return (
      <CreativeServiceLanding
        service={service}
        metaTitle={metaTitle}
        metaDescription={metaDescription}
      />
    );
  }

  const heroStats = [
    { label: "Investimento inicial", value: service.hero.price },
    { label: "Prazo típico", value: service.hero.duration },
    { label: "Formato", value: service.scopes[0]?.title ?? "Sob medida" },
  ];

  return (
    <Column className={sectionStyles.page} maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={metaTitle}
        description={metaDescription}
        path={`${servicesPage.path}/${service.slug}`}
        image={`/api/og/generate?title=${encodeURIComponent(service.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${servicesPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Card
        className={sectionStyles.heroGlow}
        direction="column"
        gap="16"
        paddingX="24"
        paddingY="24"
        radius="l"
        background="surface"
        border="neutral-alpha-weak"
        style={{ background: "var(--surface-weak)" }}
      >
        <Row gap="8" wrap>
          <Tag>{service.badge}</Tag>
          {service.tags.map((tag) => (
            <Tag key={`${service.slug}-${tag}`} size="s" background="neutral-alpha-weak">
              {tag}
            </Tag>
          ))}
        </Row>

        <Heading as="h1" variant="heading-strong-xl">
          {service.title}
        </Heading>
        <div className={sectionStyles.accentLine} />
        <Text onBackground="neutral-weak">{service.summary}</Text>
        <Text variant="body-default-s" onBackground="neutral-weak">
          {service.hero.description}
        </Text>

        <Grid columns="3" s={{ columns: 1 }} gap="12">
          {heroStats.map((stat) => (
            <Card
              className={styles.statCard}
              key={stat.label}
              direction="column"
              gap="8"
              paddingX="16"
              paddingY="16"
              radius="m"
              background="surface"
              border="neutral-alpha-weak"
            >
              <Text variant="label-default-s" onBackground="neutral-weak">
                {stat.label}
              </Text>
              <Text variant="heading-strong-m">{stat.value}</Text>
            </Card>
          ))}
        </Grid>

        <Text variant="label-default-m" onBackground="neutral-weak">
          Indicado para: {service.audience}
        </Text>

        <Row className={styles.heroActions} gap="12" wrap>
          <Button href={service.hero.ctaHref} variant="primary" size="m" arrowIcon>
            {service.hero.ctaLabel}
          </Button>
          <Button href="/work" variant="secondary" size="m" arrowIcon>
            Ver projetos
          </Button>
        </Row>
      </Card>

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
            O que esse serviço resolve
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Ganhos práticos
          </Heading>
        </Column>

        <Grid columns="3" s={{ columns: 1 }} gap="16">
          {service.keyPoints.map((item) => (
            <Card
              className={styles.statCard}
              key={`${service.slug}-${item}`}
              direction="column"
              gap="8"
              paddingX="20"
              paddingY="20"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
              fillHeight
            >
              <Text onBackground="neutral-weak">{item}</Text>
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
            Escopos comuns
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Formatos de entrega
          </Heading>
          <Text onBackground="neutral-weak">
            Cada formato muda profundidade, prazo e investimento. A entrada pode ser menor e crescer
            conforme a necessidade real do projeto.
          </Text>
        </Column>

        <Grid columns="3" s={{ columns: 1 }} gap="16">
          {service.scopes.map((scope) => (
            <Card
              className={styles.serviceCard}
              key={`${service.slug}-${scope.title}`}
              direction="column"
              gap="12"
              paddingX="20"
              paddingY="20"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
              fillHeight
            >
              <Heading as="h3" variant="heading-strong-m">
                {scope.title}
              </Heading>
              <Text onBackground="neutral-weak">{scope.summary}</Text>
              <Text className={styles.serviceMeta} variant="body-default-s" onBackground="neutral-weak">
                {scope.investment} | {scope.timeline}
              </Text>
              <Column as="ul" className={styles.list} gap="8">
                {scope.includes.map((item) => (
                  <Text as="li" key={`${scope.title}-${item}`} variant="body-default-s">
                    {item}
                  </Text>
                ))}
              </Column>
            </Card>
          ))}
        </Grid>
      </Column>

      <Grid columns="2" s={{ columns: 1 }} gap="16">
        <Card
          className={styles.serviceCard}
          direction="column"
          gap="12"
          paddingX="20"
          paddingY="20"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
        >
          <Tag size="s" background="neutral-alpha-weak">
            Escopo base
          </Tag>
          <Heading as="h2" variant="heading-strong-m">
            O que está incluído
          </Heading>
          <Column as="ul" className={styles.list} gap="8">
            {service.includes.map((item) => (
              <Text as="li" key={`${service.slug}-${item}`} variant="body-default-s">
                {item}
              </Text>
            ))}
          </Column>
        </Card>

        <Card
          className={styles.serviceCard}
          direction="column"
          gap="12"
          paddingX="20"
          paddingY="20"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
        >
          <Tag size="s" background="neutral-alpha-weak">
            Como funciona
          </Tag>
          <Heading as="h2" variant="heading-strong-m">
            Processo resumido
          </Heading>
          <Column as="ol" className={styles.list} gap="8">
            {service.process.map((item) => (
              <Text as="li" key={`${service.slug}-${item}`} variant="body-default-s">
                {item}
              </Text>
            ))}
          </Column>
        </Card>
      </Grid>

      {service.estimator && (
        <Column
          className={`${sectionStyles.sectionPanel} ${styles.estimatorAnchor}`}
          gap="16"
          id="estimativa-rapida"
          padding="24"
          radius="l"
          background="surface"
          style={{ background: "var(--surface-weak)" }}
        >
          <Column gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Ferramenta gratuita
            </Tag>
            <Heading as="h2" variant="display-strong-s">
              Estimativa rápida de escopo
            </Heading>
            <Text onBackground="neutral-weak">
              O simulador ajuda a comparar tipos de projeto e módulos antes de abrir um briefing completo.
            </Text>
          </Column>

          <WebsiteEstimator
            ctaHref={service.hero.ctaHref}
            ctaLabel={service.hero.ctaLabel}
            contactEmail={person.email}
          />
        </Column>
      )}

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
            Perguntas frequentes
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            O essencial antes de contratar
          </Heading>
        </Column>

        <Column gap="12">
          {service.faq.map((item) => (
            <Card
              className={styles.faqCard}
              key={`${service.slug}-${item.question}`}
              direction="column"
              gap="8"
              paddingX="20"
              paddingY="20"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
            >
              <Text variant="label-default-m">{item.question}</Text>
              <Text onBackground="neutral-weak">{item.answer}</Text>
            </Card>
          ))}
        </Column>
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
          Próxima etapa
        </Tag>
        <Heading as="h2" variant="display-strong-s">
          Se fizer sentido, eu transformo isso em um escopo claro
        </Heading>
        <Text onBackground="neutral-weak">
          O melhor ponto de partida não é uma lista grande de funcionalidades. É o problema real do negócio.
        </Text>
        <Row className={styles.heroActions} gap="12" wrap>
          <Button href={service.hero.ctaHref} variant="primary" size="m" arrowIcon>
            {service.hero.ctaLabel}
          </Button>
          <Button href={`mailto:${person.email}`} variant="tertiary" size="m" arrowIcon>
            Enviar contexto por e-mail
          </Button>
        </Row>
      </Card>
    </Column>
  );
}
