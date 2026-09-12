"use client";

import Link from "next/link";

import { Heading, Icon, Media, Row, Tag, Text } from "@once-ui-system/core";
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

  const visibleStack = stack.slice(0, featured ? 3 : 2);
  const hiddenStackCount = Math.max(stack.length - visibleStack.length, 0);

  return (
    <m.article
      className={styles.root}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={createRevealVariants(
        reducedMotion,
        featured ? 24 : 18,
        0.992,
      )}
      transition={reducedMotion ? { duration: 0.01 } : revealTransition}
      whileHover={getHoverLift(
        reducedMotion,
        -4,
        featured ? 1.006 : 1.004,
      )}
      whileTap={getTapPress(reducedMotion)}
      data-featured={featured ? "true" : "false"}
    >
      <Link
        className={styles.link}
        href={href}
        aria-label={`Ver projeto: ${title}`}
        data-analytics-event="project_click"
        data-analytics-label={title}
        data-analytics-category={kind}
        data-analytics-location={
          featured ? "featured_project_card" : "project_card"
        }
      >
        {image ? (
          <div className={styles.mediaWrap}>
            <Media
              border="transparent"
              radius="l"
              src={image}
              alt={`Preview do projeto ${title}`}
              aspectRatio="16 / 10"
              sizes={
                featured
                  ? "(max-width: 768px) 100vw, 720px"
                  : "(max-width: 768px) 100vw, 520px"
              }
            />
          </div>
        ) : (
          <div className={styles.accentLine} aria-hidden="true" />
        )}

        <div className={styles.content}>
          {(kind || visibleStack.length > 0) && (
            <Row className={styles.meta} gap="8" wrap>
              {kind && (
                <Text
                  className={styles.kind}
                  variant="label-default-xs"
                  onBackground="neutral-weak"
                >
                  {kind}
                </Text>
              )}

              {visibleStack.map((item) => (
                <Tag
                  key={`${title}-${item}`}
                  size="s"
                  background="neutral-alpha-weak"
                >
                  {item}
                </Tag>
              ))}

              {hiddenStackCount > 0 && (
                <Text
                  className={styles.more}
                  variant="label-default-xs"
                  onBackground="neutral-weak"
                >
                  +{hiddenStackCount}
                </Text>
              )}
            </Row>
          )}

          <div className={styles.copy}>
            <Heading
              as="h3"
              className={styles.title}
              variant={
                featured
                  ? "display-strong-s"
                  : "heading-strong-xl"
              }
              wrap="balance"
            >
              {title}
            </Heading>

            <Text
              className={styles.summary}
              onBackground="neutral-weak"
              variant="body-default-m"
            >
              {summary}
            </Text>
          </div>

          <div className={styles.cta}>
            <Text variant="label-default-s">
              Ver projeto
            </Text>

            <Icon
              className={styles.ctaIcon}
              name="arrowRight"
              size="xs"
            />
          </div>
        </div>
      </Link>
    </m.article>
  );
}