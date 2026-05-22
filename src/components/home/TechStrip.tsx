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

const segmentIndexes = Array.from({ length: 4 }, (_, index) => index);

export function TechStrip({ items }: TechStripProps) {
  return (
    <div className={styles.root} aria-label="Recursos de operação digital">
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
                <span
                  className={styles.item}
                  key={`${item.label}-${segment}`}
                  aria-label={segment === 0 ? item.label : undefined}
                  role={segment === 0 ? "img" : undefined}
                >
                  <Icon name={item.icon} size="l" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
