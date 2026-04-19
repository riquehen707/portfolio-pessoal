"use client";

import Link from "next/link";

import { Heading, Row, Tag, Text } from "@once-ui-system/core";
import { m, useReducedMotion } from "framer-motion";

import {
  createRevealVariants,
  getHoverLift,
  getTapPress,
  motionViewport,
  revealTransition,
} from "@/components/motion/motionTokens";
import { formatDate } from "@/utils/formatDate";

import styles from "./ArticleCard.module.scss";

type ArticleCardProps = {
  href: string;
  title: string;
  summary?: string;
  publishedAt?: string;
  category?: string;
  readingTime?: number;
};

export function ArticleCard({
  href,
  title,
  summary,
  publishedAt,
  category,
  readingTime,
}: ArticleCardProps) {
  const reducedMotion = useReducedMotion();

  return (
    <m.article
      className={styles.root}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={createRevealVariants(reducedMotion, 18, 0.994)}
      transition={reducedMotion ? { duration: 0.01 } : revealTransition}
      whileHover={getHoverLift(reducedMotion, -4, 1.006)}
      whileTap={getTapPress(reducedMotion)}
    >
      <Link
        className={styles.link}
        href={href}
        data-analytics-event="article_click"
        data-analytics-label={title}
        data-analytics-category={category}
        data-analytics-location="home_blog"
      >
        <div className={styles.content}>
          <Row className={styles.meta} gap="8" wrap>
            {publishedAt && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {formatDate(publishedAt, false)}
              </Text>
            )}
            {readingTime && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {`${readingTime} min`}
              </Text>
            )}
            {category && (
              <Tag size="s" background="neutral-alpha-weak">
                {category}
              </Tag>
            )}
          </Row>

          <Heading as="h3" className={styles.title} variant="heading-strong-l" wrap="balance">
            {title}
          </Heading>

          {summary?.trim() && (
            <Text className={styles.summary} onBackground="neutral-weak" variant="body-default-m">
              {summary}
            </Text>
          )}

          <Text className={styles.cta} variant="label-default-s" onBackground="neutral-weak">
            Ler artigo
          </Text>
        </div>
      </Link>
    </m.article>
  );
}
