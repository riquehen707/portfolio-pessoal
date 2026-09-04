import { z } from "zod";

export const WorkSchema = z.object({
  id: z.string().regex(/^work_[a-z0-9_]+$/),
  slug: z.string().min(1),
  title: z.string().min(1),
  kind: z.enum(["animated-short", "documentary"]),
  status: z.enum(["draft", "published"]),
  year: z.number().int(),
  country: z.string().optional(),
  durationSeconds: z.number().int().positive().optional(),
  summary: z.string().min(1),
  contributors: z.array(z.object({ personId: z.string(), roles: z.array(z.string()).min(1) })),
  organizationIds: z.array(z.string()).default([]),
  additionalCredits: z.array(z.object({ name: z.string(), roles: z.array(z.string()).min(1) })).default([]),
  relatedWorkIds: z.array(z.string()).default([]),
  publisher: z.string().optional(),
  officialUrl: z.string().url(),
  youtubeId: z.string().regex(/^[\w-]{11}$/),
  rights: z.object({ embed: z.literal("official-youtube-privacy-enhanced"), images: z.literal("not-cleared") }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type EditorialWork = z.infer<typeof WorkSchema>;
