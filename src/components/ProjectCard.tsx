"use client";

import { Carousel, Column, Heading, Row, SmartLink, Tag, Text } from "@once-ui-system/core";

import styles from "./ProjectCard.module.scss";

type ProjectCardVariant = "default" | "feature" | "compact";
type ProjectKind = "personal" | "study" | "client";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  objective?: string;
  description: string;
  link: string;
  kind?: string;
  kindValue?: ProjectKind;
  stack?: string[];
  variant?: ProjectCardVariant;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  objective,
  description,
  link,
  kind,
  kindValue,
  stack = [],
  variant = "default",
}) => {
  const hasMedia = images.length > 0;
  const condensedStack = stack.slice(0, variant === "feature" ? 4 : 3);

  return (
    <article className={styles.root} data-variant={variant} data-kind={kindValue ?? "project"}>
      <div className={styles.card} data-has-media={hasMedia ? "true" : "false"} data-variant={variant}>
        {hasMedia && (
          <div className={styles.mediaShell}>
            {kind && <div className={styles.mediaBadge}>{kind}</div>}
            <Carousel
              sizes={
                variant === "compact"
                  ? "(max-width: 768px) 100vw, 540px"
                  : "(max-width: 960px) 100vw, 960px"
              }
              items={images.map((image) => ({
                slide: image,
                alt: title,
              }))}
            />
          </div>
        )}

        <Column className={styles.contentShell} fillWidth gap="16">
          <div className={styles.metaBlock}>
            {kind && (
              <Tag
                className={styles.kindTag}
                size="s"
                background="brand-alpha-weak"
                onBackground="brand-strong"
              >
                {kind}
              </Tag>
            )}

            {condensedStack.length > 0 && (
              <div className={styles.stackInline} aria-label="Stack principal">
                {condensedStack.map((item) => (
                  <span className={styles.stackInlineItem} key={`${title}-${item}`}>
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>

          <Column className={styles.copyBlock} fillWidth gap="8">
            <Heading
              className={styles.title}
              as="h2"
              wrap="balance"
              variant={variant === "feature" ? "display-strong-s" : "heading-strong-l"}
            >
              {title}
            </Heading>

            {objective?.trim() && (
              <Text className={styles.objective} wrap="balance" variant="heading-default-m">
                {objective}
              </Text>
            )}

            {description?.trim() && (
              <Text
                className={styles.description}
                wrap="balance"
                variant={variant === "compact" ? "body-default-s" : "body-default-m"}
                onBackground="neutral-weak"
              >
                {description}
              </Text>
            )}
          </Column>

          <Row className={styles.actions} gap="16" wrap>
            {href && (
              <SmartLink
                className={styles.actionLink}
                suffixIcon="arrowRight"
                href={href}
                data-analytics-event="project_click"
                data-analytics-label={title}
                data-analytics-category={kind}
                data-analytics-location="projects_list"
              >
                Ver detalhes
              </SmartLink>
            )}
            {link && (
              <SmartLink
                className={styles.actionLink}
                suffixIcon="arrowUpRightFromSquare"
                href={link}
                data-analytics-event="outbound_project_click"
                data-analytics-label={title}
                data-analytics-location="projects_list"
              >
                Abrir projeto
              </SmartLink>
            )}
          </Row>
        </Column>
      </div>
    </article>
  );
};
