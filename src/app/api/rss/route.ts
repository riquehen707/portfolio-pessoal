import { NextResponse } from "next/server";
import { baseURL, home } from "@/resources";

// Evita prerender/SSG dessa API e força execução em runtime
export const dynamic = "force-dynamic";
export const revalidate = 0;

// Helpers seguros
const toStr = (v: unknown, fallback = ""): string => {
  if (typeof v === "string") return v;
  if (v == null) return fallback;
  try {
    // stringify simples pra evitar [object Object]
    if (Array.isArray(v)) return v.map((x) => String(x ?? "")).join(", ");
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  } catch {
    return fallback;
  }
};

const xmlEscape = (s: string) =>
  toStr(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// TODO: troque por sua origem real (ex.: getAllPosts())
type Post = {
  title?: string;
  description?: string;
  slug?: string;           // ex.: "meu-post"
  url?: string;            // se já vier absoluto
  date?: string | Date;    // ISO ou Date
};

async function getPostsSafe(): Promise<Post[]> {
  // Retorna vazio por padrão para não quebrar build.
  // Plugar depois:
  // const posts = await getAllPosts();
  // return posts;
  return [];
}

export async function GET() {
  try {
    const site = baseURL.replace(/\/+$/, "");
    const title = toStr(home?.title, "Blog");
    const description = toStr(home?.description, "Feed RSS");
    const posts = await getPostsSafe();

    const items = posts.map((p) => {
      const t = xmlEscape(toStr(p.title, "Sem título"));
      const d = xmlEscape(toStr(p.description, ""));
      // monta URL segura: se já vier absoluta, usa; senão, junta base + /blog/slug
      const slug = toStr(p.slug, "").replace(/^\/+/, "");
      const provided = toStr(p.url, "");
      const link = provided.startsWith("http")
        ? provided
        : `${site}${slug ? `/blog/${slug}` : ""}`;
      const pubDate = new Date(
        typeof p.date === "string" || p.date instanceof Date ? p.date : Date.now()
      ).toUTCString();

      return `
        <item>
          <title>${t}</title>
          <link>${xmlEscape(link)}</link>
          <guid>${xmlEscape(link)}</guid>
          ${d ? `<description>${d}</description>` : ""}
          <pubDate>${pubDate}</pubDate>
        </item>`;
    });

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${xmlEscape(title)}</title>
    <link>${xmlEscape(site)}</link>
    <description>${xmlEscape(description)}</description>
    ${items.join("\n")}
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: { "Content-Type": "application/rss+xml; charset=UTF-8" },
    });
  } catch (e) {
    // Em caso de erro, responde um feed mínimo válido (não quebra build)
    const fallback = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${xmlEscape(toStr(home?.title, "Blog"))}</title>
<link>${xmlEscape(baseURL)}</link>
<description>${xmlEscape(toStr(home?.description, "Feed RSS"))}</description>
</channel></rss>`;
    return new NextResponse(fallback, {
      headers: { "Content-Type": "application/rss+xml; charset=UTF-8" },
      status: 200,
    });
  }
}
