import { ProductsPage, ProductItem, ServicesPage, ServiceLanding } from "@/types";

export const servicesPage: ServicesPage = {
  path: "/servicos",
  label: "Serviços",
  title: "Serviços em web, SEO e automação",
  description:
    "Projetos sob medida, pacotes e ferramentas para sites, SEO técnico e operação digital.",
  intro: {
    headline: "Escolha o formato certo sem atravessar páginas longas.",
    lead:
      "Aqui você encontra quatro formatos de entrada: serviço sob medida, pacote, micro-serviço e ferramenta própria. Cada um mostra escopo, prazo e ponto de partida com mais clareza.",
  },
};

export const services: ServiceLanding[] = [
  {
    slug: "websites-profissionais",
    title: "Websites profissionais e landing pages",
    badge: "Web + Conversão",
    summary:
      "Sites e landing pages para apresentar melhor o serviço, facilitar o contato e sustentar campanhas ou SEO.",
    hero: {
      highlight: "Next.js, SEO técnico e interface responsiva",
      description:
        "Para negócios e profissionais que precisam sair do improviso e ter uma presença digital mais clara, rápida e profissional.",
      price: "A partir de R$ 1.500",
      duration: "2 a 8 semanas",
      ctaLabel: "Solicitar proposta",
      ctaHref: "mailto:oi@henriquereis.dev?subject=Websites%20Profissionais",
    },
    audience:
      "Profissionais, negócios locais, marcas autorais e operações digitais que precisam vender, captar ou se posicionar melhor.",
    tags: ["Next.js", "SCSS", "SEO", "Responsivo"],
    keyPoints: [
      "Mensagem mais clara para quem chega ao site.",
      "Estrutura pronta para SEO, campanhas e evolução futura.",
      "Experiência consistente no desktop e no mobile.",
    ],
    scopes: [
      {
        title: "Landing page de captação",
        summary: "Página enxuta para campanha, lançamento ou validação de oferta.",
        investment: "A partir de R$ 1.500",
        timeline: "2 a 3 semanas",
        includes: ["Estrutura de copy", "Formulário ou WhatsApp", "SEO técnico essencial"],
      },
      {
        title: "Site institucional",
        summary: "Presença digital mais completa para negócio, profissional ou estúdio.",
        investment: "A partir de R$ 3.500",
        timeline: "3 a 6 semanas",
        includes: ["Arquitetura de páginas", "Design responsivo", "Base editorial opcional"],
      },
      {
        title: "Loja ou catálogo avançado",
        summary: "Frente digital mais robusta para venda, SEO e operação.",
        investment: "Sob escopo",
        timeline: "6 a 8 semanas",
        includes: ["Catálogo ou coleções", "Integrações", "Camada de conversão"],
      },
    ],
    includes: [
      "Arquitetura da página com foco em clareza e navegação simples.",
      "Implementação responsiva com performance e SEO técnico desde o início.",
      "Publicação com orientação para os próximos passos.",
    ],
    process: [
      "Diagnóstico curto para entender objetivo, público e prioridade.",
      "Desenho e implementação das telas principais.",
      "Ajustes finais, publicação e orientação de evolução.",
    ],
    faq: [
      {
        question: "Posso começar com uma landing page e expandir depois?",
        answer: "Sim. A estrutura pode nascer menor e crescer para um site completo conforme a operação evolui.",
      },
      {
        question: "Já sai pronto para SEO?",
        answer: "Sim. Estrutura, meta tags, performance e base técnica já entram no escopo inicial.",
      },
      {
        question: "Você segue com manutenção depois da entrega?",
        answer: "Sim. Posso continuar com melhorias, SEO, conteúdo e novas páginas.",
      },
    ],
    estimator: true,
  },
  {
    slug: "landing-page-para-psicologas",
    title: "Landing page para psicólogas",
    badge: "Psicólogas + Agenda",
    summary:
      "Landing page para psicólogas que precisam transmitir confiança, organizar melhor a agenda e facilitar o primeiro contato.",
    seo: {
      title: "Landing page para psicólogas | Mais previsibilidade na agenda",
      description:
        "Crio landing page para psicólogas com foco em SEO, presença digital profissional e mais constância na captação de pacientes.",
      keywords: [
        "landing page para psicólogas",
        "site para psicólogas",
        "captar pacientes psicóloga",
        "agenda de psicóloga",
        "presença digital para psicólogas",
      ],
    },
    hero: {
      highlight: "Mais constância, previsibilidade e presença profissional",
      description:
        "Uma página pensada para explicar sua especialidade, reduzir insegurança e transformar interesse em conversa.",
      price: "A partir de R$ 1.500",
      duration: "2 a 4 semanas",
      ctaLabel: "Quero melhorar minha agenda",
      ctaHref: "https://wa.me/5575983675164?text=Quero%20uma%20landing%20page%20para%20psicologa",
    },
    audience:
      "Psicólogas autônomas, profissionais em reposicionamento e clínicas que querem uma presença digital mais confiável e previsível.",
    tags: ["Psicólogas", "Landing page", "SEO", "WhatsApp"],
    keyPoints: [
      "Mais clareza sobre abordagem, especialidade e contato.",
      "Um caminho simples entre visita, confiança e agenda.",
      "Presença digital mais profissional sem excesso visual.",
    ],
    scopes: [
      {
        title: "Landing page para agenda",
        summary: "Página única para apresentar especialidade, abordagem e contato.",
        investment: "A partir de R$ 1.500",
        timeline: "2 a 3 semanas",
        includes: ["Estrutura de copy", "WhatsApp ou formulário", "SEO técnico essencial"],
      },
      {
        title: "Site profissional para psicóloga",
        summary: "Estrutura com páginas principais e base pronta para crescer.",
        investment: "A partir de R$ 2.800",
        timeline: "3 a 5 semanas",
        includes: ["Arquitetura de páginas", "Layout responsivo", "Blog opcional para SEO"],
      },
      {
        title: "Sprint de refino da presença digital",
        summary: "Ajustes em um site ou página existente para melhorar clareza e conversão.",
        investment: "A partir de R$ 900",
        timeline: "1 a 2 semanas",
        includes: ["Revisão estrutural", "Melhoria de CTA e layout", "Ajustes técnicos e SEO"],
      },
    ],
    includes: [
      "Estrutura para explicar com clareza para quem você atende e como funciona o contato.",
      "Layout responsivo, discreto e profissional.",
      "Base técnica para SEO, buscas locais e futuras evoluções.",
      "Contato simples por WhatsApp ou formulário, conectado à rotina de atendimento.",
    ],
    process: [
      "Entendo sua especialidade, seu momento e o que hoje trava a agenda.",
      "Organizo a página para comunicar segurança, clareza e proximidade.",
      "Entrego a estrutura publicada com orientação para evoluir depois.",
    ],
    faq: [
      {
        question: "Essa landing page ajuda a deixar a agenda mais previsível?",
        answer:
          "Ela melhora o caminho entre interesse e contato. Não substitui indicação ou conteúdo, mas aumenta a clareza da sua presença digital.",
      },
      {
        question: "Preciso ter blog para funcionar?",
        answer: "Não. A landing pode começar sozinha. O blog entra depois, se fizer sentido para SEO e autoridade.",
      },
      {
        question: "Você ajuda a organizar os textos da página?",
        answer: "Sim. Eu transformo sua abordagem e sua especialidade em uma estrutura mais clara e confiável.",
      },
      {
        question: "Funciona para quem ainda está começando no digital?",
        answer: "Sim. Inclusive ajuda a evitar improviso e a construir uma base mais profissional desde o início.",
      },
    ],
  },
  {
    slug: "seo-tecnico",
    title: "SEO técnico, auditoria e otimização",
    badge: "SEO + Performance",
    summary:
      "Auditoria e correções para sites, lojas virtuais e blogs com problemas de indexação, velocidade ou estrutura.",
    hero: {
      highlight: "E-commerce, blogs e páginas de alta intenção",
      description:
        "Para operações que já têm site no ar, mas precisam corrigir gargalos antes de escalar conteúdo, mídia ou catálogo.",
      price: "A partir de R$ 350",
      duration: "1 a 4 semanas",
      ctaLabel: "Marcar auditoria",
      ctaHref: "mailto:oi@henriquereis.dev?subject=SEO%20Tecnico",
    },
    audience:
      "Lojas virtuais, blogs, sites institucionais e operações de conteúdo que perderam visibilidade ou não conseguem crescer com segurança.",
    tags: ["SEO técnico", "Core Web Vitals", "E-commerce", "Blog"],
    keyPoints: [
      "Erros críticos identificados com mais rapidez.",
      "Prioridades organizadas por impacto e esforço.",
      "Base técnica mais limpa para conteúdo, mídia e manutenção.",
    ],
    scopes: [
      {
        title: "Diagnóstico rápido",
        summary: "Leitura tática para localizar os bloqueios mais urgentes.",
        investment: "A partir de R$ 350",
        timeline: "1 semana",
        includes: ["Checklist técnico", "Prioridades iniciais", "Resumo executivo"],
      },
      {
        title: "Auditoria completa",
        summary: "Análise mais profunda para sites com mais páginas ou operação editorial.",
        investment: "A partir de R$ 1.200",
        timeline: "2 a 3 semanas",
        includes: ["Crawl e estrutura", "Performance", "Plano de correções"],
      },
      {
        title: "Sprint de correções",
        summary: "Execução das melhorias técnicas mais críticas.",
        investment: "Sob escopo",
        timeline: "2 a 4 semanas",
        includes: ["Implementação", "Validação técnica", "Acompanhamento curto"],
      },
    ],
    includes: [
      "Leitura de estrutura, indexação, renderização e performance.",
      "Plano prático de correções com foco em lojas virtuais e blogs.",
      "Acompanhamento técnico para rollout ou repasse ao time.",
    ],
    process: [
      "Levantamento do ambiente, histórico e objetivo principal.",
      "Auditoria com priorização do que traz impacto mais rápido.",
      "Entrega técnica com recomendações, correções ou sprint dedicada.",
    ],
    faq: [
      {
        question: "Serve para blog e loja virtual?",
        answer: "Sim. Esse é um dos focos principais do serviço, especialmente em SEO técnico para conteúdo e e-commerce.",
      },
      {
        question: "Você também executa as correções?",
        answer: "Sim. Posso entregar só a auditoria ou seguir para uma sprint de implementação.",
      },
      {
        question: "Preciso trocar de plataforma?",
        answer: "Nem sempre. Primeiro eu avalio o que dá para corrigir na estrutura atual antes de sugerir migração.",
      },
    ],
  },
  {
    slug: "integracoes-automacoes",
    title: "Integrações, automação e operação digital",
    badge: "Automação + Operação",
    summary:
      "Fluxos, integrações e automações para reduzir tarefas manuais e organizar melhor a operação digital.",
    hero: {
      highlight: "APIs, formulários, WhatsApp e dashboards",
      description:
        "Ideal para quem precisa conectar canais, automatizar etapas do atendimento ou reduzir retrabalho na rotina.",
      price: "A partir de R$ 300",
      duration: "1 a 6 semanas",
      ctaLabel: "Mapear automação",
      ctaHref: "mailto:oi@henriquereis.dev?subject=Automacao%20e%20Integracoes",
    },
    audience:
      "Negócios que já captam, atendem ou operam no digital e precisam de mais previsibilidade, velocidade e controle.",
    tags: ["APIs", "WhatsApp", "Dashboards", "Automação"],
    keyPoints: [
      "Menos retrabalho no dia a dia.",
      "Fluxo mais claro entre lead, atendimento e acompanhamento.",
      "Dados mais organizados para decidir melhor o próximo passo.",
    ],
    scopes: [
      {
        title: "Microautomação",
        summary: "Automação pontual para tirar uma tarefa manual do caminho.",
        investment: "A partir de R$ 300",
        timeline: "1 semana",
        includes: ["Mapeamento rápido", "Fluxo único", "Teste básico"],
      },
      {
        title: "Fluxo comercial conectado",
        summary: "Ligação entre entrada, resposta e acompanhamento.",
        investment: "A partir de R$ 900",
        timeline: "2 a 3 semanas",
        includes: ["Formulário", "WhatsApp ou e-mail", "Alertas e organização"],
      },
      {
        title: "Operação integrada",
        summary: "Camada mais completa com dashboards, integrações e rotina assistida.",
        investment: "Sob escopo",
        timeline: "3 a 6 semanas",
        includes: ["Integrações múltiplas", "Dashboards", "Playbook operacional"],
      },
    ],
    includes: [
      "Mapeamento dos pontos de atrito da operação atual.",
      "Automação e integração com foco no que gera ganho imediato.",
      "Documentação curta para o fluxo continuar funcionando.",
    ],
    process: [
      "Mapeamento do fluxo atual e dos gargalos mais caros.",
      "Implementação do caminho prioritário com validação do time.",
      "Entrega assistida com ajustes finos e orientação de uso.",
    ],
    faq: [
      {
        question: "Dá para integrar com WhatsApp e formulários?",
        answer: "Sim. Esse costuma ser um dos primeiros pontos de ganho prático.",
      },
      {
        question: "Serve para negócio pequeno?",
        answer: "Sim. Muitas vezes uma automação simples já resolve o principal gargalo.",
      },
      {
        question: "Você também organiza os dados?",
        answer: "Sim. Posso estruturar a coleta e deixar dashboards ou tabelas mais fáceis de acompanhar.",
      },
    ],
  },
];

export const productsPage: ProductsPage = {
  path: "/servicos/produtos",
  label: "Pacotes e Ferramentas",
  title: "Pacotes, micro-serviços e SaaS",
  description:
    "Ofertas menores para resolver um problema específico sem abrir um projeto completo.",
  cta: "Escolha um formato, entenda o ponto de entrada e siga para contato, checkout ou lista de espera.",
  note: "Aqui entram pacotes prontos, micro-serviços técnicos e ferramentas criadas por mim.",
};

export const products: ProductItem[] = [
  {
    slug: "pacote-landing-page",
    title: "Pacote Landing Page Expressa",
    summary:
      "Pacote para colocar uma oferta no ar com mais clareza, responsividade e base de conversão.",
    category: "package",
    access: "paid",
    format: "Implementação guiada em Next.js",
    price: "A partir de R$ 1.500",
    priceLabel: "Pago",
    status: "Disponível",
    highlights: ["Estrutura de copy", "Layout responsivo", "Formulário ou WhatsApp"],
    link: "mailto:oi@henriquereis.dev?subject=Pacote%20Landing%20Page%20Expressa",
    ctaLabel: "Solicitar pacote",
  },
  {
    slug: "pacote-seo-loja-virtual",
    title: "Pacote SEO para loja virtual",
    summary:
      "Pacote focado em estrutura técnica, páginas-chave e gargalos comuns de e-commerce.",
    category: "package",
    access: "paid",
    format: "Auditoria + plano de ação",
    price: "A partir de R$ 1.200",
    priceLabel: "Pago",
    status: "Disponível",
    highlights: ["Categorias e coleções", "Performance", "Prioridades comerciais"],
    link: "mailto:oi@henriquereis.dev?subject=Pacote%20SEO%20para%20Loja%20Virtual",
    ctaLabel: "Quero esse pacote",
  },
  {
    slug: "pacote-blog-nextjs",
    title: "Pacote Blog Editorial em Next.js",
    summary:
      "Base para blog com SEO, performance e rotina de publicação mais organizada.",
    category: "package",
    access: "paid",
    format: "Estrutura editorial + implementação",
    price: "A partir de R$ 2.400",
    priceLabel: "Pago",
    status: "Disponível",
    highlights: ["Arquitetura de posts", "Categorias e SEO", "Base pronta para crescer"],
    link: "mailto:oi@henriquereis.dev?subject=Pacote%20Blog%20Editorial%20em%20Next.js",
    ctaLabel: "Solicitar proposta",
  },
  {
    slug: "micro-core-web-vitals",
    title: "Micro-serviço de Core Web Vitals",
    summary:
      "Correção técnica focada em velocidade percebida, estabilidade visual e carregamento.",
    category: "microservice",
    access: "paid",
    format: "Sprint técnica curta",
    price: "A partir de R$ 350",
    priceLabel: "Pago",
    status: "Disponível",
    highlights: ["LCP e CLS", "Leitura técnica", "Correções prioritárias"],
    link: "mailto:oi@henriquereis.dev?subject=Micro-servico%20de%20Core%20Web%20Vitals",
    ctaLabel: "Pedir sprint",
  },
  {
    slug: "micro-implementacao-seo",
    title: "Micro-serviço de implementação SEO",
    summary:
      "Aplicação rápida de meta tags, schema, headings, sitemap e ajustes técnicos básicos.",
    category: "microservice",
    access: "paid",
    format: "Ajuste pontual",
    price: "A partir de R$ 300",
    priceLabel: "Pago",
    status: "Disponível",
    highlights: ["Meta tags", "Schema markup", "Sitemap e indexação"],
    link: "mailto:oi@henriquereis.dev?subject=Micro-servico%20de%20Implementacao%20SEO",
    ctaLabel: "Agendar ajuste",
  },
  {
    slug: "micro-refino-scss",
    title: "Micro-serviço de refino front-end",
    summary:
      "Refino visual e estrutural para componentes, SCSS, responsividade e clareza da interface.",
    category: "microservice",
    access: "paid",
    format: "Ajuste visual e de código",
    price: "A partir de R$ 450",
    priceLabel: "Pago",
    status: "Disponível",
    highlights: ["SCSS modular", "Responsividade", "Hierarquia visual"],
    link: "mailto:oi@henriquereis.dev?subject=Micro-servico%20de%20Refino%20Front-end",
    ctaLabel: "Solicitar refino",
  },
  {
    slug: "micro-integracao-whatsapp",
    title: "Micro-serviço de integração com WhatsApp",
    summary:
      "Conecta formulários, captação de leads ou páginas de produto com um atendimento mais ágil.",
    category: "microservice",
    access: "paid",
    format: "Implementação pontual",
    price: "A partir de R$ 300",
    priceLabel: "Pago",
    status: "Disponível",
    highlights: ["Captação", "Encaminhamento", "Fluxo simples de atendimento"],
    link: "mailto:oi@henriquereis.dev?subject=Micro-servico%20de%20Integracao%20com%20WhatsApp",
    ctaLabel: "Integrar fluxo",
  },
  {
    slug: "simulador-escopo-web",
    title: "Simulador de escopo web",
    summary:
      "Ferramenta gratuita para estimar faixas de investimento em sites, módulos e camadas de projeto.",
    category: "saas",
    access: "free",
    format: "Ferramenta web",
    price: "Gratuito",
    priceLabel: "Grátis",
    status: "Disponível",
    highlights: ["Estimativa inicial", "Leitura de escopo", "Entrada rápida para briefing"],
    link: "/servicos/websites-profissionais#estimativa-rapida",
    ctaLabel: "Abrir simulador",
  },
  {
    slug: "radar-editorial-seo",
    title: "Radar editorial SEO",
    summary:
      "Ferramenta em beta para organizar pautas, oportunidades e prioridade de conteúdo.",
    category: "saas",
    access: "freemium",
    format: "SaaS em beta",
    price: "Freemium",
    priceLabel: "Grátis + pago",
    status: "Beta",
    highlights: ["Mapa de pautas", "Prioridade editorial", "Leitura rápida de oportunidade"],
    link: "mailto:oi@henriquereis.dev?subject=Lista%20de%20espera%20Radar%20Editorial%20SEO",
    ctaLabel: "Entrar na lista",
  },
  {
    slug: "painel-seo-lojas",
    title: "Painel SEO para lojas",
    summary:
      "Painel para acompanhar problemas técnicos, páginas estratégicas e ganhos de performance em e-commerce.",
    category: "saas",
    access: "paid",
    format: "SaaS privado",
    price: "Sob consulta",
    priceLabel: "Pago",
    status: "Lista de espera",
    highlights: ["Monitoramento técnico", "Leitura por prioridade", "Uso focado em lojas"],
    link: "mailto:oi@henriquereis.dev?subject=Interesse%20no%20Painel%20SEO%20para%20Lojas",
    ctaLabel: "Quero saber mais",
  },
];
