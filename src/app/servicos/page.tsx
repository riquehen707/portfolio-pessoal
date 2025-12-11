import { Column, Heading, Text, Button, Row, Line, Schema, Grid, Tag } from "@once-ui-system/core";
import { baseURL, person, productsPage, services, servicesPage, admin } from "@/resources";

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

export default function ServicesPage() {
  const pillars = [
    "Visibilidade",
    "Praticidade",
    "Economia de Tempo",
    "Velocidade",
    "Autoridade",
    "Profissionalismo",
    "Conversão",
    "Credibilidade",
  ];

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
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

      <Heading as="h1" variant="heading-strong-xl">
        {servicesPage.title}
      </Heading>
      <Text variant="heading-default-xs" onBackground="neutral-weak">
        {servicesPage.intro.headline}
      </Text>

      <Text variant="body-default-m" onBackground="neutral-weak">
        {servicesPage.intro.lead}
      </Text>

      <Column
        gap="16"
        padding="24"
        radius="l"
        background="surface-weak"
        style={{ border: "1px solid var(--neutral-alpha-weak)" }}
      >
        <Heading as="h2" variant="heading-strong-s">
          Oito pilares estratégicos
        </Heading>
        <Text onBackground="neutral-weak">
          Cada serviço usa estes pilares como base para posicionamento, arquitetura e entrega.
        </Text>
        <Row wrap gap="8">
          {pillars.map((pillar) => (
            <Tag key={pillar} size="s">
              {pillar}
            </Tag>
          ))}
        </Row>
      </Column>

      <Grid columns="1" gap="0">
        {services.map((service) => (
          <Column
            key={service.slug}
            gap="16"
            padding="32"
            radius="l"
            background="surface-weak"
            style={{ border: "1px solid var(--neutral-alpha-weak)" }}
          >
            <Tag size="s">{service.badge}</Tag>
            <Heading variant="display-strong-s">{service.title}</Heading>
            <Text onBackground="neutral-weak">{service.positioning}</Text>
            <Row gap="12">
              <Text variant="label-default-m">{service.hero.price}</Text>
              <Text variant="label-default-m" onBackground="neutral-weak">
                {service.investmentRange}
              </Text>
            </Row>
            <Text variant="body-default-s">{service.summary}</Text>
            <Text variant="label-default-m">Ideal para: {service.idealFor}</Text>
            <Line maxWidth="40" />
            <Column gap="8">
              <Text variant="label-default-m">Posicionamento estratégico</Text>
              <Text variant="body-default-s">{service.solution}</Text>
            </Column>
            <Grid columns="2" s={{ columns: 1 }} gap="12">
              {service.pillars.map((pillar) => (
                <Column
                  key={pillar.title}
                  padding="12"
                  radius="m"
                  background="page"
                  style={{ border: "1px solid var(--neutral-alpha-weak)" }}
                >
                  <Text variant="label-default-s">{pillar.title}</Text>
                  <Text variant="body-default-s">{pillar.detail}</Text>
                </Column>
              ))}
            </Grid>
            <Row gap="16" wrap>
              <Button href={`${servicesPage.path}/${service.slug}`} variant="primary" size="m" arrowIcon>
                Ver landing completa
              </Button>
              <Button href={`mailto:oi@henriquereis.dev?subject=${encodeURIComponent(service.title)}`} variant="ghost">
                Receber orçamento
              </Button>
            </Row>
          </Column>
        ))}
      </Grid>

      <Column gap="12" padding="24" radius="l" background="surface-weak">
        <Heading as="h2" variant="heading-strong-s">
          Categoria Especial — Soluções Prontas / Kits Profissionais
        </Heading>
        <Text onBackground="neutral-weak">
          {productsPage.note} {productsPage.cta}
        </Text>
        <Text variant="label-default-m">Faixa de valores: R$ 15 a R$ 450</Text>
        <Row gap="12" wrap>
          <Button href={productsPage.path} variant="primary" size="m" arrowIcon>
            Ver kits profissionais
          </Button>
          <Button href={admin.path} variant="secondary" size="m" arrowIcon>
            Ver plataforma de dados (admin)
          </Button>
        </Row>
      </Column>
    </Column>
  );
}
