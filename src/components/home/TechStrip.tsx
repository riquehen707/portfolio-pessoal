import { Icon } from "@once-ui-system/core";

import type { IconName } from "@/resources/icons";

import styles from "./TechStrip.module.scss";

type TechStripItem = {
  label: string;
  icon: IconName;
};

type TechStripProps = {
  items: readonly TechStripItem[];
};

const segmentIndexes = Array.from({ length: 3 }, (_, index) => index);

export function TechStrip({ items }: TechStripProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className={styles.root} aria-label="Recursos de operação digital">
      <div className={styles.viewport}>
        <div className={styles.marquee}>
          {segmentIndexes.map((segment) => (
            <div
              className={styles.track}
              key={`tech-strip-${segment}`}
              aria-hidden={segment > 0 ? "true" : undefined}
              inert={segment > 0 ? true : undefined}
            >
              {items.map((item) => (
                <span className={styles.item} key={`${item.label}-${segment}`}>
                  <span className={styles.icon} aria-hidden="true">
                    <Icon name={item.icon} size="m" />
                  </span>

                  <span className={styles.label}>{item.label}</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}