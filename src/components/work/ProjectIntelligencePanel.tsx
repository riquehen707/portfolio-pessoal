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

const viewOptions: Array<{ id: ViewKey; label: string }> = [
  { id: "scenarios", label: "Cenarios" },
  { id: "timeline", label: "Tempo" },
  { id: "investment", label: "Investimento" },
  { id: "funnel", label: "Funil" },
  { id: "organic", label: "Organico" },
  { id: "precision", label: "Precisao" },
  { id: "coverage", label: "Base" },
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
  const viewSummary =
    view === "timeline"
      ? [
          {
            label: "Investe / mes",
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
              label: "Mercado",
              value: formatCompact(snapshot.report.derivedMetrics.eligibleMarket),
            },
            {
              label: "Capturavel",
              value: formatCompact(snapshot.report.derivedMetrics.capturableMarket),
            },
            {
              label: "Receita / mes",
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
        </Column>

        <div className={styles.switcher} role="tablist" aria-label="Visoes do painel">
          {viewOptions.map((item) => (
            <button
              type="button"
              key={item.id}
              className={styles.toggle}
              data-active={view === item.id}
              onClick={() => setView(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      </Row>

      <Grid className={styles.mainGrid} columns="2" m={{ columns: 1 }} gap="16">
        <Column className={styles.visualPanel} gap="16">
          <div className={styles.switcher} role="tablist" aria-label="Cenarios">
            {scenarioOptions.map((item) => (
              <button
                type="button"
                key={item.id}
                className={styles.toggle}
                data-active={scenario === item.id}
                onClick={() => setScenario(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className={styles.chartShell}>
            {view === "scenarios" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={snapshot.scenarioChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.45)" />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                  <Legend />
                  <Line type="monotone" dataKey="atual" stroke="#93a0b3" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="conservador" stroke="#6fa8ff" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="realista" stroke="#5ed492" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="agressivo" stroke="#f2c66d" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}

            {view === "timeline" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedTimelineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.45)" />
                  <YAxis
                    yAxisId="revenue"
                    stroke="rgba(255,255,255,0.45)"
                    tickFormatter={(value: number) => formatCompactCurrency(value)}
                  />
                  <YAxis
                    yAxisId="cac"
                    orientation="right"
                    stroke="rgba(255,255,255,0.45)"
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
                    stroke="#5ed492"
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    yAxisId="revenue"
                    type="monotone"
                    dataKey="investment"
                    name="Investimento"
                    stroke="#6fa8ff"
                    strokeWidth={2}
                    strokeDasharray="6 4"
                    dot={false}
                  />
                  <Line
                    yAxisId="cac"
                    type="monotone"
                    dataKey="cac"
                    name="CAC"
                    stroke="#f2c66d"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {view === "investment" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedInvestmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="label" stroke="rgba(255,255,255,0.45)" />
                  <YAxis
                    yAxisId="revenue"
                    stroke="rgba(255,255,255,0.45)"
                    tickFormatter={(value: number) => formatCompactCurrency(value)}
                  />
                  <YAxis
                    yAxisId="cac"
                    orientation="right"
                    stroke="rgba(255,255,255,0.45)"
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
                    stroke="#5ed492"
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    yAxisId="revenue"
                    type="monotone"
                    dataKey="incrementalRevenue"
                    name="Crescimento"
                    stroke="#6fa8ff"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    yAxisId="cac"
                    type="monotone"
                    dataKey="cac"
                    name="CAC"
                    stroke="#f2c66d"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {view === "funnel" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={snapshot.funnelChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="stage" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.45)" />
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                  <Legend />
                  <Bar dataKey="atual" fill="#93a0b3" radius={[6, 6, 0, 0]} />
                  <Bar dataKey={selectedDataKey} fill="#6fa8ff" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {view === "organic" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={snapshot.organicChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="metric" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.45)" />
                  <Tooltip formatter={(value: number) => formatNumber(value)} />
                  <Legend />
                  <Bar dataKey="atual" fill="#93a0b3" radius={[6, 6, 0, 0]} />
                  <Bar dataKey={selectedDataKey} fill="#5ed492" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {view === "precision" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={snapshot.precisionChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="label" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.45)" domain={[0, 100]} />
                  <Tooltip formatter={(value: number) => `${formatNumber(value)}%`} />
                  <Legend />
                  <Bar dataKey="precision" fill="#6fa8ff" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="certainty" fill="#5ed492" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}

            {view === "coverage" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={snapshot.coverageChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                  <XAxis dataKey="section" stroke="rgba(255,255,255,0.45)" />
                  <YAxis stroke="rgba(255,255,255,0.45)" domain={[0, 100]} />
                  <Tooltip formatter={(value: number) => `${formatNumber(value)}%`} />
                  <Legend />
                  <Bar dataKey="coverage" fill="#f2c66d" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="confidence" fill="#6fa8ff" radius={[6, 6, 0, 0]} />
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
                CAC base
              </Text>
              <Text variant="heading-strong-m">{formatCurrency(snapshot.quickMetrics.adjustedCac)}</Text>
            </div>
            <div className={styles.metricCard}>
              <Text variant="label-default-s" onBackground="neutral-weak">
                ROAS
              </Text>
              <Text variant="heading-strong-m">{formatNumber(snapshot.quickMetrics.roas, 1)}x</Text>
            </div>
          </Grid>

          <div className={styles.storyCard}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Cenario
            </Text>
            <Heading as="h3" variant="heading-strong-m">
              {scenarioOptions.find((item) => item.id === scenario)?.label}
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
                  Receita anual
                </Text>
                <Text variant="body-default-m">{formatCurrency(selectedScenario.revenue * 12)}</Text>
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
                  </Column>
                </Row>
              ))}
            </Column>
          </div>
        </Column>
      </Grid>
    </Card>
  );
}
