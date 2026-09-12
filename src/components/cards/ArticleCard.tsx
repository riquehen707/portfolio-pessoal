"use client";

import Link from "next/link";

import {
  Heading,
  Icon,
  Row,
  Tag,
  Text,
} from "@once-ui-system/core";
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

  const hasSummary = Boolean(summary?.trim());

  return (
    <m.article
      className={styles.root}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={createRevealVariants(
        reducedMotion,
        18,
        0.994,
      )}
      transition={
        reducedMotion
          ? { duration: 0.01 }
          : revealTransition
      }
      whileHover={getHoverLift(
        reducedMotion,
        -3,
        1.004,
      )}
      whileTap={getTapPress(reducedMotion)}
    >
      <Link
        className={styles.link}
        href={href}
        aria-label={`Ler artigo: ${title}`}
        data-analytics-event="article_click"
        data-analytics-label={title}
        data-analytics-category={category}
        data-analytics-location="home_blog"
      >
        <div className={styles.content}>
          <Row
            className={styles.meta}
            gap="8"
            wrap
          >
            {category && (
              <Tag
                size="s"
                background="neutral-alpha-weak"
              >
                {category}
              </Tag>
            )}

            {publishedAt && (
              <Text
                variant="body-default-xs"
                onBackground="neutral-weak"
              >
                {formatDate(publishedAt, false)}
              </Text>
            )}

            {readingTime ? (
              <Text
                variant="body-default-xs"
                onBackground="neutral-weak"
              >
                {readingTime} min de leitura
              </Text>
            ) : null}
          </Row>

          <div className={styles.copy}>
            <Heading
              as="h3"
              className={styles.title}
              variant="heading-strong-l"
              wrap="balance"
            >
              {title}
            </Heading>

            {hasSummary && (
              <Text
                className={styles.summary}
                onBackground="neutral-weak"
                variant="body-default-m"
              >
                {summary}
              </Text>
            )}
          </div>

          <div className={styles.cta}>
            <Text variant="label-default-s">
              Ler artigo
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