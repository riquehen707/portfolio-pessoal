import {
  getAllBlogPosts,
  getBlogCollectionIndex,
  getBlogPostFormat,
  getBlogPrimaryCategory,
} from "@/app/blog/postData";
import { blog, home } from "@/resources";

export type GlobalSearchItemType = "article" | "topic" | "page";

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
      id: "page-blog-topics",
      title: "Temas do blog",
      description: "Artigos agrupados por problema para navegar com mais contexto.",
      href: `${blog.path}/temas`,
      keywords: ["temas", "categorias", "guias", "blog"],
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

  return [...staticPages, ...articleItems, ...topicItems];
}
