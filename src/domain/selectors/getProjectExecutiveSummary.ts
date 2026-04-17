import { terezaCristinaExecutiveSummary } from "@/data/reports/tereza-cristina-summary";
import { clients } from "@/data";
import type { ProjectExecutiveSummary } from "@/domain/types";

const executiveSummaries: ProjectExecutiveSummary[] = [terezaCristinaExecutiveSummary];

export function getProjectExecutiveSummary(slug: string): ProjectExecutiveSummary | null {
  const client = clients.find((item) => item.slug === slug);

  if (!client) {
    return null;
  }

  return executiveSummaries.find((item) => item.clientId === client.id) ?? null;
}
