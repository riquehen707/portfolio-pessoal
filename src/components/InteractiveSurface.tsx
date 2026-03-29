"use client";

import { CSSProperties, PointerEvent, ReactNode, useEffect, useRef } from "react";

type InteractiveSurfaceProps = {
  className?: string;
  children: ReactNode;
};

type SurfaceStyle = CSSProperties &
  Record<"--pointer-x" | "--pointer-y" | "--pointer-opacity" | "--pointer-scale", string>;

const baseStyle: SurfaceStyle = {
  "--pointer-x": "50%",
  "--pointer-y": "18%",
  "--pointer-opacity": "0",
  "--pointer-scale": "0.92",
};

export function InteractiveSurface({ className, children }: InteractiveSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const valuesRef = useRef({
    pointerX: 50,
    pointerY: 18,
    opacity: 0,
    scale: 0.92,
  });

  const applyValues = () => {
    const node = surfaceRef.current;
    if (!node) return;

    node.style.setProperty("--pointer-x", `${valuesRef.current.pointerX}%`);
    node.style.setProperty("--pointer-y", `${valuesRef.current.pointerY}%`);
    node.style.setProperty("--pointer-opacity", `${valuesRef.current.opacity}`);
    node.style.setProperty("--pointer-scale", `${valuesRef.current.scale}`);
    frameRef.current = null;
  };

  const scheduleApply = () => {
    if (frameRef.current !== null) return;
    frameRef.current = window.requestAnimationFrame(applyValues);
  };

  const allowInteraction = () => {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  };

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!allowInteraction()) return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - bounds.left) / bounds.width;
    const offsetY = (event.clientY - bounds.top) / bounds.height;

    valuesRef.current = {
      pointerX: offsetX * 100,
      pointerY: offsetY * 100,
      opacity: 1,
      scale: 1,
    };

    scheduleApply();
  };

  const handlePointerLeave = () => {
    valuesRef.current = {
      pointerX: 50,
      pointerY: 18,
      opacity: 0,
      scale: 0.92,
    };

    scheduleApply();
  };

  return (
    <div
      className={className}
      onPointerLeave={handlePointerLeave}
      onPointerMove={handlePointerMove}
      ref={surfaceRef}
      style={baseStyle}
    >
      {children}
    </div>
  );
}
