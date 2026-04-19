"use client";

import { Heading, SmartLink, Text } from "@once-ui-system/core";
import { m, useReducedMotion } from "framer-motion";

import { BrandSignature } from "@/components/BrandSignature";
import {
  createOffsetRevealVariants,
  createRevealVariants,
  getLoopTransition,
  motionViewport,
  revealTransition,
  sectionTransition,
} from "@/components/motion/motionTokens";

import styles from "./AboutTeaser.module.scss";

type AboutTeaserProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

const supportLine =
  "Trabalho unindo estetica, tecnologia e visao comercial com criterio humano e leitura de negocio.";

const editorialStatement = "Clareza construida por alguem real.";
const editorialDetail =
  "Nao e producao automatica. E pensamento, criterio e execucao alinhados do inicio ao fim.";

export function AboutTeaser({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: AboutTeaserProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={styles.root}>
      <m.div
        className={styles.copy}
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={createRevealVariants(reducedMotion, 24, 0.99)}
        transition={
          reducedMotion
            ? {
                duration: 0.01,
              }
            : revealTransition
        }
      >
        <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
          {eyebrow}
        </Text>
        <Heading as="h2" className={styles.title} variant="display-strong-s" wrap="balance">
          {title}
        </Heading>
        <Text className={styles.description} onBackground="neutral-weak" variant="heading-default-m">
          {description}
        </Text>
        <Text className={styles.support} onBackground="neutral-weak" variant="body-default-m">
          {supportLine}
        </Text>

        <div className={styles.action}>
          <SmartLink
            href={ctaHref}
            suffixIcon="arrowRight"
            data-analytics-event="cta_click"
            data-analytics-label={ctaLabel}
            data-analytics-location="home_about_teaser"
            data-analytics-type="secondary"
          >
            {ctaLabel}
          </SmartLink>
        </div>
      </m.div>

      <m.aside
        className={styles.visualPanel}
        aria-label="Assinatura editorial da marca"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={createOffsetRevealVariants(reducedMotion, 28)}
        transition={
          reducedMotion
            ? {
                duration: 0.01,
              }
            : {
                ...sectionTransition,
                delay: 0.06,
              }
        }
      >
        <m.span
          className={styles.grid}
          aria-hidden="true"
          animate={reducedMotion ? undefined : { opacity: [0.2, 0.34, 0.24] }}
          transition={reducedMotion ? undefined : getLoopTransition(9)}
        />
        <m.span
          className={styles.frame}
          aria-hidden="true"
          animate={reducedMotion ? undefined : { opacity: [0.72, 0.94, 0.8] }}
          transition={reducedMotion ? undefined : getLoopTransition(10, 0.1)}
        />
        <m.span
          className={styles.square}
          aria-hidden="true"
          animate={
            reducedMotion
              ? undefined
              : {
                  y: [0, -8, 0],
                  scale: [1, 1.02, 1],
                  rotate: [0, 1.2, 0],
                }
          }
          transition={reducedMotion ? undefined : getLoopTransition(7.5)}
        />
        <m.span
          className={styles.glow}
          aria-hidden="true"
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: [0.38, 0.62, 0.44],
                  scale: [0.96, 1.04, 0.98],
                }
          }
          transition={reducedMotion ? undefined : getLoopTransition(6.5)}
        />

        <div className={styles.visualContent}>
          <Text className={styles.visualLabel} variant="label-default-s" onBackground="neutral-weak">
            Henrique Reis
          </Text>
          <Heading as="p" className={styles.statement} variant="heading-strong-l" wrap="balance">
            {editorialStatement}
          </Heading>
          <Text className={styles.detail} onBackground="neutral-weak" variant="body-default-m">
            {editorialDetail}
          </Text>

          <BrandSignature
            className={styles.signature}
            descriptor="Estrategia, design e sistemas com criterio humano"
          />
        </div>
      </m.aside>
    </div>
  );
}
