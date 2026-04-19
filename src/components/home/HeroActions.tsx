"use client";

import { Row } from "@once-ui-system/core";
import { m, useReducedMotion } from "framer-motion";

import { CTAButton } from "@/components/CTAButton";
import {
  createRevealVariants,
  createStaggerContainer,
} from "@/components/motion/motionTokens";

import styles from "./HeroActions.module.scss";

type HeroActionsProps = {
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function HeroActions({
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: HeroActionsProps) {
  const reducedMotion = useReducedMotion();
  const itemVariants = createRevealVariants(reducedMotion, 18, 0.992);

  return (
    <m.div
      initial="hidden"
      animate="visible"
      variants={createStaggerContainer(reducedMotion, 0.08, 0.2)}
    >
      <Row className={styles.actions} gap="12" wrap>
        <m.div variants={itemVariants}>
          <CTAButton
            href={primaryHref}
            prefixIcon="calendar"
            data-analytics-event="cta_click"
            data-analytics-label={primaryLabel}
            data-analytics-location="home_hero"
            data-analytics-type="primary"
          >
            {primaryLabel}
          </CTAButton>
        </m.div>
        {secondaryLabel && secondaryHref && (
          <m.div variants={itemVariants}>
            <CTAButton
              href={secondaryHref}
              variant="secondary"
              arrowIcon
              data-analytics-event="cta_click"
              data-analytics-label={secondaryLabel}
              data-analytics-location="home_hero"
              data-analytics-type="secondary"
            >
              {secondaryLabel}
            </CTAButton>
          </m.div>
        )}
      </Row>
    </m.div>
  );
}
