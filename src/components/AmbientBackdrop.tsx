"use client";

import { useEffect } from "react";

export function AmbientBackdrop() {
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const setDefaults = () => {
      root.style.setProperty("--site-cursor-x", "50%");
      root.style.setProperty("--site-cursor-y", "14%");
      root.style.setProperty("--site-cursor-opacity", "0");
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!mediaQuery.matches || reducedMotion.matches) return;

      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;

      root.style.setProperty("--site-cursor-x", `${x}%`);
      root.style.setProperty("--site-cursor-y", `${y}%`);
      root.style.setProperty("--site-cursor-opacity", "1");
    };

    const handlePointerLeave = () => {
      root.style.setProperty("--site-cursor-opacity", "0");
    };

    setDefaults();

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      setDefaults();
    };
  }, []);

  return null;
}
