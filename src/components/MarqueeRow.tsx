import { Text } from "@once-ui-system/core";

import styles from "./MarqueeRow.module.scss";

type MarqueeRowProps = {
  items: string[];
  ariaLabel: string;
};

export function MarqueeRow({ items, ariaLabel }: MarqueeRowProps) {
  if (!items.length) {
    return null;
  }

  return (
    <div className={styles.viewport} aria-label={ariaLabel}>
      <div className={styles.track}>
        {items.map((item) => (
          <div className={styles.item} key={item}>
            <span className={styles.dot} aria-hidden="true" />
            <Text variant="body-default-m">{item}</Text>
          </div>
        ))}
      </div>
    </div>
  );
}
