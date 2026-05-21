type StrategySection = {
  id: string;
  label: string;
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  bullets?: string[];
};

type StrategyPage = {
  objective: string;
  intendedAction: string;
  emotionalTone: string;
  seo: {
    focus: string;
    keywords: string[];
  };
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel?: string;
    secondaryCtaHref?: string;
  };
  sections: StrategySection[];
};

const contentStrategy = {
  communicationPrinciple:
    "Explicar problema real, critério e próximo passo com precisão editorial.",
  editorialVoice: {
    tone: "Direto, claro, estratégico e sem exagero publicitário.",
    rhythm:
      "Frases curtas e médias. Começar pelo problema concreto, depois mostrar o critério e só então sugerir ação.",
    pointOfView:
      "Escrever como consultoria editorial: observar, organizar, comparar e orientar. Evitar soar como anúncio de agência.",
    signatureRule:
      "A frase 'Clareza gera resultado.' pode aparecer como assinatura, mas não deve ser repetida como título, subtítulo ou argumento central.",
    preferredPatterns: [
      "Organize [elemento] para transformar [sinal fraco] em [ação concreta].",
      "Antes de [investir/criar/anunciar], revise [base operacional].",
      "O problema não é só [canal]. É [mecanismo] + [rotina] + [próximo passo].",
      "Use [canal] para [função real], não apenas para aparecer.",
    ],
    avoidPatterns: [
      "Promessas absolutas.",
      "Superlativos sem prova.",
      "Frases genéricas sobre resultado, crescimento ou inovação.",
      "Repetir clareza, estratégia e estrutura quando uma palavra mais específica resolve.",
    ],
  },
  copyRules: {
    mustFeel: [
      "Humana",
      "Segura",
      "Direta",
      "Editorial",
      "Específica",
      "Sem exagero",
      "Sem linguagem corporativa vazia",
    ],
    alwaysUse: [
      "Frases curtas",
      "Verbos fortes",
      "Recorte específico",
      "Benefícios verificáveis",
      "Próximo passo concreto",
    ],
    avoid: [
      "Jargão corporativo",
      "Excesso de adjetivo",
      "Promessas vagas",
      "Texto longo sem função",
      "Slogan repetido como explicação",
    ],
  },
  pages: {
    home: {
      objective:
        "Causar impacto rápido, gerar confiança, mostrar diferenciação, provar capacidade e levar para contato ou projetos.",
      intendedAction: "Agendar uma ligação ou avançar para a seção de projetos.",
      emotionalTone: "Confiança + impacto",
      seo: {
        focus: "operação digital para negócios locais",
        keywords: [
          "operação digital para negócios locais",
          "presença digital para negócios locais",
          "estratégia digital para negócios reais",
          "automação e gestão digital",
        ],
      },
      hero: {
        eyebrow: "Estratégia completa",
        headline: "Operação digital completa para negócios locais.",
        subheadline:
          "Presença, automação e dados para vender com mais direção.",
        primaryCtaLabel: "Agendar uma ligação",
        primaryCtaHref: "https://cal.com/henriquereis",
        secondaryCtaLabel: "Conheça meu trabalho",
        secondaryCtaHref: "/work",
      },
      sections: [
        {
          id: "proof",
          label: "Prova rápida",
          title: "Sinais imediatos de valor percebido.",
          description:
            "A Home precisa provar, em poucos segundos, que existe critério técnico, direção comercial e capacidade de execução.",
          bullets: [
            "Especializado em negócios locais",
            "Decisões guiadas por dados reais",
            "Ecossistema digital completo",
            "Soluções personalizadas",
          ],
        },
        {
          id: "markets",
          label: "Mercados",
          title: "Mercados diferentes exigem estratégias diferentes.",
          description:
            "Crescimento sustentável depende de dados reais, planejamento claro e constância na execução.",
        },
        {
          id: "works",
          label: "Projetos em destaque",
          title: "Projetos que unem estética, estratégia e execução.",
          description:
            "Cada projeto resolve um desafio diferente, com foco em leitura, performance e impacto prático.",
          ctaLabel: "Ver todos os projetos",
          ctaHref: "/work",
        },
        {
          id: "blog",
          label: "Insights",
          title: "Leituras para ajustar uma decisão.",
          description:
            "Critérios curtos antes de criar, anunciar ou refazer.",
          ctaLabel: "Ver artigos",
          ctaHref: "/blog",
        },
        {
          id: "about-teaser",
          label: "Sobre",
          title: "Por trás do trabalho.",
          description:
            "Como penso escopo, prioridade e execução.",
          ctaLabel: "Conheça minha trajetória",
          ctaHref: "/about",
        },
        {
          id: "final-cta",
          label: "Próximo passo",
          title: "Antes de investir, veja se faz sentido.",
          description:
            "Leia cenário, custo e retorno antes de fechar escopo.",
          ctaLabel: "Ver os dados primeiro",
          ctaHref: "/simulacao",
        },
      ],
    } satisfies StrategyPage,
    work: {
      objective: "Provar capacidade real.",
      intendedAction: "Fazer o visitante avançar para contato depois de ver projetos e recortes.",
      emotionalTone: "Competência + prova",
      seo: {
        focus: "portfólio desenvolvimento web estratégico",
        keywords: [
          "portfólio desenvolvimento web estratégico",
          "projetos de design e tecnologia",
          "cases de presença digital",
          "portfólio de operações digitais",
        ],
      },
      hero: {
        eyebrow: "Projetos",
        headline: "Projetos e bastidores em construção.",
        subheadline:
          "Decisões, aprendizados e registros do que estou construindo.",
        primaryCtaLabel: "Vamos conversar",
        primaryCtaHref: "/contact",
        secondaryCtaLabel: "Ver abordagem técnica",
        secondaryCtaHref: "/about/abordagem-tecnica",
      },
      sections: [
        {
          id: "featured-project",
          label: "Projeto destaque",
          title: "Projetos em destaque.",
          description: "Leitura rápida para mostrar variedade, critério e execução forte.",
        },
        {
          id: "categories",
          label: "Categorias",
          title: "Recortes para leitura rápida.",
          description:
            "Cliente, estudo e projetos pessoais ajudam a entender amplitude sem perder rigor.",
        },
        {
          id: "grid",
          label: "Grid",
          title: "Portfólio publicado.",
          description:
            "Cada projeto existe para comprovar raciocínio, solução e resultado percebido.",
        },
        {
          id: "final-cta",
          label: "Contato",
          title: "Vamos organizar o próximo passo.",
          description:
            "Se existe um problema claro, a conversa pode virar escopo.",
          ctaLabel: "Vamos conversar",
          ctaHref: "/contact",
        },
      ],
    } satisfies StrategyPage,
    about: {
      objective: "Humanizar, aprofundar autoridade e mostrar visão.",
      intendedAction: "Fazer o visitante confiar o suficiente para iniciar a conversa.",
      emotionalTone: "Humanidade + visão",
      seo: {
        focus: "estratégia digital com design e tecnologia",
        keywords: [
          "estratégia digital com design e tecnologia",
          "visão estratégica para negócios locais",
          "parceiro digital para operações reais",
          "design tecnologia e resultado real",
        ],
      },
      hero: {
        eyebrow: "Sobre",
        headline: "Estratégia, páginas e sistemas para negócios venderem com mais direção.",
        subheadline:
          "Trabalho entre marketing, design e operação digital para organizar presença, captação e acompanhamento.",
        primaryCtaLabel: "Ver como trabalho",
        primaryCtaHref: "/about",
        secondaryCtaLabel: "Ver simulação",
        secondaryCtaHref: "/simulacao",
      },
      sections: [
        {
          id: "story",
          label: "Trajetória",
          title: "Minha história",
          description:
            "Empreender cedo mostrou que esforço sem estrutura cobra caro.",
        },
        {
          id: "rebuild",
          label: "Recomeço",
          title: "Prática, disciplina e resultado.",
          description:
            "Recomeçar do zero tornou meu trabalho mais prático e disciplinado.",
        },
        {
          id: "fit",
          label: "Aderência",
          title: "Para quem faço sentido",
          description:
            "Para negócios que entregam valor, mas precisam organizar presença e captação.",
          bullets: [
            "Pequenos e médios negócios",
            "Profissionais e empresas de serviço",
            "Primeiros anos de crescimento",
            "Estrutura sem complexidade",
          ],
        },
      ],
    } satisfies StrategyPage,
    blog: {
      objective: "Somar autoridade, SEO e repertório.",
      intendedAction:
        "Fazer o visitante consumir ideias úteis e voltar para a marca com mais confiança.",
      emotionalTone: "Inteligência + utilidade",
      seo: {
        focus: "marketing para negócios locais",
        keywords: [
          "marketing para negócios locais",
          "presença digital",
          "automação para negócios",
          "crescimento digital prático",
          "estrutura digital",
        ],
      },
      hero: {
        eyebrow: "Insights",
        headline: "Marketing, design e conversão sem ruído.",
        subheadline:
          "Textos curtos para melhorar presença, oferta e decisão.",
        primaryCtaLabel: "Explorar insights",
        primaryCtaHref: "/blog",
      },
      sections: [
        {
          id: "categories",
          label: "Categorias",
          title: "Trilhas editoriais centrais.",
          description:
            "Temas para navegar por problema, não por volume.",
          bullets: ["Negócios locais", "Marketing", "Design", "Operação", "Tecnologia", "Growth"],
        },
        {
          id: "archive",
          label: "Arquivo",
          title: "Arquivo editorial organizado para leitura rápida.",
          description:
            "O conteúdo publicado precisa ser fácil de explorar, útil no curto prazo e consistente no longo prazo.",
        },
      ],
    } satisfies StrategyPage,
    contact: {
      objective: "Converter sem fricção.",
      intendedAction: "Levar o visitante a escolher um canal e iniciar a conversa imediatamente.",
      emotionalTone: "Facilidade + oportunidade",
      seo: {
        focus: "consultoria digital",
        keywords: [
          "consultoria digital",
          "criar site",
          "gestão digital",
          "contato para estratégia digital",
          "operação digital para negócios locais",
        ],
      },
      hero: {
        eyebrow: "Contato",
        headline: "Vamos falar sobre o seu negócio.",
        subheadline:
          "Se existe potencial de crescimento, vamos encontrar a melhor estrutura para isso.",
        primaryCtaLabel: "Agendar uma ligação",
        primaryCtaHref: "https://cal.com/henriquereis",
        secondaryCtaLabel: "Falar no WhatsApp",
        secondaryCtaHref: "https://wa.me/5575983675164",
      },
      sections: [
        {
          id: "methods",
          label: "Formas de contato",
          title: "Três caminhos simples para avançar.",
          description:
            "Agenda online, WhatsApp e formulário simples reduzem atrito e deixam o próximo passo claro.",
          bullets: ["Agenda online", "WhatsApp", "Formulário simples"],
        },
        {
          id: "expectation",
          label: "O que acontece",
          title: "Uma conversa para entender contexto e prioridade.",
          description:
            "O objetivo não é vender no impulso. É ler o cenário, mapear o gargalo e definir o formato de trabalho mais adequado.",
        },
      ],
    } satisfies StrategyPage,
  },
} as const;

export { contentStrategy };
