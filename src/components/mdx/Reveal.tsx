import { ReactNode } from "react";

import clsx from "clsx";
import Image from "next/image";

import styles from "./Reveal.module.scss";

type HeaderProps = {
  kicker?: string;
  title: string;
  meta?: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
};

type RevealProps = HeaderProps & {
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  tone?: "neutral" | "brand" | "warning" | "success" | "danger";
  simple?: boolean;
};

export default function Reveal({
  kicker,
  title,
  meta,
  thumbnailSrc,
  thumbnailAlt,
  children,
  defaultOpen,
  className,
  tone = "brand",
  simple = false,
}: RevealProps) {
  return (
    <details
      open={defaultOpen}
      className={clsx(styles.root, simple && styles.simple, className)}
      data-tone={tone}
    >
      <summary className={styles.summary}>
        {thumbnailSrc ? (
          <div className={styles.thumbnail}>
            <Image
              src={thumbnailSrc}
              alt={thumbnailAlt || ""}
              fill
              className={styles.thumbnailImage}
              sizes="96px"
            />
          </div>
        ) : null}

        <div className={styles.body}>
          {!simple && kicker ? <p className={styles.kicker}>{kicker}</p> : null}
          <h3 className={styles.title}>{title}</h3>
          {!simple && meta ? <p className={styles.meta}>{meta}</p> : null}
        </div>

        <span aria-hidden className={styles.chevron} />
      </summary>

      <div className={styles.contentWrap}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </details>
  );
}
