import {
  getWorkProjectKindLabel,
  getWorkProjectPath,
  getWorkProjectStack,
} from "@/app/work/projectData";
import { type BlogFile } from "@/utils/utils";

export type WorkJourneyStatus = "in-progress" | "active" | "published" | "completed";

export type WorkJourneyEntry = {
  id: string;
  date: string;
  task: string;
  status: WorkJourneyStatus;
  category: string;
  summary: string;
  points: string[];
  href?: string;
  ctaLabel?: string;
};

export const workJourneyStatusMeta: Record<WorkJourneyStatus, { label: string }> = {
  "in-progress": { label: "Em andamento" },
  active: { label: "Ativo" },
  published: { label: "Publicado" },
  completed: { label: "Concluído" },
};

export const workFocusAreas = [
  {
    label: "Portfólio",
    value: "Cases, estudos e marcos publicados para mostrar evolução real, não só vitrine.",
  },
  {
    label: "Serviços",
    value: "Sites, landing pages, captação, CRM, automações e estrutura para negócios locais.",
  },
  {
    label: "Direção",
    value: "Clareza comercial, execução técnica e continuidade para crescer com menos improviso.",
  },
] as const;

const manualJourneyEntries: WorkJourneyEntry[] = [
  {
    id: "portfolio-in-construction",
    date: "2026-05-12",
    task: "Portfólio em construção",
    status: "in-progress",
    category: "Portfólio",
    summary:
      "A página de projetos está virando uma linha do tempo viva, atualizada por marcos reais em vez de uma vitrine estática.",
    points: ["Atualização por data", "Leitura de baixo para cima", "Foco em continuidade"],
  },
  {
    id: "services-consolidated",
    date: "2026-05-06",
    task: "Estrutura de serviços consolidada",
    status: "active",
    category: "Serviços",
    summary:
      "A oferta foi reorganizada para conectar posicionamento, captação, conversão e operação sem tratar tudo como peça solta.",
    points: ["Sites e landing pages", "Captação e tráfego", "CRM e automações"],
  },
  {
    id: "local-business-focus",
    date: "2026-04-27",
    task: "Foco em negócios locais reforçado",
    status: "completed",
    category: "Direção",
    summary:
      "A comunicação passa a assumir com mais clareza o foco em prestadores de serviço e operações locais que precisam de estrutura.",
    points: ["Psicólogos", "Advogados", "Corretores", "Clínicas e estética"],
  },
  {
    id: "site-foundation",
    date: "2026-04-09",
    task: "Base técnica e operacional do site refinada",
    status: "completed",
    category: "Estrutura",
    summary:
      "Arquitetura, rotas, conteúdo e base visual foram ajustados para sustentar atualizações contínuas com mais coerência.",
    points: ["Next.js", "Conteúdo estruturado", "Performance", "Painel interno"],
  },
  {
    id: "studio-direction",
    date: "2025-11-18",
    task: "Estúdio passa a unir estratégia, design e sistemas",
    status: "completed",
    category: "Estúdio",
    summary:
      "O trabalho deixa de ser apenas execução isolada e assume uma direção mais clara: resolver crescimento com estrutura.",
    points: ["Estratégia", "Direção visual", "Sistemas", "Execução"],
  },
  {
    id: "independent-beginning",
    date: "2025-05-03",
    task: "Início da construção independente",
    status: "completed",
    category: "Origem",
    summary:
      "A jornada pública começa com base enxuta, muito ajuste e a decisão de construir um portfólio que evolui junto com o trabalho.",
    points: ["Primeiros estudos", "Operação própria", "Aprendizado contínuo"],
  },
];

function toDateValue(date: string) {
  return new Date(`${date}T12:00:00-03:00`);
}

export function formatWorkTimelineDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  }).format(toDateValue(date));
}

export function formatWorkTimelineCompactDate(date: string) {
  const formatter = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    timeZone: "America/Sao_Paulo",
  });

  const parts = formatter.formatToParts(toDateValue(date));
  const day = parts.find((part) => part.type === "day")?.value ?? "";
  const month = (parts.find((part) => part.type === "month")?.value ?? "").replace(".", "");

  return `${day} ${month}`.trim();
}

function buildProjectJourneyEntry(project: BlogFile): WorkJourneyEntry | null {
  const date = project.metadata.publishedAt ?? project.metadata.updatedAt;

  if (!date) return null;

  const kindLabel = getWorkProjectKindLabel(project) ?? "Projeto";
  const points = getWorkProjectStack(project).slice(0, 4);

  return {
    id: `project-${project.slug}`,
    date,
    task: `${project.metadata.title} entrou no portfólio`,
    status: "published",
    category: "Portfólio",
    summary:
      project.metadata.summary ??
      `${kindLabel} publicado para documentar raciocínio, estrutura e direção do trabalho.`,
    points: points.length > 0 ? points : [kindLabel],
    href: getWorkProjectPath(project.slug),
    ctaLabel: project.metadata.kind === "client" ? "Abrir case" : "Abrir projeto",
  };
}

function isWorkJourneyEntry(entry: WorkJourneyEntry | null): entry is WorkJourneyEntry {
  return entry !== null;
}

export function buildWorkJourneyEntries(projects: BlogFile[]) {
  return [...manualJourneyEntries, ...projects.map(buildProjectJourneyEntry).filter(isWorkJourneyEntry)]
    .sort((left, right) => toDateValue(right.date).getTime() - toDateValue(left.date).getTime());
}
