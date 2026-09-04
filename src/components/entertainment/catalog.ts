"use client";

import { useState } from "react";

export function normalizeCatalogText(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}

export function uniqueCatalogValues(values: string[]) {
  return [...new Set(values)].sort((a, b) => a.localeCompare(b, "pt-BR"));
}

export function useProgressiveCatalog(resetKey: string, total: number, step = 12) {
  const [progress, setProgress] = useState({ key: resetKey, count: step });
  const visibleCount = progress.key === resetKey ? progress.count : step;
  return {
    visibleCount,
    hasMore: visibleCount < total,
    loadMore: () => setProgress({ key: resetKey, count: Math.min(total, visibleCount + step) }),
  };
}
