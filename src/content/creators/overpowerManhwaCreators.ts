import { CreatorSchema, type Creator } from "./creatorSchema";

const checked="2026-08-24";
const person=(id:string,name:string,url:string,occupation:string):Creator=>CreatorSchema.parse({id:`person_${id}`,slug:id.replaceAll("_","-"),name,kind:"person",status:"published",countryOrRegion:"Coreia do Sul",occupations:[occupation],summary:`${occupation} creditado em manhwas de ação e fantasia do acervo.`,workIds:[],sources:[{title:`${name} — créditos oficiais da obra`,url,kind:"primary"}],createdAt:checked,updatedAt:checked});

export const overpowerManhwaCreators:Creator[]=[
  person("bangguseok_gimssi","Bangguseok Gimssi","https://www.webtoons.com/en/action/the-advanced-player-of-the-tutorial-tower/list?title_no=2409","Autor original"),
  person("topp","Topp","https://www.webtoons.com/en/action/the-advanced-player-of-the-tutorial-tower/list?title_no=2409","Artista de webtoon"),
  person("juyeong_hwang","Juyeong Hwang","https://www.webtoons.com/en/action/the-advanced-player-of-the-tutorial-tower/list?title_no=2409","Adaptador de webtoon"),
  person("devils_tail","Devil's tail","https://tapas.io/series/the-max-level-hero-strikes-back/info","Autor original"),
  person("yudo","Yudo","https://tapas.io/series/the-max-level-hero-strikes-back/info","Artista de webtoon"),
  person("sayren","sayren","https://www.webtoons.com/en/fantasy/the-academys-undercover-professor/list?title_no=4636","Autor original"),
  person("tana_undercover","Tana","https://www.webtoons.com/en/fantasy/the-academys-undercover-professor/list?title_no=4636","Adaptador de webtoon"),
  person("wag","WAG","https://www.webtoons.com/en/fantasy/the-academys-undercover-professor/list?title_no=4636","Artista de webtoon"),
  person("biga","Biga","https://www.webtoons.com/en/action/return-of-the-blossoming-blade/list?title_no=2849","Autor original"),
  person("lico","LICO","https://www.webtoons.com/en/action/return-of-the-blossoming-blade/list?title_no=2849","Estúdio de arte"),
  person("arche","ARCHE","https://www.webtoons.com/en/action/return-of-the-blossoming-blade/list?title_no=2849","Artista de webtoon"),
];
