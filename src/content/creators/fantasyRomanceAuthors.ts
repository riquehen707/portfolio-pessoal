import { CreatorSchema, type Creator } from "./creatorSchema";

const checked="2026-08-24";
const author=(id:string,name:string,region:string,url:string):Creator=>CreatorSchema.parse({id:`person_${id}`,slug:id.replaceAll("_","-"),name,kind:"person",status:"published",countryOrRegion:region,occupations:["Autoria de fantasia"],summary:`Pessoa autora de fantasia com relações afetivas relevantes cadastrada no acervo.`,workIds:[],sources:[{title:`${name} — página oficial da obra`,url,kind:"primary"}],createdAt:checked,updatedAt:checked});

export const fantasyRomanceAuthors:Creator[]=[
  author("jacqueline_carey","Jacqueline Carey","Estados Unidos","https://us.macmillan.com/books/9781250213068/kushielsdart/"),
  author("juliet_marillier","Juliet Marillier","Nova Zelândia / Austrália","https://us.macmillan.com/books/9781250238665/daughteroftheforest/"),
  author("brandon_sanderson","Brandon Sanderson","Estados Unidos","https://us.macmillan.com/books/9781250899651/tressoftheemeraldsea/"),
  author("naomi_novik","Naomi Novik","Estados Unidos","https://www.penguinrandomhouse.com/books/236925/uprooted-by-naomi-novik/9780804179041/"),
  author("tasha_suri","Tasha Suri","Reino Unido","https://www.hachettebookgroup.com/titles/tasha-suri/the-jasmine-throne/9780316538510/"),
  author("erin_morgenstern","Erin Morgenstern","Estados Unidos","https://www.penguinrandomhouse.com/books/211964/the-night-circus-by-erin-morgenstern/"),
  author("rebecca_yarros","Rebecca Yarros","Estados Unidos","https://www.entangledpublishing.com/books/fourth-wing"),
];
