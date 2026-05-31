import {
  getWorkProjectCategory,
  getWorkProjectKindLabel,
  getWorkProjectObjective,
  getWorkProjectPath,
  getWorkProjectStack,
} from "@/app/work/projectData";
import { type BlogFile } from "@/utils/utils";

export type WorkFeedStatus = "building" | "active" | "published" | "note";
export type WorkFeedCategory = "case" | "backstage" | "learning" | "system" | "experiment";

export type WorkFeedEntry = {
  id: string;
  date: string;
  category: WorkFeedCategory;
  type: string;
  status: WorkFeedStatus;
  title: string;
  summary: string;
  context: string;
  decision: string;
  learning: string;
  notes: string[];
  tags: string[];
  href?: string;
  ctaLabel?: string;
};

export const workFeedStatusMeta: Record<WorkFeedStatus, { label: string }> = {
  building: { label: "Em ajuste" },
  active: { label: "Em uso" },
  published: { label: "Publicado" },
  note: { label: "Registro" },
};

export const workFeedCategoryMeta: Record<
  WorkFeedCategory,
  { label: string; description: string }
> = {
  case: {
    label: "Casos",
    description: "Projetos com contexto, decisão, execução e aprendizado.",
  },
  backstage: {
    label: "Bastidores",
    description: "Registros de processo, escolhas de interface e construção.",
  },
  learning: {
    label: "Aprendizados",
    description: "Observações que podem virar guia, artigo ou ajuste de método.",
  },
  system: {
    label: "Sistemas",
    description: "Estruturas, fluxos, templates e componentes criados para operar melhor.",
  },
  experiment: {
    label: "Experimentos",
    description: "Testes em andamento antes de virar produto, case ou artigo definitivo.",
  },
};

const manualFeedEntries: WorkFeedEntry[] = [
  {
    id: "work-site-lab",
    date: "2026-05-15",
    category: "backstage",
    type: "Bastidores",
    status: "active",
    title: "O site como laboratório editorial",
    summary:
      "Uso este site para testar trilhas, busca, leitura mobile e páginas que não dependem só do menu.",
    context: "O site estava virando uma soma de páginas corretas, mas pouco conectadas.",
    decision: "Separar biblioteca, mapa, trilhas e laboratório por função de navegação.",
    learning: "Quando cada página tem um papel claro, o usuário precisa de menos explicação.",
    notes: [
      "Biblioteca para buscas long-tail",
      "Mapa para progressão de aprendizado",
      "Work para decisões e bastidores",
    ],
    tags: ["Base viva", "Arquitetura editorial", "UX de leitura"],
    href: "/mapa",
    ctaLabel: "Ver mapa",
  },
  {
    id: "work-cases-method",
    date: "2026-05-14",
    category: "case",
    type: "Casos",
    status: "building",
    title: "Formato de estudos de caso",
    summary:
      "Os estudos de caso precisam mostrar o raciocínio, não uma vitrine de resultado bonito.",
    context: "Card com nome, categoria e botão não explica por que o projeto importa.",
    decision: "Usar uma estrutura fixa: problema, escolha feita, execução e aprendizado.",
    learning: "Case útil mostra decisão. Resultado sem contexto vira propaganda.",
    notes: ["Problema antes da solução", "Escolhas reais de projeto", "Aprendizado reutilizável"],
    tags: ["Estudos de caso", "Decisões reais", "Processo"],
    href: "/blog/termos-de-marketing",
    ctaLabel: "Ler base de marketing",
  },
  {
    id: "work-systems-lab",
    date: "2026-05-13",
    category: "system",
    type: "Sistemas",
    status: "active",
    title: "Sistemas autorais em uso interno",
    summary:
      "Ferramentas internas entram aqui quando resolvem uma repetição real de conteúdo, atendimento ou dados.",
    context: "Nem todo problema precisa virar produto público no começo.",
    decision: "Criar estruturas pequenas para resolver um uso real antes de aumentar escopo.",
    learning: "Sistema bom nasce de repetição observada, não de funcionalidade sobrando.",
    notes: [
      "Escopo pequeno antes de produto",
      "Valor prático antes de volume",
      "Registro do raciocínio por trás da ferramenta",
    ],
    tags: ["Ferramentas", "Produto autoral", "Operação"],
    href: "/servicos/produtos",
    ctaLabel: "Ver ferramentas",
  },
  {
    id: "work-decisions-log",
    date: "2026-05-12",
    category: "experiment",
    type: "Experimentos",
    status: "note",
    title: "Registro de decisões de interface e conteúdo",
    summary:
      "Mudanças de menu, footer, busca, tabelas e trilhas ensinam mais quando explicam o corte feito.",
    context: "Ajuste pequeno de UX se perde quando fica só no histórico do código.",
    decision: "Transformar decisões de interface em registros curtos, quando houver aprendizado.",
    learning: "Uma mudança pequena pode ensinar mais que uma entrega grande sem contexto.",
    notes: ["O que foi removido", "O que ficou mais claro", "Qual próximo ajuste faz sentido"],
    tags: ["Bastidores", "UX", "Conteúdo"],
    href: "/blog/termos-de-design",
    ctaLabel: "Ler base de design",
  },
  {
    id: "work-library-bridge",
    date: "2026-05-11",
    category: "learning",
    type: "Aprendizado",
    status: "note",
    title: "Quando um bastidor vira artigo",
    summary:
      "Alguns bastidores viram artigo quando deixam de ser um ajuste local e explicam um problema recorrente.",
    context: "Nem todo bastidor merece artigo. Alguns só precisam ficar como registro.",
    decision: "Usar a biblioteca para guias mais estáveis e o Work para processo em movimento.",
    learning: "O laboratório reduz repetição: o artigo ensina, o registro mostra a origem.",
    notes: ["Work registra processo", "Biblioteca organiza aprendizado", "Trilhas dão sequência"],
    tags: ["Biblioteca", "Aprendizado", "Conteúdo"],
    href: "/blog",
    ctaLabel: "Continuar na biblioteca",
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
  if (normalized.includes("automation") || normalized.includes("automação"))
    return "Rotina automatizada";
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
    objective ? `Problema: ${objective}` : null,
    category ? `Recorte: ${category}` : null,
    stack.length > 0 ? `Base: ${stack.slice(0, 4).join(" / ")}` : null,
  ].filter(Boolean) as string[];

  return {
    id: `project-${project.slug}`,
    date,
    category: project.metadata.kind === "study" ? "learning" : "case",
    type: kindLabel,
    status: "published",
    title: project.metadata.title,
    summary:
      project.metadata.summary ?? `${kindLabel} publicado com raciocínio, estrutura e execução.`,
    context: objective ?? "Projeto publicado para documentar uma decisão prática.",
    decision: category
      ? `Organizar o projeto pelo recorte ${category}.`
      : "Transformar o projeto em registro navegável.",
    learning:
      project.metadata.summary ??
      "O valor do projeto aparece melhor quando o processo fica visível.",
    notes,
    tags: stack.slice(0, 4).map(toUsefulStackLabel),
    href: getWorkProjectPath(project.slug),
    ctaLabel: "Ver caso",
  };
}

function isWorkFeedEntry(entry: WorkFeedEntry | null): entry is WorkFeedEntry {
  return entry !== null;
}

export function buildWorkFeedEntries(projects: BlogFile[]) {
  return [
    ...manualFeedEntries,
    ...projects.map(buildProjectFeedEntry).filter(isWorkFeedEntry),
  ].sort((left, right) => toDateValue(right.date).getTime() - toDateValue(left.date).getTime());
}
