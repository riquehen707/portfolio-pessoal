"use client";

import { useState } from "react";

import { Icon, Text } from "@once-ui-system/core";

import type { IconName } from "@/resources/icons";

import styles from "./TechStrip.module.scss";

type TechStripItem = {
  label: string;
  icon: IconName;
  description: string;
};

type TechStripProps = {
  items: readonly TechStripItem[];
};

export function TechStrip({ items }: TechStripProps) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const activeItem = items.find((item) => item.label === activeLabel);
  const hint =
    activeItem?.description ??
    "Passe pelos detalhes que tornam uma presença digital mais clara, rápida e fácil de escolher.";

  const handleItemClick = (label: string) => {
    setActiveLabel((current) => (current === label ? null : label));
  };

  return (
    <div
      className={styles.root}
      onPointerLeave={() => setActiveLabel(null)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setActiveLabel(null);
        }
      }}
      onPointerDownCapture={(event) => {
        if (!(event.target as HTMLElement).closest("button")) {
          setActiveLabel(null);
        }
      }}
    >
      <div className={styles.intro}>
        <h2 className={styles.title}>O destaque acontece nos detalhes.</h2>
        <Text className={styles.subtitle} variant="body-default-m">
          Design, estratégia e tecnologia trabalhando juntos para tornar sua presença mais clara.
        </Text>
      </div>

      <div className={styles.viewport} aria-label="Detalhes da operação digital">
        <div className={styles.marquee}>
          {[0, 1].map((segment) => (
            <div
              className={styles.track}
              key={`tech-strip-${segment}`}
              aria-hidden={segment === 1 ? "true" : undefined}
              inert={segment === 1 ? true : undefined}
            >
              {items.map((item) => {
                const isActive = activeLabel === item.label;

                return (
                  <button
                    className={styles.item}
                    type="button"
                    key={`${item.label}-${segment}`}
                    data-active={isActive ? "true" : "false"}
                    aria-pressed={segment === 0 ? isActive : undefined}
                    tabIndex={segment === 0 ? 0 : -1}
                    onClick={() => handleItemClick(item.label)}
                    onPointerEnter={() => setActiveLabel(item.label)}
                    onFocus={() => setActiveLabel(item.label)}
                  >
                    <span className={styles.iconWrap} aria-hidden="true">
                      <Icon name={item.icon} size="l" />
                    </span>
                    <span className={styles.label}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.detail} aria-live="polite">
        <Text className={styles.detailTitle} variant="label-default-s">
          {activeItem?.label ?? "Detalhes que sustentam escolha"}
        </Text>
        <Text className={styles.detailText} variant="body-default-m">
          <span className={styles.desktopHint}>{hint}</span>
          <span className={styles.mobileHint}>
            {activeItem?.description ?? "Toque em um item para entender."}
          </span>
        </Text>
      </div>
    </div>
  );
}
