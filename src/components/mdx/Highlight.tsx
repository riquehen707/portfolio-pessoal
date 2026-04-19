import { ReactNode } from "react";

import clsx from "clsx";

import styles from "./Highlight.module.scss";

type HighlightProps = {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "neutral";
};

export function Highlight({ children, className, tone = "brand" }: HighlightProps) {
  return (
    <div className={clsx(styles.root, className)} data-tone={tone}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
