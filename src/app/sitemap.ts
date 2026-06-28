import type { MetadataRoute } from "next";

import { getBlogCollectionIndex } from "@/app/blog/postData";
import { baseURL, blog, routes as routesConfig } from "@/resources";
import { getPosts } from "@/utils/utils";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split("T")[0];

  const blogPosts = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}${blog.path}/${post.slug}`,
    lastModified: post.metadata.updatedAt || post.metadata.publishedAt || today,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const blogTopics = getBlogCollectionIndex().map((topic) => ({
    url: `${baseURL}${blog.path}/temas/${topic.slug}`,
    lastModified: today,
    changeFrequency: "monthly" as const,
    priority: 0.68,
  }));

  const routePriorities: Record<string, number> = {
    "/": 1,
    [blog.path]: 0.86,
    [`${blog.path}/temas`]: 0.74,
  };

  const routes = Object.keys(routesConfig)
    .filter((route) => routesConfig[route as keyof typeof routesConfig])
    .map((route) => ({
      url: `${baseURL}${route !== "/" ? route : ""}`,
      lastModified: today,
      changeFrequency: route === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: routePriorities[route] ?? 0.7,
    }));

  return [
    ...routes,
    {
      url: `${baseURL}/rss.xml`,
      lastModified: today,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    },
    ...blogTopics,
    ...blogPosts,
  ];
}
