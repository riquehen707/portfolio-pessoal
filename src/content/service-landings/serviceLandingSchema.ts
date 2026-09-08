import { z } from "zod";

const text = z.string().trim().min(1);
const key = text.regex(/^[a-z][a-z0-9-]*$/);
const httpsUrl = z.url().refine((value) => new URL(value).protocol === "https:", "Use HTTPS.");
const image = z.object({
  src: text.regex(/^\/images\//),
  alt: text,
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  caption: text,
  source: text,
  credit: text,
});
const item = z.object({ title: text, description: text });
const base = { id: key, title: text };
export const serviceSectionSchema = z.discriminatedUnion("type", [
  z.object({
    ...base,
    type: z.enum(["problem", "solution"]),
    paragraphs: z.array(text).min(1).max(3),
  }),
  z.object({
    ...base,
    type: z.enum(["benefits", "deliverables", "audience"]),
    items: z.array(item).min(1),
  }),
  z.object({ ...base, type: z.literal("process"), items: z.array(item).min(3).max(4) }),
  z.object({
    ...base,
    type: z.literal("demonstration"),
    description: text,
    image: image.optional(),
    illustrative: z.boolean(),
  }),
  z.object({
    ...base,
    type: z.literal("pricing"),
    description: text,
    items: z
      .array(
        z.object({
          label: text,
          amount: text,
          cadence: z.enum(["once", "monthly", "yearly", "included", "on-request"]),
          details: text,
        }),
      )
      .min(1),
    terms: text,
  }),
  z.object({
    ...base,
    type: z.literal("proof"),
    items: z
      .array(
        z.object({
          kind: z.enum(["testimonial", "project", "number", "client", "guarantee", "provider"]),
          title: text,
          description: text,
          attribution: text,
          evidence: text,
        }),
      )
      .min(1),
  }),
  z.object({
    ...base,
    type: z.literal("faq"),
    items: z.array(z.object({ question: text, answer: text })).min(1),
  }),
]);

export const serviceLandingSchema = z
  .object({
    id: key,
    slug: key,
    status: z.enum(["draft", "published"]),
    structure: z.enum(["standard", "compact"]).optional(),
    updatedAt: z.iso.date(),
    seo: z.object({ title: text, description: text, index: z.boolean(), image: image.optional() }),
    provider: z.object({ name: text, description: text }),
    conversion: z.discriminatedUnion("kind", [
      z.object({
        kind: z.literal("whatsapp"),
        label: text,
        href: httpsUrl.refine((value) => {
          const url = new URL(value);
          return url.hostname === "wa.me" && /^\/[1-9]\d{7,14}$/.test(url.pathname);
        }, "Use https://wa.me/ seguido do telefone internacional."),
      }),
      z.object({ kind: z.enum(["quote", "checkout"]), label: text, href: httpsUrl }),
      z.object({ kind: z.literal("form"), label: text, href: z.literal("#contato") }),
    ]),
    hero: z.object({
      eyebrow: text,
      title: text,
      audience: text,
      benefit: text,
      description: text,
      price: text.optional(),
      image: image.optional(),
      layout: z.enum(["text", "split"]),
    }),
    sections: z.array(serviceSectionSchema).min(1),
    finalCTA: z.object({ title: text, description: text }),
    stickyCTA: z.boolean(),
    experiment: z.object({ id: key, variant: key }).optional(),
    legalLinks: z.array(z.object({ label: text, href: httpsUrl })).default([]),
  })
  .superRefine((value, context) => {
    const ids = [
      "inicio",
      "service-title",
      "contato",
      "contato-title",
      "acao-final",
      "acao-final-title",
      ...value.sections.flatMap((section) => [section.id, `${section.id}-title`]),
    ];
    if (new Set(ids).size !== ids.length) {
      context.addIssue({
        code: "custom",
        message: "IDs de seção devem ser únicos e não reservados.",
        path: ["sections"],
      });
    }
    // Na estrutura curta, solução e público já são explícitos no hero obrigatório.
    const requiredSections =
      value.structure === "compact"
        ? ["problem", "benefits", "demonstration", "deliverables", "process", "pricing", "faq"]
        : [
            "problem",
            "solution",
            "benefits",
            "deliverables",
            "audience",
            "process",
            "pricing",
            "faq",
          ];
    for (const required of requiredSections) {
      if (
        value.status === "published" &&
        !value.sections.some((section) => section.type === required)
      ) {
        context.addIssue({
          code: "custom",
          message: `Publicação exige seção ${required}.`,
          path: ["sections"],
        });
      }
    }

    if (value.status === "published") {
      const pricingSections = value.sections.filter((section) => section.type === "pricing");
      const monthlyItems = pricingSections.flatMap((section) =>
        section.type === "pricing"
          ? section.items.filter((item) => item.cadence === "monthly")
          : [],
      );
      if (pricingSections.length !== 1) {
        context.addIssue({
          code: "custom",
          message: "Publicação exige uma única seção de preço.",
          path: ["sections"],
        });
      }
      if (!value.hero.price) {
        context.addIssue({
          code: "custom",
          message: "Publicação exige o modelo comercial no hero.",
          path: ["hero", "price"],
        });
      }
      if (monthlyItems.length !== 1) {
        context.addIssue({
          code: "custom",
          message: "Publicação exige uma única mensalidade comercial.",
          path: ["sections"],
        });
      } else if (!/(mês|mensal)/i.test(monthlyItems[0].amount)) {
        context.addIssue({
          code: "custom",
          message: "A mensalidade deve ser apresentada com /mês ou cobrança mensal.",
          path: ["sections"],
        });
      } else if (!/inclui/i.test(monthlyItems[0].details)) {
        context.addIssue({
          code: "custom",
          message: "A mensalidade deve informar o que está incluído.",
          path: ["sections"],
        });
      }
    }
  });

export type ServiceLanding = z.infer<typeof serviceLandingSchema>;
export type ServiceSection = z.infer<typeof serviceSectionSchema>;
export type ServiceMedia = z.infer<typeof image>;
