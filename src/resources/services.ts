import { ProductsPage, ProductItem, ServicesPage, ServiceLanding } from "@/types";

export const servicesPage: ServicesPage = {
  path: "/servicos",
  label: "Serviços",
  title: "Serviços em web, SEO e automação",
  description:
    "Serviços, pacotes e ferramentas para quem quer melhorar a presença digital com mais clareza e menos improviso.",
  intro: {
    headline: "Escolha um ponto de entrada sem transformar a decisão em mais uma dúvida.",
    lead: "Se o problema pede projeto sob medida, pacote, ajuste pontual ou ferramenta própria, aqui fica mais claro por onde começar e o que esperar de cada formato.",
  },
};

export const services: ServiceLanding[] = [
  {
    slug: "websites-profissionais",
    title: "Websites profissionais e landing pages",
    badge: "Web + Conversão",
    summary:
      "Sites e landing pages para apresentar seu trabalho com mais clareza e facilitar o próximo passo de quem chega.",
    hero: {
      highlight: "Next.js, SEO técnico e interface responsiva",
      description:
        "Para negócios e profissionais que querem sair do improviso e ter uma presença digital mais clara, rápida e confiável.",
      price: "A partir de R$ 1.500",
      duration: "2 a 8 semanas",
      ctaLabel: "Solicitar proposta",
      ctaHref: "mailto:oi@henriquereis.dev?subject=Websites%20Profissionais",
    },
    audience:
      "Profissionais, negócios locais, marcas autorais e operações digitais que precisam ser melhor entendidos, lembrados e procurados.",
    tags: ["Next.js", "SCSS", "SEO", "Responsivo"],
    keyPoints: [
      "Uma presença que explica melhor o que você faz.",
      "Estrutura pronta para SEO, campanhas e crescimento com mais calma.",
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
      "Converso com você para entender o objetivo, o público e o que hoje está travando.",
      "Desenho e implemento as telas principais com foco em leitura e contato.",
      "Faço os ajustes finais, publico e deixo a base pronta para evoluir.",
    ],
    faq: [
      {
        question: "Posso começar com uma landing page e expandir depois?",
        answer:
          "Sim. A estrutura pode nascer menor e crescer para um site completo conforme a operação evolui.",
      },
      {
        question: "Já sai pronto para SEO?",
        answer:
          "Sim. Estrutura, meta tags, performance e base técnica já entram no escopo inicial.",
      },
      {
        question: "Você segue com manutenção depois da entrega?",
        answer: "Sim. Posso continuar com melhorias, SEO, conteúdo e novas páginas.",
      },
    ],
    estimator: true,
  },
  {
    slug: "landing-page-para-estetica",
    title: "Landing page para estética e harmonização facial",
    badge: "Estética + Agenda",
    layout: "beauty",
    summary:
      "Landing page para clínica de estética, esteticista ou harmonização facial com foco em agenda cheia, recorrência e faturamento.",
    seo: {
      title: "Landing page para clínica de estética e harmonização facial | Mais agendamentos",
      description:
        "Crio landing page para clínica de estética, esteticista e harmonização facial com foco em agendamento, mais clientes recorrentes e aumento de faturamento.",
      keywords: [
        "landing page para estética",
        "site para clínica de estética",
        "landing page para esteticista",
        "site para harmonização facial",
        "agendamento clínica de estética",
        "clientes para clínica de estética",
        "mais clientes esteticista",
        "harmonização facial agendamento",
        "agenda cheia estética",
        "faturamento clínica de estética",
      ],
    },
    hero: {
      highlight: "Agenda cheia, recorrência e retorno financeiro",
      description:
        "Uma página pensada para transformar visita em agendamento, reduzir a dependência do Instagram e gerar mais faturamento com procedimentos e acompanhamento.",
      price: "A partir de R$ 1.500",
      duration: "2 a 4 semanas",
      ctaLabel: "Quero mais agendamentos",
      ctaHref:
        "https://wa.me/5575983675164?text=Quero%20uma%20landing%20page%20para%20clinica%20de%20estetica",
    },
    audience:
      "Clínicas de estética, esteticistas, biomédicas e profissionais de harmonização facial que já têm presença no Instagram, mas precisam converter melhor em agendamento.",
    tags: ["Estética", "Clínica", "Agendamento", "Harmonização facial"],
    keyPoints: [
      "Mais agendamentos saindo do Instagram e do tráfego pago.",
      "Mais clientes recorrentes com jornada mais clara entre interesse, contato e retorno.",
      "Mais faturamento com uma presença digital mais profissional e mais orientada a resultado.",
    ],
    scopes: [
      {
        title: "Landing page para agenda cheia",
        summary:
          "Página única para clínica ou profissional que precisa converter melhor em agendamento.",
        investment: "A partir de R$ 1.500",
        timeline: "2 a 3 semanas",
        includes: ["Copy voltada a agendamento", "WhatsApp ou formulário", "SEO técnico essencial"],
      },
      {
        title: "Site enxuto para clínica de estética",
        summary: "Estrutura com páginas principais, procedimentos, prova e contato.",
        investment: "A partir de R$ 2.800",
        timeline: "3 a 5 semanas",
        includes: [
          "Arquitetura de páginas",
          "Layout responsivo",
          "Base para campanhas e recorrência",
        ],
      },
      {
        title: "Sprint de conversão para página atual",
        summary:
          "Refino de uma página existente para melhorar agendamento, clareza e retorno financeiro.",
        investment: "A partir de R$ 900",
        timeline: "1 a 2 semanas",
        includes: ["Revisão estrutural", "Ajuste de CTA e layout", "Melhoria de conversão"],
      },
    ],
    includes: [
      "Estrutura pensada para transformar interesse em agendamento com menos atrito.",
      "Mensagem mais clara sobre procedimento, diferenciais e confiança na clínica.",
      "Layout responsivo com foco em clique, WhatsApp e leitura rápida no mobile.",
      "Base técnica para campanhas, buscas locais e crescimento mais previsível.",
    ],
    process: [
      "Entendo quais procedimentos trazem mais faturamento e onde a agenda está vazando.",
      "Estruturo a página para converter melhor quem já chega do Instagram, anúncio ou indicação.",
      "Entrego a landing publicada com rota clara para agendamento e próximos ajustes.",
    ],
    faq: [
      {
        question: "Funciona mesmo para quem já usa Instagram todos os dias?",
        answer:
          "Sim. A ideia não é substituir o Instagram, e sim dar a ele uma página que converta melhor em agendamento.",
      },
      {
        question: "Ajuda a aumentar o faturamento da clínica?",
        answer:
          "Ajuda porque melhora a conversão do interesse em contato e reforça procedimentos, recorrência e profissionalismo da presença digital.",
      },
      {
        question: "Serve para harmonização facial e procedimentos estéticos específicos?",
        answer:
          "Sim. A estrutura pode destacar procedimentos, diferenciais, dúvidas frequentes e o caminho direto para o agendamento.",
      },
      {
        question: "Preciso ter tudo pronto antes?",
        answer:
          "Não. Eu ajudo a organizar a oferta, os blocos principais e a mensagem para o cliente entender rápido e agir.",
      },
    ],
  },
  {
    slug: "landing-page-para-social-media-designers-e-freelancers",
    title: "Landing page para social media, designers e freelancers digitais",
    badge: "Freelancers + Clientes",
    layout: "creative",
    summary:
      "Landing page para social media, designers e freelancers digitais que querem depender menos de indicação e ser lembrados com mais clareza.",
    seo: {
      title: "Landing page para social media, designers e freelancers digitais | Mais clientes",
      description:
        "Crio landing page para social media, designers e freelancers digitais com foco em posicionamento, geração consistente de clientes e autoridade no marketing digital.",
      keywords: [
        "landing page para freelancer",
        "site para freelancer digital",
        "landing page para social media",
        "site para designer freelancer",
        "clientes para freelancer",
        "gerar clientes no marketing digital",
        "posicionamento para freelancer",
        "autoridade digital para freelancer",
        "marketing digital para freelancers",
        "landing page para captar clientes",
      ],
    },
    hero: {
      highlight: "Posicionamento claro, autoridade e geração consistente de clientes",
      description:
        "Uma página pensada para tirar o freelancer da dependência de indicação, organizar sua oferta e transformar visita em conversa comercial com mais frequência.",
      price: "A partir de R$ 1.500",
      duration: "2 a 4 semanas",
      ctaLabel: "Quero mais clientes",
      ctaHref:
        "https://wa.me/5575983675164?text=Quero%20uma%20landing%20page%20para%20social%20media%20designer%20ou%20freelancer%20digital",
    },
    audience:
      "Social medias, designers, gestores de tráfego, videomakers, freelancers digitais e pequenos estúdios que querem captar clientes com mais previsibilidade e autoridade.",
    tags: ["Freelancer", "Clientes", "Marketing digital", "Posicionamento"],
    keyPoints: [
      "Mais consistência na geração de clientes sem depender só de indicação ou plataforma.",
      "Posicionamento mais profissional para explicar o que você faz, para quem e por que contratar.",
      "Autoridade digital mais clara para transformar visita em conversa comercial com menos atrito.",
    ],
    scopes: [
      {
        title: "Landing page de captação",
        summary:
          "Página única para apresentar serviço, diferenciais, prova e rota direta para contato.",
        investment: "A partir de R$ 1.500",
        timeline: "2 a 3 semanas",
        includes: ["Copy focada em conversão", "WhatsApp ou formulário", "SEO técnico essencial"],
      },
      {
        title: "Site profissional enxuto",
        summary:
          "Estrutura com páginas principais para consolidar posicionamento e autoridade digital.",
        investment: "A partir de R$ 2.800",
        timeline: "3 a 5 semanas",
        includes: ["Arquitetura de páginas", "Layout responsivo", "Base para conteúdo e prova"],
      },
      {
        title: "Sprint de reposicionamento",
        summary:
          "Refino em uma página atual para melhorar clareza da oferta, CTA e percepção profissional.",
        investment: "A partir de R$ 900",
        timeline: "1 a 2 semanas",
        includes: ["Revisão estrutural", "Ajuste de mensagem", "Melhoria de conversão"],
      },
    ],
    includes: [
      "Estrutura pensada para mostrar serviço, nicho, diferenciais e caminho de contato com clareza.",
      "Layout responsivo para apresentar portfólio, processo e prova sem poluir a leitura.",
      "Base técnica para SEO, campanhas, tráfego e crescimento mais previsível no digital.",
      "Organização visual que ajuda o cliente a entender rápido o que você resolve e por que contratar.",
    ],
    process: [
      "Entendo seu serviço, o tipo de cliente ideal e onde hoje a captação está travando.",
      "Estruturo a página para deixar sua oferta mais clara, mais profissional e mais orientada a fechamento.",
      "Entrego a landing publicada com rota direta para contato e base pronta para evoluir depois.",
    ],
    faq: [
      {
        question: "Serve para quem ainda depende muito de indicação?",
        answer:
          "Sim. A landing ajuda justamente a criar uma base própria de posicionamento e captação, reduzindo a dependência de terceiros.",
      },
      {
        question: "Funciona para social media, designer e outros freelancers digitais?",
        answer:
          "Sim. A estrutura se adapta ao tipo de serviço, ao público e ao nível de prova que você já tem hoje.",
      },
      {
        question: "Preciso ter muitos cases para a página funcionar?",
        answer:
          "Não. Dá para construir autoridade com clareza de oferta, bons recortes de projeto, processo e sinais de profissionalismo.",
      },
      {
        question: "Isso ajuda a conseguir clientes com mais consistência?",
        answer:
          "Ajuda porque melhora sua apresentação, sua proposta de valor e o caminho até o contato, que normalmente são os pontos que mais travam freelancers.",
      },
    ],
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
        answer:
          "Não. A landing pode começar sozinha. O blog entra depois, se fizer sentido para SEO e autoridade.",
      },
      {
        question: "Você ajuda a organizar os textos da página?",
        answer:
          "Sim. Eu transformo sua abordagem e sua especialidade em uma estrutura mais clara e confiável.",
      },
      {
        question: "Funciona para quem ainda está começando no digital?",
        answer:
          "Sim. Inclusive ajuda a evitar improviso e a construir uma base mais profissional desde o início.",
      },
    ],
  },
  {
    slug: "seo-tecnico",
    title: "SEO técnico, auditoria e otimização",
    badge: "SEO + Performance",
    summary:
      "Auditoria e correções para sites, lojas virtuais e blogs que perderam fôlego, visibilidade ou clareza técnica.",
    hero: {
      highlight: "E-commerce, blogs e páginas de alta intenção",
      description:
        "Para operações que já têm site no ar, mas sentem que a base técnica está segurando o crescimento.",
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
      "Prioridades organizadas por impacto real, não por achismo.",
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
      "Entendo o ambiente atual, o histórico e onde o site começou a perder força.",
      "Faço a auditoria com foco no que realmente destrava crescimento.",
      "Entrego recomendações, correções ou uma sprint dedicada para colocar a casa em ordem.",
    ],
    faq: [
      {
        question: "Serve para blog e loja virtual?",
        answer:
          "Sim. Esse é um dos focos principais do serviço, especialmente em SEO técnico para conteúdo e e-commerce.",
      },
      {
        question: "Você também executa as correções?",
        answer: "Sim. Posso entregar só a auditoria ou seguir para uma sprint de implementação.",
      },
      {
        question: "Preciso trocar de plataforma?",
        answer:
          "Nem sempre. Primeiro eu avalio o que dá para corrigir na estrutura atual antes de sugerir migração.",
      },
    ],
  },
  {
    slug: "integracoes-automacoes",
    title: "Integrações, automação e operação digital",
    badge: "Automação + Operação",
    summary:
      "Fluxos, integrações e automações para reduzir retrabalho e deixar a rotina digital mais previsível.",
    hero: {
      highlight: "APIs, formulários, WhatsApp e dashboards",
      description:
        "Ideal para quem precisa conectar canais, automatizar etapas do atendimento ou parar de resolver tudo no braço.",
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
      "Mapeio o fluxo atual e descubro onde o tempo está sendo desperdiçado.",
      "Implemento o caminho prioritário com validação do time.",
      "Entrego com ajustes finos e orientação para o uso no dia a dia.",
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
        answer:
          "Sim. Posso estruturar a coleta e deixar dashboards ou tabelas mais fáceis de acompanhar.",
      },
    ],
  },
];

export const productsPage: ProductsPage = {
  path: "/servicos/produtos",
  label: "Pacotes e Ferramentas",
  title: "Pacotes, micro-serviços e SaaS",
  description: "Ofertas menores para resolver um problema específico sem abrir um projeto inteiro.",
  cta: "Escolha um formato, entenda onde ele se encaixa e siga para contato, checkout ou lista de espera.",
  note: "Aqui entram pacotes prontos, micro-serviços e ferramentas criadas por mim para resolver dores mais objetivas.",
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
    summary: "Pacote focado em estrutura técnica, páginas-chave e gargalos comuns de e-commerce.",
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
    summary: "Base para blog com SEO, performance e rotina de publicação mais organizada.",
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
    summary: "Correção técnica focada em velocidade percebida, estabilidade visual e carregamento.",
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
    summary: "Aplicação rápida de meta tags, schema, headings, sitemap e ajustes técnicos básicos.",
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
    link: "/ferramentas/simulador-de-escopo-web",
    ctaLabel: "Abrir simulador",
  },
  {
    slug: "radar-editorial-seo",
    title: "Radar editorial SEO",
    summary: "Ferramenta em beta para organizar pautas, oportunidades e prioridade de conteúdo.",
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
