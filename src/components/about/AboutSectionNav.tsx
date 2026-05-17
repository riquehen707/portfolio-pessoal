"use client";

import { type ReactNode } from "react";

import styles from "./about.module.scss";

type AboutScrollButtonProps = {
  targetId: string;
  children: ReactNode;
  className?: string;
};

function scrollToId(id: string) {
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  target.scrollIntoView({
    behavior: prefersReducedMotion ? "auto" : "smooth",
    block: "start",
  });
}

export function AboutScrollButton({
  targetId,
  children,
  className,
}: AboutScrollButtonProps) {
  return (
    <button
      className={className ?? styles.heroJump}
      onClick={() => scrollToId(targetId)}
      type="button"
    >
      {children}
    </button>
  );
}
