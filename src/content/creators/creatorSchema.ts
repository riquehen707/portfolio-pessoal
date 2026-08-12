import { z } from "zod";

export const CreatorSchema = z.object({
  id: z.string().regex(/^person_[a-z0-9_]+$/),
  slug: z.string().min(1),
  name: z.string().min(1),
  kind: z.literal("person"),
  status: z.enum(["draft", "published"]),
  birthYear: z.number().int().optional(),
  birthPlace: z.string().optional(),
  summary: z.string().min(1),
  workIds: z.array(z.string()).default([]),
  sources: z.array(z.object({ title: z.string(), url: z.string().url(), kind: z.enum(["primary", "secondary"]) })),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Creator = z.infer<typeof CreatorSchema>;
