"use client";

import { m, useReducedMotion } from "framer-motion";

import {
  getLoopTransition,
  motionEase,
  sectionTransition,
} from "@/components/motion/motionTokens";

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
              scale: 0.96,
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
              delay: 0.24,
            }
      }
    >
      <m.div
        className={styles.panel}
        animate={reducedMotion ? undefined : { opacity: [0.7, 0.92, 0.76], scale: [0.992, 1, 0.996] }}
        transition={reducedMotion ? undefined : getLoopTransition(9.5, 0.1)}
      />
      <m.div
        className={styles.panelEcho}
        animate={reducedMotion ? undefined : { opacity: [0.4, 0.68, 0.5], x: [0, 8, 0] }}
        transition={reducedMotion ? undefined : getLoopTransition(11, 0.3)}
      />
      <m.div
        className={styles.grid}
        animate={reducedMotion ? undefined : { opacity: [0.62, 0.82, 0.68] }}
        transition={reducedMotion ? undefined : getLoopTransition(10)}
      />
      <m.div
        className={styles.beam}
        animate={reducedMotion ? undefined : { opacity: [0.55, 0.82, 0.64] }}
        transition={reducedMotion ? undefined : getLoopTransition(7)}
      />
      <m.div
        className={styles.beamVertical}
        animate={reducedMotion ? undefined : { opacity: [0.24, 0.5, 0.3] }}
        transition={reducedMotion ? undefined : getLoopTransition(8.5, 0.2)}
      />
      <m.div
        className={styles.frame}
        animate={reducedMotion ? undefined : { opacity: [0.78, 1, 0.84] }}
        transition={reducedMotion ? undefined : getLoopTransition(9, 0.2)}
      />
      <m.div
        className={styles.frameOffset}
        animate={reducedMotion ? undefined : { opacity: [0.35, 0.58, 0.4] }}
        transition={reducedMotion ? undefined : getLoopTransition(10.5, 0.35)}
      />
      <m.div
        className={styles.ring}
        animate={reducedMotion ? undefined : { opacity: [0.8, 1, 0.86] }}
        transition={reducedMotion ? undefined : getLoopTransition(12, 0.1)}
      />
      <m.div
        className={styles.ringSecondary}
        animate={reducedMotion ? undefined : { opacity: [0.22, 0.42, 0.28] }}
        transition={reducedMotion ? undefined : getLoopTransition(13, 0.25)}
      />
      <m.div
        className={styles.axisHorizontal}
        animate={reducedMotion ? undefined : { opacity: [0.48, 0.8, 0.56] }}
        transition={reducedMotion ? undefined : getLoopTransition(8, 0.15)}
      />
      <m.div
        className={styles.axisVertical}
        animate={reducedMotion ? undefined : { opacity: [0.45, 0.76, 0.52] }}
        transition={reducedMotion ? undefined : getLoopTransition(8.5)}
      />
      <div className={styles.squareGlowShell}>
        <m.div
          className={styles.squareGlow}
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: [0.48, 0.82, 0.58],
                  scale: [0.98, 1.05, 1],
                }
          }
          transition={reducedMotion ? undefined : getLoopTransition(6.5)}
        />
      </div>
      <div className={styles.squareShell}>
        <m.div
          className={styles.squareShadow}
          animate={reducedMotion ? undefined : { opacity: [0.34, 0.56, 0.4], scale: [0.96, 1.06, 1] }}
          transition={reducedMotion ? undefined : getLoopTransition(7.5, 0.12)}
        />
        <m.div
          className={styles.squareOutline}
          animate={reducedMotion ? undefined : { opacity: [0.34, 0.6, 0.42] }}
          transition={reducedMotion ? undefined : getLoopTransition(9.2, 0.18)}
        />
        <m.div
          className={styles.squareAccent}
          animate={reducedMotion ? undefined : { opacity: [0.22, 0.52, 0.3] }}
          transition={reducedMotion ? undefined : getLoopTransition(6.8, 0.08)}
        />
        <m.div
          className={styles.square}
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -10, 0],
                  rotate: [0, 1.4, 0],
                  boxShadow: [
                    "0 18px 42px rgba(0, 0, 0, 0.24), 0 0 0 1px rgba(255, 255, 255, 0.14)",
                    "0 26px 54px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(255, 255, 255, 0.16)",
                    "0 18px 42px rgba(0, 0, 0, 0.24), 0 0 0 1px rgba(255, 255, 255, 0.14)",
                  ],
                }
          }
          transition={
            reducedMotion
              ? undefined
              : {
                  duration: 8,
                  ease: motionEase,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                }
          }
        />
      </div>
    </m.div>
  );
}
