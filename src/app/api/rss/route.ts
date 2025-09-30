// src/app/api/rss/route.ts
import { NextResponse } from "next/server";
import { getPosts } from "@/utils/utils";
import { baseURL, blog, person } from "@/resources";

export const dynamic = "force-static";
export const revalidate = 600; // 10 min

function xmlEscape(s: string = ""): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function ensureAbsolute(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  try {
    // já é absoluta?
    new URL(url);
    return url;
  } catch {
    // torna absoluta em relação ao baseURL
    try {
      return new URL(url, baseURL).toString();
    } catch {
      return undefined;
    }
  }
}

function imageMimeType(url?: string): string | undefined {
  if (!url) return;
  const u = url.split("?")[0].toLowerCase();
  if (u.endsWith(".jpg") || u.endsWith(".jpeg")) return "image/jpeg";
  if (u.endsWith(".png")) return "image/png";
  if (u.endsWith(".webp")) return "image/webp";
  if (u.endsWith(".gif")) return "image/gif";
  if (u.endsWith(".svg")) return "image/svg+xml";
  return "image/jpeg";
}

export async function GET() {
  const all = getPosts(["src", "app", "blog", "posts"]);

  // filtra posts sem data e ordena do mais novo para o mais antigo
  const posts = all
    .filter((p) => !!p?.metadata?.publishedAt)
    .sort((a, b) => {
      const da = new Date(a.metadata.publishedAt).getTime() || 0;
      const db = new Date(b.metadata.publishedAt).getTime() || 0;
      return db - da;
    });

  const feedLink = `${baseURL}/blog`;
  const selfLink = `${baseURL}/api/rss`;

  const lastBuildDate =
    posts.length > 0
      ? new Date(posts[0].metadata.publishedAt).toUTCString()
      : new Date().toUTCString();

  // monta itens
  const itemsXml = posts
    .map((post) => {
      const itemUrl = `${baseURL}/blog/${post.slug}`;
      const guid = itemUrl;
      const title = xmlEscape(post.metadata.title || "Sem título");
      const summary = post.metadata.summary || "";
      const pubDate = new Date(post.metadata.publishedAt).toUTCString();

      // imagem do post (absoluta) e tipo
      const rawImg = post.metadata.image || "";
      const absImg = ensureAbsolute(rawImg);
      const enclosureType = imageMimeType(absImg);

      // categoria (se houver)
      const category =
        post.metadata.tag ? `<category>${xmlEscape(post.metadata.tag)}</category>` : "";

      const enclosure =
        absImg && enclosureType
          ? `<enclosure url="${xmlEscape(absImg)}" type="${xmlEscape(enclosureType)}" />`
          : "";

      // autor
      const authorEmail = person.email || "noreply@example.com";
      const author = `${authorEmail} (${person.name})`;

      return `
    <item>
      <title>${title}</title>
      <link>${xmlEscape(itemUrl)}</link>
      <guid isPermaLink="true">${xmlEscape(guid)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description><![CDATA[${summary}]]></description>
      ${category}
      ${enclosure}
      <author>${xmlEscape(author)}</author>
    </item>`;
    })
    .join("");

  const channelImageUrl = ensureAbsolute(person.avatar || "/images/avatar.jpg")!;
  const channelTitle = xmlEscape(blog.title);
  const channelDesc = xmlEscape(blog.description);

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${channelTitle}</title>
    <link>${xmlEscape(feedLink)}</link>
    <description>${channelDesc}</description>
    <language>pt-BR</language>
    <docs>https://validator.w3.org/feed/docs/rss2.html</docs>
    <ttl>60</ttl>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${xmlEscape(selfLink)}" rel="self" type="application/rss+xml" />
    <managingEditor>${xmlEscape(person.email || "noreply@example.com")} (${xmlEscape(
    person.name
  )})</managingEditor>
    <webMaster>${xmlEscape(person.email || "noreply@example.com")} (${xmlEscape(
    person.name
  )})</webMaster>
    <image>
      <url>${xmlEscape(channelImageUrl)}</url>
      <title>${channelTitle}</title>
      <link>${xmlEscape(feedLink)}</link>
    </image>
    ${itemsXml}
  </channel>
</rss>`.trim();

  // ETag simples (hash rápida)
  const etag = `"${Buffer.from(rss).toString("base64url").slice(0, 27)}"`;

  return new NextResponse(rss, {
    status: 200,
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      ETag: etag,
    },
  });
}
