import styles from "./DemoStatusBadge.module.scss";

type DemoStatusBadgeProps = {
  status: "rascunho" | "experimental" | "publicado";
};

const labels = {
  rascunho: "Rascunho",
  experimental: "Experimental",
  publicado: "Publicado",
} as const;

export function DemoStatusBadge({ status }: DemoStatusBadgeProps) {
  return (
    <span className={styles.badge} data-status={status}>
      {labels[status]}
    </span>
  );
}
