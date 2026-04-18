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

type ViewKey = "scenarios" | "timeline" | "investment" | "funnel" | "organic" | "precision" | "coverage";
type ScenarioKey = "conservative" | "realistic" | "aggressive";

const CHART_GRID_STROKE = "rgba(255,255,255,0.08)";
const CHART_AXIS_STROKE = "rgba(255,255,255,0.45)";
const CHART_COLORS = {
  current: "#93a0b3",
  conservative: "#6fa8ff",
  realistic: "#5ed492",
  aggressive: "#f2c66d",
} as const;

const viewOptions: Array<{ id: ViewKey; label: string; description: string }> = [
  {
    id: "scenarios",
    label: "Cenarios",
    description: "Compara o faturamento mensal entre a base atual e as tres faixas de crescimento simuladas.",
  },
  {
    id: "timeline",
    label: "Tempo",
    description: "Mostra a evolucao mes a mes de receita, investimento e CAC no cenario selecionado.",
  },
  {
    id: "investment",
    label: "Investimento",
    description: "Relaciona faixas de aporte com crescimento incremental, eficiencia e custo de aquisicao.",
  },
  {
    id: "funnel",
    label: "Funil",
    description: "Resume o volume esperado entre leads, agenda, comparecimento e clientes fechados.",
  },
  {
    id: "organic",
    label: "Organico",
    description: "Compara o impacto organico entre seguidores, leads e clientes captados sem media paga.",
  },
  {
    id: "precision",
    label: "Precisao",
    description: "Explica a confianca relativa de cada cenario a partir da cobertura e da certeza observada.",
  },
  {
    id: "coverage",
    label: "Base",
    description: "Mostra quais secoes do diagnostico estao melhor observadas e quais dependem mais de estimativa.",
  },
];

const scenarioOptions: Array<{ id: ScenarioKey; label: string }> = [
  { id: "conservative", label: "Conservador" },
  { id: "realistic", label: "Realista" },
  { id: "aggressive", label: "Agressivo" },
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

type Props = {
  snapshot: ProjectDashboardSnapshot;
};

export function ProjectIntelligencePanel({ snapshot }: Props) {
  const [view, setView] = useState<ViewKey>("scenarios");
  const [scenario, setScenario] = useState<ScenarioKey>("realistic");

  const selectedScenario = snapshot.report.scenarios[scenario];
  const selectedScenarioLabel =
    scenarioOptions.find((item) => item.id === scenario)?.label ?? "Realista";
  const selectedView = viewOptions.find((item) => item.id === view) ?? viewOptions[0];
  const selectedDataKey =
    scenario === "aggressive"
      ? "agressivo"
      : scenario === "realistic"
        ? "realista"
        : "conservador";
  const selectedTimelineData = snapshot.kpiTimelineChartData[scenario];
  const selectedInvestmentData = snapshot.investmentCurveChartData[scenario];
  const latestTimelinePoint = selectedTimelineData[selectedTimelineData.length - 1] ?? null;
  const peakRevenuePoint =
    selectedTimelineData.length > 0
      ? selectedTimelineData.reduce((best, point) => (point.revenue > best.revenue ? point : best))
      : null;
  const minimumCacPoint =
    selectedInvestmentData.length > 0
      ? selectedInvestmentData.reduce((best, point) => (point.cac < best.cac ? point : best))
      : null;
  const highestEfficiencyPoint =
    selectedInvestmentData.length > 0
      ? selectedInvestmentData.reduce((best, point) => (point.efficiency > best.efficiency ? point : best))
      : null;
  const insights = snapshot.insights.slice(0, 4);
  const priorityActions = snapshot.report.recommendations.slice(0, 3);
  const nextDataPoints = snapshot.nextDataPoints.slice(0, 3);
  const revenueDelta = Math.max(selectedScenario.revenue - snapshot.quickMetrics.currentRevenueEstimate, 0);
  const viewSummary =
    view === "timeline"
      ? [
          {
            label: "Investimento / mes",
            value: latestTimelinePoint ? formatCurrency(latestTimelinePoint.investment) : "R$ 0",
          },
          {
            label: "CAC final",
            value: latestTimelinePoint ? formatCurrency(latestTimelinePoint.cac) : "R$ 0",
          },
          {
            label: "Saturacao",
            value: latestTimelinePoint ? formatPercent(latestTimelinePoint.saturation) : "0%",
          },
        ]
      : view === "investment"
        ? [
            {
              label: "Faixa eficiente",
              value: highestEfficiencyPoint ? formatCurrency(highestEfficiencyPoint.spend) : "R$ 0",
            },
            {
              label: "Menor CAC",
              value: minimumCacPoint ? formatCurrency(minimumCacPoint.cac) : "R$ 0",
            },
            {
              label: "ROAS pico",
              value: highestEfficiencyPoint ? `${formatNumber(highestEfficiencyPoint.roas, 1)}x` : "0x",
            },
          ]
        : [
            {
              label: "Receita atual / mes",
              value: formatCurrency(snapshot.quickMetrics.currentRevenueEstimate),
            },
            {
              label: "Incremento potencial",
              value: formatCurrency(snapshot.quickMetrics.growthRevenuePotential),
            },
            {
              label: "Receita no cenario",
              value: formatCurrency(selectedScenario.revenue),
            },
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
            Diagnostico local
          </Heading>
          <Text className={styles.chartDescription} onBackground="neutral-weak" variant="body-default-m">
            Leitura executiva do caso com foco em crescimento, confianca da base e proximos ajustes.
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
            <div className={styles.switcher} role="group" aria-label="Cenarios">
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

          <div
            className={styles.chartShell}
            role="img"
            aria-label={`${selectedView.label} no cenario ${selectedScenarioLabel}`}
          >
            {view === "scenarios" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={snapshot.scenarioChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                  <XAxis dataKey="month" stroke={CHART_AXIS_STROKE} />
                  <YAxis stroke={CHART_AXIS_STROKE} />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="atual"
                    name="Atual"
                    stroke={CHART_COLORS.current}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="conservador"
                    name="Conservador"
                    stroke={CHART_COLORS.conservative}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="realista"
                    name="Realista"
                    stroke={CHART_COLORS.realistic}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="agressivo"
                    name="Agressivo"
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
                  <YAxis
                    yAxisId="revenue"
                    stroke={CHART_AXIS_STROKE}
                    tickFormatter={(value: number) => formatCompactCurrency(value)}
                  />
                  <YAxis
                    yAxisId="cac"
                    orientation="right"
                    stroke={CHART_AXIS_STROKE}
                    tickFormatter={(value: number) => formatCompactCurrency(value)}
                  />
                  <Tooltip
                    formatter={(value: number, name: string | number) => {
                      if (name === "Receita" || name === "Investimento") {
                        return formatCurrency(value);
                      }

                      if (name === "CAC") {
                        return formatCurrency(value);
                      }

                      return formatNumber(value);
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="revenue"
                    type="monotone"
                    dataKey="revenue"
                    name="Receita"
                    stroke={CHART_COLORS.realistic}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    yAxisId="revenue"
                    type="monotone"
                    dataKey="investment"
                    name="Investimento"
                    stroke={CHART_COLORS.conservative}
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    dot={false}
                  />
                  <Line
                    yAxisId="cac"
                    type="monotone"
                    dataKey="cac"
                    name="CAC"
                    stroke={CHART_COLORS.aggressive}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {view === "investment" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedInvestmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                  <XAxis dataKey="label" stroke={CHART_AXIS_STROKE} />
                  <YAxis
                    yAxisId="revenue"
                    stroke={CHART_AXIS_STROKE}
                    tickFormatter={(value: number) => formatCompactCurrency(value)}
                  />
                  <YAxis
                    yAxisId="cac"
                    orientation="right"
                    stroke={CHART_AXIS_STROKE}
                    tickFormatter={(value: number) => formatCompactCurrency(value)}
                  />
                  <Tooltip
                    formatter={(value: number, name: string | number) => {
                      if (name === "Receita" || name === "Crescimento") {
                        return formatCurrency(value);
                      }

                      if (name === "CAC") {
                        return formatCurrency(value);
                      }

                      return formatNumber(value);
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="revenue"
                    type="monotone"
                    dataKey="revenue"
                    name="Receita"
                    stroke={CHART_COLORS.realistic}
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    yAxisId="revenue"
                    type="monotone"
                    dataKey="incrementalRevenue"
                    name="Crescimento"
                    stroke={CHART_COLORS.conservative}
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="cac"
                    type="monotone"
                    dataKey="cac"
                    name="CAC"
                    stroke={CHART_COLORS.aggressive}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
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
                  <Bar dataKey="atual" name="Atual" fill={CHART_COLORS.current} radius={[6, 6, 0, 0]} />
                  <Bar
                    dataKey={selectedDataKey}
                    name={selectedScenarioLabel}
                    fill={CHART_COLORS.conservative}
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            )}

            {view === "organic" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={snapshot.organicChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
                  <XAxis dataKey="metric" stroke={CHART_AXIS_STROKE} />
                  <YAxis stroke={CHART_AXIS_STROKE} />
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                  <Legend />
                  <Bar dataKey="atual" name="Atual" fill={CHART_COLORS.current} radius={[6, 6, 0, 0]} />
                  <Bar
                    dataKey={selectedDataKey}
                    name={selectedScenarioLabel}
                    fill={CHART_COLORS.realistic}
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
                  <Bar
                    dataKey="precision"
                    name="Precisao"
                    fill={CHART_COLORS.conservative}
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="certainty"
                    name="Certeza"
                    fill={CHART_COLORS.realistic}
                    radius={[6, 6, 0, 0]}
                  />
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
                  <Bar
                    dataKey="coverage"
                    name="Cobertura"
                    fill={CHART_COLORS.aggressive}
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="confidence"
                    name="Confianca"
                    fill={CHART_COLORS.conservative}
                    radius={[6, 6, 0, 0]}
                  />
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
                Receita atual
              </Text>
              <Text variant="heading-strong-m">{formatCurrency(snapshot.quickMetrics.currentRevenueEstimate)}</Text>
            </div>
            <div className={styles.metricCard}>
              <Text variant="label-default-s" onBackground="neutral-weak">
                Capacidade livre
              </Text>
              <Text variant="heading-strong-m">{formatNumber(snapshot.quickMetrics.availableSlots)}</Text>
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
              Cenario
            </Text>
            <Heading as="h3" variant="heading-strong-m">
              {selectedScenarioLabel}
            </Heading>
            <Row className={styles.storyStats} gap="12" wrap>
              <div className={styles.storyStat}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Clientes / mes
                </Text>
                <Text variant="body-default-m">{formatNumber(selectedScenario.customers)}</Text>
              </div>
              <div className={styles.storyStat}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Incremento / mes
                </Text>
                <Text variant="body-default-m">{formatCurrency(revenueDelta)}</Text>
              </div>
              <div className={styles.storyStat}>
                <Text variant="label-default-s" onBackground="neutral-weak">
                  Pico mensal
                </Text>
                <Text variant="body-default-m">
                  {peakRevenuePoint ? `${peakRevenuePoint.month} - ${formatCurrency(peakRevenuePoint.revenue)}` : "-"}
                </Text>
              </div>
            </Row>
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
              {snapshot.highlights.slice(0, 3).map((item) => (
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
                Como aumentar resultado e precisao
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
                    Dados a confirmar
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
