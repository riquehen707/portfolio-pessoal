import { z } from "zod";

const requiredText = z.string().trim().min(1);
const key = requiredText.regex(/^[a-z][a-z0-9-]*$/);

export const serviceExampleSchema = z
  .object({
    id: key,
    slug: key,
    status: z.enum(["draft", "published"]),
    updatedAt: requiredText.regex(/^\d{4}-\d{2}-\d{2}$/),
    name: requiredText.max(80),
    category: requiredText.max(48),
    solutionType: z.enum(["institutional", "portfolio", "local-business", "landing-page"]),
    description: requiredText.max(180),
    highlights: z.array(requiredText.max(36)).min(2).max(4),
    visualIdentity: z.object({
      label: requiredText.max(80),
      themeKey: key,
    }),
    featureIds: z.array(key).max(8),
    preview: z
      .object({
        src: requiredText.regex(/^\/images\//),
        alt: requiredText.max(180),
        mobileSrc: requiredText.regex(/^\/images\//).optional(),
      })
      .optional(),
    rendererKey: key.optional(),
    seo: z.object({ index: z.boolean().default(false) }).default({ index: false }),
  })
  .superRefine((example, context) => {
    if (example.status !== "published") return;
    if (!example.preview) {
      context.addIssue({ code: "custom", path: ["preview"], message: "Exemplo publicado exige preview." });
    }
    if (!example.rendererKey) {
      context.addIssue({ code: "custom", path: ["rendererKey"], message: "Exemplo publicado exige renderer próprio." });
    }
    if (!example.featureIds.length) {
      context.addIssue({ code: "custom", path: ["featureIds"], message: "Exemplo publicado exige recursos relacionados." });
    }
  });

export type ServiceExample = z.infer<typeof serviceExampleSchema>;
