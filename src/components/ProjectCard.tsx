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

interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  kind?: string;
  stack?: string[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  description,
  avatars,
  link,
  kind,
  stack = [],
}) => {
  return (
    <Column className={styles.root} fillWidth gap="m">
      <div className={styles.mediaShell}>
        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((image) => ({
            slide: image,
            alt: title,
          }))}
        />
      </div>
      <Flex
        className={styles.contentShell}
        s={{ direction: "column" }}
        fillWidth
        paddingX="20"
        paddingTop="20"
        paddingBottom="24"
        gap="20"
      >
        {title && (
          <Flex className={styles.titleBlock} flex={5}>
            <Column gap="12">
              {(kind || stack.length > 0) && (
                <Row wrap gap="8">
                  {kind && (
                    <Tag className={styles.kindTag} size="s" background="brand-alpha-weak" onBackground="brand-strong">
                      {kind}
                    </Tag>
                  )}
                  {stack.slice(0, 3).map((item) => (
                    <Tag key={`${title}-${item}`} size="s" background="neutral-alpha-weak">
                      {item}
                    </Tag>
                  ))}
                </Row>
              )}
              <Heading className={styles.title} as="h2" wrap="balance" variant="heading-strong-xl">
                {title}
              </Heading>
            </Column>
          </Flex>
        )}
        {(avatars?.length > 0 || description?.trim() || href || link) && (
          <Column className={styles.metaBlock} flex={7} gap="16">
            {avatars?.length > 0 && (
              <div className={styles.avatars}>
                <AvatarGroup avatars={avatars} size="m" reverse />
              </div>
            )}
            {description?.trim() && (
              <Text className={styles.description} wrap="balance" variant="body-default-s" onBackground="neutral-weak">
                {description}
              </Text>
            )}
            <Flex className={styles.actions} gap="20" wrap>
              {href && (
                <SmartLink className={styles.actionLink} suffixIcon="arrowRight" href={href}>
                  Ler estudo de caso
                </SmartLink>
              )}
              {link && (
                <SmartLink className={styles.actionLink} suffixIcon="arrowUpRightFromSquare" href={link}>
                  Ver projeto
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
