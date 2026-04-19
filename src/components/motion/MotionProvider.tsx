"use client";

import type { ReactNode } from "react";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

import { motionEase } from "@/components/motion/motionTokens";

type MotionProviderProps = {
  children: ReactNode;
};

export function MotionProvider({ children }: MotionProviderProps) {
  return (
    <LazyMotion features={domAnimation}>
      <MotionConfig
        reducedMotion="user"
        transition={{
          duration: 0.32,
          ease: motionEase,
        }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
