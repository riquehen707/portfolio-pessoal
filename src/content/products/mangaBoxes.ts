import type { Product, ProductVariant } from "./productSchema";

// Coleções físicas brasileiras identificadas por SKU do editor ou código EAN.
// Não inventar ASIN: busca afiliada por SKU + nome não implica anúncio localizado.
// Imagens promocionais localizadas em catálogos, com reutilização ainda pendente.
const checked = "2026-10-14";
const packs = [
  {
    key:"dragon_ball_vols_1_21_panini", slug:"box-dragon-ball-volumes-1-ao-21-panini",
    name:"Box Dragon Ball — Volumes 1 a 21", maker:"org_panini_brasil",
    code:"AMADR001B", isbn:"9786525937557", range:"1–21 de 42", count:21,
    category:"shonen", age:"12 anos", complete:false, page:"https://panini.com.br/box-dragon-ball-vols-1-ao-21",
    image:"https://d14d9vp3wdof84.cloudfront.net/image/589816272436/image_ogh4jl7pel10dfhb1eh3vsmu6l/-S897-f.webp",
    credit:"Panini — imagem promocional de catálogo",
    description:"Primeiro box brasileiro Dragon Ball, com os volumes 1 a 21 da série de 42 volumes e cinco maxi postais; uma coleção clássica de ação e humor.",
    strengths:["Apresentação em caixa própria com 21 volumes sequenciais","Inclui cinco maxi postais segundo a Panini"],
    limitations:["Não traz os volumes 22 a 42: é apenas a primeira metade","O volume total é grande e torna o presente volumoso e caro"],
    suitable:["Fãs de Dragon Ball que querem começar a coleção física","Presente especial para leitores de aventura e mangá shonen"],
  },
  {
    key:"demon_slayer_1_23_panini",slug:"box-demon-slayer-1-ao-23-panini",
    name:"Box Demon Slayer — Volumes 1 a 23",maker:"org_panini_brasil",
    code:"ABDSL002BR",isbn:"",range:"1–23 (história principal completa)",count:23,
    category:"shonen",age:"16 anos",complete:true,page:"https://panini.com.br/box-demon-slayer-vols-1-ao-23",
    image:"https://static.wixstatic.com/media/62fbbf_55889092d85844f18b0ff92bb086917d~mv2.jpg/v1/fill/w_980%2Ch_980%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/62fbbf_55889092d85844f18b0ff92bb086917d~mv2.jpg",
    credit:"Panini / fotografia de catálogo Pure Brasil",
    description:"Coleção completa da história principal de Demon Slayer: Kimetsu no Yaiba em 23 volumes, apresentada como box físico brasileiro.",
    strengths:["Reúne o mangá principal completo, sem necessidade de comprar volumes adicionais da história central","Embalagem pensada para coleção e presente"],
    limitations:["Não inclui todos os artbooks, histórias derivadas ou materiais complementares","É um presente caro e ocupa espaço considerável"],
    suitable:["Fãs do anime que querem ler a história original até o fim","Presente de destaque para colecionador de shonen"],
  },
  {
    key:"chainsaw_man_1_11_panini",slug:"box-chainsaw-man-volumes-1-ao-11-panini",
    name:"Box Chainsaw Man — Volumes 1 a 11",maker:"org_panini_brasil",
    code:"ACHAB001BR2",isbn:"",range:"1–11 (primeiro arco completo)",count:11,
    category:"shonen",age:"18 anos",complete:false,page:"https://panini.com.br/box-chainsaw-man-vols-1-ao-11-achab001br2",
    image:"https://down-br.img.susercontent.com/file/br-11134207-81z1k-mh42radrr5l121",
    credit:"Panini / fotografia promocional de vendedor na Shopee",
    description:"Box brasileiro com os 11 volumes do primeiro arco de Chainsaw Man, de Tatsuki Fujimoto; a série continua após esse arco.",
    strengths:["O primeiro arco de Chainsaw Man está completo nos onze volumes","Formato de caixa facilita presentear quem já conhece o universo da obra"],
    limitations:["Não completa o mangá: outros volumes e arcos vêm depois","Conteúdo com violência intensa e classificação indicada de 18 anos"],
    suitable:["Leitores de ação sobrenatural e histórias mais sombrias","Fãs de Chainsaw Man interessados no primeiro arco encadernado"],
  },
  {
    key:"hellsing_1_10_jbc",slug:"box-hellsing-edicao-colecionador-1-ao-10-jbc",
    name:"Box Hellsing — Edição de Colecionador 1 a 10",maker:"org_jbc",
    code:"7898312962337",isbn:"",range:"1–10 (completo)",count:10,
    category:"seinen",age:"18 anos",complete:true,page:"https://editorajbc.com.br/mangas/colecao/box-hellsing/vol/box-hellsing/",
    image:"https://images-na.ssl-images-amazon.com/images/I/8166Dtm6DXL.jpg",
    credit:"JBC / fotografia da caixa em catálogo Amazon",
    description:"Box nacional JBC que reúne os dez volumes de Hellsing na Edição de Colecionador e marcador exclusivo, com ação e horror de temática vampírica.",
    strengths:["Coleção de dez volumes completa no box identificado pela JBC","Brinde de marcador e apresentação uniforme para a estante"],
    limitations:["Classificação 18 anos e violência explícita exigem conhecer o perfil do presenteado","Não substitui eventuais edições posteriores ou materiais de outra linha editorial"],
    suitable:["Leitores de horror, vampiros e ação sobrenatural","Colecionadores que querem uma série concluída em português"],
  },
  {
    key:"steins_gate_1_3_jbc",slug:"box-steins-gate-volumes-1-ao-3-jbc",
    name:"Box Steins;Gate — Volumes 1 a 3",maker:"org_jbc",
    code:"7898312961552",isbn:"",range:"1–3 (adaptação em mangá completa)",count:3,
    category:"ficção científica",age:"14 anos",complete:true,page:"https://editorajbc.com.br/mangas/colecao/box-steinsgate/vol/box-steins-gate/",
    image:"https://down-br.img.susercontent.com/file/8f46a2064430d70404073518093be17a",
    credit:"JBC / foto do box brasileiro em marketplace",
    description:"Box de três volumes que reúne a adaptação em mangá de Steins;Gate, de Yomi Sarachi, com um marcador temático.",
    strengths:["Três volumes formam uma coleção curta e concluída","Temas de viagem no tempo e ficção científica podem agradar fãs de jogos e anime"],
    limitations:["É adaptação condensada; não substitui todo o conteúdo do jogo original","O box específico pode ser mais difícil de encontrar novo"],
    suitable:["Fãs de Steins;Gate que desejam um item de coleção","Presente menor para quem gosta de ficção científica japonesa"],
  },
  {
    key:"wish_1_4_jbc",slug:"box-wish-clamp-volumes-1-ao-4-jbc",
    name:"Box Wish — Volumes 1 a 4 (CLAMP)",maker:"org_jbc",
    code:"7898312961576",isbn:"",range:"1–4 (completo)",count:4,
    category:"romance fantástico",age:"Livre",complete:true,page:"https://editorajbc.com.br/mangas/colecao/box-wish/vol/box-wish/",
    image:"https://down-br.img.susercontent.com/file/cff2ce4a6d080ec60e5d7ff9e4b7a307",
    credit:"JBC / fotografia promocional de box em marketplace",
    description:"Box com os quatro volumes completos de Wish, do grupo CLAMP, e marcador exclusivo; combina romance, fantasia e humor.",
    strengths:["História curta completa em quatro volumes","Marcador e caixa tornam o conjunto adequado para presente"],
    limitations:["O tom delicado e fantasioso não é adequado a quem procura batalhas e ação intensa","Confirme o estado da caixa e das edições, pois é uma coleção mais antiga"],
    suitable:["Leitores de romance fantástico e fãs de CLAMP","Presente de coleção compacto e com leitura concluída"],
  },
] as const;

const spec = (items:Array<[string,string,string]>):ProductVariant["specifications"] => ({
  type:"generic",groups:[{label:"Conteúdo do box",entries:items.map(([key,label,value])=>({key,label,value}))}]
});

export const mangaBoxProducts: Product[] = packs.map(d=>({
  id:`prod_manga_box_${d.key}`,contentType:"product",schemaVersion:1,slug:d.slug,aliases:[],
  name:d.name,manufacturerId:d.maker,category:"Boxes de mangá",subcategory:"Mangás brasileiros em box",
  mainImage:{src:d.image,alt:`${d.name}: fotografia da caixa física brasileira`,sourceUrl:d.page,
    credit:d.credit,rights:"permission-pending",width:600,height:600},
  gallery:[],shortDescription:d.description,strengths:[...d.strengths],limitations:[...d.limitations],
  suitableFor:[...d.suitable],categories:["Boxes de mangá","Mangás"],tags:["mangá","box","presente","colecionáveis"],
  relatedProductIds:packs.filter(other=>other.key!==d.key).map(other=>`prod_manga_box_${other.key}`),
  relatedArticleSlugs:["melhores-boxes-de-mangas-para-comprar-ou-presentear"],
  editorialSummary:`${d.description} A numeração informa exatamente o conteúdo da caixa, que pode abranger série inteira ou apenas parte dela. Sem ASIN conferido, a busca afiliada não é uma oferta confirmada.`,
  seo:{title:`${d.name}: conteúdo, volumes e compra`,description:`${d.name}: compare volumes, caixa, classificação indicativa, vantagens, limitações e a edição brasileira correta.`},
  sources:[{title:`${d.name} — registro oficial da editora`,url:d.page,accessedAt:checked}],
  status:"published",createdAt:checked,publishedAt:checked,updatedAt:checked,reviewedAt:checked,
}));

export const mangaBoxVariants: ProductVariant[] = packs.map(d=>({
  id:`prod_variant_manga_box_${d.key}_br`,productId:`prod_manga_box_${d.key}`,
  name:`${d.name} — box brasileiro`,market:"BR",manufacturerModelNumber:d.code,
  distinguishingAttributes:{codigo:d.code,volumes:d.range},
  specifications:spec([
    ["range","Volumes incluídos",d.range],["count","Quantidade",String(d.count)],
    ["completeness","Abrangência",d.complete?"Série/parte adaptada completa":"Parte da coleção"],
    ["age","Classificação editorial",d.age],["publisher","Editora",d.maker==="org_panini_brasil"?"Panini":"JBC"],
  ]),
  imageIds:[],sources:[{title:`${d.name} — caixa e conteúdo`,url:d.page,accessedAt:checked}],
  status:"published",createdAt:checked,updatedAt:checked,reviewedAt:checked,
}));
