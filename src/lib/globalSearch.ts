import { getAllBlogPosts, getBlogPostFormat, getBlogPrimaryCategory } from "@/app/blog/postData";
import { seoLibraryPath, understandSearchBookPath } from "@/app/blog/seo/seoLibraryData";
import { blog, home } from "@/resources";

export type GlobalSearchItemType = "article" | "page";

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
      keywords: ["inicio", "biblioteca", "blog", "artigos"],
    }),
    pageItem({
      id: "page-blog",
      title: blog.title,
      description: blog.description,
      href: blog.path,
      keywords: ["blog", "artigos", "guias", "biblioteca"],
    }),
    pageItem({
      id: "page-seo-library",
      title: "Biblioteca de SEO",
      description:
        "Aprenda como a busca funciona, construa estratégias melhores e desenvolva competências profissionais em SEO.",
      href: seoLibraryPath,
      keywords: [
        "seo",
        "busca",
        "otimização",
        "livros",
        "indexação",
        "relevância",
        "search console",
      ],
    }),
    pageItem({
      id: "page-seo-book-understand-search",
      title: "Entender a busca",
      description:
        "Livro introdutório sobre descoberta, rastreamento, indexação, intenção, classificação e arquitetura de sites.",
      href: understandSearchBookPath,
      keywords: [
        "seo",
        "livro de seo",
        "mecanismos de busca",
        "rastreamento",
        "indexação",
        "ranking",
        "intenção de busca",
      ],
    }),
    pageItem({
      id: "page-culture",
      title: "Cultura",
      description:
        "Perfis editoriais para entender pensadores, estúdios, obras e movimentos com contexto e fontes.",
      href: "/blog/cultura",
      keywords: [
        "cultura",
        "filosofia",
        "cinema",
        "animação",
        "Friedrich Nietzsche",
        "Studio Ghibli",
      ],
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
        post.metadata.primaryKeyword,
        ...(post.metadata.secondaryKeywords ?? []),
        excerpt(post.content, 320),
      ]),
    };
  });

  return [...staticPages, ...articleItems];
}
