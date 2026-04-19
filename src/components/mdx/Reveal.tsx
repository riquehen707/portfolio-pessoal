"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

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
}: RevealProps) {
  const summaryRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<boolean>(Boolean(defaultOpen));

  useEffect(() => {
    const details = summaryRef.current?.parentElement as HTMLDetailsElement | null;

    if (!details) {
      return;
    }

    setOpen(Boolean(details.open));

    const handleToggle = () => setOpen(Boolean(details.open));

    details.addEventListener("toggle", handleToggle);
    return () => details.removeEventListener("toggle", handleToggle);
  }, []);

  return (
    <details open={defaultOpen} className={clsx(styles.root, className)} data-tone={tone}>
      <summary ref={summaryRef} className={styles.summary}>
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
          {kicker ? <p className={styles.kicker}>{kicker}</p> : null}
          <h3 className={styles.title}>{title}</h3>
          {meta ? <p className={styles.meta}>{meta}</p> : null}
        </div>

        <span aria-hidden className={styles.chevron} data-open={open ? "true" : "false"} />
      </summary>

      <div className={styles.contentWrap}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </details>
  );
}
