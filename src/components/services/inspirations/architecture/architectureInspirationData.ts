import { architectDemoMedia } from "@/content/service-landings/architectDemoMedia";

export type ArchitectureCategory = "Residencial" | "Interiores" | "Cultural";

export type ArchitectureInspirationProject = {
  id: string;
  title: string;
  category: ArchitectureCategory;
  location: string;
  year: string;
  area: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  description: string;
  credit: string;
  source: string;
};

export const architectureInspirationProjects: ArchitectureInspirationProject[] = [
  {
    id: "casa-horizonte",
    title: "Casa Horizonte",
    category: "Residencial",
    location: "Serra Clara — local fictício",
    year: "2026",
    area: "248 m²",
    image: architectDemoMedia[0].src,
    width: architectDemoMedia[0].width,
    height: architectDemoMedia[0].height,
    alt: architectDemoMedia[0].alt,
    description: "Uma residência organizada por planos horizontais, luz natural e continuidade entre interior e jardim.",
    credit: architectDemoMedia[0].credit,
    source: architectDemoMedia[0].source,
  },
  {
    id: "apartamento-linha",
    title: "Apartamento Linha",
    category: "Interiores",
    location: "Belo Vale — local fictício",
    year: "2025",
    area: "96 m²",
    image: architectDemoMedia[1].src,
    width: architectDemoMedia[1].width,
    height: architectDemoMedia[1].height,
    alt: architectDemoMedia[1].alt,
    description: "Madeira, superfícies claras e iluminação indireta constroem continuidade em uma planta compacta.",
    credit: architectDemoMedia[1].credit,
    source: architectDemoMedia[1].source,
  },
  {
    id: "centro-curva",
    title: "Centro Curva",
    category: "Cultural",
    location: "Porto Norte — local fictício",
    year: "2024",
    area: "412 m²",
    image: architectDemoMedia[2].src,
    width: architectDemoMedia[2].width,
    height: architectDemoMedia[2].height,
    alt: architectDemoMedia[2].alt,
    description: "Planos curvos orientam o percurso e alternam áreas abertas com espaços de permanência.",
    credit: architectDemoMedia[2].credit,
    source: architectDemoMedia[2].source,
  },
];

export const architectureFeaturedProject = architectureInspirationProjects[0];
