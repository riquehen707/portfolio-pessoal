import { estheticSmallCityBenchmark } from "@/data/benchmarks/esthetic-small-city";
import { cruzDasAlmas } from "@/data/cities/cruz-das-almas";
import { terezaCristina } from "@/data/clients/tereza-cristina";
import { defaultModelConstant } from "@/data/constants/model";
import { terezaCristinaExecutiveSummary } from "@/data/reports/tereza-cristina-summary";
import { estheticSegment } from "@/data/segments/esthetic";
import type {
  Benchmark,
  City,
  Client,
  ModelConstant,
  ProjectExecutiveSummary,
  Segment,
} from "@/domain/types";

type CityProfile = Benchmark["cityProfile"];

function createUniqueMap<T>(items: readonly T[], getKey: (item: T) => string, label: string) {
  const map = new Map<string, T>();

  for (const item of items) {
    const key = getKey(item)?.trim();

    if (!key) {
      throw new Error(`[data] ${label} nao pode ser vazio.`);
    }

    if (map.has(key)) {
      throw new Error(`[data] ${label} duplicado: ${key}.`);
    }

    map.set(key, item);
  }

  return map;
}

function createBenchmarkGroupMap(items: readonly Benchmark[]) {
  const map = new Map<string, Benchmark[]>();
  const seenProfiles = new Set<string>();

  for (const item of items) {
    const uniqueKey = `${item.segmentId}:${item.cityProfile}`;

    if (seenProfiles.has(uniqueKey)) {
      throw new Error(
        `[data] benchmark duplicado para segmentId ${item.segmentId} e cityProfile ${item.cityProfile}.`,
      );
    }

    seenProfiles.add(uniqueKey);

    const current = map.get(item.segmentId) ?? [];
    current.push(item);
    map.set(item.segmentId, current);
  }

  return map;
}

function validateDataIntegrity() {
  for (const benchmark of benchmarks) {
    if (!segmentsById.has(benchmark.segmentId)) {
      throw new Error(
        `[data] benchmark ${benchmark.id} referencia segmentId inexistente: ${benchmark.segmentId}.`,
      );
    }
  }

  for (const client of clients) {
    if (!citiesById.has(client.cityId)) {
      throw new Error(`[data] client ${client.id} referencia cityId inexistente: ${client.cityId}.`);
    }

    if (!segmentsById.has(client.segmentId)) {
      throw new Error(
        `[data] client ${client.id} referencia segmentId inexistente: ${client.segmentId}.`,
      );
    }
  }

  for (const summary of executiveSummaries) {
    if (!clientsById.has(summary.clientId)) {
      throw new Error(
        `[data] summary ${summary.id} referencia clientId inexistente: ${summary.clientId}.`,
      );
    }
  }
}

export const cities = [cruzDasAlmas] satisfies City[];

export const segments = [estheticSegment] satisfies Segment[];

export const benchmarks = [estheticSmallCityBenchmark] satisfies Benchmark[];

export const clients = [terezaCristina] satisfies Client[];

export const executiveSummaries = [terezaCristinaExecutiveSummary] satisfies ProjectExecutiveSummary[];

export const modelConstant: ModelConstant = defaultModelConstant;

const citiesById = createUniqueMap(cities, (item) => item.id, "city id");
const citiesBySlug = createUniqueMap(cities, (item) => item.slug, "city slug");
const segmentsById = createUniqueMap(segments, (item) => item.id, "segment id");
const segmentsBySlug = createUniqueMap(segments, (item) => item.slug, "segment slug");
const clientsById = createUniqueMap(clients, (item) => item.id, "client id");
const clientsBySlug = createUniqueMap(clients, (item) => item.slug, "client slug");
const executiveSummariesByClientId = createUniqueMap(
  executiveSummaries,
  (item) => item.clientId,
  "summary client id",
);
const benchmarksBySegmentId = createBenchmarkGroupMap(benchmarks);

validateDataIntegrity();

export function inferCityProfileFromPopulation(population: number): CityProfile {
  if (population < 120000) return "small";
  if (population < 500000) return "medium";
  return "large";
}

export function findCityById(id: string): City | null {
  return citiesById.get(id) ?? null;
}

export function findCityBySlug(slug: string): City | null {
  return citiesBySlug.get(slug) ?? null;
}

export function findSegmentById(id: string): Segment | null {
  return segmentsById.get(id) ?? null;
}

export function findSegmentBySlug(slug: string): Segment | null {
  return segmentsBySlug.get(slug) ?? null;
}

export function findClientById(id: string): Client | null {
  return clientsById.get(id) ?? null;
}

export function findClientBySlug(slug: string): Client | null {
  return clientsBySlug.get(slug) ?? null;
}

export function findExecutiveSummaryByClientId(clientId: string): ProjectExecutiveSummary | null {
  return executiveSummariesByClientId.get(clientId) ?? null;
}

export function findBenchmarkForSegment(
  segmentId: string,
  cityProfile: CityProfile,
): Benchmark | null {
  const availableBenchmarks = benchmarksBySegmentId.get(segmentId) ?? [];

  return (
    availableBenchmarks.find((item) => item.cityProfile === cityProfile) ??
    availableBenchmarks[0] ??
    null
  );
}
