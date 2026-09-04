import type { MetadataRoute } from "next";

import { baseURL } from "@/resources";
import { pausedRoutePaths } from "@/config/routePolicy";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: pausedRoutePaths,
      },
    ],
    host: baseURL,
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
