"use client";

import React from "react";

type Node = {
  id: string;
  label: string;
  x: number; // 0..1 (percentual)
  y: number; // 0..1
};

type Edge = { from: string; to: string };

type MindMapProps = {
  nodes: Node[];
  edges: Edge[];
  height?: number;
};

export default function MindMap({ nodes, edges, height = 320 }: MindMapProps) {
  const W = 1000;
  const H = 1000; // coord virtual para calcular, depois escala
  const stroke = "#94a3b8";

  const find = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div style={{ width: "100%", height }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" role="img">
        {/* edges */}
        {edges.map((e, i) => {
          const a = find(e.from);
          const b = find(e.to);
          const x1 = a.x * W;
          const y1 = a.y * H;
          const x2 = b.x * W;
          const y2 = b.y * H;
          return (
            <g key={i}>
              <defs>
                <marker
                  id={`arrow-${i}`}
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon points="0 0, 7 3.5, 0 7" fill={stroke} />
                </marker>
              </defs>
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={stroke}
                strokeWidth={2}
                markerEnd={`url(#arrow-${i})`}
                opacity={0.9}
              />
            </g>
          );
        })}

        {/* nodes */}
        {nodes.map((n) => {
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
                fill="#ffffff"
                stroke="#cbd5e1"
                strokeWidth={2}
                filter="url(#shadow)"
              />
              <text
                x={0}
                y={5}
                textAnchor="middle"
                fontSize="16"
                fontWeight={600}
                fill="#0f172a"
              >
                {n.label}
              </text>
            </g>
          );
        })}

        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.25" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
