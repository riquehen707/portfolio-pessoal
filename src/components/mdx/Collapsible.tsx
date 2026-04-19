"use client";

import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";

import clsx from "clsx";

import styles from "./Collapsible.module.scss";

type CollapsibleProps = HTMLAttributes<HTMLDetailsElement> & {
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function Collapsible({ children, className, defaultOpen, ...props }: CollapsibleProps) {
  return (
    <details {...props} open={defaultOpen} className={clsx(styles.root, className)}>
      {children}
    </details>
  );
}

type TriggerProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  className?: string;
};

export function CollapsibleTrigger({ children, className, ...props }: TriggerProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const details = ref.current?.parentElement as HTMLDetailsElement | null;

    if (!details) {
      return;
    }

    setOpen(Boolean(details.open));

    const handleToggle = () => setOpen(Boolean(details.open));

    details.addEventListener("toggle", handleToggle);
    return () => details.removeEventListener("toggle", handleToggle);
  }, []);

  return (
    <summary ref={ref} {...props} className={clsx(styles.trigger, className)}>
      <span className={styles.triggerLabel}>{children}</span>
      <span aria-hidden className={styles.triggerIcon} data-open={open ? "true" : "false"} />
    </summary>
  );
}

type ContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

export function CollapsibleContent({ children, className, ...props }: ContentProps) {
  return (
    <div {...props} className={clsx(styles.content, className)}>
      {children}
    </div>
  );
}
