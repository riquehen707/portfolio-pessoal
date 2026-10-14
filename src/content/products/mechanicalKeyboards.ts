import type { Product, ProductVariant, ProductOffer } from "./productSchema";
import { amazonBrazilOffer } from "./amazonBrazil";

const checkedAt="2026-10-13";
const source=(title:string,url:string)=>({title,url,accessedAt:checkedAt});
const spec=(items:Array<[string,string,string]>):ProductVariant["specifications"]=>({type:"generic",groups:[{label:"Características do teclado",entries:items.map(([key,label,value])=>({key,label,value}))}]});
const models=[
  {
    key:"redragon_kumara_pro_brown",slug:"redragon-kumara-pro-rgb-brown-abnt2",name:"Redragon Kumara Pro RGB Brown ABNT2",
    brand:"org_redragon",asin:"B0C1QFVYQJ",part:"K552RGB-BRS-B",
    page:"https://www.redragon.com.br/kumarapro-br",
    photo:"https://static.wixstatic.com/media/71a6c2_21b12e8e30134f73bd478050788344a1~mv2.png/v1/crop/x_0%2Cy_435%2Cw_1600%2Ch_826/fill/w_883%2Ch_456%2Cal_c%2Cq_90%2Cusm_0.66_1.00_0.01%2Cenc_avif%2Cquality_auto/K552RGB-BRS-B%20%281%29.png",
    credit:"Redragon Brasil — imagem promocional oficial",rights:"official-promotional" as const,
    description:"Teclado mecânico TKL de layout ABNT2, iluminação RGB e switches Redragon Brown substituíveis, para quem precisa de teclas direcionais.",
    strengths:["Layout ABNT2 e formato TKL facilitam digitar e jogar","Switches brown táteis e hot-swap DIY permitem personalização"],
    limitations:["O nome Kumara inclui variantes com conectividade e switches diferentes","Confirme a variante Brown K552RGB-BRS-B no anúncio antes de comprar"],
    suitable:["Jogadores que querem teclas direcionais e layout brasileiro","Uso misto com escrita e jogos em mesa compacta"],
    entries:[["layout","Layout","ABNT2 TKL"],["switch","Switch","Redragon Brown mecânico"],["keys","Keycaps","ABS doubleshot"],["connect","Conexão","Checar lote: fabricante informa USB-C; anúncios variam"]]
  },
  {
    key:"logitech_g413_tkl_se_br",slug:"logitech-g413-tkl-se-abnt2",name:"Logitech G413 TKL SE ABNT2",
    brand:"org_logitech",asin:"B0BXM4Q67V",part:"920-010562",
    page:"https://www.logitechstore.com.br/teclado-gamer-com-fio-usb-logitech-g-g413-tkl-se-preto-com-layout-brasileiro-abnt2/",
    photo:"https://resource.logitechg.com/w_544%2Ch_466%2Car_7%3A6%2Cc_pad%2Cq_auto%2Cf_auto%2Cdpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g413-se-tkl/2025/gallery/g413-tkl-se-mechanical-keyboard-top-angle-gallery-1.png",
    credit:"Logitech G — imagem internacional ilustrativa; confirme padrão ABNT2 do anúncio",rights:"official-promotional" as const,
    description:"Teclado mecânico com fio e formato TKL, switches táteis, teclas PBT e iluminação branca, com variante brasileira ABNT2.",
    strengths:["Keycaps PBT e chassi superior de alumínio escovado","Marca com suporte local e formato TKL com teclas dedicadas"],
    limitations:["O preço pode superar modelos mais acessíveis com hot-swap","Imagem internacional do fabricante pode mostrar distribuição de teclas diferente de ABNT2"],
    suitable:["Quem quer teclas PBT e um teclado pronto para usar","Pessoa que prefere perfil sóbrio e iluminação branca"],
    entries:[["layout","Layout","ABNT2 TKL (part. 920-010562)"],["switch","Switch","Mecânico tátil"],["light","Iluminação","Branca"],["connection","Conexão","USB com fio"]]
  }
] as const;

export const mechanicalKeyboardProducts:Product[]=models.map(d=>({
  id:`prod_${d.key}`,contentType:"product",schemaVersion:1,slug:d.slug,aliases:[],name:d.name,manufacturerId:d.brand,
  category:"Teclados",subcategory:"Teclados mecânicos",
  mainImage:{src:d.photo,alt:`${d.name}; imagem promocional, confira a variante`,sourceUrl:d.page,credit:d.credit,rights:d.rights,width:600,height:600},
  gallery:[],shortDescription:d.description,strengths:[...d.strengths],limitations:[...d.limitations],suitableFor:[...d.suitable],
  categories:["Teclados","Periféricos"],tags:["teclado mecânico","ABNT2","TKL","custo-benefício"],
  relatedProductIds:models.filter(x=>x.key!==d.key).map(x=>`prod_${x.key}`),
  relatedArticleSlugs:["melhores-teclados-mecanicos-custo-beneficio"],
  editorialSummary:`${d.description} Verifique número exato da peça, layout físico ABNT2, conectividade e condições de garantia antes de comprar; não foram realizados testes próprios.`,
  seo:{title:`${d.name}: ficha e ofertas`,description:`Ficha do ${d.name}, layout, switches, vantagens, limitações e ofertas Amazon por variante.`},
  sources:[source(`${d.name} — informações oficiais`,d.page)],status:"published",
  createdAt:checkedAt,publishedAt:checkedAt,updatedAt:checkedAt,reviewedAt:checkedAt
}));
export const mechanicalKeyboardVariants:ProductVariant[]=models.map(d=>({
  id:`prod_variant_${d.key}_br`,productId:`prod_${d.key}`,name:`${d.name} — Brasil`,
  market:"BR",manufacturerModelNumber:d.part,distinguishingAttributes:{layout:"ABNT2",partNumber:d.part},
  specifications:spec(d.entries.map(e=>[e[0],e[1],e[2]] as [string,string,string])),
  imageIds:[],sources:[source(`${d.name} — fabricante`,d.page)],status:"published",
  createdAt:checkedAt,updatedAt:checkedAt,reviewedAt:checkedAt
}));
export const mechanicalKeyboardOffers:ProductOffer[]=models.map(d=>amazonBrazilOffer({
  id:`prod_offer_amazon_${d.key}_br`,variantId:`prod_variant_${d.key}_br`,asin:d.asin,
  availability:"unknown",checkedAt
}));
