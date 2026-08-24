import { CreatorSchema, type Creator } from "./creatorSchema";

const checked = "2026-08-24";
const author = (id:string,name:string,region:string,url:string,summary?:string):Creator => CreatorSchema.parse({
  id:`person_${id}`,slug:id.replaceAll("_","-"),name,kind:"person",status:"published",countryOrRegion:region,
  occupations:["Autoria de ficção científica"],summary:summary ?? `Pessoa autora de ficção científica com obra cadastrada no acervo.`,workIds:[],
  sources:[{title:`${name} — fonte editorial`,url,kind:"primary"}],createdAt:checked,updatedAt:checked,
});

export const scienceFictionAuthors:Creator[] = [
  author("alastair_reynolds","Alastair Reynolds","Reino Unido","https://www.hachettebookgroup.com/titles/alastair-reynolds/revelation-space/9780316462440/"),
  author("james_s_a_corey","James S. A. Corey","Estados Unidos","https://www.hachettebookgroup.com/titles/james-s-a-corey/leviathan-wakes/9780316129084/","Pseudônimo coletivo de Daniel Abraham e Ty Franck, autores da série The Expanse."),
  author("adrian_tchaikovsky","Adrian Tchaikovsky","Reino Unido","https://www.hachettebookgroup.com/titles/adrian-tchaikovsky/children-of-time/9780316452502/"),
  author("peter_watts","Peter Watts","Canadá","https://us.macmillan.com/books/9781250237484/blindsight/"),
  author("ray_nayler","Ray Nayler","Estados Unidos","https://us.macmillan.com/books/9780374605964/themountaininthesea/"),
  author("ann_leckie","Ann Leckie","Estados Unidos","https://www.hachettebookgroup.com/titles/ann-leckie/ancillary-justice/9780316246637/"),
  author("william_gibson","William Gibson","Canadá / Estados Unidos","https://www.penguinrandomhouse.com/books/538861/neuromancer-by-william-gibson/"),
  author("cixin_liu","Cixin Liu","China","https://us.macmillan.com/books/9780765382030/thethreebodyproblem/"),
  author("arkady_strugatsky","Arkady Strugatsky","União Soviética","https://www.chicagoreviewpress.com/roadside-picnic-products-9781613743416.php"),
  author("boris_strugatsky","Boris Strugatsky","União Soviética","https://www.chicagoreviewpress.com/roadside-picnic-products-9781613743416.php"),
];
