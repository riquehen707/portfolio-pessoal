import { cache } from "react";

type WorkGanttFieldGroupSummary = {
  id: string;
  label: string;
  count: number;
  requiredCount: number;
  fields: string[];
};

type WorkGanttProjectWindow = {
  projectId: string;
  projectName: string;
  taskCount: number;
  periodLabel: string;
  contractLabel: string;
  weeklyCapacityHours: number;
  monthlyValue: string;
};

type WorkGanttDataset = {
  year: number;
  visibleStartWeek: number;
  visibleEndWeek: number;
  tasks: Array<{ id: string; projectId: string; name: string }>;
  projects: WorkGanttProjectWindow[];
  timeline: {
    months: Array<{ key: string; label: string }>;
  };
};

const fieldGroupSummary: WorkGanttFieldGroupSummary[] = [
  {
    id: "essencial",
    label: "Informações essenciais",
    count: 6,
    requiredCount: 4,
    fields: ["id", "projeto", "status", "responsavel", "prazo", "entregavel"],
  },
  {
    id: "estrategia",
    label: "Informações estratégicas",
    count: 4,
    requiredCount: 2,
    fields: ["objetivo", "prioridade", "impacto", "observações"],
  },
  {
    id: "operacional",
    label: "Controle operacional",
    count: 4,
    requiredCount: 2,
    fields: ["progresso", "bloqueios", "próxima_ação", "atualizado_em"],
  },
];

function buildPlaceholderDataset(year: number): WorkGanttDataset {
  const tasks = [
    { id: "tsk-placeholder-01", projectId: "prj-placeholder-01", name: "Definir primeiro projeto" },
    { id: "tsk-placeholder-02", projectId: "prj-placeholder-02", name: "Condensar escopo do sistema" },
    { id: "tsk-placeholder-03", projectId: "prj-placeholder-03", name: "Preparar estrutura do próximo case" },
  ];

  const projects: WorkGanttProjectWindow[] = [
    {
      projectId: "prj-placeholder-01",
      projectName: "Projeto público 01",
      taskCount: 1,
      periodLabel: "S21-S22 · Maio-Junho",
      contractLabel: "Placeholder",
      weeklyCapacityHours: 4,
      monthlyValue: "Não definido",
    },
    {
      projectId: "prj-placeholder-02",
      projectName: "Sistema autoral 01",
      taskCount: 1,
      periodLabel: "S22-S23 · Junho",
      contractLabel: "Interno",
      weeklyCapacityHours: 5,
      monthlyValue: "Reorganização",
    },
    {
      projectId: "prj-placeholder-03",
      projectName: "Case de cliente 02",
      taskCount: 1,
      periodLabel: "S23-S24 · Junho",
      contractLabel: "Placeholder",
      weeklyCapacityHours: 3,
      monthlyValue: "Não definido",
    },
  ];

  return {
    year,
    visibleStartWeek: 21,
    visibleEndWeek: 24,
    tasks,
    projects,
    timeline: {
      months: [
        { key: `${year}-05`, label: "Maio" },
        { key: `${year}-06`, label: "Junho" },
      ],
    },
  };
}

export const getWorkGanttFieldGroupSummary = cache(() => fieldGroupSummary);

export const getWorkGanttDataset = cache((filters: { ano?: number } = {}) => {
  return buildPlaceholderDataset(filters.ano ?? 2026);
});
