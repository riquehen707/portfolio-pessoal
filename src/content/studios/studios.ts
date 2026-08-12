import { z } from "zod";

const StudioSchema = z.object({
  id: z.string(), slug: z.string(), name: z.string(), legalName: z.string(), founded: z.number(), location: z.string(),
  movieIds: z.array(z.string()), status: z.literal("published"), updatedAt: z.string(),
  announcedProjects: z.array(z.object({ title: z.string(), kind: z.string(), state: z.string(), note: z.string(), source: z.string().url() })),
});

export const laikaStudio = StudioSchema.parse({
  id: "stu_laika", slug: "laika", name: "LAIKA", legalName: "LAIKA, LLC", founded: 2005,
  location: "Hillsboro, Oregon, Estados Unidos", status: "published", updatedAt: "2026-08-11",
  movieIds: ["mov_lai_2009_coraline", "mov_lai_2012_paranorman", "mov_lai_2014_boxtrolls", "mov_lai_2016_kubo", "mov_lai_2019_missinglink", "mov_lai_2026_wildwood"],
  announcedProjects: [
    { title: "The Night Gardener", kind: "longa de animação anunciado", state: "sem data pública confirmada", note: "Projeto dirigido por Travis Knight e escrito por Bill Dubuque; não integra a filmografia lançada.", source: "https://www.laika.com/" },
    { title: "Piranesi", kind: "adaptação animada anunciada", state: "em desenvolvimento, sem data pública", note: "A LAIKA adquiriu os direitos do romance de Susanna Clarke; Travis Knight foi anunciado como diretor.", source: "https://www.linkedin.com/posts/laika_laika-picks-up-rights-to-susanna-clarkes-activity-7209588675779665922-7e53" },
  ],
});
