import { CreatorSchema, type Creator } from "./creatorSchema";

const checked="2026-08-24";
const author=(id:string,name:string,region:string,url:string):Creator=>CreatorSchema.parse({id:`person_${id}`,slug:id.replaceAll("_","-"),name,kind:"person",status:"published",countryOrRegion:region,occupations:["Autoria de fantasia"],summary:"Pessoa autora de fantasia sombria com obra cadastrada no acervo.",workIds:[],sources:[{title:`${name} — editora`,url,kind:"primary"}],createdAt:checked,updatedAt:checked});

export const darkFantasyAuthors:Creator[]=[
  author("joe_abercrombie","Joe Abercrombie","Reino Unido","https://www.hachettebookgroup.com/titles/joe-abercrombie/the-first-law-trilogy/9780316361194/"),
  author("mark_lawrence","Mark Lawrence","Reino Unido / Estados Unidos","https://www.penguinrandomhouse.com/books/308315/prince-of-thorns-by-mark-lawrence/paperback/"),
  author("glen_cook","Glen Cook","Estados Unidos","https://us.macmillan.com/author/glencook"),
  author("china_mieville","China Miéville","Reino Unido","https://www.penguinrandomhouse.com/books/114262/perdido-street-station-by-china-mieville/"),
  author("scott_hawkins","Scott Hawkins","Estados Unidos","https://www.penguinrandomhouse.com/books/240942/the-library-at-mount-char-by-scott-hawkins/"),
];
