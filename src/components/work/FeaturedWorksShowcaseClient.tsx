"use client";

import Link from "next/link";

import { Column, Heading, Icon, Media, Row, SmartLink, Tag, Text } from "@once-ui-system/core";
import { m, useReducedMotion } from "framer-motion";

import {
  createRevealVariants,
  createStaggerContainer,
  getHoverLift,
  getTapPress,
  motionViewport,
  revealTransition,
} from "@/components/motion/motionTokens";

import styles from "./FeaturedWorksShowcase.module.scss";

type ShowcaseProject = {
  slug: string;
  title: string;
  summary: string;
  objective: string;
  category?: string;
  kind?: string;
  stack: string[];
  image?: string;
};

type FeaturedWorksShowcaseClientProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  workHref: string;
  mainProject: ShowcaseProject;
  sideProjects: ShowcaseProject[];
};

export function FeaturedWorksShowcaseClient({
  eyebrow,
  title,
  description,
  actionLabel,
  workHref,
  mainProject,
  sideProjects,
}: FeaturedWorksShowcaseClientProps) {
  const reducedMotion = useReducedMotion();
  const itemVariants = createRevealVariants(reducedMotion, 24, 0.992);

  return (
    <m.section
      className={styles.section}
      aria-labelledby="featured-works-heading"
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={createStaggerContainer(reducedMotion, 0.1, 0.04)}
    >
      <m.div variants={itemVariants}>
        <Row className={styles.header} fillWidth horizontal="between" s={{ direction: "column" }}>
          <Column className={styles.copy} gap="8">
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              {eyebrow}
            </Tag>
            <Heading id="featured-works-heading" as="h2" variant="display-strong-s">
              {title}
            </Heading>
            <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
              {description}
            </Text>
          </Column>

          <div className={styles.headerActions}>
            <SmartLink
              href={workHref}
              suffixIcon="arrowRight"
              data-analytics-event="cta_click"
              data-analytics-label={actionLabel}
              data-analytics-location="home_featured_header"
              data-analytics-type="primary"
            >
              {actionLabel}
            </SmartLink>
          </div>
        </Row>
      </m.div>

      <div className={styles.layout}>
        <m.div
          variants={itemVariants}
          transition={reducedMotion ? { duration: 0.01 } : revealTransition}
          whileHover={getHoverLift(reducedMotion, -4, 1.004)}
          whileTap={getTapPress(reducedMotion)}
        >
          <Link
            className={styles.mainCard}
            href={`/work/${mainProject.slug}`}
            data-analytics-event="project_click"
            data-analytics-label={mainProject.title}
            data-analytics-category={mainProject.category}
            data-analytics-location="home_featured_main"
          >
            {mainProject.image && (
              <div className={styles.mainMedia}>
                <Media
                  priority
                  src={mainProject.image}
                  alt={mainProject.title}
                  aspectRatio="16 / 10"
                  sizes="(max-width: 900px) 100vw, 780px"
                />
              </div>
            )}

            <Column className={styles.mainContent} gap="16">
              <Row className={styles.metaRow} wrap gap="8">
                {mainProject.category && (
                  <Tag size="s" background="neutral-alpha-weak">
                    {mainProject.category}
                  </Tag>
                )}
                {mainProject.kind && (
                  <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                    {mainProject.kind}
                  </Tag>
                )}
                {mainProject.stack.map((item) => (
                  <Tag key={`${mainProject.slug}-${item}`} size="s" background="neutral-alpha-weak">
                    {item}
                  </Tag>
                ))}
              </Row>

              <Column gap="12">
                <Heading className={styles.title} as="h3" variant="display-strong-s" wrap="balance">
                  {mainProject.title}
                </Heading>
                <Text className={styles.result} variant="heading-default-m" wrap="balance">
                  {mainProject.objective}
                </Text>
                <Text className={styles.mainDescription} onBackground="neutral-weak" wrap="balance">
                  {mainProject.summary}
                </Text>
              </Column>

              <Row className={styles.cardHint} gap="8" vertical="center">
                <Text variant="label-default-s">Ver projeto</Text>
                <Icon name="arrowRight" size="xs" />
              </Row>
            </Column>
          </Link>
        </m.div>

        <m.div className={styles.sideColumn} variants={createStaggerContainer(reducedMotion, 0.08)}>
          {sideProjects.map((project) => (
            <m.div
              key={project.slug}
              variants={createRevealVariants(reducedMotion, 18, 0.994)}
              transition={reducedMotion ? { duration: 0.01 } : revealTransition}
              whileHover={getHoverLift(reducedMotion, -4, 1.006)}
              whileTap={getTapPress(reducedMotion)}
            >
              <Link
                className={styles.sideCard}
                href={`/work/${project.slug}`}
                data-analytics-event="project_click"
                data-analytics-label={project.title}
                data-analytics-category={project.category}
                data-analytics-location="home_featured_side"
              >
                {project.image && (
                  <div className={styles.sideMedia}>
                    <Media
                      src={project.image}
                      alt={project.title}
                      aspectRatio="5 / 4"
                      sizes="(max-width: 900px) 100vw, 240px"
                    />
                  </div>
                )}

                <Column className={styles.sideContent} gap="12">
                  <Row className={styles.metaRow} wrap gap="8">
                    {project.category && (
                      <Tag size="s" background="neutral-alpha-weak">
                        {project.category}
                      </Tag>
                    )}
                    {project.kind && (
                      <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                        {project.kind}
                      </Tag>
                    )}
                  </Row>

                  <Column gap="8">
                    <Heading as="h3" variant="heading-strong-m" wrap="balance">
                      {project.title}
                    </Heading>
                    <Text className={styles.sideResult} variant="body-default-m">
                      {project.objective}
                    </Text>
                    <Text className={styles.summary} onBackground="neutral-weak" variant="body-default-s">
                      {project.summary}
                    </Text>
                  </Column>

                  {project.stack.length > 0 && (
                    <Row className={styles.stackRow} wrap gap="8">
                      {project.stack.map((item) => (
                        <Tag key={`${project.slug}-${item}`} size="s" background="neutral-alpha-weak">
                          {item}
                        </Tag>
                      ))}
                    </Row>
                  )}

                  <Row className={styles.cardHint} gap="8" vertical="center">
                    <Text variant="label-default-s">Ver projeto</Text>
                    <Icon name="arrowRight" size="xs" />
                  </Row>
                </Column>
              </Link>
            </m.div>
          ))}
        </m.div>
      </div>
    </m.section>
  );
}
