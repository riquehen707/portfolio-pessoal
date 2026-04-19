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
    "A comunicacao da marca vende clareza estrategica, execucao confiavel, tecnologia util, crescimento estruturado e solucoes reais para negocios reais.",
  copyRules: {
    mustFeel: [
      "Humana",
      "Segura",
      "Direta",
      "Inteligente",
      "Sem exagero",
      "Sem linguagem corporativa vazia",
    ],
    alwaysUse: ["Frases curtas", "Verbos fortes", "Clareza", "Especificidade", "Beneficios reais"],
    avoid: [
      "Jargao corporativo",
      "Excesso de adjetivo",
      "Promessas vagas",
      "Texto longo sem funcao",
    ],
  },
  pages: {
    home: {
      objective:
        "Causar impacto rapido, gerar confianca, mostrar diferenciacao, provar capacidade e levar para contato ou works.",
      intendedAction: "Agendar uma ligacao ou avancar para a secao de works.",
      emotionalTone: "Confianca + impacto",
      seo: {
        focus: "operacao digital para negocios locais",
        keywords: [
          "operacao digital para negocios locais",
          "presenca digital para negocios locais",
          "estrategia digital para negocios reais",
          "automacao e gestao digital",
        ],
      },
      hero: {
        eyebrow: "Estrategia completa",
        headline: "Operacao digital completa para negocios locais.",
        subheadline:
          "Toda a estrutura digital do seu negocio em um so parceiro: software, presenca online, automacao e gestao orientada por dados.",
        primaryCtaLabel: "Agendar uma ligacao",
        primaryCtaHref: "https://cal.com/henriquereis",
        secondaryCtaLabel: "Conheca meu trabalho",
        secondaryCtaHref: "/work",
      },
      sections: [
        {
          id: "proof",
          label: "Prova rapida",
          title: "Sinais imediatos de valor percebido.",
          description:
            "A Home precisa provar, em poucos segundos, que existe criterio tecnico, direcao comercial e capacidade de execucao.",
          bullets: [
            "Especializado em negocios locais",
            "Decisoes guiadas por dados reais",
            "Ecossistema digital completo",
            "Solucoes personalizadas",
          ],
        },
        {
          id: "markets",
          label: "Mercados",
          title: "Mercados diferentes exigem estrategias diferentes.",
          description:
            "Crescimento sustentavel depende de dados reais, planejamento claro e constancia na execucao.",
        },
        {
          id: "works",
          label: "Projetos em destaque",
          title: "Projetos que unem estetica, estrategia e execucao.",
          description:
            "Cada projeto resolve um desafio diferente, mas todos seguem o mesmo principio: clareza, performance e resultado real.",
          ctaLabel: "Ver todos os projetos",
          ctaHref: "/work",
        },
        {
          id: "blog",
          label: "Insights",
          title: "Ideias praticas sobre crescimento digital.",
          description:
            "Insights diretos sobre presenca digital, conversao, posicionamento e estrutura para crescer com consistencia.",
          ctaLabel: "Ver artigos",
          ctaHref: "/blog",
        },
        {
          id: "about-teaser",
          label: "Sobre",
          title: "Mais que design e tecnologia.",
          description:
            "Transformo ideias e necessidades reais em estruturas digitais claras, funcionais e valiosas.",
          ctaLabel: "Conheca minha trajetoria",
          ctaHref: "/about",
        },
        {
          id: "final-cta",
          label: "Proximo passo",
          title:
            "Se seu negocio precisa de presenca forte e operacao digital eficiente, vamos conversar.",
          description:
            "Uma conversa direta pode revelar oportunidades reais de posicionamento, aquisicao e operacao digital.",
          ctaLabel: "Agendar uma ligacao",
          ctaHref: "https://cal.com/henriquereis",
        },
      ],
    } satisfies StrategyPage,
    work: {
      objective: "Provar capacidade real.",
      intendedAction: "Fazer o visitante avancar para contato depois de ver projetos e recortes.",
      emotionalTone: "Competencia + prova",
      seo: {
        focus: "portfolio desenvolvimento web estrategico",
        keywords: [
          "portfolio desenvolvimento web estrategico",
          "projetos de design e tecnologia",
          "cases de presenca digital",
          "portfolio de operacoes digitais",
        ],
      },
      hero: {
        eyebrow: "Works",
        headline: "Projetos que unem estetica, estrategia e execucao.",
        subheadline:
          "Cada projeto resolve um problema diferente. Todos seguem o mesmo principio: funcionar de verdade.",
        primaryCtaLabel: "Vamos conversar",
        primaryCtaHref: "/contact",
        secondaryCtaLabel: "Ver abordagem tecnica",
        secondaryCtaHref: "/abordagem-tecnica",
      },
      sections: [
        {
          id: "featured-project",
          label: "Projeto destaque",
          title: "Projetos em destaque.",
          description: "Leitura rapida para mostrar variedade, criterio e execucao forte.",
        },
        {
          id: "categories",
          label: "Categorias",
          title: "Recortes para leitura rapida.",
          description:
            "Cliente, estudo e projetos pessoais ajudam a entender amplitude sem perder rigor.",
        },
        {
          id: "grid",
          label: "Grid",
          title: "Portfolio publicado.",
          description:
            "Cada projeto existe para comprovar raciocinio, solucao e resultado percebido.",
        },
        {
          id: "final-cta",
          label: "Contato",
          title: "Vamos criar algo forte juntos.",
          description:
            "Se a operacao precisa de uma presenca mais clara, mais forte e mais util, o proximo passo e conversar.",
          ctaLabel: "Vamos conversar",
          ctaHref: "/contact",
        },
      ],
    } satisfies StrategyPage,
    about: {
      objective: "Humanizar, aprofundar autoridade e mostrar visao.",
      intendedAction: "Fazer o visitante confiar o suficiente para iniciar a conversa.",
      emotionalTone: "Humanidade + visao",
      seo: {
        focus: "estrategia digital com design e tecnologia",
        keywords: [
          "estrategia digital com design e tecnologia",
          "visao estrategica para negocios locais",
          "parceiro digital para operacoes reais",
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
          label: "Visao",
          title: "Nao acredito em excesso. Acredito em clareza bem executada.",
          description:
            "O valor nao esta em parecer complexo, e sim em organizar o que importa com precisao.",
        },
        {
          id: "thinking",
          label: "Como penso",
          title: "Negocios crescem quando posicionamento, operacao e tecnologia trabalham juntos.",
          description:
            "Cada camada do digital precisa reforcar a outra. Quando isso acontece, a percepcao melhora e a operacao ganha forca.",
        },
        {
          id: "differentials",
          label: "Diferenciais",
          title: "O que sustenta meu trabalho.",
          description:
            "Visao estrategica, execucao pratica, tecnologia moderna e foco em resultado real.",
          bullets: [
            "Visao estrategica",
            "Execucao pratica",
            "Tecnologia moderna",
            "Foco em resultado real",
          ],
        },
      ],
    } satisfies StrategyPage,
    blog: {
      objective: "Somar autoridade, SEO e repertorio.",
      intendedAction:
        "Fazer o visitante consumir ideias uteis e voltar para a marca com mais confianca.",
      emotionalTone: "Inteligencia + utilidade",
      seo: {
        focus: "marketing para negocios locais",
        keywords: [
          "marketing para negocios locais",
          "presenca digital",
          "automacao para negocios",
          "crescimento digital pratico",
          "estrutura digital",
        ],
      },
      hero: {
        eyebrow: "Insights",
        headline: "Ideias praticas sobre crescimento digital.",
        subheadline:
          "Insights diretos sobre presenca digital, conversao, posicionamento e estrutura para crescer com consistencia.",
        primaryCtaLabel: "Explorar insights",
        primaryCtaHref: "/blog",
      },
      sections: [
        {
          id: "categories",
          label: "Categorias",
          title: "Trilhas editoriais centrais.",
          description:
            "Negocios locais, marketing, design, operacao, tecnologia e growth formam a base do repertorio que o blog precisa sustentar.",
          bullets: ["Negocios locais", "Marketing", "Design", "Operacao", "Tecnologia", "Growth"],
        },
        {
          id: "archive",
          label: "Arquivo",
          title: "Arquivo editorial organizado para leitura rapida.",
          description:
            "O conteudo publicado precisa ser facil de explorar, util no curto prazo e consistente no longo prazo.",
        },
      ],
    } satisfies StrategyPage,
    contact: {
      objective: "Converter sem friccao.",
      intendedAction: "Levar o visitante a escolher um canal e iniciar a conversa imediatamente.",
      emotionalTone: "Facilidade + oportunidade",
      seo: {
        focus: "consultoria digital",
        keywords: [
          "consultoria digital",
          "criar site",
          "gestao digital",
          "contato para estrategia digital",
          "operacao digital para negocios locais",
        ],
      },
      hero: {
        eyebrow: "Contato",
        headline: "Vamos falar sobre o seu negocio.",
        subheadline:
          "Se existe potencial de crescimento, vamos encontrar a melhor estrutura para isso.",
        primaryCtaLabel: "Agendar uma ligacao",
        primaryCtaHref: "https://cal.com/henriquereis",
        secondaryCtaLabel: "Falar no WhatsApp",
        secondaryCtaHref: "https://wa.me/5575983675164",
      },
      sections: [
        {
          id: "methods",
          label: "Formas de contato",
          title: "Tres caminhos simples para avancar.",
          description:
            "Agenda online, WhatsApp e formulario simples reduzem atrito e deixam o proximo passo claro.",
          bullets: ["Agenda online", "WhatsApp", "Formulario simples"],
        },
        {
          id: "expectation",
          label: "O que acontece",
          title: "Uma conversa para entender contexto e prioridade.",
          description:
            "O objetivo nao e vender no impulso. E ler o cenario, mapear o gargalo e definir o formato de trabalho mais adequado.",
        },
      ],
    } satisfies StrategyPage,
  },
} as const;

export { contentStrategy };
