import { getAllBlogPosts } from "@/app/blog/postData";
import { blog } from "@/resources";
import type { BlogFile } from "@/utils/utils";

import { getKnowledgeAreaBySlug, knowledgeAreas, type KnowledgeAreaSlug } from "./knowledgeConfig";

export type KnowledgeLevel = "iniciante" | "intermediario" | "avancado";
export type KnowledgeType =
  | "conceito"
  | "guia"
  | "checklist"
  | "estudo de caso"
  | "pratica"
  | "comparacao"
  | "referencia";
export type KnowledgeStatus = "publicado" | "planejado" | "em breve";
export type KnowledgeVisibility = "mapa" | "trilha" | "blog-only" | "projeto";

export type KnowledgeItem = {
  title: string;
  description: string;
  slug: string;
  href?: string;
  area: KnowledgeAreaSlug;
  module: string;
  node?: string;
  level: KnowledgeLevel;
  type: KnowledgeType;
  status: KnowledgeStatus;
  essential: boolean;
  prerequisites: string[];
  unlocks: string[];
  related: string[];
  estimatedReadingTime?: number;
  primaryKeyword?: string;
  secondaryKeywords: string[];
  mapVisibility: KnowledgeVisibility;
  publishedAt?: string;
};

export type KnowledgeTrail = {
  area: NonNullable<ReturnType<typeof getKnowledgeAreaBySlug>>;
  items: KnowledgeItem[];
  essentials: KnowledgeItem[];
  modules: Array<{
    slug: string;
    title: string;
    description: string;
    items: KnowledgeItem[];
    publishedCount: number;
    plannedCount: number;
  }>;
  publishedCount: number;
  plannedCount: number;
};

const plannedKnowledgeItems: KnowledgeItem[] = [
  {
    title: "Antes de tentar ganhar dinheiro na internet, entenda sua situacao",
    description: "Diagnostico simples para alinhar necessidade, tempo, energia e risco.",
    slug: "diagnostico-financeiro-pessoal-antes-de-buscar-renda-extra",
    area: "renda-digital",
    module: "diagnostico",
    node: "clareza-inicial",
    level: "iniciante",
    type: "guia",
    status: "planejado",
    essential: true,
    prerequisites: [],
    unlocks: ["Como ganhar dinheiro na internet de forma honesta e comprovada"],
    related: [],
    secondaryKeywords: ["diagnostico financeiro pessoal", "renda extra com planejamento"],
    mapVisibility: "trilha",
  },
  {
    title: "Como definir objetivos de curto, medio e longo prazo",
    description: "Organize urgencia, horizonte de tempo e criterios de decisao.",
    slug: "como-definir-objetivos-de-curto-medio-e-longo-prazo",
    area: "renda-digital",
    module: "diagnostico",
    node: "objetivos",
    level: "iniciante",
    type: "checklist",
    status: "planejado",
    essential: true,
    prerequisites: ["Antes de tentar ganhar dinheiro na internet, entenda sua situacao"],
    unlocks: ["O que vender para ganhar dinheiro"],
    related: [],
    secondaryKeywords: [],
    mapVisibility: "trilha",
  },
  {
    title: "Como a internet gera dinheiro",
    description: "Valor, audiencia, oferta, canal e conversao sem mistificacao.",
    slug: "como-a-internet-gera-dinheiro",
    area: "renda-digital",
    module: "fundamentos",
    node: "valor-online",
    level: "iniciante",
    type: "conceito",
    status: "planejado",
    essential: true,
    prerequisites: [],
    unlocks: ["O que e uma oferta", "O que vender na internet"],
    related: ["Termos de marketing"],
    secondaryKeywords: ["como funciona dinheiro na internet"],
    mapVisibility: "trilha",
  },
  {
    title: "O que vender para ganhar dinheiro",
    description: "Como escolher uma ideia realista com base em habilidade, demanda e risco.",
    slug: "o-que-vender-para-ganhar-dinheiro",
    area: "renda-digital",
    module: "produtos-ativos",
    node: "o-que-vender",
    level: "iniciante",
    type: "guia",
    status: "planejado",
    essential: true,
    prerequisites: ["Como a internet gera dinheiro"],
    unlocks: ["O que vender na internet", "Como vender na internet"],
    related: ["Como ganhar dinheiro na internet de forma honesta e comprovada"],
    secondaryKeywords: ["ideias realistas para vender", "o que vender com pouco dinheiro"],
    mapVisibility: "trilha",
  },
  {
    title: "O que vender na internet",
    description: "Produtos fisicos, produtos digitais e servicos comparados com criterio.",
    slug: "o-que-vender-na-internet",
    area: "renda-digital",
    module: "produtos-ativos",
    node: "venda-online",
    level: "iniciante",
    type: "comparacao",
    status: "planejado",
    essential: true,
    prerequisites: ["O que vender para ganhar dinheiro"],
    unlocks: ["Como vender online sem estoque", "Como vender infoprodutos"],
    related: [],
    secondaryKeywords: ["produtos para vender online", "servicos para vender na internet"],
    mapVisibility: "trilha",
  },
  {
    title: "Como vender na internet",
    description: "Oferta, canal, publico e primeiro teste antes de escalar.",
    slug: "como-vender-na-internet",
    area: "marketing",
    module: "oferta-mensagem",
    node: "primeira-venda",
    level: "iniciante",
    type: "guia",
    status: "planejado",
    essential: true,
    prerequisites: ["O que e uma oferta"],
    unlocks: ["Como comecar como freelancer", "Como vender servicos para pequenos negocios"],
    related: ["O que vender na internet"],
    secondaryKeywords: ["como vender online", "guia para vender na internet"],
    mapVisibility: "trilha",
  },
  {
    title: "Como escolher uma habilidade digital",
    description: "Selecione uma habilidade compativel com rotina, mercado e prazo.",
    slug: "como-escolher-uma-habilidade-digital",
    area: "renda-digital",
    module: "habilidades-monetizaveis",
    node: "escolha-de-habilidade",
    level: "iniciante",
    type: "guia",
    status: "planejado",
    essential: true,
    prerequisites: ["Antes de tentar ganhar dinheiro na internet, entenda sua situacao"],
    unlocks: ["Como montar um portfolio sem clientes"],
    related: [],
    secondaryKeywords: ["habilidades para ganhar dinheiro online"],
    mapVisibility: "trilha",
  },
  {
    title: "Como montar um portfolio sem clientes",
    description: "Crie exemplos honestos para demonstrar capacidade antes da primeira venda.",
    slug: "como-montar-um-portfolio-sem-clientes",
    area: "renda-digital",
    module: "venda-servicos",
    node: "portfolio",
    level: "iniciante",
    type: "pratica",
    status: "planejado",
    essential: true,
    prerequisites: ["Como escolher uma habilidade digital"],
    unlocks: ["Como comecar como freelancer"],
    related: [],
    secondaryKeywords: ["portfolio para iniciante", "portfolio freelancer sem clientes"],
    mapVisibility: "trilha",
  },
  {
    title: "O que e uma oferta",
    description: "Problema, promessa responsavel, entrega, preco e prova.",
    slug: "o-que-e-uma-oferta",
    area: "marketing",
    module: "oferta-mensagem",
    node: "oferta",
    level: "iniciante",
    type: "conceito",
    status: "planejado",
    essential: true,
    prerequisites: ["Termos de marketing"],
    unlocks: ["Como vender na internet"],
    related: [],
    secondaryKeywords: ["oferta de marketing", "proposta de valor"],
    mapVisibility: "trilha",
  },
  {
    title: "O que e trafego",
    description: "Entenda trafego organico, pago, direto e por indicacao.",
    slug: "o-que-e-trafego",
    area: "marketing",
    module: "conteudo-seo",
    node: "trafego",
    level: "iniciante",
    type: "conceito",
    status: "planejado",
    essential: false,
    prerequisites: ["Termos de marketing"],
    unlocks: ["Como advogados podem aparecer no Google"],
    related: ["Termos de publicidade"],
    secondaryKeywords: [],
    mapVisibility: "trilha",
  },
  {
    title: "Como evitar golpes online",
    description: "Sinais de alerta antes de investir dinheiro, tempo ou reputacao.",
    slug: "como-evitar-golpes-online",
    area: "aprendizado",
    module: "pensamento-critico",
    node: "criterio",
    level: "iniciante",
    type: "checklist",
    status: "planejado",
    essential: true,
    prerequisites: [],
    unlocks: ["Como ganhar dinheiro na internet de forma honesta e comprovada"],
    related: [],
    secondaryKeywords: ["como identificar golpe na internet", "renda online golpe"],
    mapVisibility: "trilha",
  },
  {
    title: "Como estudar sozinho",
    description: "Escolha fontes, crie praticas e mantenha progresso com pouco ruido.",
    slug: "como-estudar-sozinho",
    area: "aprendizado",
    module: "estudo-autonomo",
    node: "autonomia",
    level: "iniciante",
    type: "guia",
    status: "planejado",
    essential: true,
    prerequisites: [],
    unlocks: ["Como transformar estudo em pratica"],
    related: [],
    secondaryKeywords: ["aprendizado autodidata", "como aprender sozinho"],
    mapVisibility: "trilha",
  },
  {
    title: "Como criar uma rotina de aprendizado",
    description: "Organize tempo, energia, revisao e pratica sem depender de excesso de motivacao.",
    slug: "como-criar-uma-rotina-de-aprendizado",
    area: "aprendizado",
    module: "rotina-pratica",
    node: "rotina",
    level: "iniciante",
    type: "checklist",
    status: "planejado",
    essential: true,
    prerequisites: ["Como estudar sozinho"],
    unlocks: ["Como transformar estudo em habilidade"],
    related: [],
    secondaryKeywords: [],
    mapVisibility: "trilha",
  },
  {
    title: "Como vender templates no Canva",
    description: "Um produto digital simples, com nicho, criacao, apresentacao e divulgacao.",
    slug: "como-vender-templates-no-canva",
    area: "design",
    module: "ferramentas-design",
    node: "canva",
    level: "iniciante",
    type: "pratica",
    status: "planejado",
    essential: false,
    prerequisites: ["Termos de design", "O que vender na internet"],
    unlocks: ["Como vender design no Canva"],
    related: [],
    secondaryKeywords: ["templates digitais", "produto digital no Canva"],
    mapVisibility: "trilha",
  },
  {
    title: "Como vender design no Canva",
    description: "Servicos e produtos digitais simples para pequenos negocios.",
    slug: "como-vender-design-no-canva",
    area: "design",
    module: "aplicacao-comercial",
    node: "servicos-canva",
    level: "iniciante",
    type: "guia",
    status: "planejado",
    essential: false,
    prerequisites: ["Como vender templates no Canva"],
    unlocks: [],
    related: ["Como montar um portfolio sem clientes"],
    secondaryKeywords: [],
    mapVisibility: "trilha",
  },
  {
    title: "Como usar IA para pesquisar melhor",
    description:
      "Use IA para levantar perguntas, comparar caminhos e evitar conclusoes apressadas.",
    slug: "como-usar-ia-para-pesquisar-melhor",
    area: "ferramentas",
    module: "ia",
    node: "pesquisa-com-ia",
    level: "iniciante",
    type: "pratica",
    status: "planejado",
    essential: true,
    prerequisites: ["Como estudar sozinho"],
    unlocks: ["Como organizar um projeto digital"],
    related: [],
    secondaryKeywords: ["ia para estudos", "ia para pesquisa"],
    mapVisibility: "trilha",
  },
  {
    title: "Como organizar um projeto digital",
    description:
      "Defina objetivo, entregaveis, prioridades e revisoes antes de acumular ferramentas.",
    slug: "como-organizar-um-projeto-digital",
    area: "ferramentas",
    module: "produtividade-organizacao",
    node: "organizacao",
    level: "iniciante",
    type: "checklist",
    status: "planejado",
    essential: true,
    prerequisites: [],
    unlocks: ["Como criar um site pessoal"],
    related: [],
    secondaryKeywords: [],
    mapVisibility: "trilha",
  },
  {
    title: "Como criar um site pessoal",
    description: "Estrutura minima para apresentar repertorio, ideias, projetos e contatos.",
    slug: "como-criar-um-site-pessoal",
    area: "projetos",
    module: "site-pessoal",
    node: "base-propria",
    level: "iniciante",
    type: "guia",
    status: "planejado",
    essential: true,
    prerequisites: ["Como organizar um projeto digital"],
    unlocks: ["Como construir um blog util"],
    related: [],
    secondaryKeywords: [],
    mapVisibility: "projeto",
  },
  {
    title: "Como construir um blog util",
    description: "Transforme conteudo em biblioteca navegavel, nao apenas arquivo cronologico.",
    slug: "como-construir-um-blog-util",
    area: "projetos",
    module: "blog-base",
    node: "base-de-conhecimento",
    level: "intermediario",
    type: "guia",
    status: "planejado",
    essential: true,
    prerequisites: ["Como criar um site pessoal"],
    unlocks: ["Como criar uma newsletter"],
    related: [],
    secondaryKeywords: [],
    mapVisibility: "projeto",
  },
];

function uniq(values: Array<string | undefined | null>) {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value?.trim()))));
}

function normalizeKey(value?: string) {
  return (value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeArea(value?: string): KnowledgeAreaSlug | undefined {
  const normalized = normalizeKey(value);
  const area = knowledgeAreas.find(
    (item) => item.slug === normalized || normalizeKey(item.title) === normalized,
  );

  return area?.slug;
}

function normalizeModule(areaSlug: KnowledgeAreaSlug, value?: string) {
  const area = getKnowledgeAreaBySlug(areaSlug);
  const normalized = normalizeKey(value);
  const matchedModule = area?.modules.find(
    (item) => item.slug === normalized || normalizeKey(item.title) === normalized,
  );

  return matchedModule?.slug ?? area?.modules[0]?.slug ?? "fundamentos";
}

function normalizeLevel(value?: string): KnowledgeLevel {
  const normalized = normalizeKey(value);
  if (normalized === "intermediario") return "intermediario";
  if (normalized === "avancado") return "avancado";
  return "iniciante";
}

function normalizeType(value?: string): KnowledgeType {
  const normalized = normalizeKey(value);

  if (normalized === "checklist") return "checklist";
  if (normalized === "estudo-de-caso") return "estudo de caso";
  if (normalized === "pratica") return "pratica";
  if (normalized === "comparacao") return "comparacao";
  if (normalized === "referencia") return "referencia";
  if (normalized === "conceito") return "conceito";

  return "guia";
}

function normalizeStatus(value?: string): KnowledgeStatus {
  if (value === "planejado" || value === "em breve") return value;
  return "publicado";
}

function normalizeVisibility(value?: string): KnowledgeVisibility {
  if (value === "mapa" || value === "trilha" || value === "blog-only" || value === "projeto") {
    return value;
  }

  return "trilha";
}

function postToKnowledgeItem(post: BlogFile): KnowledgeItem | null {
  const area = normalizeArea(post.metadata.area);
  if (!area) return null;

  const visibility = normalizeVisibility(post.metadata.mapVisibility);
  if (visibility === "blog-only") return null;

  return {
    title: post.metadata.title,
    description: post.metadata.summary ?? "",
    slug: post.slug,
    href: `${blog.path}/${post.slug}`,
    area,
    module: normalizeModule(area, post.metadata.module),
    node: post.metadata.node,
    level: normalizeLevel(post.metadata.level),
    type: normalizeType(post.metadata.type),
    status: normalizeStatus(post.metadata.knowledgeStatus),
    essential: Boolean(post.metadata.essential),
    prerequisites: post.metadata.prerequisites ?? [],
    unlocks: post.metadata.unlocks ?? [],
    related: post.metadata.related ?? [],
    estimatedReadingTime: post.metadata.estimatedReadingTime ?? post.metadata.readingTime,
    primaryKeyword: post.metadata.primaryKeyword,
    secondaryKeywords: post.metadata.secondaryKeywords ?? post.metadata.keywords ?? [],
    mapVisibility: visibility,
    publishedAt: post.metadata.updatedAt ?? post.metadata.publishedAt,
  };
}

function sortKnowledgeItems(left: KnowledgeItem, right: KnowledgeItem) {
  const statusWeight: Record<KnowledgeStatus, number> = {
    publicado: 0,
    "em breve": 1,
    planejado: 2,
  };

  return (
    statusWeight[left.status] - statusWeight[right.status] ||
    Number(right.essential) - Number(left.essential) ||
    left.title.localeCompare(right.title)
  );
}

export function getKnowledgeItems(posts = getAllBlogPosts()) {
  const itemMap = new Map<string, KnowledgeItem>();

  plannedKnowledgeItems.forEach((item) => {
    itemMap.set(item.slug, item);
  });

  posts
    .map(postToKnowledgeItem)
    .filter((item): item is KnowledgeItem => Boolean(item))
    .forEach((item) => {
      itemMap.set(item.slug, item);
    });

  return Array.from(itemMap.values()).sort(sortKnowledgeItems);
}

export function getKnowledgeTrail(
  areaSlug: string,
  posts = getAllBlogPosts(),
): KnowledgeTrail | null {
  const area = getKnowledgeAreaBySlug(areaSlug);
  if (!area) return null;

  const items = getKnowledgeItems(posts).filter((item) => item.area === area.slug);
  const modules = area.modules.map((module) => {
    const moduleItems = items
      .filter((item) => item.module === module.slug)
      .sort(sortKnowledgeItems);

    return {
      ...module,
      items: moduleItems,
      publishedCount: moduleItems.filter((item) => item.status === "publicado").length,
      plannedCount: moduleItems.filter((item) => item.status !== "publicado").length,
    };
  });

  return {
    area,
    items,
    essentials: items.filter((item) => item.essential).slice(0, 6),
    modules,
    publishedCount: items.filter((item) => item.status === "publicado").length,
    plannedCount: items.filter((item) => item.status !== "publicado").length,
  };
}

export function getKnowledgeMap(posts = getAllBlogPosts()) {
  return knowledgeAreas.map((area) => {
    const trail = getKnowledgeTrail(area.slug, posts);
    const modulesWithItems = trail?.modules.filter((module) => module.items.length > 0) ?? [];

    return {
      area,
      publishedCount: trail?.publishedCount ?? 0,
      plannedCount: trail?.plannedCount ?? 0,
      essentialCount: trail?.items.filter((item) => item.essential).length ?? 0,
      modules: modulesWithItems.length > 0 ? modulesWithItems : area.modules.slice(0, 3),
    };
  });
}

export function getKnowledgeContextForPost(slug: string, posts = getAllBlogPosts()) {
  const item = getKnowledgeItems(posts).find((candidate) => candidate.slug === slug);
  if (!item) return null;

  const area = getKnowledgeAreaBySlug(item.area);
  const areaModule = area?.modules.find((candidate) => candidate.slug === item.module);
  const items = getKnowledgeItems(posts);
  const currentIndex = items.findIndex((candidate) => candidate.slug === slug);
  const nextItem =
    item.unlocks
      .map((unlock) => {
        const normalized = normalizeKey(unlock);
        return items.find(
          (candidate) =>
            candidate.slug === normalized || normalizeKey(candidate.title) === normalized,
        );
      })
      .find(Boolean) ??
    items
      .filter((candidate) => candidate.area === item.area && candidate.module === item.module)
      .find((candidate) => candidate.slug !== item.slug && candidate.status !== "planejado");

  return {
    item,
    area,
    module: areaModule,
    nextItem,
    position: currentIndex >= 0 ? currentIndex + 1 : undefined,
    related: uniq(item.related).slice(0, 4),
    prerequisites: uniq(item.prerequisites).slice(0, 4),
  };
}
