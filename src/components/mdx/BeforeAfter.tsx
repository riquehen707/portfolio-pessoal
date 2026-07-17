"use client";

import { useId, useState } from "react";

import Image from "next/image";

import { MediaCredit, type MediaCreditProps } from "./MediaCredit";
import styles from "./BeforeAfter.module.scss";

type BeforeAfterProps = MediaCreditProps & {
  beforeSrc: string;
  beforeAlt: string;
  afterSrc: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  aspectRatio?: `${number}/${number}`;
};

export function BeforeAfter({
  beforeSrc,
  beforeAlt,
  afterSrc,
  afterAlt,
  beforeLabel = "Antes",
  afterLabel = "Depois",
  aspectRatio = "16/9",
  caption,
  source,
  accessedAt,
  sourceHref,
}: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const labelId = useId();

  return (
    <figure className={styles.root}>
      <div className={styles.comparison} style={{ aspectRatio }}>
        <Image src={afterSrc} alt={afterAlt} fill sizes="(max-width: 960px) 100vw, 720px" />
        <span className={`${styles.badge} ${styles.afterBadge}`}>{afterLabel}</span>
        <div
          className={styles.before}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image src={beforeSrc} alt={beforeAlt} fill sizes="(max-width: 960px) 100vw, 720px" />
          <span className={`${styles.badge} ${styles.beforeBadge}`}>{beforeLabel}</span>
        </div>
        <span className={styles.divider} style={{ left: `${position}%` }} aria-hidden="true" />
        <label className={styles.srOnly} id={labelId} htmlFor={`${labelId}-range`}>
          Comparar {beforeLabel.toLowerCase()} e {afterLabel.toLowerCase()}
        </label>
        <input
          id={`${labelId}-range`}
          className={styles.range}
          type="range"
          min="0"
          max="100"
          value={position}
          aria-labelledby={labelId}
          onChange={(event) => setPosition(Number(event.target.value))}
        />
      </div>
      <p className={styles.instructions}>
        Arraste o controle ou use as setas do teclado para comparar as duas imagens.
      </p>
      <MediaCredit
        caption={caption}
        source={source}
        accessedAt={accessedAt}
        sourceHref={sourceHref}
      />
    </figure>
  );
}
