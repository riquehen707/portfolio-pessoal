import type { MetadataRoute } from "next";

import { baseURL, blog, routes as routesConfig } from "@/resources";
import { getAllArticles } from "@/data/articles";
import { getPublishedMovies } from "@/data/movies";
import { getPublishedGames } from "@/data/games";
import { getPublishedBooks, getPublishedComics } from "@/data/reading";
import { getPublishedPersonalities } from "@/data/personalities";
import { getPublishedStudios } from "@/data/organizations";
import { getPublishedSeries } from "@/data/series";
import { getPublishedIdeas } from "@/data/ideas";
import { isPausedRoute } from "@/config/routePolicy";

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
  const gamePages = (await getPublishedGames()).map((game) => ({
    url: `${baseURL}/jogos/${game.slug}`,
    lastModified: game.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.66,
  }));
  const readingPages = (await getPublishedBooks()).map((work) => ({ url:`${baseURL}/livros/${work.slug}`,lastModified:work.updatedAt,changeFrequency:"monthly" as const,priority:0.62 }));
  const comicPages = (await getPublishedComics()).map((work) => ({ url:`${baseURL}/quadrinhos/${work.slug}`,lastModified:work.updatedAt,changeFrequency:"monthly" as const,priority:0.62 }));
  const personalityPages = getPublishedPersonalities().map((person) => ({ url:`${baseURL}${person.profilePath}`,lastModified:person.updatedAt,changeFrequency:"monthly" as const,priority:0.66 }));
  const studioPages = getPublishedStudios().map((studio) => ({ url:`${baseURL}${studio.profilePath}`,lastModified:studio.updatedAt,changeFrequency:"monthly" as const,priority:0.74 }));
  const seriesPages = (await getPublishedSeries()).map((series) => ({
    url: `${baseURL}/series/${series.slug}`,
    lastModified: series.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.64,
  }));
  const ideaPages = (await getPublishedIdeas()).map((idea) => ({
    url: `${baseURL}/ideias/${idea.slug}`,
    lastModified: idea.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.68,
  }));

  const routePriorities: Record<string, number> = {
    "/": 1,
    [blog.path]: 0.86,
    "/ideias": 0.8,
    [`${blog.path}/seo`]: 0.78,
    [`${blog.path}/seo/entender-a-busca`]: 0.76,
    [`${blog.path}/cultura`]: 0.78,
    "/filmes": 0.76,
    "/jogos": 0.78,
    "/series": 0.76,
    "/livros": 0.76,
    "/quadrinhos": 0.76,
    "/personalidades": 0.74,
    "/estudios": 0.74,
  };

  const routes = Object.keys(routesConfig)
    .filter(
      (route) =>
        routesConfig[route as keyof typeof routesConfig] && !isPausedRoute(route),
    )
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
    ...gamePages,
    ...readingPages,
    ...comicPages,
    ...personalityPages,
    ...studioPages,
    ...seriesPages,
    ...ideaPages,
    ...blogPosts,
    { url: `${baseURL}/obras/puparia`, lastModified: "2026-08-12", changeFrequency: "monthly" as const, priority: 0.72 },
    { url: `${baseURL}/obras/wade`, lastModified: "2026-08-12", changeFrequency: "monthly" as const, priority: 0.72 },
    { url: `${baseURL}/criadores/shingo-tamagawa`, lastModified: "2026-08-12", changeFrequency: "monthly" as const, priority: 0.68 },
  ];
}
