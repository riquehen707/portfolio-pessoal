import type { MetadataRoute } from "next";

import { baseURL, blog, routes as routesConfig } from "@/resources";
import { getAllArticles } from "@/data/articles";
import { getPublishedMovies } from "@/data/movies";
import { getPublishedBooks, getPublishedComics } from "@/data/reading";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString().split("T")[0];

  const blogPosts = getAllArticles().map((post) => ({
    url: `${baseURL}${blog.path}/${post.slug}`,
    lastModified: post.metadata.updatedAt || post.metadata.publishedAt || today,
    changeFrequency: "monthly" as const,
    priority: 0.72,
  }));

  const moviePages = (await getPublishedMovies()).map((movie) => ({
    url: `${baseURL}/filmes/${movie.slug}`,
    lastModified: movie.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.64,
  }));
  const readingPages = (await getPublishedBooks()).map((work) => ({ url:`${baseURL}/livros/${work.slug}`,lastModified:work.updatedAt,changeFrequency:"monthly" as const,priority:0.62 }));
  const comicPages = (await getPublishedComics()).map((work) => ({ url:`${baseURL}/quadrinhos/${work.slug}`,lastModified:work.updatedAt,changeFrequency:"monthly" as const,priority:0.62 }));

  const routePriorities: Record<string, number> = {
    "/": 1,
    [blog.path]: 0.86,
    [`${blog.path}/seo`]: 0.78,
    [`${blog.path}/seo/entender-a-busca`]: 0.76,
    [`${blog.path}/cultura`]: 0.78,
    "/filmes": 0.76,
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
    ...moviePages,
    ...readingPages,
    ...comicPages,
    ...blogPosts,
    { url: `${baseURL}/estudios/studio-ghibli`, lastModified: "2026-08-13", changeFrequency: "monthly" as const, priority: 0.76 },
    { url: `${baseURL}/estudios/aardman`, lastModified: "2026-08-13", changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${baseURL}/estudios/science-saru`, lastModified: "2026-08-13", changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${baseURL}/estudios/kyoto-animation`, lastModified: "2026-08-13", changeFrequency: "monthly" as const, priority: 0.75 },
    { url: `${baseURL}/estudios/laika`, lastModified: "2026-08-13", changeFrequency: "monthly" as const, priority: 0.74 },
    { url: `${baseURL}/estudios/team-cherry`, lastModified: "2026-08-12", changeFrequency: "monthly" as const, priority: 0.74 },
    { url: `${baseURL}/estudios/cartoon-saloon`, lastModified: "2026-08-13", changeFrequency: "monthly" as const, priority: 0.74 },
    { url: `${baseURL}/obras/puparia`, lastModified: "2026-08-12", changeFrequency: "monthly" as const, priority: 0.72 },
    { url: `${baseURL}/obras/wade`, lastModified: "2026-08-12", changeFrequency: "monthly" as const, priority: 0.72 },
    { url: `${baseURL}/criadores/shingo-tamagawa`, lastModified: "2026-08-12", changeFrequency: "monthly" as const, priority: 0.68 },
  ];
}
