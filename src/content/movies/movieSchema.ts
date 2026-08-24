import { z } from "zod";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const MovieStatusSchema = z.enum(["draft", "published"]);

export const MovieSchema = z
  .object({
    id: z.string().min(1),
    contentType: z.literal("movie"),
    schemaVersion: z.number().int().positive(),
    slug: z.string().regex(slugPattern, "slug inválido"),
    aliases: z.array(z.string().regex(slugPattern, "alias inválido")).default([]),
    createdAt: z.string().regex(isoDate, "data de criação inválida"),
    publishedAt: z.string().regex(isoDate, "data de publicação inválida").optional(),
    updatedAt: z.string().regex(isoDate, "data de alteração inválida"),
    relatedContentIds: z.array(z.string().min(1)).default([]),
    franchiseId: z.string().regex(/^franchise_[a-z0-9_]+$/).optional(),
    organizationRelationships: z
      .array(
        z.object({
          organizationId: z.string().regex(/^org_[a-z0-9_]+$/),
          roles: z.array(
            z.enum([
              "production",
              "co-production",
              "animation",
              "distribution",
              "licensing",
              "collaboration",
              "services",
            ]),
          ).min(1),
          status: z.enum(["draft", "published"]),
        }),
      )
      .default([]),
    titleBr: z.string().min(1),
    originalTitle: z.string().min(1),
    internationalTitle: z.string().min(1).optional(),
    year: z.number().int().min(1888).max(2100),
    format: z.literal("feature"),
    releaseDate: z.string().regex(isoDate, "data de lançamento inválida").optional(),
    productionStatus: z.enum(["released", "upcoming", "in-development"]).default("released"),
    durationMinutes: z.number().int().positive().optional(),
    countries: z.array(z.string().min(1)).min(1),
    directors: z.array(z.string().min(1)).min(1),
    screenwriters: z.array(z.string().min(1)).default([]),
    credits: z.array(z.object({ name: z.string().min(1), roles: z.array(z.string().min(1)).min(1) })).default([]),
    personRelationships: z.array(z.object({
      personId: z.string().regex(/^person_[a-z0-9_]+$/),
      roles: z.array(z.string().min(1)).min(1),
    })).default([]),
    releaseType: z.enum(["theatrical", "television", "television-and-theatrical"]).default("theatrical"),
    genres: z.array(z.string().min(1)).min(1),
    subgenres: z.array(z.string().min(1)).default([]),
    themes: z.array(z.string().min(1)).default([]),
    shortDescription: z.string().min(20).max(320),
    audienceProfile: z.string().min(10).max(240),
    experience: z.string().min(3).max(120),
    contentWarnings: z.array(z.string().min(1)).default([]),
    poster: z
      .object({
        src: z.string().min(1),
        alt: z.string().min(1),
        sourceUrl: z.string().url(),
          credit: z.string().min(1),
          rights: z.enum(["original-editorial", "licensed", "permission-pending"]),
          width: z.number().int().positive().optional(),
          height: z.number().int().positive().optional(),
      })
      .optional(),
    status: MovieStatusSchema.default("draft"),
    seo: z.object({
      title: z.string().min(3).max(70),
      description: z.string().min(50).max(170),
    }),
    editorial: z
      .object({
        introduction: z.string().min(40),
        styleAndPace: z.string().min(20),
        reasonsToWatch: z.array(z.string().min(10)).min(1),
        limitations: z.array(z.string().min(10)).default([]),
      })
      .optional(),
    sources: z
      .array(
        z.object({ title: z.string().min(1), url: z.string().url() }),
      )
      .min(1),
  })
  .superRefine((movie, ctx) => {
    if (movie.status === "published" && !movie.editorial) {
      ctx.addIssue({
        code: "custom",
        path: ["editorial"],
        message: "filmes publicados precisam de conteúdo editorial próprio",
      });
    }
    if (movie.status === "published" && !movie.publishedAt) {
      ctx.addIssue({ code: "custom", path: ["publishedAt"], message: "filmes publicados precisam de data de publicação" });
    }
    if (movie.aliases.includes(movie.slug)) {
      ctx.addIssue({ code: "custom", path: ["aliases"], message: "o slug atual não pode ser também um alias" });
    }
  });

export type Movie = z.infer<typeof MovieSchema>;
export type MovieStatus = z.infer<typeof MovieStatusSchema>;

export const MovieBatchSchema = z.array(MovieSchema).superRefine((movies, ctx) => {
  const seenIds = new Set<string>();
  const seenSlugs = new Set<string>();
  const seenAliases = new Set<string>();

  movies.forEach((movie, index) => {
    if (seenIds.has(movie.id)) {
      ctx.addIssue({ code: "custom", path: [index, "id"], message: `id duplicado: ${movie.id}` });
    }
    if (seenSlugs.has(movie.slug) || seenAliases.has(movie.slug)) {
      ctx.addIssue({
        code: "custom",
        path: [index, "slug"],
        message: `slug duplicado: ${movie.slug}`,
      });
    }
    for (const alias of movie.aliases) {
      if (seenSlugs.has(alias) || seenAliases.has(alias)) {
        ctx.addIssue({ code: "custom", path: [index, "aliases"], message: `alias duplicado ou em conflito: ${alias}` });
      }
      seenAliases.add(alias);
    }
    seenIds.add(movie.id);
    seenSlugs.add(movie.slug);
  });
});

export function validateMovieBatch(input: unknown) {
  return MovieBatchSchema.safeParse(input);
}
