import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import clsx from "clsx";

import styles from "./MetaBar.module.scss";

type MetaBarProps = {
  publishedAt: string | Date;
  updatedAt?: string | Date;
  readTimeMin?: number;
  className?: string;
};

export default function MetaBar({ publishedAt, updatedAt, readTimeMin, className }: MetaBarProps) {
  const formatDate = (value: string | Date) =>
    format(typeof value === "string" ? new Date(value) : value, "d 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });

  return (
    <div className={clsx(styles.root, className)}>
      <span>Publicado em {formatDate(publishedAt)}</span>
      {updatedAt ? <span className={styles.muted}>Atualizado em {formatDate(updatedAt)}</span> : null}
      {typeof readTimeMin === "number" ? <span className={styles.muted}>{readTimeMin} min de leitura</span> : null}
    </div>
  );
}
