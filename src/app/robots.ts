import type { MetadataRoute } from "next";

import { baseURL } from "@/resources";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/abordagem-tecnica",
          "/aulas-particulares",
          "/blog/categorias",
          "/blog/temas",
          "/contact",
          "/mapa",
          "/modelos",
          "/publicos",
          "/saiba-mais",
          "/simulacao",
          "/trilhas",
        ],
      },
    ],
    host: baseURL,
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
