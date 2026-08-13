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
const ghibliPeople:Creator[] = [
  { id:"person_hayao_miyazaki", slug:"hayao-miyazaki", name:"Hayao Miyazaki", summary:"Diretor, roteirista, animador e participante da fundação do Studio Ghibli." },
  { id:"person_isao_takahata", slug:"isao-takahata", name:"Isao Takahata", summary:"Diretor, produtor e participante da fundação do Studio Ghibli." },
  { id:"person_toshio_suzuki", slug:"toshio-suzuki", name:"Toshio Suzuki", summary:"Produtor e articulador editorial que participou da fundação e continuidade do Studio Ghibli." },
].map(person=>CreatorSchema.parse({
  ...person, kind:"person", status:"draft", workIds:[],
  sources:[{title:"História oficial — Studio Ghibli",url:"https://www.ghibli.jp/history/",kind:"primary"}],
  createdAt:"2026-08-13",updatedAt:"2026-08-13",
}));
const laikaPeople:Creator[] = [CreatorSchema.parse({
  id:"person_travis_knight",slug:"travis-knight",name:"Travis Knight",kind:"person",status:"draft",
  summary:"Presidente e CEO da LAIKA, diretor de Kubo e as Cordas Mágicas e Wildwood.",workIds:[],
  sources:[{title:"Wildwood — anúncio de distribuição",url:"https://www.fathomentertainment.com/news/laika-debuts-teaser-trailer-press-release-fathom/",kind:"primary"}],
  createdAt:"2026-08-13",updatedAt:"2026-08-13",
})];
const aardmanPeople:Creator[] = [
  {id:"person_peter_lord",slug:"peter-lord",name:"Peter Lord",summary:"Cofundador da Aardman, diretor, animador e produtor."},
  {id:"person_david_sproxton",slug:"david-sproxton",name:"David Sproxton",summary:"Cofundador da Aardman e produtor ligado à consolidação do estúdio."},
  {id:"person_nick_park",slug:"nick-park",name:"Nick Park",summary:"Diretor e animador que criou Wallace & Gromit e desenvolveu obras centrais da Aardman."},
].map(person=>CreatorSchema.parse({
  ...person,kind:"person",status:"draft",workIds:[],
  sources:[{title:"People — Aardman",url:"https://www.aardman.com/about/people/",kind:"primary"}],
  createdAt:"2026-08-13",updatedAt:"2026-08-13",
}));
const scienceSaruPeople:Creator[] = [
  {id:"person_masaaki_yuasa",slug:"masaaki-yuasa",name:"Masaaki Yuasa",summary:"Diretor e cofundador histórico da Science SARU; deixou a presidência em 2020."},
  {id:"person_eunyoung_choi",slug:"eunyoung-choi",name:"Eunyoung Choi",summary:"Animadora, produtora e cofundadora histórica da Science SARU."},
  {id:"person_masanori_fujita",slug:"masanori-fujita",name:"Masanori Fujita",summary:"Representante e CEO da Science SARU no cadastro institucional de 2026."},
].map(person=>CreatorSchema.parse({
  ...person,kind:"person",status:"draft",workIds:[],
  sources:[{title:"About — Science SARU",url:"https://sciencesaru.com/en/about",kind:"primary"}],
  createdAt:"2026-08-13",updatedAt:"2026-08-13",
}));
const kyotoAnimationPeople:Creator[] = [
  {id:"person_yoko_hatta",slug:"yoko-hatta",name:"Yoko Hatta",summary:"Animadora e cofundadora da Kyoto Animation."},
  {id:"person_hideaki_hatta",slug:"hideaki-hatta",name:"Hideaki Hatta",summary:"Cofundador e presidente histórico da Kyoto Animation, morto em fevereiro de 2026."},
  {id:"person_shinichiro_hatta",slug:"shinichiro-hatta",name:"Shinichiro Hatta",summary:"Presidente e CEO da Kyoto Animation desde fevereiro de 2026."},
].map(person=>CreatorSchema.parse({
  ...person,kind:"person",status:"draft",workIds:[],
  sources:[{title:"Corporate Profile — Kyoto Animation",url:"https://www.kyotoanimation.co.jp/en/company/profile/",kind:"primary"}],
  createdAt:"2026-08-13",updatedAt:"2026-08-13",
}));
export const creators = [shingoTamagawa, upamanyuBhattacharyya, kalpSanghvi,...teamCherryPeople,...cartoonSaloonPeople,...ghibliPeople,...laikaPeople,...aardmanPeople,...scienceSaruPeople,...kyotoAnimationPeople];
