import { benchmarks, cities, clients, modelConstant, segments } from "@/data";
import { createProjectDashboardSnapshot } from "@/domain/reports/createProjectDashboardSnapshot";
import type { Benchmark, ProjectDashboardSnapshot } from "@/domain/types";

function inferCityProfile(population: number): Benchmark["cityProfile"] {
  if (population < 120000) return "small";
  if (population < 500000) return "medium";
  return "large";
}

export function getProjectDashboardSnapshot(slug: string): ProjectDashboardSnapshot | null {
  const client = clients.find((item) => item.slug === slug);

  if (!client) {
    return null;
  }

  const city = cities.find((item) => item.id === client.cityId);
  const segment = segments.find((item) => item.id === client.segmentId);

  if (!city || !segment) {
    return null;
  }

  const cityProfile = inferCityProfile(city.population);
  const benchmark =
    benchmarks.find(
      (item) => item.segmentId === segment.id && item.cityProfile === cityProfile,
    ) ?? benchmarks.find((item) => item.segmentId === segment.id);

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
