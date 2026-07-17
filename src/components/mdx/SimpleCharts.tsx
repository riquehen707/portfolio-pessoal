"use client";

import type { ReactNode } from "react";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { MediaCredit, type MediaCreditProps } from "./MediaCredit";

type ChartDatum = {
  label: string;
  value: number;
};

type SimpleChartProps = MediaCreditProps & {
  data: ChartDatum[];
  title?: string;
  height?: number;
  color?: string;
  valueLabel?: string;
};

function ChartFrame({
  title,
  height = 320,
  children,
  caption,
  source,
  accessedAt,
  sourceHref,
}: Pick<
  SimpleChartProps,
  "title" | "height" | "caption" | "source" | "accessedAt" | "sourceHref"
> & { children: ReactNode }) {
  return (
    <figure style={{ width: "100%", margin: "2rem 0" }}>
      {title ? (
        <figcaption
          style={{
            marginBottom: "0.75rem",
            color: "var(--neutral-on-background-strong)",
            fontWeight: 700,
          }}
        >
          {title}
        </figcaption>
      ) : null}
      <div style={{ width: "100%", height, minHeight: 240 }}>{children}</div>
      <MediaCredit
        caption={caption}
        source={source}
        accessedAt={accessedAt}
        sourceHref={sourceHref}
      />
    </figure>
  );
}

function ChartTooltip({ valueLabel }: { valueLabel?: string }) {
  return (
    <Tooltip
      formatter={(value) => [value, valueLabel ?? "Valor"]}
      contentStyle={{
        border: "1px solid var(--line-subtle)",
        borderRadius: "0.6rem",
        background: "var(--page-background)",
      }}
    />
  );
}

export function SimpleBarChart({
  data,
  title,
  height,
  color = "#ffd400",
  valueLabel,
  caption,
  source,
  accessedAt,
  sourceHref,
}: SimpleChartProps) {
  return (
    <ChartFrame
      title={title}
      height={height}
      caption={caption}
      source={source}
      accessedAt={accessedAt}
      sourceHref={sourceHref}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 8 }}>
          <CartesianGrid stroke="var(--line-subtle)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip valueLabel={valueLabel} />
          <Bar dataKey="value" fill={color} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}

export function SimpleLineChart({
  data,
  title,
  height,
  color = "#ffd400",
  valueLabel,
  caption,
  source,
  accessedAt,
  sourceHref,
}: SimpleChartProps) {
  return (
    <ChartFrame
      title={title}
      height={height}
      caption={caption}
      source={source}
      accessedAt={accessedAt}
      sourceHref={sourceHref}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 8 }}>
          <CartesianGrid stroke="var(--line-subtle)" strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip valueLabel={valueLabel} />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={3}
            dot={{ r: 4, fill: color }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
