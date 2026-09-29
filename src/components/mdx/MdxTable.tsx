import type { ReactNode } from "react";

import styles from "./MdxTable.module.scss";

export function MdxTable({ children }: { children: ReactNode }) {
  return (
    <div className={styles.block}>
      <div className={styles.viewport} role="region" aria-label="Tabela de comparação" tabIndex={0}>
        <table className={styles.table}>{children}</table>
      </div>
      <p className={styles.hint}>Deslize horizontalmente para comparar todos os dados.</p>
    </div>
  );
}
