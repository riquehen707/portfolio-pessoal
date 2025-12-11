import { ProductsPage, ProductItem, ServicesPage, ServiceLanding } from "@/types";

export const servicesPage: ServicesPage = {
  path: "/servicos",
  label: "Serviços",
  title: "Soluções Profissionais em Web, SEO e Automação",
  description:
    "Serviços modernos, escaláveis e otimizados para gerar visibilidade, velocidade e credibilidade.",
  intro: {
    headline: "Serviços pensados para visibilidade, velocidade e conversão.",
    lead:
      "Sites, auditorias e automações guiadas por práticas robustas de produto e dados. Cada serviço já nasce com a estrutura dos oito pilares estratégicos.",
  },
};

export const services: ServiceLanding[] = [
  {
    slug: "websites-profissionais",
    title: "Websites Profissionais e Landing Pages",
    badge: "Web + Conversão",
    summary:
      "Sites rápidos, modernos e otimizados para conversão, construídos com práticas avançadas de SEO e performance.",
    positioning:
      "Sites e landing pages que traduzem cada um dos oito pilares em visibilidade, velocidade e credibilidade.",
    solution:
      "Transforma presença online fraca ou inexistente em um site rápido, organizado e profissional que gera resultado real.",
    pillars: [
      { title: "Visibilidade", detail: "Sites otimizados para Google desde a estrutura." },
      { title: "Praticidade", detail: "Entregas rápidas, sem burocracia." },
      { title: "Economia de Tempo", detail: "Sistemas prontos, atualizáveis e fáceis de manter." },
      { title: "Velocidade", detail: "Arquitetura moderna (Next.js + Core Web Vitals)." },
      { title: "Autoridade", detail: "Design profissional que representa a marca." },
      { title: "Profissionalismo", detail: "Estrutura estável e escalável." },
      { title: "Conversão", detail: "Páginas pensadas para gerar mais contatos e vendas." },
      { title: "Credibilidade", detail: "Aparência consistente e experiência fluida." },
    ],
    hero: {
      highlight: "Entrega completa · Estruturas responsivas e conversão em mente",
      description:
        "Sites e landing pages construídos com Next.js, Once UI e boas práticas de SEO técnico para gerar conversões e autoridade.",
      price: "Faixa de investimento: R$ 350 a R$ 4.800",
      budget: "Implementação padrão do projeto inicial",
      duration: "3 a 6 semanas",
      ctaLabel: "Solicitar proposta",
      ctaHref: "mailto:oi@henriquereis.dev?subject=Websites%20Profissionais",
    },
    idealFor:
      "Profissionais, pequenos negócios, restaurantes, lojas e marcas que precisam de presença digital forte.",
    investmentRange: "R$ 350 a R$ 4.800",
    deliverables: [
      "Arquitetura híbrida focada em SEO e performance.",
      "Design responsivo com once-ui e componentes reutilizáveis.",
      "Plano de lançamento com tracking, formulários e integrações básicas.",
    ],
    differentiators: [
      "Processo transparente com checklists e entregas semanais.",
      "Experiência prática com Next.js, dados e integrações com WhatsApp.",
      "Templates prontos para acelerar futuros lançamentos.",
    ],
    process: [
      "Imersão e definição dos objetivos de conversão.",
      "Design e prototipação colaborativa.",
      "Implementação, testes e otimização de Core Web Vitals.",
      "Implantação e passagem de bastão com documentação.",
    ],
    outcomes: [
      "Site novo com métricas de performance claras.",
      "Landing pages prontas para campanhas e tráfego pago.",
      "Documentação operacional para manutenção futura.",
    ],
    highlights: [
      { label: "Checklist SEO", value: "URLs, meta tags, OG e sitemaps" },
      { label: "Conversão", value: "Formulários e automações Otimizadas" },
    ],
  },
  {
    slug: "seo-tecnico",
    title: "SEO Técnico, Auditoria e Otimização",
    badge: "SEO & Performance",
    summary:
      "Análise completa e otimização profunda para acelerar indexação, velocidade e resultados orgânicos.",
    positioning:
      "Auditorias técnicas que aplicam os oito pilares para tornar o site visível, rápido e confiável.",
    solution:
      "Resolve sites lentos, mal indexados, estruturados incorretamente ou invisíveis no Google.",
    pillars: [
      { title: "Visibilidade", detail: "Melhora ranking, indexação e tráfego orgânico." },
      { title: "Praticidade", detail: "Cliente não precisa entender SEO; entrego pronto." },
      { title: "Economia de Tempo", detail: "Elimina erros técnicos que travam o crescimento." },
      { title: "Velocidade", detail: "Melhora carregamento, Core Web Vitals e experiência." },
      { title: "Autoridade", detail: "Estrutura forte que impulsiona a marca no Google." },
      { title: "Profissionalismo", detail: "Correções completas, relatório e transparência." },
      { title: "Conversão", detail: "Páginas mais rápidas convertem melhor." },
      { title: "Credibilidade", detail: "Site tecnicamente correto transmite confiança." },
    ],
    hero: {
      highlight: "Auditoria técnica · Correções profundas · Relatórios claros",
      description:
        "SEO técnico, auditorias, sprints de performance e otimizações para Core Web Vitals em sites existentes.",
      price: "Faixa de investimento: R$ 350 a R$ 8.000",
      budget: "Análises táticas + planos de ação recomendados",
      duration: "2 a 4 semanas",
      ctaLabel: "Marcar auditoria",
      ctaHref: "mailto:oi@henriquereis.dev?subject=SEO%20T%C3%A9cnico",
    },
    idealFor: "Sites lentos, mal posicionados ou com erros técnicos que travam o crescimento.",
    investmentRange: "R$ 350 a R$ 8.000",
    deliverables: [
      "Auditoria completa de crawl, estrutura e performance.",
      "Plano de correção com prioridades e estimativas de impacto.",
      "Relatório com evolução e observações para squads.",
    ],
    differentiators: [
      "Scripts e checklists prontos para entregar aos times internos.",
      "Monitoramento contínuo de Core Web Vitals e SEO técnico.",
      "Comunicação direta com times de produto e dados.",
    ],
    process: [
      "Escopo e coleta de históricos + acessos a ferramentas.",
      "Análise técnica e identificação de blockers.",
      "Documentação das mudanças e alinhamento de prioridades.",
      "Entrega do plano e acompanhamento do rollout.",
    ],
    outcomes: [
      "Melhoria do desempenho técnico e Core Web Vitals.",
      "Maior visibilidade orgânica e rankings estáveis.",
      "Base sólida para próximas ações de conteúdo ou tráfego.",
    ],
    highlights: [
      { label: "Relatórios", value: "Documentos prontos para stakeholders" },
      { label: "Velocidade", value: "Optimização de LCP, FID e CLS" },
    ],
  },
  {
    slug: "integracoes-automacoes",
    title: "Integrações, Automação e Soluções Empresariais",
    badge: "Integrações & Automação",
    summary:
      "Integrações, automações e fluxos que eliminam tarefas manuais e tornam operações escaláveis.",
    positioning:
      "Soluções empresariais que aplicam os oito pilares para trazer velocidade, credibilidade e economia.",
    solution:
      "Resolve falta de organização, processos manuais, ausência de integração e retrabalho.",
    pillars: [
      { title: "Visibilidade", detail: "Relatórios e dados claros ajudam estratégia." },
      { title: "Praticidade", detail: "Automações reduzem tarefas manuais." },
      { title: "Economia de Tempo", detail: "Elimina rotinas repetitivas e processos lentos." },
      { title: "Velocidade", detail: "Fluxos otimizados aumentam produtividade." },
      { title: "Autoridade", detail: "Empresa adota ferramentas modernas." },
      { title: "Profissionalismo", detail: "Processos padronizados e integrados." },
      { title: "Conversão", detail: "Automações melhoram follow-up e atendimento." },
      { title: "Credibilidade", detail: "Operações mais consistentes e sem falhas." },
    ],
    hero: {
      highlight: "Automação inteligente · Integrações end-to-end",
      description:
        "Integração entre ferramentas, planilhas e fluxos de atendimento para entregar operações previsíveis.",
      price: "Faixa de investimento: R$ 300 a R$ 10.000",
      budget: "Configuração + playbooks + monitoramento inicial",
      duration: "3 a 8 semanas",
      ctaLabel: "Mapear automação",
      ctaHref: "mailto:oi@henriquereis.dev?subject=Automação%20e%20Integrações",
    },
    idealFor:
      "Empresas, profissionais e empreendedores que querem economizar tempo e aumentar produtividade.",
    investmentRange: "R$ 300 a R$ 10.000",
    deliverables: [
      "Mapeamento de fluxos, integrações e pontos de atrito.",
      "Automação entre ferramentas, APIs e WhatsApp.",
      "Playbooks de operação com alertas e scripts de atendimento.",
    ],
    differentiators: [
      "Dashboards Python + planilhas com dados acionáveis.",
      "Templates prontos usados em projetos internos.",
      "Suporte inicial para adoção e treinamento rápido.",
    ],
    process: [
      "Diagnóstico de processos e coleta de dados.",
      "Construção das integrações prioritárias.",
      "Testes, validação e documentação.",
      "Entrega do material + alinhamento do time.",
    ],
    outcomes: [
      "Mais produtividade e menos retrabalho.",
      "Operações consistentes prontas para escalar.",
      "Base tecnológica para novas jornadas e produtos.",
    ],
    highlights: [
      { label: "Fluxos", value: "Automação de lead to cash" },
      { label: "Medidas", value: "Alertas e dashboards prontos" },
    ],
  },
];

export const productsPage: ProductsPage = {
  path: "/servicos/produtos",
  label: "Kits Profissionais",
  title: "Soluções Prontas e Kits Profissionais",
  description:
    "Templates, checklists e materiais técnicos criados para quem quer implementar rápido e manter qualidade.",
  cta: "Prontos para download imediato com instruções claras.",
  note: "Indicado para quem precisa acelerar implementações sem contratar um serviço completo.",
};

export const products: ProductItem[] = [
  {
    slug: "kit-web-starter",
    title: "Kit Web Starter",
    summary: "Template completo de landing page com copy, SEO e fluxo de formulário.",
    format: "HTML + Next.js + guia de implementação",
    price: "R$ 179",
    priceLabel: "Entrega imediata",
    deliverables: [
      "Layout responsivo com cores e tipografia configuráveis.",
      "Checklist de SEO técnico para otimizar indexação.",
      "Guia rápido para publicar em Vercel/Netlify.",
    ],
    link: "https://henrique.dog/checkout/kit-web-starter",
  },
  {
    slug: "kit-automacao-operacoes",
    title: "Kit Automação de Operações",
    summary: "Playbook de integrações, automações e dashboards com claras instruções.",
    format: "PDF + Notion + planilhas",
    price: "R$ 390",
    priceLabel: "Atualizações em 2026",
    deliverables: [
      "Playbook em Notion com fluxos e triggers.",
      "Planilha automatizada com Dashboards e alertas.",
      "Script de onboarding para novos colaboradores.",
    ],
    link: "https://henrique.dog/checkout/kit-automacao",
  },

  {
    slug: "kit-seo-rapido",
    title: "Kit SEO Rápido",
    summary: "Guia técnico e checklist para corrigir erros comuns e acelerar ranking.",
    format: "PDF interativo",
    price: "R$ 149",
    priceLabel: "Atualizável e portátil",
    deliverables: [
      "Checklist de auditoria em 60 minutos.",
      "Tabela de priorização com impacto e esforço.",
      "Copy e meta tags recomendadas para 5 páginas.",
    ],
    link: "https://henrique.dog/checkout/kit-seo",
  },
];
