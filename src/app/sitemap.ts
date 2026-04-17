import { getPosts } from "@/utils/utils";
import {
  baseURL,
  freeTools,
  productsPage,
  routes as routesConfig,
  services,
  servicesPage,
} from "@/resources";

export default async function sitemap() {
  const today = new Date().toISOString().split("T")[0];

  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt || today,
  }));

  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt || today,
  }));

  const routes = Object.keys(routesConfig)
    .filter((route) => routesConfig[route as keyof typeof routesConfig])
    .map((route) => ({
      url: `${baseURL}${route !== "/" ? route : ""}`,
      lastModified: today,
    }));

  const serviceLandings = services.map((service) => ({
    url: `${baseURL}${servicesPage.path}/${service.slug}`,
    lastModified: today,
  }));

  const feeds = [{ url: `${baseURL}/rss.xml`, lastModified: today }];
  const products = [{ url: `${baseURL}${productsPage.path}`, lastModified: today }];
  const toolPages = freeTools.map((tool) => ({
    url: `${baseURL}${tool.path}`,
    lastModified: today,
  }));

  return [...routes, ...feeds, ...products, ...toolPages, ...serviceLandings, ...blogs, ...works];
}
