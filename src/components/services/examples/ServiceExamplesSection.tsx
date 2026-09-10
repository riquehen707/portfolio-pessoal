"use client";

import { useState } from "react";
import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { ServiceExampleCard } from "./ServiceExampleCard";
import styles from "./ServiceExamples.module.scss";

export function ServiceExamplesSection({ examples }: { examples: ServiceExample[] }) {
  const filters: Array<{ id: "all" | ServiceExample["solutionType"]; label: string }> = [
    { id: "all", label: "Todos" },
    { id: "institutional", label: "Institucional" },
    { id: "portfolio", label: "Portfólio" },
    { id: "local-business", label: "Negócio local" },
  ];
  const [selectedFilter, setSelectedFilter] = useState<(typeof filters)[number]["id"]>("all");
  const visibleExamples = selectedFilter === "all" ? examples : examples.filter((example) => example.solutionType === selectedFilter);

  return (
    <section className={styles.section} id="exemplos" aria-labelledby="service-examples-title">
      <div className={styles.heading}>
        <div>
          <p className={styles.kicker}>Projetos demonstrativos</p>
          <h2 id="service-examples-title">Veja o que posso criar.</h2>
        </div>
        <p>Sites navegáveis com estruturas, recursos e identidades diferentes.</p>
      </div>
      <div className={styles.filters} role="group" aria-label="Filtrar exemplos por tipo de solução">
        {filters.map((filter) => <button key={filter.id} type="button" aria-pressed={selectedFilter === filter.id} onClick={() => setSelectedFilter(filter.id)}>{filter.label}</button>)}
      </div>
      <p className={styles.resultNote} aria-live="polite">{visibleExamples.length} {visibleExamples.length === 1 ? "site demonstrativo" : "sites demonstrativos"}</p>
      {examples.length ? (
        <div className={styles.grid} data-filtered={selectedFilter !== "all"}>{visibleExamples.map((example) => <ServiceExampleCard example={example} key={example.id} />)}</div>
      ) : (
        <div className={styles.emptyState} role="status">
          <strong>Os primeiros exemplos estão em preparação.</strong>
          <p>Nenhum projeto demonstrativo será publicado apenas para preencher esta seção.</p>
        </div>
      )}
    </section>
  );
}
