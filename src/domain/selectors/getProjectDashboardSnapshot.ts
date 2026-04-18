import {
  findBenchmarkForSegment,
  findCityById,
  findClientBySlug,
  findSegmentById,
  inferCityProfileFromPopulation,
  modelConstant,
} from "@/data";
import { createProjectDashboardSnapshot } from "@/domain/reports/createProjectDashboardSnapshot";
import type { ProjectDashboardSnapshot } from "@/domain/types";

export function getProjectDashboardSnapshot(slug: string): ProjectDashboardSnapshot | null {
  const client = findClientBySlug(slug);

  if (!client) {
    return null;
  }

  const city = findCityById(client.cityId);
  const segment = findSegmentById(client.segmentId);

  if (!city || !segment) {
    return null;
  }

  const cityProfile = inferCityProfileFromPopulation(city.population);
  const benchmark = findBenchmarkForSegment(segment.id, cityProfile);

  if (!benchmark) {
    return null;
  }

  return createProjectDashboardSnapshot({
    client,
    city,
    segment,
    benchmark,
    modelConstant,
  });
}
