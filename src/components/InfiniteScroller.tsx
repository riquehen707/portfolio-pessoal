"use client";

import type { CSSProperties, ReactNode } from "react";

import classNames from "classnames";

import styles from "./InfiniteScroller.module.scss";

type InfiniteScrollerProps<T> = {
  items: T[];
  ariaLabel: string;
  speed?: number;
  renderItem: (item: T, index: number) => ReactNode;
  itemKey: (item: T, index: number) => string;
  className?: string;
  pauseOnHover?: boolean;
  stackOnMobile?: boolean;
};

export function InfiniteScroller<T>({
  items,
  ariaLabel,
  speed = 0.42,
  renderItem,
  itemKey,
  className,
  pauseOnHover = true,
  stackOnMobile = false,
}: InfiniteScrollerProps<T>) {
  if (!items.length) {
    return null;
  }

  const normalizedSpeed = Math.max(speed, 0.16);
  const marqueeStyle = {
    "--hr-marquee-duration": `${Math.max(24, Math.min(72, 16 / normalizedSpeed))}s`,
  } as CSSProperties;

  return (
    <div
      className={classNames(styles.root, className)}
      data-stack-mobile={stackOnMobile ? "true" : "false"}
    >
      <div
        className={classNames(styles.viewport, {
          [styles.pauseOnHover]: pauseOnHover,
        })}
        aria-label={ariaLabel}
        style={marqueeStyle}
      >
        <div className={styles.marquee}>
          {[0, 1].map((segment) => (
            <div className={styles.track} key={`segment-${segment}`} aria-hidden={segment === 1 ? "true" : undefined}>
              {items.map((item, index) => (
                <div className={styles.itemSlot} key={`${itemKey(item, index)}-${segment}`}>
                  {renderItem(item, index)}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.staticList} aria-label={ariaLabel}>
        {items.map((item, index) => (
          <div className={styles.staticItem} key={`${itemKey(item, index)}-static`}>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
