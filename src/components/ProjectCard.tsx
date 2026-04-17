"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  Row,
  SmartLink,
  Tag,
  Text,
} from "@once-ui-system/core";

import styles from "./ProjectCard.module.scss";

type ProjectCardVariant = "default" | "feature" | "compact";
type ProjectKind = "personal" | "study" | "client";

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  description: string;
  avatars: { src: string }[];
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
  description,
  avatars,
  link,
  kind,
  kindValue,
  stack = [],
  variant = "default",
}) => {
  const hasMedia = images.length > 0;
  const primaryActionLabel =
    kindValue === "study" ? "Abrir estudo" : kindValue === "client" ? "Ver case" : "Abrir projeto";

  return (
    <article className={styles.root} data-variant={variant} data-kind={kindValue ?? "project"}>
      <div
        className={styles.card}
        data-has-media={hasMedia ? "true" : "false"}
        data-variant={variant}
      >
        {hasMedia && (
          <div className={styles.mediaShell}>
            <Carousel
              sizes={
                variant === "compact"
                  ? "(max-width: 768px) 100vw, 360px"
                  : "(max-width: 960px) 100vw, 960px"
              }
              items={images.map((image) => ({
                slide: image,
                alt: title,
              }))}
            />
          </div>
        )}

        <Flex className={styles.contentShell} s={{ direction: "column" }} fillWidth gap="16">
          {title && (
            <Column className={styles.titleBlock} gap="12">
              {(kind || stack.length > 0) && (
                <Row className={styles.tagsRow} wrap gap="8">
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
                  {stack.slice(0, variant === "compact" ? 2 : 3).map((item) => (
                    <Tag key={`${title}-${item}`} size="s" background="neutral-alpha-weak">
                      {item}
                    </Tag>
                  ))}
                </Row>
              )}
              <Heading
                className={styles.title}
                as="h2"
                wrap="balance"
                variant={variant === "compact" ? "heading-strong-l" : "heading-strong-xl"}
              >
                {title}
              </Heading>
            </Column>
          )}

          {(avatars?.length > 0 || description?.trim() || href || link) && (
            <Column className={styles.metaBlock} gap="16">
              {avatars?.length > 0 && variant !== "compact" && (
                <div className={styles.avatars}>
                  <AvatarGroup avatars={avatars} size="m" reverse />
                </div>
              )}
              {description?.trim() && (
                <Text
                  className={styles.description}
                  wrap="balance"
                  variant="body-default-s"
                  onBackground="neutral-weak"
                >
                  {description}
                </Text>
              )}
              <Flex className={styles.actions} gap="20" wrap>
                {href && (
                  <SmartLink className={styles.actionLink} suffixIcon="arrowRight" href={href}>
                    {primaryActionLabel}
                  </SmartLink>
                )}
                {link && (
                  <SmartLink
                    className={styles.actionLink}
                    suffixIcon="arrowUpRightFromSquare"
                    href={link}
                  >
                    Ver projeto
                  </SmartLink>
                )}
              </Flex>
            </Column>
          )}
        </Flex>
      </div>
    </article>
  );
};
