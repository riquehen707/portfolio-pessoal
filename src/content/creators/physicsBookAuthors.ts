import { CreatorSchema, type Creator } from "./creatorSchema";

// Registros bibliográficos mínimos; não criar perfis públicos automaticamente.
const checkedAt = "2026-10-14";
const people: Array<[string,string,string,string,string]> = [
 ["carlo_rovelli","carlo-rovelli","Carlo Rovelli","Físico teórico italiano e autor de livros de divulgação sobre relatividade, teoria quântica e natureza do tempo.","https://www.carlorovelli.com/"],
 ["stephen_hawking","stephen-hawking","Stephen Hawking","Físico teórico e cosmólogo britânico que pesquisou buracos negros, gravitação e cosmologia, e publicou obras acessíveis ao público amplo.","https://www.hawking.org.uk/"],
 ["brian_greene","brian-greene","Brian Greene","Físico teórico e divulgador científico norte-americano, conhecido por livros que discutem relatividade, mecânica quântica e teoria de cordas.","https://www.briangreene.org/"],
 ["carl_sagan","carl-sagan","Carl Sagan","Astrônomo, pesquisador planetário e divulgador científico norte-americano, autor de Cosmos.","https://www.planetary.org/profiles/carl-sagan"],
 ["leonard_mlodinow","leonard-mlodinow","Leonard Mlodinow","Físico e escritor que apresenta conceitos de matemática, acaso, probabilidade e suas relações com o raciocínio científico.","https://leonardmlodinow.com/"],
];
export const physicsBookAuthors: Creator[] = people.map(([key,slug,name,summary,url]) =>
 CreatorSchema.parse({
   id:`person_${key}`, slug, name, kind:"person",status:"draft",summary,
   occupations:["Autor","Divulgador científico"],
   sources:[{title:`${name} — referência biográfica`,url,kind:"primary"}],
   workIds:[],createdAt:checkedAt,updatedAt:checkedAt,
 })
);
