import { z } from "zod";

/**
 * Frontmatter robusto, com defaults úteis.
 * Mantém o mínimo rico obrigatório e deixa o resto opcional.
 */
export const PostFrontmatterSchema = z.object({
  // essenciais
  title: z.string().min(3, "title muito curto"),
  summary: z.string().min(10, "summary muito curta"),
  slug: z.string().min(1, "slug obrigatório"),

  // datas (compatível com seu código atual)
  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  date: z.string().optional(),    // compatibilidade
  updated: z.string().optional(), // compatibilidade

  image: z.string().optional(),

  // clusters/editorial
  pillar: z.string().optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),

  // SEO extra
  keywords: z.array(z.string()).optional(),
  canonical: z.string().url().optional(),
  language: z.string().default("pt-BR"),

  // status editorial
  status: z.enum(["draft", "published"]).default("published"),

  // autores
  team: z.array(z.object({
    name: z.string(),
    url: z.string().optional(),
    avatar: z.string().optional(),
  })).optional(),

  // TOC
  toc: z.boolean().optional(),
  tocDepth: z.number().min(1).max(6).optional(),

  // FAQ (rich results futuramente)
  faq: z.array(z.object({
    q: z.string().min(1),
    a: z.string().min(1),
  })).optional(),

  // referências
  references: z.array(z.object({
    title: z.string().min(1),
    author: z.string().optional(),
    year: z.number().optional(),
    url: z.string().url().optional(),
  })).optional(),

  // opcional
  readingTime: z.number().min(1).max(120).optional(),
});

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;
