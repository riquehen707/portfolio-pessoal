"use client";

import React, { useId } from "react";

import styles from "./MindMap.module.scss";

type Node = {
  id: string;
  label: string;
  x: number; // 0..1 (percentual)
  y: number; // 0..1
};

type Edge = { from: string; to: string };

type MindMapProps = {
  nodes?: Node[];
  edges?: Edge[];
  data?: string;
  height?: number;
  title?: string;
  description?: string;
};

export default function MindMap({
  nodes,
  edges,
  data,
  height = 320,
  title = "Mapa de relações",
  description = "As setas mostram como os elementos do mapa se conectam.",
}: MindMapProps) {
  const W = 1000;
  const H = 1000; // coord virtual para calcular, depois escala
  const markerPrefix = useId().replace(/:/g, "");

  let parsed: { nodes?: Node[]; edges?: Edge[] } = {};
  if (data) {
    try {
      parsed = JSON.parse(data) as { nodes?: Node[]; edges?: Edge[] };
    } catch {
      parsed = {};
    }
  }

  const resolvedNodes = nodes ?? parsed.nodes ?? [];
  const resolvedEdges = edges ?? parsed.edges ?? [];

  const find = (id: string) => resolvedNodes.find((node) => node.id === id);

  return (
    <figure className={styles.root}>
      <div
        className={styles.scroll}
        tabIndex={0}
        role="group"
        aria-label={`${title}. Role horizontalmente para ver o diagrama completo em telas pequenas.`}
      >
        <svg
          className={styles.diagram}
          viewBox={`0 0 ${W} ${H}`}
          style={{ height }}
          role="img"
          aria-labelledby={`${markerPrefix}-title ${markerPrefix}-description`}
        >
          <title id={`${markerPrefix}-title`}>{title}</title>
          <desc id={`${markerPrefix}-description`}>{description}</desc>
        {/* edges */}
        {resolvedEdges.map((e, i) => {
          const a = find(e.from);
          const b = find(e.to);
          if (!a || !b) return null;
          const x1 = a.x * W;
          const y1 = a.y * H;
          const x2 = b.x * W;
          const y2 = b.y * H;
          return (
            <g key={i}>
              <defs>
                <marker
                  id={`${markerPrefix}-arrow-${i}`}
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 7 3.5, 0 7" fill="var(--neutral-on-background-weak)" />
                </marker>
              </defs>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="var(--neutral-on-background-weak)"
                strokeWidth={2}
                markerEnd={`url(#${markerPrefix}-arrow-${i})`}
                opacity={0.9}
              />
            </g>
          );
        })}

        {/* nodes */}
        {resolvedNodes.map((n) => {
          const x = n.x * W;
          const y = n.y * H;
          return (
            <g key={n.id} transform={`translate(${x},${y})`}>
              <rect
                x={-140}
                y={-28}
                rx={12}
                ry={12}
                width={280}
                height={56}
                fill="var(--page-background)"
                stroke="var(--line-subtle)"
                strokeWidth={2}
                filter={`url(#${markerPrefix}-shadow)`}
              />
              <text
                x={0}
                y={5}
                textAnchor="middle"
                fontSize="16"
                fontWeight={600}
                fill="var(--neutral-on-background-strong)"
              >
                {n.label}
              </text>
            </g>
          );
        })}

        <defs>
          <filter
            id={`${markerPrefix}-shadow`}
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
          </filter>
        </defs>
        </svg>
      </div>
      <figcaption className={styles.caption}>{description}</figcaption>
    </figure>
  );
}
