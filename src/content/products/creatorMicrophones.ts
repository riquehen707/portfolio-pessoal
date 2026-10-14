import type { Product, ProductVariant, ProductOffer } from "./productSchema";
import { amazonBrazilOffer } from "./amazonBrazil";

const checkedAt = "2026-10-13";
const source = (title:string,url:string)=>({title,url,accessedAt:checkedAt});
const spec=(entries:Array<[string,string,string]>):ProductVariant["specifications"]=>({type:"generic",groups:[{label:"Captação e conexões",entries:entries.map(([key,label,value])=>({key,label,value}))}]});
const mics=[
  {
    key:"hyperx_solocast_black",slug:"hyperx-solocast-preto",name:"HyperX SoloCast Preto",
    brand:"org_hyperx",asin:"B08KFL3SFV",part:"HMIS1X-XX-BK/G",page:"https://row.hyperx.com/products/hyperx-solocast-usb-microphone",
    photo:"https://row.hyperx.com/cdn/shop/products/hyperx_solocast_05_angled_2048x2048.jpg?v=1662449693",
    credit:"HyperX",rights:"official-promotional" as const,
    description:"Microfone condensador cardioide USB-C com mute por toque e suporte de mesa articulado, indicado para começar a gravar voz e fazer lives.",
    strengths:["Instalação plug-and-play sem interface de áudio externa","Sensor de mute por toque com indicador visual"],
    limitations:["Em ambientes reverberantes, capta ruído se ficar longe da boca","Sem saída XLR ou controles físicos avançados de ganho"],
    targets:["Criadores iniciantes em vídeos e reuniões","Quem quer microfone USB compacto e fácil de usar"],
    entries:[["type","Cápsula","Condensador cardioide"],["connection","Conexão","USB-C"],["mute","Mute","Toque no corpo"],["resolution","Captura","Até 24 bits / 96 kHz"]]
  },
  {
    key:"fifine_am8_black",slug:"fifine-am8-preto",name:"FIFINE AmpliGame AM8 Preto",
    brand:"org_fifine",asin:"B0BMFQP2ZZ",part:"AM8",page:"https://fifinemicrophone.com/products/fifine-ampligame-am8-microphone",
    photo:"https://cntronic.com/data/product/lg/ila-116788-1.webp",
    credit:"FIFINE, fotografia promocional reproduzida por revendedor",rights:"permission-pending" as const,
    description:"Microfone dinâmico cardioide para voz próxima, com conexões USB e XLR, monitoramento por fone e controles físicos no modo USB.",
    strengths:["Entrada USB e saída XLR oferecem flexibilidade para atualizar o setup","Mute, ganho e monitoramento são práticos no modo USB"],
    limitations:["Em modo XLR, controles USB e iluminação RGB ficam inativos","Não elimina ruído do ambiente automaticamente e precisa de boa posição"],
    targets:["Quem faz lives e grava voz próximo à cápsula","Usuário que pode migrar futuramente para interface XLR"],
    entries:[["type","Cápsula","Dinâmico cardioide"],["connection","Conexão","USB-C e XLR"],["monitor","Monitoramento","Saída 3,5 mm em USB"],["frequency","Resposta","50 Hz – 16 kHz"]]
  }
] as const;

export const creatorMicrophoneProducts:Product[]=mics.map(d=>({
  id:`prod_${d.key}`,contentType:"product",schemaVersion:1,slug:d.slug,aliases:[],name:d.name,manufacturerId:d.brand,
  category:"Microfones USB",subcategory:"Microfone de mesa",
  mainImage:{src:d.photo,alt:`${d.name}, fotografia do modelo`,sourceUrl:d.page,credit:d.credit,rights:d.rights,width:600,height:600},
  gallery:[],shortDescription:d.description,strengths:[...d.strengths],limitations:[...d.limitations],suitableFor:[...d.targets],
  categories:["Microfones USB","Áudio"],tags:["microfone","vídeos","lives","USB","podcast"],
  relatedProductIds:mics.filter(x=>x.key!==d.key).map(x=>`prod_${x.key}`),
  relatedArticleSlugs:["melhores-microfones-usb-para-videos-e-lives"],
  editorialSummary:`${d.description} Avalie ruído, posição, conexões, acessórios da caixa, garantia no Brasil e preço vigente; não foram feitos testes de captação próprios.`,
  seo:{title:`${d.name}: ficha e ofertas`,description:`Ficha do ${d.name} para gravar vídeos e lives: vantagens, limitações e links da Amazon por ASIN.`},
  sources:[source(`${d.name} — fabricante`,d.page)],status:"published",
  createdAt:checkedAt,publishedAt:checkedAt,updatedAt:checkedAt,reviewedAt:checkedAt
}));
export const creatorMicrophoneVariants:ProductVariant[]=mics.map(d=>({
  id:`prod_variant_${d.key}_br`,productId:`prod_${d.key}`,name:`${d.name} — produto base, sem kit extra`,
  market:"BR",manufacturerModelNumber:d.part,distinguishingAttributes:{cor:"Preto",kit:"Base de mesa"},
  specifications:spec(d.entries.map(e=>[e[0],e[1],e[2]] as [string,string,string])),
  imageIds:[],sources:[source(`${d.name} — fabricante`,d.page)],status:"published",
  createdAt:checkedAt,updatedAt:checkedAt,reviewedAt:checkedAt
}));
export const creatorMicrophoneOffers:ProductOffer[]=mics.map(d=>amazonBrazilOffer({
  id:`prod_offer_amazon_${d.key}_br`,variantId:`prod_variant_${d.key}_br`,asin:d.asin,
  availability:"unknown",checkedAt
}));
