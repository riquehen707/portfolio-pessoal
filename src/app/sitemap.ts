import { getPosts } from "@/utils/utils";
import { baseURL, routes as routesConfig } from "@/resources";

export default async function sitemap() {
  const blogs = getPosts(["src", "app", "blog", "posts"]).map((post) => ({
    url: `${baseURL}/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const works = getPosts(["src", "app", "work", "projects"]).map((post) => ({
    url: `${baseURL}/work/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const diarios = getPosts(["src", "app", "diario", "posts"]).map((post) => ({
    url: `${baseURL}/diario/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  const activeRoutes = Object.keys(routesConfig).filter(
    (route) => routesConfig[route as keyof typeof routesConfig],
  );

  const routes = activeRoutes
    .filter((route) => !route.startsWith("/admin") && !route.startsWith("/auth") && !route.startsWith("/conta"))
    .map((route) => ({
      url: `${baseURL}${route !== "/" ? route : ""}`,
      lastModified: new Date().toISOString().split("T")[0],
    }));

  const feeds = [
    { url: `${baseURL}/rss.xml`, lastModified: new Date().toISOString().split("T")[0] },
    { url: `${baseURL}/diario/rss.xml`, lastModified: new Date().toISOString().split("T")[0] },
  ];

  return [...routes, ...feeds, ...blogs, ...diarios, ...works];
}
