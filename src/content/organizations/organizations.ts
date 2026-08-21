import { z } from "zod";

const OrganizationSchema = z.object({
  id: z.string().regex(/^org_[a-z0-9_]+$/), slug: z.string(), name: z.string(), kind: z.enum(["studio", "collective", "broadcaster", "company", "publisher", "imprint", "magazine", "platform"]),
  aliases: z.array(z.string()).default([]),
  legalName: z.string().optional(),
  founded: z.number().int().optional(),
  location: z.object({ city: z.string(), region: z.string().optional(), country: z.string() }).optional(),
  founderIds: z.array(z.string().regex(/^person_[a-z0-9_]+$/)).default([]),
  keyPeopleIds: z.array(z.string().regex(/^person_[a-z0-9_]+$/)).default([]),
  website: z.string().url().optional(),
  activeUntil: z.number().int().optional(),
  specialties: z.array(z.string().min(1)).default([]),
  image: z.object({
    src: z.string().min(1), alt: z.string().min(1), credit: z.string().min(1), sourceUrl: z.string().url(),
    license: z.string().min(1), licenseUrl: z.string().url().optional(),
  }).optional(),
  parentOrganizationId: z.string().regex(/^org_[a-z0-9_]+$/).optional(),
  sources: z.array(z.object({ title: z.string(), url: z.string().url() })).default([]),
  status: z.enum(["draft", "published"]), profilePath: z.string().startsWith("/").optional(), workIds: z.array(z.string()), summary: z.string(), createdAt: z.string(), updatedAt: z.string(),
});

export const ghostAnimation = OrganizationSchema.parse({
  id: "org_ghost_animation", slug: "ghost-animation", name: "Ghost Animation", kind: "collective", status: "draft",
  workIds: ["work_wade_2019"], summary: "Coletivo de animação sediado em Kolkata e produtor de Wade.", createdAt: "2026-08-12", updatedAt: "2026-08-12",
});
export const teamCherry = OrganizationSchema.parse({id:"org_team_cherry",slug:"team-cherry",name:"Team Cherry",kind:"studio",founded:2014,location:{city:"Adelaide",region:"Austrália do Sul",country:"Austrália"},specialties:["Jogos independentes","Animação 2D"],status:"published",profilePath:"/estudios/team-cherry",workIds:[],summary:"Estúdio independente de jogos sediado em Adelaide, Austrália do Sul.",sources:[{title:"Team Cherry — site oficial",url:"https://www.teamcherry.com.au/"}],createdAt:"2026-08-12",updatedAt:"2026-08-14"});
export const cartoonSaloon=OrganizationSchema.parse({
  id:"org_cartoon_saloon",slug:"cartoon-saloon",aliases:["Cartoon Saloon Ltd."],name:"Cartoon Saloon",kind:"studio",
  specialties:["Animação 2D","Longas autorais"],
  founded:1999,location:{city:"Kilkenny",country:"Irlanda"},
  founderIds:["person_tomm_moore","person_nora_twomey","person_paul_young"],
  keyPeopleIds:["person_tomm_moore","person_nora_twomey","person_paul_young"],
  website:"https://www.cartoonsaloon.ie/",sources:[
    {title:"About us — Cartoon Saloon",url:"https://www.cartoonsaloon.ie/irish-animation-studio/about/"},
    {title:"Feature Films — Cartoon Saloon",url:"https://www.cartoonsaloon.ie/irish-animation-studio/feature-films/"},
  ],status:"published",profilePath:"/estudios/cartoon-saloon",workIds:[],
  summary:"Estúdio irlandês de animação fundado em Kilkenny em 1999.",createdAt:"2026-08-12",updatedAt:"2026-08-13"
});
export const aardman = OrganizationSchema.parse({
  id:"org_aardman",slug:"aardman",aliases:["Aardman Animations"],name:"Aardman",kind:"studio",
  specialties:["Stop-motion","Comédia de personagens"],
  founded:1976,location:{city:"Bristol",country:"Reino Unido"},
  founderIds:["person_peter_lord","person_david_sproxton"],keyPeopleIds:["person_peter_lord","person_david_sproxton","person_nick_park"],
  website:"https://www.aardman.com/",sources:[
    {title:"About Aardman",url:"https://www.aardman.com/about/"},
    {title:"History of Aardman",url:"https://www.aardman.com/about/history/"},
    {title:"Film, TV & Games",url:"https://www.aardman.com/film-tv-games/"},
  ],status:"published",profilePath:"/estudios/aardman",workIds:[],
  summary:"Estúdio britânico de animação sediado em Bristol, conhecido pelo stop-motion, pela comédia física e por personagens recorrentes.",
  createdAt:"2026-08-13",updatedAt:"2026-08-13"
});
export const scienceSaru = OrganizationSchema.parse({
  id:"org_science_saru",slug:"science-saru",aliases:["Science SARU Inc.","株式会社サイエンスSARU"],name:"Science SARU",legalName:"Science SARU Inc.",kind:"studio",
  specialties:["Animação 2D","Fluxos digitais"],
  founded:2013,location:{city:"Musashino",region:"Tóquio",country:"Japão"},
  founderIds:["person_masaaki_yuasa","person_eunyoung_choi"],keyPeopleIds:["person_masanori_fujita"],
  website:"https://sciencesaru.com/en",parentOrganizationId:"org_toho",sources:[
    {title:"About — Science SARU",url:"https://sciencesaru.com/en/about"},
    {title:"Works — Science SARU",url:"https://sciencesaru.com/en/works"},
    {title:"History — TOHO",url:"https://www.toho.co.jp/en/company/info/history"},
  ],status:"published",profilePath:"/estudios/science-saru",workIds:[],
  summary:"Estúdio japonês de animação fundado em 2013, conhecido por combinar desenho expressivo, fluxos digitais e equipes de direções variadas.",
  createdAt:"2026-08-13",updatedAt:"2026-08-13"
});
export const kyotoAnimation = OrganizationSchema.parse({
  id:"org_kyoto_animation",slug:"kyoto-animation",aliases:["Kyoto Animation Co., Ltd.","KyoAni","株式会社京都アニメーション","京アニ"],name:"Kyoto Animation",legalName:"Kyoto Animation Co., Ltd.",kind:"studio",
  specialties:["Animação 2D","Produção e formação integradas"],
  founded:1981,location:{city:"Uji",region:"Kyoto",country:"Japão"},
  founderIds:["person_yoko_hatta","person_hideaki_hatta"],keyPeopleIds:["person_shinichiro_hatta"],
  website:"https://www.kyotoanimation.co.jp/en/",sources:[
    {title:"Corporate Profile — Kyoto Animation",url:"https://www.kyotoanimation.co.jp/en/company/profile/"},
    {title:"Business — Kyoto Animation",url:"https://www.kyotoanimation.co.jp/en/company/business/"},
    {title:"Our Works — Kyoto Animation",url:"https://www.kyotoanimation.co.jp/en/works/"},
    {title:"Statement on the Passing of Hideaki Hatta",url:"https://www.kyotoanimation.co.jp/information/?id=6870"},
    {title:"East Asian Journalists Workshop — Kyoto University",url:"https://www.socio.kyoto-u.ac.jp/wp-content/uploads/2019/08/EAJW-Pamphlet_2019.pdf"},
  ],status:"published",profilePath:"/estudios/kyoto-animation",workIds:[],
  summary:"Estúdio japonês de animação fundado em 1981 e sediado em Uji, Kyoto, com produção, formação e publicação integradas.",
  createdAt:"2026-08-13",updatedAt:"2026-08-13"
});
export const laika = OrganizationSchema.parse({
  id:"org_laika",slug:"laika",aliases:["LAIKA Studios","LAIKA Entertainment"],name:"LAIKA",legalName:"LAIKA, LLC",kind:"studio",
  specialties:["Stop-motion","Impressão 3D"],
  founded:2005,location:{city:"Hillsboro",region:"Oregon",country:"Estados Unidos"},keyPeopleIds:["person_travis_knight"],
  website:"https://www.laika.com/",sources:[
    {title:"Site oficial da LAIKA",url:"https://www.laika.com/"},
    {title:"Termos de uso — LAIKA",url:"https://shop.laika.com/pages/terms-of-use"},
    {title:"Filmografia oficial da LAIKA",url:"https://www.laika.com/our-films/"},
  ],status:"published",profilePath:"/estudios/laika",workIds:[],
  summary:"Estúdio de animação stop-motion fundado em 2005 e sediado em Hillsboro, Oregon.",createdAt:"2026-08-11",updatedAt:"2026-08-13"
});
export const studioGhibli = OrganizationSchema.parse({
  id:"org_studio_ghibli", slug:"studio-ghibli", aliases:["Studio Ghibli Inc.","株式会社スタジオジブリ"],
  specialties:["Animação 2D","Longas autorais"],
  name:"Studio Ghibli", legalName:"Studio Ghibli Inc.", kind:"studio", founded:1985,
  location:{city:"Koganei",region:"Tóquio",country:"Japão"},
  founderIds:["person_hayao_miyazaki","person_isao_takahata","person_toshio_suzuki"],
  website:"https://www.ghibli.jp/", parentOrganizationId:"org_nippon_television",
  sources:[
    {title:"Perfil oficial — Studio Ghibli",url:"https://www.ghibli.jp/profile/"},
    {title:"História oficial — Studio Ghibli",url:"https://www.ghibli.jp/history/"},
    {title:"Aquisição de ações — Nippon TV",url:"https://www.ntvhd.co.jp/english/pdf_cms/news/20230921.pdf"},
  ],
  status:"published", profilePath:"/estudios/studio-ghibli", workIds:[],
  summary:"Estúdio japonês de animação fundado em 1985, conhecido por longas autorais de linguagens e direções distintas.",
  createdAt:"2026-08-10",updatedAt:"2026-08-13"
});
export const nipponTelevision = OrganizationSchema.parse({
  id:"org_nippon_television",slug:"nippon-television",name:"Nippon Television Network Corporation",kind:"broadcaster",
  website:"https://www.ntv.co.jp/",status:"draft",workIds:[],
  summary:"Emissora japonesa e controladora do Studio Ghibli desde outubro de 2023.",
  sources:[{title:"Aquisição de ações do Studio Ghibli",url:"https://www.ntvhd.co.jp/english/pdf_cms/news/20230921.pdf"}],
  createdAt:"2026-08-13",updatedAt:"2026-08-13"
});
export const toho = OrganizationSchema.parse({
  id:"org_toho",slug:"toho",aliases:["Toho Co., Ltd."],name:"TOHO",kind:"company",website:"https://www.toho.co.jp/en/",status:"draft",workIds:[],
  summary:"Empresa japonesa de entretenimento e controladora integral da Science SARU desde 2024.",
  sources:[{title:"History — TOHO",url:"https://www.toho.co.jp/en/company/info/history"}],createdAt:"2026-08-13",updatedAt:"2026-08-13"
});

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

const readingPublishers = [
  ["org_darkside_books","darkside-books","DarkSide Books","publisher"],
  ["org_suma","suma","Suma","imprint"],
  ["org_editora_aleph","editora-aleph","Editora Aleph","publisher"],
  ["org_intrinseca","intrinseca","Intrínseca","publisher"],
  ["org_rocco","rocco","Rocco","publisher"],
  ["org_companhia_das_letras","companhia-das-letras","Companhia das Letras","publisher"],
  ["org_companhia_de_bolso","companhia-de-bolso","Companhia de Bolso","imprint"],
  ["org_alfaguara","alfaguara","Alfaguara","imprint"],
  ["org_record","record","Editora Record","publisher"],
  ["org_jbc","jbc","Editora JBC","publisher"],
  ["org_panini_brasil","panini-brasil","Panini Brasil","publisher"],
  ["org_newpop","newpop","NewPOP","publisher"],
  ["org_devir","devir","Devir","publisher"],
  ["org_pipoca_nanquim","pipoca-e-nanquim","Pipoca & Nanquim","publisher"],
  ["org_red_dragon","red-dragon-publisher","Red Dragon Publisher","publisher"],
  ["org_lpm","l-e-pm","L&PM Editores","publisher"],
  ["org_dc_comics","dc-comics","DC Comics","publisher"],
  ["org_vozes","editora-vozes","Editora Vozes","publisher"],
  ["org_woodstock_books","woodstock-books","Woodstock Books","publisher"],
  ["org_alfred_a_knopf","alfred-a-knopf","Alfred A. Knopf","publisher"],
  ["org_living_batch_press","living-batch-press","Living Batch Press","publisher"],
  ["org_poseidon_press","poseidon-press","Poseidon Press","publisher"],
  ["org_diplodocus_press","diplodocus-press","Diplodocus Press","publisher"],
  ["org_valancourt_books","valancourt-books","Valancourt Books","publisher"],
  ["org_firebrand_books","firebrand-books","Firebrand Books","publisher"],
  ["org_jove","jove","Jove","imprint"],
  ["org_espasa","espasa","Espasa","publisher"],
  ["org_seven_stories_press","seven-stories-press","Seven Stories Press","publisher"],
  ["org_little_brown","little-brown","Little, Brown","publisher"],
  ["org_ballantine_books","ballantine-books","Ballantine Books","imprint"],
  ["org_berkley","berkley","Berkley","imprint"],
  ["org_macmillan","macmillan","Macmillan","publisher"],
  ["org_redhook","redhook","Redhook","imprint"],
  ["org_harpervia","harpervia","HarperVia","imprint"],
  ["org_penguin_publishing_group","penguin-publishing-group","Penguin Publishing Group","publisher"],
  ["org_fondo_cultura_economica","fondo-de-cultura-economica","Fondo de Cultura Económica","publisher"],
  ["org_bedford_st_martins","bedford-st-martins","Bedford/St. Martin's","publisher"],
  ["org_vertical","vertical","Vertical","publisher"],
  ["org_wordhorde","wordhorde","Word Horde","publisher"],
  ["org_saga_press","saga-press","Saga Press","imprint"],
  ["org_atria_books","atria-books","Atria Books","imprint"],
  ["org_lgf","lgf","LGF","publisher"],
  ["org_pocket_books","pocket-books","Pocket Books","imprint"],
  ["org_william_morrow","william-morrow","William Morrow","imprint"],
  ["org_titan_books","titan-books","Titan Books","publisher"],
  ["org_knopf_canada","knopf-canada","Knopf Canada","publisher"],
  ["org_anchor_books","anchor-books","Anchor Books","imprint"],
  ["org_harperteen","harperteen","HarperTeen","imprint"],
  ["org_vertigo","vertigo","Vertigo","imprint"],
  ["org_marvel_comics","marvel-comics","Marvel Comics","publisher"],
].map(([id,slug,name,kind])=>OrganizationSchema.parse({id,slug,name,kind,status:"draft",workIds:[],summary:`Editora ou selo relacionado a edições verificadas do acervo: ${name}.`,createdAt:"2026-08-13",updatedAt:"2026-08-21"}));

export const organizations = [ghostAnimation,teamCherry,cartoonSaloon,aardman,scienceSaru,kyotoAnimation,laika,studioGhibli,nipponTelevision,toho,...movieStudios,...readingPublishers];

export type Organization = z.infer<typeof OrganizationSchema>;
export const organizationsById = new Map(organizations.map((organization) => [organization.id, organization]));
