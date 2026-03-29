import { ProductsPage, ProductItem, ServicesPage, ServiceLanding } from "@/types";

export const servicesPage: ServicesPage = {
  path: "/servicos",
  label: "Servicos",
  title: "Servicos em Web, SEO e Automacao",
  description:
    "Projetos sob medida, pacotes prontos, micro-servicos e ferramentas para acelerar sites, lojas e operacoes.",
  intro: {
    headline: "Menos ruido, mais clareza para escolher a proxima etapa.",
    lead:
      "A oferta foi organizada em quatro camadas: servicos sob medida, pacotes, micro-servicos e SaaS. Assim fica mais facil entender escopo, prazo e investimento sem atravessar paginas longas demais.",
  },
};

export const services: ServiceLanding[] = [
  {
    slug: "websites-profissionais",
    title: "Websites Profissionais e Landing Pages",
    badge: "Web + Conversao",
    summary:
      "Sites e paginas de captacao construidos para apresentar melhor a marca, carregar rapido e converter com mais clareza.",
    hero: {
      highlight: "Next.js, SEO tecnico e interface responsiva",
      description:
        "Projeto sob medida para quem precisa sair do improviso e entrar em uma presenca digital mais forte, clara e confiavel.",
      price: "A partir de R$ 1.500",
      duration: "2 a 8 semanas",
      ctaLabel: "Solicitar proposta",
      ctaHref: "mailto:oi@henriquereis.dev?subject=Websites%20Profissionais",
    },
    audience:
      "Profissionais, negocios locais, marcas autorais e operacoes digitais que precisam de um site mais forte para vender, captar ou posicionar.",
    tags: ["Next.js", "SCSS", "SEO", "Responsivo"],
    keyPoints: [
      "Mais clareza na oferta, navegacao e captacao de leads.",
      "Base tecnica pronta para SEO, campanhas e futuras evolucoes.",
      "Interface consistente em desktop e mobile, sem excesso visual.",
    ],
    scopes: [
      {
        title: "Landing page de captacao",
        summary: "Estrutura enxuta para campanha, lancamento ou validacao de oferta.",
        investment: "A partir de R$ 1.500",
        timeline: "2 a 3 semanas",
        includes: ["Copy estrutural", "Formulario ou WhatsApp", "SEO tecnico essencial"],
      },
      {
        title: "Site institucional",
        summary: "Presenca digital completa para negocio, profissional ou estudio.",
        investment: "A partir de R$ 3.500",
        timeline: "3 a 6 semanas",
        includes: ["Arquitetura de paginas", "Design responsivo", "Base editorial opcional"],
      },
      {
        title: "Loja ou catalogo avancado",
        summary: "Frente digital mais robusta com foco em vendas, SEO e operacao.",
        investment: "Sob escopo",
        timeline: "6 a 8 semanas",
        includes: ["Catalogo ou colecoes", "Integracoes", "Camada de conversao"],
      },
    ],
    includes: [
      "Arquitetura visual e estrutural focada em navegacao simples.",
      "Implementacao com performance e SEO tecnico desde o inicio.",
      "Publicacao, tracking inicial e orientacao para proxima etapa.",
    ],
    process: [
      "Diagnostico rapido para entender objetivo, publico e prioridade.",
      "Design e implementacao em ciclos curtos, com validacao das telas principais.",
      "Entrega final com ajustes, publicacao e orientacao de evolucao.",
    ],
    faq: [
      {
        question: "Posso comecar por uma landing page e expandir depois?",
        answer: "Sim. A estrutura pode nascer menor e evoluir para um site completo conforme o projeto amadurece.",
      },
      {
        question: "Ja sai pronto para SEO?",
        answer: "Sim. A base tecnica, meta tags, estrutura e performance ja entram no escopo inicial.",
      },
      {
        question: "Voce trabalha com manutencao depois da entrega?",
        answer: "Sim. Posso seguir com melhoria continua, conteudo, SEO e novas paginas.",
      },
    ],
    estimator: true,
  },
  {
    slug: "landing-page-para-psicologas",
    title: "Landing Page para Psicologas",
    badge: "Psicologas + Agenda",
    summary:
      "Landing page focada em psicologas que querem mais constancia na captacao, previsibilidade na agenda e uma presenca digital mais profissional.",
    seo: {
      title: "Landing Page para Psicologas | Mais previsibilidade na agenda",
      description:
        "Crio landing page para psicologas com foco em SEO, profissionalismo digital e mais constancia na captacao de pacientes, sem depender so de tentativa e erro.",
      keywords: [
        "landing page para psicologas",
        "site para psicologas",
        "captar pacientes psicologa",
        "agenda de psicologa",
        "presenca digital para psicologas",
      ],
    },
    hero: {
      highlight: "Mais constancia, previsibilidade e presenca profissional",
      description:
        "Uma pagina pensada para transformar sua especialidade em uma apresentacao clara, confiavel e facil de converter em contato.",
      price: "A partir de R$ 1.500",
      duration: "2 a 4 semanas",
      ctaLabel: "Quero melhorar minha agenda",
      ctaHref: "https://wa.me/5575983675164?text=Quero%20uma%20landing%20page%20para%20psicologa",
    },
    audience:
      "Psicologas autonomas, profissionais em reposicionamento e clinicas que precisam de uma presenca digital mais previsivel, confiavel e facil de converter.",
    tags: ["Psicologas", "Landing page", "SEO", "WhatsApp"],
    keyPoints: [
      "Mais constancia na captacao sem depender apenas de indicacao ou redes sociais.",
      "Agenda mais previsivel com um caminho claro entre visita, confianca e contato.",
      "Presenca digital mais profissional para transmitir seguranca desde a primeira impressao.",
    ],
    scopes: [
      {
        title: "Landing page para agenda",
        summary:
          "Pagina unica para apresentar especialidade, abordagem, perguntas frequentes e CTA de contato.",
        investment: "A partir de R$ 1.500",
        timeline: "2 a 3 semanas",
        includes: [
          "Estrutura de copy orientada a conversao",
          "WhatsApp ou formulario",
          "SEO tecnico essencial",
        ],
      },
      {
        title: "Site profissional para psicologa",
        summary:
          "Estrutura com paginas para especialidades, sobre, FAQ, contato e base pronta para crescer.",
        investment: "A partir de R$ 2.800",
        timeline: "3 a 5 semanas",
        includes: [
          "Arquitetura de paginas",
          "Layout responsivo",
          "Blog opcional para SEO",
        ],
      },
      {
        title: "Sprint de refino da presenca digital",
        summary:
          "Refino de uma pagina ou site existente para melhorar clareza, confianca e conversao.",
        investment: "A partir de R$ 900",
        timeline: "1 a 2 semanas",
        includes: [
          "Revisao estrutural",
          "Melhoria de CTA e layout",
          "Ajustes tecnicos e SEO",
        ],
      },
    ],
    includes: [
      "Estrutura pensada para explicar com clareza para quem voce atende e como funciona o contato.",
      "Layout responsivo, profissional e discreto, sem exagero visual.",
      "Base tecnica para SEO, buscas locais e futuras evolucoes de conteudo.",
      "Caminho de contato simples por WhatsApp ou formulario, ligado a sua rotina de atendimento.",
    ],
    process: [
      "Entendo seu momento, sua especialidade e o que hoje trava previsibilidade na agenda.",
      "Organizo a pagina para comunicar seguranca, clareza e proximidade sem parecer generica.",
      "Entrego a estrutura publicada com orientacao para evolucao de conteudo e captacao.",
    ],
    faq: [
      {
        question: "Essa landing page ajuda a deixar a agenda mais previsivel?",
        answer:
          "Ela ajuda a criar um caminho mais claro entre interesse e contato. Nao substitui indicacao ou conteudo, mas melhora muito a forma como sua presenca digital converte.",
      },
      {
        question: "Preciso ter blog para funcionar?",
        answer:
          "Nao. A landing pode comecar so com a pagina principal. O blog entra depois se fizer sentido para SEO, autoridade e captacao organica.",
      },
      {
        question: "Voce ajuda a organizar os textos da pagina?",
        answer:
          "Sim. A pagina nao depende de voce chegar com tudo pronto. Eu ajudo a transformar sua abordagem e especialidade em uma estrutura clara e confiavel.",
      },
      {
        question: "Funciona para quem ainda esta construindo presenca digital?",
        answer:
          "Sim. Inclusive costuma funcionar melhor quando a base ainda esta sendo organizada, porque evita improviso e ja nasce com uma estrutura mais profissional.",
      },
    ],
  },
  {
    slug: "seo-tecnico",
    title: "SEO Tecnico, Auditoria e Otimizacao",
    badge: "SEO + Performance",
    summary:
      "Analise tecnica para sites, lojas virtuais e blogs que precisam corrigir gargalos de indexacao, velocidade e estrutura.",
    hero: {
      highlight: "E-commerce, blogs e paginas de alta intencao",
      description:
        "Servico para quem ja tem um site no ar, mas precisa destravar performance organica, Core Web Vitals e qualidade tecnica.",
      price: "A partir de R$ 350",
      duration: "1 a 4 semanas",
      ctaLabel: "Marcar auditoria",
      ctaHref: "mailto:oi@henriquereis.dev?subject=SEO%20Tecnico",
    },
    audience:
      "Lojas virtuais, blogs, sites institucionais e operacoes de conteudo que perderam visibilidade ou nao conseguem escalar com seguranca.",
    tags: ["SEO tecnico", "Core Web Vitals", "E-commerce", "Blog"],
    keyPoints: [
      "Identificacao rapida dos erros que travam indexacao, ranking e conversao.",
      "Prioridades organizadas por impacto, esforco e ordem de execucao.",
      "Base mais limpa para conteudo, campanhas e manutencao tecnica.",
    ],
    scopes: [
      {
        title: "Diagnostico rapido",
        summary: "Leitura tatica para identificar bloqueios mais urgentes.",
        investment: "A partir de R$ 350",
        timeline: "1 semana",
        includes: ["Checklist tecnico", "Prioridades iniciais", "Resumo executivo"],
      },
      {
        title: "Auditoria completa",
        summary: "Analise mais profunda para sites com mais paginas ou operacao editorial.",
        investment: "A partir de R$ 1.200",
        timeline: "2 a 3 semanas",
        includes: ["Crawl e estrutura", "Performance", "Plano de correcoes"],
      },
      {
        title: "Sprint de correcoes",
        summary: "Execucao das melhorias tecnicas mais criticas.",
        investment: "Sob escopo",
        timeline: "2 a 4 semanas",
        includes: ["Implementacao", "Validacao tecnica", "Entrega com acompanhamento curto"],
      },
    ],
    includes: [
      "Leitura de estrutura, indexacao, renderizacao e performance.",
      "Plano pratico de correcoes com foco em lojas virtuais e blogs.",
      "Acompanhamento tecnico para rollout ou repasse ao time.",
    ],
    process: [
      "Levantamento do ambiente, historico e objetivos de negocio.",
      "Auditoria com priorizacao do que traz impacto mais rapido.",
      "Entrega tecnica com recomendacoes, correcoes ou sprint dedicada.",
    ],
    faq: [
      {
        question: "Serve para blog e loja virtual?",
        answer: "Sim. Esse e um dos focos principais do servico, especialmente em SEO tecnico para conteudo e e-commerce.",
      },
      {
        question: "Voce tambem executa as correcoes?",
        answer: "Sim. Posso entregar so a auditoria ou seguir para uma sprint de implementacao.",
      },
      {
        question: "Preciso trocar de plataforma?",
        answer: "Nem sempre. Primeiro eu avalio o que da para corrigir na estrutura atual antes de sugerir migracao.",
      },
    ],
  },
  {
    slug: "integracoes-automacoes",
    title: "Integracoes, Automacao e Operacao Digital",
    badge: "Automacao + Operacao",
    summary:
      "Fluxos, integracoes e automacoes para reduzir trabalho manual e ligar marketing, atendimento e operacao.",
    hero: {
      highlight: "APIs, formularios, WhatsApp e dashboards",
      description:
        "Ideal para quem precisa organizar dados, automatizar contato ou eliminar tarefas repetitivas em vendas e operacao.",
      price: "A partir de R$ 300",
      duration: "1 a 6 semanas",
      ctaLabel: "Mapear automacao",
      ctaHref: "mailto:oi@henriquereis.dev?subject=Automacao%20e%20Integracoes",
    },
    audience:
      "Negocios que ja vendem, atendem ou operam digitalmente e precisam de mais previsibilidade, velocidade e controle.",
    tags: ["APIs", "WhatsApp", "Dashboards", "Automacao"],
    keyPoints: [
      "Menos retrabalho e menos dependencias manuais no dia a dia.",
      "Processos mais claros entre captura de lead, atendimento e acompanhamento.",
      "Dados organizados para decidir melhor o que evoluir depois.",
    ],
    scopes: [
      {
        title: "Micro-automacao",
        summary: "Uma automacao pontual para tirar uma tarefa manual do caminho.",
        investment: "A partir de R$ 300",
        timeline: "1 semana",
        includes: ["Mapeamento rapido", "Fluxo unico", "Teste basico"],
      },
      {
        title: "Fluxo comercial conectado",
        summary: "Ligacao entre canais de entrada, resposta e acompanhamento.",
        investment: "A partir de R$ 900",
        timeline: "2 a 3 semanas",
        includes: ["Formulario", "WhatsApp ou email", "Alertas e organizacao"],
      },
      {
        title: "Operacao integrada",
        summary: "Camada mais completa com dashboards, integracoes e rotina assistida.",
        investment: "Sob escopo",
        timeline: "3 a 6 semanas",
        includes: ["Integracoes multiplas", "Dashboards", "Playbook operacional"],
      },
    ],
    includes: [
      "Levantamento dos pontos de atrito da operacao atual.",
      "Automacoes e integracoes com foco no que gera ganho imediato.",
      "Documentacao curta para o fluxo continuar funcionando depois.",
    ],
    process: [
      "Mapeamento do fluxo atual e dos gargalos mais caros.",
      "Implementacao do caminho prioritario com validacao do time.",
      "Entrega assistida com ajustes finos e orientacao de uso.",
    ],
    faq: [
      {
        question: "Da para integrar com WhatsApp e formularios?",
        answer: "Sim. Esse tipo de conexao costuma ser uma das primeiras entregas mais uteis.",
      },
      {
        question: "Serve para negocio pequeno?",
        answer: "Sim. Automacao nao precisa nascer grande. Muitas vezes um fluxo simples ja resolve o principal problema.",
      },
      {
        question: "Voce tambem organiza os dados?",
        answer: "Sim. Posso estruturar a coleta e deixar dashboards ou tabelas mais uteis para leitura rapida.",
      },
    ],
  },
];

export const productsPage: ProductsPage = {
  path: "/servicos/produtos",
  label: "Pacotes e Ferramentas",
  title: "Pacotes, Micro-servicos e SaaS",
  description:
    "Ofertas menores, mais objetivas e com entrada simples para quem precisa implementar algo sem contratar um projeto completo.",
  cta: "Escolha um formato claro, gratuito ou pago, e siga para contato, checkout ou lista de espera.",
  note: "Aqui entram pacotes de execucao, micro-servicos tecnicos e ferramentas criadas por mim.",
};

export const products: ProductItem[] = [
  {
    slug: "pacote-landing-page",
    title: "Pacote Landing Page Expressa",
    summary:
      "Pacote para colocar uma oferta no ar com mais clareza, responsividade e base de conversao.",
    category: "package",
    access: "paid",
    format: "Implementacao guiada em Next.js",
    price: "A partir de R$ 1.500",
    priceLabel: "Pago",
    status: "Disponivel",
    highlights: ["Estrutura de copy", "Layout responsivo", "Formulario ou WhatsApp"],
    link: "mailto:oi@henriquereis.dev?subject=Pacote%20Landing%20Page%20Expressa",
    ctaLabel: "Solicitar pacote",
  },
  {
    slug: "pacote-seo-loja-virtual",
    title: "Pacote SEO para Loja Virtual",
    summary:
      "Pacote focado em estrutura tecnica, paginas-chave e gargalos comuns de e-commerce.",
    category: "package",
    access: "paid",
    format: "Auditoria + plano de acao",
    price: "A partir de R$ 1.200",
    priceLabel: "Pago",
    status: "Disponivel",
    highlights: ["Categorias e colecoes", "Performance", "Prioridades comerciais"],
    link: "mailto:oi@henriquereis.dev?subject=Pacote%20SEO%20para%20Loja%20Virtual",
    ctaLabel: "Quero esse pacote",
  },
  {
    slug: "pacote-blog-nextjs",
    title: "Pacote Blog Editorial em Next.js",
    summary:
      "Base para blog focado em SEO, performance e rotina de publicacao mais organizada.",
    category: "package",
    access: "paid",
    format: "Estrutura editorial + implementacao",
    price: "A partir de R$ 2.400",
    priceLabel: "Pago",
    status: "Disponivel",
    highlights: ["Arquitetura de posts", "Categorias e SEO", "Base pronta para crescimento"],
    link: "mailto:oi@henriquereis.dev?subject=Pacote%20Blog%20Editorial%20em%20Next.js",
    ctaLabel: "Solicitar proposta",
  },
  {
    slug: "micro-core-web-vitals",
    title: "Micro-servico de Core Web Vitals",
    summary:
      "Correcao tecnica focada em velocidade percebida, estabilidade visual e pontos criticos de carregamento.",
    category: "microservice",
    access: "paid",
    format: "Sprint tecnica curta",
    price: "A partir de R$ 350",
    priceLabel: "Pago",
    status: "Disponivel",
    highlights: ["LCP e CLS", "Leitura tecnica", "Correcoes prioritarias"],
    link: "mailto:oi@henriquereis.dev?subject=Micro-servico%20de%20Core%20Web%20Vitals",
    ctaLabel: "Pedir sprint",
  },
  {
    slug: "micro-implementacao-seo",
    title: "Micro-servico de Implementacao SEO",
    summary:
      "Aplicacao rapida de meta tags, schema, headings, sitemaps e ajustes tecnicos basicos.",
    category: "microservice",
    access: "paid",
    format: "Ajuste pontual",
    price: "A partir de R$ 300",
    priceLabel: "Pago",
    status: "Disponivel",
    highlights: ["Meta tags", "Schema markup", "Sitemap e indexacao"],
    link: "mailto:oi@henriquereis.dev?subject=Micro-servico%20de%20Implementacao%20SEO",
    ctaLabel: "Agendar ajuste",
  },
  {
    slug: "micro-refino-scss",
    title: "Micro-servico de Refino Front-end",
    summary:
      "Refino visual e estrutural para componentes, SCSS, responsividade e clareza da interface.",
    category: "microservice",
    access: "paid",
    format: "Ajuste visual e de codigo",
    price: "A partir de R$ 450",
    priceLabel: "Pago",
    status: "Disponivel",
    highlights: ["SCSS modular", "Responsividade", "Hierarquia visual"],
    link: "mailto:oi@henriquereis.dev?subject=Micro-servico%20de%20Refino%20Front-end",
    ctaLabel: "Solicitar refino",
  },
  {
    slug: "micro-integracao-whatsapp",
    title: "Micro-servico de Integracao com WhatsApp",
    summary:
      "Conecta formularios, captacao de leads ou paginas de produto com atendimento mais agil.",
    category: "microservice",
    access: "paid",
    format: "Implementacao pontual",
    price: "A partir de R$ 300",
    priceLabel: "Pago",
    status: "Disponivel",
    highlights: ["Captacao", "Encaminhamento", "Fluxo simples de atendimento"],
    link: "mailto:oi@henriquereis.dev?subject=Micro-servico%20de%20Integracao%20com%20WhatsApp",
    ctaLabel: "Integrar fluxo",
  },
  {
    slug: "simulador-escopo-web",
    title: "Simulador de Escopo Web",
    summary:
      "Ferramenta gratuita para estimar faixas de investimento em sites, modulos e camadas de projeto.",
    category: "saas",
    access: "free",
    format: "Ferramenta web",
    price: "Gratuito",
    priceLabel: "Gratis",
    status: "Disponivel",
    highlights: ["Estimativa inicial", "Leitura de escopo", "Entrada rapida para briefing"],
    link: "/servicos/websites-profissionais#estimativa-rapida",
    ctaLabel: "Abrir simulador",
  },
  {
    slug: "radar-editorial-seo",
    title: "Radar Editorial SEO",
    summary:
      "Ferramenta em beta para organizar pautas, oportunidades e prioridade de conteudo.",
    category: "saas",
    access: "freemium",
    format: "SaaS em beta",
    price: "Freemium",
    priceLabel: "Gratis + pago",
    status: "Beta",
    highlights: ["Mapa de pautas", "Prioridade editorial", "Leitura rapida de oportunidade"],
    link: "mailto:oi@henriquereis.dev?subject=Lista%20de%20espera%20Radar%20Editorial%20SEO",
    ctaLabel: "Entrar na lista",
  },
  {
    slug: "painel-seo-lojas",
    title: "Painel SEO para Lojas",
    summary:
      "Painel projetado para acompanhar problemas tecnicos, paginas estrategicas e ganhos de performance em e-commerce.",
    category: "saas",
    access: "paid",
    format: "SaaS privado",
    price: "Sob consulta",
    priceLabel: "Pago",
    status: "Lista de espera",
    highlights: ["Monitoramento tecnico", "Leitura por prioridade", "Uso focado em lojas"],
    link: "mailto:oi@henriquereis.dev?subject=Interesse%20no%20Painel%20SEO%20para%20Lojas",
    ctaLabel: "Quero saber mais",
  },
];
