export const seoLibraryPath = "/blog/seo";

export type SeoBookPreview = {
  number: string;
  title: string;
  description: string;
  topics: string[];
  prerequisite?: string;
  status: "planned";
};

export const seoBooks: SeoBookPreview[] = [
  {
    number: "01",
    title: "Entender a busca",
    description:
      "Como mecanismos de busca encontram, interpretam e escolhem conteúdos antes de qualquer otimização.",
    topics: [
      "Rastreamento, renderização e indexação",
      "Intenção de busca",
      "Arquitetura de sites",
      "Links internos e resultados de pesquisa",
    ],
    status: "planned",
  },
  {
    number: "02",
    title: "Construir relevância",
    description:
      "Como transformar necessidades de busca em páginas, conteúdos e experiências realmente úteis.",
    topics: [
      "Pesquisa de palavras-chave",
      "Planejamento de páginas",
      "SEO on-page",
      "Arquitetura editorial",
    ],
    prerequisite: "Entender a busca",
    status: "planned",
  },
  {
    number: "03",
    title: "Medir e desenvolver",
    description:
      "Como diagnosticar problemas, interpretar dados e desenvolver sistemas de SEO com mais segurança.",
    topics: [
      "Search Console e conversões",
      "Auditorias e indexação",
      "Performance e migrações",
      "Autoridade, escala e busca generativa",
    ],
    prerequisite: "Construir relevância",
    status: "planned",
  },
];

export const seoLibrarySections = [
  {
    id: "guia-pratico",
    eyebrow: "Consulta",
    title: "Guia prático de SEO",
    description:
      "Respostas diretas para planejar, publicar ou diagnosticar uma página sem substituir a formação dos livros.",
    examples: [
      "Como analisar uma intenção de busca",
      "Como decidir entre criar ou atualizar uma página",
      "Checklist de SEO on-page",
      "Como descobrir se uma página está indexada",
      "Como realizar uma auditoria básica",
    ],
  },
  {
    id: "carreira",
    eyebrow: "Profissão",
    title: "Carreira em SEO",
    description:
      "Competências, processos e critérios para quem deseja trabalhar profissionalmente com busca.",
    examples: [
      "O que um profissional de SEO realmente faz",
      "Como começar sem experiência profissional",
      "SEO técnico e estratégia de conteúdo",
      "Como construir estudos de caso",
      "Limites e responsabilidades profissionais",
    ],
  },
  {
    id: "mais-sobre-seo",
    eyebrow: "Análise",
    title: "Mais sobre SEO",
    description:
      "Conceitos, discussões e experimentos que não precisam seguir a sequência didática dos livros.",
    examples: [
      "SEO é marketing, tecnologia ou comunicação?",
      "O problema dos checklists genéricos",
      "Conteúdo gerado por IA pode posicionar?",
      "O futuro do tráfego orgânico",
      "Aprendizados do desenvolvimento deste site",
    ],
  },
] as const;
