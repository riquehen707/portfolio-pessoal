"use client";

import { Text } from "@once-ui-system/core";

import { BadgePill } from "@/components/BadgePill";
import { InfiniteScroller } from "@/components/InfiniteScroller";
import { IconName } from "@/resources/icons";

import styles from "./MarqueeTrust.module.scss";

type MarqueeTrustItem = {
  label: string;
  icon?: IconName;
};

type MarqueeTrustProps = {
  items: MarqueeTrustItem[];
};

export function MarqueeTrust({ items }: MarqueeTrustProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
          Prova rapida
        </Text>
        <Text className={styles.copy} onBackground="neutral-weak" variant="body-default-s">
          Sinais curtos para confirmar criterio, repertorio e capacidade sem exigir leitura longa.
        </Text>
      </div>

      <InfiniteScroller
        items={items}
        ariaLabel="Faixa de credibilidade"
        speed={0.38}
        itemKey={(item) => item.label}
        renderItem={(item) => <BadgePill label={item.label} icon={item.icon} tone="accent" />}
      />
    </div>
  );
}
