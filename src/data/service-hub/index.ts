export type ServiceFormatId = "professional-site" | "portfolio" | "landing-page" | "custom-site";

export type ServiceFeatureStatus = "included" | "available" | "additional";
export type ServiceFeatureGroup = "contact" | "presentation" | "local-business" | "content";
export type ServiceFeaturePreviewKind = "whatsapp" | "form" | "portfolio" | "services" | "map" | "scheduling";

export type ServiceFormat = {
  id: ServiceFormatId;
  title: string;
  description: string;
  audiences: string;
  detail: string;
  preview: { src: string; alt: string; position?: "center" | "top" };
};

export type ServiceFeature = {
  id: string;
  title: string;
  group: ServiceFeatureGroup;
  status: ServiceFeatureStatus;
  description: string;
  useCase: string;
  previewKind?: ServiceFeaturePreviewKind;
};

export const serviceFormats: ServiceFormat[] = [
  {
    id: "professional-site",
    title: "Site profissional",
    description: "Apresenta quem você é, o que faz e como entrar em contato.",
    audiences: "Psicólogos, nutricionistas, arquitetos, corretores e MEIs.",
    detail: "Boa escolha para reunir apresentação, serviços, contato e informações práticas em poucas páginas.",
    preview: { src: "/images/services/examples/psicologia-elisa-veral.webp", alt: "Site profissional demonstrativo para Psicologia.", position: "top" },
  },
  {
    id: "portfolio",
    title: "Portfólio",
    description: "Organiza trabalhos, projetos ou imagens em um endereço próprio.",
    audiences: "Designers, fotógrafos, arquitetos, artistas e outros criativos.",
    detail: "Prioriza a visualização dos trabalhos e deixa contexto, perfil e contato em segundo plano.",
    preview: { src: "/images/services/examples/estudio-unhas-tinta.webp", alt: "Galeria demonstrativa do estúdio de unhas Tinta.", position: "top" },
  },
  {
    id: "landing-page",
    title: "Landing page",
    description: "Explica uma oferta e conduz a pessoa para uma ação principal.",
    audiences: "Profissionais liberais, prestadores de serviço e campanhas pontuais.",
    detail: "Funciona bem quando o objetivo é apresentar um serviço específico e facilitar contato ou agendamento.",
    preview: { src: "/images/work/corretores-interface.webp", alt: "Exemplo de interface de uma landing page com chamada para contato.", position: "top" },
  },
  {
    id: "custom-site",
    title: "Projeto personalizado",
    description: "Parte de uma necessidade que não cabe nos formatos mais simples.",
    audiences: "Pequenas empresas, catálogos e projetos com fluxos próprios.",
    detail: "Novas páginas, integrações, sistemas e catálogos complexos são definidos como projeto personalizado.",
    preview: { src: "/images/work/artistas-interface.webp", alt: "Exemplo de interface personalizada para uma galeria de trabalhos.", position: "top" },
  },
];

export const serviceFeatures: ServiceFeature[] = [
  { id: "whatsapp", title: "WhatsApp", group: "contact", status: "available", description: "Abra uma conversa com uma mensagem inicial ligada ao atendimento.", useCase: "Profissionais, negócios locais e serviços.", previewKind: "whatsapp" },
  { id: "form", title: "Formulário de contato", group: "contact", status: "available", description: "Peça as informações necessárias antes da primeira resposta.", useCase: "Pedidos, dúvidas e triagem inicial.", previewKind: "form" },
  { id: "scheduling", title: "Agendamento", group: "contact", status: "additional", description: "Mostre um fluxo de escolha antes de conectar a agenda definitiva.", useCase: "Consultórios, salões e serviços com horário marcado.", previewKind: "scheduling" },
  { id: "portfolio-gallery", title: "Portfólio / galeria", group: "presentation", status: "available", description: "Organize projetos e imagens para navegação visual.", useCase: "Arquitetura, fotografia, design e trabalhos visuais.", previewKind: "portfolio" },
  { id: "services-prices", title: "Serviços / preços", group: "presentation", status: "available", description: "Apresente opções, duração e valores quando eles puderem ser públicos.", useCase: "Negócios com uma lista objetiva de serviços.", previewKind: "services" },
  { id: "location-map", title: "Localização / mapa", group: "local-business", status: "available", description: "Mostre endereço, região atendida e uma ação de rota.", useCase: "Lojas, consultórios e atendimento presencial.", previewKind: "map" },
  { id: "hours", title: "Horários", group: "local-business", status: "available", description: "Informe dias e faixas de atendimento em uma área fácil de encontrar.", useCase: "Negócios locais e serviços com agenda definida." },
  { id: "social", title: "Redes sociais", group: "contact", status: "available", description: "Reúna links para os canais que você realmente mantém.", useCase: "Marcas que publicam ou atendem em outros canais." },
  { id: "faq", title: "FAQ", group: "presentation", status: "available", description: "Responda dúvidas recorrentes sem alongar a página principal.", useCase: "Serviços que exigem orientação antes do contato." },
  { id: "seo", title: "SEO básico", group: "content", status: "included", description: "Estruture títulos, descrições e conteúdo para compreensão pelos buscadores.", useCase: "Preparação técnica das páginas publicadas." },
  { id: "blog", title: "Blog / conteúdo", group: "content", status: "additional", description: "Crie uma área para publicar conteúdos recorrentes.", useCase: "Projetos com plano e material para publicação contínua." },
  { id: "catalog", title: "Catálogo", group: "content", status: "additional", description: "Organize itens por categorias e páginas de detalhe.", useCase: "Coleções maiores que não precisam ser uma loja virtual." },
];

export const serviceInclusions = [
  {
    id: "creation-design",
    title: "Criação e design",
    description: "Estrutura, conteúdo e interface organizados para o seu negócio.",
  },
  {
    id: "domain-hosting",
    title: "Domínio e hospedagem",
    description: "Configuração e infraestrutura necessárias para manter o site publicado.",
  },
  {
    id: "responsive-version",
    title: "Versão mobile",
    description: "Experiência adaptada para celular, tablet e computador.",
  },
  {
    id: "technical-seo",
    title: "SEO técnico",
    description: "Estrutura preparada para indexação e melhor leitura pelos buscadores.",
  },
  {
    id: "maintenance",
    title: "Manutenção",
    description: "Correções, atualizações e pequenos ajustes contínuos.",
  },
  {
    id: "integrated-contact",
    title: "Contato integrado",
    description: "WhatsApp, formulário ou outra forma de contato adequada ao projeto.",
  },
] as const;

export const serviceProcess = [
  {
    id: "briefing",
    title: "Briefing",
    description: "Entendo seu negócio, objetivo, público e o que o site precisa resolver.",
  },
  {
    id: "structure",
    title: "Estrutura",
    description: "Organizo páginas, conteúdo, navegação e prioridades.",
  },
  {
    id: "creation",
    title: "Criação",
    description: "Desenvolvo a interface, adapto para mobile e preparo a parte técnica.",
  },
  {
    id: "publication",
    title: "Publicação",
    description: "Publico o site e continuo cuidando da manutenção.",
  },
] as const;

export const essentialPlanIncludes = [
  "Criação completa do site",
  "Design personalizado",
  "Responsividade desktop e mobile",
  "Domínio e hospedagem",
  "SEO técnico inicial",
  "WhatsApp ou formulário",
  "Manutenção técnica",
  "1 pequena alteração de conteúdo por mês",
] as const;

export type ServiceHubPlan = {
  id: "essential" | "growth" | "performance";
  name: string;
  price: string;
  badge?: string;
  description: string;
  inherits?: string;
  includes: readonly string[];
  cta: string;
};

export const servicePlans: readonly ServiceHubPlan[] = [
  {
    id: "essential",
    name: "Essencial",
    price: "R$300/mês",
    description: "Para manter uma presença institucional com uma pequena alteração de conteúdo por mês.",
    includes: essentialPlanIncludes,
    cta: "Escolher Essencial",
  },
  {
    id: "growth",
    name: "Crescimento",
    price: "R$500/mês",
    badge: "Mais escolhido",
    description: "Para medir tráfego e conversões antes de priorizar melhorias no site.",
    inherits: "Inclui tudo do Essencial, mais:",
    includes: [
      "Google Analytics",
      "Google Tag Manager",
      "Acompanhamento de conversões",
      "Relatório mensal de acessos e comportamento",
      "Análise das principais fontes de tráfego",
      "Até 3 pequenas alterações por mês",
      "Melhorias contínuas orientadas pelos dados",
    ],
    cta: "Escolher Crescimento",
  },
  {
    id: "performance",
    name: "Performance",
    price: "R$800/mês",
    description: "Para operações com campanhas, novas páginas e evolução mais frequente do site.",
    inherits: "Inclui tudo do Crescimento, mais:",
    includes: [
      "Landing pages adicionais conforme necessidade",
      "Melhorias de UX e conversão",
      "Evolução de seções e funcionalidades",
      "Até 5 alterações por mês",
      "Suporte prioritário",
      "Preparação técnica para campanhas",
      "Acompanhamento mais próximo da performance",
    ],
    cta: "Conversar sobre Performance",
  },
] as const;

export const serviceFaq = [
  {
    id: "domain",
    question: "O domínio está incluso?",
    answer: "Sim. O domínio faz parte da mensalidade; os detalhes ficam registrados na proposta antes da contratação.",
  },
  {
    id: "hosting",
    question: "A hospedagem está inclusa?",
    answer: "Sim. A hospedagem e a manutenção técnica fazem parte da mensalidade.",
  },
  {
    id: "changes",
    question: "Posso pedir alterações?",
    answer: "Sim. O Essencial inclui 1 pequena alteração por mês, o Crescimento até 3 e o Performance até 5.",
  },
  {
    id: "timeline",
    question: "Quanto tempo leva para o site ficar pronto?",
    answer: "O prazo depende do escopo e do envio de textos, imagens e informações. A data fica combinada na proposta.",
  },
  {
    id: "after-publication",
    question: "O que acontece depois que o site é publicado?",
    answer: "O site segue hospedado e recebe manutenção técnica. Os planos Crescimento e Performance também acompanham a evolução definida em cada plano.",
  },
  {
    id: "commitment",
    question: "Existe permanência mínima?",
    answer: "As condições de fidelidade e cancelamento ficam definidas na proposta antes da contratação.",
  },
] as const;

function assertUnique(items: readonly { id: string }[], label: string) {
  const ids = items.map((item) => item.id);
  if (new Set(ids).size !== ids.length) throw new Error(`${label} possui identificadores duplicados.`);
}

export function getServiceHubContent() {
  assertUnique(serviceFormats, "A lista de formatos");
  assertUnique(serviceFeatures, "A lista de recursos");
  assertUnique(serviceInclusions, "A lista de inclusões");
  assertUnique(serviceProcess, "A lista de etapas");
  assertUnique(servicePlans, "A lista de planos");
  assertUnique(serviceFaq, "A lista de dúvidas");
  return {
    formats: serviceFormats,
    features: serviceFeatures,
    inclusions: serviceInclusions,
    process: serviceProcess,
    plans: servicePlans,
    faq: serviceFaq,
  };
}
