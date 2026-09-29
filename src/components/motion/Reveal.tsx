"use client";

import type { ReactNode } from "react";

import { m, useReducedMotion } from "framer-motion";

import {
  createRevealVariants,
  motionViewport,
  revealTransition,
} from "@/components/motion/motionTokens";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
  once?: boolean;
  trigger?: "viewport" | "mount";
};

export function Reveal({
  children,
  className,
  delay = 0,
  distance = 28,
  amount = motionViewport.amount,
  once = motionViewport.once,
  trigger = "viewport",
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      className={className}
      initial={trigger === "viewport" ? "hidden" : false}
      animate={trigger === "mount" ? "visible" : undefined}
      whileInView={trigger === "viewport" ? "visible" : undefined}
      viewport={trigger === "viewport" ? { once, amount } : undefined}
      variants={createRevealVariants(reducedMotion, distance)}
      transition={
        reducedMotion
          ? {
              duration: 0.01,
            }
          : {
              ...revealTransition,
              delay,
            }
      }
    >
      {children}
    </m.div>
  );
}
