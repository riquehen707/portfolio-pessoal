import { CreatorSchema, type Creator } from "./creatorSchema";

export const shingoTamagawa: Creator = CreatorSchema.parse({
  id: "person_shingo_tamagawa",
  slug: "shingo-tamagawa",
  name: "Shingo Tamagawa",
  kind: "person",
  status: "published",
  birthYear: 1987,
  birthPlace: "Nara, Japão",
  summary: "Animador e realizador japonês, autor do curta independente Puparia.",
  workIds: ["work_puparia_2020", "work_archipel_making_puparia_2021"],
  sources: [
    { title: "PUPARIA", url: "https://www.youtube.com/watch?v=CWnqX41JHuM", kind: "primary" },
    { title: "Three Minutes, Three Years: Making Puparia", url: "https://www.youtube.com/watch?v=VKsG3E7TLl4", kind: "primary" },
    { title: "PUPARIA — FilmFreeway", url: "https://filmfreeway.com/PUPARIA831", kind: "primary" },
  ],
  createdAt: "2026-08-12",
  updatedAt: "2026-08-12",
});

export const upamanyuBhattacharyya: Creator = CreatorSchema.parse({
  id: "person_upamanyu_bhattacharyya", slug: "upamanyu-bhattacharyya", name: "Upamanyu Bhattacharyya", kind: "person", status: "draft",
  summary: "Animador e codiretor indiano de Wade.", workIds: ["work_wade_2019"],
  sources: [{ title: "Wade — Annecy 2020", url: "https://www.annecyfestival.com/about/archives/2020/award-winners/film-index%3Afilm-20200770", kind: "primary" }],
  createdAt: "2026-08-12", updatedAt: "2026-08-12",
});

export const kalpSanghvi: Creator = CreatorSchema.parse({
  id: "person_kalp_sanghvi", slug: "kalp-sanghvi", name: "Kalp Sanghvi", kind: "person", status: "draft",
  summary: "Animador e codiretor indiano de Wade.", workIds: ["work_wade_2019"],
  sources: [{ title: "Wade — Annecy 2020", url: "https://www.annecyfestival.com/about/archives/2020/award-winners/film-index%3Afilm-20200770", kind: "primary" }],
  createdAt: "2026-08-12", updatedAt: "2026-08-12",
});

const teamCherryPeople:Creator[]=[
  {id:"person_ari_gibson",slug:"ari-gibson",name:"Ari Gibson",kind:"person",status:"draft",summary:"Cofundador, artista, animador e designer da Team Cherry.",workIds:[],sources:[{title:"Team Cherry",url:"https://www.teamcherry.com.au/",kind:"primary"}],createdAt:"2026-08-12",updatedAt:"2026-08-12"},
  {id:"person_william_pellen",slug:"william-pellen",name:"William Pellen",kind:"person",status:"draft",summary:"Cofundador, designer e programador da Team Cherry.",workIds:[],sources:[{title:"Team Cherry",url:"https://www.teamcherry.com.au/",kind:"primary"}],createdAt:"2026-08-12",updatedAt:"2026-08-12"},
  {id:"person_jasmine_vine",slug:"jasmine-vine",name:"Jasmine Vine",kind:"person",status:"draft",summary:"Programadora de Hollow Knight: Silksong.",workIds:[],sources:[{title:"Hollow Knight: Silksong",url:"https://hollowknightsilksong.com/",kind:"primary"}],createdAt:"2026-08-12",updatedAt:"2026-08-12"},
  {id:"person_christopher_larkin",slug:"christopher-larkin",name:"Christopher Larkin",kind:"person",status:"draft",summary:"Compositor de Hollow Knight e Hollow Knight: Silksong.",workIds:[],sources:[{title:"Hollow Knight: Silksong",url:"https://hollowknightsilksong.com/",kind:"primary"}],createdAt:"2026-08-12",updatedAt:"2026-08-12"},
].map(item=>CreatorSchema.parse(item));
const cartoonSaloonPeople:Creator[]=["Tomm Moore","Nora Twomey","Paul Young","Ross Stewart","Louise Bagnall"].map(name=>CreatorSchema.parse({id:`person_${name.toLowerCase().replaceAll(" ","_")}`,slug:name.toLowerCase().replaceAll(" ","-"),name,kind:"person",status:"draft",summary:`Profissional relacionado ao Cartoon Saloon.`,workIds:[],sources:[{title:"Cartoon Saloon — About",url:"https://www.cartoonsaloon.ie/irish-animation-studio/about/",kind:"primary"}],createdAt:"2026-08-12",updatedAt:"2026-08-12"}));
export const creators = [shingoTamagawa, upamanyuBhattacharyya, kalpSanghvi,...teamCherryPeople,...cartoonSaloonPeople];
