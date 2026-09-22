import { getAllBlogPosts, getBlogPostFormat, getBlogPrimaryCategory } from "@/app/blog/postData";
import { seoLibraryPath, understandSearchBookPath } from "@/app/blog/seo/seoLibraryData";
import { getPublishedIdeas } from "@/data/ideas";
import { getPublishedStudios } from "@/data/organizations";
import { getPublishedPersonalities } from "@/data/personalities";
import { getPublishedProducts } from "@/data/products";
import { getPublishedReadingWorks } from "@/data/reading";
import { getPublishedServiceLandings } from "@/data/service-landings";
import { getReadingWorkPath, isComicWork } from "@/content/reading/readingDomain";
import { blog, home, services, servicesPage } from "@/resources";

export type GlobalSearchItemType = "article" | "idea" | "page" | "product" | "reading" | "person" | "organization" | "service";
export type GlobalSearchItem = { id: string; type: GlobalSearchItemType; title: string; subtitle?: string; description: string; href: string; image?: { src: string; alt: string }; aliases: string[]; keywords: string[]; label: string; date?: string };

function stripText(value?: string) { return (value ?? "").replace(/<[^>]*>/g, " ").replace(/```[\s\S]*?```/g, " ").replace(/`([^`]+)`/g, "$1").replace(/!\[[^\]]*]\([^)]*\)/g, " ").replace(/\[([^\]]+)]\([^)]*\)/g, "$1").replace(/[#>*_{}[\]()|~:-]/g, " ").replace(/\s+/g, " ").trim(); }
function excerpt(value?: string, maxLength = 180) { const text = stripText(value); return text.length <= maxLength ? text : `${text.slice(0, maxLength).trim()}...`; }
function uniq(values: Array<string | undefined | null>) { return Array.from(new Set(values.filter((value): value is string => Boolean(value?.trim())))); }
function pageItem(id: string, title: string, description: string, href: string, keywords: string[] = []): GlobalSearchItem { return { id, type: "page", title, description, href, label: "Página", aliases: [], keywords: uniq([title, description, ...keywords]) }; }

export async function getGlobalSearchItems(): Promise<GlobalSearchItem[]> {
  const [ideas, products, reading, personalities, studios, serviceLandings] = await Promise.all([getPublishedIdeas(), getPublishedProducts(), getPublishedReadingWorks(), getPublishedPersonalities(), getPublishedStudios(), getPublishedServiceLandings()]);
  const peopleById = new Map(personalities.map((person) => [person.id, person]));
  const staticPages = [
    pageItem("page-home", home.title, home.description, home.path, ["início", "biblioteca", "blog", "artigos"]),
    pageItem("page-blog", blog.title, blog.description, blog.path, ["blog", "artigos", "guias", "biblioteca"]),
    pageItem("page-products", "Produtos", "Loja curada com produtos e edições que possuem oferta comercial verificada.", "/produtos", ["loja", "ofertas", "amazon", "comprar"]),
    pageItem("page-collection", "Acervo cultural", "Jogos, filmes, livros, mangás, quadrinhos e séries organizados em bibliotecas e curadorias editoriais.", "/acervo", ["jogos", "filmes", "livros", "mangás", "quadrinhos", "séries"]),
    pageItem("page-books", "Biblioteca de livros", "Livros e light novels organizados por obra, autoria, edição e disponibilidade.", "/livros", ["autores", "leitura", "edições"]),
    pageItem("page-comics", "Biblioteca de quadrinhos e mangás", "Mangás, manhwas, manhuas, HQs e graphic novels no catálogo central de leitura.", "/quadrinhos", ["mangá", "manhwa", "manhua", "hqs", "graphic novels"]),
    pageItem("page-personalities", "Acervo de personalidades", "Escritores, filósofos, cineastas e artistas relacionados às obras do acervo.", "/personalidades", ["autores", "diretores", "filósofos", "mangakás"]),
    pageItem("page-studios", "Acervo de estúdios", "Estúdios criativos organizados por país, especialidade e período de atividade.", "/estudios", ["animação", "cinema", "produtoras", "organizações"]),
    pageItem("page-services", servicesPage.title, servicesPage.description, servicesPage.path, ["serviços", "site", "landing page", "seo"]),
    pageItem("page-seo-library", "Biblioteca de SEO", "Estratégias e fundamentos sobre descoberta, rastreamento, indexação e intenção de busca.", seoLibraryPath, ["search console", "ranking"]),
    pageItem("page-seo-book-understand-search", "Entender a busca", "Livro introdutório sobre descoberta, rastreamento, indexação, intenção e classificação.", understandSearchBookPath, ["livro de seo", "mecanismos de busca"]),
  ];
  const articleItems: GlobalSearchItem[] = getAllBlogPosts().map((post) => ({ id: `article-${post.slug}`, type: "article", title: post.metadata.title, description: post.metadata.summary || excerpt(post.content), href: `${blog.path}/${post.slug}`, label: getBlogPostFormat(post), aliases: [], date: post.metadata.updatedAt ?? post.metadata.publishedAt, keywords: uniq([getBlogPrimaryCategory(post), getBlogPostFormat(post), post.collection, post.metadata.tag, post.metadata.category, ...(post.metadata.tags ?? []), ...(post.metadata.categories ?? []), ...(post.metadata.keywords ?? []), post.metadata.primaryKeyword, ...(post.metadata.secondaryKeywords ?? []), excerpt(post.content, 320)]) }));
  const readingItems: GlobalSearchItem[] = reading.map((work) => ({ id: work.id, type: "reading", title: work.titleBr ?? work.originalTitle, subtitle: work.titleBr && work.titleBr !== work.originalTitle ? work.originalTitle : undefined, description: work.shortDescription, href: getReadingWorkPath(work), image: work.image ? { src: work.image.src, alt: work.image.alt } : undefined, label: isComicWork(work) ? "Quadrinho" : "Livro", aliases: uniq([work.slug, ...work.aliases, work.originalTitle, work.titleBr, work.romanizedTitle]), date: work.updatedAt, keywords: uniq([...work.categories, ...work.genres, ...work.themes, ...(work.concepts ?? []), ...work.credits.map((credit) => peopleById.get(credit.personId)?.name)]) }));
  const personalityItems: GlobalSearchItem[] = personalities.map((person) => ({ id: person.id, type: "person", title: person.name, subtitle: person.occupations.join(", "), description: person.summary, href: person.profilePath ?? `/personalidades/${person.slug}`, image: person.image ? { src: person.image.src, alt: person.image.alt } : undefined, label: "Personalidade", aliases: uniq([person.slug, person.fullName, person.originalName]), date: person.updatedAt, keywords: uniq([...person.occupations, ...person.themes, ...person.ideas.map((idea) => idea.title)]) }));
  const organizationItems: GlobalSearchItem[] = studios.map((studio) => ({ id: studio.id, type: "organization", title: studio.name, subtitle: studio.specialties.join(", "), description: studio.summary, href: studio.profilePath!, image: studio.image ? { src: studio.image.src, alt: studio.image.alt } : undefined, label: "Estúdio", aliases: uniq([studio.slug, ...studio.aliases, studio.legalName]), date: studio.updatedAt, keywords: uniq([...studio.specialties, studio.kind, studio.location?.country]) }));
  const productItems: GlobalSearchItem[] = products.map((product) => ({ id: product.id, type: "product", title: product.name, subtitle: product.category, description: product.shortDescription, href: `/produtos/${product.slug}`, image: product.mainImage ? { src: product.mainImage.src, alt: product.mainImage.alt } : undefined, label: "Produto", aliases: uniq([product.slug, ...product.aliases, product.line]), date: product.updatedAt, keywords: uniq([product.category, product.subcategory, ...product.categories, ...product.tags]) }));
  const serviceItems: GlobalSearchItem[] = [...services.map((service) => ({ id: `service-${service.slug}`, type: "service" as const, title: service.title, description: service.summary, href: `${servicesPage.path}/${service.slug}`, label: "Serviço", aliases: [service.slug], keywords: uniq([...(service.tags ?? []), service.badge, service.audience]) })), ...serviceLandings.map((service) => ({ id: service.id, type: "service" as const, title: service.seo.title, description: service.seo.description, href: `${servicesPage.path}/${service.slug}`, label: "Serviço", aliases: [service.slug], keywords: [service.slug] }))];
  const ideaItems: GlobalSearchItem[] = ideas.map((idea) => ({ id: `idea-${idea.id}`, type: "idea", title: idea.title, description: idea.description, href: `/ideias/${idea.slug}`, label: "Ideia", aliases: [idea.slug], date: idea.updatedAt, keywords: uniq([...idea.categories, ...idea.tags]) }));
  return [...staticPages, ...personalityItems, ...organizationItems, ...readingItems, ...productItems, ...serviceItems, ...ideaItems, ...articleItems];
}
