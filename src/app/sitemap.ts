import { type MetadataRoute } from "next";

import { getPosts } from "@/utils/utils";
import { baseURL, productsPage, routes as routesConfig, services, servicesPage } from "@/resources";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split("T")[0];

  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.updatedAt || post.metadata.publishedAt || today,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.updatedAt || post.metadata.publishedAt || today,
    changeFrequency: "monthly" as const,
    priority: 0.76,
  }));

  const routePriorities: Record<string, number> = {
    "/": 1,
    "/work": 0.9,
    "/blog": 0.86,
    "/contact": 0.88,
    "/about": 0.82,
    "/servicos": 0.84,
    [productsPage.path]: 0.8,
  };

  const routes = Object.keys(routesConfig)
    .filter((route) => routesConfig[route as keyof typeof routesConfig])
    .map((route) => ({
      url: `${baseURL}${route !== "/" ? route : ""}`,
      lastModified: today,
      changeFrequency: route === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: routePriorities[route] ?? 0.7,
    }));

  const serviceLandings = services.map((service) => ({
    url: `${baseURL}${servicesPage.path}/${service.slug}`,
    lastModified: today,
    changeFrequency: "monthly" as const,
    priority: 0.74,
  }));

  const feeds = [
    {
      url: `${baseURL}/rss.xml`,
      lastModified: today,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    },
  ];

  return [...routes, ...feeds, ...serviceLandings, ...blogs, ...works];
}
