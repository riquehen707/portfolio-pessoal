"use client";

import { m, useReducedMotion } from "framer-motion";

import { getLoopTransition, motionEase, sectionTransition } from "@/components/motion/motionTokens";

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
      <svg className={styles.scene} viewBox="0 0 760 760" role="img" focusable="false">
        <title>UFO abduzindo um gato em estilo doodle</title>
        <g className={styles.noiseIcons}>
          <path d="M74 382c22-28 44 26 68-2" />
          <path d="M615 328c19-21 40 17 58-4" />
          <path d="M606 479c16-12 31 11 47 0" />
          <path d="M126 515l9 16 16 6-16 7-9 15-8-15-16-7 16-6z" />
          <path d="M666 150l6 10 11 4-11 4-6 10-5-10-11-4 11-4z" />
          <path d="M165 255l5 8 9 3-9 4-5 8-5-8-8-4 8-3z" />
          <path d="M650 574l7 12 12 4-12 5-7 12-6-12-12-5 12-4z" />
          <circle cx="86" cy="198" r="3" />
          <circle cx="142" cy="146" r="3" />
          <circle cx="704" cy="262" r="2.5" />
          <circle cx="612" cy="650" r="2.5" />
          <circle cx="215" cy="618" r="2.5" />
          <circle cx="52" cy="630" r="2.5" />
          <path d="M122 449l35 0 0 37-35 0z" />
          <path d="M132 449l3-16 10 0 3 16" />
          <path d="M153 463l16 8-16 8z" />
          <path d="M625 420l43 9-9 43-43-9z" />
          <path d="M635 448l22-11-5 25z" />
          <path d="M570 550c13-19 55-13 61 13 8 35-36 51-63 29l-18 4 8-17c-5-9-1-20 12-29z" />
          <path d="M581 568l12 14 23-27" />
          <path d="M90 323c13-16 48-13 55 9 7 24-24 39-46 24l-16 4 7-14c-5-7-5-16 0-23z" />
          <path d="M106 331c7-16 30 0 11 16-17-14-21-19-11-16z" />
          <path d="M170 408c-8-18 6-41 27-41s35 22 28 40c-5 14-28 43-28 43s-21-28-27-42z" />
          <circle cx="197" cy="397" r="9" />
        </g>

        <m.g
          animate={reducedMotion ? undefined : { y: [0, -10, 0], rotate: [-1.2, 1.2, -1.2] }}
          transition={reducedMotion ? undefined : { ...getLoopTransition(8), ease: motionEase }}
          className={styles.ufo}
        >
          <path d="M330 214c31-76 141-96 202-48 32 25 47 65 39 103" />
          <path d="M347 207c36-43 122-56 170-15 24 20 35 47 33 76" />
          <path d="M260 266c57-45 231-57 357-18 80 25 109 62 83 93-32 38-184 44-321 12-112-27-178-66-119-87z" />
          <path d="M272 270c76 37 208 58 340 49 36-3 71-9 96-19" />
          <path d="M305 246c63 33 179 51 283 43" />
          <path d="M370 225c40 23 113 34 183 29" />
          <path d="M407 160l-21-68 25-8 21 69" />
          <circle cx="397" cy="80" r="18" />
          <path d="M555 180l47-56 21 17-47 56" />
          <circle cx="635" cy="121" r="18" />
          <path d="M421 210c14-38 80-48 111-12 15 17 21 43 13 68" />
          <path d="M455 202c-27 29-28 55-3 78" />
          <ellipse cx="477" cy="217" rx="13" ry="23" />
          <ellipse cx="513" cy="221" rx="13" ry="24" />
        </m.g>

        <m.g
          className={styles.beam}
          animate={reducedMotion ? undefined : { opacity: [0.6, 0.95, 0.7] }}
          transition={reducedMotion ? undefined : getLoopTransition(5.8)}
        >
          <path d="M400 330 235 692c114 35 229 36 342 2L524 331z" />
          <path d="M405 333 278 680" />
          <path d="M431 337 339 693" />
          <path d="M458 340 407 700" />
          <path d="M484 338 481 693" />
          <path d="M510 336 548 684" />
          <path d="M379 345 250 657" />
          <path d="M532 351 579 665" />
          <ellipse cx="407" cy="696" rx="171" ry="28" />
          <ellipse cx="407" cy="696" rx="126" ry="18" />
          <ellipse cx="407" cy="696" rx="86" ry="10" />
        </m.g>

        <m.g
          className={styles.cat}
          animate={reducedMotion ? undefined : { y: [0, -14, 0], rotate: [4, -4, 4] }}
          transition={reducedMotion ? undefined : getLoopTransition(4.8, 0.2)}
        >
          <path d="M355 511c-20-34 10-75 61-70 48 5 74 42 58 75-15 31-95 37-119-5z" />
          <path d="M364 459l-26-42 48 20" />
          <path d="M433 444l40-36 2 55" />
          <circle cx="386" cy="483" r="20" />
          <circle cx="431" cy="487" r="20" />
          <circle cx="386" cy="483" r="8" />
          <circle cx="431" cy="487" r="8" />
          <path d="M410 509l-9 10 15 2z" />
          <path d="M344 498l-50-13" />
          <path d="M345 513l-54 10" />
          <path d="M469 501l55-19" />
          <path d="M470 517l50 17" />
          <path d="M359 530l-24 48" />
          <circle cx="330" cy="590" r="13" />
          <path d="M403 538l-6 58" />
          <circle cx="397" cy="609" r="13" />
          <path d="M443 532l35 47" />
          <circle cx="487" cy="590" r="13" />
          <path d="M478 498c39-10 52-37 35-64 39 20 24 83-31 88" />
        </m.g>
      </svg>
    </m.div>
  );
}
