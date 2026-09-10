import { z } from "zod";

const requiredText = z.string().trim().min(1);
const key = requiredText.regex(/^[a-z][a-z0-9-]*$/);

export const serviceExampleSchema = z
  .object({
    id: key,
    slug: key,
    status: z.enum(["draft", "published"]),
    order: z.number().int().nonnegative(),
    featured: z.boolean(),
    updatedAt: requiredText.regex(/^\d{4}-\d{2}-\d{2}$/),
    title: requiredText.max(80),
    segment: requiredText.max(48),
    solutionType: z.enum(["institutional", "portfolio", "local-business", "landing-page"]),
    shortDescription: requiredText.max(180),
    tags: z.array(requiredText.max(36)).min(2).max(8),
    decisions: z.array(z.object({
      title: requiredText.max(48),
      description: requiredText.max(150),
    })).min(2).max(3),
    visualStyle: z.object({
      label: requiredText.max(80),
      themeKey: key,
    }),
    featureIds: z.array(key).max(8),
    coverImage: z
      .object({
        src: requiredText.regex(/^\/images\//),
        alt: requiredText.max(180),
        mobileSrc: requiredText.regex(/^\/images\//).optional(),
      })
      .optional(),
    images: z.array(z.object({
      src: requiredText.regex(/^\/images\//),
      alt: requiredText.max(180),
    })).min(1),
    rendererKey: key.optional(),
    seo: z.object({ index: z.boolean().default(false) }).default({ index: false }),
  })
  .superRefine((example, context) => {
    if (example.status !== "published") return;
    if (!example.coverImage) {
      context.addIssue({ code: "custom", path: ["coverImage"], message: "Exemplo publicado exige imagem de capa." });
    }
    if (!example.rendererKey) {
      context.addIssue({ code: "custom", path: ["rendererKey"], message: "Exemplo publicado exige renderer próprio." });
    }
    if (!example.featureIds.length) {
      context.addIssue({ code: "custom", path: ["featureIds"], message: "Exemplo publicado exige recursos relacionados." });
    }
  });

export type ServiceExample = z.infer<typeof serviceExampleSchema>;
