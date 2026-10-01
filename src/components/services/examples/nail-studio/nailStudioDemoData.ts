export const nailStudioMedia = {
  hero: {
    src: "/images/services/nail-studio-demo/hero-manicure.webp",
    alt: "Manicure aplicando esmalte vinho em unhas curtas sobre uma bancada clara.",
  },
  rust: {
    src: "/images/services/nail-studio-demo/trabalho-ferrugem.webp",
    alt: "Unhas curtas em tons de nude e ferrugem com francesinha fina.",
  },
  wine: {
    src: "/images/services/nail-studio-demo/trabalho-vinho.webp",
    alt: "Unhas curtas em vinho profundo com uma linha curva clara.",
  },
  cocoa: {
    src: "/images/services/nail-studio-demo/trabalho-cacau.webp",
    alt: "Duas mãos com esmaltação curta em tons translúcidos de cacau.",
  },
  studio: {
    src: "/images/services/nail-studio-demo/estudio.webp",
    alt: "Bancada de manicure com ferramentas, luminária, toalha e esmaltes sem marca.",
  },
} as const;

export const nailStudioServices = [
  {
    number: "01",
    name: "Manicure",
    description: "Cuidado das unhas e cutículas, finalizado com esmaltação comum.",
    duration: "50 min",
    price: "R$ 45",
  },
  {
    number: "02",
    name: "Banho de gel",
    description: "Camada de proteção sobre a unha natural, sem alongamento.",
    duration: "1h 30",
    price: "R$ 95",
  },
  {
    number: "03",
    name: "Nail art",
    description: "Traços, francesinhas e composições definidos antes do atendimento.",
    duration: "+ 20 min",
    price: "+ R$ 15",
  },
] as const;

export const nailStudioWorks = [
  {
    name: "Ferrugem fina",
    detail: "Esmaltação + traço",
    image: nailStudioMedia.rust,
  },
  {
    name: "Vinho curvo",
    detail: "Gel + desenho manual",
    image: nailStudioMedia.wine,
  },
  {
    name: "Cacau translúcido",
    detail: "Esmaltação curta",
    image: nailStudioMedia.cocoa,
  },
] as const;

export const nailStudioExperience = [
  {
    number: "01",
    title: "Horário reservado",
    description: "Cada atendimento ocupa um horário individual na bancada.",
  },
  {
    number: "02",
    title: "Escolha na chegada",
    description: "Cores e referências podem ser decididas antes do início do serviço.",
  },
  {
    number: "03",
    title: "Remoção combinada",
    description: "Gel anterior precisa ser informado ao pedir o horário.",
  },
] as const;
