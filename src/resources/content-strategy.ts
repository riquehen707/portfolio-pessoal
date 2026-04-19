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
    "A comunicação da marca vende clareza estratégica, execução confiável, tecnologia útil, crescimento estruturado e soluções reais para negócios reais.",
  copyRules: {
    mustFeel: [
      "Humana",
      "Segura",
      "Direta",
      "Inteligente",
      "Sem exagero",
      "Sem linguagem corporativa vazia",
    ],
    alwaysUse: ["Frases curtas", "Verbos fortes", "Clareza", "Especificidade", "Benefícios reais"],
    avoid: [
      "Jargão corporativo",
      "Excesso de adjetivo",
      "Promessas vagas",
      "Texto longo sem função",
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
          "Toda a estrutura digital do seu negócio em um só parceiro: software, presença online, automação e gestão orientada por dados.",
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
            "Cada projeto resolve um desafio diferente, mas todos seguem o mesmo princípio: clareza, performance e resultado real.",
          ctaLabel: "Ver todos os projetos",
          ctaHref: "/work",
        },
        {
          id: "blog",
          label: "Insights",
          title: "Ideias práticas sobre crescimento digital.",
          description:
            "Insights diretos sobre presença digital, conversão, posicionamento e estrutura para crescer com consistência.",
          ctaLabel: "Ver artigos",
          ctaHref: "/blog",
        },
        {
          id: "about-teaser",
          label: "Sobre",
          title: "Mais que design e tecnologia.",
          description:
            "Transformo ideias e necessidades reais em estruturas digitais claras, funcionais e valiosas.",
          ctaLabel: "Conheça minha trajetória",
          ctaHref: "/about",
        },
        {
          id: "final-cta",
          label: "Próximo passo",
          title:
            "Se seu negócio precisa de presença forte e operação digital eficiente, vamos conversar.",
          description:
            "Uma conversa direta pode revelar oportunidades reais de posicionamento, aquisição e operação digital.",
          ctaLabel: "Agendar uma ligação",
          ctaHref: "https://cal.com/henriquereis",
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
        headline: "Projetos que unem estética, estratégia e execução.",
        subheadline:
          "Cada projeto resolve um problema diferente. Todos seguem o mesmo princípio: funcionar de verdade.",
        primaryCtaLabel: "Vamos conversar",
        primaryCtaHref: "/contact",
        secondaryCtaLabel: "Ver abordagem técnica",
        secondaryCtaHref: "/abordagem-tecnica",
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
          title: "Vamos criar algo forte juntos.",
          description:
            "Se a operação precisa de uma presença mais clara, mais forte e mais útil, o próximo passo é conversar.",
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
        headline: "Mais que design e tecnologia.",
        subheadline: "Transformo ideias em estruturas digitais claras, funcionais e valiosas.",
        primaryCtaLabel: "Vamos conversar",
        primaryCtaHref: "/contact",
        secondaryCtaLabel: "Ver projetos",
        secondaryCtaHref: "/work",
      },
      sections: [
        {
          id: "vision",
          label: "Visão",
          title: "Não acredito em excesso. Acredito em clareza bem executada.",
          description:
            "O valor não está em parecer complexo, e sim em organizar o que importa com precisão.",
        },
        {
          id: "thinking",
          label: "Como penso",
          title: "Negócios crescem quando posicionamento, operação e tecnologia trabalham juntos.",
          description:
            "Cada camada do digital precisa reforçar a outra. Quando isso acontece, a percepção melhora e a operação ganha força.",
        },
        {
          id: "differentials",
          label: "Diferenciais",
          title: "O que sustenta meu trabalho.",
          description:
            "Visão estratégica, execução prática, tecnologia moderna e foco em resultado real.",
          bullets: [
            "Visão estratégica",
            "Execução prática",
            "Tecnologia moderna",
            "Foco em resultado real",
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
        headline: "Ideias práticas sobre crescimento digital.",
        subheadline:
          "Insights diretos sobre presença digital, conversão, posicionamento e estrutura para crescer com consistência.",
        primaryCtaLabel: "Explorar insights",
        primaryCtaHref: "/blog",
      },
      sections: [
        {
          id: "categories",
          label: "Categorias",
          title: "Trilhas editoriais centrais.",
          description:
            "Negócios locais, marketing, design, operação, tecnologia e growth formam a base do repertório que o blog precisa sustentar.",
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
