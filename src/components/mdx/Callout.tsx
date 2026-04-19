import { ReactNode } from "react";

import clsx from "clsx";

import styles from "./Callout.module.scss";

type Variant = "info" | "warning" | "success" | "danger" | "neutral";

type CalloutProps = {
  title?: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

const variantLabel: Record<Variant, string> = {
  info: "Info",
  warning: "Aviso",
  success: "Sucesso",
  danger: "Critico",
  neutral: "Nota",
};

export function Callout({
  title,
  variant = "info",
  children,
  className,
}: CalloutProps) {
  return (
    <div className={clsx(styles.root, className)} data-variant={variant} role="note" aria-label={title ?? variantLabel[variant]}>
      <div className={styles.header}>
        <span className={styles.badge}>{variantLabel[variant]}</span>
        {title ? <span className={styles.title}>{title}</span> : null}
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
