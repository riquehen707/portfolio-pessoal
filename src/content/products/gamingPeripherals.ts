import type { Product, ProductVariant, ProductOffer } from "./productSchema";
import { amazonBrazilOffer } from "./amazonBrazil";

// Imagens promocionais oficiais hospedadas pelo fabricante.
// Não atribuir preço ou estoque sem consulta atual à página do vendedor.
const checkedAt = "2026-10-13";
const source = (title: string, url: string) => ({ title, url, accessedAt: checkedAt });
const spec = (items: [string, string, string][]): ProductVariant["specifications"] => ({
  type: "generic", groups: [{ label: "Ficha técnica", entries: items.map(([key,label,value]) => ({ key,label,value })) }]
});
const definitions = [
  {
    key:"logitech_g203_lightsync",slug:"mouse-logitech-g203-lightsync",name:"Logitech G203 LIGHTSYNC Preto",
    image:"https://resource.logitechg.com/w_544%2Ch_466%2Car_7%3A6%2Cc_pad%2Cq_auto%2Cf_auto%2Cdpr_1.0/d_transparent.gif/content/dam/gaming/en/products/refreshed-g203/2025-update/g203-mouse-top-angle-black-gallery-1.png",page:"https://www.logitechg.com/pt-br/shop/p/g203-lightsync-rgb-gaming-mouse",asin:"B087CT8PWY",part:"910-005793",
    description:"Mouse gamer com fio, seis botões programáveis, sensor de até 8.000 DPI e iluminação RGB LIGHTSYNC; uma escolha econômica para jogos e trabalho.",
    positives:["Sensor ajustável e seis botões programáveis","Conexão USB sem necessidade de pilhas"],
    negatives:["Formato pode não acomodar todas as pegadas","Cabo pode atrapalhar movimentos em mesas pequenas"],
    targets:["Jogadores com orçamento enxuto","Quem prefere periféricos USB simples"],
    features:[["connection","Conexão","USB com fio"],["dpi","Sensibilidade","Até 8.000 DPI"],["buttons","Botões","6"],["lighting","Iluminação","RGB LIGHTSYNC"]]
  },
  {
    key:"logitech_g305_lightspeed",slug:"mouse-logitech-g305-lightspeed",name:"Logitech G305 LIGHTSPEED Preto",
    image:"https://resource.logitechg.com/w_544%2Ch_466%2Car_7%3A6%2Cc_pad%2Cq_auto%2Cf_auto%2Cdpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g305/2025-update/g305-lightspeed-mouse-top-angle-black-gallery-1.png",page:"https://www.logitechg.com/pt-br/shop/p/g305-lightspeed-wireless-gaming-mouse",asin:"B07GPRWFC5",part:"910-005280",
    description:"Mouse gamer wireless LIGHTSPEED com sensor HERO de até 12.000 DPI, seis botões e alimentação por uma pilha AA, indicado a mesas sem cabo.",
    positives:["Conexão LIGHTSPEED adequada a jogos","Autonomia declarada de até 250 horas com pilha AA"],
    negatives:["Depende de uma pilha AA e receptor USB","Pode custar acima do teto editorial de R$ 200"],
    targets:["Quem busca mouse gamer sem fio","Jogadores que valorizam autonomia"],
    features:[["connection","Conexão","LIGHTSPEED 2,4 GHz"],["dpi","Sensibilidade","Até 12.000 DPI"],["power","Alimentação","1 pilha AA"],["buttons","Botões","6"]]
  }
] as const;
export const gamingPeripheralProducts: Product[] = definitions.map(d => ({
  id:`prod_${d.key}`, contentType:"product",schemaVersion:1,slug:d.slug,aliases:[],name:d.name,manufacturerId:"org_logitech",
  category:"Mouses",subcategory:"Mouses gamer",mainImage:{src:d.image,alt:`${d.name}, foto oficial do fabricante`,sourceUrl:d.page,credit:"Logitech G",rights:"official-promotional",width:600,height:600},
  gallery:[],shortDescription:d.description,strengths:[...d.positives],limitations:[...d.negatives],suitableFor:[...d.targets],
  categories:["Mouses","Periféricos"],tags:["mouse gamer","custo-benefício","Full HD","setup"],
  relatedProductIds:definitions.filter(item=>item.key!==d.key).map(item=>`prod_${item.key}`),
  relatedArticleSlugs:["melhores-mouses-gamer-ate-200"],
  editorialSummary:`${d.description} A recomendação depende do formato da sua mão, do preço vigente e da variante correspondente ao anúncio; não é resultado de teste próprio.`,
  seo:{title:`${d.name}: ficha e ofertas`,description:`Conheça o ${d.name}, seus pontos fortes, limitações e como comparar anúncios de venda e variantes.`},
  sources:[source(`${d.name} — informações oficiais`,d.page)],status:"published",createdAt:checkedAt,publishedAt:checkedAt,updatedAt:checkedAt,reviewedAt:checkedAt
}));
export const gamingPeripheralVariants: ProductVariant[] = definitions.map(d => ({
  id:`prod_variant_${d.key}_br`,productId:`prod_${d.key}`,name:`${d.name} — Brasil`,
  market:"BR",manufacturerModelNumber:d.part,distinguishingAttributes:{cor:"Preto",partNumber:d.part},
  specifications:spec(d.features.map(item=>[item[0],item[1],item[2]] as [string,string,string])),imageIds:[],sources:[source(`${d.name} — ficha técnica`,d.page)],
  status:"published",createdAt:checkedAt,updatedAt:checkedAt,reviewedAt:checkedAt
}));
export const gamingPeripheralOffers: ProductOffer[] = definitions.map(d => amazonBrazilOffer({
  id:`prod_offer_amazon_${d.key}_br`,variantId:`prod_variant_${d.key}_br`,asin:d.asin,
  availability:"unknown",checkedAt
}));
