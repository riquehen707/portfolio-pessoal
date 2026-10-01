import type { ComponentType } from "react";
import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { PsychologyDemo } from "./psychology/PsychologyDemo";
import { BarbershopDemo } from "./barbershop/BarbershopDemo";
import { NailStudioDemo } from "./nail-studio/NailStudioDemo";

export type ServiceExampleRendererProps = { example: ServiceExample };
export type ServiceExampleRenderer = ComponentType<ServiceExampleRendererProps>;

// Cada demo futura registra aqui um componente completo e pode trazer sua própria
// tipografia, paleta e composição. Não existe renderer genérico de preenchimento.
const renderers: Record<string, ServiceExampleRenderer> = {
  "psychology-elisa-veral": PsychologyDemo,
  "nail-studio-tinta": NailStudioDemo,
  "barbershop-traco-84": BarbershopDemo,
};

export function getServiceExampleRenderer(key: string) {
  return renderers[key];
}
