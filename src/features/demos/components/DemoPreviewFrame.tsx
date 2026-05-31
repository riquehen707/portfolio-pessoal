import { type DemoItem } from "../data/demo-registry";

import styles from "./DemoPreviewFrame.module.scss";

type DemoPreviewFrameProps = {
  demo: DemoItem;
  compact?: boolean;
};

export function DemoPreviewFrame({ demo, compact = false }: DemoPreviewFrameProps) {
  return (
    <div
      className={styles.preview}
      data-compact={compact}
      data-segment={demo.segment}
      data-style={demo.visualStyle}
      aria-hidden="true"
    >
      <div className={styles.browserBar}>
        <span />
        <span />
        <span />
      </div>
      <div className={styles.previewBody}>
        <div className={styles.previewHero}>
          <span className={styles.previewKicker}>{demo.segment.replace("-", " ")}</span>
          <strong>{demo.name}</strong>
          <small>{demo.goal}</small>
        </div>
        <div className={styles.previewGrid}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.previewFooter}>
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
