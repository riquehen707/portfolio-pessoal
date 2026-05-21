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
  support?: ReactNode;
  benefits?: readonly string[];
};

export function HeroSubtitle({ children, support, benefits = [] }: HeroSubtitleProps) {
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
      <div className={styles.group}>
        <Text className={styles.subtitle} onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
          {children}
        </Text>

        {support ? (
          <Text className={styles.support} onBackground="neutral-weak" variant="body-default-m" wrap="balance">
            {support}
          </Text>
        ) : null}

        {benefits.length > 0 ? (
          <ul className={styles.benefits} aria-label="Benefícios principais">
            {benefits.map((benefit) => (
              <li className={styles.benefit} key={benefit}>
                <span className={styles.benefitDot} aria-hidden="true" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </m.div>
  );
}
