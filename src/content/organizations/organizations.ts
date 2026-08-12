import { z } from "zod";

const OrganizationSchema = z.object({
  id: z.string().regex(/^org_[a-z0-9_]+$/), slug: z.string(), name: z.string(), kind: z.enum(["studio", "collective"]),
  status: z.enum(["draft", "published"]), workIds: z.array(z.string()), summary: z.string(), createdAt: z.string(), updatedAt: z.string(),
});

export const ghostAnimation = OrganizationSchema.parse({
  id: "org_ghost_animation", slug: "ghost-animation", name: "Ghost Animation", kind: "collective", status: "draft",
  workIds: ["work_wade_2019"], summary: "Coletivo de animação sediado em Kolkata e produtor de Wade.", createdAt: "2026-08-12", updatedAt: "2026-08-12",
});

export const organizations = [ghostAnimation];
