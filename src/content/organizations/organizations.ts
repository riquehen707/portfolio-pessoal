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

const movieStudio = (id: string, slug: string, name: string) => OrganizationSchema.parse({
  id, slug, name, kind: "studio", status: "draft", workIds: [],
  summary: `Organização cinematográfica relacionada a filmes do acervo: ${name}.`,
  createdAt: "2026-08-13", updatedAt: "2026-08-13",
});

export const movieStudios = [
  movieStudio("org_lift_productions", "lift-productions", "LIFT Productions"),
  movieStudio("org_chungeorahm_film", "chungeorahm-film", "Chungeorahm Film"),
  movieStudio("org_rodar_y_rodar", "rodar-y-rodar", "Rodar y Rodar"),
  movieStudio("org_filmax", "filmax", "Filmax"),
  movieStudio("org_efti", "efti", "EFTI"),
  movieStudio("org_mungo_productions", "mungo-productions", "Mungo Productions"),
  movieStudio("org_protozoa_pictures", "protozoa-pictures", "Protozoa Pictures"),
  movieStudio("org_rook_films", "rook-films", "Rook Films"),
  movieStudio("org_el_deseo", "el-deseo", "El Deseo"),
  movieStudio("org_mutant_enemy", "mutant-enemy", "Mutant Enemy"),
  movieStudio("org_new_line_cinema", "new-line-cinema", "New Line Cinema"),
  movieStudio("org_film4", "film4", "Film4 Productions"),
  movieStudio("org_causeway_films", "causeway-films", "Causeway Films"),
  movieStudio("org_northern_lights_films", "northern-lights-films", "Northern Lights Films"),
  movieStudio("org_gamechanger_films", "gamechanger-films", "Gamechanger Films"),
  movieStudio("org_petit_film", "petit-film", "Petit Film"),
  movieStudio("org_redpeter_film", "redpeter-film", "RedPeter Film"),
  movieStudio("org_frenesy_film_company", "frenesy-film-company", "Frenesy Film Company"),
  movieStudio("org_square_peg", "square-peg", "Square Peg"),
  movieStudio("org_rt_features", "rt-features", "RT Features"),
  movieStudio("org_escape_plan_productions", "escape-plan-productions", "Escape Plan Productions"),
  movieStudio("org_starchild_pictures", "starchild-pictures", "Starchild Pictures"),
  movieStudio("org_kazak_productions", "kazak-productions", "Kazak Productions"),
  movieStudio("org_boulderlight_pictures", "boulderlight-pictures", "BoulderLight Pictures"),
  movieStudio("org_machaco_films", "machaco-films", "Machaco Films"),
  movieStudio("org_pinetown_production", "pinetown-production", "Pinetown Production"),
  movieStudio("org_working_title_films", "working-title-films", "Working Title Films"),
  movieStudio("org_studio_8", "studio-8", "Studio 8"),
  movieStudio("org_proximity_media", "proximity-media", "Proximity Media"),
];

export const organizations = [ghostAnimation,teamCherry,cartoonSaloon,laika,studioGhibli,...movieStudios];

export type Organization = z.infer<typeof OrganizationSchema>;
export const organizationsById = new Map(organizations.map((organization) => [organization.id, organization]));
