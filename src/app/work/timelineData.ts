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
  detailsTitle?: string;
  href?: string;
  ctaLabel?: string;
};

export const workJourneyStatusMeta: Record<WorkJourneyStatus, { label: string }> = {
  "in-progress": { label: "Em andamento" },
  active: { label: "Ativo" },
  published: { label: "Publicado" },
  completed: { label: "Concluído" },
};

const manualJourneyEntries: WorkJourneyEntry[] = [
  {
    id: "portfolio-in-construction",
    date: "2026-05-12",
    task: "Portfólio em construção",
    status: "in-progress",
    category: "Portfólio",
    summary:
      "A área de projetos deixou de ser uma vitrine estática e passou a registrar o que está sendo construído, ajustado e publicado ao longo do tempo.",
    points: [
      "A página agora evolui por datas reais",
      "Cada etapa entra com tarefa e status",
      "A leitura foi simplificada para mostrar continuidade",
    ],
    detailsTitle: "O que está acontecendo",
  },
  {
    id: "services-consolidated",
    date: "2026-05-06",
    task: "Estrutura de serviços consolidada",
    status: "active",
    category: "Serviços",
    summary:
      "Os serviços passaram a ser organizados como um sistema de aquisição, conversão e operação, em vez de aparecerem como entregas isoladas.",
    points: [
      "Sites e landing pages para captação",
      "CRM e automações para organizar o atendimento",
      "Oferta mais clara para negócios locais e serviços especializados",
    ],
    detailsTitle: "O que foi estruturado",
  },
  {
    id: "local-business-focus",
    date: "2026-04-27",
    task: "Foco em negócios locais reforçado",
    status: "completed",
    category: "Direção",
    summary:
      "A comunicação passa a assumir com mais clareza o foco em prestadores de serviço e operações locais que precisam crescer com mais estrutura.",
    points: [
      "Psicólogos, advogados e corretores entram no foco",
      "Clínicas, estética e serviços especializados ganham prioridade",
      "A narrativa passa a falar de agenda, recorrência e venda com mais precisão",
    ],
    detailsTitle: "Quem entrou no foco",
  },
  {
    id: "site-foundation",
    date: "2026-04-09",
    task: "Base técnica e operacional do site refinada",
    status: "completed",
    category: "Estrutura",
    summary:
      "A arquitetura do site foi ajustada para suportar atualização contínua de conteúdo, páginas de serviço, estudos e marcos do portfólio.",
    points: [
      "Rotas e conteúdo organizados com mais coerência",
      "Base visual preparada para crescer sem perder direção",
      "Painel interno e estrutura editorial mantidos como apoio operacional",
    ],
    detailsTitle: "O que foi consolidado",
  },
  {
    id: "ufrb-bct-beginning",
    date: "2026-03-30",
    task: "Mudança para cursar BC&T na UFRB",
    status: "completed",
    category: "Origem",
    summary:
      "Esta fase da jornada começa com a mudança para cursar o Bacharelado em Ciência e Tecnologia na UFRB, marcando um novo ponto de partida para estudo, trabalho e construção do portfólio.",
    points: [
      "Mudança realizada em 30 de março de 2026",
      "Início da fase ligada ao BC&T na UFRB",
      "Recomeço com base acadêmica e construção prática andando juntas",
    ],
    detailsTitle: "Onde começa",
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

function buildProjectJourneyEntry(project: BlogFile): WorkJourneyEntry | null {
  const date = project.metadata.publishedAt ?? project.metadata.updatedAt;

  if (!date) return null;

  const kindLabel = getWorkProjectKindLabel(project) ?? "Projeto";
  const points = [
    project.metadata.objective ? `Objetivo: ${project.metadata.objective}` : null,
    project.metadata.category ? `Categoria: ${project.metadata.category}` : null,
    ...getWorkProjectStack(project).slice(0, 3),
  ].filter(Boolean) as string[];

  return {
    id: `project-${project.slug}`,
    date,
    task: project.metadata.title,
    status: "published",
    category: kindLabel,
    summary:
      project.metadata.summary ??
      `${kindLabel} publicado para documentar estrutura, raciocínio e direção do trabalho.`,
    points: points.length > 0 ? points : [kindLabel],
    detailsTitle: "Stack e contexto",
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
