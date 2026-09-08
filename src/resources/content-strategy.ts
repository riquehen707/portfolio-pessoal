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
          label: "Portfólio",
          title: "Sites e interfaces em detalhe.",
          description:
            "Projetos com contexto, capturas da interface e serviços relacionados.",
          ctaLabel: "Ver portfólio",
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
          ctaHref: "/sobre",
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
      objective: "Mostrar o trabalho realizado, com contexto e evidência visual.",
      intendedAction:
        "Permitir avaliar os projetos e encontrar o serviço relacionado.",
      emotionalTone: "Concreto e explicativo",
      seo: {
        focus: "portfólio de sites e interfaces",
        keywords: [
          "portfólio de sites",
          "sites para profissionais",
          "estudos de interface",
          "Henrique Reis",
        ],
      },
      hero: {
        eyebrow: "Portfólio",
        headline: "Projetos e interfaces.",
        subheadline:
          "Sites para profissionais de diferentes áreas, com contexto, interface e decisões de projeto.",
        primaryCtaLabel: "Ver trabalhos",
        primaryCtaHref: "#projects-title",
        secondaryCtaLabel: "Ver serviços",
        secondaryCtaHref: "/servicos",
      },
      sections: [
        {
          id: "featured-project",
          label: "Destaque",
          title: "Trabalhos em destaque",
          description: "Projetos com contexto, solução e interface disponível.",
        },
        {
          id: "categories",
          label: "Categorias",
          title: "Tipos de projeto",
          description:
            "Filtros só entram quando há volume que justifique separar os trabalhos.",
        },
        {
          id: "grid",
          label: "Arquivo",
          title: "Projetos disponíveis",
          description: "Distinguir trabalhos de clientes, projetos próprios e estudos ilustrativos.",
        },
        {
          id: "final-cta",
          label: "Próximo passo",
          title: "Precisa de um site ou portfólio?",
          description:
            "Veja formatos, preços e o que está incluído.",
          ctaLabel: "Ver serviços",
          ctaHref: "/servicos",
        },
      ],
    } satisfies StrategyPage,
    about: {
      objective: "Apresentar quem é Henrique, o que faz, como trabalha e onde verificar projetos.",
      intendedAction: "Levar para serviços, portfólio ou contato conforme a necessidade.",
      emotionalTone: "Pessoal, direto e específico",
      seo: {
        focus: "Henrique Reis desenvolvimento de sites",
        keywords: [
          "Henrique Reis desenvolvimento de sites",
          "sites para profissionais",
          "landing pages e portfólios",
          "desenvolvimento web independente",
        ],
      },
      hero: {
        eyebrow: "Sobre",
        headline: "Desenvolvo sites para profissionais e negócios.",
        subheadline:
          "Crio sites, landing pages, portfólios e pequenos sistemas, do escopo à publicação.",
        primaryCtaLabel: "Ver serviços",
        primaryCtaHref: "/servicos",
        secondaryCtaLabel: "Ver portfólio",
        secondaryCtaHref: "/work",
      },
      sections: [
        {
          id: "services",
          label: "O que faço",
          title: "Projetos com uma função clara",
          description: "Sites, landing pages, portfólios, sistemas pequenos e SEO técnico.",
        },
        {
          id: "process",
          label: "Como trabalho",
          title: "Do problema à página publicada",
          description: "Entender, delimitar, construir, revisar, publicar e manter.",
        },
        {
          id: "proof",
          label: "Experiência e projetos",
          title: "O que pode ser verificado",
          description: "Projeto próprio, interfaces publicadas, escopo e tecnologias usadas.",
          bullets: [
            "henrique.dog",
            "Portfólio",
            "Serviços publicados",
            "Interfaces demonstrativas identificadas",
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
