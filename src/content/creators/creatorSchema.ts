import { z } from "zod";

export const CreatorSchema = z.object({
  id: z.string().regex(/^person_[a-z0-9_]+$/),
  slug: z.string().min(1),
  name: z.string().min(1),
  fullName: z.string().min(1).optional(),
  originalName: z.string().min(1).optional(),
  kind: z.literal("person"),
  status: z.enum(["draft", "published"]),
  profilePath: z.string().startsWith("/").optional(),
  image: z.object({
    src: z.string().min(1),
    alt: z.string().min(1),
    credit: z.string().min(1),
    sourceUrl: z.string().url(),
    license: z.string().min(1),
    licenseUrl: z.string().url().optional(),
  }).optional(),
  birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  deathDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  birthYear: z.number().int().optional(),
  deathYear: z.number().int().optional(),
  birthPlace: z.string().optional(),
  countryOrRegion: z.string().optional(),
  occupations: z.array(z.string().min(1)).default([]),
  summary: z.string().min(1),
  biography: z.array(z.string().min(1)).default([]),
  themes: z.array(z.string().min(1)).default([]),
  ideas: z.array(z.object({
    title: z.string().min(1),
    description: z.string().min(1),
  })).default([]),
  workIds: z.array(z.string()).default([]),
  startingPoints: z.array(z.object({ workId: z.string().min(1), note: z.string().min(1) })).default([]),
  relatedPersonIds: z.array(z.string().regex(/^person_[a-z0-9_]+$/)).default([]),
  relatedLinks: z.array(z.object({ label: z.string().min(1), href: z.string().min(1), kind: z.enum(["article", "list", "genre", "movement", "studio", "person", "other"]) })).default([]),
  sources: z.array(z.object({ title: z.string(), url: z.string().url(), kind: z.enum(["primary", "secondary"]) })),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Creator = z.infer<typeof CreatorSchema>;
