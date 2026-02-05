import { baseURL } from "@/resources";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/admin", "/conta", "/auth"],
      },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
