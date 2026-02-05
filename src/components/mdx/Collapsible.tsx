"use client";

import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from "react";
import clsx from "clsx";

type CollapsibleProps = HTMLAttributes<HTMLDetailsElement> & {
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
};

export function Collapsible({ children, className, defaultOpen, ...props }: CollapsibleProps) {
  return (
    <details
      {...props}
      open={defaultOpen}
      className={clsx(
        "my-4 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm",
        "dark:border-gray-800 dark:bg-neutral-900",
        className
      )}
    >
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
    const el = ref.current?.parentElement as HTMLDetailsElement | null;
    if (!el) return;
    // inicializa estado
    setOpen(!!el.open);
    const handler = () => setOpen(!!el.open);
    el.addEventListener("toggle", handler);
    return () => el.removeEventListener("toggle", handler);
  }, []);

  return (
    <summary
      ref={ref}
      {...props}
      className={clsx(
        "cursor-pointer select-none list-none px-4 py-3 font-medium",
        "flex items-center justify-between gap-2",
        "text-gray-900 hover:bg-gray-50",
        "dark:text-gray-100 dark:hover:bg-neutral-800",
        className
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden
        style={{
          display: "inline-block",
          transition: "transform .2s ease",
          transform: open ? "rotate(-180deg)" : "rotate(0deg)",
        }}
      >
        ▾
      </span>
    </summary>
  );
}

type ContentProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  className?: string;
};

export function CollapsibleContent({ children, className, ...props }: ContentProps) {
  return (
    <div
      {...props}
      className={clsx("px-4 pb-4 pt-2 text-gray-800 dark:text-gray-200", className)}
    >
      {children}
    </div>
  );
}
