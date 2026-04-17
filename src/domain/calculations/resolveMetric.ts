import type { DataClassification, MetricSourceKind, MetricTrace } from "@/domain/types";

type ResolveMetricInput = {
  key: string;
  label: string;
  section: string;
  observed: number | null | undefined;
  benchmark: number | null | undefined;
  fallback: number;
  benchmarkLabel: string;
  fallbackLabel?: string;
  benchmarkConfidence?: number;
};

type ResolveMetricResult = {
  value: number;
  sourceKind: MetricSourceKind;
  classification: DataClassification;
  confidence: number;
  trace: MetricTrace;
};

function hasValue(value: number | null | undefined) {
  return value != null && Number.isFinite(value);
}

export function resolveMetric(
  observed: number | null | undefined,
  benchmark: number | null | undefined,
  fallback: number,
): number {
  if (observed != null) return observed;
  if (benchmark != null) return benchmark;
  return fallback;
}

export function resolveMetricWithTrace({
  key,
  label,
  section,
  observed,
  benchmark,
  fallback,
  benchmarkLabel,
  fallbackLabel = "Fallback global do motor",
  benchmarkConfidence = 0.72,
}: ResolveMetricInput): ResolveMetricResult {
  if (hasValue(observed)) {
    const value = Number(observed);
    return {
      value,
      sourceKind: "observed",
      classification: "real",
      confidence: 0.96,
      trace: {
        key,
        label,
        section,
        value,
        classification: "real",
        sourceKind: "observed",
        sourceLabel: "Observado no cliente",
        confidence: 0.96,
      },
    };
  }

  if (hasValue(benchmark)) {
    const value = Number(benchmark);
    const confidence = Math.min(0.88, Math.max(0.48, benchmarkConfidence));
    return {
      value,
      sourceKind: "benchmark",
      classification: "estimated",
      confidence,
      trace: {
        key,
        label,
        section,
        value,
        classification: "estimated",
        sourceKind: "benchmark",
        sourceLabel: benchmarkLabel,
        confidence,
      },
    };
  }

  return {
    value: fallback,
    sourceKind: "fallback",
    classification: "estimated",
    confidence: 0.52,
    trace: {
      key,
      label,
      section,
      value: fallback,
      classification: "estimated",
      sourceKind: "fallback",
      sourceLabel: fallbackLabel,
      confidence: 0.52,
    },
  };
}
