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

export function getStrategicBlogPosts(posts = getAllBlogPosts()) {
  const filteredPosts = posts.filter(isStrategicBlogPost);
  const pool = filteredPosts.length > 0 ? filteredPosts : posts;

  return [...pool].sort((left, right) => getStrategicScore(right) - getStrategicScore(left));
}

export function getFeaturedBlogPosts(limit = 3, posts = getStrategicBlogPosts()) {
  const featuredPosts = posts.filter((post) => post.metadata.featured);
  const pool = featuredPosts.length >= limit ? featuredPosts : posts;

  return pool.slice(0, limit);
}
