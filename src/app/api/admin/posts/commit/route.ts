import { NextResponse } from "next/server";

const OWNER = process.env.GITHUB_OWNER!;
const REPO = process.env.GITHUB_REPO!;
const BRANCH = process.env.GITHUB_DEFAULT_BRANCH || "main";
const TOKEN = process.env.GITHUB_TOKEN!;

type Body = {
  slug: string;                 // "meu-post"
  title: string;
  summary?: string;
  image?: string;               // ex.: "/images/posts/meu-post/capa.jpg"
  tag?: string;                 // legado (singular)
  tags?: string[];              // preferido (array)
  categories?: string[];        // opcional
  content: string;              // MDX sem frontmatter
  publishedAt?: string;         // ISO
  updatedAt?: string;           // ISO
  commitMessage?: string;
};

function yamlString(v: string) {
  return `"${v.replace(/"/g, '\\"')}"`;
}
function yamlArray(arr?: string[]) {
  if (!arr || !arr.length) return undefined;
  return `[${arr.map((x) => yamlString(x)).join(", ")}]`;
}

function buildMdx(b: Body) {
  const front: (string | null)[] = [
    `---`,
    `title: ${yamlString(b.title)}`,
    b.summary ? `summary: ${yamlString(b.summary)}` : null,
    `publishedAt: ${yamlString(b.publishedAt || new Date().toISOString())}`,
    b.updatedAt ? `updatedAt: ${yamlString(b.updatedAt)}` : null,
    b.image ? `image: ${yamlString(b.image)}` : null,
    // Compat: aceita "tag" singular ou "tags" array (preferível).
    b.tags && b.tags.length ? `tags: ${yamlArray(b.tags)}` : b.tag ? `tag: ${yamlString(b.tag)}` : null,
    b.categories && b.categories.length ? `categories: ${yamlArray(b.categories)}` : null,
    `---`,
    ``,
  ];
  return front.filter(Boolean).join("\n") + b.content.trim() + "\n";
}

async function getFileSha(path: string) {
  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}?ref=${BRANCH}`,
    { headers: { Authorization: `Bearer ${TOKEN}`, "User-Agent": "mp-admin" } }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET failed: ${res.status}`);
  const json = await res.json();
  return json.sha as string | null;
}

export async function POST(req: Request) {
  if (!TOKEN) return NextResponse.json({ error: "GITHUB_TOKEN ausente" }, { status: 500 });
  const body = (await req.json()) as Body;
  if (!body.slug || !body.title || !body.content) {
    return NextResponse.json({ error: "slug, title e content são obrigatórios" }, { status: 400 });
  }

  const mdx = buildMdx(body);
  const path = `src/app/blog/posts/${body.slug}.mdx`;
  const sha = await getFileSha(path);

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "mp-admin",
      },
      body: JSON.stringify({
        message: body.commitMessage || (sha ? `chore(blog): update ${body.slug}` : `feat(blog): add ${body.slug}`),
        content: Buffer.from(mdx, "utf8").toString("base64"),
        branch: BRANCH,
        sha: sha || undefined,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: "GitHub PUT falhou", details: text }, { status: 500 });
  }

  // (Opcional) dispara deploy hook da Vercel: configure VERCEL_DEPLOY_HOOK_URL no .env e faça um fetch aqui

  return NextResponse.json({ ok: true, path });
}
