import {
  getWorkProjectBySlug,
  getWorkProjectPath,
  getWorkProjectStack,
} from "@/app/work/projectData";

const workManagementStages = [
  {
    id: "briefing",
    label: "Briefing",
    description: "Escopo inicial, leitura do contexto e alinhamento comercial.",
  },
  {
    id: "planejamento",
    label: "Planejamento",
    description: "Definição de estrutura, prioridades e entregáveis da sprint.",
  },
  {
    id: "execucao",
    label: "Execução",
    description: "Construção ativa, integrações e produção dos blocos principais.",
  },
  {
    id: "revisao",
    label: "Revisão",
    description: "Ajustes finos, validação e checklist técnico antes da entrega.",
  },
  {
    id: "entregue",
    label: "Entregue",
    description: "Projeto concluído, documentado e pronto para acompanhamento.",
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
  visibility: "publico" | "privado";
};

const workManagementItems: WorkManagementItem[] = [
  {
    id: "tereza-cristina-launch",
    slug: "tereza-cristina",
    title: "Landing page e operação de agenda",
    client: "Tereza Cristina",
    summary: "Fechar revisão visual, checklist técnico e subida final da página.",
    stage: "revisao",
    priority: "Alta",
    health: "Atenção",
    progress: 86,
    owner: "Henrique",
    dueDate: "2026-05-02",
    updatedAt: "2026-04-28",
    nextAction: "Validar prova social final e publicar a configuração de analytics.",
    blockers: ["Aguardando confirmação final das imagens de procedimentos."],
    deliverables: ["Checklist SEO local", "Revisão mobile", "Evento de clique no WhatsApp"],
    tags: ["Cliente", "Landing page", "Saúde e estética"],
    visibility: "publico",
  },
  {
    id: "painel-operacao-local-v2",
    slug: "painel-operacao-local",
    title: "Painel interno v2",
    client: "Henrique Reis",
    summary: "Evolução do sistema autoral para rotina comercial e leitura operacional.",
    stage: "execucao",
    priority: "Média",
    health: "Saudável",
    progress: 58,
    owner: "Henrique",
    dueDate: "2026-05-10",
    updatedAt: "2026-04-29",
    nextAction: "Fechar a camada de tarefas recorrentes e o resumo semanal da operação.",
    blockers: ["Definir regra final de prioridade automática para follow-up."],
    deliverables: ["Quadro por estágio", "Resumo semanal", "Filtro por origem do lead"],
    tags: ["Interno", "SaaS", "Automação"],
    visibility: "publico",
  },
  {
    id: "psicologia-clinica-discovery",
    title: "Site institucional para psicologia clínica",
    client: "Projeto confidencial",
    summary: "Mapear diferenciais da oferta e organizar arquitetura da página de atendimento.",
    stage: "planejamento",
    priority: "Alta",
    health: "Atenção",
    progress: 24,
    owner: "Henrique",
    dueDate: "2026-05-06",
    updatedAt: "2026-04-27",
    nextAction: "Fechar headline, pilares de autoridade e estrutura de agendamento.",
    blockers: ["Briefing ainda não consolidou especialidades e provas de confiança."],
    deliverables: ["Mapa de conteúdo", "Wireframe da hero", "Sequência de CTA"],
    tags: ["Cliente", "Serviços", "Posicionamento"],
    visibility: "privado",
  },
  {
    id: "produtos-digitais-q2",
    title: "Linha de produtos digitais",
    client: "Henrique Reis",
    summary: "Definir catálogo, recortes de oferta e ordem de lançamento do trimestre.",
    stage: "briefing",
    priority: "Média",
    health: "Saudável",
    progress: 14,
    owner: "Henrique",
    dueDate: "2026-05-12",
    updatedAt: "2026-04-26",
    nextAction: "Priorizar quais ativos viram produto pago e quais ficam como lead magnet.",
    blockers: [],
    deliverables: ["Mapa de ofertas", "Critério de precificação", "Página de produtos"],
    tags: ["Interno", "Produtos", "Oferta"],
    visibility: "privado",
  },
  {
    id: "template-seo-local-kit",
    title: "Template SEO local para serviços",
    client: "Henrique Reis",
    summary: "Base reaproveitável para acelerar futuros projetos de captação local.",
    stage: "entregue",
    priority: "Baixa",
    health: "Saudável",
    progress: 100,
    owner: "Henrique",
    dueDate: "2026-04-20",
    updatedAt: "2026-04-20",
    nextAction: "Revisar o material quando entrar um novo case do mesmo perfil.",
    blockers: [],
    deliverables: ["Estrutura de metadata", "Blocos de prova social", "Checklist de indexação"],
    tags: ["Interno", "Template", "SEO"],
    visibility: "privado",
  },
];

export function getWorkManagementStages() {
  return workManagementStages;
}

export function getWorkManagementItems() {
  return workManagementItems.map((item) => {
    const publicProject = item.slug ? getWorkProjectBySlug(item.slug) : null;

    return {
      ...item,
      stack:
        publicProject && getWorkProjectStack(publicProject).length > 0
          ? getWorkProjectStack(publicProject)
          : item.tags,
      publicHref: publicProject ? getWorkProjectPath(publicProject.slug) : undefined,
      publicTitle: publicProject?.metadata.title,
      publicSummary: publicProject?.metadata.summary,
    };
  });
}
