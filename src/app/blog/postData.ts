import { cache } from "react";

import { type BlogFile, getPosts } from "@/utils/utils";

const BLOG_POSTS_PATH = ["src", "app", "blog", "posts"] as const;

export const strategicBlogCategories = [
  "Negocios locais",
  "Marketing",
  "Design",
  "Operacao",
  "Tecnologia",
  "Growth",
] as const;

const strategicCategorySet = new Set<string>(strategicBlogCategories);

type TaxonomyCount = {
  key: string;
  count: number;
};

export const getAllBlogPosts = cache(() => getPosts([...BLOG_POSTS_PATH]));

export function getBlogPrimaryCategory(post: BlogFile) {
  return (
    post.metadata.category ??
    post.metadata.categories?.find((category) => strategicCategorySet.has(category)) ??
    post.metadata.categories?.[0] ??
    post.metadata.tag
  );
}

export function isStrategicBlogPost(post: BlogFile) {
  if (post.metadata.featured) {
    return true;
  }

  return Boolean(post.metadata.categories?.some((category) => strategicCategorySet.has(category)));
}

function sortBlogPostsByDate(posts: BlogFile[]) {
  return [...posts].sort((left, right) => {
    const leftDate = new Date(left.metadata.updatedAt ?? left.metadata.publishedAt ?? 0).getTime();
    const rightDate = new Date(right.metadata.updatedAt ?? right.metadata.publishedAt ?? 0).getTime();

    return rightDate - leftDate;
  });
}

function getDateScore(post: BlogFile) {
  const timestamp = new Date(post.metadata.updatedAt ?? post.metadata.publishedAt ?? 0).getTime();
  return Number.isFinite(timestamp) ? timestamp / 1_000_000_000_000 : 0;
}

function getStrategicScore(post: BlogFile) {
  const featuredBoost = post.metadata.featured ? 80 : 0;
  const summaryBoost = post.metadata.summary ? 10 : 0;
  const imageBoost = post.metadata.image || post.metadata.images?.length ? 6 : 0;
  const categoryBoost = (post.metadata.categories ?? []).filter((category) =>
    strategicCategorySet.has(category),
  ).length * 4;
  const readingTimeBoost = post.metadata.readingTime ? Math.min(post.metadata.readingTime, 8) : 0;

  return featuredBoost + summaryBoost + imageBoost + categoryBoost + readingTimeBoost + getDateScore(post);
}

function countTaxonomy(values: string[]) {
  const counts = new Map<string, number>();

  values.forEach((value) => {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  });

  return [...counts.entries()]
    .map(([key, count]) => ({ key, count }))
    .sort((left, right) => right.count - left.count || left.key.localeCompare(right.key));
}

export function getRecentBlogPosts(limit = 6, posts = getAllBlogPosts()) {
  return sortBlogPostsByDate(posts).slice(0, limit);
}

export function getStrategicBlogPosts(posts = getAllBlogPosts()) {
  const filteredPosts = posts.filter(isStrategicBlogPost);
  const pool = filteredPosts.length > 0 ? filteredPosts : posts;

  return [...pool].sort((left, right) => getStrategicScore(right) - getStrategicScore(left));
}

export function getBusinessBlogPosts(limit = 4, posts = getAllBlogPosts()) {
  return getStrategicBlogPosts(posts).slice(0, limit);
}

export function getPersonalBlogPosts(limit = 4, posts = getAllBlogPosts()) {
  const personalPosts = posts.filter((post) => !isStrategicBlogPost(post));
  const pool = personalPosts.length > 0 ? personalPosts : posts;

  return sortBlogPostsByDate(pool).slice(0, limit);
}

export function getFeaturedBlogPosts(limit = 3, posts = getStrategicBlogPosts()) {
  const featuredPosts = posts.filter((post) => post.metadata.featured);
  const pool = featuredPosts.length >= limit ? featuredPosts : posts;

  return pool.slice(0, limit);
}

export function getBlogCategoryCounts(posts = getAllBlogPosts()): TaxonomyCount[] {
  const values = posts.flatMap((post) =>
    Array.from(
      new Set(
        [post.metadata.category, ...(post.metadata.categories ?? [])].filter(Boolean) as string[],
      ),
    ),
  );

  return countTaxonomy(values);
}

export function getBlogTagCounts(limit = 18, posts = getAllBlogPosts()): TaxonomyCount[] {
  const values = posts.flatMap((post) =>
    Array.from(
      new Set([post.metadata.tag, ...(post.metadata.tags ?? [])].filter(Boolean) as string[]),
    ),
  );

  return countTaxonomy(values).slice(0, limit);
}
