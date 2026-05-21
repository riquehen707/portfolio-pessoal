import {
  getWorkProjectCategory,
  getWorkProjectKindLabel,
  getWorkProjectObjective,
  getWorkProjectPath,
  getWorkProjectStack,
} from "@/app/work/projectData";
import { type BlogFile } from "@/utils/utils";

export type WorkFeedStatus = "building" | "active" | "published" | "note";

export type WorkFeedEntry = {
  id: string;
  date: string;
  type: string;
  status: WorkFeedStatus;
  title: string;
  summary: string;
  notes: string[];
  tags: string[];
  href?: string;
  ctaLabel?: string;
};

export const workFeedStatusMeta: Record<WorkFeedStatus, { label: string }> = {
  building: { label: "Ainda em ajuste" },
  active: { label: "Em uso" },
  published: { label: "Pronto para ler" },
  note: { label: "Contexto rápido" },
};

const manualFeedEntries: WorkFeedEntry[] = [
  {
    id: "work-feed-reset",
    date: "2026-05-15",
    type: "Portfolio",
    status: "building",
    title: "Projetos em reorganização",
    summary:
      "Projetos voltarão com contexto, critério e leitura rápida.",
    notes: [
      "Decisões, processo e aprendizado",
      "Problema, solução e raciocínio",
      "Clareza antes de volume",
    ],
    tags: ["Leitura em breve", "Critério editorial", "Menos volume"],
  },
  {
    id: "work-cases-hold",
    date: "2026-05-14",
    type: "Cases",
    status: "note",
    title: "Cases de clientes em reorganização",
    summary:
      "Cases voltarão com objetivo, decisão visual e aprendizado.",
    notes: [
      "Problema e solução",
      "Escolhas reais de projeto",
      "Conclusão clara",
    ],
    tags: ["Cases com contexto", "Decisões reais", "Em revisão"],
  },
  {
    id: "work-systems-hold",
    date: "2026-05-13",
    type: "Sistemas",
    status: "note",
    title: "Sistemas autorais em revisão",
    summary:
      "Sistemas autorais voltam com escopo claro e valor prático.",
    notes: [
      "Menos itens, mais critério",
      "Valor no raciocínio",
      "Blog para marketing, design e conversão",
    ],
    tags: ["Escopo claro", "Valor prático", "Produto autoral"],
  },
  {
    id: "site-foundation-refined",
    date: "2026-05-12",
    type: "Base",
    status: "note",
    title: "Base técnica e editorial refinada",
    summary:
      "Base pronta para projetos objetivos e leitura rápida.",
    notes: [
      "Datas e tags a serviço da leitura",
      "Projeto separado de artigo",
      "Contexto, decisão e próximo passo",
    ],
    tags: ["Base rápida", "Conteúdo legível", "Arquitetura clara"],
  },
];

function toDateValue(date: string) {
  return new Date(`${date}T12:00:00-03:00`);
}

function toUsefulStackLabel(stackItem: string) {
  const normalized = stackItem.toLowerCase();

  if (normalized.includes("next")) return "Página rápida";
  if (normalized.includes("react")) return "Interface modular";
  if (normalized.includes("scss") || normalized.includes("css")) return "Estilo consistente";
  if (normalized.includes("seo")) return "Busca preparada";
  if (normalized.includes("analytics")) return "Dados para leitura";
  if (normalized.includes("crm")) return "Leads organizados";
  if (normalized.includes("automation") || normalized.includes("automação")) return "Rotina automatizada";
  if (normalized.includes("api")) return "Canais conectados";

  return stackItem;
}

function buildProjectFeedEntry(project: BlogFile): WorkFeedEntry | null {
  const date = project.metadata.updatedAt ?? project.metadata.publishedAt;

  if (!date) return null;

  const kindLabel = getWorkProjectKindLabel(project) ?? "Projeto";
  const category = getWorkProjectCategory(project);
  const objective = getWorkProjectObjective(project);
  const stack = getWorkProjectStack(project);

  const notes = [
    objective ? `Objetivo: ${objective}` : null,
    category ? `Categoria: ${category}` : null,
    stack.length > 0 ? `Stack: ${stack.slice(0, 4).join(" / ")}` : null,
  ].filter(Boolean) as string[];

  return {
    id: `project-${project.slug}`,
    date,
    type: kindLabel,
    status: "published",
    title: project.metadata.title,
    summary:
      project.metadata.summary ??
      `${kindLabel} publicado com raciocínio, estrutura e execução.`,
    notes,
    tags: stack.slice(0, 4).map(toUsefulStackLabel),
    href: getWorkProjectPath(project.slug),
    ctaLabel: "Abrir artigo",
  };
}

function isWorkFeedEntry(entry: WorkFeedEntry | null): entry is WorkFeedEntry {
  return entry !== null;
}

export function buildWorkFeedEntries(projects: BlogFile[]) {
  return [...manualFeedEntries, ...projects.map(buildProjectFeedEntry).filter(isWorkFeedEntry)].sort(
    (left, right) => toDateValue(right.date).getTime() - toDateValue(left.date).getTime(),
  );
}
