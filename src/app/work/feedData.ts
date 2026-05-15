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
  building: { label: "Em construcao" },
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
    title: "Projetos ainda nao inseridos",
    summary:
      "O /work foi reiniciado para receber um feed mais simples. Os projetos anteriores foram removidos e os novos ainda nao foram publicados aqui.",
    notes: [
      "Os cases antigos foram retirados para reduzir complexidade",
      "Os proximos projetos entram aqui como artigos do proprio portfolio",
      "Enquanto isso, este feed fica somente com registros de reorganizacao",
    ],
    tags: ["Placeholder", "Portfolio", "Reset"],
  },
  {
    id: "work-cases-hold",
    date: "2026-05-14",
    type: "Cases",
    status: "note",
    title: "Cases de clientes em reorganizacao",
    summary:
      "Os artigos de projetos de clientes serao republicados aos poucos, com estrutura mais enxuta e menos camadas tecnicas desnecessarias.",
    notes: [
      "Nenhum case de cliente esta publicado neste momento",
      "A ideia agora e documentar melhor contexto, execucao e aprendizados",
      "Quando entrar um novo projeto, ele aparece aqui antes de qualquer grid fixa",
    ],
    tags: ["Clientes", "Feed", "Em breve"],
  },
  {
    id: "work-systems-hold",
    date: "2026-05-13",
    type: "Sistemas",
    status: "note",
    title: "Projetos autorais serao reinseridos do zero",
    summary:
      "Os sistemas e experimentos internos tambem foram limpos para voltar com escopo mais claro, menos ruido e melhor criterio de publicacao.",
    notes: [
      "A parte publica fica reduzida ate a nova selecao de projetos entrar",
      "O foco agora e publicar menos itens, mas com mais clareza",
      "O /blog continua separado para estudos, analises e noticias",
    ],
    tags: ["Interno", "Sistemas", "Curadoria"],
  },
  {
    id: "site-foundation-refined",
    date: "2026-05-12",
    type: "Base",
    status: "note",
    title: "Base tecnica e editorial refinada",
    summary:
      "A arquitetura do site foi mantida pronta para receber novos projetos, mas o conteudo publicado do /work agora volta para um estado minimo e controlado.",
    notes: [
      "O feed continua preparado para datas, tags e CTAs",
      "A separacao entre /work e /blog foi preservada",
      "Os proximos artigos podem entrar sem reativar a complexidade antiga",
    ],
    tags: ["Next.js", "Conteudo", "Arquitetura"],
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
      `${kindLabel} publicado para documentar raciocinio, estrutura e execucao.`,
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
