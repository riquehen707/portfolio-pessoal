import { getPosts } from "@/utils/utils";

export type Frontmatter = {
  title: string;
  summary?: string;
  image?: string;
  tag?: string;        // legado
  tags?: string[];     // preferível
  categories?: string[];
  publishedAt?: string;
  updatedAt?: string;
  team?: Array<{ name?: string; url?: string; avatar?: string }>;
};

export type BlogFile = {
  slug: string;
  content: string;
  metadata: Frontmatter;
};

export function getAllPosts(): BlogFile[] {
  return getPosts(["src", "app", "blog", "posts"]);
}

export function resolveTags(m: Frontmatter): string[] {
  if (m.tags && m.tags.length) return m.tags;
  if (m.tag) return [m.tag];
  return [];
}

export function resolveCategories(m: Frontmatter): string[] {
  return m.categories || [];
}

export function sortByDateDesc(arr: BlogFile[]) {
  return [...arr].sort((a, b) => {
    const at = new Date(a.metadata.publishedAt || 0).getTime();
    const bt = new Date(b.metadata.publishedAt || 0).getTime();
    return bt - at;
  });
}

export function getAllTags() {
  const set = new Set<string>();
  for (const p of getAllPosts()) resolveTags(p.metadata).forEach((t) => set.add(t));
  return Array.from(set).sort();
}

export function getAllCategories() {
  const set = new Set<string>();
  for (const p of getAllPosts()) resolveCategories(p.metadata).forEach((c) => set.add(c));
  return Array.from(set).sort();
}

export function getPostsByTag(tag: string) {
  return sortByDateDesc(getAllPosts().filter((p) => resolveTags(p.metadata).includes(tag)));
}

export function getPostsByCategory(category: string) {
  return sortByDateDesc(getAllPosts().filter((p) => resolveCategories(p.metadata).includes(category)));
}
