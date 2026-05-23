"use client";

import { Heading, SmartLink, Text } from "@once-ui-system/core";
import { m, useReducedMotion } from "framer-motion";

import { AvatarSticker } from "@/components/avatar/AvatarSticker";
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
  "Combino leitura de negócio, direção visual e implementação técnica para criar estruturas digitais mais claras, úteis e sustentáveis.";

const editorialStatement = "Estética com critério. Tecnologia com intenção.";

const editorialDetail =
  "Minha formação em Ciência e Tecnologia sustenta uma abordagem prática: entender o problema, organizar a mensagem e construir soluções que façam sentido para o negócio.";

export function AboutTeaser({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
}: AboutTeaserProps) {
  const reducedMotion = useReducedMotion();

  const copyVariants = createRevealVariants(reducedMotion, 24, 0.99);
  const panelVariants = createRevealVariants(reducedMotion, 20, 0.99);

  return (
    <section className={styles.root} aria-labelledby="about-teaser-title">
      <m.div
        className={styles.copy}
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={copyVariants}
        transition={reducedMotion ? { duration: 0.01 } : revealTransition}
      >
        <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
          {eyebrow}
        </Text>

        <Heading
          id="about-teaser-title"
          as="h2"
          className={styles.title}
          variant="display-strong-s"
          wrap="balance"
        >
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
        aria-label="Resumo da abordagem"
        initial="hidden"
        whileInView="visible"
        viewport={motionViewport}
        variants={panelVariants}
        transition={
          reducedMotion
            ? { duration: 0.01 }
            : {
                ...sectionTransition,
                delay: 0.06,
              }
        }
      >
        <div className={styles.visualContent}>
          <div className={styles.avatarWrap} aria-hidden="true">
            <AvatarSticker expression="focused" size="lg" />
          </div>

          <Text className={styles.visualLabel} variant="label-default-s" onBackground="neutral-weak">
            Como penso o trabalho
          </Text>

          <Heading as="p" className={styles.statement} variant="heading-strong-l" wrap="balance">
            {editorialStatement}
          </Heading>

          <Text className={styles.detail} onBackground="neutral-weak" variant="body-default-m">
            {editorialDetail}
          </Text>
        </div>
      </m.aside>
    </section>
  );
}