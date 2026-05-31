import { type MetadataRoute } from "next";

import { getBlogCollectionIndex } from "@/app/blog/postData";
import { demoRegistry } from "@/features/demos/data/demo-registry";
import { demoSegments } from "@/features/demos/data/demo-segments";
import { publicTrailAreas } from "@/lib/knowledgeConfig";
import { getPosts } from "@/utils/utils";
import {
  baseURL,
  audiencePages,
  productsPage,
  routes as routesConfig,
  services,
  servicesPage,
  simulationPage,
} from "@/resources";

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

  const blogTopics = getBlogCollectionIndex().map((topic) => ({
    url: `${baseURL}/blog/temas/${topic.slug}`,
    lastModified: today,
    changeFrequency: "monthly" as const,
    priority: 0.68,
  }));

  const routePriorities: Record<string, number> = {
    "/": 1,
    "/work": 0.9,
    "/blog": 0.86,
    "/blog/temas": 0.74,
    "/mapa": 0.82,
    "/trilhas": 0.78,
    "/modelos": 0.7,
    "/contact": 0.88,
    "/about": 0.82,
    "/servicos": 0.84,
    [simulationPage.path]: 0.86,
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

  const audienceLandings = audiencePages.map((audience) => ({
    url: `${baseURL}${audience.path}`,
    lastModified: today,
    changeFrequency: "monthly" as const,
    priority: 0.78,
  }));

  const feeds = [
    {
      url: `${baseURL}/rss.xml`,
      lastModified: today,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    },
  ];

  const trailRoutes = publicTrailAreas.map((area) => ({
    url: `${baseURL}${area.path}`,
    lastModified: today,
    changeFrequency: "monthly" as const,
    priority: 0.76,
  }));

  const demoSegmentRoutes = demoSegments
    .filter((segment) => segment.indexable)
    .map((segment) => ({
      url: `${baseURL}/modelos/${segment.slug}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.62,
    }));

  const demoRoutes = demoRegistry
    .filter((demo) => demo.indexable)
    .map((demo) => ({
      url: `${baseURL}${demo.route}`,
      lastModified: today,
      changeFrequency: "monthly" as const,
      priority: 0.56,
    }));

  return [
    ...routes,
    ...trailRoutes,
    ...demoSegmentRoutes,
    ...demoRoutes,
    ...feeds,
    ...audienceLandings,
    ...serviceLandings,
    ...blogs,
    ...blogTopics,
    ...works,
  ];
}
