import { NextResponse } from "next/server";

const OWNER = process.env.GITHUB_OWNER!;
const REPO = process.env.GITHUB_REPO!;
const BRANCH = process.env.GITHUB_DEFAULT_BRANCH || "main";
const TOKEN = process.env.GITHUB_TOKEN!;

type Body = {
  slug: string;           // associa a pasta do post
  filename: string;       // "foto-01.jpg"
  dataUrl: string;        // "data:image/jpeg;base64,...."
  commitMessage?: string;
};

function extractBase64(dataUrl: string) {
  // "data:image/png;base64,AAAA..."
  const idx = dataUrl.indexOf("base64,");
  if (idx === -1) throw new Error("Formato dataUrl inválido");
  return dataUrl.slice(idx + 7);
}

export async function POST(req: Request) {
  const b = (await req.json()) as Body;
  if (!b.slug || !b.filename || !b.dataUrl) {
    return NextResponse.json({ error: "slug, filename, dataUrl obrigatórios" }, { status: 400 });
  }
  const base64 = extractBase64(b.dataUrl);

  const path = `public/images/posts/${b.slug}/${b.filename}`;
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
        message: b.commitMessage || `media(blog): add ${b.slug}/${b.filename}`,
        content: base64,
        branch: BRANCH,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json({ error: "GitHub media PUT falhou", details: text }, { status: 500 });
  }

  // Caminho público para usar no MDX:
  const publicPath = `/images/posts/${b.slug}/${b.filename}`;
  return NextResponse.json({ ok: true, src: publicPath });
}
