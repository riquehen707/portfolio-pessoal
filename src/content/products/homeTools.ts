import type { Product, ProductOffer, ProductVariant } from "./productSchema";
import { amazonBrazilOffer } from "./amazonBrazil";

const reviewedAt = "2026-09-15";
const articleSlug = "kit-de-ferramentas-para-casa";
const source = (title: string, url: string) => ({ title, url, accessedAt: reviewedAt });

export const homeToolProducts: Product[] = [
  {
    id: "prod_bosch_gsb_120_li",
    contentType: "product",
    schemaVersion: 1,
    slug: "bosch-gsb-120-li",
    aliases: [],
    name: "Bosch GSB 120-LI",
    manufacturerId: "org_bosch",
    line: "Bosch Professional 12V System",
    category: "Furadeiras e parafusadeiras",
    mainImage: {
      src: "/images/products/power-tools/bosch-gsb-120-li-v1.png",
      alt: "Furadeira e parafusadeira Bosch GSB 120-LI com maleta, carregador e duas baterias",
      sourceUrl: "https://www.bosch-professional.com/br/pt/products/gsb-120-li-06019G81E0",
      credit: "Bosch Professional Brasil",
      rights: "official-promotional",
      width: 750,
      height: 422,
    },
    gallery: [],
    shortDescription: "Furadeira e parafusadeira de impacto 12 V compacta, com duas velocidades, torque duro de 30 Nm e mandril de 10 mm.",
    strengths: [
      "Corpo leve e compacto facilita montagem de móveis e trabalho dentro de armários",
      "Duas velocidades e 20 ajustes de torque permitem alternar entre parafusar e perfurar",
      "A variante com duas baterias reduz interrupções e já inclui carregador e maleta",
    ],
    limitations: [
      "Mandril de 10 mm e perfuração máxima de 8 mm em alvenaria limitam serviços mais exigentes",
      "O impacto ajuda em furos ocasionais, mas não substitui martelete em concreto estrutural",
    ],
    suitableFor: [
      "Uso doméstico, montagem de móveis e furos ocasionais em madeira, metal e alvenaria",
      "Quem prioriza baixo peso e controle em vez de potência para obras frequentes",
    ],
    categories: ["Furadeiras e parafusadeiras", "Ferramentas elétricas", "Casa"],
    tags: ["12 V", "Impacto", "Duas velocidades", "Bateria"],
    relatedProductIds: ["prod_bosch_gsb_185_li"],
    relatedArticleSlugs: [articleSlug],
    editorialSummary: "É uma opção proporcional para a maior parte dos reparos domésticos: compacta para parafusar móveis, mas ainda capaz de fazer furos pequenos em alvenaria. A compra perde sentido se o uso principal envolver concreto duro, brocas acima de 10 mm ou jornadas repetidas de reforma.",
    seo: {
      title: "Bosch GSB 120-LI: ficha, limites e ofertas",
      description: "Ficha da Bosch GSB 120-LI com torque, velocidades, perfuração, itens do kit, limites para concreto e ofertas verificadas no Brasil.",
    },
    sources: [
      source("Bosch GSB 120-LI — página oficial", "https://www.bosch-professional.com/br/pt/products/gsb-120-li-06019G81E0"),
      source("Catálogo Bosch Professional 2026", "https://www.bosch-professional.com/br/media/country_content/specials/catalogo/catalogo_de_produtos_bosch-_web-compactado.pdf"),
    ],
    status: "published",
    createdAt: reviewedAt,
    publishedAt: reviewedAt,
    updatedAt: reviewedAt,
    reviewedAt,
  },
  {
    id: "prod_bosch_gsb_185_li",
    contentType: "product",
    schemaVersion: 1,
    slug: "bosch-gsb-185-li",
    aliases: [],
    name: "Bosch GSB 185-LI",
    manufacturerId: "org_bosch",
    line: "Bosch Professional 18V System",
    category: "Furadeiras e parafusadeiras",
    mainImage: {
      src: "/images/products/power-tools/bosch-gsb-185-li-v1.png",
      alt: "Furadeira e parafusadeira Bosch GSB 185-LI com maleta, brocas, bits, carregador e bateria",
      sourceUrl: "https://www.bosch-professional.com/br/pt/products/gsb-185-li-06019K31E7",
      credit: "Bosch Professional Brasil",
      rights: "official-promotional",
      width: 750,
      height: 422,
    },
    gallery: [],
    shortDescription: "Furadeira e parafusadeira de impacto 18 V com motor sem escovas, mandril metálico de 13 mm e torque duro de 50 Nm.",
    strengths: [
      "Motor sem escovas, mandril metálico e sistema 18 V atendem uso mais frequente",
      "Corpo de 177 mm mantém acesso a espaços estreitos apesar da categoria mais potente",
      "Perfura madeira até 35 mm e alvenaria ou metal até 10 mm segundo a fabricante",
    ],
    limitations: [
      "Custa mais e pesa mais com bateria que uma opção doméstica compacta de 12 V",
      "Mesmo com impacto, não substitui um martelete apropriado para muitos furos em concreto",
    ],
    suitableFor: [
      "Quem monta móveis, instala prateleiras e executa pequenas reformas com frequência",
      "Quem pretende compartilhar baterias com outras ferramentas Bosch Professional de 18 V",
    ],
    categories: ["Furadeiras e parafusadeiras", "Ferramentas elétricas", "Casa"],
    tags: ["18 V", "Motor sem escovas", "Impacto", "Mandril de 13 mm"],
    relatedProductIds: ["prod_bosch_gsb_120_li"],
    relatedArticleSlugs: [articleSlug],
    editorialSummary: "É a escolha para uso doméstico frequente e pequenas reformas, não um requisito para toda casa. Motor sem escovas, mandril de 13 mm e plataforma 18 V ampliam capacidade e durabilidade; quem apenas monta um móvel e faz poucos furos aproveita melhor uma ferramenta menor.",
    seo: {
      title: "Bosch GSB 185-LI: ficha, usos e ofertas",
      description: "Ficha da Bosch GSB 185-LI com motor sem escovas, torque, mandril, capacidade de perfuração, itens do kit e ofertas no Brasil.",
    },
    sources: [source("Bosch GSB 185-LI — página oficial", "https://www.bosch-professional.com/br/pt/products/gsb-185-li-06019K31E7")],
    status: "published",
    createdAt: reviewedAt,
    publishedAt: reviewedAt,
    updatedAt: reviewedAt,
    reviewedAt,
  },
];

export const homeToolVariants: ProductVariant[] = [
  {
    id: "prod_variant_bosch_gsb_120_li_2b_br",
    productId: "prod_bosch_gsb_120_li",
    name: "GSB 120-LI com duas baterias, carregador e maleta",
    market: "BR",
    manufacturerModelNumber: "06019G81E0",
    gtin: "3165140955737",
    distinguishingAttributes: { voltage: "12 V", batteries: "2 × 2,0 Ah", chuck: "10 mm" },
    specifications: {
      type: "generic",
      groups: [
        { label: "Desempenho", entries: [
          { key: "torque", label: "Torque suave/duro", value: "14/30 Nm" },
          { key: "speed", label: "Rotações sem carga", value: "0–400 / 0–1.500 rpm" },
          { key: "impact", label: "Impactos", value: "Até 22.500 ipm" },
          { key: "settings", label: "Ajustes", value: "20 posições de torque + perfuração + impacto" },
        ] },
        { label: "Capacidade e conjunto", entries: [
          { key: "chuck", label: "Mandril", value: "Aperto rápido de 0,8 a 10 mm" },
          { key: "capacity", label: "Perfuração máxima", value: "20 mm em madeira; 10 mm em aço; 8 mm em alvenaria" },
          { key: "weight", label: "Peso sem bateria", value: "0,9 kg" },
          { key: "included", label: "Incluído", value: "Duas baterias 12 V 2,0 Ah, carregador GAL 12V-20 e maleta" },
        ] },
      ],
    },
    imageIds: [],
    sources: [source("Bosch GSB 120-LI — página oficial", "https://www.bosch-professional.com/br/pt/products/gsb-120-li-06019G81E0")],
    status: "published",
    createdAt: reviewedAt,
    updatedAt: reviewedAt,
    reviewedAt,
  },
  {
    id: "prod_variant_bosch_gsb_185_li_2b_br",
    productId: "prod_bosch_gsb_185_li",
    name: "GSB 185-LI com duas baterias, carregador e maleta",
    market: "BR",
    manufacturerModelNumber: "06019K31E5",
    gtin: "4059952660981",
    distinguishingAttributes: { voltage: "18 V", batteries: "2 × 2,0 Ah", chuck: "13 mm" },
    specifications: {
      type: "generic",
      groups: [
        { label: "Desempenho", entries: [
          { key: "motor", label: "Motor", value: "Sem escovas" },
          { key: "torque", label: "Torque suave/duro", value: "21/50 Nm" },
          { key: "speed", label: "Rotações sem carga", value: "0–500 / 0–1.900 rpm" },
          { key: "impact", label: "Impactos", value: "Até 27.000 ipm" },
        ] },
        { label: "Capacidade e conjunto", entries: [
          { key: "chuck", label: "Mandril", value: "Metálico, de 1,5 a 13 mm" },
          { key: "capacity", label: "Perfuração máxima", value: "35 mm em madeira; 10 mm em aço ou alvenaria" },
          { key: "weight", label: "Peso", value: "0,89 kg sem bateria; 1,3 kg com bateria" },
          { key: "included", label: "Incluído", value: "Duas baterias 18 V 2,0 Ah, carregador GAL 18V-20 e maleta" },
        ] },
      ],
    },
    imageIds: [],
    sources: [source("Bosch GSB 185-LI 06019K31E5 — página oficial", "https://www.bosch-professional.com/br/pt/products/gsb-185-li-06019K31E5")],
    status: "published",
    createdAt: reviewedAt,
    updatedAt: reviewedAt,
    reviewedAt,
  },
  {
    id: "prod_variant_bosch_gsb_185_li_2b_23ac_br",
    productId: "prod_bosch_gsb_185_li",
    name: "GSB 185-LI com duas baterias, carregador, maleta e 23 acessórios",
    market: "BR",
    manufacturerModelNumber: "06019K31E7",
    gtin: "4059952661001",
    distinguishingAttributes: { voltage: "18 V", batteries: "2 × 2,0 Ah", chuck: "13 mm" },
    specifications: {
      type: "generic",
      groups: [
        { label: "Desempenho", entries: [
          { key: "motor", label: "Motor", value: "Sem escovas" },
          { key: "torque", label: "Torque suave/duro", value: "21/50 Nm" },
          { key: "speed", label: "Rotações sem carga", value: "0–500 / 0–1.900 rpm" },
          { key: "impact", label: "Impactos", value: "Até 27.000 ipm" },
        ] },
        { label: "Capacidade e conjunto", entries: [
          { key: "chuck", label: "Mandril", value: "Metálico, de 1,5 a 13 mm" },
          { key: "capacity", label: "Perfuração máxima", value: "35 mm em madeira; 10 mm em aço ou alvenaria" },
          { key: "weight", label: "Peso", value: "0,89 kg sem bateria; 1,3 kg com bateria" },
          { key: "included", label: "Incluído", value: "Duas baterias 18 V 2,0 Ah, carregador GAL 18V-20, maleta e 23 brocas/bits" },
        ] },
      ],
    },
    imageIds: [],
    sources: [source("Bosch GSB 185-LI — página oficial", "https://www.bosch-professional.com/br/pt/products/gsb-185-li-06019K31E7")],
    status: "published",
    createdAt: reviewedAt,
    updatedAt: reviewedAt,
    reviewedAt,
  },
];

export const homeToolOffers: ProductOffer[] = [
  amazonBrazilOffer({
    id: "prod_offer_amazon_bosch_gsb_120_li",
    variantId: "prod_variant_bosch_gsb_120_li_2b_br",
    asin: "B084D9V1TY",
    observedPrice: { amount: 709, currency: "BRL" },
    availability: "available",
    checkedAt: reviewedAt,
  }),
  amazonBrazilOffer({
    id: "prod_offer_amazon_bosch_gsb_185_li",
    variantId: "prod_variant_bosch_gsb_185_li_2b_br",
    asin: "B0BZB2L32L",
    availability: "available",
    checkedAt: reviewedAt,
  }),
];
