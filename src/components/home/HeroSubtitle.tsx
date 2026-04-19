"use client";

import type { ReactNode } from "react";

import { Text } from "@once-ui-system/core";
import { m, useReducedMotion } from "framer-motion";

import {
  createRevealVariants,
  revealTransition,
} from "@/components/motion/motionTokens";

import styles from "./HeroSubtitle.module.scss";

type HeroSubtitleProps = {
  children: ReactNode;
};

export function HeroSubtitle({ children }: HeroSubtitleProps) {
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={createRevealVariants(reducedMotion, 20, 0.992)}
      transition={
        reducedMotion
          ? {
              duration: 0.01,
            }
          : {
              ...revealTransition,
              delay: 0.14,
            }
      }
    >
      <Text className={styles.subtitle} onBackground="neutral-weak" variant="heading-default-xl" wrap="balance">
        {children}
      </Text>
    </m.div>
  );
}
