"use client";

import { Row } from "@once-ui-system/core";
import { m, useReducedMotion } from "framer-motion";

import { CTAButton } from "@/components/CTAButton";
import { createRevealVariants, createStaggerContainer } from "@/components/motion/motionTokens";

import styles from "./HeroActions.module.scss";

type HeroActionsProps = {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  analyticsLocation?: string;
};

export function HeroActions({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  analyticsLocation = "home_hero",
}: HeroActionsProps) {
  const reducedMotion = useReducedMotion();

  const containerVariants = createStaggerContainer(reducedMotion, 0.07, 0.16);
  const itemVariants = createRevealVariants(reducedMotion, 14, 0.992);

  const hasSecondaryAction = Boolean(secondaryLabel && secondaryHref);

  return (
    <m.nav
      className={styles.wrapper}
      aria-label="Ações principais"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Row className={styles.actions} gap="12" wrap>
        <m.div className={styles.actionItem} variants={itemVariants}>
          <CTAButton
            className={styles.primaryButton}
            href={primaryHref}
            suffixIcon="arrowRight"
            data-analytics-event="cta_click"
            data-analytics-label={primaryLabel}
            data-analytics-location={analyticsLocation}
            data-analytics-type="primary"
          >
            {primaryLabel}
          </CTAButton>
        </m.div>

        {hasSecondaryAction && (
          <m.div className={styles.actionItem} variants={itemVariants}>
            <CTAButton
              className={styles.secondaryButton}
              href={secondaryHref}
              variant="secondary"
              prefixIcon="calendar"
              data-analytics-event="cta_click"
              data-analytics-label={secondaryLabel}
              data-analytics-location={analyticsLocation}
              data-analytics-type="secondary"
            >
              {secondaryLabel}
            </CTAButton>
          </m.div>
        )}
      </Row>
    </m.nav>
  );
}