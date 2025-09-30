// src/mdx-components.tsx
import * as React from "react";
import type { MDXComponents } from "mdx/types";

// Importa o módulo inteiro; chaves ausentes não quebram build
// (evita erro de "named export missing")
import * as MDXMap from "@/components/mdx";

// Helper: devolve o componente do mapa ou um fallback
function pick<T extends React.ElementType>(
  name: string,
  Fallback: T
): React.ComponentType<any> {
  const Comp = (MDXMap as any)?.[name];
  return (Comp ?? Fallback) as React.ComponentType<any>;
}

// Fallbacks mínimos (sem estilos; só pra não quebrar)
const Frag: React.FC<React.PropsWithChildren> = ({ children }) => <>{children}</>;
const Div: React.FC<React.HTMLAttributes<HTMLDivElement>> = (p) => <div {...p} />;
const Span: React.FC<React.HTMLAttributes<HTMLSpanElement>> = (p) => <span {...p} />;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // ✅ básicos de texto / containers
    Callout: pick("Callout", Div),
    Quote: pick("Quote", Div),
    Highlight: pick("Highlight", Span),
    Collapsible: pick("Collapsible", Div),
    CollapsibleTrigger: pick("CollapsibleTrigger", Div),
    CollapsibleContent: pick("CollapsibleContent", Div),
    Gallery: pick("Gallery", Div),
    Figure: pick("Figure", Div),
    HoverNote: pick("HoverNote", Span),

    // ✅ charts (recharts ou similares) — só funcionam se você os tiver
    ChartContainer: pick("ChartContainer", Div),
    ResponsiveContainer: pick("ResponsiveContainer", Div),
    BarChart: pick("BarChart", Div),
    Bar: pick("Bar", Div),
    XAxis: pick("XAxis", Div),
    YAxis: pick("YAxis", Div),
    Tooltip: pick("Tooltip", Div),
    CartesianGrid: pick("CartesianGrid", Div),
    Legend: pick("Legend", Div),
    LineChart: pick("LineChart", Div),
    Line: pick("Line", Div),
    AreaChart: pick("AreaChart", Div),
    Area: pick("Area", Div),
    PieChart: pick("PieChart", Div),
    Pie: pick("Pie", Div),
    Cell: pick("Cell", Div),

    // ✅ mantém qualquer componente que o MDX já estiver passando
    ...components,
  };
}
