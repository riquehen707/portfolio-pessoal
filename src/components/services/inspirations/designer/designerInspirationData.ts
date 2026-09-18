export type DesignerProject = {
  id: "orla" | "nexo" | "caderno";
  title: string;
  area: "Identidade" | "Produto digital" | "Editorial";
  year: string;
  summary: string;
  role: string;
  deliverables: string;
};

export const designerProjects: DesignerProject[] = [
  {
    id: "orla",
    title: "Estúdio Orla",
    area: "Identidade",
    year: "2026",
    summary: "Sistema visual fictício para um espaço cultural que precisava funcionar em cartazes, sinalização e programação digital.",
    role: "Direção visual e sistema de marca",
    deliverables: "Identidade, cartazes e guia de aplicação",
  },
  {
    id: "nexo",
    title: "Nexo",
    area: "Produto digital",
    year: "2026",
    summary: "Estudo fictício de um produto para organizar tarefas compartilhadas sem transformar toda ação em uma notificação.",
    role: "Pesquisa, fluxo e interface",
    deliverables: "Fluxo principal, protótipo e biblioteca de interface",
  },
  {
    id: "caderno",
    title: "Caderno 08",
    area: "Editorial",
    year: "2025",
    summary: "Publicação fictícia sobre processos criativos, desenhada para alternar ensaios longos, notas e repertório visual.",
    role: "Projeto gráfico e direção de arte",
    deliverables: "Sistema editorial, capa e páginas internas",
  },
];

export const designerCaseSteps = [
  {
    id: "contexto",
    label: "Contexto",
    title: "O problema vem antes da solução.",
    description: "O case explica o cenário, as restrições e a responsabilidade da designer sem atribuir a ela decisões de outras pessoas.",
  },
  {
    id: "processo",
    label: "Processo",
    title: "Decisões aparecem com motivo.",
    description: "Alternativas, testes e critérios ajudam a mostrar raciocínio. O processo não vira uma coleção de telas sem contexto.",
  },
  {
    id: "entrega",
    label: "Entrega",
    title: "O resultado visual fecha a narrativa.",
    description: "A apresentação reúne aplicações e aprendizados verificáveis. Métricas só entram quando existem e podem ser atribuídas ao trabalho.",
  },
] as const;
