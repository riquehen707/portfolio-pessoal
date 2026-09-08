import { services } from "@/resources/services";
import { getPublishedServiceLandings } from "@/data/service-landings";
import type { ServiceLanding } from "@/content/service-landings/serviceLandingSchema";
import {
  serviceHubCardSchema,
  type ServiceHubCard,
  type ServiceHubIntent,
} from "@/content/service-hub/serviceHubCardSchema";

type ImagePreview = Extract<ServiceHubCard["preview"], { kind: "image" }>;
type FallbackPreview = Extract<ServiceHubCard["preview"], { kind: "fallback" }>;

type CardPresentation = {
  source: { kind: "landing"; id: string } | { kind: "legacy"; slug: string };
  intent: ServiceHubIntent;
  title: string;
  context: string;
  benefit: string;
  preview: ImagePreview | FallbackPreview;
};

export type ServiceHubGroup = {
  id: string;
  intent: ServiceHubIntent;
  navigationLabel: string;
  title: string;
  description: string;
  cards: ServiceHubCard[];
  allHref?: string;
};

// Capturas dos componentes especializados; não são projetos de clientes nem demos funcionais.
const interfacePreview = (name: string, alt: string): ImagePreview => ({
  kind: "image", src: `/images/work/${name}-interface.webp`, alt,
  width: 1120, height: 700, position: "top",
});

const presentations: CardPresentation[] = [
  {
    source: { kind: "landing", id: "site-arquitetos" },
    intent: "present-work",
    title: "Portfólio para arquitetos",
    context: "Arquitetos autônomos e pequenos escritórios",
    benefit: "Reúna projetos e receba pedidos de orçamento.",
    preview: interfacePreview("arquitetos", "Captura do exemplo de portfólio de arquitetura."),
  },
  {
    source: { kind: "landing", id: "galeria-virtual-artistas" },
    intent: "present-work",
    title: "Galeria virtual para artistas",
    context: "Artistas visuais, ilustradores, pintores e escultores",
    benefit: "Exponha obras e receba consultas por encomendas.",
    preview: interfacePreview("artistas", "Captura do exemplo de galeria virtual com obras ilustrativas."),
  },
  {
    source: { kind: "landing", id: "portfolio-designers" },
    intent: "present-work",
    title: "Portfólio para designers",
    context: "Designers gráficos, UI/UX, web e freelancers",
    benefit: "Envie projetos e cases em um único link.",
    preview: interfacePreview("designers", "Captura do exemplo de portfólio de design."),
  },
  {
    source: { kind: "landing", id: "portfolio-fotografos" },
    intent: "present-work",
    title: "Portfólio para fotógrafos",
    context: "Fotógrafos de ensaios, eventos e trabalhos comerciais",
    benefit: "Mostre ensaios e receba pedidos de orçamento.",
    preview: interfacePreview("fotografos", "Captura do exemplo de portfólio de fotografia."),
  },
  {
    source: { kind: "landing", id: "portfolio-tatuadores" },
    intent: "present-work",
    title: "Portfólio para tatuadores",
    context: "Tatuadores autônomos",
    benefit: "Mostre seus estilos e receba consultas por tatuagens.",
    preview: interfacePreview("tatuadores", "Captura do exemplo de portfólio de tatuagens."),
  },
  {
    source: { kind: "landing", id: "site-corretores" },
    intent: "capture-clients",
    title: "Site para corretores de imóveis",
    context: "Corretores de imóveis autônomos",
    benefit: "Mostre imóveis e receba contatos pelo WhatsApp.",
    preview: interfacePreview("corretores", "Captura do exemplo de site para corretor, com imóvel ilustrativo."),
  },
  {
    source: { kind: "legacy", slug: "landing-page-para-psicologas" },
    intent: "capture-clients",
    title: "Página para psicólogas",
    context: "Psicólogas e consultórios",
    benefit: "Explique seu atendimento e receba consultas.",
    preview: { kind: "fallback", label: "Atendimento e contato", tone: "forest" },
  },
  {
    source: { kind: "legacy", slug: "landing-page-para-estetica" },
    intent: "capture-clients",
    title: "Página para estética",
    context: "Clínicas e profissionais de estética",
    benefit: "Mostre tratamentos e receba pedidos de agendamento.",
    preview: { kind: "fallback", label: "Tratamentos e contato", tone: "clay" },
  },
  {
    source: { kind: "legacy", slug: "landing-page-para-social-media-designers-e-freelancers" },
    intent: "capture-clients",
    title: "Página para vender seu serviço",
    context: "Social media, designers e freelancers digitais",
    benefit: "Apresente sua oferta e receba pedidos de orçamento.",
    preview: { kind: "fallback", label: "Serviço e contato", tone: "slate" },
  },
  {
    source: { kind: "legacy", slug: "websites-profissionais" },
    intent: "capture-clients",
    title: "Site ou página sob medida",
    context: "Serviços e negócios com uma necessidade específica",
    benefit: "Reúna sua oferta, conteúdo e contato em um site.",
    preview: { kind: "fallback", label: "Projeto sob medida", tone: "gold" },
  },
  {
    source: { kind: "legacy", slug: "seo-tecnico" },
    intent: "sell-operate",
    title: "Auditoria de SEO",
    context: "Sites, lojas e projetos de conteúdo",
    benefit: "Saiba o que dificulta encontrar seu site na busca.",
    preview: { kind: "fallback", label: "Busca e indexação", tone: "forest" },
  },
  {
    source: { kind: "legacy", slug: "integracoes-automacoes" },
    intent: "sell-operate",
    title: "Automação para atendimento",
    context: "Negócios com tarefas e contatos espalhados",
    benefit: "Conecte ferramentas e reduza tarefas repetidas.",
    preview: { kind: "fallback", label: "Tarefas automatizadas", tone: "gold" },
  },
];

const groupDefinitions: Array<Omit<ServiceHubGroup, "cards">> = [
  {
    id: "apresentar-trabalho",
    intent: "present-work",
    navigationLabel: "Mostrar meu trabalho",
    title: "Para apresentar seu trabalho",
    description: "Organize seus melhores trabalhos e compartilhe tudo em um único link.",
  },
  {
    id: "captar-clientes",
    intent: "capture-clients",
    navigationLabel: "Captar clientes",
    title: "Páginas para captar clientes",
    description: "Explique o que você oferece e facilite o contato pelo WhatsApp ou formulário.",
  },
  {
    id: "melhorar-vendas-operacao",
    intent: "sell-operate",
    navigationLabel: "Melhorar site e atendimento",
    title: "Para melhorar seu site e atendimento",
    description: "Corrija problemas de busca e reduza tarefas manuais no atendimento.",
  },
  {
    id: "validar-ideia",
    intent: "validate-idea",
    navigationLabel: "Validar ideia",
    title: "Para testar uma ideia",
    description: "Compare caminhos antes de investir em um projeto completo.",
  },
];

type LegacyCommercialSource = {
  hero: { price?: string };
  commercialModel: {
    setup: { amount: string };
    monthly: { amount: string; includes: string[] };
  };
};

export function getServiceHubPrice(source: LegacyCommercialSource | ServiceLanding) {
  if ("sections" in source) {
    const pricing = source.sections.find((section) => section.type === "pricing");
    if (pricing?.type === "pricing") {
      const recurring = pricing.items.filter((item) => item.cadence === "monthly");
      const setup = pricing.items.filter((item) => item.cadence === "once");
      if (recurring.length === 1) {
        return {
          label: "Mensalidade",
          value: recurring[0].amount,
          detail: setup.length ? `+ ${setup.map((item) => item.amount).join(" + ")} de implantação` : undefined,
          included: recurring[0].details,
        };
      }
    }
    throw new Error(`Serviço publicado sem mensalidade válida no hub: ${source.slug}`);
  }
  return {
    label: "Mensalidade",
    value: source.commercialModel.monthly.amount,
    detail: `+ ${source.commercialModel.setup.amount} de implantação`,
    included: `Inclui ${source.commercialModel.monthly.includes.join(", ").toLocaleLowerCase("pt-BR")}.`,
  };
}

export function getServiceHubGroups(): ServiceHubGroup[] {
  const landings = getPublishedServiceLandings();
  const landingById = new Map(landings.map((landing) => [landing.id, landing]));
  const legacyBySlug = new Map(services.map((service) => [service.slug, service]));
  const usedLandingIds = new Set<string>();
  const usedLegacySlugs = new Set<string>();

  const cards = presentations.map((presentation) => {
    const source =
      presentation.source.kind === "landing"
        ? landingById.get(presentation.source.id)
        : legacyBySlug.get(presentation.source.slug);

    if (!source) {
      const reference =
        presentation.source.kind === "landing"
          ? presentation.source.id
          : presentation.source.slug;
      throw new Error(`Serviço do hub não encontrado no catálogo proprietário: ${reference}`);
    }

    if (presentation.source.kind === "landing") usedLandingIds.add(presentation.source.id);
    else usedLegacySlugs.add(presentation.source.slug);

    return serviceHubCardSchema.parse({
      id:
        presentation.source.kind === "landing"
          ? presentation.source.id
          : presentation.source.slug,
      slug: source.slug,
      intent: presentation.intent,
      title: presentation.title,
      context: presentation.context,
      benefit: presentation.benefit,
      price: getServiceHubPrice(source),
      preview: presentation.preview,
    });
  });

  const uncategorizedLandings = landings.filter((landing) => !usedLandingIds.has(landing.id));
  const uncategorizedLegacy = services.filter((service) => !usedLegacySlugs.has(service.slug));
  if (uncategorizedLandings.length || uncategorizedLegacy.length) {
    throw new Error(
      `Serviços publicados sem grupo no hub: ${[
        ...uncategorizedLandings.map((landing) => landing.id),
        ...uncategorizedLegacy.map((service) => service.slug),
      ].join(", ")}`,
    );
  }

  const slugs = cards.map((card) => card.slug);
  if (new Set(slugs).size !== slugs.length) {
    throw new Error("Um serviço não pode aparecer mais de uma vez no hub.");
  }

  return groupDefinitions
    .map((group) => ({
      ...group,
      cards: cards.filter((card) => card.intent === group.intent),
    }))
    .filter((group) => group.cards.length > 0);
}

export const unavailableServiceHubIntents = [
  {
    intent: "validate-idea" as const,
    reason:
      "Nenhum serviço publicado pertence hoje a esta intenção; /simulacao permanece pausada e /servicos/produtos é um caminho de apoio, não uma oferta.",
  },
] as const;
