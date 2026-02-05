import { getPosts } from "@/utils/utils";
import { baseURL, blog, person } from "@/resources";

export const revalidate = 3600;

function toRfc2822(date: string) {
  const dt = new Date(date);
  return dt.toUTCString();
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getPosts(["src", "app", "blog", "posts"]);
  const items = posts
    .map((post) => {
      const title = post.metadata.title;
      const description = post.metadata.summary ?? post.metadata.title;
      const link = `${baseURL}${blog.path}/${post.slug}`;
      const pubDate = post.metadata.publishedAt ? toRfc2822(post.metadata.publishedAt) : undefined;
      return {
        title,
        description,
        link,
        guid: link,
        pubDate,
      };
    })
    .filter((item) => item.title && item.link);

  const lastBuildDate = posts[0]?.metadata?.publishedAt
    ? toRfc2822(posts[0].metadata.publishedAt)
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(blog.title)}</title>
    <link>${baseURL}${blog.path}</link>
    <description>${escapeXml(blog.description)}</description>
    <language>pt-BR</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <managingEditor>${person.email} (${escapeXml(person.name)})</managingEditor>
    ${items
      .map((item) => {
        return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      ${item.pubDate ? `<pubDate>${item.pubDate}</pubDate>` : ""}
      <description><![CDATA[${item.description}]]></description>
    </item>`;
      })
      .join("")}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}