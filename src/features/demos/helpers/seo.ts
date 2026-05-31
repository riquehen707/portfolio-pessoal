import { type DemoItem } from "../data/demo-registry";
import { type DemoSegment } from "../data/demo-segments";

export const modelsPath = "/modelos";
export const modelsTitle = "Modelos de páginas";
export const modelsDescription =
  "Vitrine de modelos e demos para clínicas, advocacia, infoprodutores, restaurantes, imobiliárias e serviços profissionais.";

export function getSegmentPath(segment: DemoSegment) {
  return `${modelsPath}/${segment.slug}`;
}

export function getDemoTitle(demo: DemoItem) {
  return `${demo.name} | Modelo de página`;
}

export function getDemoDescription(demo: DemoItem) {
  return `${demo.description} Demo ${demo.status} para avaliar direção visual, estrutura e próximos passos.`;
}
