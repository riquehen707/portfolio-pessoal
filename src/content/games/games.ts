import { z } from "zod";

const GameSchema = z.object({
  id:z.string().regex(/^game_[a-z0-9_]+$/), slug:z.string(), aliases:z.array(z.string()), title:z.string(), year:z.number(), releaseStatus:z.literal("released"), status:z.enum(["draft","published"]),
  organizationIds:z.array(z.string()), contributors:z.array(z.object({personId:z.string(),roles:z.array(z.string())})),
  platforms:z.array(z.string()), genres:z.array(z.string()), franchiseId:z.string(), summary:z.string(), officialUrl:z.string().url(), updatedAt:z.string(),
});
export type Game=z.infer<typeof GameSchema>;
export const games:Game[]=[
  GameSchema.parse({id:"game_hollow_knight_2017",slug:"hollow-knight",aliases:[],title:"Hollow Knight",year:2017,releaseStatus:"released",status:"draft",organizationIds:["org_team_cherry"],contributors:[{personId:"person_ari_gibson",roles:["direção","design","arte","animação","roteiro"]},{personId:"person_william_pellen",roles:["direção","design","programação","roteiro"]},{personId:"person_christopher_larkin",roles:["composição musical"]}],platforms:["PC","Mac","Linux","Nintendo Switch","Nintendo Switch 2","PlayStation 4","PlayStation 5","Xbox One","Xbox Series X|S"],genres:["ação e aventura","exploração não linear"],franchiseId:"franchise_hollow_knight",summary:"Uma descida por um reino em ruínas onde exploração, combate e narrativa ambiental se sustentam mutuamente.",officialUrl:"https://www.hollowknight.com/",updatedAt:"2026-08-12"}),
  GameSchema.parse({id:"game_hollow_knight_silksong_2025",slug:"hollow-knight-silksong",aliases:["silksong"],title:"Hollow Knight: Silksong",year:2025,releaseStatus:"released",status:"draft",organizationIds:["org_team_cherry"],contributors:[{personId:"person_ari_gibson",roles:["direção","design","arte","animação"]},{personId:"person_william_pellen",roles:["direção","design"]},{personId:"person_jasmine_vine",roles:["programação"]},{personId:"person_christopher_larkin",roles:["composição musical"]}],platforms:["PC","Mac","Linux","Nintendo Switch","Nintendo Switch 2","PlayStation 4","PlayStation 5","Xbox One","Xbox Series X|S"],genres:["ação e aventura","exploração não linear"],franchiseId:"franchise_hollow_knight",summary:"Uma ascensão por um novo reino, construída para a mobilidade de Hornet e lançada como jogo completo.",officialUrl:"https://hollowknightsilksong.com/",updatedAt:"2026-08-12"}),
];
export const hollowKnightFranchise={id:"franchise_hollow_knight",name:"Hollow Knight",gameIds:games.map(game=>game.id)};
