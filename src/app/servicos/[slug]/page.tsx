import { notFound } from "next/navigation";
import { Column, Heading, Text, Button, Row, Line, Schema, Tag, Grid } from "@once-ui-system/core";

import { baseURL, person, servicesPage, services } from "@/resources";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) return {};

  return {
    title: `${service.title} | ${servicesPage.title}`,
    description: service.summary,
    alternates: { canonical: `${baseURL}${servicesPage.path}/${service.slug}` },
    openGraph: {
      title: `${service.title} | ${servicesPage.title}`,
      description: service.summary,
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

  return (
    <Column maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={`${service.title} | ${servicesPage.title}`}
        description={service.summary}
        path={`${servicesPage.path}/${service.slug}`}
        image={`/api/og/generate?title=${encodeURIComponent(service.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${servicesPage.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column gap="12">
        <Tag>{service.badge}</Tag>
        <Heading as="h1" variant="heading-strong-xl">
          {service.title}
        </Heading>
        <Text onBackground="neutral-weak">{service.summary}</Text>
        <Text variant="label-default-m">{service.positioning}</Text>
        <Row gap="20">
          <Text variant="heading-strong-m">{service.hero.price}</Text>
          <Text onBackground="neutral-weak">{service.hero.budget}</Text>
        </Row>
        <Text variant="label-default-m" onBackground="neutral-weak">
          {service.idealFor}
        </Text>
        <Row gap="12">
          <Text variant="label-default-m">{service.hero.duration}</Text>
          <Text variant="label-default-m" onBackground="neutral-weak">
            {service.hero.highlight}
          </Text>
        </Row>
        <Text variant="body-default-s">{service.hero.description}</Text>
        <Line maxWidth={56} />
        <Button href={service.hero.ctaHref} variant="primary" size="m" arrowIcon>
          {service.hero.ctaLabel}
        </Button>
      </Column>

      {/* Seções */}
      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          Solução em destaque
        </Heading>
        <Text variant="body-default-s">{service.solution}</Text>
        <Text variant="label-default-m">Faixa de investimento: {service.investmentRange}</Text>
        <Text variant="label-default-m" onBackground="neutral-weak">
          Principais entregas rápidas: {service.hero.price} · {service.hero.duration}
        </Text>
      </Column>

      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          O que entregamos
        </Heading>
        <Column as="ul" gap="4">
          {service.deliverables.map((item) => (
            <Text key={item} as="li" variant="body-default-s">
              {item}
            </Text>
          ))}
        </Column>
      </Column>

      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          Diferenças que importam
        </Heading>
        <Column as="ul" gap="4">
          {service.differentiators.map((item) => (
            <Text key={item} as="li" variant="body-default-s">
              {item}
            </Text>
          ))}
        </Column>
      </Column>

      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          Processo
        </Heading>
        <Column as="ol" gap="4">
          {service.process.map((step) => (
            <Text key={step} as="li" variant="body-default-s">
              {step}
            </Text>
          ))}
        </Column>
      </Column>

      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          Resultados esperados
        </Heading>
        <Column as="ul" gap="4">
          {service.outcomes.map((outcome) => (
            <Text key={outcome} as="li" variant="body-default-s">
              {outcome}
            </Text>
          ))}
        </Column>
      </Column>

      <Column gap="8">
        <Heading as="h2" variant="heading-strong-s">
          Pilares aplicados
        </Heading>
        <Grid columns="2" s={{ columns: 1 }} gap="12">
          {service.pillars.map((pillar) => (
            <Column
              key={pillar.title}
              padding="12"
              radius="m"
              background="surface"
              style={{
                border: "1px solid var(--neutral-alpha-weak)",
                background: "var(--surface-weak)",
              }}
            >
              <Text variant="label-default-s">{pillar.title}</Text>
              <Text variant="body-default-s">{pillar.detail}</Text>
            </Column>
          ))}
        </Grid>
        <Row gap="16" wrap>
          {service.highlights.map((highlight) => (
            <Column
              key={highlight.label}
              padding="12"
              background="page"
              radius="m"
              style={{ border: "1px solid var(--neutral-alpha-weak)" }}
            >
              <Text variant="label-default-s" onBackground="neutral-weak">
                {highlight.label}
              </Text>
              <Text variant="heading-strong-s">{highlight.value}</Text>
            </Column>
          ))}
        </Row>
      </Column>
    </Column>
  );
}
