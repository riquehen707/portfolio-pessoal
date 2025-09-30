"use client";

import clsx from "clsx";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

type HeaderProps = {
  kicker?: string;        // ex: "Caso real"
  title: string;          // título chamativo
  meta?: string;          // ex: "Brasil • 2025"
  thumbnailSrc?: string;  // opcional
  thumbnailAlt?: string;  // opcional
};

type RevealProps = HeaderProps & {
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  tone?: "neutral" | "brand" | "warning" | "success" | "danger";
};

const toneStyles: Record<NonNullable<RevealProps["tone"]>, string> = {
  neutral: "border-gray-200 bg-white dark:border-gray-800 dark:bg-neutral-900",
  brand: "border-indigo-200 bg-indigo-50 dark:border-indigo-800/50 dark:bg-indigo-950/30",
  warning: "border-amber-200 bg-amber-50 dark:border-amber-800/50 dark:bg-amber-950/30",
  success: "border-emerald-200 bg-emerald-50 dark:border-emerald-800/50 dark:bg-emerald-950/30",
  danger: "border-rose-200 bg-rose-50 dark:border-rose-800/50 dark:bg-rose-950/30",
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
  const sumRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState<boolean>(!!defaultOpen);

  useEffect(() => {
    const details = sumRef.current?.parentElement as HTMLDetailsElement | null;
    if (!details) return;
    setOpen(details.open);
    const onToggle = () => setOpen(details.open);
    details.addEventListener("toggle", onToggle);
    return () => details.removeEventListener("toggle", onToggle);
  }, []);

  return (
    <details
      open={defaultOpen}
      className={clsx(
        "my-6 overflow-hidden rounded-xl border shadow-sm transition",
        toneStyles[tone],
        className
      )}
    >
      <summary
        ref={sumRef as any}
        className={clsx(
          "list-none cursor-pointer px-4 py-4 sm:px-5 sm:py-5",
          "flex items-center gap-4"
        )}
      >
        {thumbnailSrc ? (
          <div className="relative h-14 w-24 flex-shrink-0 overflow-hidden rounded-md ring-1 ring-black/5">
            <Image
              src={thumbnailSrc}
              alt={thumbnailAlt || ""}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
        ) : null}
        <div className="min-w-0 flex-1">
          {kicker ? (
            <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
              {kicker}
            </p>
          ) : null}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h3>
          {meta ? (
            <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-300">{meta}</p>
          ) : null}
        </div>
        <span
          aria-hidden
          className="ml-auto inline-block text-xl transition-transform"
          style={{ transform: open ? "rotate(-180deg)" : "rotate(0deg)" }}
        >
          ▾
        </span>
      </summary>

      <div className="px-4 pb-5 sm:px-5 sm:pb-6">
        <div className="rounded-lg bg-white/60 p-4 shadow-sm backdrop-blur-md dark:bg-neutral-900/40">
          {children}
        </div>
      </div>
    </details>
  );
}
