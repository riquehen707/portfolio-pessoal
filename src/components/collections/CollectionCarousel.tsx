"use client";

import type { ReactNode } from "react";
import { useRef } from "react";

import styles from "./CollectionCarousel.module.scss";

export function CollectionCarousel({ label, children, itemClassName }: { label: string; children: ReactNode[]; itemClassName?: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const move = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * Math.max(track.clientWidth * 0.82, 240), behavior: "smooth" });
  };
  return <div className={styles.carousel} role="region" aria-label={label}>
    {children.length > 1 ? <div className={styles.controls}>
      <button type="button" onClick={() => move(-1)} aria-label={`${label}: itens anteriores`}>←</button>
      <button type="button" onClick={() => move(1)} aria-label={`${label}: próximos itens`}>→</button>
    </div> : null}
    <div className={styles.track} ref={trackRef} tabIndex={children.length > 1 ? 0 : undefined}>
      {children.map((child, index) => <div className={itemClassName} key={index}>{child}</div>)}
    </div>
  </div>;
}
