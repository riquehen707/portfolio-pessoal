import { NextResponse } from "next/server";

const OWNER = process.env.GITHUB_OWNER!;
const REPO = process.env.GITHUB_REPO!;
const BRANCH = process.env.GITHUB_DEFAULT_BRANCH || "main";
const TOKEN = process.env.GITHUB_TOKEN!;

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
  const { slug, commitMessage } = await req.json();
  if (!slug) return NextResponse.json({ error: "slug é obrigatório" }, { status: 400 });

  const path = `src/app/blog/posts/${slug}.mdx`;
  const sha = await getFileSha(path);
  if (!sha) return NextResponse.json({ error: "arquivo não encontrado" }, { status: 404 });

  const res = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodeURIComponent(path)}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        "User-Agent": "mp-admin",
      },
      body: JSON.stringify({
        message: commitMessage || `chore(blog): delete ${slug}`,
        sha,
        branch: BRANCH,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: "GitHub DELETE falhou", details: text }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
