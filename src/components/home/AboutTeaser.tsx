"use client";

import { Heading, SmartLink, Text } from "@once-ui-system/core";
import { m, useReducedMotion } from "framer-motion";

import {
  createRevealVariants,
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
  "Trabalho unindo estética, tecnologia e visão comercial com critério humano e leitura de negócio.";

const editorialStatement = "Estudante do Bacharelado em Ciência e Tecnologia.";
const editorialDetail =
  "Me especializando em automação e softwares aplicados a empresas e serviços.";

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
        aria-label="Resumo pessoal"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={createRevealVariants(reducedMotion, 24, 0.99)}
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
        <div className={styles.visualContent}>
          <span className={styles.square} aria-hidden="true" />
          <Text className={styles.visualLabel} variant="label-default-s" onBackground="neutral-weak">
            Sobre mim
          </Text>
          <Heading as="p" className={styles.statement} variant="heading-strong-l" wrap="balance">
            {editorialStatement}
          </Heading>
          <Text className={styles.detail} onBackground="neutral-weak" variant="body-default-m">
            {editorialDetail}
          </Text>
        </div>
      </m.aside>
    </div>
  );
}
