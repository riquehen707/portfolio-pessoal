import { type DemoSegmentSlug } from "./demo-segments";

export type DemoStatus = "rascunho" | "experimental" | "publicado";
export type DemoMaturity = "conceito" | "protótipo" | "pronto";
export type DemoVisualStyle =
  | "calmo"
  | "sobrio"
  | "conversao"
  | "visual"
  | "editorial"
  | "local"
  | "premium";

export type DemoItem = {
  slug: string;
  segment: DemoSegmentSlug;
  name: string;
  description: string;
  visualStyle: DemoVisualStyle;
  status: DemoStatus;
  goal: string;
  audience: string;
  tags: string[];
  preview: string;
  thumbnail: string;
  route: string;
  indexable: boolean;
  components: string[];
  assets: string[];
  maturity: DemoMaturity;
  featured?: boolean;
};

export const demoRegistry: DemoItem[] = [
  {
    slug: "agenda-clara",
    segment: "clinicas",
    name: "Clínica Agenda Clara",
    description:
      "Uma página limpa para explicar especialidades, reduzir dúvida e levar o visitante ao agendamento.",
    visualStyle: "calmo",
    status: "experimental",
    goal: "Facilitar agendamento qualificado para uma clínica local.",
    audience: "Clínicas pequenas que precisam explicar atendimento antes do WhatsApp.",
    tags: ["saúde", "agenda", "confiança"],
    preview: "clinic-agenda-preview",
    thumbnail: "clinic-agenda-thumb",
    route: "/modelos/clinicas/agenda-clara",
    indexable: false,
    components: ["DemoHealthHeader", "DemoTrustStrip", "DemoAppointmentSection"],
    assets: ["css-preview"],
    maturity: "protótipo",
    featured: true,
  },
  {
    slug: "autoridade-sobria",
    segment: "advocacia",
    name: "Advocacia Autoridade Sóbria",
    description:
      "Estrutura tipográfica para apresentar área de atuação, critérios de contato e próximos passos.",
    visualStyle: "sobrio",
    status: "experimental",
    goal: "Qualificar contatos sem prometer resultado jurídico.",
    audience: "Escritórios pequenos com atuação consultiva ou especializada.",
    tags: ["jurídico", "autoridade", "sobriedade"],
    preview: "law-authority-preview",
    thumbnail: "law-authority-thumb",
    route: "/modelos/advocacia/autoridade-sobria",
    indexable: false,
    components: ["DemoLawHeader", "DemoPracticeAreas", "DemoCaseIntake"],
    assets: ["css-preview"],
    maturity: "conceito",
    featured: true,
  },
  {
    slug: "oferta-direta",
    segment: "infoprodutores",
    name: "Oferta Direta",
    description:
      "Landing page para explicar problema, promessa realista, entrega e prova sem depender de hype.",
    visualStyle: "conversao",
    status: "experimental",
    goal: "Organizar uma oferta digital com clareza antes de escalar tráfego.",
    audience: "Criadores e consultores com produto digital simples.",
    tags: ["produto digital", "oferta", "captura"],
    preview: "creator-offer-preview",
    thumbnail: "creator-offer-thumb",
    route: "/modelos/infoprodutores/oferta-direta",
    indexable: false,
    components: ["DemoOfferHero", "DemoProofGrid", "DemoObjectionBlock"],
    assets: ["css-preview"],
    maturity: "protótipo",
    featured: true,
  },
  {
    slug: "cardapio-local",
    segment: "restaurantes",
    name: "Cardápio Local",
    description:
      "Vitrine visual para pratos, horários, localização e reserva com leitura rápida no celular.",
    visualStyle: "visual",
    status: "experimental",
    goal: "Ajudar o cliente a decidir rápido e chegar ao restaurante com menos atrito.",
    audience: "Restaurantes e cafés que precisam mostrar cardápio sem PDF pesado.",
    tags: ["restaurante", "cardápio", "reserva"],
    preview: "restaurant-menu-preview",
    thumbnail: "restaurant-menu-thumb",
    route: "/modelos/restaurantes/cardapio-local",
    indexable: false,
    components: ["DemoRestaurantHero", "DemoMenuGrid", "DemoLocationStrip"],
    assets: ["css-preview"],
    maturity: "conceito",
  },
  {
    slug: "vitrine-de-bairros",
    segment: "imobiliarias",
    name: "Vitrine de Bairros",
    description:
      "Modelo para apresentar imóveis por contexto de bairro, tipo de busca e contato com corretor.",
    visualStyle: "premium",
    status: "experimental",
    goal: "Dar contexto antes do lead pedir informação sobre o imóvel.",
    audience: "Imobiliárias locais que querem destacar regiões e imóveis selecionados.",
    tags: ["imóveis", "bairros", "captação"],
    preview: "real-estate-preview",
    thumbnail: "real-estate-thumb",
    route: "/modelos/imobiliarias/vitrine-de-bairros",
    indexable: false,
    components: ["DemoPropertyHero", "DemoNeighborhoodCards", "DemoLeadForm"],
    assets: ["css-preview"],
    maturity: "conceito",
  },
  {
    slug: "portfolio-com-raciocinio",
    segment: "portfolios",
    name: "Portfólio com Raciocínio",
    description:
      "Página pessoal para mostrar projetos, decisões e processo em vez de uma galeria sem contexto.",
    visualStyle: "editorial",
    status: "experimental",
    goal: "Mostrar como a pessoa pensa antes de mostrar tudo que já fez.",
    audience: "Profissionais independentes que precisam vender critério, não só estética.",
    tags: ["portfólio", "cases", "processo"],
    preview: "portfolio-thinking-preview",
    thumbnail: "portfolio-thinking-thumb",
    route: "/modelos/portfolios/portfolio-com-raciocinio",
    indexable: false,
    components: ["DemoPortfolioHero", "DemoCaseList", "DemoThinkingBlock"],
    assets: ["css-preview"],
    maturity: "conceito",
  },
  {
    slug: "servico-com-criterio",
    segment: "servicos-profissionais",
    name: "Serviço com Critério",
    description:
      "Página para explicar problema, processo, escopo e sinais de que vale contratar.",
    visualStyle: "local",
    status: "experimental",
    goal: "Transformar uma oferta de serviço em uma decisão mais clara para o visitante.",
    audience: "Consultores e prestadores que vendem diagnóstico, processo ou execução.",
    tags: ["serviços", "consultoria", "escopo"],
    preview: "service-criteria-preview",
    thumbnail: "service-criteria-thumb",
    route: "/modelos/servicos-profissionais/servico-com-criterio",
    indexable: false,
    components: ["DemoServiceHero", "DemoScopeSection", "DemoFitChecklist"],
    assets: ["css-preview"],
    maturity: "protótipo",
  },
];
