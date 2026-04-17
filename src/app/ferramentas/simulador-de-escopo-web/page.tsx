import { Button, Card, Column, Grid, Heading, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { WebsiteEstimator } from "@/components/services/WebsiteEstimator";
import { baseURL, freeTools, person, productsPage, services, toolsPage } from "@/resources";

import sectionStyles from "../../section.module.scss";
import styles from "../ferramentas.module.scss";

function getTool() {
  const tool = freeTools.find((item) => item.slug === "simulador-de-escopo-web");

  if (!tool) {
    throw new Error("Ferramenta 'simulador-de-escopo-web' nao encontrada.");
  }

  return tool;
}

const tool = getTool();
const websiteService = services.find((item) => item.slug === "websites-profissionais");

const contactHref = websiteService?.hero.ctaHref ?? `mailto:${person.email}`;
const contactLabel = websiteService?.hero.ctaLabel ?? "Conversar sobre o projeto";

export async function generateMetadata() {
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: `${baseURL}${tool.path}` },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url: `${baseURL}${tool.path}`,
      images: [{ url: `/api/og/generate?title=${encodeURIComponent(tool.title)}` }],
    },
  };
}

export default function WebScopeEstimatorPage() {
  const signals = [
    {
      label: "Uso ideal",
      value: "Landing, institucional e e-commerce",
      description: "Ajuda a comparar formatos de projeto antes de abrir escopo completo.",
    },
    {
      label: "Saída",
      value: "Faixa inicial de investimento",
      description: "O resultado serve como norte para conversar com mais contexto e menos chute.",
    },
    {
      label: "Formato",
      value: "Simulação rápida",
      description: "Você escolhe o tipo de projeto, soma módulos e lê a faixa em poucos minutos.",
    },
  ];

  const fitCases = [
    "Quando você quer entender se o projeto cabe no momento atual do negócio.",
    "Quando precisa comparar uma landing page com um site maior ou um e-commerce.",
    "Quando quer chegar ao briefing com noção melhor de complexidade e prioridades.",
  ];

  const guidance = [
    "A faixa não substitui proposta fechada; ela organiza uma primeira leitura de escopo.",
    "Integrações, volume de conteúdo e regras específicas podem empurrar o projeto para cima ou para baixo.",
    "Se parte do conteúdo ou da identidade já estiver pronta, o investimento final pode cair.",
  ];

  return (
    <Column className={sectionStyles.page} maxWidth="m" paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={tool.title}
        description={tool.description}
        path={tool.path}
        image={`/api/og/generate?title=${encodeURIComponent(tool.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${tool.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column className={styles.hero} gap="24" padding="24">
        <Grid className={styles.heroGrid} columns="2" s={{ columns: 1 }} gap="20">
          <Column className={styles.heroMain} gap="16">
            <Row gap="8" wrap>
              <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                Ferramenta gratuita
              </Tag>
              <Tag size="s" background="neutral-alpha-weak">
                {tool.status}
              </Tag>
            </Row>
            <Heading as="h1" variant="heading-strong-xl">
              {tool.title}
            </Heading>
            <div className={sectionStyles.accentLine} />
            <Text variant="heading-default-m" onBackground="neutral-weak" wrap="balance">
              {tool.summary}
            </Text>
            <Text onBackground="neutral-weak">{tool.description}</Text>
            <Row className={styles.ctaBar} gap="12" wrap>
              <Button href="#simulador" variant="primary" size="m" arrowIcon>
                Ir para o simulador
              </Button>
              <Button href={toolsPage.path} variant="secondary" size="m" arrowIcon>
                Voltar para ferramentas
              </Button>
            </Row>
          </Column>

          <Column className={styles.heroAside} gap="12">
            <Grid className={styles.signalGrid} columns="1" gap="12">
              {signals.map((item) => (
                <Column key={item.label} className={styles.signalCard} gap="8" padding="16">
                  <Text
                    className={styles.heroEyebrow}
                    variant="label-default-s"
                    onBackground="neutral-weak"
                  >
                    {item.label}
                  </Text>
                  <Text variant="heading-strong-m" wrap="balance">
                    {item.value}
                  </Text>
                  <Text variant="body-default-s" onBackground="neutral-weak">
                    {item.description}
                  </Text>
                </Column>
              ))}
            </Grid>
          </Column>
        </Grid>
      </Column>

      <Column
        className={`${sectionStyles.sectionPanel} ${styles.toolAnchor}`}
        id="simulador"
        gap="16"
        padding="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
      >
        <Column gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Estimativa inicial
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Monte uma faixa rápida de investimento
          </Heading>
          <Text onBackground="neutral-weak">
            Escolha o tipo de projeto e os módulos desejados para sair com uma leitura inicial mais
            clara.
          </Text>
        </Column>

        <WebsiteEstimator
          ctaHref={contactHref}
          ctaLabel={contactLabel}
          contactEmail={person.email}
        />
      </Column>

      <Grid className={styles.detailGrid} columns="2" s={{ columns: 1 }} gap="16">
        <Card
          className={styles.detailCard}
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
            Bom para usar quando
          </Tag>
          <Heading as="h2" variant="heading-strong-m">
            Você precisa de um norte antes do briefing
          </Heading>
          <Column as="ul" className={styles.list} gap="8">
            {fitCases.map((item) => (
              <Text as="li" key={item} variant="body-default-s">
                {item}
              </Text>
            ))}
          </Column>
        </Card>

        <Card
          className={styles.detailCard}
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
            Como ler o resultado
          </Tag>
          <Heading as="h2" variant="heading-strong-m">
            A faixa serve como leitura inicial, não como proposta fechada
          </Heading>
          <Column as="ul" className={styles.list} gap="8">
            {guidance.map((item) => (
              <Text as="li" key={item} variant="body-default-s">
                {item}
              </Text>
            ))}
          </Column>
        </Card>
      </Grid>

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
          Próximo passo
        </Tag>
        <Heading as="h2" variant="display-strong-s">
          Se a faixa fizer sentido, eu transformo isso em escopo claro
        </Heading>
        <Text onBackground="neutral-weak">
          O simulador ajuda a reduzir improviso, mas a proposta final depende do contexto real, das
          integrações e do volume de conteúdo.
        </Text>
        <Row className={styles.ctaBar} gap="12" wrap>
          <Button href={contactHref} variant="primary" size="m" arrowIcon>
            {contactLabel}
          </Button>
          <Button href={productsPage.path} variant="secondary" size="m" arrowIcon>
            Ver catálogo completo
          </Button>
        </Row>
      </Card>
    </Column>
  );
}
