import type { ReactNode } from "react";

import styles from "./KeyTakeaway.module.scss";

export function KeyTakeaway({ children }: { children: ReactNode }) {
  return (
    <aside className={styles.root} aria-label="Em uma frase">
      <span className={styles.label}>Em uma frase</span>
      <p>{children}</p>
    </aside>
  );
}
