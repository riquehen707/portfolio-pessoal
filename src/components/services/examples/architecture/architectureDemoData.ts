import { architectDemoMedia } from "@/content/service-landings/architectDemoMedia";
import { realEstateDemoMedia } from "@/content/service-landings/realEstateDemoMedia";

export type ArchitectureDemoProject = {
  slug: string;
  title: string;
  category: "Residencial" | "Interiores" | "Comercial";
  location: string;
  year: string;
  summary: string;
  cover: (typeof architectureDemoMedia)[number];
  gallery: readonly (typeof architectureDemoMedia)[number][];
  illustrative: true;
};

export const architectureDemoMedia = [...architectDemoMedia, ...realEstateDemoMedia] as const;

export const architectureDemoProjects: readonly ArchitectureDemoProject[] = [
  {
    slug: "casa-patio-06",
    title: "Casa Pátio 06",
    category: "Residencial",
    location: "Serra Clara — local fictício",
    year: "2026",
    summary: "Estudo de residência organizado em torno de um pátio central e áreas sociais abertas para o jardim.",
    cover: architectDemoMedia[0],
    gallery: [architectDemoMedia[0], realEstateDemoMedia[0], architectDemoMedia[1]],
    illustrative: true,
  },
  {
    slug: "interior-linha-02",
    title: "Interior Linha 02",
    category: "Interiores",
    location: "Belo Vale — local fictício",
    year: "2025",
    summary: "Estudo de interior residencial com circulação livre, madeira aparente e luz indireta.",
    cover: realEstateDemoMedia[1],
    gallery: [realEstateDemoMedia[1], architectDemoMedia[1], architectDemoMedia[2]],
    illustrative: true,
  },
  {
    slug: "centro-arco-11",
    title: "Centro Arco 11",
    category: "Comercial",
    location: "Porto Norte — local fictício",
    year: "2024",
    summary: "Estudo para um espaço de uso coletivo, com percursos definidos por planos curvos e entradas de luz.",
    cover: architectDemoMedia[2],
    gallery: [architectDemoMedia[2], realEstateDemoMedia[2], architectDemoMedia[0]],
    illustrative: true,
  },
] as const;

export function getArchitectureDemoProject(slug: string) {
  return architectureDemoProjects.find((project) => project.slug === slug);
}
