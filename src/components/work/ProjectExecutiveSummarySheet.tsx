import { Card, Column, Grid, Heading, Row, Tag, Text } from "@once-ui-system/core";

import type { ProjectDashboardSnapshot, ProjectExecutiveSummary } from "@/domain";

import styles from "./ProjectExecutiveSummarySheet.module.scss";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function statusLabel(status: "real" | "estimated" | "projected") {
  if (status === "real") return "Real";
  if (status === "projected") return "Projetado";
  return "Estimado";
}

type Props = {
  summary: ProjectExecutiveSummary;
  snapshot: ProjectDashboardSnapshot;
};

export function ProjectExecutiveSummarySheet({ summary, snapshot }: Props) {
  const followersTrace = snapshot.traces.find((item) => item.key === "followers");
  const reviewsTrace = snapshot.traces.find((item) => item.key === "google-reviews");

  const basicFacts = [
    {
      label: "Cidade",
      value: snapshot.cityLabel,
      meta: snapshot.cityProfile,
    },
    {
      label: "Segmento",
      value: snapshot.segmentName,
      meta: snapshot.benchmarkLabel,
    },
    {
      label: "Seguidores",
      value: followersTrace ? formatCompact(followersTrace.value) : "n/d",
      meta: followersTrace ? statusLabel(followersTrace.classification) : "Sem base",
    },
    {
      label: "Reviews Google",
      value: reviewsTrace ? formatCompact(reviewsTrace.value) : "n/d",
      meta: reviewsTrace ? statusLabel(reviewsTrace.classification) : "Sem base",
    },
    {
      label: "Mercado elegivel",
      value: formatCompact(snapshot.report.derivedMetrics.eligibleMarket),
      meta: "Derivado",
    },
    {
      label: "Receita realista / mes",
      value: formatCurrency(snapshot.report.scenarios.realistic.revenue),
      meta: "Projetado",
    },
  ];

  const scoreItems = [
    {
      label: "Presenca Local",
      value: `${summary.scorecard.localPresence}/10`,
    },
    {
      label: "Autoridade Social",
      value: `${summary.scorecard.socialAuthority}/10`,
    },
    {
      label: "Humanizacao da Marca",
      value: `${summary.scorecard.brandHumanization}/10`,
    },
    {
      label: "Estrategia de Conteudo",
      value: `${summary.scorecard.contentStrategy}/10`,
    },
    {
      label: "Identidade Visual",
      value: `${summary.scorecard.visualIdentity}/10`,
    },
    {
      label: "Potencial de Crescimento",
      value: summary.scorecard.growthPotential,
    },
  ];

  return (
    <div className={styles.sheet}>
      <Column gap="20">
        <Column className={styles.hero} gap="16">
          <Row gap="8" wrap>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Resumo executivo
            </Tag>
            <Tag size="s" background="neutral-alpha-weak">
              PDF friendly
            </Tag>
          </Row>
          <Heading as="h1" variant="display-strong-s">
            {summary.title}
          </Heading>
          <Text variant="heading-default-m" onBackground="neutral-weak">
            {snapshot.clientName}
          </Text>
          <Text onBackground="neutral-weak">{summary.summary}</Text>
        </Column>

        <Grid className={styles.basicGrid} columns="3" s={{ columns: 1 }} gap="12">
          {basicFacts.map((item) => (
            <Card
              key={item.label}
              className={styles.infoCard}
              direction="column"
              gap="8"
              padding="20"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
            >
              <Text variant="label-default-s" onBackground="neutral-weak">
                {item.label}
              </Text>
              <Text variant="heading-strong-m">{item.value}</Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {item.meta}
              </Text>
            </Card>
          ))}
        </Grid>

        <Card
          className={styles.block}
          direction="column"
          gap="12"
          padding="20"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
        >
          <Tag size="s" background="neutral-alpha-weak">
            Resumo executivo
          </Tag>
          <Column as="ul" className={styles.list} gap="8">
            {summary.businessSummary.map((item) => (
              <Text as="li" key={item} variant="body-default-s">
                {item}
              </Text>
            ))}
          </Column>
        </Card>

        <Grid className={styles.scoreGrid} columns="3" s={{ columns: 2 }} gap="12">
          {scoreItems.map((item) => (
            <Card
              key={item.label}
              className={styles.scoreCard}
              direction="column"
              gap="8"
              padding="20"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
            >
              <Text variant="label-default-s" onBackground="neutral-weak">
                {item.label}
              </Text>
              <Heading as="h2" variant="heading-strong-m">
                {item.value}
              </Heading>
            </Card>
          ))}
        </Grid>

        <Column gap="16">
          {summary.sections.map((section) => (
            <Card
              key={section.id}
              className={styles.sectionCard}
              direction="column"
              gap="16"
              padding="20"
              radius="l"
              background="surface"
              border="neutral-alpha-weak"
            >
              <Column gap="8">
                <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                  Ponto critico
                </Tag>
                <Heading as="h2" variant="heading-strong-m">
                  {section.title}
                </Heading>
                <Text onBackground="neutral-weak">{section.problem}</Text>
              </Column>

              <Grid columns="2" s={{ columns: 1 }} gap="12">
                <div className={styles.subBlock}>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    Impacto
                  </Text>
                  <Column as="ul" className={styles.list} gap="8">
                    {section.impact.map((item) => (
                      <Text as="li" key={item} variant="body-default-s">
                        {item}
                      </Text>
                    ))}
                  </Column>
                </div>

                <div className={styles.subBlock}>
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    Melhoria
                  </Text>
                  <Column as="ul" className={styles.list} gap="8">
                    {section.improvement.map((item) => (
                      <Text as="li" key={item} variant="body-default-s">
                        {item}
                      </Text>
                    ))}
                  </Column>
                </div>
              </Grid>

              <div className={styles.diagnosisBar}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Diagnostico
                </Text>
                <Text variant="body-default-m">{section.diagnosis}</Text>
              </div>
            </Card>
          ))}
        </Column>

        <Card
          className={styles.block}
          direction="column"
          gap="12"
          padding="20"
          radius="l"
          background="surface"
          border="neutral-alpha-weak"
        >
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Fechamento
          </Tag>
          <Text onBackground="neutral-weak">{summary.closingNote}</Text>
        </Card>
      </Column>
    </div>
  );
}
