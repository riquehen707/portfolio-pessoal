import { IdeaBatchSchema } from "./ideaSchema";

export const ideas = IdeaBatchSchema.parse([{
  id: "idea_public_ideas_archive",
  contentType: "idea",
  schemaVersion: 1,
  slug: "arquivo-publico-de-ideias",
  aliases: [],
  title: "Arquivo público de ideias",
  description: "Criar um espaço no meu site para registrar ideias, acompanhar como elas mudam e manter um histórico público do processo de desenvolvimento.",
  createdAt: "2026-08-19",
  updatedAt: "2026-08-19",
  status: "em-desenvolvimento",
  publicationStatus: "published",
  categories: ["Site"],
  tags: ["Arquivo pessoal", "Processo", "Conhecimento"],
  idea: [
    "Construir uma área permanente para ideias que ainda estão sendo testadas, sem exigir que elas pareçam projetos concluídos ou promessas de execução.",
    "Cada registro deve preservar a formulação atual e uma linha do tempo das mudanças, permitindo consultar mais tarde como o pensamento evoluiu.",
  ],
  motivation: [
    "Artigos normalmente mostram uma conclusão organizada. Projetos mostram algo que já ganhou forma. Faltava um lugar para registrar o intervalo entre uma intuição inicial e aquilo que ela talvez se torne.",
  ],
  currentState: [
    "A estrutura inicial usa arquivos locais validados, páginas públicas e um histórico cronológico. A primeira ideia é a própria criação desta área.",
  ],
  nextSteps: [
    "Usar a área com ideias reais e observar quais campos continuam úteis.",
    "Relacionar ideias a artigos e projetos quando essas derivações existirem.",
    "Reavaliar a modelagem antes de qualquer migração para uma fonte remota.",
  ],
  updates: [{
    date: "2026-08-19",
    title: "Decisão de criar a área",
    content: ["Decidi criar uma página pública para registrar ideias e suas mudanças. O sistema deve funcionar como arquivo de processo, não como gerenciador de tarefas."],
    links: [],
  }],
  relatedIdeaIds: [],
  relatedArticleSlugs: [],
  relatedProjectSlugs: [],
  seo: {
    title: "Arquivo público de ideias",
    description: "A ideia de criar uma área pública para registrar pensamentos em desenvolvimento e preservar como decisões e caminhos mudam ao longo do tempo.",
  },
}]);

