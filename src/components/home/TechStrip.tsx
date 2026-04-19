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
      <div className={styles.header}>
        <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
          Competencias centrais
        </Text>
        <Text className={styles.copy} onBackground="neutral-weak" variant="body-default-s">
          Tecnologia, operacao e acquisicao compondo um ecossistema mais forte que uma stack isolada.
        </Text>
      </div>

      <InfiniteScroller
        items={items}
        ariaLabel="Banner de competencias"
        speed={0.8}
        pauseOnHover={false}
        itemKey={(item) => item.label}
        renderItem={(item) => (
          <article className={styles.item}>
            <span className={styles.iconWrap} aria-hidden="true">
              <Icon name={item.icon} size="m" />
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
