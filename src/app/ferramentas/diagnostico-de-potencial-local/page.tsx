import { Button, Card, Column, Grid, Heading, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { LocalGrowthDiagnostic } from "@/components/tools/LocalGrowthDiagnostic";
import { baseURL, freeTools, person, toolsPage } from "@/resources";

import sectionStyles from "../../section.module.scss";
import styles from "../ferramentas.module.scss";

function getTool() {
  const tool = freeTools.find((item) => item.slug === "diagnostico-de-potencial-local");

  if (!tool) {
    throw new Error("Ferramenta 'diagnostico-de-potencial-local' nao encontrada.");
  }

  return tool;
}

const tool = getTool();

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

export default function LocalPotentialDiagnosticPage() {
  const signals = [
    {
      label: "Saída principal",
      value: "Diagnóstico + cenários + PDF",
      description: "A ferramenta transforma dados soltos em leitura comercial apresentável.",
    },
    {
      label: "Fontes combinadas",
      value: "Empresa, social, Google, ads e mercado",
      description: "Quando faltar dado, benchmarks do nicho entram sem quebrar a análise.",
    },
    {
      label: "Uso ideal",
      value: "Negócios e serviços locais",
      description: "Especialmente útil para estética, salão, podologia e operações com agenda.",
    },
  ];

  const fitCases = [
    "Quando você precisa mostrar potencial de crescimento antes de fechar a proposta.",
    "Quando quer comparar cenário atual, conservador, realista e agressivo com base na capacidade da operação.",
    "Quando precisa apresentar um relatório mais profissional para vendas consultivas, CRM, mídia e retenção.",
  ];

  const guidance = [
    "Os resultados ficam melhores com dados reais, mas a ferramenta continua útil mesmo com informações parciais.",
    "Capacidade operacional, saturação local e recorrência entram no cálculo para evitar projeções infladas.",
    "O relatório em PDF usa a própria visualização da tela, então vale revisar os dados antes de exportar.",
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
              <Button href="#diagnostico" variant="primary" size="m" arrowIcon>
                Abrir diagnóstico
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
                  <Text className={styles.heroEyebrow} variant="label-default-s" onBackground="neutral-weak">
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
        id="diagnostico"
        gap="16"
        padding="24"
        radius="l"
        background="surface"
        style={{ background: "var(--surface-weak)" }}
      >
        <Column gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Diagnóstico e projeção
          </Tag>
          <Heading as="h2" variant="display-strong-s">
            Insira os dados básicos e receba cenários, gráficos e relatório
          </Heading>
          <Text onBackground="neutral-weak">
            A ferramenta aceita dados da empresa, social, Google local, mídia paga e mercado para devolver uma leitura comercial utilizável em proposta e apresentação.
          </Text>
        </Column>

        <LocalGrowthDiagnostic />
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
            Você precisa transformar dados dispersos em argumento comercial
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
            Como ler a saída
          </Tag>
          <Heading as="h2" variant="heading-strong-m">
            O objetivo é comparar contexto, capacidade e crescimento com menos improviso
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
    </Column>
  );
}
