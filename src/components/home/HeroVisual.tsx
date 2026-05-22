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
              y: 18,
              scale: 0.98,
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
          ? {
              duration: 0.01,
            }
          : {
              ...sectionTransition,
              delay: 0.18,
            }
      }
    >
      <div className={styles.imageShell}>
        <Image
          className={styles.image}
          src="/images/hero-dark-illustration.svg"
          alt=""
          width={810}
          height={1012}
          priority
          unoptimized
        />
      </div>
    </m.div>
  );
}
