import Link from "next/link";

import { type DemoItem } from "../data/demo-registry";
import { getDemoSegment } from "../helpers/getDemo";

import { DemoPreviewFrame } from "./DemoPreviewFrame";
import { DemoStatusBadge } from "./DemoStatusBadge";
import styles from "./DemoCard.module.scss";

type DemoCardProps = {
  demo: DemoItem;
  featured?: boolean;
};

export function DemoCard({ demo, featured = false }: DemoCardProps) {
  const segment = getDemoSegment(demo.segment);

  return (
    <article className={styles.card} data-featured={featured}>
      <Link className={styles.previewLink} href={demo.route} aria-label={`Ver demo ${demo.name}`}>
        <DemoPreviewFrame demo={demo} compact={!featured} />
      </Link>

      <div className={styles.content}>
        <div className={styles.metaRow}>
          <DemoStatusBadge status={demo.status} />
          <span>{segment?.name ?? demo.segment}</span>
          <span>{demo.visualStyle}</span>
        </div>

        <div className={styles.copy}>
          <h3>{demo.name}</h3>
          <p>{demo.description}</p>
        </div>

        <div className={styles.tags} aria-label="Tags do modelo">
          {demo.tags.map((tag) => (
            <span key={`${demo.slug}-${tag}`}>{tag}</span>
          ))}
        </div>

        <div className={styles.actions}>
          <Link className={styles.primaryAction} href={demo.route}>
            Ver demo
          </Link>
          <Link className={styles.secondaryAction} href={`/modelos/${demo.segment}`}>
            Ver segmento
          </Link>
        </div>
      </div>
    </article>
  );
}
