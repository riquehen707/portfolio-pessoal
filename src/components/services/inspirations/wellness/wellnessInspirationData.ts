import { architectDemoMedia } from "@/content/service-landings/architectDemoMedia";

export type WellnessMedia = {
  id: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  credit: string;
  source: string;
  rights: "generated" | "unsplash";
};

export const wellnessInspirationMedia: WellnessMedia[] = [
  {
    id: "retrato-profissional",
    image: "/images/services/inspirations/bem-estar-acolhedor/retrato-profissional.webp",
    width: 1122,
    height: 1402,
    alt: "Retrato fictício de uma profissional de psicologia sentada em um consultório de tons naturais.",
    credit: "Imagem gerada para esta demonstração",
    source: "OpenAI image generation",
    rights: "generated",
  },
  {
    id: "pausa-botanica",
    image: "/images/services/inspirations/bem-estar-acolhedor/pausa-botanica.webp",
    width: 1536,
    height: 1024,
    alt: "Ramos de oliveira em um vaso de cerâmica sobre pedra clara ao lado de uma janela.",
    credit: "Imagem gerada para esta demonstração",
    source: "OpenAI image generation",
    rights: "generated",
  },
  {
    id: "consultorio",
    image: architectDemoMedia[1].src,
    width: architectDemoMedia[1].width,
    height: architectDemoMedia[1].height,
    alt: "Ambiente claro e tranquilo usado como consultório demonstrativo.",
    credit: architectDemoMedia[1].credit,
    source: architectDemoMedia[1].source,
    rights: "unsplash",
  },
];

export const wellnessGeneratedMedia = wellnessInspirationMedia.filter((item) => item.rights === "generated");

export const wellnessConcerns = [
  {
    id: "sobrecarga",
    title: "Sobrecarga e ansiedade",
    description: "Quando preocupações, tensão ou exigências ocupam espaço demais na rotina.",
  },
  {
    id: "relacoes",
    title: "Relações e limites",
    description: "Para compreender padrões, conflitos e formas mais claras de se posicionar.",
  },
  {
    id: "mudancas",
    title: "Mudanças e decisões",
    description: "Em períodos de transição, perdas ou escolhas que pedem elaboração e tempo.",
  },
  {
    id: "autoconhecimento",
    title: "Autoconhecimento",
    description: "Para observar emoções, experiências e maneiras de se relacionar consigo.",
  },
] as const;
