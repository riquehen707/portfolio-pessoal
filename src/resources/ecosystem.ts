import { type IconName } from "@/resources/icons";

export type EcosystemAreaKey =
  | "biblioteca"
  | "laboratorio"
  | "ferramentas"
  | "consultoria"
  | "sobre";

export type EcosystemArea = {
  key: EcosystemAreaKey;
  label: string;
  navLabel: string;
  intent: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: IconName;
  paths: string[];
};

export const ecosystemAreas: EcosystemArea[] = [
  {
    key: "biblioteca",
    label: "Aprender",
    navLabel: "Biblioteca",
    intent: "Estudar e decidir melhor",
    title: "Biblioteca",
    description: "Leituras para revisar oferta, página, tráfego e rotina antes de sair executando.",
    href: "/blog",
    cta: "Começar pela biblioteca",
    icon: "book",
    paths: ["Problemas", "Temas", "Trilhas"],
  },
  {
    key: "laboratorio",
    label: "Ver projetos",
    navLabel: "Portfólio",
    intent: "Conhecer o trabalho",
    title: "Portfólio",
    description: "Sites e interfaces com contexto, decisões e serviço relacionado.",
    href: "/work",
    cta: "Ver portfólio",
    icon: "grid",
    paths: ["Sites", "Interfaces", "Cases"],
  },
  {
    key: "ferramentas",
    label: "Usar recursos",
    navLabel: "Ferramentas",
    intent: "Aplicar com apoio",
    title: "Ferramentas",
    description:
      "Recursos pequenos para decidir, organizar ou aplicar sem montar um projeto grande.",
    href: "/servicos/produtos",
    cta: "Ver ferramentas",
    icon: "package",
    paths: ["Gratuitos", "Templates", "Apps"],
  },
  {
    key: "consultoria",
    label: "Contratar",
    navLabel: "Consultoria",
    intent: "Decidir se faz sentido contratar",
    title: "Consultoria",
    description:
      "Frentes para corrigir oferta, página, captação ou atendimento quando o gargalo já pede ajuda.",
    href: "/servicos",
    cta: "Entender consultoria",
    icon: "chart",
    paths: ["Diagnóstico", "Frentes", "Escopo"],
  },
  {
    key: "sobre",
    label: "Confiar",
    navLabel: "Sobre",
    intent: "Conhecer Henrique",
    title: "Sobre",
    description: "O que faço, como trabalho e onde ver projetos publicados.",
    href: "/sobre",
    cta: "Conhecer Henrique",
    icon: "person",
    paths: ["Serviços", "Processo", "Projetos"],
  },
];

export function getEcosystemArea(key: EcosystemAreaKey) {
  return ecosystemAreas.find((area) => area.key === key);
}
