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
  publishedAt?: string;
  updatedAt?: string;
  summary?: string;
  image?: string;
  images?: string[];
  tag?: string;
  tags?: string[];
  categories?: string[];
  kind?: "client" | "personal" | "study";
  stack?: string[];
  pillar?: string;
  keywords?: string[];
  canonical?: string;
  language?: string;
  status?: "draft" | "published";
  toc?: boolean;
  tocDepth?: number;
  readingTime?: number;
  glossary?: Record<string, string>;
  team?: Team[];
  faq?: { q: string; a: string }[];
  references?: {
    title: string;
    author?: string;
    year?: number;
    url?: string;
  }[];
  diary?: {
    mood?: string;
    energy?: string;
    focus?: string;
    wins?: string[];
    blockers?: string[];
    learnings?: string[];
    metrics?: string[];
    next?: string[];
  };
  link?: string;
};

export type BlogFile = {
  slug: string;
  content: string;
  metadata: Metadata;
};

const DEFAULT_DIR = ["src", "app", "blog", "posts"];

function safeListFiles(dir: string): string[] {
  try {
    if (!fs.existsSync(dir)) return [];

    return fs.readdirSync(dir).filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return ext === ".mdx" || ext === ".md";
    });
  } catch {
    return [];
  }
}

function coerceDateToString(value: unknown): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value;
  if (value instanceof Date && !isNaN(+value)) return value.toISOString();

  if (typeof value === "number") {
    const date = new Date(value);
    if (!isNaN(+date)) return date.toISOString();
  }

  return undefined;
}

function normalizeStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const normalized = value.filter(Boolean).map(String);
  return normalized.length ? normalized : undefined;
}

function safeReadFile(filePath: string): BlogFile | null {
  try {
    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const inferredSlug = path.basename(filePath, path.extname(filePath));

    const frontmatter = {
      ...data,
      slug: (data as { slug?: string }).slug ?? inferredSlug,
    };

    let parsed: ReturnType<typeof PostFrontmatterSchema.parse>;

    try {
      parsed = PostFrontmatterSchema.parse(frontmatter);
    } catch (error) {
      console.error(`Invalid frontmatter in ${filePath}`);
      console.error(error);
      return null;
    }

    const publishedAt = coerceDateToString(parsed.publishedAt) ?? coerceDateToString(parsed.date);
    const updatedAt =
      coerceDateToString(parsed.updatedAt) ??
      coerceDateToString(parsed.updated) ??
      coerceDateToString(parsed.publishedAt) ??
      coerceDateToString(parsed.date);

    const tag = typeof parsed.tag === "string" ? parsed.tag : undefined;
    const tags =
      normalizeStringArray(parsed.tags) ?? (typeof parsed.tag === "string" ? [parsed.tag] : undefined);
    const categories = normalizeStringArray(parsed.categories);
    const stack = normalizeStringArray(parsed.stack);
    const keywords = normalizeStringArray(parsed.keywords);
    const cover = typeof parsed.cover === "string" ? parsed.cover : undefined;
    const image = typeof parsed.image === "string" ? parsed.image : undefined;
    const images = normalizeStringArray(parsed.images) ?? (cover ? [cover] : undefined);
    const faq = Array.isArray(parsed.faq) ? parsed.faq : undefined;
    const references = Array.isArray(parsed.references) ? parsed.references : undefined;
    const diary = parsed.diary
      ? {
          mood: parsed.diary.mood,
          energy: parsed.diary.energy,
          focus: parsed.diary.focus,
          wins: normalizeStringArray(parsed.diary.wins),
          blockers: normalizeStringArray(parsed.diary.blockers),
          learnings: normalizeStringArray(parsed.diary.learnings),
          metrics: normalizeStringArray(parsed.diary.metrics),
          next: normalizeStringArray(parsed.diary.next),
        }
      : undefined;

    const metadata: Metadata = {
      title: parsed.title ?? "",
      publishedAt,
      updatedAt,
      summary: (parsed.summary ?? parsed.description ?? "").trim(),
      image: image ?? cover ?? undefined,
      images,
      tag,
      tags,
      categories,
      kind: parsed.kind ?? undefined,
      stack,
      pillar: parsed.pillar ?? undefined,
      keywords,
      canonical: parsed.canonical ?? undefined,
      language: parsed.language ?? undefined,
      status: parsed.status ?? undefined,
      toc: parsed.toc ?? undefined,
      tocDepth: parsed.tocDepth ?? undefined,
      readingTime: parsed.readingTime ?? undefined,
      glossary:
        parsed.glossary && typeof parsed.glossary === "object" ? parsed.glossary : undefined,
      team: Array.isArray(parsed.team) ? parsed.team : undefined,
      faq,
      references,
      diary,
      link: parsed.link ?? undefined,
    };

    const slug = typeof parsed.slug === "string" && parsed.slug.trim() ? parsed.slug.trim() : inferredSlug;

    return { slug, metadata, content };
  } catch {
    return null;
  }
}

function collectFromDir(dir: string): BlogFile[] {
  const files = safeListFiles(dir);
  const items: BlogFile[] = [];

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const parsed = safeReadFile(fullPath);
    if (!parsed) continue;
    items.push(parsed);
  }

  items.sort((a, b) => {
    const aDate = a.metadata.publishedAt ? +new Date(a.metadata.publishedAt) : 0;
    const bDate = b.metadata.publishedAt ? +new Date(b.metadata.publishedAt) : 0;
    return bDate - aDate;
  });

  return items;
}

export function getPosts(customPath: string[] = DEFAULT_DIR): BlogFile[] {
  try {
    const postsDir = path.join(process.cwd(), ...customPath);
    return collectFromDir(postsDir);
  } catch {
    return [];
  }
}
