import { FreeToolItem, ToolsPage } from "@/types";

export const toolsPage: ToolsPage = {
  path: "/ferramentas",
  label: "Ferramentas",
  title: "Ferramentas gratuitas",
  description:
    "Páginas com ferramentas gratuitas para estimar escopo, organizar decisões e facilitar o próximo passo de projetos digitais.",
  intro: {
    headline:
      "Ferramentas gratuitas para destravar escopo, decisão e leitura inicial sem transformar tudo em conversa comercial logo de saída.",
    lead: "Cada ferramenta ganha uma página própria para ficar fácil de acessar, compartilhar e expandir com o tempo. A ideia é reunir simuladores, diagnósticos e utilidades que ajudem antes mesmo do briefing completo.",
  },
  note: "Hoje a área abre com o simulador de escopo web. Depois, outras ferramentas podem entrar aqui com rotas próprias, contexto claro e acesso direto.",
};

export const freeTools: FreeToolItem[] = [
  {
    slug: "diagnostico-de-potencial-local",
    path: "/ferramentas/diagnostico-de-potencial-local",
    title: "Diagnóstico de potencial local",
    summary:
      "Ferramenta para projetar demanda, aquisição, faturamento, recorrência e saturação em negócios locais.",
    description:
      "Analisa dados da operação, Instagram, Google local, mídia paga e mercado para devolver cenários, gráficos e um relatório profissional em PDF.",
    category: "Diagnóstico comercial",
    format: "Ferramenta interativa + relatório",
    accessLabel: "Gratuito",
    status: "Beta",
    highlights: [
      "Cenários conservador, realista e agressivo",
      "Projeções de faturamento, CAC, LTV e ocupação",
      "Comparativo local e relatório exportável",
    ],
    ctaLabel: "Abrir diagnóstico",
  },
  {
    slug: "simulador-de-escopo-web",
    path: "/ferramentas/simulador-de-escopo-web",
    title: "Simulador de escopo web",
    summary:
      "Uma estimativa inicial para landing page, site institucional ou e-commerce com módulos adicionais.",
    description:
      "Ferramenta gratuita para estimar faixas de investimento em projetos web, comparar módulos e chegar mais preparado a um briefing ou proposta.",
    category: "Escopo e investimento",
    format: "Ferramenta interativa",
    accessLabel: "Gratuito",
    status: "Disponível",
    highlights: [
      "Faixa inicial de investimento",
      "Combinação de módulos e complexidade",
      "Atalho para abrir briefing com mais clareza",
    ],
    ctaLabel: "Abrir simulador",
  },
];
