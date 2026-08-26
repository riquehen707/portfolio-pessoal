import { z } from "zod";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const MediaSchema = z.object({
  src: z.string().startsWith("/"),
  alt: z.string().min(1),
  sourceUrl: z.string().url(),
  credit: z.string().min(1),
  rights: z.enum(["official-promotional", "licensed", "permission-pending"]),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

export const GameSchema = z
  .object({
    id: z.string().regex(/^game_[a-z0-9_]+$/),
    contentType: z.literal("game"),
    schemaVersion: z.number().int().positive(),
    slug: z.string().regex(slugPattern),
    aliases: z.array(z.string().regex(slugPattern)).default([]),
    title: z.string().min(1),
    originalTitle: z.string().min(1).optional(),
    releaseDate: z.string().regex(isoDate).optional(),
    year: z.number().int().min(1950).max(2100),
    cover: MediaSchema.optional(),
    heroImage: MediaSchema.optional(),
    screenshots: z.array(MediaSchema).default([]),
    organizationRelationships: z
      .array(
        z.object({
          organizationId: z.string().regex(/^org_[a-z0-9_]+$/),
          roles: z.array(z.enum(["development", "co-development", "publishing"])).min(1),
        }),
      )
      .min(1),
    contributors: z
      .array(z.object({ personId: z.string(), roles: z.array(z.string()) }))
      .default([]),
    countries: z.array(z.string().min(1)).min(1),
    brazilianConnection: z
      .array(
        z.object({
          type: z.enum([
            "brazilian-studio",
            "brazilian-developer",
            "brazilian-setting",
            "brazilian-cultural-reference",
            "brazilian-co-production",
            "other",
          ]),
          description: z.string().min(10),
        }),
      )
      .default([]),
    genres: z.array(z.string().min(1)).min(1),
    subgenres: z.array(z.string().min(1)).default([]),
    tags: z.array(z.string().min(1)).default([]),
    platforms: z.array(z.string().min(1)).min(1),
    engine: z.string().min(1).optional(),
    modes: z.array(z.string().min(1)).default([]),
    perspective: z.array(z.string().min(1)).default([]),
    description: z.string().min(30).max(360),
    editorialSummary: z.string().min(40),
    whyItMatters: z.string().min(40),
    gameplay: z.string().min(40),
    artDirection: z.string().min(40).optional(),
    narrative: z.string().min(40).optional(),
    soundAndMusic: z.string().min(40).optional(),
    developmentContext: z.string().min(40),
    reception: z.string().min(20).optional(),
    officialWebsite: z.string().url().optional(),
    steamUrl: z.string().url().optional(),
    relatedArticleSlugs: z.array(z.string().regex(slugPattern)).default([]),
    seo: z.object({ title: z.string().min(3).max(80), description: z.string().min(50).max(170) }),
    sources: z.array(z.object({ title: z.string().min(1), url: z.string().url() })).min(1),
    status: z.enum(["draft", "published"]),
    createdAt: z.string().regex(isoDate),
    publishedAt: z.string().regex(isoDate).optional(),
    updatedAt: z.string().regex(isoDate),
  })
  .superRefine((game, ctx) => {
    if (game.status === "published" && (!game.publishedAt || !game.cover))
      ctx.addIssue({
        code: "custom",
        path: ["status"],
        message: "jogos publicados exigem publishedAt e capa",
      });
    if (game.aliases.includes(game.slug))
      ctx.addIssue({ code: "custom", path: ["aliases"], message: "slug não pode ser alias" });
  });

export const GameBatchSchema = z.array(GameSchema).superRefine((games, ctx) => {
  const ids = new Set<string>();
  const slugs = new Set<string>();
  games.forEach((game, index) => {
    if (ids.has(game.id))
      ctx.addIssue({ code: "custom", path: [index, "id"], message: `id duplicado: ${game.id}` });
    if (slugs.has(game.slug))
      ctx.addIssue({
        code: "custom",
        path: [index, "slug"],
        message: `slug duplicado: ${game.slug}`,
      });
    ids.add(game.id);
    slugs.add(game.slug);
    game.aliases.forEach((alias) => slugs.add(alias));
  });
});

export type Game = z.infer<typeof GameSchema>;
