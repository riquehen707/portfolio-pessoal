import type { ReadingWork } from "./readingSchema";

const checked = "2026-08-24";

type Entry = {
  id: string; slug: string; originalTitle: string; titleBr?: string; romanizedTitle?: string;
  start: string; end?: string; credits: ReadingWork["credits"]; genres: string[]; themes: string[];
  description: string; sourceTitle: string; sourceUrl: string; imageFile: string; imageCredit: string;
  width: number; height: number; volumeCount?: number;
};

const manga = (entry: Entry): ReadingWork => ({
  id: `read_work_${entry.id}`,
  contentType: "reading-work",
  schemaVersion: 1,
  slug: entry.slug,
  aliases: [],
  originalTitle: entry.originalTitle,
  titleBr: entry.titleBr,
  romanizedTitle: entry.romanizedTitle,
  format: "comic",
  originCountries: ["Japão"],
  originalLanguages: ["Japonês"],
  comicTradition: "manga",
  comicFormat: "serialized-series",
  readingDirection: "right-to-left",
  credits: entry.credits,
  organizationRelationships: [],
  publicationStart: entry.start,
  publicationEnd: entry.end,
  publicationStatus: entry.end ? "completed" : "ongoing",
  categories: ["comics"],
  genres: entry.genres,
  themes: entry.themes,
  confirmedVolumeCount: entry.volumeCount,
  volumeCountCheckedAt: entry.volumeCount ? checked : undefined,
  demographics: ["shonen"],
  shortDescription: entry.description,
  seriesMemberships: [],
  relatedWorks: [],
  adaptations: [],
  image: {
    src: `/images/reading/harem/${entry.imageFile}`,
    alt: `Capa oficial do primeiro volume de ${entry.titleBr ?? entry.originalTitle}`,
    sourceUrl: entry.sourceUrl,
    credit: entry.imageCredit,
    rights: "licensed",
    width: entry.width,
    height: entry.height,
  },
  sources: [{ title: entry.sourceTitle, url: entry.sourceUrl }],
  status: "published",
  publishedAt: checked,
  createdAt: checked,
  updatedAt: checked,
});

export const haremMangaWorks: ReadingWork[] = [
  manga({id:"quintessential_quintuplets",slug:"the-quintessential-quintuplets",originalTitle:"五等分の花嫁",titleBr:"The Quintessential Quintuplets",romanizedTitle:"Go-Tōbun no Hanayome",start:"2017",end:"2020",credits:[{personId:"person_negi_haruba",roles:["writer","artist"]}],genres:["Comédia romântica","Harém","Drama escolar"],themes:["Escolha romântica","Irmãs","Amadurecimento"],description:"Um estudante endividado passa a dar aulas para cinco irmãs e precisa construir uma relação diferente com cada uma enquanto o mistério da futura noiva avança.",sourceTitle:"The Quintessential Quintuplets — Kodansha",sourceUrl:"https://kodansha.us/series/the-quintessential-quintuplets/",imageFile:"quintessential-quintuplets-01.webp",imageCredit:"Kodansha / Negi Haruba",width:800,height:1200,volumeCount:14}),
  manga({id:"100_girlfriends",slug:"100-girlfriends",originalTitle:"君のことが大大大大大好きな100人の彼女",titleBr:"The 100 Girlfriends Who Really, Really, Really, Really, Really Love You",romanizedTitle:"Kimi no Koto ga Dai Dai Dai Dai Daisuki na 100-nin no Kanojo",start:"2019",credits:[{personId:"person_rikito_nakamura",roles:["writer"]},{personId:"person_yukiko_nozawa",roles:["artist"]}],genres:["Comédia romântica","Harém","Paródia"],themes:["Poliamor","Absurdo","Afeto"],description:"Após descobrir que possui cem almas gêmeas, Rentaro decide corresponder a todas e transforma a premissa num harém assumido, coletivo e deliberadamente absurdo.",sourceTitle:"The 100 Girlfriends — Seven Seas",sourceUrl:"https://sevenseasentertainment.com/series/the-100-girlfriends-who-really-really-really-really-really-love-you/",imageFile:"100-girlfriends-01.jpg",imageCredit:"Seven Seas / Shueisha",width:320,height:452}),
  manga({id:"we_never_learn",slug:"we-never-learn",originalTitle:"ぼくたちは勉強ができない",titleBr:"We Never Learn",romanizedTitle:"Bokutachi wa Benkyō ga Dekinai",start:"2017",end:"2020",credits:[{personId:"person_taishi_tsutsui",roles:["writer","artist"]}],genres:["Comédia romântica","Harém","Drama escolar"],themes:["Estudo","Escolhas","Futuros alternativos"],description:"Um aluno que busca bolsa integral orienta colegas brilhantes justamente nas matérias em que elas fracassam, e o vínculo acadêmico se torna romântico.",sourceTitle:"We Never Learn — VIZ",sourceUrl:"https://www.viz.com/we-never-learn",imageFile:"we-never-learn-01.jpg",imageCredit:"VIZ Media / Shueisha",width:320,height:480,volumeCount:21}),
  manga({id:"nisekoi",slug:"nisekoi-false-love",originalTitle:"ニセコイ",titleBr:"Nisekoi: False Love",romanizedTitle:"Nisekoi",start:"2011",end:"2016",credits:[{personId:"person_naoshi_komi",roles:["writer","artist"]}],genres:["Comédia romântica","Harém","Drama escolar"],themes:["Amor de infância","Identidade","Promessa"],description:"Herdeiros de grupos criminosos rivais precisam fingir namoro, enquanto um medalhão e várias possíveis donas de uma chave ampliam a disputa amorosa.",sourceTitle:"Nisekoi: False Love — VIZ",sourceUrl:"https://www.viz.com/nisekoi-false-love",imageFile:"nisekoi-01.jpg",imageCredit:"VIZ Media / Shueisha",width:300,height:450,volumeCount:25}),
  manga({id:"love_hina",slug:"love-hina",originalTitle:"ラブひな",titleBr:"Love Hina",romanizedTitle:"Rabu Hina",start:"1998",end:"2001",credits:[{personId:"person_ken_akamatsu",roles:["writer","artist"]}],genres:["Comédia romântica","Harém"],themes:["Pensão","Vestibular","Promessa de infância"],description:"Um vestibulando torna-se administrador de uma pensão feminina e tenta cumprir uma promessa de infância em meio a convivência caótica e romance físico.",sourceTitle:"Love Hina Omnibus — Kodansha",sourceUrl:"https://kodansha.us/series/love-hina-omnibus/",imageFile:"love-hina-omnibus-01.webp",imageCredit:"Kodansha / Ken Akamatsu",width:800,height:1200,volumeCount:14}),
  manga({id:"negima",slug:"negima-magister-negi-magi",originalTitle:"魔法先生ネギま!",titleBr:"Negima! Magister Negi Magi",romanizedTitle:"Mahō Sensei Negima!",start:"2003",end:"2012",credits:[{personId:"person_ken_akamatsu",roles:["writer","artist"]}],genres:["Fantasia","Ação","Comédia harém"],themes:["Magia","Torneios","Laços mágicos"],description:"Um jovem mago assume uma turma feminina e a comédia escolar gradualmente abre espaço para batalhas, mundos mágicos e alianças com várias heroínas.",sourceTitle:"Negima! — Kodansha",sourceUrl:"https://kodansha.us/series/negima/",imageFile:"negima-omnibus-01.webp",imageCredit:"Kodansha / Ken Akamatsu",width:800,height:1200,volumeCount:38}),
  manga({id:"to_love_ru",slug:"to-love-ru",originalTitle:"To LOVEる -とらぶる-",titleBr:"To Love Ru",start:"2006",end:"2009",credits:[{personId:"person_saki_hasemi",roles:["writer"]},{personId:"person_kentaro_yabuki",roles:["artist"]}],genres:["Comédia","Harém","Ficção científica","Ecchi"],themes:["Alienígenas","Noivado","Fanservice"],description:"Uma princesa alienígena transforma a vida e a paixão escolar de Rito numa sucessão de noivados, invenções e acidentes corporais; a continuação Darkness explicita o projeto de harém.",sourceTitle:"To Love Ru — Seven Seas",sourceUrl:"https://sevenseasentertainment.com/series/to-love-ru/",imageFile:"to-love-ru-01-02.jpg",imageCredit:"Seven Seas / Shueisha",width:320,height:456,volumeCount:18}),
  manga({id:"yuuna",slug:"yuuna-and-the-haunted-hot-springs",originalTitle:"ゆらぎ荘の幽奈さん",titleBr:"Yuuna and the Haunted Hot Springs",romanizedTitle:"Yuragi-sō no Yūna-san",start:"2016",end:"2020",credits:[{personId:"person_tadahiro_miura",roles:["writer","artist"]}],genres:["Comédia sobrenatural","Harém","Ecchi"],themes:["Fantasmas","Pensão","Exorcismo"],description:"Um médium sem dinheiro vive numa antiga pousada termal e tenta ajudar o fantasma Yuuna enquanto moradoras sobrenaturais ganham arcos afetivos e de ação.",sourceTitle:"Yuuna and the Haunted Hot Springs — Seven Seas",sourceUrl:"https://sevenseasentertainment.com/series/yuuna-and-the-haunted-hot-springs/",imageFile:"yuuna-01.jpg",imageCredit:"Seven Seas / Shueisha",width:320,height:451,volumeCount:24}),
  manga({id:"girlfriend_girlfriend",slug:"girlfriend-girlfriend",originalTitle:"カノジョも彼女",titleBr:"Girlfriend, Girlfriend",romanizedTitle:"Kanojo mo Kanojo",start:"2020",end:"2023",credits:[{personId:"person_hiroyuki_mangaka",roles:["writer","artist"]}],genres:["Comédia romântica","Harém"],themes:["Não monogamia","Honestidade","Convivência"],description:"Naoya pede à namorada autorização para iniciar um segundo relacionamento, colocando negociação e convivência no centro de uma comédia de decisões extremas.",sourceTitle:"Girlfriend, Girlfriend — Kodansha",sourceUrl:"https://kodansha.us/series/girlfriend-girlfriend/",imageFile:"girlfriend-girlfriend-01.webp",imageCredit:"Kodansha / Hiroyuki",width:800,height:1140,volumeCount:16}),
  manga({id:"cafe_terrace",slug:"the-cafe-terrace-and-its-goddesses",originalTitle:"女神のカフェテラス",titleBr:"The Café Terrace and Its Goddesses",romanizedTitle:"Megami no Café Terrace",start:"2021",end:"2025",credits:[{personId:"person_kouji_seo",roles:["writer","artist"]}],genres:["Comédia romântica","Harém"],themes:["Café","Família escolhida","Trabalho"],description:"Ao herdar um café litorâneo, Hayato passa a trabalhar e morar com cinco jovens ligadas à sua avó; a rotina profissional sustenta a aproximação romântica.",sourceTitle:"The Café Terrace and Its Goddesses — Kodansha",sourceUrl:"https://kodansha.us/book/the-cafe-terrace-and-its-goddesses/",imageFile:"cafe-terrace-01.webp",imageCredit:"Kodansha / Kouji Seo",width:800,height:1200,volumeCount:22}),
  manga({id:"monster_musume",slug:"monster-musume",originalTitle:"モンスター娘のいる日常",titleBr:"Monster Musume",romanizedTitle:"Monster Musume no Iru Nichijō",start:"2012",credits:[{personId:"person_okayado",roles:["writer","artist"]}],genres:["Comédia","Harém","Fantasia","Ecchi"],themes:["Garotas-monstro","Intercâmbio cultural","Convivência"],description:"Um programa governamental instala garotas de espécies fantásticas na casa de Kimihito e transforma diferenças corporais e culturais em comédia romântica explícita.",sourceTitle:"Monster Musume — Seven Seas",sourceUrl:"https://sevenseasentertainment.com/series/monster-musume/",imageFile:"monster-musume-01.jpg",imageCredit:"Seven Seas / Tokuma Shoten",width:320,height:450}),
];
