export const seoLibraryPath = "/blog/seo";
export const understandSearchBookPath = `${seoLibraryPath}/entender-a-busca`;

export type SeoBookPreview = {
  number: string;
  title: string;
  description: string;
  topics: string[];
  prerequisite?: string;
  status: "available" | "planned";
  href?: string;
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
    status: "available",
    href: understandSearchBookPath,
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

export type SeoBookChapter = {
  number: string;
  title: string;
  description: string;
  status: "planned" | "complementary";
  href?: string;
};

export type SeoBookPart = {
  number: string;
  title: string;
  description: string;
  chapters: SeoBookChapter[];
};

export const understandSearchBookParts: SeoBookPart[] = [
  {
    number: "I",
    title: "Descoberta",
    description: "Como uma página entra no campo de visão de um mecanismo de busca.",
    chapters: [
      {
        number: "01",
        title: "O caminho entre publicar e aparecer",
        description: "Uma visão geral do sistema e do percurso que será aprofundado no livro.",
        status: "planned",
      },
      {
        number: "02",
        title: "Rastreamento e renderização",
        description: "Como robôs encontram recursos e processam aquilo que uma página apresenta.",
        status: "planned",
      },
      {
        number: "03",
        title: "Indexação",
        description:
          "Como documentos são compreendidos, selecionados e armazenados para recuperação.",
        status: "planned",
      },
    ],
  },
  {
    number: "II",
    title: "Escolha",
    description: "Como uma necessidade de busca se transforma em uma página de resultados.",
    chapters: [
      {
        number: "04",
        title: "Consultas, intenção e contexto",
        description:
          "O que uma pesquisa pode revelar — e o que não pode — sobre a necessidade de alguém.",
        status: "planned",
      },
      {
        number: "05",
        title: "Classificação e resultados",
        description: "Como relevância, qualidade e contexto participam da seleção dos resultados.",
        status: "planned",
      },
    ],
  },
  {
    number: "III",
    title: "Estrutura",
    description:
      "Como páginas e relações internas ajudam pessoas e mecanismos a compreender um site.",
    chapters: [
      {
        number: "06",
        title: "Arquitetura de sites",
        description: "Organização, profundidade e caminhos de navegação como decisões editoriais.",
        status: "planned",
      },
      {
        number: "07",
        title: "Links internos e contexto",
        description: "Como conexões entre páginas distribuem contexto e tornam o acervo navegável.",
        status: "planned",
      },
    ],
  },
  {
    number: "IV",
    title: "Aplicações locais",
    description:
      "Leituras existentes que mostram parte desses princípios em contextos profissionais.",
    chapters: [
      {
        number: "A",
        title: "Como advogados podem aparecer no Google",
        description:
          "Aplicação introdutória de presença local, páginas, conteúdo e sinais de autoridade.",
        status: "complementary",
        href: "/blog/como-advogados-podem-aparecer-no-google",
      },
      {
        number: "B",
        title: "Como aparecer no Google sendo corretor de imóveis",
        description:
          "Estudo aplicado de perfil local, páginas regionais, termos e conversão do clique.",
        status: "complementary",
        href: "/blog/como-aparecer-no-google-sendo-corretor-de-imoveis",
      },
    ],
  },
];
