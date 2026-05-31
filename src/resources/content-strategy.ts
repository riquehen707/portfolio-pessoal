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
    "Apontar onde a decisão quebra, cortar ruído e sugerir o próximo passo possível.",
  editorialVoice: {
    tone: "Direto, crítico, claro e sem frase de agência.",
    rhythm:
      "Frases curtas. Começar pelo problema visto na prática, mostrar o critério e parar antes de explicar demais.",
    pointOfView:
      "Escrever como alguém que revisa oferta, página, conteúdo e atendimento. Ter opinião. Evitar neutralidade decorativa.",
    signatureRule:
      "A frase 'Clareza reduz atrito.' pode aparecer como assinatura curta, mas não deve virar argumento central.",
    preferredPatterns: [
      "Mais [canal] não corrige [base quebrada].",
      "Antes de [investir/criar/anunciar], revise [ponto que trava a decisão].",
      "O problema talvez não seja [canal]. Pode ser [oferta/página/atendimento].",
      "[Canal] só ajuda quando [função real] está clara.",
    ],
    avoidPatterns: [
      "Promessas absolutas.",
      "Superlativos sem prova.",
      "Frases genéricas sobre resultado, crescimento ou inovação.",
      "Repetir clareza, estratégia e estrutura quando uma palavra mais específica resolve.",
      "Explicar o método como se fosse uma tese.",
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
      "Opiniões que mostram critério",
    ],
    avoid: [
      "Jargão corporativo",
      "Excesso de adjetivo",
      "Promessas vagas",
      "Texto longo sem função",
      "Slogan repetido como explicação",
      "Botões genéricos como 'saiba mais' quando existe ação melhor",
    ],
  },
  pages: {
    home: {
      objective:
        "Mostrar que o site ajuda a diagnosticar, estudar, ver processo e decidir escopo sem depender de uma vitrine solta.",
      intendedAction:
        "Entrar pelo mapa, biblioteca, laboratório ou consultoria conforme a necessidade.",
      emotionalTone: "Critério + orientação",
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
        eyebrow: "Base antes de volume",
        headline: "Mais tráfego não corrige uma base confusa.",
        subheadline:
          "Conteúdo, projetos e serviços para revisar oferta, página e atendimento antes de aumentar esforço.",
        primaryCtaLabel: "Começar pelo mapa",
        primaryCtaHref: "/mapa",
        secondaryCtaLabel: "Entender consultoria",
        secondaryCtaHref: "/servicos",
      },
      sections: [
        {
          id: "proof",
          label: "Critério",
          title: "O primeiro ajuste raramente é publicar mais.",
          description:
            "Antes de produzir, eu procuro onde a pessoa perde entendimento, confiança ou vontade de chamar.",
          bullets: [
            "Oferta antes de campanha",
            "Página antes de verba",
            "Atendimento antes de automação",
            "Escopo pequeno antes de volume",
          ],
        },
        {
          id: "markets",
          label: "Mercados",
          title: "Nem todo mercado perde cliente no mesmo ponto.",
          description:
            "Clínica perde no atendimento. Freelancer perde na oferta. Loja perde no catálogo. O canal vem depois.",
        },
        {
          id: "works",
          label: "Laboratório",
          title: "Bastidores, decisões e aprendizados.",
          description:
            "Registros de processo para entender como projetos, sistemas e escolhas evoluem.",
          ctaLabel: "Ver laboratório",
          ctaHref: "/work",
        },
        {
          id: "blog",
          label: "Biblioteca",
          title: "Leia antes de mexer em tráfego, página ou conteúdo.",
          description: "Guias curtos para decidir com menos achismo.",
          ctaLabel: "Começar pela biblioteca",
          ctaHref: "/blog",
        },
        {
          id: "about-teaser",
          label: "Sobre",
          title: "Por que eu olho a base antes do volume.",
          description: "Como penso oferta, página, atendimento e execução.",
          ctaLabel: "Ver como penso",
          ctaHref: "/about",
        },
        {
          id: "final-cta",
          label: "Decisão",
          title: "Veja se faz sentido.",
          description: "Avalie cenário, prioridade e próximo passo antes de decidir.",
          ctaLabel: "Avaliar cenário",
          ctaHref: "/simulacao",
        },
      ],
    } satisfies StrategyPage,
    work: {
      objective: "Mostrar processo, decisões e aprendizados.",
      intendedAction:
        "Fazer o visitante entender como os projetos evoluem e continuar pela biblioteca ou serviços.",
      emotionalTone: "Bastidor + decisão",
      seo: {
        focus: "laboratório de projetos digitais",
        keywords: [
          "laboratório de projetos digitais",
          "bastidores de projetos digitais",
          "estudos de caso de presença digital",
          "decisões de produto e marketing",
        ],
      },
      hero: {
        eyebrow: "Work",
        headline: "Bastidores, decisões e aprendizados.",
        subheadline:
          "Registros curtos sobre o que mudou, por que mudou e o que isso ensinou no site, nos sistemas e nos projetos.",
        primaryCtaLabel: "Continuar na biblioteca",
        primaryCtaHref: "/blog",
        secondaryCtaLabel: "Entender serviços",
        secondaryCtaHref: "/servicos",
      },
      sections: [
        {
          id: "featured-project",
          label: "Destaque",
          title: "Registro principal.",
          description: "O problema, a escolha feita e o aprendizado que sobrou.",
        },
        {
          id: "categories",
          label: "Categorias",
          title: "Registros por função.",
          description:
            "Casos, bastidores, sistemas, aprendizados e experimentos têm papéis diferentes.",
        },
        {
          id: "grid",
          label: "Arquivo",
          title: "Registros disponíveis.",
          description: "Cada item precisa explicar a decisão, não só mostrar que algo foi feito.",
        },
        {
          id: "final-cta",
          label: "Próximo passo",
          title: "Continue pela biblioteca.",
          description:
            "Quando o registro fica estável, ele vira guia, artigo ou material de estudo.",
          ctaLabel: "Continuar na biblioteca",
          ctaHref: "/blog",
        },
      ],
    } satisfies StrategyPage,
    about: {
      objective: "Mostrar como Henrique pensa sem virar texto institucional.",
      intendedAction: "Levar para biblioteca, laboratório ou consultoria conforme o problema.",
      emotionalTone: "Humano + crítico",
      seo: {
        focus: "estratégia digital com design e tecnologia",
        keywords: [
          "estratégia digital com design e tecnologia",
          "leitura comercial para negócios locais",
          "parceiro digital para operações reais",
          "design tecnologia e decisão comercial",
        ],
      },
      hero: {
        eyebrow: "Sobre",
        headline: "Eu organizo o que acontece antes da venda.",
        subheadline:
          "Oferta, página, conteúdo e atendimento precisam se entender antes de pedir mais volume.",
        primaryCtaLabel: "Ver como penso",
        primaryCtaHref: "/about",
        secondaryCtaLabel: "Ver simulação",
        secondaryCtaHref: "/simulacao",
      },
      sections: [
        {
          id: "story",
          label: "Trajetória",
          title: "Minha história",
          description: "Empreender cedo mostrou que esforço sem estrutura cobra caro.",
        },
        {
          id: "rebuild",
          label: "Recomeço",
          title: "Prática antes de discurso.",
          description: "Recomeçar do zero tornou meu trabalho mais prático e disciplinado.",
        },
        {
          id: "fit",
          label: "Aderência",
          title: "Para quem faço sentido",
          description:
            "Para quem já entrega algo útil, mas perde cliente por falta de clareza no caminho.",
          bullets: [
            "Pequenos e médios negócios",
            "Profissionais e empresas de serviço",
            "Operações dependentes de indicação",
            "Páginas que explicam pouco",
          ],
        },
      ],
    } satisfies StrategyPage,
    blog: {
      objective: "Organizar conhecimento, SEO e repertório.",
      intendedAction:
        "Ajudar o visitante a escolher uma leitura por problema, tema ou etapa de aprendizado.",
      emotionalTone: "Clareza + utilidade",
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
        eyebrow: "Biblioteca",
        headline: "Leia por problema, tema ou etapa.",
        subheadline:
          "Textos para pensar antes de anunciar, redesenhar página, comprar ferramenta ou publicar mais.",
        primaryCtaLabel: "Começar pela biblioteca",
        primaryCtaHref: "/blog",
      },
      sections: [
        {
          id: "categories",
          label: "Categorias",
          title: "Temas para não abrir tudo ao mesmo tempo.",
          description: "Use quando já sabe qual problema quer revisar.",
          bullets: ["Negócios locais", "Marketing", "Design", "Operação", "Tecnologia", "Growth"],
        },
        {
          id: "archive",
          label: "Arquivo",
          title: "Arquivo sem depender de ordem cronológica.",
          description:
            "Artigo recente ajuda, mas o melhor ponto de partida nem sempre é o último publicado.",
        },
      ],
    } satisfies StrategyPage,
    contact: {
      objective: "Abrir conversa sem empurrar escopo antes de entender o problema.",
      intendedAction: "Levar o visitante a explicar contexto e prioridade.",
      emotionalTone: "Direto + sem pressão",
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
        headline: "Vamos entender onde a conta não fecha.",
        subheadline: "A conversa começa pelo problema, não por uma lista de entregáveis.",
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
