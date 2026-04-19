"use client";

import type { ReactNode } from "react";

import { Heading } from "@once-ui-system/core";
import { m, useReducedMotion } from "framer-motion";

import {
  createRevealVariants,
  sectionTransition,
} from "@/components/motion/motionTokens";

import styles from "./HeroTitle.module.scss";

type HeroTitleProps = {
  children: ReactNode;
};

export function HeroTitle({ children }: HeroTitleProps) {
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={createRevealVariants(reducedMotion, 34, 0.982)}
      transition={
        reducedMotion
          ? {
              duration: 0.01,
            }
          : {
              ...sectionTransition,
              delay: 0.02,
            }
      }
    >
      <Heading as="h1" className={styles.title} variant="display-strong-l" wrap="balance">
        {children}
      </Heading>
    </m.div>
  );
}
