import { photographerDemoMedia } from "@/content/service-landings/photographerDemoMedia";

export type PhotographyCategory = "Casamentos" | "Ensaios" | "Produtos";

export type PhotographyPortfolioItem = {
  id: string;
  title: string;
  category: PhotographyCategory;
  image: string;
  width: number;
  height: number;
  alt: string;
  description: string;
  credit: string;
  source: string;
  rights: "generated" | "unsplash";
};

const [licensedWedding, licensedPortrait, licensedProduct] = photographerDemoMedia;

export const photographyPortfolioItems: PhotographyPortfolioItem[] = [
  {
    id: "votos-no-jardim",
    title: "Votos no jardim",
    category: "Casamentos",
    image: "/images/services/inspirations/portfolio-fotografico/casamento-jardim.webp",
    width: 1536,
    height: 1024,
    alt: "Casal fictício caminhando em um jardim durante uma celebração de casamento ao entardecer.",
    description: "Uma narrativa documental com luz natural, gestos espontâneos e espaço para a atmosfera do dia.",
    credit: "Imagem gerada para esta demonstração",
    source: "OpenAI image generation",
    rights: "generated",
  },
  {
    id: "luz-de-fim-de-tarde",
    title: "Luz de fim de tarde",
    category: "Ensaios",
    image: "/images/services/inspirations/portfolio-fotografico/retrato-editorial.webp",
    width: 1122,
    height: 1402,
    alt: "Retrato editorial fictício de uma mulher em ambiente minimalista com luz lateral.",
    description: "Retrato de linguagem natural, com direção discreta e atenção à luz, ao gesto e ao espaço.",
    credit: "Imagem gerada para esta demonstração",
    source: "OpenAI image generation",
    rights: "generated",
  },
  {
    id: "essencia-ambar",
    title: "Essência âmbar",
    category: "Produtos",
    image: "/images/services/inspirations/portfolio-fotografico/perfume-ambar.webp",
    width: 1448,
    height: 1086,
    alt: "Frasco de perfume fictício em vidro âmbar sobre pedra clara e folhas secas.",
    description: "Uma composição comercial tátil, construída com luz, textura e espaço negativo.",
    credit: "Imagem gerada para esta demonstração",
    source: "OpenAI image generation",
    rights: "generated",
  },
  {
    id: "entre-luz-e-silhueta",
    title: "Entre luz e silhueta",
    category: "Casamentos",
    image: licensedWedding.src,
    width: licensedWedding.width,
    height: licensedWedding.height,
    alt: licensedWedding.alt,
    description: "Um recorte em preto e branco que transforma um instante breve em imagem de abertura.",
    credit: licensedWedding.credit,
    source: licensedWedding.source,
    rights: "unsplash",
  },
  {
    id: "pele-dourada",
    title: "Pele dourada",
    category: "Ensaios",
    image: licensedPortrait.src,
    width: licensedPortrait.width,
    height: licensedPortrait.height,
    alt: licensedPortrait.alt,
    description: "Um ensaio intimista orientado pela luz do fim do dia e por enquadramentos próximos.",
    credit: licensedPortrait.credit,
    source: licensedPortrait.source,
    rights: "unsplash",
  },
  {
    id: "forma-e-aroma",
    title: "Forma e aroma",
    category: "Produtos",
    image: licensedProduct.src,
    width: licensedProduct.width,
    height: licensedProduct.height,
    alt: licensedProduct.alt,
    description: "Fotografia de produto com contraste controlado e uma composição que sustenta a identidade visual.",
    credit: licensedProduct.credit,
    source: licensedProduct.source,
    rights: "unsplash",
  },
];

export const photographyFeaturedItems = photographyPortfolioItems.slice(0, 3);

export const photographyStoryGallery = [
  photographyPortfolioItems[0],
  photographyPortfolioItems[3],
];

export const photographyGeneratedMedia = photographyPortfolioItems.filter(
  (item) => item.rights === "generated",
);
