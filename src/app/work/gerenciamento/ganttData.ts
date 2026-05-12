import { cache } from "react";

import { z } from "zod";

import {
  getWorkProjectBySlug,
  getWorkProjectPath,
  getWorkProjectStack,
} from "@/app/work/projectData";

const WORK_GANTT_YEAR = 2026;

const workGanttFieldGroupLabels = {
  essencial: "Informacoes essenciais",
  estrategia: "Informacoes estrategicas",
  dependencias: "Dependencias",
  tempo: "Datas e tempo",
  operacional: "Controle operacional",
  visual: "Organizacao visual",
  comercial: "Multi-cliente / consultoria",
  kpi: "KPI vinculado",
} as const;

const workGanttStatusLabels = {
  todo: "A fazer",
  doing: "Em andamento",
  done: "Concluida",
} as const;

const workGanttPriorityLabels = {
  critica: "Critica",
  alta: "Alta",
  media: "Media",
  baixa: "Baixa",
} as const;

const workGanttCategoryLabels = {
  marketing: "Marketing",
  sistema: "Sistema",
  produto: "Produto",
  comercial: "Comercial",
  operacao: "Operacao",
  seo: "SEO",
  design: "Design",
  conteudo: "Conteudo",
  financeiro: "Financeiro",
  strategy: "Estrategia",
  system: "Sistema",
  analytics: "Analytics",
  growth: "Growth",
  crm: "CRM",
  "local-seo": "SEO local",
  content: "Conteudo",
  sales: "Vendas",
  management: "Gestao",
} as const;

const workGanttImpactLabels = {
  receita: "Receita",
  organizacao: "Organizacao",
  autoridade: "Autoridade",
  retencao: "Retencao",
} as const;

const workGanttRiskLabels = {
  baixo: "Baixo",
  medio: "Medio",
  alto: "Alto",
} as const;

const workGanttDependencyTypeLabels = {
  "finish-to-start": "Finish to Start",
  "start-to-start": "Start to Start",
  "finish-to-finish": "Finish to Finish",
  "start-to-finish": "Start to Finish",
} as const;

const workGanttSwimlaneLabels = {
  growth: "Growth",
  sistema: "Sistema",
  financeiro: "Financeiro",
  operacao: "Operacao",
  produto: "Produto",
} as const;

const workGanttRecurrenceLabels = {
  nenhum: "Nenhuma",
  diario: "Diaria",
  semanal: "Semanal",
  quinzenal: "Quinzenal",
  mensal: "Mensal",
} as const;

const workGanttContractLabels = {
  mensal: "Mensal",
  projeto: "Projeto fechado",
  interno: "Interno",
} as const;

const workGanttHighlightLabels = {
  normal: "Normal",
  critical: "Critical",
  milestone: "Milestone",
} as const;

const ganttListFieldSchema = z.union([z.string(), z.array(z.string())]).optional();

const workGanttProjectInputSchema = z.object({
  id: z.string().min(1),
  cliente_id: z.string().min(1),
  projeto: z.string().min(1),
  slug: z.string().min(1).optional(),
  contrato: z.enum(["mensal", "projeto", "interno"]),
  horas_disponiveis_semana: z.number().min(0),
  valor_mensal: z.string().min(1),
  margem_estimativa: z.string().min(1),
  ano: z.number().int().min(2024).max(2035).default(WORK_GANTT_YEAR),
  responsavel: z.string().min(1),
  visibilidade: z.enum(["publico", "privado"]),
  start_week: z.number().int().min(1).max(53).optional(),
  end_week: z.number().int().min(1).max(53).optional(),
  timezone: z.string().min(1).optional(),
  status: z.string().min(1).optional(),
  objective: z.string().min(1).optional(),
  kpis: z
    .array(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        baseline: z.union([z.string(), z.number(), z.null()]).optional(),
        goal: z.union([z.string(), z.number(), z.null()]).optional(),
      }),
    )
    .optional(),
});

const workGanttTaskInputSchema = z
  .object({
    id: z.string().min(1),
    projeto_id: z.string().min(1),
    nome: z.string().min(1),
    descricao: z.string().min(1),
    projeto: z.string().min(1),
    semana_inicio: z.number().int().min(1).max(53),
    semana_fim: z.number().int().min(1).max(53).optional(),
    duracao_semanas: z.number().int().min(1).max(53).optional(),
    status: z.enum(["todo", "doing", "done"]),
    prioridade: z.enum(["critica", "alta", "media", "baixa"]),
    categoria: z.enum([
      "marketing",
      "sistema",
      "produto",
      "comercial",
      "operacao",
      "seo",
      "design",
      "conteudo",
      "financeiro",
      "strategy",
      "system",
      "analytics",
      "growth",
      "crm",
      "local-seo",
      "content",
      "sales",
      "management",
    ]),
    responsavel: z.string().min(1),
    fase: z.string().min(1).optional(),
    impacto_negocio: z.enum(["receita", "organizacao", "autoridade", "retencao"]),
    nivel_impacto: z.number().int().min(1).max(5),
    urgencia: z.number().int().min(1).max(5),
    esforco_horas: z.number().min(0),
    horas_semanais: z.number().min(0),
    roi_estimado: z.string().min(1),
    risco: z.enum(["baixo", "medio", "alto"]),
    dificuldade: z.number().int().min(1).max(5),
    visibilidade_cliente: z.enum(["sim", "nao"]),
    depende_de: ganttListFieldSchema,
    bloqueia: ganttListFieldSchema,
    tipo_dependencia: z
      .enum(["finish-to-start", "start-to-start", "finish-to-finish", "start-to-finish"])
      .default("finish-to-start"),
    ano: z.number().int().min(2024).max(2035).default(WORK_GANTT_YEAR),
    trimestre: z.enum(["Q1", "Q2", "Q3", "Q4"]).optional(),
    mes_inicio: z.string().min(1).optional(),
    deadline_real: z.string().min(1).optional(),
    marco: z.boolean().default(false),
    recorrente: z.enum(["nenhum", "diario", "semanal", "quinzenal", "mensal"]).default("nenhum"),
    buffer: z.number().int().min(0).max(8).default(0),
    progresso_percentual: z.number().min(0).max(100),
    horas_gastas: z.number().min(0),
    atraso: z.number().min(0).default(0),
    ultima_atualizacao: z.string().min(1),
    notas_execucao: z.string().min(1).optional(),
    impedimentos: ganttListFieldSchema,
    cor_categoria: z.string().min(1).optional(),
    swimlane: z.enum(["growth", "sistema", "financeiro", "operacao", "produto"]),
    ordem_exibicao: z.number().int().min(1),
    destaque: z.enum(["normal", "critical", "milestone"]).default("normal"),
    kpi_principal: z.string().min(1),
    meta_kpi: z.string().min(1),
    baseline: z.string().min(1),
    impacto_real: z.string().min(1).optional(),
  })
  .superRefine((value, context) => {
    if (!value.semana_fim && !value.duracao_semanas) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["semana_fim"],
        message: "Informe semana_fim ou duracao_semanas.",
      });
    }
  });

type WorkGanttFieldGroupId = keyof typeof workGanttFieldGroupLabels;
type WorkGanttStatus = keyof typeof workGanttStatusLabels;
type WorkGanttCategory = keyof typeof workGanttCategoryLabels;

type WorkGanttFieldDefinition = {
  key: string;
  label: string;
  group: WorkGanttFieldGroupId;
  scope: "task" | "project";
  required: boolean;
  inputType: "text" | "number" | "date" | "enum" | "boolean" | "array";
  description: string;
  example?: string;
};

type WorkGanttProjectInput = z.infer<typeof workGanttProjectInputSchema>;
type WorkGanttTaskInput = z.infer<typeof workGanttTaskInputSchema>;

type WorkGanttProject = {
  id: string;
  clientId: string;
  name: string;
  slug?: string;
  contract: keyof typeof workGanttContractLabels;
  contractLabel: string;
  weeklyCapacityHours: number;
  monthlyValue: string;
  marginEstimate: string;
  year: number;
  owner: string;
  visibility: "publico" | "privado";
  publicHref?: string;
  stack: string[];
  startWeek?: number;
  endWeek?: number;
  timezone?: string;
  status?: string;
  objective?: string;
  kpis: Array<{
    id: string;
    name: string;
    baseline?: string | number | null;
    goal?: string | number | null;
  }>;
};

type WorkGanttTask = {
  id: string;
  name: string;
  description: string;
  projectId: string;
  projectName: string;
  projectSlug?: string;
  clientId: string;
  owner: string;
  status: WorkGanttStatus;
  statusLabel: string;
  priority: keyof typeof workGanttPriorityLabels;
  priorityLabel: string;
  category: WorkGanttCategory;
  categoryLabel: string;
  phase?: string;
  businessImpact: keyof typeof workGanttImpactLabels;
  businessImpactLabel: string;
  impactLevel: number;
  urgency: number;
  effortHours: number;
  weeklyHours: number;
  roiEstimated: string;
  risk: keyof typeof workGanttRiskLabels;
  riskLabel: string;
  difficulty: number;
  clientVisible: boolean;
  dependencyType: keyof typeof workGanttDependencyTypeLabels;
  dependencyTypeLabel: string;
  dependencyIds: string[];
  blockingIds: string[];
  year: number;
  quarter: "Q1" | "Q2" | "Q3" | "Q4";
  startWeek: number;
  endWeek: number;
  durationWeeks: number;
  weekSpan: number[];
  bufferWeeks: number;
  bufferEndWeek: number;
  startDate: string;
  endDate: string;
  startMonthLabel: string;
  endMonthLabel: string;
  monthKeys: string[];
  monthLabels: string[];
  deadlineDate: string;
  isMilestone: boolean;
  recurrence: keyof typeof workGanttRecurrenceLabels;
  recurrenceLabel: string;
  progressPercent: number;
  spentHours: number;
  delayWeeks: number;
  updatedAt: string;
  executionNotes?: string;
  impediments: string[];
  color: string;
  swimlane: keyof typeof workGanttSwimlaneLabels;
  swimlaneLabel: string;
  displayOrder: number;
  highlight: keyof typeof workGanttHighlightLabels;
  highlightLabel: string;
  contract: keyof typeof workGanttContractLabels;
  contractLabel: string;
  weeklyCapacityHours: number;
  monthlyValue: string;
  marginEstimate: string;
  kpiPrimary: string;
  kpiTarget: string;
  kpiBaseline: string;
  actualImpact?: string;
  publicHref?: string;
};

type WorkGanttTimelineWeek = {
  weekNumber: number;
  label: string;
  startDate: string;
  endDate: string;
  monthKey: string;
  monthLabel: string;
};

type WorkGanttTimelineMonth = {
  key: string;
  label: string;
  startWeek: number;
  endWeek: number;
};

type WorkGanttProjectWindow = {
  projectId: string;
  projectName: string;
  projectSlug?: string;
  taskCount: number;
  startWeek: number;
  endWeek: number;
  startDate: string;
  endDate: string;
  startMonthLabel: string;
  endMonthLabel: string;
  periodLabel: string;
  publicHref?: string;
  contractLabel: string;
  weeklyCapacityHours: number;
  monthlyValue: string;
};

type WorkGanttDatasetFilters = {
  ano?: number;
  semana_inicio?: number;
  semana_fim?: number;
  projeto_ids?: string[];
  status?: WorkGanttStatus[];
  categorias?: WorkGanttCategory[];
};

const workGanttFieldDefinitions: WorkGanttFieldDefinition[] = [
  { key: "id", label: "ID", group: "essencial", scope: "task", required: true, inputType: "text", description: "Identificador unico da tarefa.", example: "TSK-001" },
  { key: "nome", label: "Nome", group: "essencial", scope: "task", required: true, inputType: "text", description: "Nome curto da tarefa.", example: "Criar funil evento maio" },
  { key: "descricao", label: "Descricao", group: "essencial", scope: "task", required: true, inputType: "text", description: "Escopo resumido da tarefa.", example: "Landing + WhatsApp + CTA" },
  { key: "projeto", label: "Projeto", group: "essencial", scope: "task", required: true, inputType: "text", description: "Nome do projeto ou cliente.", example: "Clinica Tereza Cristina" },
  { key: "fase", label: "Fase", group: "essencial", scope: "task", required: false, inputType: "text", description: "Agrupador estrategico do cronograma.", example: "Fundacao" },
  { key: "semana_inicio", label: "Semana inicial", group: "essencial", scope: "task", required: true, inputType: "number", description: "Semana ISO inicial do ano.", example: "18" },
  { key: "semana_fim", label: "Semana final", group: "essencial", scope: "task", required: false, inputType: "number", description: "Semana ISO final do ano.", example: "21" },
  { key: "duracao_semanas", label: "Duracao em semanas", group: "essencial", scope: "task", required: false, inputType: "number", description: "Duracao total em semanas.", example: "4" },
  { key: "status", label: "Status", group: "essencial", scope: "task", required: true, inputType: "enum", description: "Situacao atual da tarefa.", example: "doing" },
  { key: "prioridade", label: "Prioridade", group: "essencial", scope: "task", required: true, inputType: "enum", description: "Nivel de importancia.", example: "alta" },
  { key: "categoria", label: "Categoria", group: "essencial", scope: "task", required: true, inputType: "enum", description: "Area principal da tarefa.", example: "marketing" },
  { key: "responsavel", label: "Responsavel", group: "essencial", scope: "task", required: true, inputType: "text", description: "Executor principal da tarefa.", example: "Henrique" },
  { key: "impacto_negocio", label: "Impacto no negocio", group: "estrategia", scope: "task", required: true, inputType: "enum", description: "Frente de impacto do trabalho.", example: "receita" },
  { key: "nivel_impacto", label: "Nivel de impacto", group: "estrategia", scope: "task", required: true, inputType: "number", description: "Escala de 1 a 5 para impacto.", example: "5" },
  { key: "urgencia", label: "Urgencia", group: "estrategia", scope: "task", required: true, inputType: "number", description: "Escala de 1 a 5 para urgencia.", example: "4" },
  { key: "esforco_horas", label: "Esforco em horas", group: "estrategia", scope: "task", required: true, inputType: "number", description: "Carga horaria total prevista.", example: "18" },
  { key: "horas_semanais", label: "Horas por semana", group: "estrategia", scope: "task", required: true, inputType: "number", description: "Capacidade semanal prevista.", example: "6" },
  { key: "roi_estimado", label: "ROI estimado", group: "estrategia", scope: "task", required: true, inputType: "text", description: "Retorno esperado ou efeito esperado.", example: "Mais leads qualificados" },
  { key: "risco", label: "Risco", group: "estrategia", scope: "task", required: true, inputType: "enum", description: "Nivel de risco da entrega.", example: "medio" },
  { key: "dificuldade", label: "Dificuldade", group: "estrategia", scope: "task", required: true, inputType: "number", description: "Escala de 1 a 5 para dificuldade.", example: "3" },
  { key: "visibilidade_cliente", label: "Visibilidade para o cliente", group: "estrategia", scope: "task", required: true, inputType: "enum", description: "Se o cliente percebe diretamente a entrega.", example: "sim" },
  { key: "depende_de", label: "Depende de", group: "dependencias", scope: "task", required: false, inputType: "array", description: "IDs que precisam terminar ou iniciar antes.", example: "TSK-001" },
  { key: "bloqueia", label: "Bloqueia", group: "dependencias", scope: "task", required: false, inputType: "array", description: "IDs impactados por esta tarefa.", example: "TSK-002" },
  { key: "tipo_dependencia", label: "Tipo de dependencia", group: "dependencias", scope: "task", required: false, inputType: "enum", description: "Relacao entre tarefas.", example: "finish-to-start" },
  { key: "ano", label: "Ano", group: "tempo", scope: "task", required: true, inputType: "number", description: "Ano de referencia do planejamento.", example: "2026" },
  { key: "trimestre", label: "Trimestre", group: "tempo", scope: "task", required: false, inputType: "enum", description: "Trimestre do planejamento.", example: "Q2" },
  { key: "mes_inicio", label: "Mes inicial", group: "tempo", scope: "task", required: false, inputType: "text", description: "Mes inicial em linguagem humana.", example: "Maio" },
  { key: "deadline_real", label: "Deadline real", group: "tempo", scope: "task", required: false, inputType: "date", description: "Data alvo final da tarefa.", example: "2026-05-10" },
  { key: "marco", label: "Marco", group: "tempo", scope: "task", required: false, inputType: "boolean", description: "Se a linha representa um milestone.", example: "false" },
  { key: "recorrente", label: "Recorrencia", group: "tempo", scope: "task", required: false, inputType: "enum", description: "Padrao de recorrencia da tarefa.", example: "semanal" },
  { key: "buffer", label: "Buffer", group: "tempo", scope: "task", required: false, inputType: "number", description: "Semanas extras de margem.", example: "1" },
  { key: "progresso_percentual", label: "Progresso percentual", group: "operacional", scope: "task", required: true, inputType: "number", description: "Progresso de 0 a 100.", example: "65" },
  { key: "horas_gastas", label: "Horas gastas", group: "operacional", scope: "task", required: true, inputType: "number", description: "Horas reais executadas ate agora.", example: "12" },
  { key: "atraso", label: "Atraso", group: "operacional", scope: "task", required: false, inputType: "number", description: "Atraso em semanas.", example: "1" },
  { key: "ultima_atualizacao", label: "Ultima atualizacao", group: "operacional", scope: "task", required: true, inputType: "date", description: "Timestamp da revisao mais recente.", example: "2026-05-01T10:30:00-03:00" },
  { key: "notas_execucao", label: "Notas de execucao", group: "operacional", scope: "task", required: false, inputType: "text", description: "Contexto operativo livre.", example: "Aguardando assets do cliente" },
  { key: "impedimentos", label: "Impedimentos", group: "operacional", scope: "task", required: false, inputType: "array", description: "Bloqueios ou dependencias externas.", example: "Dependencia do cliente" },
  { key: "cor_categoria", label: "Cor da categoria", group: "visual", scope: "task", required: false, inputType: "text", description: "Cor usada na renderizacao do Gantt.", example: "#5AA9E6" },
  { key: "swimlane", label: "Swimlane", group: "visual", scope: "task", required: true, inputType: "enum", description: "Faixa de visualizacao do Gantt.", example: "growth" },
  { key: "ordem_exibicao", label: "Ordem de exibicao", group: "visual", scope: "task", required: true, inputType: "number", description: "Linha ou ordem da tarefa no quadro.", example: "3" },
  { key: "destaque", label: "Destaque", group: "visual", scope: "task", required: false, inputType: "enum", description: "Nivel de destaque visual.", example: "critical" },
  { key: "cliente_id", label: "Cliente ID", group: "comercial", scope: "project", required: true, inputType: "text", description: "Identificador do cliente ou conta.", example: "CLI-TC" },
  { key: "contrato", label: "Contrato", group: "comercial", scope: "project", required: true, inputType: "enum", description: "Modelo de contrato do projeto.", example: "projeto" },
  { key: "horas_disponiveis_semana", label: "Horas disponiveis por semana", group: "comercial", scope: "project", required: true, inputType: "number", description: "Capacidade semanal reservada.", example: "10" },
  { key: "valor_mensal", label: "Valor mensal", group: "comercial", scope: "project", required: true, inputType: "text", description: "Valor mensal ou equivalente.", example: "R$700" },
  { key: "margem_estimativa", label: "Margem estimativa", group: "comercial", scope: "project", required: true, inputType: "text", description: "Leitura de rentabilidade da conta.", example: "Alta" },
  { key: "kpi_principal", label: "KPI principal", group: "kpi", scope: "task", required: true, inputType: "text", description: "Indicador principal conectado a tarefa.", example: "Leads" },
  { key: "meta_kpi", label: "Meta KPI", group: "kpi", scope: "task", required: true, inputType: "text", description: "Meta ou variacao esperada.", example: "+20%" },
  { key: "baseline", label: "Baseline", group: "kpi", scope: "task", required: true, inputType: "text", description: "Ponto de partida do indicador.", example: "15 leads/mes" },
  { key: "impacto_real", label: "Impacto real", group: "kpi", scope: "task", required: false, inputType: "text", description: "Resultado observado apos execucao.", example: "Mais respostas em 7 dias" },
];

const workGanttProjectInputs: WorkGanttProjectInput[] = [
  {
    id: "PRJ-POL",
    cliente_id: "CLI-HR-INT-01",
    projeto: "Painel de Operacao Local",
    slug: "painel-operacao-local",
    contrato: "interno",
    horas_disponiveis_semana: 10,
    valor_mensal: "Interno",
    margem_estimativa: "Estrategica",
    ano: 2026,
    responsavel: "Henrique",
    visibilidade: "publico",
  },
  {
    id: "PRJ-PSI",
    cliente_id: "CLI-PSI-01",
    projeto: "Projeto Psicologia Clinica",
    contrato: "mensal",
    horas_disponiveis_semana: 8,
    valor_mensal: "R$ 2.800",
    margem_estimativa: "Media",
    ano: 2026,
    responsavel: "Henrique",
    visibilidade: "privado",
  },
  {
    id: "PRJ-PROD",
    cliente_id: "CLI-HR-INT-02",
    projeto: "Linha de Produtos Digitais",
    contrato: "interno",
    horas_disponiveis_semana: 6,
    valor_mensal: "Interno",
    margem_estimativa: "Alta",
    ano: 2026,
    responsavel: "Henrique",
    visibilidade: "privado",
  },
];

const importedWorkGanttPlanSchema = z.object({
  project: z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    client: z.string().min(1),
    owner: z.string().min(1),
    year: z.number().int().min(2024).max(2035),
    startWeek: z.number().int().min(1).max(53),
    endWeek: z.number().int().min(1).max(53),
    weeklyCapacityHours: z.number().min(0),
    timezone: z.string().min(1),
    status: z.string().min(1),
    objective: z.string().min(1),
  }),
  kpis: z.array(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1),
      baseline: z.union([z.string(), z.number(), z.null()]).nullable().optional(),
      goal: z.union([z.string(), z.number(), z.null()]).nullable().optional(),
    }),
  ),
  tasks: z.array(
    z.object({
      id: z.string().min(1),
      title: z.string().min(1),
      category: z.enum([
        "strategy",
        "system",
        "analytics",
        "growth",
        "crm",
        "local-seo",
        "content",
        "sales",
        "management",
      ]),
      phase: z.string().min(1),
      startWeek: z.number().int().min(1).max(53),
      endWeek: z.number().int().min(1).max(53),
      duration: z.number().int().min(1).max(53),
      priority: z.enum(["low", "medium", "high", "critical"]),
      status: z.enum(["todo", "doing", "done"]),
      estimatedHours: z.number().min(0),
      impactType: z.enum(["revenue", "organization", "authority", "retention"]),
      impactScore: z.number().int().min(1).max(5),
      owner: z.string().min(1),
      dependsOn: z.array(z.string()).optional(),
      kpi: z.string().nullable().optional(),
    }),
  ),
});

const importedTerezaCristinaPlan = importedWorkGanttPlanSchema.parse({
  project: {
    id: "proj_terezacristina_2026_q2",
    name: "Plano Estrategico 120 Dias - Clinica Tereza Cristina",
    client: "Clinica Tereza Cristina",
    owner: "Henrique Reis",
    year: 2026,
    startWeek: 18,
    endWeek: 36,
    weeklyCapacityHours: 10,
    timezone: "America/Bahia",
    status: "active",
    objective:
      "Organizar operacao, aumentar captacao, melhorar recorrencia e elevar ticket medio sem depender de midia paga.",
  },
  kpis: [
    { id: "kpi_01", name: "Leads Mensais", baseline: null, goal: "+30%" },
    { id: "kpi_02", name: "Agendamentos", baseline: null, goal: "+25%" },
    { id: "kpi_03", name: "Ticket Medio", baseline: null, goal: "+15%" },
    { id: "kpi_04", name: "Avaliacoes Google", baseline: 0, goal: 15 },
    { id: "kpi_05", name: "Taxa de Retorno", baseline: null, goal: "+20%" },
  ],
  tasks: [
    { id: "tsk_001", title: "Diagnostico operacional e comercial", category: "strategy", phase: "Fundacao", startWeek: 18, endWeek: 18, duration: 1, priority: "high", status: "done", estimatedHours: 4, impactType: "organization", impactScore: 5, owner: "Henrique", dependsOn: [], kpi: null },
    { id: "tsk_002", title: "Planejamento 120 dias e metas", category: "strategy", phase: "Fundacao", startWeek: 18, endWeek: 19, duration: 2, priority: "high", status: "doing", estimatedHours: 5, impactType: "organization", impactScore: 5, owner: "Henrique", dependsOn: ["tsk_001"] },
    { id: "tsk_003", title: "Sistema MVP de agendamento e registros", category: "system", phase: "Base Operacional", startWeek: 19, endWeek: 21, duration: 3, priority: "high", status: "doing", estimatedHours: 18, impactType: "organization", impactScore: 5, owner: "Henrique", dependsOn: [] },
    { id: "tsk_004", title: "Migracao dados 2025 para sistema", category: "system", phase: "Base Operacional", startWeek: 20, endWeek: 23, duration: 4, priority: "medium", status: "todo", estimatedHours: 12, impactType: "organization", impactScore: 4, owner: "Henrique", dependsOn: ["tsk_003"] },
    { id: "tsk_005", title: "Dashboard financeiro e indicadores", category: "analytics", phase: "Gestao", startWeek: 21, endWeek: 24, duration: 4, priority: "high", status: "todo", estimatedHours: 10, impactType: "organization", impactScore: 5, owner: "Henrique", dependsOn: ["tsk_003"] },
    { id: "tsk_006", title: "Funil rapido evento 10 de maio", category: "growth", phase: "Captacao", startWeek: 19, endWeek: 21, duration: 3, priority: "critical", status: "doing", estimatedHours: 10, impactType: "revenue", impactScore: 5, owner: "Henrique", dependsOn: [], kpi: "Leads Mensais" },
    { id: "tsk_007", title: "Reativacao de clientes antigos", category: "crm", phase: "Captacao", startWeek: 21, endWeek: 24, duration: 4, priority: "high", status: "todo", estimatedHours: 8, impactType: "revenue", impactScore: 5, owner: "Henrique", dependsOn: [] },
    { id: "tsk_008", title: "Otimizacao perfil Google Business", category: "local-seo", phase: "Presenca Digital", startWeek: 21, endWeek: 22, duration: 2, priority: "high", status: "todo", estimatedHours: 4, impactType: "authority", impactScore: 5, owner: "Henrique", dependsOn: [] },
    { id: "tsk_009", title: "Sistema de coleta de avaliacoes Google", category: "local-seo", phase: "Presenca Digital", startWeek: 22, endWeek: 28, duration: 7, priority: "high", status: "todo", estimatedHours: 8, impactType: "authority", impactScore: 5, owner: "Henrique", dependsOn: ["tsk_008"], kpi: "Avaliacoes Google" },
    { id: "tsk_010", title: "Banco de ideias de conteudo", category: "content", phase: "Marketing Base", startWeek: 19, endWeek: 20, duration: 2, priority: "high", status: "doing", estimatedHours: 6, impactType: "authority", impactScore: 4, owner: "Henrique", dependsOn: [] },
    { id: "tsk_011", title: "Banco de referencias e criadores", category: "content", phase: "Marketing Base", startWeek: 19, endWeek: 22, duration: 4, priority: "medium", status: "doing", estimatedHours: 5, impactType: "authority", impactScore: 3, owner: "Henrique", dependsOn: [] },
    { id: "tsk_012", title: "Banco de criativos (fotos e videos)", category: "content", phase: "Marketing Base", startWeek: 21, endWeek: 28, duration: 8, priority: "high", status: "todo", estimatedHours: 14, impactType: "authority", impactScore: 4, owner: "Henrique", dependsOn: ["tsk_010"] },
    { id: "tsk_013", title: "Captacao semanal de conteudo no local", category: "content", phase: "Conteudo Continuo", startWeek: 22, endWeek: 36, duration: 15, priority: "medium", status: "todo", estimatedHours: 15, impactType: "authority", impactScore: 4, owner: "Henrique", dependsOn: ["tsk_012"] },
    { id: "tsk_014", title: "Calendario editorial mensal", category: "content", phase: "Conteudo Continuo", startWeek: 24, endWeek: 36, duration: 13, priority: "medium", status: "todo", estimatedHours: 8, impactType: "authority", impactScore: 3, owner: "Henrique", dependsOn: ["tsk_010"] },
    { id: "tsk_015", title: "Colabs com parceiros e clientes", category: "growth", phase: "Parcerias", startWeek: 25, endWeek: 34, duration: 10, priority: "medium", status: "todo", estimatedHours: 10, impactType: "revenue", impactScore: 4, owner: "Henrique", dependsOn: [] },
    { id: "tsk_016", title: "Fluxo pos-atendimento e retorno", category: "crm", phase: "Retencao", startWeek: 26, endWeek: 31, duration: 6, priority: "high", status: "todo", estimatedHours: 8, impactType: "retention", impactScore: 5, owner: "Henrique", dependsOn: [] },
    { id: "tsk_017", title: "Combos e pacotes comerciais", category: "sales", phase: "Monetizacao", startWeek: 28, endWeek: 30, duration: 3, priority: "high", status: "todo", estimatedHours: 6, impactType: "revenue", impactScore: 5, owner: "Henrique", dependsOn: [] },
    { id: "tsk_018", title: "Estrategia ticket medio", category: "sales", phase: "Monetizacao", startWeek: 29, endWeek: 32, duration: 4, priority: "high", status: "todo", estimatedHours: 8, impactType: "revenue", impactScore: 5, owner: "Henrique", dependsOn: ["tsk_017"], kpi: "Ticket Medio" },
    { id: "tsk_019", title: "Relatorios semanais rapidos", category: "management", phase: "Gestao", startWeek: 19, endWeek: 36, duration: 18, priority: "medium", status: "doing", estimatedHours: 18, impactType: "organization", impactScore: 4, owner: "Henrique" },
    { id: "tsk_020", title: "Reunioes mensais de revisao", category: "management", phase: "Gestao", startWeek: 22, endWeek: 36, duration: 15, priority: "medium", status: "todo", estimatedHours: 6, impactType: "organization", impactScore: 4, owner: "Henrique" },
  ],
});

const workGanttTaskInputs: WorkGanttTaskInput[] = [
  {
    id: "TSK-POL-001",
    projeto_id: "PRJ-POL",
    nome: "Modelagem do pipeline operacional",
    descricao: "Estados, prioridades e leitura minima para leads e tarefas.",
    projeto: "Painel de Operacao Local",
    semana_inicio: 17,
    semana_fim: 18,
    duracao_semanas: 2,
    status: "done",
    prioridade: "media",
    categoria: "sistema",
    responsavel: "Henrique",
    impacto_negocio: "organizacao",
    nivel_impacto: 5,
    urgencia: 3,
    esforco_horas: 10,
    horas_semanais: 5,
    roi_estimado: "Menos dispersao na leitura da operacao comercial.",
    risco: "baixo",
    dificuldade: 2,
    visibilidade_cliente: "nao",
    depende_de: [],
    bloqueia: ["TSK-POL-002"],
    tipo_dependencia: "finish-to-start",
    ano: 2026,
    trimestre: "Q2",
    mes_inicio: "Abril",
    deadline_real: "2026-04-30",
    marco: false,
    recorrente: "nenhum",
    buffer: 0,
    progresso_percentual: 100,
    horas_gastas: 9,
    atraso: 0,
    ultima_atualizacao: "2026-04-30T14:20:00-03:00",
    notas_execucao: "Base de estados definida com foco em operacao enxuta.",
    impedimentos: [],
    cor_categoria: "#FF9F1C",
    swimlane: "sistema",
    ordem_exibicao: 4,
    destaque: "normal",
    kpi_principal: "Tempo medio de resposta",
    meta_kpi: "-30%",
    baseline: "Sem historico consolidado",
    impacto_real: "Criou base para automacoes e relatorios semanais.",
  },
  {
    id: "TSK-POL-002",
    projeto_id: "PRJ-POL",
    nome: "Resumo semanal e visao executiva",
    descricao: "Cards de gargalo, agenda e prioridade por semana da operacao.",
    projeto: "Painel de Operacao Local",
    semana_inicio: 19,
    semana_fim: 22,
    duracao_semanas: 4,
    status: "doing",
    prioridade: "media",
    categoria: "produto",
    responsavel: "Henrique",
    impacto_negocio: "organizacao",
    nivel_impacto: 4,
    urgencia: 3,
    esforco_horas: 22,
    horas_semanais: 5.5,
    roi_estimado: "Melhor leitura de gargalo sem depender de varias ferramentas.",
    risco: "medio",
    dificuldade: 4,
    visibilidade_cliente: "nao",
    depende_de: ["TSK-POL-001"],
    bloqueia: ["TSK-POL-003"],
    tipo_dependencia: "finish-to-start",
    ano: 2026,
    trimestre: "Q2",
    mes_inicio: "Maio",
    deadline_real: "2026-05-18",
    marco: false,
    recorrente: "nenhum",
    buffer: 1,
    progresso_percentual: 58,
    horas_gastas: 13,
    atraso: 0,
    ultima_atualizacao: "2026-05-09T09:45:00-03:00",
    notas_execucao: "Cards principais em construcao com revisao de filtros.",
    impedimentos: ["Definir regra final de prioridade automatica para follow-up."],
    cor_categoria: "#7C5CFF",
    swimlane: "produto",
    ordem_exibicao: 5,
    destaque: "critical",
    kpi_principal: "Leads em follow-up no prazo",
    meta_kpi: "+40%",
    baseline: "Follow-up inconsistente",
    impacto_real: "Deve reduzir atraso operacional no comercial.",
  },
  {
    id: "TSK-POL-003",
    projeto_id: "PRJ-POL",
    nome: "Automacoes de tarefas recorrentes",
    descricao: "Lembretes, filas de follow-up e rotina de manutencao semanal.",
    projeto: "Painel de Operacao Local",
    semana_inicio: 23,
    semana_fim: 25,
    duracao_semanas: 3,
    status: "todo",
    prioridade: "media",
    categoria: "operacao",
    responsavel: "Henrique",
    impacto_negocio: "retencao",
    nivel_impacto: 3,
    urgencia: 2,
    esforco_horas: 14,
    horas_semanais: 4.5,
    roi_estimado: "Menos tarefas manuais e mais consistencia de rotina.",
    risco: "medio",
    dificuldade: 3,
    visibilidade_cliente: "nao",
    depende_de: ["TSK-POL-002"],
    bloqueia: [],
    tipo_dependencia: "finish-to-start",
    ano: 2026,
    trimestre: "Q2",
    mes_inicio: "Junho",
    deadline_real: "2026-06-19",
    marco: false,
    recorrente: "semanal",
    buffer: 1,
    progresso_percentual: 0,
    horas_gastas: 0,
    atraso: 0,
    ultima_atualizacao: "2026-05-09T09:45:00-03:00",
    notas_execucao: "Backlog pronto para a proxima sprint tecnica.",
    impedimentos: [],
    cor_categoria: "#FF7F50",
    swimlane: "operacao",
    ordem_exibicao: 6,
    destaque: "normal",
    kpi_principal: "Tarefas atrasadas",
    meta_kpi: "-50%",
    baseline: "Volume alto de rotina manual",
    impacto_real: "Ainda nao executado.",
  },
  {
    id: "TSK-PSI-001",
    projeto_id: "PRJ-PSI",
    nome: "Briefing da oferta e especialidades",
    descricao: "Mapear especialidades, diferenciais e prova de confianca da profissional.",
    projeto: "Projeto Psicologia Clinica",
    semana_inicio: 18,
    semana_fim: 19,
    duracao_semanas: 2,
    status: "doing",
    prioridade: "alta",
    categoria: "marketing",
    responsavel: "Henrique",
    impacto_negocio: "autoridade",
    nivel_impacto: 4,
    urgencia: 4,
    esforco_horas: 8,
    horas_semanais: 4,
    roi_estimado: "Melhor aderencia entre oferta real e estrutura do site.",
    risco: "alto",
    dificuldade: 2,
    visibilidade_cliente: "sim",
    depende_de: [],
    bloqueia: ["TSK-PSI-002"],
    tipo_dependencia: "finish-to-start",
    ano: 2026,
    trimestre: "Q2",
    mes_inicio: "Maio",
    deadline_real: "2026-05-08",
    marco: false,
    recorrente: "nenhum",
    buffer: 1,
    progresso_percentual: 55,
    horas_gastas: 4,
    atraso: 1,
    ultima_atualizacao: "2026-05-07T17:00:00-03:00",
    notas_execucao: "Briefing parcial, ainda faltam provas e especialidades priorizadas.",
    impedimentos: ["Cliente ainda nao consolidou especialidades e provas de confianca."],
    cor_categoria: "#4E88FF",
    swimlane: "growth",
    ordem_exibicao: 7,
    destaque: "critical",
    kpi_principal: "Taxa de conversao em contato",
    meta_kpi: "+18%",
    baseline: "Presenca atual sem foco claro",
    impacto_real: "Dependente da consolidacao do briefing.",
  },
  {
    id: "TSK-PSI-002",
    projeto_id: "PRJ-PSI",
    nome: "Arquitetura de paginas e wireframe",
    descricao: "Definir hero, paginas de atendimento, CTA e caminho de agendamento.",
    projeto: "Projeto Psicologia Clinica",
    semana_inicio: 20,
    semana_fim: 22,
    duracao_semanas: 3,
    status: "todo",
    prioridade: "alta",
    categoria: "design",
    responsavel: "Henrique",
    impacto_negocio: "receita",
    nivel_impacto: 4,
    urgencia: 4,
    esforco_horas: 16,
    horas_semanais: 5.5,
    roi_estimado: "Estrutura de pagina pronta para captar contato com menos ruido.",
    risco: "medio",
    dificuldade: 3,
    visibilidade_cliente: "sim",
    depende_de: ["TSK-PSI-001"],
    bloqueia: [],
    tipo_dependencia: "finish-to-start",
    ano: 2026,
    trimestre: "Q2",
    mes_inicio: "Maio",
    deadline_real: "2026-05-22",
    marco: false,
    recorrente: "nenhum",
    buffer: 1,
    progresso_percentual: 0,
    horas_gastas: 0,
    atraso: 0,
    ultima_atualizacao: "2026-05-07T17:00:00-03:00",
    notas_execucao: "Aguardando briefing consolidado.",
    impedimentos: ["Briefing da oferta ainda nao finalizado."],
    cor_categoria: "#D46BFF",
    swimlane: "growth",
    ordem_exibicao: 8,
    destaque: "normal",
    kpi_principal: "Conversas agendadas",
    meta_kpi: "+15%",
    baseline: "Contato disperso",
    impacto_real: "Ainda nao executado.",
  },
  {
    id: "TSK-PROD-001",
    projeto_id: "PRJ-PROD",
    nome: "Mapa de ofertas e recortes de produto",
    descricao: "Definir o que vira produto pago, lead magnet e oferta de entrada.",
    projeto: "Linha de Produtos Digitais",
    semana_inicio: 19,
    semana_fim: 20,
    duracao_semanas: 2,
    status: "doing",
    prioridade: "media",
    categoria: "produto",
    responsavel: "Henrique",
    impacto_negocio: "receita",
    nivel_impacto: 4,
    urgencia: 3,
    esforco_horas: 9,
    horas_semanais: 4.5,
    roi_estimado: "Linha de oferta mais clara e vendavel.",
    risco: "medio",
    dificuldade: 3,
    visibilidade_cliente: "nao",
    depende_de: [],
    bloqueia: ["TSK-PROD-002"],
    tipo_dependencia: "finish-to-start",
    ano: 2026,
    trimestre: "Q2",
    mes_inicio: "Maio",
    deadline_real: "2026-05-15",
    marco: false,
    recorrente: "nenhum",
    buffer: 1,
    progresso_percentual: 40,
    horas_gastas: 3,
    atraso: 0,
    ultima_atualizacao: "2026-05-09T08:10:00-03:00",
    notas_execucao: "Recortes iniciais definidos; falta ordenar lancamento.",
    impedimentos: [],
    cor_categoria: "#7C5CFF",
    swimlane: "produto",
    ordem_exibicao: 9,
    destaque: "normal",
    kpi_principal: "Receita recorrente",
    meta_kpi: "Primeiro produto validado no trimestre",
    baseline: "Catalogo ainda indefinido",
    impacto_real: "Base para acelerar a pagina de produtos.",
  },
  {
    id: "TSK-PROD-002",
    projeto_id: "PRJ-PROD",
    nome: "Pagina de produtos e copy comercial",
    descricao: "Montar grade de produtos, CTA e estrutura de pedido de orcamento.",
    projeto: "Linha de Produtos Digitais",
    semana_inicio: 21,
    semana_fim: 24,
    duracao_semanas: 4,
    status: "todo",
    prioridade: "media",
    categoria: "comercial",
    responsavel: "Henrique",
    impacto_negocio: "receita",
    nivel_impacto: 5,
    urgencia: 3,
    esforco_horas: 18,
    horas_semanais: 4.5,
    roi_estimado: "Pagina pronta para monetizacao da linha de ativos.",
    risco: "medio",
    dificuldade: 4,
    visibilidade_cliente: "nao",
    depende_de: ["TSK-PROD-001"],
    bloqueia: [],
    tipo_dependencia: "finish-to-start",
    ano: 2026,
    trimestre: "Q2",
    mes_inicio: "Maio",
    deadline_real: "2026-06-05",
    marco: false,
    recorrente: "nenhum",
    buffer: 1,
    progresso_percentual: 0,
    horas_gastas: 0,
    atraso: 0,
    ultima_atualizacao: "2026-05-09T08:10:00-03:00",
    notas_execucao: "Backlog priorizado para depois do mapa de oferta.",
    impedimentos: [],
    cor_categoria: "#2AA876",
    swimlane: "produto",
    ordem_exibicao: 10,
    destaque: "milestone",
    kpi_principal: "Pedidos de orcamento",
    meta_kpi: "Primeiros 5 pedidos",
    baseline: "Pagina sem estrutura final",
    impacto_real: "Ainda nao executado.",
  },
];

function normalizeListField(value?: string | string[]) {
  if (!value) return [];
  return Array.isArray(value) ? value.filter(Boolean) : [value].filter(Boolean);
}

function padWeek(week: number) {
  return String(week).padStart(2, "0");
}

function formatWeekLabel(week: number) {
  return `S${padWeek(week)}`;
}

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getQuarterFromWeek(week: number): "Q1" | "Q2" | "Q3" | "Q4" {
  if (week <= 13) return "Q1";
  if (week <= 26) return "Q2";
  if (week <= 39) return "Q3";
  return "Q4";
}

function getIsoWeekStartDate(year: number, week: number) {
  const januaryFourth = new Date(Date.UTC(year, 0, 4));
  const januaryFourthWeekday = januaryFourth.getUTCDay() || 7;
  const mondayOfWeekOne = new Date(januaryFourth);
  mondayOfWeekOne.setUTCDate(januaryFourth.getUTCDate() - januaryFourthWeekday + 1);

  const weekStart = new Date(mondayOfWeekOne);
  weekStart.setUTCDate(mondayOfWeekOne.getUTCDate() + (week - 1) * 7);

  return weekStart;
}

function getIsoWeekNumber(date: Date) {
  const normalized = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const weekday = normalized.getUTCDay() || 7;

  normalized.setUTCDate(normalized.getUTCDate() + 4 - weekday);

  const yearStart = new Date(Date.UTC(normalized.getUTCFullYear(), 0, 1));
  return Math.ceil((((+normalized - +yearStart) / 86_400_000) + 1) / 7);
}

function getIsoWeekCountForYear(year: number) {
  return getIsoWeekNumber(new Date(Date.UTC(year, 11, 28)));
}

function clampWeek(year: number, week: number) {
  const maxWeek = getIsoWeekCountForYear(year);
  return Math.min(Math.max(week, 1), maxWeek);
}

function getIsoWeekEndDate(year: number, week: number) {
  const endDate = new Date(getIsoWeekStartDate(year, week));
  endDate.setUTCDate(endDate.getUTCDate() + 6);
  return endDate;
}

function formatMonthLabel(date: Date) {
  return capitalize(
    new Intl.DateTimeFormat("pt-BR", { month: "long", timeZone: "UTC" }).format(date),
  );
}

function formatMonthKey(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function buildWeekSpan(startWeek: number, endWeek: number) {
  return Array.from({ length: endWeek - startWeek + 1 }, (_, index) => startWeek + index);
}

function inferImportedPriority(priority: "low" | "medium" | "high" | "critical") {
  if (priority === "critical") return "critica" as const;
  if (priority === "high") return "alta" as const;
  if (priority === "medium") return "media" as const;
  return "baixa" as const;
}

function inferImportedImpact(impact: "revenue" | "organization" | "authority" | "retention") {
  if (impact === "revenue") return "receita" as const;
  if (impact === "organization") return "organizacao" as const;
  if (impact === "authority") return "autoridade" as const;
  return "retencao" as const;
}

function inferImportedUrgency(priority: "low" | "medium" | "high" | "critical") {
  if (priority === "critical") return 5;
  if (priority === "high") return 4;
  if (priority === "medium") return 3;
  return 2;
}

function inferImportedDifficulty(estimatedHours: number, duration: number) {
  const density = estimatedHours / Math.max(duration, 1);

  if (estimatedHours >= 16 || density >= 6) return 4;
  if (estimatedHours >= 9 || density >= 4) return 3;
  return 2;
}

function inferImportedRisk(priority: "low" | "medium" | "high" | "critical", duration: number) {
  if (priority === "critical") return "alto" as const;
  if (priority === "high" || duration >= 6) return "medio" as const;
  return "baixo" as const;
}

function inferImportedVisibility(category: z.infer<typeof importedWorkGanttPlanSchema>["tasks"][number]["category"]) {
  if (category === "system" || category === "analytics" || category === "management") {
    return "nao" as const;
  }

  return "sim" as const;
}

function inferImportedSwimlane(category: z.infer<typeof importedWorkGanttPlanSchema>["tasks"][number]["category"]) {
  if (category === "system") return "sistema" as const;
  if (category === "analytics") return "financeiro" as const;
  if (category === "management") return "operacao" as const;
  if (category === "sales") return "produto" as const;
  return "growth" as const;
}

function inferImportedRecurrence(taskTitle: string) {
  if (taskTitle.toLowerCase().includes("relatorios semanais")) return "semanal" as const;
  if (taskTitle.toLowerCase().includes("reunioes mensais")) return "mensal" as const;
  return "nenhum" as const;
}

function inferImportedProgress(status: "todo" | "doing" | "done") {
  if (status === "done") return 100;
  if (status === "doing") return 45;
  return 0;
}

function inferImportedSpentHours(status: "todo" | "doing" | "done", estimatedHours: number) {
  if (status === "done") return estimatedHours;
  if (status === "doing") return Number((estimatedHours * 0.45).toFixed(1));
  return 0;
}

function inferImportedDefaultKpi(
  impactType: "revenue" | "organization" | "authority" | "retention",
) {
  if (impactType === "revenue") return "Leads Mensais";
  if (impactType === "organization") return "Agendamentos";
  if (impactType === "authority") return "Avaliacoes Google";
  return "Taxa de Retorno";
}

function buildMonthSpan(year: number, startWeek: number, endWeek: number) {
  const months = new Map<string, { key: string; label: string }>();

  buildWeekSpan(startWeek, endWeek).forEach((week) => {
    const weekStart = getIsoWeekStartDate(year, week);
    const monthKey = formatMonthKey(weekStart);

    if (!months.has(monthKey)) {
      months.set(monthKey, { key: monthKey, label: formatMonthLabel(weekStart) });
    }
  });

  return [...months.values()];
}

function formatPeriodLabel(year: number, startWeek: number, endWeek: number) {
  const startDate = getIsoWeekStartDate(year, startWeek);
  const endDate = getIsoWeekEndDate(year, endWeek);
  const startMonth = formatMonthLabel(startDate);
  const endMonth = formatMonthLabel(endDate);
  return `${formatWeekLabel(startWeek)}-${formatWeekLabel(endWeek)} · ${startMonth}-${endMonth}`;
}

function translateProjectInput(project: WorkGanttProjectInput): WorkGanttProject {
  const publicProject = project.slug ? getWorkProjectBySlug(project.slug) : null;

  return {
    id: project.id,
    clientId: project.cliente_id,
    name: publicProject?.metadata.title ?? project.projeto,
    slug: project.slug,
    contract: project.contrato,
    contractLabel: workGanttContractLabels[project.contrato],
    weeklyCapacityHours: project.horas_disponiveis_semana,
    monthlyValue: project.valor_mensal,
    marginEstimate: project.margem_estimativa,
    year: project.ano,
    owner: project.responsavel,
    visibility: project.visibilidade,
    publicHref: publicProject ? getWorkProjectPath(publicProject.slug) : undefined,
    stack: publicProject ? getWorkProjectStack(publicProject) : [],
    startWeek: project.start_week,
    endWeek: project.end_week,
    timezone: project.timezone,
    status: project.status,
    objective: project.objective,
    kpis: project.kpis ?? [],
  };
}

function translateImportedPlanToProjectInput(
  plan: z.infer<typeof importedWorkGanttPlanSchema>,
): WorkGanttProjectInput {
  return {
    id: plan.project.id,
    cliente_id: "CLI-TC",
    projeto: plan.project.client,
    slug: "tereza-cristina",
    contrato: "projeto",
    horas_disponiveis_semana: plan.project.weeklyCapacityHours,
    valor_mensal: "Plano 120 dias",
    margem_estimativa: "Alta",
    ano: plan.project.year,
    responsavel: plan.project.owner,
    visibilidade: "publico",
    start_week: plan.project.startWeek,
    end_week: plan.project.endWeek,
    timezone: plan.project.timezone,
    status: plan.project.status,
    objective: plan.project.objective,
    kpis: plan.kpis,
  };
}

function translateImportedPlanToTaskInputs(
  plan: z.infer<typeof importedWorkGanttPlanSchema>,
): WorkGanttTaskInput[] {
  const blockingMap = new Map<string, string[]>();
  const kpiMap = new Map(plan.kpis.map((kpi) => [kpi.name, kpi]));

  plan.tasks.forEach((task) => {
    (task.dependsOn ?? []).forEach((dependencyId) => {
      const current = blockingMap.get(dependencyId) ?? [];
      current.push(task.id);
      blockingMap.set(dependencyId, current);
    });
  });

  return plan.tasks.map((task, index) => {
    const priority = inferImportedPriority(task.priority);
    const impact = inferImportedImpact(task.impactType);
    const linkedKpiName = task.kpi ?? inferImportedDefaultKpi(task.impactType);
    const linkedKpi = kpiMap.get(linkedKpiName);
    const weekStartDate = getIsoWeekStartDate(plan.project.year, task.startWeek);
    const weekEndDate = getIsoWeekEndDate(plan.project.year, task.endWeek);

    return {
      id: task.id,
      projeto_id: plan.project.id,
      nome: task.title,
      descricao: `${task.phase} · ${task.category}`,
      projeto: plan.project.client,
      fase: task.phase,
      semana_inicio: task.startWeek,
      semana_fim: task.endWeek,
      duracao_semanas: task.duration,
      status: task.status,
      prioridade: priority,
      categoria: task.category,
      responsavel: task.owner,
      impacto_negocio: impact,
      nivel_impacto: task.impactScore,
      urgencia: inferImportedUrgency(task.priority),
      esforco_horas: task.estimatedHours,
      horas_semanais: Number((task.estimatedHours / Math.max(task.duration, 1)).toFixed(1)),
      roi_estimado: linkedKpi
        ? `Mover ${linkedKpi.name} em direcao a ${String(linkedKpi.goal ?? "meta em definicao")}.`
        : `Gerar impacto em ${workGanttImpactLabels[impact].toLowerCase()}.`,
      risco: inferImportedRisk(task.priority, task.duration),
      dificuldade: inferImportedDifficulty(task.estimatedHours, task.duration),
      visibilidade_cliente: inferImportedVisibility(task.category),
      depende_de: task.dependsOn ?? [],
      bloqueia: blockingMap.get(task.id) ?? [],
      tipo_dependencia: "finish-to-start",
      ano: plan.project.year,
      trimestre: getQuarterFromWeek(task.startWeek),
      mes_inicio: formatMonthLabel(weekStartDate),
      deadline_real: weekEndDate.toISOString().slice(0, 10),
      marco: task.duration === 1,
      recorrente: inferImportedRecurrence(task.title),
      buffer: task.priority === "critical" ? 1 : 0,
      progresso_percentual: inferImportedProgress(task.status),
      horas_gastas: inferImportedSpentHours(task.status, task.estimatedHours),
      atraso: 0,
      ultima_atualizacao: "2026-05-09T10:00:00-03:00",
      notas_execucao: `Fase ${task.phase}.`,
      impedimentos:
        task.status === "todo" && (task.dependsOn?.length ?? 0) > 0
          ? [`Aguardando liberacao das tarefas ${task.dependsOn?.join(", ")}.`]
          : [],
      cor_categoria: undefined,
      swimlane: inferImportedSwimlane(task.category),
      ordem_exibicao: index + 1,
      destaque: task.priority === "critical" ? "critical" : task.duration === 1 ? "milestone" : "normal",
      kpi_principal: linkedKpi?.name ?? linkedKpiName,
      meta_kpi:
        linkedKpi?.goal === undefined || linkedKpi.goal === null
          ? "Sem meta registrada"
          : String(linkedKpi.goal),
      baseline:
        linkedKpi?.baseline === undefined || linkedKpi.baseline === null
          ? "Sem baseline registrado"
          : String(linkedKpi.baseline),
      impacto_real:
        task.status === "done"
          ? `Entrega concluida na fase ${task.phase}.`
          : undefined,
    };
  });
}

function translateTaskInput(input: WorkGanttTaskInput, project: WorkGanttProject): WorkGanttTask {
  const startWeek = clampWeek(input.ano, input.semana_inicio);
  const derivedEndWeek = input.semana_fim ?? startWeek + (input.duracao_semanas ?? 1) - 1;
  const endWeek = clampWeek(input.ano, derivedEndWeek);
  const durationWeeks = endWeek - startWeek + 1;
  const weekSpan = buildWeekSpan(startWeek, endWeek);
  const monthSpan = buildMonthSpan(input.ano, startWeek, endWeek);
  const startDate = getIsoWeekStartDate(input.ano, startWeek);
  const endDate = getIsoWeekEndDate(input.ano, endWeek);
  const deadlineDate = input.deadline_real ?? endDate.toISOString().slice(0, 10);
  const bufferEndWeek = clampWeek(input.ano, endWeek + input.buffer);
  const publicProject = project.slug ? getWorkProjectBySlug(project.slug) : null;
  const defaultColorByCategory: Record<WorkGanttCategory, string> = {
    marketing: "#4E88FF",
    sistema: "#FF9F1C",
    produto: "#7C5CFF",
    comercial: "#2AA876",
    operacao: "#FF7F50",
    seo: "#28A96B",
    design: "#D46BFF",
    conteudo: "#FF5F8F",
    financeiro: "#8892B0",
    strategy: "#4E88FF",
    system: "#FF9F1C",
    analytics: "#8892B0",
    growth: "#2AA876",
    crm: "#FF7F50",
    "local-seo": "#28A96B",
    content: "#FF5F8F",
    sales: "#7C5CFF",
    management: "#6B7280",
  };

  return {
    id: input.id,
    name: input.nome,
    description: input.descricao,
    projectId: project.id,
    projectName: project.name,
    projectSlug: project.slug,
    clientId: project.clientId,
    owner: input.responsavel,
    status: input.status,
    statusLabel: workGanttStatusLabels[input.status],
    priority: input.prioridade,
    priorityLabel: workGanttPriorityLabels[input.prioridade],
    category: input.categoria,
    categoryLabel: workGanttCategoryLabels[input.categoria],
    phase: input.fase,
    businessImpact: input.impacto_negocio,
    businessImpactLabel: workGanttImpactLabels[input.impacto_negocio],
    impactLevel: input.nivel_impacto,
    urgency: input.urgencia,
    effortHours: input.esforco_horas,
    weeklyHours: input.horas_semanais,
    roiEstimated: input.roi_estimado,
    risk: input.risco,
    riskLabel: workGanttRiskLabels[input.risco],
    difficulty: input.dificuldade,
    clientVisible: input.visibilidade_cliente === "sim",
    dependencyType: input.tipo_dependencia,
    dependencyTypeLabel: workGanttDependencyTypeLabels[input.tipo_dependencia],
    dependencyIds: normalizeListField(input.depende_de),
    blockingIds: normalizeListField(input.bloqueia),
    year: input.ano,
    quarter: input.trimestre ?? getQuarterFromWeek(startWeek),
    startWeek,
    endWeek,
    durationWeeks,
    weekSpan,
    bufferWeeks: input.buffer,
    bufferEndWeek,
    startDate: startDate.toISOString().slice(0, 10),
    endDate: endDate.toISOString().slice(0, 10),
    startMonthLabel: input.mes_inicio ?? formatMonthLabel(startDate),
    endMonthLabel: formatMonthLabel(endDate),
    monthKeys: monthSpan.map((month) => month.key),
    monthLabels: monthSpan.map((month) => month.label),
    deadlineDate,
    isMilestone: input.marco,
    recurrence: input.recorrente,
    recurrenceLabel: workGanttRecurrenceLabels[input.recorrente],
    progressPercent: input.progresso_percentual,
    spentHours: input.horas_gastas,
    delayWeeks: input.atraso,
    updatedAt: input.ultima_atualizacao,
    executionNotes: input.notas_execucao,
    impediments: normalizeListField(input.impedimentos),
    color: input.cor_categoria ?? defaultColorByCategory[input.categoria],
    swimlane: input.swimlane,
    swimlaneLabel: workGanttSwimlaneLabels[input.swimlane],
    displayOrder: input.ordem_exibicao,
    highlight: input.destaque,
    highlightLabel: workGanttHighlightLabels[input.destaque],
    contract: project.contract,
    contractLabel: project.contractLabel,
    weeklyCapacityHours: project.weeklyCapacityHours,
    monthlyValue: project.monthlyValue,
    marginEstimate: project.marginEstimate,
    kpiPrimary: input.kpi_principal,
    kpiTarget: input.meta_kpi,
    kpiBaseline: input.baseline,
    actualImpact: input.impacto_real,
    publicHref: publicProject ? getWorkProjectPath(publicProject.slug) : undefined,
  };
}

export const getWorkGanttFieldDefinitions = cache(() => workGanttFieldDefinitions);

export const getWorkGanttFieldGroupSummary = cache(() => {
  const definitions = getWorkGanttFieldDefinitions();

  return Object.entries(workGanttFieldGroupLabels).map(([groupId, label]) => {
    const fields = definitions.filter((field) => field.group === groupId);

    return {
      id: groupId as WorkGanttFieldGroupId,
      label,
      count: fields.length,
      requiredCount: fields.filter((field) => field.required).length,
      fields: fields.map((field) => field.key),
    };
  });
});

export const getWorkGanttProjectCatalog = cache(() => {
  const importedProjects = [translateImportedPlanToProjectInput(importedTerezaCristinaPlan)];

  return [...importedProjects, ...workGanttProjectInputs].map((item) =>
    translateProjectInput(workGanttProjectInputSchema.parse(item)),
  );
});

export const getWorkGanttTaskCatalog = cache(() => {
  const projectMap = new Map(getWorkGanttProjectCatalog().map((project) => [project.id, project]));
  const importedTasks = translateImportedPlanToTaskInputs(importedTerezaCristinaPlan);

  return [...importedTasks, ...workGanttTaskInputs]
    .map((item) => workGanttTaskInputSchema.parse(item))
    .map((item) => {
      const project = projectMap.get(item.projeto_id);

      if (!project) {
        throw new Error(`Projeto ${item.projeto_id} nao encontrado para a tarefa ${item.id}.`);
      }

      return translateTaskInput(item, project);
    })
    .sort((left, right) => {
      if (left.displayOrder !== right.displayOrder) {
        return left.displayOrder - right.displayOrder;
      }

      if (left.startWeek !== right.startWeek) {
        return left.startWeek - right.startWeek;
      }

      return left.projectName.localeCompare(right.projectName);
    });
});

function buildTimelineWeeks(year: number, startWeek: number, endWeek: number): WorkGanttTimelineWeek[] {
  return buildWeekSpan(startWeek, endWeek).map((weekNumber) => {
    const weekStart = getIsoWeekStartDate(year, weekNumber);
    const weekEnd = getIsoWeekEndDate(year, weekNumber);

    return {
      weekNumber,
      label: formatWeekLabel(weekNumber),
      startDate: weekStart.toISOString().slice(0, 10),
      endDate: weekEnd.toISOString().slice(0, 10),
      monthKey: formatMonthKey(weekStart),
      monthLabel: formatMonthLabel(weekStart),
    };
  });
}

function buildTimelineMonths(weeks: WorkGanttTimelineWeek[]): WorkGanttTimelineMonth[] {
  const months = new Map<string, WorkGanttTimelineMonth>();

  weeks.forEach((week) => {
    const existing = months.get(week.monthKey);

    if (!existing) {
      months.set(week.monthKey, {
        key: week.monthKey,
        label: week.monthLabel,
        startWeek: week.weekNumber,
        endWeek: week.weekNumber,
      });
      return;
    }

    existing.endWeek = week.weekNumber;
  });

  return [...months.values()];
}

function buildProjectWindows(tasks: WorkGanttTask[]): WorkGanttProjectWindow[] {
  const groups = new Map<string, WorkGanttTask[]>();

  tasks.forEach((task) => {
    const bucket = groups.get(task.projectId) ?? [];
    bucket.push(task);
    groups.set(task.projectId, bucket);
  });

  return [...groups.entries()]
    .map(([projectId, projectTasks]) => {
      const orderedTasks = [...projectTasks].sort((left, right) => left.startWeek - right.startWeek);
      const firstTask = orderedTasks[0];
      const lastTask = [...orderedTasks].sort((left, right) => right.endWeek - left.endWeek)[0];

      return {
        projectId,
        projectName: firstTask.projectName,
        projectSlug: firstTask.projectSlug,
        taskCount: orderedTasks.length,
        startWeek: firstTask.startWeek,
        endWeek: lastTask.endWeek,
        startDate: firstTask.startDate,
        endDate: lastTask.endDate,
        startMonthLabel: firstTask.startMonthLabel,
        endMonthLabel: lastTask.endMonthLabel,
        periodLabel: formatPeriodLabel(firstTask.year, firstTask.startWeek, lastTask.endWeek),
        publicHref: firstTask.publicHref,
        contractLabel: firstTask.contractLabel,
        weeklyCapacityHours: firstTask.weeklyCapacityHours,
        monthlyValue: firstTask.monthlyValue,
      };
    })
    .sort((left, right) => left.startWeek - right.startWeek);
}

function filterTasks(filters: WorkGanttDatasetFilters = {}) {
  const selectedYear = filters.ano ?? WORK_GANTT_YEAR;
  const maxWeek = getIsoWeekCountForYear(selectedYear);
  const startWeek = clampWeek(selectedYear, filters.semana_inicio ?? 1);
  const endWeek = clampWeek(selectedYear, filters.semana_fim ?? maxWeek);

  return getWorkGanttTaskCatalog().filter((task) => {
    if (task.year !== selectedYear) return false;
    if (task.endWeek < startWeek || task.startWeek > endWeek) return false;
    if (filters.projeto_ids?.length && !filters.projeto_ids.includes(task.projectId)) return false;
    if (filters.status?.length && !filters.status.includes(task.status)) return false;
    if (filters.categorias?.length && !filters.categorias.includes(task.category)) return false;
    return true;
  });
}

export function getWorkGanttDataset(filters: WorkGanttDatasetFilters = {}) {
  const selectedYear = filters.ano ?? WORK_GANTT_YEAR;
  const maxWeek = getIsoWeekCountForYear(selectedYear);
  const filteredTasks = filterTasks(filters);
  const inferredStartWeek =
    filteredTasks.length > 0
      ? Math.min(...filteredTasks.map((task) => task.startWeek))
      : 1;
  const inferredEndWeek =
    filteredTasks.length > 0
      ? Math.max(...filteredTasks.map((task) => Math.max(task.endWeek, task.bufferEndWeek)))
      : maxWeek;

  const visibleStartWeek = clampWeek(
    selectedYear,
    filters.semana_inicio ?? inferredStartWeek,
  );
  const visibleEndWeek = clampWeek(selectedYear, filters.semana_fim ?? inferredEndWeek);
  const weeks = buildTimelineWeeks(selectedYear, visibleStartWeek, visibleEndWeek);
  const months = buildTimelineMonths(weeks);
  const projects = buildProjectWindows(filteredTasks);

  return {
    year: selectedYear,
    maxWeek,
    visibleStartWeek,
    visibleEndWeek,
    tasks: filteredTasks,
    projects,
    timeline: {
      weeks,
      months,
    },
    filters: {
      ano: selectedYear,
      semana_inicio: visibleStartWeek,
      semana_fim: visibleEndWeek,
    },
  };
}

export {
  getIsoWeekCountForYear,
  workGanttCategoryLabels,
  workGanttDependencyTypeLabels,
  workGanttFieldGroupLabels,
  workGanttHighlightLabels,
  workGanttImpactLabels,
  workGanttPriorityLabels,
  workGanttRecurrenceLabels,
  workGanttRiskLabels,
  workGanttStatusLabels,
  workGanttSwimlaneLabels,
};
