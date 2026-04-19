"use client";

import Link from "next/link";

import { Heading, Media, Row, Tag, Text } from "@once-ui-system/core";
import { m, useReducedMotion } from "framer-motion";

import {
  createRevealVariants,
  getHoverLift,
  getTapPress,
  motionViewport,
  revealTransition,
} from "@/components/motion/motionTokens";
import styles from "./WorkCard.module.scss";

type WorkCardProps = {
  href: string;
  title: string;
  summary: string;
  kind?: string;
  stack?: string[];
  image?: string;
  featured?: boolean;
};

export function WorkCard({
  href,
  title,
  summary,
  kind,
  stack = [],
  image,
  featured = false,
}: WorkCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <m.article
      className={styles.root}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={createRevealVariants(reducedMotion, featured ? 24 : 18, 0.992)}
      transition={reducedMotion ? { duration: 0.01 } : revealTransition}
      whileHover={getHoverLift(reducedMotion, -4, featured ? 1.006 : 1.005)}
      whileTap={getTapPress(reducedMotion)}
    >
      <Link
        className={styles.link}
        href={href}
        data-featured={featured ? "true" : "false"}
        data-analytics-event="project_click"
        data-analytics-label={title}
        data-analytics-category={kind}
        data-analytics-location={featured ? "featured_project_card" : "project_card"}
      >
        {image ? (
          <div className={styles.mediaWrap}>
            <Media
              border="transparent"
              radius="l"
              src={image}
              alt={`Preview de ${title}`}
              aspectRatio="16 / 10"
              sizes={featured ? "(max-width: 768px) 100vw, 720px" : "(max-width: 768px) 100vw, 520px"}
            />
          </div>
        ) : (
          <div className={styles.accentLine} aria-hidden="true" />
        )}

        <div className={styles.content}>
          {(kind || stack.length > 0) && (
            <Row className={styles.meta} gap="8" wrap>
              {kind && (
                <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                  {kind}
                </Tag>
              )}
              {stack.slice(0, featured ? 4 : 3).map((item) => (
                <Tag key={`${title}-${item}`} size="s" background="neutral-alpha-weak">
                  {item}
                </Tag>
              ))}
            </Row>
          )}

          <div className={styles.copy}>
            <Heading as="h3" className={styles.title} variant={featured ? "display-strong-s" : "heading-strong-xl"} wrap="balance">
              {title}
            </Heading>
            <Text className={styles.summary} onBackground="neutral-weak" variant="body-default-m">
              {summary}
            </Text>
          </div>

          <Text className={styles.cta} variant="label-default-s" onBackground="neutral-weak">
            Abrir case
          </Text>
        </div>
      </Link>
    </m.article>
  );
}
