"use client";

import type { ReactNode } from "react";

import { MediaCredit, type MediaCreditProps } from "./MediaCredit";
import styles from "./SimpleCharts.module.scss";

type ChartDatum = { label: string; value: number };
type SimpleChartProps = MediaCreditProps & {
  data?: ChartDatum[];
  values?: string;
  title?: string;
  height?: number;
  color?: string;
  valueLabel?: string;
};

function validData(data?: ChartDatum[], values?: string) {
  let parsed = data ?? [];
  if (!parsed.length && values) {
    try {
      const candidate = JSON.parse(values) as unknown;
      parsed = Array.isArray(candidate) ? (candidate as ChartDatum[]) : [];
    } catch {
      parsed = [];
    }
  }
  return parsed.filter(
    (item) => typeof item.label === "string" && item.label.trim() && Number.isFinite(item.value),
  );
}

function ChartFrame({
  title,
  children,
  data,
  valueLabel = "Valor",
  caption,
  source,
  accessedAt,
  sourceHref,
}: Pick<
  SimpleChartProps,
  "title" | "valueLabel" | "caption" | "source" | "accessedAt" | "sourceHref"
> & { children: ReactNode; data: ChartDatum[] }) {
  return (
    <figure className={styles.root}>
      {title ? <figcaption className={styles.title}>{title}</figcaption> : null}
      {children}
      <dl className={styles.values} aria-label={`Dados do gráfico${title ? `: ${title}` : ""}`}>
        {data.map((item) => (
          <div className={styles.value} key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              {item.value.toLocaleString("pt-BR")} {valueLabel}
            </dd>
          </div>
        ))}
      </dl>
      <MediaCredit
        caption={caption}
        source={source}
        accessedAt={accessedAt}
        sourceHref={sourceHref}
      />
    </figure>
  );
}

export function SimpleBarChart({
  data,
  values,
  title,
  color = "#ffd400",
  valueLabel,
  caption,
  source,
  accessedAt,
  sourceHref,
}: SimpleChartProps) {
  const items = validData(data, values);
  const maximum = Math.max(...items.map((item) => Math.abs(item.value)), 1);
  return (
    <ChartFrame
      title={title}
      data={items}
      valueLabel={valueLabel}
      caption={caption}
      source={source}
      accessedAt={accessedAt}
      sourceHref={sourceHref}
    >
      <div className={styles.bars} role="img" aria-label={title ?? "Gráfico de barras"}>
        {items.map((item) => (
          <div className={styles.barRow} key={item.label}>
            <span>{item.label}</span>
            <span className={styles.barTrack}>
              <span
                className={styles.barFill}
                style={{ width: `${(Math.abs(item.value) / maximum) * 100}%`, background: color }}
              />
            </span>
            <strong>{item.value.toLocaleString("pt-BR")}</strong>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}

export function SimpleLineChart({
  data,
  values,
  title,
  height = 320,
  color = "#ffd400",
  valueLabel,
  caption,
  source,
  accessedAt,
  sourceHref,
}: SimpleChartProps) {
  const items = validData(data, values);
  const width = 800;
  const chartHeight = Math.max(height, 240);
  const padding = 36;
  const seriesValues = items.map((item) => item.value);
  const minimum = Math.min(...seriesValues, 0);
  const maximum = Math.max(...seriesValues, 1);
  const range = maximum - minimum || 1;
  const points = items.map((item, index) => ({
    ...item,
    x: padding + (index * (width - padding * 2)) / Math.max(items.length - 1, 1),
    y: padding + ((maximum - item.value) / range) * (chartHeight - padding * 2),
  }));
  return (
    <ChartFrame
      title={title}
      data={items}
      valueLabel={valueLabel}
      caption={caption}
      source={source}
      accessedAt={accessedAt}
      sourceHref={sourceHref}
    >
      <div className={styles.lineChart}>
        <svg
          viewBox={`0 0 ${width} ${chartHeight}`}
          role="img"
          aria-label={title ?? "Gráfico de linha"}
        >
          <line
            x1={padding}
            y1={chartHeight - padding}
            x2={width - padding}
            y2={chartHeight - padding}
            className={styles.axis}
          />
          <polyline
            points={points.map((point) => `${point.x},${point.y}`).join(" ")}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {points.map((point) => (
            <circle key={point.label} cx={point.x} cy={point.y} r="6" fill={color}>
              <title>{`${point.label}: ${point.value.toLocaleString("pt-BR")} ${valueLabel ?? "Valor"}`}</title>
            </circle>
          ))}
        </svg>
      </div>
    </ChartFrame>
  );
}
