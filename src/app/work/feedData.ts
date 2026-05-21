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
  building: { label: "Em construção" },
  active: { label: "Ativo" },
  published: { label: "Publicado" },
  note: { label: "Registro" },
};

const manualFeedEntries: WorkFeedEntry[] = [
  {
    id: "work-feed-reset",
    date: "2026-05-15",
    type: "Portfolio",
    status: "building",
    title: "Projetos em reorganização",
    summary:
      "Este espaço está sendo reorganizado para publicar projetos com mais contexto, clareza e critério.",
    notes: [
      "As próximas publicações vão mostrar decisões, processo e aprendizado",
      "Cada registro deve ajudar a entender o problema, a solução e o raciocínio por trás do projeto",
      "A curadoria prioriza clareza editorial antes de volume",
    ],
    tags: ["Projetos", "Curadoria", "Em breve"],
  },
  {
    id: "work-cases-hold",
    date: "2026-05-14",
    type: "Cases",
    status: "note",
    title: "Cases de clientes em reorganização",
    summary:
      "Os próximos cases devem aparecer com contexto, objetivo, decisão visual e aprendizados úteis para quem lê.",
    notes: [
      "Menos vitrine genérica, mais leitura de problema e solução",
      "O foco é mostrar escolhas reais de projeto",
      "Cada case precisa sustentar uma conclusão clara",
    ],
    tags: ["Clientes", "Feed", "Em breve"],
  },
  {
    id: "work-systems-hold",
    date: "2026-05-13",
    type: "Sistemas",
    status: "note",
    title: "Sistemas autorais em revisão",
    summary:
      "Os sistemas e experimentos autorais voltam quando puderem ser apresentados com escopo claro e valor prático.",
    notes: [
      "Publicar menos itens ajuda a explicar melhor cada decisão",
      "O valor está no raciocínio, não na quantidade de telas",
      "O /blog continua para marketing, design, conversão e produtos digitais",
    ],
    tags: ["Sistemas", "Produto", "Curadoria"],
  },
  {
    id: "site-foundation-refined",
    date: "2026-05-12",
    type: "Base",
    status: "note",
    title: "Base técnica e editorial refinada",
    summary:
      "A base do portfólio está pronta para receber projetos mais objetivos, com leitura rápida e contexto suficiente.",
    notes: [
      "Datas, tags e chamadas ficam a serviço da leitura",
      "A separação entre projeto e artigo fica mais clara",
      "A estrutura favorece contexto, decisão e próximo passo",
    ],
    tags: ["Next.js", "Conteúdo", "Arquitetura"],
  },
];

function toDateValue(date: string) {
  return new Date(`${date}T12:00:00-03:00`);
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
      `${kindLabel} publicado para documentar raciocínio, estrutura e execução.`,
    notes,
    tags: stack.slice(0, 4),
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
