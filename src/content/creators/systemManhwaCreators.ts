import { CreatorSchema, type Creator } from "./creatorSchema";

const checked = "2026-08-24";
const person = (id:string,name:string,url:string,occupation:string):Creator => CreatorSchema.parse({id:`person_${id}`,slug:id.replaceAll("_","-"),name,kind:"person",status:"published",countryOrRegion:"Coreia do Sul",occupations:[occupation],summary:`${occupation} creditado em manhwas de ação e progressão do acervo.`,workIds:[],sources:[{title:`${name} — créditos oficiais da obra`,url,kind:"primary"}],createdAt:checked,updatedAt:checked});

export const systemManhwaCreators:Creator[] = [
  person("chugong","Chugong","https://tapas.io/series/solo-leveling-comic/info","Autor original"),
  person("h_goon","h-goon","https://tapas.io/series/solo-leveling-comic/info","Adaptador de webtoon"),
  person("dubu","DUBU (REDICE STUDIO)","https://tapas.io/series/solo-leveling-comic/info","Artista de webtoon"),
  person("singsong","singNsong","https://www.webtoons.com/en/action/omniscient-reader/list?title_no=2154","Autores originais"),
  person("umi_orv","UMI","https://www.webtoons.com/en/action/omniscient-reader/list?title_no=2154","Adaptador de webtoon"),
  person("sleepy_c","Sleepy-C","https://www.webtoons.com/en/action/omniscient-reader/list?title_no=2154","Artista de webtoon"),
  person("zero_big","Zero-BIG","https://tapas.io/series/log-in-murim/info","Autor original"),
  person("iron_wall","Iron wall","https://tapas.io/series/log-in-murim/info","Artista de webtoon"),
  person("jung_yoon_kang","Jung Yoon-kang","https://www.webtoons.com/en/fantasy/surviving-the-game-as-a-barbarian/list?title_no=5515","Autor original"),
  person("team_the_jick","Team the JICK","https://www.webtoons.com/en/fantasy/surviving-the-game-as-a-barbarian/list?title_no=5515","Adaptador de webtoon"),
  person("midnight_studio","MIDNIGHT STUDIO","https://www.webtoons.com/en/fantasy/surviving-the-game-as-a-barbarian/list?title_no=5515","Estúdio de arte"),
];
