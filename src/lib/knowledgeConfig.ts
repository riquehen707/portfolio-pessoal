export type KnowledgeAreaSlug =
  | "marketing"
  | "design"
  | "renda-digital"
  | "aprendizado"
  | "ferramentas"
  | "projetos";

export type KnowledgeModule = {
  slug: string;
  title: string;
  description: string;
};

export type KnowledgeArea = {
  slug: KnowledgeAreaSlug;
  title: string;
  description: string;
  shortDescription: string;
  path: string;
  modules: KnowledgeModule[];
};

export const knowledgeAreas: KnowledgeArea[] = [
  {
    slug: "marketing",
    title: "Marketing",
    description: "Entenda publico, oferta, conteudo, aquisicao e conversao.",
    shortDescription: "Publico, oferta, conteudo, aquisicao e conversao.",
    path: "/trilhas/marketing",
    modules: [
      {
        slug: "fundamentos",
        title: "Fundamentos",
        description: "Conceitos essenciais antes de escolher canais ou ferramentas.",
      },
      {
        slug: "publico-posicionamento",
        title: "Publico e posicionamento",
        description: "Para quem falar, como se diferenciar e o que evitar.",
      },
      {
        slug: "oferta-mensagem",
        title: "Oferta e mensagem",
        description: "Como transformar valor em uma proposta compreensivel.",
      },
      {
        slug: "conteudo-seo",
        title: "Conteudo e SEO",
        description: "Assuntos, busca, autoridade e distribuicao.",
      },
      {
        slug: "conversao-metricas",
        title: "Conversao e metricas",
        description: "Leitura de resultado, atrito, funil e melhoria continua.",
      },
    ],
  },
  {
    slug: "design",
    title: "Design",
    description: "Organize hierarquia visual, tipografia, cores, layout e aplicacoes comerciais.",
    shortDescription: "Hierarquia visual, layout e aplicacoes comerciais.",
    path: "/trilhas/design",
    modules: [
      {
        slug: "fundamentos-visuais",
        title: "Fundamentos visuais",
        description: "Base para enxergar composicao, contraste e prioridade.",
      },
      {
        slug: "tipografia-cores",
        title: "Tipografia e cores",
        description: "Escolhas visuais que ajudam leitura e consistencia.",
      },
      {
        slug: "layout-composicao",
        title: "Layout e composicao",
        description: "Estrutura de paginas, pecas e materiais digitais.",
      },
      {
        slug: "ferramentas-design",
        title: "Ferramentas de design",
        description: "Canva, Figma e fluxos praticos sem virar lista de apps.",
      },
      {
        slug: "aplicacao-comercial",
        title: "Aplicacao comercial",
        description: "Design para vender ideias, servicos e produtos com clareza.",
      },
    ],
  },
  {
    slug: "renda-digital",
    title: "Renda Digital",
    description:
      "Planeje caminhos honestos para vender habilidade, servico, produto ou conhecimento.",
    shortDescription: "Habilidade, oferta, validacao e monetizacao sem promessa facil.",
    path: "/trilhas/renda-digital",
    modules: [
      {
        slug: "diagnostico",
        title: "Diagnostico",
        description: "Necessidade financeira, rotina, risco e clareza antes da acao.",
      },
      {
        slug: "fundamentos",
        title: "Fundamentos",
        description: "Como valor, oferta e demanda funcionam na internet.",
      },
      {
        slug: "habilidades-monetizaveis",
        title: "Habilidades monetizaveis",
        description: "O que aprender antes de procurar monetizacao.",
      },
      {
        slug: "venda-servicos",
        title: "Venda de servicos",
        description: "Freelancer, trabalho remoto, primeiros clientes e precificacao.",
      },
      {
        slug: "produtos-ativos",
        title: "Produtos e ativos",
        description: "Produtos digitais, afiliados, marketplaces e ativos proprios.",
      },
    ],
  },
  {
    slug: "aprendizado",
    title: "Aprendizado",
    description: "Aprenda a estudar, praticar, revisar e transformar conhecimento em habilidade.",
    shortDescription: "Estudo, pratica, revisao e progresso mensuravel.",
    path: "/trilhas/aprendizado",
    modules: [
      {
        slug: "estudo-autonomo",
        title: "Estudo autonomo",
        description: "Como aprender sem depender de motivacao constante.",
      },
      {
        slug: "rotina-pratica",
        title: "Rotina e pratica",
        description: "Como transformar estudo em execucao repetivel.",
      },
      {
        slug: "anotacoes-revisao",
        title: "Anotacoes e revisao",
        description: "Sistemas simples para reter e recuperar conhecimento.",
      },
      {
        slug: "pensamento-critico",
        title: "Pensamento critico",
        description: "Como avaliar ideias, metodos, promessas e evidencias.",
      },
    ],
  },
  {
    slug: "ferramentas",
    title: "Ferramentas",
    description: "Use IA, produtividade, automacao, SEO, escrita e analise com funcao pratica.",
    shortDescription: "IA, produtividade, automacao, SEO, escrita e analise.",
    path: "/trilhas/ferramentas",
    modules: [
      {
        slug: "ia",
        title: "IA",
        description: "Uso pratico de IA para pesquisar, organizar e produzir melhor.",
      },
      {
        slug: "produtividade-organizacao",
        title: "Produtividade e organizacao",
        description: "Ferramentas ligadas a rotina, clareza e acompanhamento.",
      },
      {
        slug: "seo-escrita",
        title: "SEO e escrita",
        description: "Ferramentas para buscar temas, estruturar textos e revisar.",
      },
      {
        slug: "design-analise",
        title: "Design e analise",
        description: "Ferramentas para criar, medir e melhorar materiais digitais.",
      },
    ],
  },
  {
    slug: "projetos",
    title: "Projetos",
    description: "Veja bastidores, estudos de caso, experimentos e aplicacoes reais.",
    shortDescription: "Bastidores, estudos de caso e experimentos aplicados.",
    path: "/work",
    modules: [
      {
        slug: "site-pessoal",
        title: "Site pessoal",
        description: "Decisoes de estrutura, conteudo e evolucao do proprio site.",
      },
      {
        slug: "blog-base",
        title: "Blog e base de conhecimento",
        description: "Experimentos editoriais, SEO e organizacao progressiva.",
      },
      {
        slug: "estudos-caso",
        title: "Estudos de caso",
        description: "Aplicacoes praticas com contexto, decisao e resultado.",
      },
    ],
  },
];

export const publicTrailAreas = knowledgeAreas.filter((area) => area.slug !== "projetos");

export function getKnowledgeAreaBySlug(slug: string) {
  return knowledgeAreas.find((area) => area.slug === slug);
}

export function getKnowledgeAreaTitle(slug?: string) {
  return slug ? getKnowledgeAreaBySlug(slug)?.title : undefined;
}
