import type { Product, ProductOffer, ProductVariant } from "./productSchema";
import { amazonBrazilOffer } from "./amazonBrazil";

const reviewedAt = "2026-10-13";
const source = (title: string, url: string) => ({ title, url, accessedAt: reviewedAt });
const spec = (items: Array<[string,string,string]>): ProductVariant["specifications"] =>
  ({ type:"generic", groups:[{ label:"Especificações do nobreak", entries:items.map(([key,label,value])=>({ key,label,value })) }] });

const intelbrasSeno = [
  {
    id:"intelbras_attiv_seno_700_bi", slug:"intelbras-attiv-seno-700-bi", name:"Intelbras ATTIV SENO 700 VA BI",
    watts:350,va:700,outlets:4,battery:"1 × 12 V / 7 Ah",part:"4820060",asin:"B0CC9RNZVB",
    page:"https://www.intelbras.com/pt-br/nobreak-senoidal-bivolt-attiv-seno-700-va-bi",
    photo:"https://backend.intelbras.com/sites/default/files/styles/image_optim/public/2023-05/ATTIV_SENO_700_persp_dir_1.png?itok=YxqPqNRD",
    description:"Nobreak senoidal puro de 700 VA e 350 W, com entrada bivolt e saída 120 V, voltado a pequenos computadores e home office.",
    strengths:["Saída senoidal compatível com muitas fontes de PFC ativo, respeitando o limite de 350 W","Quatro tomadas permitem preservar um conjunto básico durante quedas breves"],
    limitations:["A capacidade real de 350 W exclui muitos PCs gamers exigentes","Bateria interna de 7 Ah limita autonomia com carga elevada"],
    targets:["Computador leve, monitor e roteador após medição do consumo","Escritório que precisa salvar documentos e desligar com segurança"]
  },
  {
    id:"intelbras_attiv_seno_1000_bi",slug:"intelbras-attiv-seno-1000-bi",name:"Intelbras ATTIV SENO 1000 VA BI",
    watts:500,va:1000,outlets:8,battery:"2 × 12 V / 7 Ah",part:"4820083",asin:"B0CC9R564Y",
    page:"https://www.intelbras.com/pt-br/nobreak-senoidal-bivolt-attiv-seno-1000-va-bi",
    photo:"https://backend.intelbras.com/sites/default/files/2023-03/08%20Persp%20Dir.003.jpg",
    description:"Nobreak senoidal puro de 1.000 VA e 500 W, com entrada bivolt, saída 120 V e oito tomadas para equipamentos de trabalho.",
    strengths:["Potência útil de 500 W suporta cargas maiores que o ATTIV SENO 700","Oito tomadas e duas baterias internas de 7 Ah ampliam a flexibilidade"],
    limitations:["O limite de 500 W ainda pode ser insuficiente para um PC gamer de alta demanda","Saída fixa em 120 V exige checar a tensão dos aparelhos conectados"],
    targets:["Home office com desktop, monitor e equipamentos de rede","PC com PFC ativo dentro do limite em watts e com margem"]
  }
] as const;

export const energyProducts: Product[] = intelbrasSeno.map(d => ({
  id:`prod_${d.id}`,contentType:"product",schemaVersion:1,slug:d.slug,aliases:[],name:d.name,manufacturerId:"org_intelbras",
  category:"Nobreaks",subcategory:"Nobreak senoidal",
  mainImage:{src:d.photo,alt:`${d.name}, foto oficial da Intelbras`,sourceUrl:d.page,credit:"Intelbras",rights:"official-promotional",width:600,height:600},
  gallery:[],shortDescription:d.description,strengths:[...d.strengths],limitations:[...d.limitations],suitableFor:[...d.targets],
  categories:["Nobreaks","Energia"],tags:["nobreak","home office","PFC ativo","onda senoidal"],
  relatedProductIds:intelbrasSeno.filter(x=>x.id!==d.id).map(x=>`prod_${x.id}`),
  relatedArticleSlugs:["melhores-nobreaks-para-pc-e-home-office"],
  editorialSummary:`${d.description} A autonomia real depende da carga, temperatura, estado das baterias e tempo de uso. Dimensione pela potência em watts e confirme a tensão de saída antes de comprar.`,
  seo:{title:`${d.name}: ficha e ofertas`,description:`Conheça o ${d.name}, potência real de ${d.watts} W, forma de onda senoidal, limitações e anúncios do modelo.`},
  sources:[source(`${d.name} — ficha técnica Intelbras`,d.page)],status:"published",
  createdAt:reviewedAt,publishedAt:reviewedAt,updatedAt:reviewedAt,reviewedAt
}));

export const energyVariants: ProductVariant[] = intelbrasSeno.map(d=>({
  id:`prod_variant_${d.id}_br`,productId:`prod_${d.id}`,name:`${d.name} — saída 120 V`,
  market:"BR",manufacturerModelNumber:d.part,distinguishingAttributes:{tensaoSaida:"120 V",tipo:"Senoidal puro"},
  specifications:spec([["va","Potência aparente",`${d.va} VA`],["watts","Potência ativa máxima",`${d.watts} W`],["wave","Onda","Senoidal pura"],["output","Saída","120 V"],["outlets","Tomadas",String(d.outlets)],["battery","Bateria",d.battery]]),
  imageIds:[],sources:[source(`${d.name} — potência e tensão`,d.page)],
  status:"published",createdAt:reviewedAt,updatedAt:reviewedAt,reviewedAt
}));
export const energyOffers: ProductOffer[] = intelbrasSeno.map(d=>amazonBrazilOffer({
  id:`prod_offer_amazon_${d.id}_br`,variantId:`prod_variant_${d.id}_br`,
  asin:d.asin,availability:"unknown",checkedAt:reviewedAt
}));
