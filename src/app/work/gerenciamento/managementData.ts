const workManagementStages = [
  {
    id: "briefing",
    label: "Contexto claro",
    description: "Escopo inicial e leitura comercial.",
  },
  {
    id: "planejamento",
    label: "Prioridade definida",
    description: "Estrutura, ordem e entregáveis.",
  },
  {
    id: "execucao",
    label: "Construção ativa",
    description: "Blocos, integrações e ajustes.",
  },
  {
    id: "revisao",
    label: "Validação final",
    description: "Checklist técnico antes da entrega.",
  },
  {
    id: "entregue",
    label: "Pronto para acompanhar",
    description: "Entrega concluída e documentada.",
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
  priority: "Alta" | "Média" | "Baixa";
  health: "Saudável" | "Atenção" | "Risco";
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
    summary: "Espaço reservado para o primeiro projeto que voltar ao portfólio.",
    stage: "briefing",
    priority: "Média",
    health: "Saudável",
    progress: 8,
    owner: "Henrique",
    dueDate: "2026-05-30",
    updatedAt: "2026-05-15",
    nextAction: "Definir qual projeto entra primeiro no feed público.",
    blockers: ["Curadoria dos cases ainda não finalizada."],
    deliverables: ["Título", "Resumo", "Estrutura do artigo"],
    tags: ["Case em seleção", "Portfólio público", "Leitura futura"],
    visibility: "público",
  },
  {
    id: "work-placeholder-internal-01",
    title: "Sistema autoral 01",
    client: "Placeholder interno",
    summary: "Reserva para um projeto interno que será republicado com escopo mais simples.",
    stage: "planejamento",
    priority: "Média",
    health: "Atenção",
    progress: 16,
    owner: "Henrique",
    dueDate: "2026-06-05",
    updatedAt: "2026-05-15",
    nextAction: "Escolher quais módulos entram no portfólio.",
    blockers: ["Escopo antigo ainda precisa ser condensado."],
    deliverables: ["Recorte funcional", "Texto de contexto", "Capturas novas"],
    tags: ["Escopo em corte", "Sistema autoral", "Uso interno"],
    visibility: "privado",
  },
  {
    id: "work-placeholder-client-02",
    title: "Case de cliente 02",
    client: "Placeholder",
    summary: "Reserva para um novo artigo de cliente quando a próxima publicação estiver pronta.",
    stage: "execucao",
    priority: "Baixa",
    health: "Saudável",
    progress: 28,
    owner: "Henrique",
    dueDate: "2026-06-12",
    updatedAt: "2026-05-15",
    nextAction: "Reestruturar o formato de case para ficar mais direto e leve.",
    blockers: [],
    deliverables: ["Estrutura visual", "Resumo objetivo", "CTA final"],
    tags: ["Case em edição", "Cliente real", "Feed público"],
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
