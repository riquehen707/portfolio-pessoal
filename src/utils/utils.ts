// src/utils/utils.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type Team = {
  name?: string;
  role?: string;
  avatar?: string;
  linkedIn?: string;
};

export type Metadata = {
  title: string;
  publishedAt?: string;
  summary?: string;
  image?: string;
  images?: string[];
  tag?: string;          // legado
  tags?: string[];       // preferível
  categories?: string[];
  team?: Team[];
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

function safeReadFile(filePath: string) {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);

    const metadata: Metadata = {
      title: data.title ?? "",
      publishedAt: data.publishedAt ?? data.date ?? undefined,
      summary: data.summary ?? data.description ?? "",
      image: data.image ?? undefined,
      images: Array.isArray(data.images) ? data.images : undefined,
      tag: typeof data.tag === "string" ? data.tag : undefined,
      tags: Array.isArray(data.tags) ? data.tags : undefined,
      categories: Array.isArray(data.categories) ? data.categories : undefined,
      team: Array.isArray(data.team) ? data.team : undefined,
      link: data.link ?? undefined,
    };

    return { metadata, content };
  } catch {
    return null; // falha silenciosa
  }
}

function collectFromDir(dir: string): BlogFile[] {
  const files = safeListFiles(dir);
  const items: BlogFile[] = [];

  for (const file of files) {
    const full = path.join(dir, file);
    const parsed = safeReadFile(full);
    if (!parsed) continue;

    const slug = path.basename(file, path.extname(file));
    items.push({ slug, content: parsed.content, metadata: parsed.metadata });
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
