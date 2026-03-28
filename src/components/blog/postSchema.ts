import { z } from "zod";

export const PostFrontmatterSchema = z.object({
  title: z.string().min(3, "title muito curto"),
  summary: z.string().min(10, "summary muito curta"),
  description: z.string().optional(),
  slug: z.string().min(1, "slug obrigatorio"),

  publishedAt: z.string().optional(),
  updatedAt: z.string().optional(),
  date: z.string().optional(),
  updated: z.string().optional(),

  image: z.string().optional(),
  images: z.array(z.string()).optional(),
  cover: z.string().optional(),

  pillar: z.string().optional(),
  tag: z.string().optional(),
  categories: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  kind: z.enum(["client", "personal", "study"]).optional(),
  stack: z.array(z.string()).optional(),

  keywords: z.array(z.string()).optional(),
  canonical: z.string().url().optional(),
  language: z.string().default("pt-BR"),
  status: z.enum(["draft", "published"]).default("published"),

  team: z
    .array(
      z.object({
        name: z.string(),
        url: z.string().optional(),
        avatar: z.string().optional(),
      }),
    )
    .optional(),

  toc: z.boolean().optional(),
  tocDepth: z.number().min(1).max(6).optional(),

  faq: z
    .array(
      z.object({
        q: z.string().min(1),
        a: z.string().min(1),
      }),
    )
    .optional(),
  glossary: z.record(z.string(), z.string()).optional(),

  references: z
    .array(
      z.object({
        title: z.string().min(1),
        author: z.string().optional(),
        year: z.number().optional(),
        url: z.string().url().optional(),
      }),
    )
    .optional(),

  readingTime: z.number().min(1).max(120).optional(),
  link: z.string().optional(),

  diary: z
    .object({
      mood: z.string().optional(),
      energy: z.string().optional(),
      focus: z.string().optional(),
      wins: z.array(z.string()).optional(),
      blockers: z.array(z.string()).optional(),
      learnings: z.array(z.string()).optional(),
      metrics: z.array(z.string()).optional(),
      next: z.array(z.string()).optional(),
    })
    .optional(),
});

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;
