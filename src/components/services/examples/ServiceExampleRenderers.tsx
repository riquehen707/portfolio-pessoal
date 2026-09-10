import type { ComponentType } from "react";
import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { PsychologyDemo } from "./psychology/PsychologyDemo";
import { ArchitectureDemo } from "./architecture/ArchitectureDemo";
import { BarbershopDemo } from "./barbershop/BarbershopDemo";

export type ServiceExampleRendererProps = { example: ServiceExample };
export type ServiceExampleRenderer = ComponentType<ServiceExampleRendererProps>;

// Cada demo futura registra aqui um componente completo e pode trazer sua própria
// tipografia, paleta e composição. Não existe renderer genérico de preenchimento.
const renderers: Record<string, ServiceExampleRenderer> = {
  "psychology-elisa-veral": PsychologyDemo,
  "architecture-planobruto-17": ArchitectureDemo,
  "barbershop-traco-84": BarbershopDemo,
};

export function getServiceExampleRenderer(key: string) {
  return renderers[key];
}
