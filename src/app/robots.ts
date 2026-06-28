import type { MetadataRoute } from "next";

import { baseURL } from "@/resources";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/about",
          "/abordagem-tecnica",
          "/aulas-particulares",
          "/contact",
          "/mapa",
          "/modelos",
          "/publicos",
          "/saiba-mais",
          "/servicos",
          "/simulacao",
          "/trilhas",
          "/work",
        ],
      },
    ],
    host: baseURL,
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
