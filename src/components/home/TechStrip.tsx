"use client";

import { Icon, Text } from "@once-ui-system/core";

import { InfiniteScroller } from "@/components/InfiniteScroller";
import { IconName } from "@/resources/icons";

import styles from "./TechStrip.module.scss";

type TechStripItem = {
  label: string;
  icon: IconName;
};

type TechStripProps = {
  items: TechStripItem[];
};

export function TechStrip({ items }: TechStripProps) {
  return (
    <div className={styles.root}>
      <InfiniteScroller
        items={items}
        ariaLabel="Banner de competências"
        speed={0.38}
        pauseOnHover={false}
        respectReducedMotion={false}
        itemKey={(item) => item.label}
        renderItem={(item) => (
          <article className={styles.item}>
            <span className={styles.iconWrap} aria-hidden="true">
              <span className={styles.iconHalo} />
              <Icon name={item.icon} size="l" />
            </span>
            <Text className={styles.label} variant="body-default-s">
              {item.label}
            </Text>
          </article>
        )}
      />
    </div>
  );
}
