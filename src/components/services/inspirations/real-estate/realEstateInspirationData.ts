export type RealEstateDemoProperty = {
  id: string;
  title: string;
  type: "Casa" | "Apartamento";
  region: "Litoral" | "São Paulo";
  location: string;
  price: string;
  priceBand: "2-5" | "acima-5";
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  width: number;
  height: number;
  alt: string;
  features: string[];
};

export const realEstateDemoProperties: RealEstateDemoProperty[] = [
  {
    id: "casa-horizonte",
    title: "Casa Horizonte",
    type: "Casa",
    region: "Litoral",
    location: "Ilhabela, SP",
    price: "R$ 8.500.000",
    priceBand: "acima-5",
    bedrooms: 4,
    bathrooms: 5,
    area: 420,
    image: "/images/services/inspirations/imoveis-em-destaque/casa-horizonte-exterior.webp",
    width: 1600,
    height: 800,
    alt: "Casa contemporânea ilustrativa diante de uma piscina e do litoral.",
    features: ["Piscina com vista", "Área gourmet", "Jardim", "4 vagas"],
  },
  {
    id: "jardins-serenos",
    title: "Jardins Serenos",
    type: "Apartamento",
    region: "São Paulo",
    location: "Alto de Pinheiros, SP",
    price: "R$ 2.750.000",
    priceBand: "2-5",
    bedrooms: 3,
    bathrooms: 4,
    area: 180,
    image: "/images/services/inspirations/imoveis-em-destaque/jardins-serenos-apartamentos.webp",
    width: 1536,
    height: 1024,
    alt: "Edifício residencial contemporâneo ilustrativo entre árvores tropicais.",
    features: ["Varanda ampla", "Paisagismo", "2 vagas", "Portaria"],
  },
  {
    id: "casa-patio",
    title: "Casa Pátio",
    type: "Casa",
    region: "Litoral",
    location: "Paraty, RJ",
    price: "R$ 6.200.000",
    priceBand: "acima-5",
    bedrooms: 4,
    bathrooms: 5,
    area: 360,
    image: "/images/services/inspirations/imoveis-em-destaque/casa-patio-piscina.webp",
    width: 1536,
    height: 1024,
    alt: "Casa térrea ilustrativa com piscina, pedra natural e jardim tropical.",
    features: ["Pátio reservado", "Piscina", "Jardim tropical", "3 vagas"],
  },
  {
    id: "refugio-atlantico",
    title: "Refúgio Atlântico",
    type: "Casa",
    region: "Litoral",
    location: "Angra dos Reis, RJ",
    price: "R$ 7.900.000",
    priceBand: "acima-5",
    bedrooms: 4,
    bathrooms: 5,
    area: 390,
    image: "/images/services/inspirations/imoveis-em-destaque/casa-horizonte-interior.webp",
    width: 1536,
    height: 1024,
    alt: "Sala ilustrativa aberta para um terraço com vista para o mar.",
    features: ["Vista para o mar", "Sala integrada", "Deck", "4 suítes"],
  },
];

export const realEstateDetailGallery = [
  realEstateDemoProperties[0],
  realEstateDemoProperties[3],
  realEstateDemoProperties[2],
];

export const realEstateGeneratedMedia = realEstateDemoProperties.map((property) => ({
  src: property.image,
  width: property.width,
  height: property.height,
  alt: property.alt,
  source: "Imagem gerada para esta demonstração",
}));
