import { services } from "@/resources/services";
import { getPublishedServiceLandings } from "@/data/service-landings";
import { architectDemoMedia } from "@/content/service-landings/architectDemoMedia";
import { artistGalleryDemoMedia } from "@/content/service-landings/artistGalleryDemoMedia";
import { photographerDemoMedia } from "@/content/service-landings/photographerDemoMedia";
import { realEstateDemoMedia } from "@/content/service-landings/realEstateDemoMedia";
import { tattooDemoMedia } from "@/content/service-landings/tattooDemoMedia";
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

const imagePreview = (
  media: { src: string; alt: string; width: number; height: number },
  position: ImagePreview["position"] = "center",
): ImagePreview => ({ ...media, kind: "image", position });

const presentations: CardPresentation[] = [
  {
    source: { kind: "landing", id: "site-arquitetos" },
    intent: "present-work",
    title: "Portfólio para arquitetos",
    context: "Arquitetos autônomos e pequenos escritórios",
    benefit: "Mostre projetos, explique seus serviços e facilite pedidos de orçamento.",
    preview: imagePreview(architectDemoMedia[0]),
  },
  {
    source: { kind: "landing", id: "galeria-virtual-artistas" },
    intent: "present-work",
    title: "Galeria virtual para artistas",
    context: "Artistas visuais, ilustradores, pintores e escultores",
    benefit: "Organize obras por coleção e facilite contatos, encomendas e convites.",
    preview: imagePreview(artistGalleryDemoMedia[0], "top"),
  },
  {
    source: { kind: "landing", id: "portfolio-designers" },
    intent: "present-work",
    title: "Portfólio para designers",
    context: "Designers gráficos, UI/UX, web e freelancers",
    benefit: "Mostre projetos e cases em um link para enviar a clientes e recrutadores.",
    preview: { kind: "fallback", label: "Projetos e cases", tone: "slate" },
  },
  {
    source: { kind: "landing", id: "portfolio-fotografos" },
    intent: "present-work",
    title: "Portfólio para fotógrafos",
    context: "Fotógrafos de ensaios, eventos e trabalhos comerciais",
    benefit: "Separe seus melhores trabalhos por categoria e facilite pedidos de orçamento.",
    preview: imagePreview(photographerDemoMedia[0], "top"),
  },
  {
    source: { kind: "landing", id: "portfolio-tatuadores" },
    intent: "present-work",
    title: "Portfólio para tatuadores",
    context: "Tatuadores autônomos",
    benefit: "Organize tatuagens por estilo e facilite o contato de novos clientes.",
    preview: imagePreview(tattooDemoMedia[1]),
  },
  {
    source: { kind: "landing", id: "site-corretores" },
    intent: "capture-clients",
    title: "Site para corretores de imóveis",
    context: "Corretores de imóveis autônomos",
    benefit: "Apresente seus imóveis e leve interessados ao WhatsApp ou formulário.",
    preview: imagePreview(realEstateDemoMedia[0], "top"),
  },
  {
    source: { kind: "legacy", slug: "landing-page-para-psicologas" },
    intent: "capture-clients",
    title: "Página para psicólogas",
    context: "Psicólogas e consultórios",
    benefit: "Explique seu atendimento e facilite o primeiro contato de novos pacientes.",
    preview: { kind: "fallback", label: "Atendimento e contato", tone: "forest" },
  },
  {
    source: { kind: "legacy", slug: "landing-page-para-estetica" },
    intent: "capture-clients",
    title: "Página para estética",
    context: "Clínicas e profissionais de estética",
    benefit: "Mostre tratamentos e leve dúvidas e agendamentos ao seu canal de atendimento.",
    preview: { kind: "fallback", label: "Tratamentos e contato", tone: "clay" },
  },
  {
    source: { kind: "legacy", slug: "landing-page-para-social-media-designers-e-freelancers" },
    intent: "capture-clients",
    title: "Página para vender seu serviço",
    context: "Social media, designers e freelancers digitais",
    benefit: "Explique o que você faz e leve interessados para uma conversa comercial.",
    preview: { kind: "fallback", label: "Serviço e contato", tone: "slate" },
  },
  {
    source: { kind: "legacy", slug: "websites-profissionais" },
    intent: "capture-clients",
    title: "Site ou página sob medida",
    context: "Serviços e negócios com uma necessidade específica",
    benefit: "Tenha uma página feita para sua oferta, seu conteúdo e sua forma de atendimento.",
    preview: { kind: "fallback", label: "Projeto sob medida", tone: "gold" },
  },
  {
    source: { kind: "legacy", slug: "seo-tecnico" },
    intent: "sell-operate",
    title: "Auditoria de SEO",
    context: "Sites, lojas e projetos de conteúdo",
    benefit: "Descubra o que dificulta seu site de aparecer e ser entendido pelo Google.",
    preview: { kind: "fallback", label: "Busca e indexação", tone: "forest" },
  },
  {
    source: { kind: "legacy", slug: "integracoes-automacoes" },
    intent: "sell-operate",
    title: "Automação para atendimento",
    context: "Negócios com tarefas e contatos espalhados",
    benefit: "Conecte etapas do atendimento e reduza tarefas manuais repetidas.",
    preview: { kind: "fallback", label: "Tarefas automatizadas", tone: "gold" },
  },
];

const groupDefinitions: Array<Omit<ServiceHubGroup, "cards">> = [
  {
    id: "apresentar-trabalho",
    intent: "present-work",
    navigationLabel: "Portfólios",
    title: "Portfólios para mostrar seu trabalho",
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
    navigationLabel: "Quero vender",
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

function compactPrice(raw: string) {
  const prefix = "A partir de ";
  if (raw.startsWith(prefix)) {
    return { label: "A partir de", value: raw.slice(prefix.length) };
  }
  return {
    label: "Implantação + mensalidade",
    value: raw.replace(" de implantação", ""),
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
      price: compactPrice(source.hero.price ?? "Sob escopo"),
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
