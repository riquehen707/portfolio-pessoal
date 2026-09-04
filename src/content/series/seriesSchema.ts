import { z } from "zod";

const date = /^\d{4}-\d{2}-\d{2}$/;
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const SeriesSchema = z.object({
  id: z.string().regex(/^ser_[a-z0-9_]+$/), contentType: z.literal("series"), schemaVersion: z.number().int().positive(),
  slug: z.string().regex(slug), aliases: z.array(z.string().regex(slug)).default([]),
  titleBr: z.string().min(1), originalTitle: z.string().min(1), startYear: z.number().int(), endYear: z.number().int().optional(),
  seriesStatus: z.enum(["ended", "returning", "limited"]), format: z.enum(["live-action", "animation", "anime", "web-series"]),
  countries: z.array(z.string()).min(1), originalLanguages: z.array(z.string()).min(1), creators: z.array(z.string()).min(1),
  personRelationships: z.array(z.object({ personId: z.string().regex(/^person_[a-z0-9_]+$/), roles: z.array(z.string().min(1)).min(1) })).default([]),
  organizationRelationships: z.array(z.object({ organizationId:z.string().regex(/^org_[a-z0-9_]+$/), roles:z.array(z.enum(["production","coproduction","animation","distribution","licensing","broadcaster","platform","services"])).min(1) })).default([]),
  seasons: z.number().int().positive(), episodes: z.number().int().positive().optional(), genres: z.array(z.string()).min(1),
  themes: z.array(z.string()).default([]), shortDescription: z.string().min(20).max(320),
  audienceProfile: z.string().min(10).max(240), experience: z.string().min(3).max(120), contentWarnings: z.array(z.string()).default([]),
  image: z.object({ src:z.string().min(1), alt:z.string().min(1), sourceUrl:z.string().url(), credit:z.string().min(1), rights:z.enum(["original-editorial","licensed","permission-pending"]), width:z.number().int().positive().optional(), height:z.number().int().positive().optional() }).optional(),
  sources: z.array(z.object({ title: z.string().min(1), url: z.string().url() })).min(1),
  status: z.enum(["draft", "published"]).default("draft"), createdAt: z.string().regex(date), updatedAt: z.string().regex(date),
});

export type Series = z.infer<typeof SeriesSchema>;
export const SeriesBatchSchema = z.array(SeriesSchema).superRefine((items, ctx) => {
  const ids = new Set<string>(); const paths = new Set<string>();
  items.forEach((item, index) => {
    if (ids.has(item.id)) ctx.addIssue({ code:"custom", path:[index,"id"], message:`id duplicado: ${item.id}` });
    for (const value of [item.slug, ...item.aliases]) { if (paths.has(value)) ctx.addIssue({ code:"custom", path:[index,"slug"], message:`slug ou alias duplicado: ${value}` }); paths.add(value); }
    ids.add(item.id);
  });
});
