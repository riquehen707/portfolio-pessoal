import { architectDemoMedia } from "@/content/service-landings/architectDemoMedia";
import { realEstateDemoMedia } from "@/content/service-landings/realEstateDemoMedia";

export type ArchitectureDemoProject = {
  slug: string;
  title: string;
  category: "Residencial" | "Interiores" | "Comercial";
  location: string;
  year: string;
  area: string;
  scope: string;
  summary: string;
  concept: string;
  cover: (typeof architectureDemoMedia)[number];
  gallery: readonly (typeof architectureDemoMedia)[number][];
  illustrative: true;
};

export const architectureDemoMedia = [
  ...architectDemoMedia,
  ...realEstateDemoMedia,
] as const;

export const architectureDemoProjects: readonly ArchitectureDemoProject[] = [
  {
    slug: "casa-patio-06",
    title: "Casa Pátio 06",
    category: "Residencial",
    location: "Serra Clara — local fictício",
    year: "2026",
    area: "248 m²",
    scope: "Arquitetura residencial",
    summary:
      "Residência térrea organizada em torno de um pátio central, articulando as áreas sociais, os dormitórios e a relação direta com o jardim.",
    concept:
      "O estudo parte de um vazio central como elemento de orientação. Circulações curtas, aberturas generosas e planos horizontais procuram aproximar interior e exterior sem eliminar a privacidade dos ambientes.",
    cover: architectDemoMedia[0],
    gallery: [
      architectDemoMedia[0],
      realEstateDemoMedia[0],
      architectDemoMedia[1],
    ],
    illustrative: true,
  },
  {
    slug: "interior-linha-02",
    title: "Interior Linha 02",
    category: "Interiores",
    location: "Belo Vale — local fictício",
    year: "2025",
    area: "96 m²",
    scope: "Interiores residenciais",
    summary:
      "Reorganização de um apartamento compacto por meio de circulação contínua, marcenaria integrada e uma paleta reduzida de materiais.",
    concept:
      "O projeto utiliza madeira, superfícies claras e iluminação indireta como elementos de continuidade. A intenção é reduzir interferências visuais e permitir que os ambientes funcionem de maneira mais flexível ao longo do dia.",
    cover: realEstateDemoMedia[1],
    gallery: [
      realEstateDemoMedia[1],
      architectDemoMedia[1],
      architectDemoMedia[2],
    ],
    illustrative: true,
  },
  {
    slug: "centro-arco-11",
    title: "Centro Arco 11",
    category: "Comercial",
    location: "Porto Norte — local fictício",
    year: "2024",
    area: "412 m²",
    scope: "Arquitetura comercial",
    summary:
      "Estudo para um espaço coletivo com setores de atendimento, permanência e trabalho conectados por um percurso contínuo.",
    concept:
      "Planos curvos organizam os fluxos sem criar corredores rígidos. A entrada de luz natural e a alternância entre áreas abertas e mais reservadas definem a experiência de circulação pelo espaço.",
    cover: architectDemoMedia[2],
    gallery: [
      architectDemoMedia[2],
      realEstateDemoMedia[2],
      architectDemoMedia[0],
    ],
    illustrative: true,
  },
] as const;

export function getArchitectureDemoProject(slug: string) {
  return architectureDemoProjects.find(
    (project) => project.slug === slug,
  );
}