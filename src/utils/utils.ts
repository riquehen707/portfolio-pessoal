// src/utils/utils.ts

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

import { PostFrontmatterSchema } from "@/components/blog/postSchema";

type Team = {
  name?: string;
  role?: string;
  avatar?: string;
  linkedIn?: string;
};

export type Metadata = {
  title: string;

  // datas
  publishedAt?: string;
  updatedAt?: string;

  summary?: string;
  image?: string;
  images?: string[];

  tag?: string;      // legado
  tags?: string[];   // preferível
  categories?: string[];

  // clusters/SEO/editorial
  pillar?: string;
  keywords?: string[];
  canonical?: string;
  language?: string;
  status?: "draft" | "published";
  toc?: boolean;
  tocDepth?: number;
  readingTime?: number;

  // ✅ glossário do post (para hover automático)
  glossary?: Record<string, string>;

  // autor
  team?: Team[];

  // extras editoriais
  faq?: { q: string; a: string }[];
  references?: {
    title: string;
    author?: string;
    year?: number;
    url?: string;
  }[];

  link?: string;
};

export type BlogFile = {
  slug: string;
  content: string;
  metadata: Metadata;
};

// Diretório padrão dos posts
const DEFAULT_DIR = ["src", "app", "blog", "posts"];

function safeListFiles(dir: string): string[] {
  try {
    if (!fs.existsSync(dir)) return [];
    return fs
      .readdirSync(dir)
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return ext === ".mdx" || ext === ".md";
      });
  } catch {
    return [];
  }
}

function coerceDateToString(d: unknown): string | undefined {
  if (!d) return undefined;
  if (typeof d === "string") return d;
  if (d instanceof Date && !isNaN(+d)) return d.toISOString();
  // gray-matter às vezes retorna number (timestamp)
  if (typeof d === "number") {
    const dt = new Date(d);
    if (!isNaN(+dt)) return dt.toISOString();
  }
  return undefined;
}

function normalizeStringArray(x: unknown): string[] | undefined {
  if (!Array.isArray(x)) return undefined;
  const arr = x.filter(Boolean).map(String);
  return arr.length ? arr : undefined;
}

function safeReadFile(filePath: string): BlogFile | null {
  try {
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    // slug inferido pelo nome do arquivo (fallback)
    const inferredSlug = path.basename(filePath, path.extname(filePath));

    // junta frontmatter com fallback de slug
    const fmWithFallback = {
      ...data,
      slug: (data as any).slug ?? inferredSlug,
    };

    // ====== ZOD VALIDATION ======
    let parsed: any;
    try {
      parsed = PostFrontmatterSchema.parse(fmWithFallback);
    } catch (err) {
      console.error(`❌ Frontmatter inválido em: ${filePath}`);
      console.error(err);
      // Se você preferir quebrar o build:
      // throw err;
      return null; // mantém comportamento: falha silenciosa + log
    }

    // normaliza datas (compatível com page.tsx)
    const publishedAt =
      coerceDateToString(parsed.publishedAt) ??
      coerceDateToString(parsed.date) ??
      undefined;

    const updatedAt =
      coerceDateToString(parsed.updatedAt) ??
      coerceDateToString(parsed.updated) ??
      coerceDateToString(parsed.publishedAt) ??
      coerceDateToString(parsed.date) ??
      undefined;

    // compatibilidade: summary/description, tag/tags
    const summary = (parsed.summary ?? parsed.description ?? "").trim();

    const tag = typeof parsed.tag === "string" ? parsed.tag : undefined;

    const tags =
      normalizeStringArray(parsed.tags) ??
      (typeof parsed.tag === "string" ? [parsed.tag] : undefined);

    const categories = normalizeStringArray(parsed.categories);
    const keywords = normalizeStringArray(parsed.keywords);
    const images = normalizeStringArray(parsed.images);
    const faq = Array.isArray(parsed.faq) ? parsed.faq : undefined;
    const references = Array.isArray(parsed.references)
      ? parsed.references
      : undefined;

    const metadata: Metadata = {
      title: parsed.title ?? "",

      publishedAt,
      updatedAt,

      summary,
      image: parsed.image ?? undefined,
      images,

      tag,
      tags,
      categories,

      pillar: parsed.pillar ?? undefined,
      team: Array.isArray(parsed.team) ? parsed.team : undefined,

      keywords,
      canonical: parsed.canonical ?? undefined,
      language: parsed.language ?? undefined,
      status: parsed.status ?? undefined,
      toc: parsed.toc ?? undefined,
      tocDepth: parsed.tocDepth ?? undefined,
      readingTime: parsed.readingTime ?? undefined,

      // ✅ injeta glossary se existir no frontmatter
      glossary:
        parsed.glossary && typeof parsed.glossary === "object"
          ? parsed.glossary
          : undefined,

      faq,
      references,

      link: parsed.link ?? undefined,
    };

    // ✅ respeita slug do frontmatter (se houver), senão usa o inferido
    const slug: string =
      typeof parsed.slug === "string" && parsed.slug.trim()
        ? parsed.slug.trim()
        : inferredSlug;

    return { slug, metadata, content };
  } catch {
    return null;
  }
}

function collectFromDir(dir: string): BlogFile[] {
  const files = safeListFiles(dir);
  const items: BlogFile[] = [];

  for (const file of files) {
    const full = path.join(dir, file);
    const parsed = safeReadFile(full);
    if (!parsed) continue;
    items.push(parsed);
  }

  // Ordena por data desc (quando existir)
  items.sort((a, b) => {
    const ad = a.metadata.publishedAt ? +new Date(a.metadata.publishedAt) : 0;
    const bd = b.metadata.publishedAt ? +new Date(b.metadata.publishedAt) : 0;
    return bd - ad;
  });

  return items;
}

/**
 * Lê posts do diretório informado. Nunca chama notFound().
 * Em caso de erro ou diretório vazio, retorna [].
 */
export function getPosts(customPath: string[] = DEFAULT_DIR): BlogFile[] {
  try {
    const postsDir = path.join(process.cwd(), ...customPath);
    return collectFromDir(postsDir);
  } catch {
    return [];
  }
}