import { z } from "zod";

const isoDate = /^\d{4}-\d{2}-\d{2}$/;
const slug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const IdeaStatusSchema = z.enum([
  "rascunho",
  "explorando",
  "em-desenvolvimento",
  "pausada",
  "concluida",
  "abandonada",
]);

export const IdeaUpdateSchema = z.object({
  date: z.string().regex(isoDate),
  title: z.string().min(3).max(100).optional(),
  content: z.array(z.string().min(1)).min(1),
  links: z.array(z.object({ label: z.string().min(1), href: z.string().min(1) })).default([]),
    image: z.object({
      src: z.string().min(1),
      alt: z.string().min(1),
      width: z.number().int().positive(),
      height: z.number().int().positive(),
      caption: z.string().min(1).optional(),
    }).optional(),
});

export const IdeaSchema = z.object({
  id: z.string().regex(/^idea_[a-z0-9_]+$/),
  contentType: z.literal("idea"),
  schemaVersion: z.number().int().positive(),
  slug: z.string().regex(slug),
  aliases: z.array(z.string().regex(slug)).default([]),
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(240),
  createdAt: z.string().regex(isoDate),
  updatedAt: z.string().regex(isoDate),
  status: IdeaStatusSchema,
  publicationStatus: z.enum(["draft", "published"]).default("draft"),
  categories: z.array(z.string().min(1)).min(1),
  tags: z.array(z.string().min(1)).default([]),
  progress: z.number().int().min(0).max(100).optional(),
  idea: z.array(z.string().min(1)).min(1),
  motivation: z.array(z.string().min(1)).min(1),
  currentState: z.array(z.string().min(1)).min(1),
  nextSteps: z.array(z.string().min(1)).default([]),
  updates: z.array(IdeaUpdateSchema).min(1),
  relatedIdeaIds: z.array(z.string().regex(/^idea_[a-z0-9_]+$/)).default([]),
  relatedArticleSlugs: z.array(z.string().regex(slug)).default([]),
  relatedProjectSlugs: z.array(z.string().regex(slug)).default([]),
  seo: z.object({
    title: z.string().min(3).max(70),
    description: z.string().min(50).max(170),
  }),
}).superRefine((idea, ctx) => {
  if (idea.updatedAt < idea.createdAt) ctx.addIssue({ code:"custom",path:["updatedAt"],message:"updatedAt não pode preceder createdAt" });
  if (idea.updates.some((update) => update.date > idea.updatedAt)) ctx.addIssue({ code:"custom",path:["updates"],message:"uma atualização não pode ser posterior a updatedAt" });
  if (idea.aliases.includes(idea.slug)) ctx.addIssue({ code:"custom",path:["aliases"],message:"o slug atual não pode ser um alias" });
});

export const IdeaBatchSchema = z.array(IdeaSchema).superRefine((ideas, ctx) => {
  const ids = new Set<string>();
  const paths = new Set<string>();
  ideas.forEach((idea, index) => {
    if (ids.has(idea.id)) ctx.addIssue({ code:"custom",path:[index,"id"],message:`id duplicado: ${idea.id}` });
    if (paths.has(idea.slug)) ctx.addIssue({ code:"custom",path:[index,"slug"],message:`slug ou alias duplicado: ${idea.slug}` });
    ids.add(idea.id);
    paths.add(idea.slug);
    idea.aliases.forEach((alias) => {
      if (paths.has(alias)) ctx.addIssue({ code:"custom",path:[index,"aliases"],message:`slug ou alias duplicado: ${alias}` });
      paths.add(alias);
    });
  });
});

export type Idea = z.infer<typeof IdeaSchema>;
export type IdeaStatus = z.infer<typeof IdeaStatusSchema>;
