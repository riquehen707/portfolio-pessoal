import type { IdeaStatus } from "@/data/ideas";

export const ideaStatusLabels: Record<IdeaStatus, string> = {
  rascunho: "Rascunho",
  explorando: "Explorando",
  "em-desenvolvimento": "Em desenvolvimento",
  pausada: "Pausada",
  concluida: "Concluída",
  abandonada: "Abandonada",
};

export const formatIdeaDate = (value: string, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC", day: "numeric", month: "short", year: "numeric", ...options }).format(new Date(`${value}T12:00:00Z`));

