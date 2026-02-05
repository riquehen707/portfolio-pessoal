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
  diary?: {
    mood?: string;
    energy?: string;
    focus?: string;
    wins?: string[];
    blockers?: string[];
    learnings?: string[];
    metrics?: string[];
    next?: string[];
  };
};

export type BlogFile = {
  slug: string;
  content: string;
  metadata: Frontmatter;
};

export function getAllPosts(dir: string[] = ["src", "app", "blog", "posts"]): BlogFile[] {
  return getPosts(dir);
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

export function getAllTags(posts?: BlogFile[]) {
  const list = posts ?? getAllPosts();
  const set = new Set<string>();
  for (const p of list) resolveTags(p.metadata).forEach((t) => set.add(t));
  return Array.from(set).sort();
}

export function getAllCategories(posts?: BlogFile[]) {
  const list = posts ?? getAllPosts();
  const set = new Set<string>();
  for (const p of list) resolveCategories(p.metadata).forEach((c) => set.add(c));
  return Array.from(set).sort();
}

export function getPostsByTag(tag: string, posts?: BlogFile[]) {
  const list = posts ?? getAllPosts();
  return sortByDateDesc(list.filter((p) => resolveTags(p.metadata).includes(tag)));
}

export function getPostsByCategory(category: string, posts?: BlogFile[]) {
  const list = posts ?? getAllPosts();
  return sortByDateDesc(list.filter((p) => resolveCategories(p.metadata).includes(category)));
}
