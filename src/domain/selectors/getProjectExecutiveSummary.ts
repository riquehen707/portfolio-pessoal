import { findClientBySlug, findExecutiveSummaryByClientId } from "@/data";
import type { ProjectExecutiveSummary } from "@/domain/types";

export function getProjectExecutiveSummary(slug: string): ProjectExecutiveSummary | null {
  const client = findClientBySlug(slug);

  if (!client) {
    return null;
  }

  return findExecutiveSummaryByClientId(client.id);
}
