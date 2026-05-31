import {
  getBlogCollectionIndex,
  getAllBlogPosts,
  getBlogPostFormat,
  getBlogPrimaryCategory,
} from "@/app/blog/postData";
import {
  getAllWorkProjects,
  getWorkProjectCategory,
  getWorkProjectPath,
  getWorkProjectStack,
} from "@/app/work/projectData";
import { publicTrailAreas } from "@/lib/knowledgeConfig";
import {
  about,
  audiencePages,
  blog,
  contact,
  home,
  products,
  productsPage,
  services,
  servicesPage,
  simulationPage,
  technicalApproach,
  work,
} from "@/resources";

export type GlobalSearchItemType =
  | "article"
  | "topic"
  | "page"
  | "service"
  | "audience"
  | "project"
  | "product";

export type GlobalSearchItem = {
  id: string;
  type: GlobalSearchItemType;
  title: string;
  description: string;
  href: string;
  label: string;
  keywords: string[];
  date?: string;
};

function stripText(value?: string) {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
    .replace(/[#>*_{}[\]()|~:-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function excerpt(value?: string, maxLength = 180) {
  const text = stripText(value);
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function uniq(values: Array<string | undefined | null>) {
  return Array.from(new Set(values.filter((value): value is string => Boolean(value?.trim()))));
}

function pageItem({
  id,
  title,
  description,
  href,
  keywords = [],
}: {
  id: string;
  title: string;
  description: string;
  href: string;
  keywords?: string[];
}): GlobalSearchItem {
  return {
    id,
    type: "page",
    title,
    description,
    href,
    label: "Página",
    keywords: uniq([title, description, ...keywords]),
  };
}

export function getGlobalSearchItems(): GlobalSearchItem[] {
  const staticPages: GlobalSearchItem[] = [
    pageItem({
      id: "page-home",
      title: home.title,
      description: home.description,
      href: home.path,
      keywords: ["inicio", "portfolio", "henrique reis"],
    }),
    pageItem({
      id: "page-work",
      title: work.title,
      description: work.description,
      href: work.path,
      keywords: ["projetos", "cases", "portfolio"],
    }),
    pageItem({
      id: "page-about",
      title: about.title,
      description: about.description,
      href: about.path,
      keywords: ["sobre", "perfil", "experiencia"],
    }),
    pageItem({
      id: "page-blog",
      title: blog.title,
      description: blog.description,
      href: blog.path,
      keywords: ["blog", "artigos", "guias", "insights"],
    }),
    pageItem({
      id: "page-knowledge-map",
      title: "Mapa de Aprendizado",
      description: "Base de conhecimento organizada por areas, modulos e ordem de leitura.",
      href: "/mapa",
      keywords: ["mapa", "aprendizado", "trilhas", "base de conhecimento"],
    }),
    pageItem({
      id: "page-trails",
      title: "Trilhas de Conteudo",
      description: "Caminhos organizados por area para navegar pelos artigos em progressao.",
      href: "/trilhas",
      keywords: ["trilhas", "conteudo", "marketing", "design", "renda digital"],
    }),
    pageItem({
      id: "page-services",
      title: servicesPage.title,
      description: servicesPage.description,
      href: servicesPage.path,
      keywords: ["servicos", "landing page", "site", "seo"],
    }),
    pageItem({
      id: "page-products",
      title: productsPage.title,
      description: productsPage.description,
      href: productsPage.path,
      keywords: ["produtos", "auditoria", "consultoria"],
    }),
    pageItem({
      id: "page-simulation",
      title: simulationPage.title,
      description: simulationPage.description,
      href: simulationPage.path,
      keywords: ["simulacao", "investimento", "retorno", "marketing"],
    }),
    pageItem({
      id: "page-contact",
      title: contact.title,
      description: contact.description,
      href: contact.path,
      keywords: ["contato", "diagnostico", "proposta"],
    }),
    pageItem({
      id: "page-technical-approach",
      title: technicalApproach.title,
      description: technicalApproach.description,
      href: technicalApproach.path,
      keywords: ["tecnica", "processo", "desenvolvimento"],
    }),
  ];

  const articleItems: GlobalSearchItem[] = getAllBlogPosts().map((post) => {
    const category = getBlogPrimaryCategory(post);
    const format = getBlogPostFormat(post);

    return {
      id: `article-${post.slug}`,
      type: "article",
      title: post.metadata.title,
      description: post.metadata.summary || excerpt(post.content),
      href: `${blog.path}/${post.slug}`,
      label: format,
      date: post.metadata.updatedAt ?? post.metadata.publishedAt,
      keywords: uniq([
        category,
        format,
        post.collection,
        post.metadata.tag,
        post.metadata.category,
        ...(post.metadata.tags ?? []),
        ...(post.metadata.categories ?? []),
        ...(post.metadata.keywords ?? []),
        excerpt(post.content, 320),
      ]),
    };
  });

  const topicItems: GlobalSearchItem[] = getBlogCollectionIndex().map((topic) => ({
    id: `topic-${topic.slug}`,
    type: "topic",
    title: topic.label,
    description: topic.description,
    href: `${blog.path}/temas/${topic.slug}`,
    label: `${topic.count} artigos`,
    keywords: uniq(["tema", "blog", topic.slug, topic.label, topic.description]),
  }));

  const trailItems: GlobalSearchItem[] = publicTrailAreas.map((area) => ({
    id: `trail-${area.slug}`,
    type: "topic",
    title: area.title,
    description: area.description,
    href: area.path,
    label: "Trilha",
    keywords: uniq([
      "trilha",
      "mapa",
      "aprendizado",
      area.slug,
      area.title,
      area.description,
      ...area.modules.flatMap((module) => [module.title, module.description]),
    ]),
  }));

  const serviceItems: GlobalSearchItem[] = services.map((service) => ({
    id: `service-${service.slug}`,
    type: "service",
    title: service.title,
    description: service.summary,
    href: `${servicesPage.path}/${service.slug}`,
    label: service.badge,
    keywords: uniq([
      "servico",
      service.audience,
      service.hero.highlight,
      service.hero.description,
      ...(service.tags ?? []),
      ...(service.keyPoints ?? []),
      ...(service.seo?.keywords ?? []),
    ]),
  }));

  const audienceItems: GlobalSearchItem[] = audiencePages.map((audience) => ({
    id: `audience-${audience.slug}`,
    type: "audience",
    title: audience.title,
    description: audience.description,
    href: audience.path,
    label: audience.label,
    keywords: uniq([
      "publico",
      audience.label,
      audience.eyebrow,
      ...audience.fit,
      ...audience.contentTips,
      ...audience.metrics,
    ]),
  }));

  const projectItems: GlobalSearchItem[] = getAllWorkProjects().map((project) => ({
    id: `project-${project.slug}`,
    type: "project",
    title: project.metadata.title,
    description: project.metadata.summary || project.metadata.objective || excerpt(project.content),
    href: getWorkProjectPath(project.slug),
    label: getWorkProjectCategory(project) ?? "Projeto",
    date: project.metadata.updatedAt ?? project.metadata.publishedAt,
    keywords: uniq([
      "projeto",
      "case",
      project.metadata.objective,
      project.metadata.tag,
      project.metadata.category,
      ...(project.metadata.tags ?? []),
      ...(project.metadata.categories ?? []),
      ...getWorkProjectStack(project),
      excerpt(project.content, 260),
    ]),
  }));

  const productItems: GlobalSearchItem[] = products.map((product) => ({
    id: `product-${product.slug}`,
    type: "product",
    title: product.title,
    description: product.summary,
    href: product.link || `${productsPage.path}/${product.slug}`,
    label: product.format,
    keywords: uniq([
      "produto",
      product.category,
      product.access,
      product.status,
      product.priceLabel,
      ...product.highlights,
    ]),
  }));

  return [
    ...staticPages,
    ...articleItems,
    ...topicItems,
    ...trailItems,
    ...serviceItems,
    ...audienceItems,
    ...projectItems,
    ...productItems,
  ];
}
