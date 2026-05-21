const workManagementStages = [
  {
    id: "briefing",
    label: "Briefing",
    description: "Escopo inicial, leitura do contexto e alinhamento comercial.",
  },
  {
    id: "planejamento",
    label: "Planejamento",
    description: "Definicao de estrutura, prioridades e entregaveis da sprint.",
  },
  {
    id: "execucao",
    label: "Execução",
    description: "Construcao ativa, integrações e producao dos blocos principais.",
  },
  {
    id: "revisao",
    label: "Revisao",
    description: "Ajustes finos, validacao e checklist técnico antes da entrega.",
  },
  {
    id: "entregue",
    label: "Entregue",
    description: "Projeto concluido, documentado e pronto para acompanhamento.",
  },
] as const;

type WorkManagementStageId = (typeof workManagementStages)[number]["id"];

type WorkManagementItem = {
  id: string;
  slug?: string;
  title: string;
  client: string;
  summary: string;
  stage: WorkManagementStageId;
  priority: "Alta" | "Media" | "Baixa";
  health: "Saudavel" | "Atenção" | "Risco";
  progress: number;
  owner: string;
  dueDate: string;
  updatedAt: string;
  nextAction: string;
  blockers: string[];
  deliverables: string[];
  tags: string[];
  visibility: "público" | "privado";
};

const workManagementItems: WorkManagementItem[] = [
  {
    id: "work-placeholder-public-01",
    title: "Projeto público 01",
    client: "Placeholder",
    summary: "Espaço reservado para o primeiro projeto que voltar ao portfolio.",
    stage: "briefing",
    priority: "Media",
    health: "Saudavel",
    progress: 8,
    owner: "Henrique",
    dueDate: "2026-05-30",
    updatedAt: "2026-05-15",
    nextAction: "Definir qual projeto entra primeiro no feed público.",
    blockers: ["Curadoria dos cases ainda não finalizada."],
    deliverables: ["Titulo", "Resumo", "Estrutura do artigo"],
    tags: ["Placeholder", "Portfolio", "Público"],
    visibility: "público",
  },
  {
    id: "work-placeholder-internal-01",
    title: "Sistema autoral 01",
    client: "Placeholder interno",
    summary: "Reserva para um projeto interno que sera republicado com escopo mais simples.",
    stage: "planejamento",
    priority: "Media",
    health: "Atenção",
    progress: 16,
    owner: "Henrique",
    dueDate: "2026-06-05",
    updatedAt: "2026-05-15",
    nextAction: "Escolher quais módulos realmente valem entrar no portfolio.",
    blockers: ["Escopo antigo ainda precisa ser condensado."],
    deliverables: ["Recorte funcional", "Texto de contexto", "Capturas novas"],
    tags: ["Placeholder", "Sistema", "Interno"],
    visibility: "privado",
  },
  {
    id: "work-placeholder-client-02",
    title: "Case de cliente 02",
    client: "Placeholder",
    summary: "Reserva para um novo artigo de cliente quando a próxima publicacao estiver pronta.",
    stage: "execucao",
    priority: "Baixa",
    health: "Saudavel",
    progress: 28,
    owner: "Henrique",
    dueDate: "2026-06-12",
    updatedAt: "2026-05-15",
    nextAction: "Reestruturar o formato de case para ficar mais direto e leve.",
    blockers: [],
    deliverables: ["Estrutura visual", "Resumo objetivo", "CTA final"],
    tags: ["Placeholder", "Cliente", "Feed"],
    visibility: "público",
  },
];

export function getWorkManagementStages() {
  return workManagementStages;
}

export function getWorkManagementItems() {
  return workManagementItems.map((item) => ({
    ...item,
    stack: item.tags,
    publicHref: undefined,
    publicTitle: undefined,
    publicSummary: undefined,
  }));
}
