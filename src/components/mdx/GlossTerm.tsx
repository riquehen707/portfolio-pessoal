// src/components/mdx/GlossTerm.tsx
import React, { ReactNode } from "react";

import styles from "./GlossTerm.module.scss";

export default function GlossTerm({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}) {
  return (
    <span className={styles.root} data-gloss-term data-term={term} title={term}>
      {children}
    </span>
  );
}
