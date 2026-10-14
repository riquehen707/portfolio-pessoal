import type { Product, ProductVariant, ProductOffer } from "./productSchema";
import { amazonBrazilOffer } from "./amazonBrazil";

const checkedAt="2026-10-13";
const source=(title:string,url:string)=>({title,url,accessedAt:checkedAt});
const spec=(items:Array<[string,string,string]>):ProductVariant["specifications"]=>({type:"generic",groups:[{label:"Rede e conectividade",entries:items.map(([key,label,value])=>({key,label,value}))}]});
const routers=[
  {
    key:"tp_link_archer_ax12",slug:"tp-link-archer-ax12",name:"TP-Link Archer AX12 (AX1500)",
    asin:"B0C4SN9V5K",model:"Archer AX12",page:"https://www.tp-link.com/br/home-networking/wifi-router/archer-ax12/",
    photo:"https://static.tp-link.com/upload/image-line/Archer_AX12_1_normal_20230704125456u.jpg",
    description:"Roteador dual band Wi-Fi 6 AX1500 com uma porta WAN Gigabit, três LAN Gigabit e quatro antenas; boa entrada para atualizar uma rede doméstica.",
    strengths:["Portas Gigabit e WPA3 para rede residencial","Wi-Fi 6 com OFDMA e recursos modernos em preço de entrada"],
    limitations:["Velocidade máxima teórica de 1.201 Mb/s em 5 GHz não equivale a velocidade real de internet","Somente três portas LAN e sem canal de 160 MHz"],
    suitable:["Casa pequena ou apartamento com até alguns cômodos","Planos de banda larga de até 1 Gb/s, respeitando capacidade real de cada cliente"],
    entries:[["class","Classe Wi-Fi","AX1500"],["5g","5 GHz","Até 1.201 Mb/s teóricos"],["2g","2,4 GHz","Até 300 Mb/s teóricos"],["ethernet","Portas","1 WAN + 3 LAN Gigabit"]]
  },
  {
    key:"tp_link_archer_ax53",slug:"tp-link-archer-ax53",name:"TP-Link Archer AX53 (AX3000)",
    asin:"B09NC4SSSQ",model:"Archer AX53",page:"https://www.tp-link.com/br/home-networking/wifi-router/archer-ax53/",
    photo:"https://static.tp-link.com/upload/image-line/1_normal_20250625130539u.jpg",
    description:"Roteador dual band Wi-Fi 6 AX3000 com canal de 160 MHz, WAN e LAN Gigabit, voltado a clientes Wi-Fi 6 compatíveis e maior demanda.",
    strengths:["Canal de 160 MHz em 5 GHz com clientes compatíveis","Quatro portas LAN Gigabit e suporte a segurança WPA3"],
    limitations:["Porta WAN Gigabit limita a internet contratada acima de 1 Gb/s","160 MHz não garante desempenho superior em ambiente com congestionamento"],
    suitable:["Casas com vários dispositivos Wi-Fi 6","Quem pode se beneficiar da largura de canal maior em locais pouco congestionados"],
    entries:[["class","Classe Wi-Fi","AX3000"],["5g","5 GHz","Até 2.402 Mb/s teóricos"],["2g","2,4 GHz","Até 574 Mb/s teóricos"],["ethernet","Portas","1 WAN + 4 LAN Gigabit"]]
  }
] as const;

export const homeNetworkProducts:Product[]=routers.map(d=>({
  id:`prod_${d.key}`,contentType:"product",schemaVersion:1,slug:d.slug,aliases:[],name:d.name,manufacturerId:"org_tp_link",
  category:"Roteadores",subcategory:"Roteadores Wi-Fi 6",
  mainImage:{src:d.photo,alt:`${d.name}, imagem oficial da TP-Link`,sourceUrl:d.page,credit:"TP-Link",rights:"official-promotional",width:600,height:600},
  gallery:[],shortDescription:d.description,strengths:[...d.strengths],limitations:[...d.limitations],suitableFor:[...d.suitable],
  categories:["Roteadores","Redes"],tags:["Wi-Fi 6","roteador","casa","AX1500","AX3000"],
  relatedProductIds:routers.filter(x=>x.key!==d.key).map(x=>`prod_${x.key}`),
  relatedArticleSlugs:["melhores-roteadores-wifi-6-para-casa"],
  editorialSummary:`${d.description} Os valores AX são velocidades somadas de enlace, não resultado de teste independente. Confirme a revisão de hardware e a garantia do mercado brasileiro.`,
  seo:{title:`${d.name}: ficha e ofertas`,description:`Ficha do ${d.name} com velocidades teóricas, portas, pontos de atenção e ofertas de roteadores Wi-Fi 6.`},
  sources:[source(`${d.name} — TP-Link Brasil`,d.page)],status:"published",
  createdAt:checkedAt,publishedAt:checkedAt,updatedAt:checkedAt,reviewedAt:checkedAt
}));
export const homeNetworkVariants:ProductVariant[]=routers.map(d=>({
  id:`prod_variant_${d.key}_br`,productId:`prod_${d.key}`,name:`${d.name} — Brasil`,
  market:"BR",manufacturerModelNumber:d.model,distinguishingAttributes:{modelo:d.model},
  specifications:spec(d.entries.map(e=>[e[0],e[1],e[2]] as [string,string,string])),imageIds:[],
  sources:[source(`${d.name} — especificações oficiais`,d.page)],status:"published",
  createdAt:checkedAt,updatedAt:checkedAt,reviewedAt:checkedAt
}));
export const homeNetworkOffers:ProductOffer[]=routers.map(d=>amazonBrazilOffer({
  id:`prod_offer_amazon_${d.key}_br`,variantId:`prod_variant_${d.key}_br`,asin:d.asin,
  availability:"unknown",checkedAt
}));
