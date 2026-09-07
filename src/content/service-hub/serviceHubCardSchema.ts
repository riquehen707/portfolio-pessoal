import { z } from "zod";

const requiredText = z.string().trim().min(1);
const key = requiredText.regex(/^[a-z][a-z0-9-]*$/);

const imagePreviewSchema = z.object({
  kind: z.literal("image"),
  src: requiredText.regex(/^\/images\//),
  alt: requiredText.max(180),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  position: z.enum(["center", "top"]).default("center"),
});

const fallbackPreviewSchema = z.object({
  kind: z.literal("fallback"),
  label: requiredText.max(32),
  tone: z.enum(["gold", "forest", "clay", "slate"]),
});

const badgeSchema = z
  .object({
    label: requiredText.max(28),
    kind: z.enum(["highlight", "popular"]).default("highlight"),
    evidence: requiredText.max(240).optional(),
  })
  .superRefine((badge, context) => {
    if (badge.kind === "popular" && !badge.evidence) {
      context.addIssue({
        code: "custom",
        message: "Badge de popularidade exige evidência verificável.",
        path: ["evidence"],
      });
    }
  });

export const serviceHubIntentSchema = z.enum([
  "present-work",
  "capture-clients",
  "sell-operate",
  "validate-idea",
]);

export const serviceHubCardSchema = z.object({
  id: key,
  slug: key,
  intent: serviceHubIntentSchema,
  title: requiredText.max(56),
  context: requiredText.max(80),
  benefit: requiredText.max(120),
  price: z.object({
    label: requiredText.max(28),
    value: requiredText.max(80),
  }),
  badge: badgeSchema.optional(),
  preview: z.discriminatedUnion("kind", [imagePreviewSchema, fallbackPreviewSchema]),
});

export type ServiceHubCard = z.infer<typeof serviceHubCardSchema>;
export type ServiceHubIntent = z.infer<typeof serviceHubIntentSchema>;
