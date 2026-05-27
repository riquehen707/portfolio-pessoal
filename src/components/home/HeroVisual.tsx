"use client";

import { m, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { sectionTransition } from "@/components/motion/motionTokens";

import styles from "./HeroVisual.module.scss";

export function HeroVisual() {
  const reducedMotion = useReducedMotion();

  return (
    <m.div
      className={styles.root}
      aria-hidden="true"
      initial={
        reducedMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              y: 14,
              scale: 0.988,
            }
      }
      animate={
        reducedMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              scale: 1,
            }
      }
      transition={
        reducedMotion
          ? { duration: 0.01 }
          : {
              ...sectionTransition,
              delay: 0.14,
            }
      }
    >
      <div className={styles.visualShell}>
        <div className={styles.expressionMain}>
          <Image
            src="/images/avatar-dog/pride-dog.svg"
            alt=""
            aria-hidden="true"
            width={256}
            height={256}
            sizes="(max-width: 768px) 28vw, 19rem"
            priority
            draggable={false}
          />
        </div>
      </div>
    </m.div>
  );
}
