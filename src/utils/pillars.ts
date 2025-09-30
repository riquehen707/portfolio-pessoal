// src/utils/pillars.ts
export type Pillar = {
  slug: string;  // ex: "politica-sociedade"
  label: string; // ex: "Política & Sociedade"
};

export const PILLARS: Pillar[] = [
  { slug: "politica-sociedade",       label: "Política & Sociedade" },
  { slug: "empreendedorismo-carreira", label: "Empreendedorismo & Carreira" },
  { slug: "cultura-estilo-de-vida",    label: "Cultura & Estilo de Vida" },
  { slug: "reflexoes-pessoais",        label: "Reflexões Pessoais" },
];

// útil para validar/normalizar valores vindos do MDX
export const validPillarSlug = (slug?: string) =>
  !!slug && PILLARS.some(p => p.slug === slug);
