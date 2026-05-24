"use client";

import { Heading, Text } from "@once-ui-system/core";
import { m, useReducedMotion } from "framer-motion";

import { CTAButton } from "@/components/CTAButton";
import {
  createRevealVariants,
  createStaggerContainer,
  motionViewport,
} from "@/components/motion/motionTokens";
import { social } from "@/resources";

import styles from "./FinalCTA.module.scss";

type FinalCTAProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
};

export function FinalCTA({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryHref,
}: FinalCTAProps) {
  const reducedMotion = useReducedMotion();

  const whatsappHref =
    social.find((item) => item.name === "WhatsApp")?.link ?? "https://wa.me/5575983675164";

  const itemVariants = createRevealVariants(reducedMotion, 22, 0.99);

  return (
    <m.section
      className={styles.root}
      aria-labelledby="final-cta-title"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={createStaggerContainer(reducedMotion, 0.1, 0.04)}
    >
      <m.div className={styles.copy} variants={itemVariants}>
        <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
          {eyebrow}
        </Text>

        <Heading
          id="final-cta-title"
          as="h2"
          className={styles.title}
          variant="display-strong-s"
          wrap="balance"
        >
          {title}
        </Heading>

        <Text
          className={styles.description}
          onBackground="neutral-weak"
          variant="body-default-l"
        >
          {description}
        </Text>
      </m.div>

      <m.div className={styles.actions} variants={createStaggerContainer(reducedMotion, 0.08)}>
        <m.div className={styles.actionItem} variants={itemVariants}>
          <CTAButton
            href={primaryHref}
            prefixIcon="chart"
            data-analytics-event="cta_click"
            data-analytics-label={primaryLabel}
            data-analytics-location="home_final_cta"
            data-analytics-type="primary"
          >
            {primaryLabel}
          </CTAButton>
        </m.div>

        <m.div className={styles.actionItem} variants={itemVariants}>
          <CTAButton
            href={whatsappHref}
            variant="secondary"
            prefixIcon="whatsapp"
            data-analytics-event="cta_click"
            data-analytics-label="WhatsApp"
            data-analytics-location="home_final_cta"
            data-analytics-type="secondary"
          >
            WhatsApp
          </CTAButton>
        </m.div>
      </m.div>
    </m.section>
  );
}
