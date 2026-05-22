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

export function TechStrip({ items }: TechStripProps) {
  return (
    <div className={styles.root} aria-label="Recursos de operação digital">
      <div className={styles.viewport}>
        <div className={styles.marquee}>
          {[0, 1].map((segment) => (
            <div
              className={styles.track}
              key={`tech-strip-${segment}`}
              aria-hidden={segment === 1 ? "true" : undefined}
              inert={segment === 1 ? true : undefined}
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
