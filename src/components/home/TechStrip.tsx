"use client";

import { Text } from "@once-ui-system/core";

import { BadgePill } from "@/components/BadgePill";
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
        speed={0.24}
        itemKey={(item) => item.label}
        renderItem={(item) => <BadgePill label={item.label} icon={item.icon} />}
      />
    </div>
  );
}
