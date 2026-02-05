import {
  Column,
  Heading,
  Text,
  Button,
  Row,
  Line,
  Schema,
  Grid,
  Tag,
  Card,
} from "@once-ui-system/core";
import { baseURL, person, productsPage, services, servicesPage } from "@/resources";

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
  const serviceFlow = [
    {
      title: "Diagnóstico e direção",
      description:
        "Mapeamento rápido do contexto, objetivos e métricas para definir um plano claro e viável.",
    },
    {
      title: "Execução com foco em conversão",
      description:
        "Design, desenvolvimento e SEO técnico alinhados para performance e resultados reais.",
    },
    {
      title: "Entrega e evolução",
      description:
        "Documentação, handoff e ajustes finos baseados em dados para manter a operação saudável.",
    },
  ];
  const faqs = [
    {
      question: "Consigo começar com um escopo menor?",
      answer:
        "Sim. Podemos iniciar com um diagnóstico ou sprint curto e evoluir conforme o aprendizado.",
    },
    {
      question: "Vocês ajudam com conteúdo e SEO?",
      answer:
        "Sim. Os serviços já incluem SEO técnico e recomendações de conteúdo para acelerar resultados.",
    },
    {
      question: "Quanto tempo leva cada projeto?",
      answer:
        "Depende do escopo, mas normalmente varia entre 2 e 8 semanas com entregas semanais.",
    },
  ];

  const renderList = (items: string[], keyPrefix: string) => (
    <Column as="ul" gap="8">
      {items.map((item, index) => (
        <Text as="li" variant="body-default-s" key={`${keyPrefix}-${index}`}>
          {item}
        </Text>
      ))}
    </Column>
  );

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

      <Column gap="12">
        <Heading as="h1" variant="heading-strong-xl">
          {servicesPage.title}
        </Heading>
        <Text variant="heading-default-xs" onBackground="neutral-weak">
          {servicesPage.intro.headline}
        </Text>

        <Text variant="body-default-m" onBackground="neutral-weak">
          {servicesPage.intro.lead}
        </Text>
      </Column>

      <Grid columns="3" s={{ columns: 1 }} gap="16">
        {serviceFlow.map((step, index) => (
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
            <Heading as="h2" variant="heading-strong-m">
              {step.title}
            </Heading>
            <Text onBackground="neutral-weak">{step.description}</Text>
          </Card>
        ))}
      </Grid>

      <Column
        gap="16"
        padding="24"
        radius="l"
        background="surface"
        style={{
          border: "1px solid var(--neutral-alpha-weak)",
          background: "var(--surface-weak)",
        }}
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
            background="surface"
            style={{
              border: "1px solid var(--neutral-alpha-weak)",
              background: "var(--surface-weak)",
            }}
          >
            <Tag size="s">{service.badge}</Tag>
            <Heading variant="display-strong-s">{service.title}</Heading>
            <Text onBackground="neutral-weak">{service.positioning}</Text>
            <Text onBackground="neutral-weak">{service.hero.description}</Text>
            <Row gap="12">
              <Text variant="label-default-m">{service.hero.price}</Text>
              <Text variant="label-default-m" onBackground="neutral-weak">
                {service.investmentRange}
              </Text>
            </Row>
            <Text variant="body-default-s">{service.summary}</Text>
            <Text variant="label-default-m">Ideal para: {service.idealFor}</Text>
            {service.highlights?.length > 0 && (
              <Row wrap gap="8">
                {service.highlights.map((highlight, index) => (
                  <Tag
                    key={`${service.slug}-highlight-${index}`}
                    size="s"
                    background="neutral-alpha-weak"
                  >
                    {highlight.label}: {highlight.value}
                  </Tag>
                ))}
              </Row>
            )}
            <Line maxWidth="40" />
            <Column gap="8">
              <Text variant="label-default-m">Posicionamento estratégico</Text>
              <Text variant="body-default-s">{service.solution}</Text>
            </Column>
            <Grid columns="3" s={{ columns: 1 }} gap="12">
              <Column
                padding="12"
                radius="m"
                background="page"
                style={{ border: "1px solid var(--neutral-alpha-weak)" }}
                gap="8"
              >
                <Text variant="label-default-s">Entregáveis</Text>
                {renderList(service.deliverables, `${service.slug}-deliverables`)}
              </Column>
              <Column
                padding="12"
                radius="m"
                background="page"
                style={{ border: "1px solid var(--neutral-alpha-weak)" }}
                gap="8"
              >
                <Text variant="label-default-s">Diferenciais</Text>
                {renderList(service.differentiators, `${service.slug}-differentials`)}
              </Column>
              <Column
                padding="12"
                radius="m"
                background="page"
                style={{ border: "1px solid var(--neutral-alpha-weak)" }}
                gap="8"
              >
                <Text variant="label-default-s">Resultados esperados</Text>
                {renderList(service.outcomes, `${service.slug}-outcomes`)}
              </Column>
            </Grid>
            <Column gap="8">
              <Text variant="label-default-m">Como entrego</Text>
              {renderList(service.process, `${service.slug}-process`)}
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
              <Button href={`mailto:oi@henriquereis.dev?subject=${encodeURIComponent(service.title)}`} variant="tertiary">
                Receber orçamento
              </Button>
            </Row>
          </Column>
        ))}
      </Grid>

      <Column
        gap="12"
        padding="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
      >
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
        </Row>
      </Column>

      <Column
        gap="16"
        padding="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
      >
        <Heading as="h2" variant="heading-strong-s">
          Perguntas frequentes
        </Heading>
        <Column gap="12">
          {faqs.map((faq) => (
            <Column key={faq.question} gap="4">
              <Text variant="label-default-m">{faq.question}</Text>
              <Text onBackground="neutral-weak">{faq.answer}</Text>
            </Column>
          ))}
        </Column>
        <Row gap="12" wrap>
          <Button href={`mailto:${person.email}`} variant="primary" size="m" arrowIcon>
            Solicitar proposta
          </Button>
          <Button href="/about" variant="secondary" size="m" arrowIcon>
            Conhecer o estúdio
          </Button>
        </Row>
      </Column>
    </Column>
  );
}

