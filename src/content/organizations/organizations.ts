import { z } from "zod";

const OrganizationSchema = z.object({
  id: z.string().regex(/^org_[a-z0-9_]+$/), slug: z.string(), name: z.string(), kind: z.enum(["studio", "collective"]),
  status: z.enum(["draft", "published"]), profilePath: z.string().startsWith("/").optional(), workIds: z.array(z.string()), summary: z.string(), createdAt: z.string(), updatedAt: z.string(),
});

export const ghostAnimation = OrganizationSchema.parse({
  id: "org_ghost_animation", slug: "ghost-animation", name: "Ghost Animation", kind: "collective", status: "draft",
  workIds: ["work_wade_2019"], summary: "Coletivo de animação sediado em Kolkata e produtor de Wade.", createdAt: "2026-08-12", updatedAt: "2026-08-12",
});
export const teamCherry = OrganizationSchema.parse({id:"org_team_cherry",slug:"team-cherry",name:"Team Cherry",kind:"studio",status:"published",workIds:[],summary:"Estúdio independente de jogos sediado em Adelaide, Austrália do Sul.",createdAt:"2026-08-12",updatedAt:"2026-08-12"});
export const cartoonSaloon=OrganizationSchema.parse({id:"org_cartoon_saloon",slug:"cartoon-saloon",name:"Cartoon Saloon",kind:"studio",status:"published",workIds:[],summary:"Estúdio irlandês de animação fundado em Kilkenny em 1999.",createdAt:"2026-08-12",updatedAt:"2026-08-12"});
export const laika = OrganizationSchema.parse({id:"org_laika",slug:"laika",name:"LAIKA",kind:"studio",status:"published",profilePath:"/estudios/laika",workIds:[],summary:"Estúdio de animação stop-motion fundado em 2005 e sediado em Hillsboro, Oregon.",createdAt:"2026-08-11",updatedAt:"2026-08-12"});
export const studioGhibli = OrganizationSchema.parse({id:"org_studio_ghibli",slug:"studio-ghibli",name:"Studio Ghibli",kind:"studio",status:"published",profilePath:"/blog/studio-ghibli",workIds:[],summary:"Estúdio japonês de animação fundado em 1985 por Hayao Miyazaki, Isao Takahata e Toshio Suzuki.",createdAt:"2026-08-10",updatedAt:"2026-08-12"});

export const organizations = [ghostAnimation,teamCherry,cartoonSaloon,laika,studioGhibli];

export type Organization = z.infer<typeof OrganizationSchema>;
export const organizationsById = new Map(organizations.map((organization) => [organization.id, organization]));
