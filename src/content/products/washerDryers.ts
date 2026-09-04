import type { Product, ProductOffer, ProductVariant } from "./productSchema";

const reviewedAt = "2026-09-02";
const articleSlug = "melhores-lava-e-seca";
const source = (title: string, url: string) => ({
  title,
  url,
  accessedAt: reviewedAt,
});
const image = (
  src: string,
  alt: string,
  sourceUrl: string,
  credit: string,
  width: number,
  height: number,
): Product["mainImage"] => ({
  src,
  alt,
  sourceUrl,
  credit,
  rights: "official-promotional",
  width,
  height,
});
const specs = (
  data: Omit<
    Extract<ProductVariant["specifications"], { type: "washer-dryer" }>,
    "type"
  >,
): ProductVariant["specifications"] => ({ type: "washer-dryer", ...data });

export const washerDryerProducts: Product[] = [
  {
    id: "prod_midea_healthguard_slim_11",
    contentType: "product",
    schemaVersion: 1,
    slug: "midea-healthguard-slim-11kg",
    aliases: [],
    name: "Midea HealthGuard Slim 11 kg",
    manufacturerId: "org_midea",
    line: "HealthGuard Slim",
    category: "Lava e seca",
    releaseYear: 2025,
    mainImage: image(
      "/images/products/washer-dryers/midea-healthguard-slim-11kg-v1.jpg",
      "Lava e seca Midea HealthGuard Slim 11 kg Titanium vista de frente",
      "https://www.midea.com.br/lava-e-seca-11kg-titanium-slim-healthguard-conectada-midea/p?skuId=511",
      "Midea Brasil",
      1000,
      1000,
    ),
    gallery: [],
    shortDescription:
      "Lava e seca frontal slim com 11 kg para lavar e 7 kg para secar, motor inverter, vapor e conectividade.",
    strengths: [
      "Gabinete de 57,5 cm de profundidade facilita a instalação em lavanderias compactas",
      "Capacidades de 11 kg para lavagem e 7 kg para secagem atendem casais e famílias pequenas",
      "Preço observado fica abaixo das opções familiares de 13 e 14 kg",
    ],
    limitations: [
      "A secagem de 7 kg exige reduzir uma carga completa de lavagem de 11 kg",
      "A rede de assistência deve ser confirmada no CEP antes da compra",
    ],
    suitableFor: [
      "Casais e famílias pequenas com pouco espaço para dois aparelhos",
      "Quem realmente precisa secar e encontra a variante correta por até R$ 3.500",
    ],
    categories: ["Lava e seca", "Eletrodomésticos"],
    tags: ["11 kg lavagem", "7 kg secagem", "Inverter", "Vapor", "Wi-Fi"],
    relatedProductIds: ["prod_samsung_wd13fg", "prod_lg_vc4_14"],
    relatedArticleSlugs: [articleSlug],
    editorialSummary:
      "É a escolha de espaço e preço: preserva 11 kg de lavagem e 7 kg de secagem em 57,5 cm de profundidade. Conectividade é secundária; o argumento concreto é caber onde modelos maiores não cabem.",
    seo: {
      title: "Midea HealthGuard Slim 11 kg: ficha e ofertas",
      description:
        "Ficha da lava e seca Midea HealthGuard Slim de 11 kg para lavar e 7 kg para secar, com dimensões, variante, vantagens e preço observado.",
    },
    sources: [
      source(
        "Midea HealthGuard Slim 11 kg — página oficial",
        "https://www.midea.com.br/lava-e-seca-11kg-titanium-slim-healthguard-conectada-midea/p?skuId=511",
      ),
      source(
        "Manual da Midea HealthGuard Slim 11 kg",
        "https://conteudo.midea.com.br/manuais/lava-e-seca-11kg-titanium-slim-healthguard-conectada-midea.pdf",
      ),
    ],
    status: "published",
    createdAt: reviewedAt,
    publishedAt: reviewedAt,
    updatedAt: reviewedAt,
    reviewedAt,
  },
  {
    id: "prod_samsung_wd13fg",
    contentType: "product",
    schemaVersion: 1,
    slug: "samsung-wd13fg",
    aliases: [],
    name: "Samsung WD13FG",
    manufacturerId: "org_samsung_electronics",
    line: "WD6000F",
    category: "Lava e seca",
    releaseYear: 2025,
    mainImage: image(
      "/images/products/washer-dryers/samsung-wd13fg-v1.png",
      "Lava e seca Samsung WD13FG Inox vista de frente",
      "https://www.samsung.com/br/washers-and-dryers/washer-dryer-combo/wd6000f-front-loading-ai-ecobubble-ai-control-ai-energy-mode-13kg-refined-inox-wd13fg6b34bxaz/",
      "Samsung Brasil",
      1164,
      776,
    ),
    gallery: [],
    shortDescription:
      "Lava e seca frontal com 13 kg para lavagem, 8 kg para secagem, 1.400 rpm, motor Digital Inverter e gabinete de 60 cm.",
    strengths: [
      "Tambor de 13 kg em gabinete com 60 cm de profundidade oferece boa relação entre capacidade e espaço",
      "Secagem de 8 kg atende melhor famílias que os modelos de 7 kg",
      "Dez anos de garantia do motor e canais nacionais de suporte reduzem parte do risco da compra",
    ],
    limitations: [
      "Capacidade de secagem continua 5 kg abaixo da lavagem",
      "Recursos de IA e Wi-Fi não compensam preço excessivo nem dispensam separar tecidos",
    ],
    suitableFor: [
      "Famílias de três ou quatro pessoas que usam secagem com frequência",
      "Quem precisa de maior capacidade sem avançar para um gabinete muito profundo",
    ],
    categories: ["Lava e seca", "Eletrodomésticos"],
    tags: [
      "13 kg lavagem",
      "8 kg secagem",
      "Digital Inverter",
      "Vapor",
      "SmartThings",
    ],
    relatedProductIds: ["prod_lg_vc4_14", "prod_midea_healthguard_slim_11"],
    relatedArticleSlugs: [articleSlug],
    editorialSummary:
      "É o melhor equilíbrio geral: 13 kg de lavagem e 8 kg de secagem em dimensões externas próximas às de modelos de 11 kg. AI Control ajuda no acompanhamento, mas capacidade, centrifugação e garantia do motor são os argumentos centrais.",
    seo: {
      title: "Samsung WD13FG: ficha, capacidades e ofertas",
      description:
        "Ficha da Samsung WD13FG de 13 kg para lavar e 8 kg para secar, com dimensões, tensão, garantia, limitações e preço observado.",
    },
    sources: [
      source(
        "Samsung WD13FG Inox 127 V — página oficial",
        "https://www.samsung.com/br/washers-and-dryers/washer-dryer-combo/wd6000f-front-loading-ai-ecobubble-ai-control-ai-energy-mode-13kg-refined-inox-wd13fg6b34bxaz/",
      ),
      source(
        "Samsung WD13FG Inox 220 V — loja oficial",
        "https://shop.samsung.com/br/lava-seca-smart-samsung-ai-control-wd13fg-inox-13kg/p?skuId=12529",
      ),
    ],
    status: "published",
    createdAt: reviewedAt,
    publishedAt: reviewedAt,
    updatedAt: reviewedAt,
    reviewedAt,
  },
  {
    id: "prod_lg_vc4_14",
    contentType: "product",
    schemaVersion: 1,
    slug: "lg-vc4-14kg",
    aliases: [],
    name: "LG Smart VC4 14 kg",
    manufacturerId: "org_lg_electronics",
    line: "VC4",
    category: "Lava e seca",
    releaseYear: 2024,
    mainImage: image(
      "/images/products/washer-dryers/lg-vc4-14kg-v1.jpg",
      "Lava e seca LG Smart VC4 14 kg branca vista de frente",
      "https://www.lg.com/br/lavanderia/lava-e-seca/cv5014wc4a/",
      "LG Brasil",
      450,
      450,
    ),
    gallery: [],
    shortDescription:
      "Lava e seca frontal de 14 kg para lavagem e 8 kg para secagem, com motor Inverter Direct Drive, vapor, sensores e ThinQ.",
    strengths: [
      "Capacidade de lavagem de 14 kg acomoda volumes maiores e peças de cama",
      "Motor Direct Drive controla movimentos do tambor sem correia e recebe garantia específica",
      "AI DD ajusta movimentos com base na carga em ciclos compatíveis",
    ],
    limitations: [
      "Profundidade total até a porta chega a 66 cm e exige medição cuidadosa",
      "Os 8 kg de secagem não acompanham os 14 kg de lavagem em uma carga completa",
    ],
    suitableFor: [
      "Famílias que lavam volumes grandes e alternam secagem total e uso de varal",
      "Quem valoriza cuidado de tecidos e diagnóstico pelo aplicativo",
    ],
    categories: ["Lava e seca", "Eletrodomésticos"],
    tags: ["14 kg lavagem", "8 kg secagem", "Direct Drive", "Steam", "ThinQ"],
    relatedProductIds: [
      "prod_samsung_wd13fg",
      "prod_midea_healthguard_slim_11",
    ],
    relatedArticleSlugs: [articleSlug],
    editorialSummary:
      "É a alternativa para maior volume de lavagem e cuidado de tecidos. Os sensores AI DD ajustam o padrão de movimento em ciclos compatíveis; não são prova de durabilidade e não eliminam o limite de 8 kg na secagem.",
    seo: {
      title: "LG Smart VC4 14 kg: ficha, capacidades e ofertas",
      description:
        "Ficha da LG Smart VC4 de 14 kg para lavar e 8 kg para secar, com dimensões, motor Direct Drive, recursos e preço observado.",
    },
    sources: [
      source(
        "LG Smart VC4 14 kg — especificações oficiais",
        "https://www.lg.com/br/lavanderia/lava-e-seca/cv5014wc4a/",
      ),
      source(
        "Guia da linha de lavanderia LG",
        "https://www.lg.com/br/buying-guides/laundry-lineup-guide/",
      ),
    ],
    status: "published",
    createdAt: reviewedAt,
    publishedAt: reviewedAt,
    updatedAt: reviewedAt,
    reviewedAt,
  },
];

export const washerDryerVariants: ProductVariant[] = [
  {
    id: "prod_variant_midea_healthguard_slim_11_127v_br",
    productId: "prod_midea_healthguard_slim_11",
    name: "MF201D110WB/GK-01 Titanium 127 V",
    market: "BR",
    manufacturerModelNumber: "MF201D110WB/GK-01",
    distinguishingAttributes: {
      color: "Titanium",
      voltage: "127 V",
      washCapacity: "11 kg",
      dryCapacity: "7 kg",
    },
    specifications: specs({
      washCapacityKg: 11,
      dryCapacityKg: 7,
      loadingType: "front",
      dimensionsMm: { width: 595, height: 850, depth: 575 },
      weightKg: 63.4,
      motor: "Motor inverter",
      inverter: true,
      spinSpeedRpm: 1200,
      programs: [
        "Algodão",
        "Rápido",
        "Lavar e secar",
        "Esterilizar",
        "Limpeza do tambor",
      ],
      steam: true,
      hotWater: "Aquecimento interno em programas compatíveis",
      sensors: ["Detecção de carga", "Função Especialista pelo aplicativo"],
      connectivity: [
        "Wi-Fi 2,4 GHz",
        "Aplicativo SmartHome",
        "Alexa",
        "Google Assistente",
      ],
      energyEfficiency: "Classe A na lavagem",
      voltage: "127 V",
      warranty: "24 meses para o produto, conforme condições do fabricante",
    }),
    imageIds: [],
    sources: [
      source(
        "Midea HealthGuard Slim 11 kg — página oficial",
        "https://www.midea.com.br/lava-e-seca-11kg-titanium-slim-healthguard-conectada-midea/p?skuId=511",
      ),
      source(
        "Manual Midea MF201D110WB",
        "https://conteudo.midea.com.br/manuais/lava-e-seca-11kg-titanium-slim-healthguard-conectada-midea.pdf",
      ),
    ],
    status: "published",
    createdAt: reviewedAt,
    updatedAt: reviewedAt,
    reviewedAt,
  },
  {
    id: "prod_variant_samsung_wd13fg_inox_220v_br",
    productId: "prod_samsung_wd13fg",
    name: "WD13FG6B34BXBZ Inox 220 V",
    market: "BR",
    manufacturerModelNumber: "WD13FG6B34BXBZ",
    distinguishingAttributes: {
      color: "Inox",
      voltage: "220 V",
      washCapacity: "13 kg",
      dryCapacity: "8 kg",
    },
    specifications: specs({
      washCapacityKg: 13,
      dryCapacityKg: 8,
      loadingType: "front",
      dimensionsMm: { width: 600, height: 850, depth: 600 },
      weightKg: 74,
      motor: "Digital Inverter",
      inverter: true,
      spinSpeedRpm: 1400,
      programs: [
        "Algodão",
        "Roupas de bebê",
        "Super Speed",
        "Lavar e secar",
        "Air Wash",
        "Vapor de higiene",
        "Lavagem do tambor",
      ],
      steam: true,
      hotWater: "Aquecimento interno; entrada de água fria",
      sensors: [
        "Detecção de carga",
        "AI Ecobubble",
        "VRT+ para controle de vibração",
      ],
      connectivity: ["Wi-Fi", "SmartThings", "AI Control"],
      energyEfficiency: "Classe A na lavagem",
      waterConsumption:
        "Fabricante declara cerca de 20% menos água que a média Inmetro de modelos de 13 a 14 kg",
      voltage: "220 V",
      warranty: "12 meses",
      motorWarranty:
        "10 anos para o motor Digital Inverter, conforme condições do fabricante",
    }),
    imageIds: [],
    sources: [
      source(
        "Samsung WD13FG Inox 220 V — página oficial",
        "https://www.samsung.com/br/washers-and-dryers/washer-dryer-combo/wd6000f-front-loading-ai-ecobubble-ai-control-ai-energy-mode-13kg-refined-inox-wd13fg6b34bxbz/",
      ),
      source(
        "Samsung WD13FG — loja oficial",
        "https://shop.samsung.com/br/lava-seca-smart-samsung-ai-control-wd13fg-inox-13kg/p?skuId=12529",
      ),
    ],
    status: "published",
    createdAt: reviewedAt,
    updatedAt: reviewedAt,
    reviewedAt,
  },
  {
    id: "prod_variant_lg_vc4_14_cv5014wc4a_220v_br",
    productId: "prod_lg_vc4_14",
    name: "CV5014WC4A Branca 220 V",
    market: "BR",
    manufacturerModelNumber: "CV5014WC4A",
    gtin: "8806084445698",
    distinguishingAttributes: {
      color: "Branca",
      voltage: "220 V",
      washCapacity: "14 kg",
      dryCapacity: "8 kg",
    },
    specifications: specs({
      washCapacityKg: 14,
      dryCapacityKg: 8,
      loadingType: "front",
      dimensionsMm: { width: 600, height: 850, depth: 615 },
      doorOpenDepthMm: 1135,
      weightKg: 76,
      motor: "Inverter Direct Drive",
      inverter: true,
      spinSpeedRpm: 1400,
      programs: [
        "Algodão",
        "Tecidos mistos",
        "Antialérgico",
        "Rápido 14",
        "TurboWash 59",
        "Lavar e secar",
        "Limpeza do tambor",
      ],
      steam: true,
      hotWater: "Aquecimento interno em programas compatíveis",
      sensors: [
        "AI DD em ciclos compatíveis",
        "LoadSense",
        "Detecção de espuma",
      ],
      connectivity: [
        "Wi-Fi",
        "LG ThinQ",
        "Smart Diagnosis",
        "Monitoramento de energia",
      ],
      energyEfficiency: "Classe A na lavagem",
      voltage: "220 V",
      warranty: "12 meses",
      motorWarranty:
        "10 anos para o motor Direct Drive, conforme condições do fabricante",
    }),
    imageIds: [],
    sources: [
      source(
        "LG Smart VC4 14 kg — especificações oficiais",
        "https://www.lg.com/br/lavanderia/lava-e-seca/cv5014wc4a/",
      ),
    ],
    status: "published",
    createdAt: reviewedAt,
    updatedAt: reviewedAt,
    reviewedAt,
  },
];

export const washerDryerOffers: ProductOffer[] = [
  {
    id: "prod_offer_midea_healthguard_slim_11_127v",
    variantId: "prod_variant_midea_healthguard_slim_11_127v_br",
    retailer: "Midea Brasil",
    url: "https://www.midea.com.br/lava-e-seca-11kg-titanium-slim-healthguard-conectada-midea/p?skuId=511",
    region: "BR",
    observedPrice: { amount: 3699, currency: "BRL" },
    availability: "available",
    checkedAt: reviewedAt,
  },
  {
    id: "prod_offer_samsung_wd13fg_inox_220v",
    variantId: "prod_variant_samsung_wd13fg_inox_220v_br",
    retailer: "Samsung Brasil",
    url: "https://shop.samsung.com/br/lava-seca-smart-samsung-ai-control-wd13fg-inox-13kg/p?skuId=12529",
    region: "BR",
    observedPrice: { amount: 4389, currency: "BRL" },
    availability: "available",
    checkedAt: reviewedAt,
  },
  {
    id: "prod_offer_lg_vc4_14_220v",
    variantId: "prod_variant_lg_vc4_14_cv5014wc4a_220v_br",
    retailer: "LG Brasil",
    url: "https://www.lg.com/br/lavanderia/lava-e-seca/cv5014wc4a/",
    region: "BR",
    observedPrice: { amount: 4369.05, currency: "BRL" },
    availability: "available",
    checkedAt: reviewedAt,
  },
];
