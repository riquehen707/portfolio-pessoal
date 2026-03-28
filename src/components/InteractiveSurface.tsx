"use client";

import { CSSProperties, PointerEvent, ReactNode, useEffect, useRef } from "react";

type InteractiveSurfaceProps = {
  className?: string;
  children: ReactNode;
  maxTilt?: number;
};

type SurfaceStyle = CSSProperties & Record<"--pointer-x" | "--pointer-y" | "--rotate-x" | "--rotate-y", string>;

const baseStyle: SurfaceStyle = {
  "--pointer-x": "50%",
  "--pointer-y": "18%",
  "--rotate-x": "0deg",
  "--rotate-y": "0deg",
};

export function InteractiveSurface({
  className,
  children,
  maxTilt = 7,
}: InteractiveSurfaceProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const valuesRef = useRef({
    pointerX: 50,
    pointerY: 18,
    rotateX: 0,
    rotateY: 0,
  });

  const applyValues = () => {
    const node = surfaceRef.current;
    if (!node) return;

    node.style.setProperty("--pointer-x", `${valuesRef.current.pointerX}%`);
    node.style.setProperty("--pointer-y", `${valuesRef.current.pointerY}%`);
    node.style.setProperty("--rotate-x", `${valuesRef.current.rotateX}deg`);
    node.style.setProperty("--rotate-y", `${valuesRef.current.rotateY}deg`);
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
      rotateX: (0.5 - offsetY) * maxTilt,
      rotateY: (offsetX - 0.5) * maxTilt,
    };

    scheduleApply();
  };

  const handlePointerLeave = () => {
    valuesRef.current = {
      pointerX: 50,
      pointerY: 18,
      rotateX: 0,
      rotateY: 0,
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
