"use client";

import { useEffect, useState } from "react";

type Props = {
  watchId: string;
  height?: number;
  color?: string;
  zIndex?: number;
  shadow?: boolean;
};

export default function ReadingProgress({
  watchId,
  height = 4,
  color = "var(--brand-600, #4f46e5)",
  zIndex = 60,
  shadow = true,
}: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = document.getElementById(watchId);
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const topAbs = window.scrollY + rect.top;
        const heightAbs = el.offsetHeight;
        const totalScrollable = Math.max(0, heightAbs - window.innerHeight);
        const scrolled = Math.min(Math.max(0, window.scrollY - topAbs), totalScrollable);
        const pct = totalScrollable > 0 ? scrolled / totalScrollable : 0;
        setProgress(pct);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [watchId]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        insetInlineStart: 0,
        insetBlockStart: 0,
        width: "100%",
        height,
        background:
          "linear-gradient(to right, var(--progress-color, currentColor) 0%, var(--progress-color, currentColor) var(--w, 0%), transparent var(--w, 0%))",
        color,
        zIndex,
        boxShadow: shadow ? "0 1px 4px rgba(0,0,0,.12)" : undefined,
        transition: "0.15s ease-out",
        // @ts-ignore
        "--progress-color": color,
        "--w": `${Math.round(progress * 100)}%`,
      } as React.CSSProperties}
    />
  );
}
