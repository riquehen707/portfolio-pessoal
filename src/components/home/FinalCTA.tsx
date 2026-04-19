"use client";

import { Heading, Text } from "@once-ui-system/core";
import { m, useReducedMotion } from "framer-motion";

import { CTAButton } from "@/components/CTAButton";
import { ContactBriefForm } from "@/components/contact/ContactBriefForm";
import {
  createRevealVariants,
  createStaggerContainer,
  motionViewport,
  revealTransition,
} from "@/components/motion/motionTokens";
import { person, social } from "@/resources";

import styles from "./FinalCTA.module.scss";

type FinalCTAProps = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
};

const trustSignals = ["Resposta rapida", "Conversa objetiva", "Solucoes sob medida"] as const;

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
  const itemVariants = createRevealVariants(reducedMotion, 24, 0.99);

  return (
    <m.div
      className={styles.root}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={createStaggerContainer(reducedMotion, 0.1, 0.04)}
    >
      <m.div className={styles.copy} variants={itemVariants}>
        <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
          {eyebrow}
        </Text>
        <Heading as="h2" className={styles.title} variant="display-strong-s" wrap="balance">
          {title}
        </Heading>
        <Text className={styles.description} onBackground="neutral-weak" variant="heading-default-m">
          {description}
        </Text>

        <m.div className={styles.actions} variants={createStaggerContainer(reducedMotion, 0.08)}>
          <m.div variants={itemVariants}>
            <CTAButton
              href={primaryHref}
              prefixIcon="calendar"
              data-analytics-event="cta_click"
              data-analytics-label={primaryLabel}
              data-analytics-location="home_final_cta"
              data-analytics-type="primary"
            >
              {primaryLabel}
            </CTAButton>
          </m.div>
          <m.div variants={itemVariants}>
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

        <m.div className={styles.trustList} variants={createStaggerContainer(reducedMotion, 0.06)}>
          {trustSignals.map((item) => (
            <m.div
              className={styles.trustItem}
              key={item}
              variants={createRevealVariants(reducedMotion, 16, 0.995)}
              transition={reducedMotion ? { duration: 0.01 } : revealTransition}
            >
              <span className={styles.trustDot} aria-hidden="true" />
              <Text variant="body-default-s">{item}</Text>
            </m.div>
          ))}
        </m.div>
      </m.div>

      <m.div className={styles.formPanel} variants={itemVariants}>
        <div className={styles.formIntro}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Diagnostico inicial
          </Text>
          <Heading as="h3" variant="heading-strong-l" wrap="balance">
            Se preferir, envie um briefing curto e eu respondo com o proximo passo.
          </Heading>
          <Text onBackground="neutral-weak" variant="body-default-m">
            Sem compromisso inicial. Com foco real no que faz sentido para posicionamento,
            aquisicao e operacao.
          </Text>
        </div>

        <ContactBriefForm
          email={person.email}
          whatsappHref={whatsappHref}
          contextLabel="CTA final da Home"
          submitLabel="Solicitar diagnostico inicial"
          whatsappLabel="Enviar no WhatsApp"
          helperText="Agenda, WhatsApp ou briefing curto. O objetivo aqui e reduzir atrito e abrir a conversa do jeito mais claro."
        />
      </m.div>
    </m.div>
  );
}
