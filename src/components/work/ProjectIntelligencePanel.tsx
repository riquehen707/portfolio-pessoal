"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, Column, Grid, Heading, Row, Tag, Text } from "@once-ui-system/core";

import type { ProjectDashboardSnapshot } from "@/domain";

import styles from "./ProjectIntelligencePanel.module.scss";

type ViewKey = "proposals" | "timeline" | "return" | "funnel" | "precision" | "coverage";
type ScenarioKey = keyof ProjectDashboardSnapshot["report"]["scenarios"];

const CHART_GRID_STROKE = "rgba(255,255,255,0.08)";
const CHART_AXIS_STROKE = "rgba(255,255,255,0.45)";
const CHART_COLORS = {
  conservative: "#6fa8ff",
  realistic: "#5ed492",
  aggressive: "#f2c66d",
} as const;

const viewOptions: Array<{ id: ViewKey; label: string; description: string }> = [
  {
    id: "proposals",
    label: "Propostas",
    description: "Compara o retorno liquido acumulado em 12 meses entre as propostas comerciais disponiveis.",
  },
  {
    id: "timeline",
    label: "Tempo",
    description: "Mostra o retorno mes a mes da proposta selecionada ate o payback e a acumulacao anual.",
  },
  {
    id: "return",
    label: "Retorno",
    description: "Relaciona investimento, retorno anual e retorno liquido para comparar o peso de cada proposta.",
  },
  {
    id: "funnel",
    label: "Impacto",
    description: "Resume o ganho incremental potencial em leads, agendas, comparecimentos e clientes extras.",
  },
  {
    id: "precision",
    label: "Precisao",
    description: "Explica a confianca relativa de cada proposta a partir da cobertura e da certeza observada.",
  },
  {
    id: "coverage",
    label: "Base",
    description: "Mostra quais secoes do diagnostico estao melhor observadas e quais dependem mais de estimativa.",
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number, maximumFractionDigits = 0) {
  return new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits,
  }).format(value);
}

function formatCompact(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatCompactCurrency(value: number) {
  return `R$ ${formatCompact(value)}`;
}

function formatPercent(value: number) {
  return `${formatNumber(value * 100, 0)}%`;
}

function formatMonths(value: number | null) {
  if (value == null || value <= 0) {
    return "Acima de 12 meses";
  }

  return `${value} meses`;
}

type Props = {
  snapshot: ProjectDashboardSnapshot;
};

export function ProjectIntelligencePanel({ snapshot }: Props) {
  const [view, setView] = useState<ViewKey>("proposals");
  const [scenario, setScenario] = useState<ScenarioKey>("realistic");

  const selectedProposal = snapshot.report.scenarios[scenario];
  const selectedView = viewOptions.find((item) => item.id === view) ?? viewOptions[0];
  const selectedDataKey =
    scenario === "aggressive"
      ? "agressivo"
      : scenario === "realistic"
        ? "realista"
        : "conservador";
  const selectedTimelineData = snapshot.proposalTimelineChartData[scenario];
  const paybackPoint = selectedTimelineData.find((item) => item.netReturn >= 0) ?? null;
  const strongestNetReturnPoint =
    selectedTimelineData.length > 0
      ? selectedTimelineData.reduce((best, point) => (point.netReturn > best.netReturn ? point : best))
      : null;
  const bestProposal = Object.values(snapshot.report.scenarios).reduce((best, proposal) => {
    if (proposal.netReturn !== best.netReturn) {
      return proposal.netReturn > best.netReturn ? proposal : best;
    }

    return (proposal.paybackMonths ?? Number.MAX_SAFE_INTEGER) < (best.paybackMonths ?? Number.MAX_SAFE_INTEGER)
      ? proposal
      : best;
  });
  const insights = snapshot.insights.slice(0, 5);
  const priorityActions = snapshot.report.recommendations.slice(0, 3);
  const nextDataPoints = snapshot.nextDataPoints.slice(0, 4);
  const viewSummary =
    view === "timeline"
      ? [
          {
            label: "Retorno / mes",
            value: selectedTimelineData.length > 0 ? formatCurrency(selectedTimelineData[0]?.monthlyReturn ?? 0) : "R$ 0",
          },
          {
            label: "Payback",
            value: formatMonths(selectedProposal.paybackMonths),
          },
          {
            label: "Pico liquido",
            value: strongestNetReturnPoint ? formatCurrency(strongestNetReturnPoint.netReturn) : "R$ 0",
          },
        ]
      : view === "return"
        ? [
            {
              label: "Melhor proposta",
              value: bestProposal.chartLabel,
            },
            {
              label: "Melhor payback",
              value: formatMonths(snapshot.quickMetrics.bestProposalPaybackMonths),
            },
            {
              label: "Retorno anual",
              value: formatCurrency(snapshot.quickMetrics.bestProposalAnnualReturn),
            },
          ]
        : [
            {
              label: "Ticket da simulacao",
              value: formatCurrency(snapshot.quickMetrics.benchmarkTicket),
            },
            {
              label: "Base potencial / mes",
              value: formatCurrency(snapshot.quickMetrics.baseMonthlyRevenuePotential),
            },
            {
              label: "Investimento selecionado",
              value: formatCurrency(selectedProposal.investment),
            },
          ];

  const scenarioOptions: Array<{ id: ScenarioKey; label: string }> = [
    { id: "conservative", label: snapshot.report.scenarios.conservative.chartLabel },
    { id: "realistic", label: snapshot.report.scenarios.realistic.chartLabel },
    { id: "aggressive", label: snapshot.report.scenarios.aggressive.chartLabel },
  ];

  return (
    <Card
      className={styles.root}
      direction="column"
      gap="20"
      paddingX="24"
      paddingY="24"
      radius="l"
      background="surface"
      border="neutral-alpha-weak"
    >
      <Row className={styles.header} horizontal="between" vertical="start" gap="16" wrap>
        <Column gap="8">
          <Row gap="8" wrap>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Painel
            </Tag>
            <Tag size="s" background="neutral-alpha-weak">
              {snapshot.cityLabel}
            </Tag>
            <Tag size="s" background="neutral-alpha-weak">
              {snapshot.segmentName}
            </Tag>
          </Row>
          <Heading as="h2" variant="heading-strong-l">
            Retorno por proposta
          </Heading>
          <Text className={styles.chartDescription} onBackground="neutral-weak" variant="body-default-m">
            Leitura executiva do caso sem inferir faturamento atual: o foco aqui e comparar retorno potencial entre as suas propostas.
          </Text>
        </Column>

        <div className={styles.switcher} role="group" aria-label="Visoes do painel">
          {viewOptions.map((item) => (
            <button
              type="button"
              key={item.id}
              className={styles.toggle}
              data-active={view === item.id}
              aria-pressed={view === item.id}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Row>

      <Grid className={styles.mainGrid} columns="2" m={{ columns: 1 }} gap="16">
        <Column className={styles.visualPanel} gap="16">
          <Column className={styles.chartHeader} gap="8">
            <div className={styles.switcher} role="group" aria-label="Propostas">
              {scenarioOptions.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className={styles.toggle}
                  data-active={scenario === item.id}
                  aria-pressed={scenario === item.id}
                  onClick={() => setScenario(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <Column gap="4">
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                {selectedView.label}
              </Text>
              <Text className={styles.chartDescription} onBackground="neutral-weak" variant="body-default-m">
                {selectedView.description}
              </Text>
            </Column>
          </Column>

          <div className={styles.chartShell} role="img" aria-label={`${selectedView.label} da proposta ${selectedProposal.title}`}>
            {view === "proposals" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={snapshot.scenarioChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                  <XAxis dataKey="month" stroke={CHART_AXIS_STROKE} />
                  <YAxis stroke={CHART_AXIS_STROKE} tickFormatter={(value: number) => formatCompactCurrency(value)} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="conservador"
                    name={snapshot.report.scenarios.conservative.chartLabel}
                    stroke={CHART_COLORS.conservative}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="realista"
                    name={snapshot.report.scenarios.realistic.chartLabel}
                    stroke={CHART_COLORS.realistic}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="agressivo"
                    name={snapshot.report.scenarios.aggressive.chartLabel}
                    stroke={CHART_COLORS.aggressive}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {view === "timeline" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                  <XAxis dataKey="month" stroke={CHART_AXIS_STROKE} />
                  <YAxis stroke={CHART_AXIS_STROKE} tickFormatter={(value: number) => formatCompactCurrency(value)} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="monthlyReturn"
                    name="Retorno / mes"
                    stroke={CHART_COLORS.conservative}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulativeReturn"
                    name="Retorno acumulado"
                    stroke={CHART_COLORS.realistic}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="netReturn"
                    name="Retorno liquido"
                    stroke={CHART_COLORS.aggressive}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {view === "return" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={snapshot.proposalReturnChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                  <XAxis dataKey="proposal" stroke={CHART_AXIS_STROKE} />
                  <YAxis stroke={CHART_AXIS_STROKE} tickFormatter={(value: number) => formatCompactCurrency(value)} />
                  <Tooltip
                    formatter={(value: number, name: string | number) => {
                      if (name === "Investimento" || name === "Retorno anual" || name === "Retorno liquido") {
                        return formatCurrency(value);
                      }

                      return formatNumber(value, 1);
                    }}
                  />
                  <Legend />
                  <Bar dataKey="spend" name="Investimento" fill={CHART_COLORS.conservative} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="annualReturn" name="Retorno anual" fill={CHART_COLORS.realistic} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="netReturn" name="Retorno liquido" fill={CHART_COLORS.aggressive} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {view === "funnel" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={snapshot.funnelChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                  <XAxis dataKey="stage" stroke={CHART_AXIS_STROKE} />
                  <YAxis stroke={CHART_AXIS_STROKE} />
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                  <Legend />
                  <Bar
                    dataKey="conservador"
                    name={snapshot.report.scenarios.conservative.chartLabel}
                    fill={CHART_COLORS.conservative}
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="realista"
                    name={snapshot.report.scenarios.realistic.chartLabel}
                    fill={CHART_COLORS.realistic}
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="agressivo"
                    name={snapshot.report.scenarios.aggressive.chartLabel}
                    fill={CHART_COLORS.aggressive}
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}

            {view === "precision" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={snapshot.precisionChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                  <XAxis dataKey="label" stroke={CHART_AXIS_STROKE} />
                  <YAxis stroke={CHART_AXIS_STROKE} domain={[0, 100]} />
                  <Tooltip formatter={(value: number) => `${formatNumber(value)}%`} />
                  <Legend />
                  <Bar dataKey="precision" name="Precisao" fill={CHART_COLORS.conservative} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="certainty" name="Certeza" fill={CHART_COLORS.realistic} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {view === "coverage" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={snapshot.coverageChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                  <XAxis dataKey="section" stroke={CHART_AXIS_STROKE} />
                  <YAxis stroke={CHART_AXIS_STROKE} domain={[0, 100]} />
                  <Tooltip formatter={(value: number) => `${formatNumber(value)}%`} />
                  <Legend />
                  <Bar dataKey="coverage" name="Cobertura" fill={CHART_COLORS.aggressive} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="confidence" name="Confianca" fill={CHART_COLORS.conservative} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <Grid className={styles.quickGrid} columns="3" s={{ columns: 1 }} gap="12">
            {viewSummary.map((item) => (
              <div className={styles.quickCard} key={item.label}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  {item.label}
                </Text>
                <Text variant="heading-strong-m">{item.value}</Text>
              </div>
            ))}
          </Grid>
        </Column>

        <Column className={styles.aside} gap="12">
          <Grid className={styles.kpiGrid} columns="2" s={{ columns: 2 }} gap="12">
            <div className={styles.metricCard}>
              <Text variant="label-default-s" onBackground="neutral-weak">
                Precisao
              </Text>
              <Text variant="heading-strong-l">{formatPercent(snapshot.precision.overall)}</Text>
            </div>
            <div className={styles.metricCard}>
              <Text variant="label-default-s" onBackground="neutral-weak">
                Cobertura
              </Text>
              <Text variant="heading-strong-l">{formatPercent(snapshot.precision.coverage)}</Text>
            </div>
            <div className={styles.metricCard}>
              <Text variant="label-default-s" onBackground="neutral-weak">
                Ticket da simulacao
              </Text>
              <Text variant="heading-strong-m">{formatCurrency(snapshot.quickMetrics.benchmarkTicket)}</Text>
            </div>
            <div className={styles.metricCard}>
              <Text variant="label-default-s" onBackground="neutral-weak">
                Melhor payback
              </Text>
              <Text variant="heading-strong-m">{formatMonths(snapshot.quickMetrics.bestProposalPaybackMonths)}</Text>
            </div>
          </Grid>

          <div className={styles.storyCard}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Sintese
            </Text>
            <Heading as="h3" variant="heading-strong-m">
              Expressao do negocio
            </Heading>
            <Text className={styles.storyLead} variant="body-default-m" onBackground="neutral-medium">
              {snapshot.narrative.headline}
            </Text>
            <Row className={styles.storyStats} gap="12" wrap>
              <div className={styles.storyStat}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Estagio
                </Text>
                <Text variant="body-default-m">{snapshot.narrative.stage}</Text>
              </div>
              <div className={styles.storyStat}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Gargalo principal
                </Text>
                <Text variant="body-default-m">{snapshot.narrative.primaryBottleneck}</Text>
              </div>
              <div className={styles.storyStat}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Oportunidade
                </Text>
                <Text variant="body-default-m">{snapshot.narrative.primaryOpportunity}</Text>
              </div>
              <div className={styles.storyStat}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Qualidade da base
                </Text>
                <Text variant="body-default-m">{snapshot.narrative.dataQuality}</Text>
              </div>
            </Row>
          </div>

          <div className={styles.storyCard}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Proposta selecionada
            </Text>
            <Heading as="h3" variant="heading-strong-m">
              {selectedProposal.title}
            </Heading>
            <Text variant="body-default-m" onBackground="neutral-medium">
              {selectedProposal.summary}
            </Text>
            <Row className={styles.storyStats} gap="12" wrap>
              <div className={styles.storyStat}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Investimento
                </Text>
                <Text variant="body-default-m">{formatCurrency(selectedProposal.investment)}</Text>
              </div>
              <div className={styles.storyStat}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Retorno anual
                </Text>
                <Text variant="body-default-m">{formatCurrency(selectedProposal.annualRevenue)}</Text>
              </div>
              <div className={styles.storyStat}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Retorno liquido
                </Text>
                <Text variant="body-default-m">{formatCurrency(selectedProposal.netReturn)}</Text>
              </div>
              <div className={styles.storyStat}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Payback
                </Text>
                <Text variant="body-default-m">{formatMonths(selectedProposal.paybackMonths)}</Text>
              </div>
            </Row>
            {paybackPoint && (
              <Text variant="body-default-s" onBackground="neutral-weak">
                O retorno liquido cruza o investimento em torno de {paybackPoint.month}.
              </Text>
            )}
          </div>

          <div className={styles.storyCard}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Base
            </Text>
            <Row gap="8" wrap>
              <span className={styles.statusPill} data-status="real">
                Reais: {snapshot.classificationCounts.real}
              </span>
              <span className={styles.statusPill} data-status="estimated">
                Estimados: {snapshot.classificationCounts.estimated}
              </span>
              <span className={styles.statusPill} data-status="projected">
                Projetados: {snapshot.classificationCounts.projected}
              </span>
            </Row>
            <Column gap="8">
              {snapshot.highlights.map((item) => (
                <Row className={styles.highlightRow} gap="12" key={`${item.label}-${item.classification}`}>
                  <span className={styles.statusDot} data-status={item.classification} />
                  <Column gap="4">
                    <Text variant="body-default-s">{item.label}</Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {item.value}
                    </Text>
                    <Text className={styles.storyMeta} variant="body-default-s" onBackground="neutral-weak">
                      {item.sourceLabel}
                    </Text>
                  </Column>
                </Row>
              ))}
            </Column>
          </div>

          {insights.length > 0 && (
            <div className={styles.storyCard}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                Leitura
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                O que o painel sugere
              </Heading>
              <ul className={styles.storyList}>
                {insights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {(priorityActions.length > 0 || nextDataPoints.length > 0) && (
            <div className={styles.storyCard}>
              <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
                Proxima rodada
              </Text>
              <Heading as="h3" variant="heading-strong-m">
                Como refinar a proposta
              </Heading>

              {priorityActions.length > 0 && (
                <Column gap="8">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    Ajustes imediatos
                  </Text>
                  <ul className={styles.storyList}>
                    {priorityActions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Column>
              )}

              {nextDataPoints.length > 0 && (
                <Column gap="8">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    Dados da consulta
                  </Text>
                  <ul className={styles.storyList}>
                    {nextDataPoints.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </Column>
              )}
            </div>
          )}
        </Column>
      </Grid>
    </Card>
  );
}
