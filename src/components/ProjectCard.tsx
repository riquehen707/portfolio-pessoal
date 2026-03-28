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
        paddingX="s"
        paddingTop="12"
        paddingBottom="24"
        gap="l"
      >
        {title && (
          <Flex className={styles.titleBlock} flex={5}>
            <Column gap="12">
              {kind && (
                <Row wrap gap="8">
                  <Tag className={styles.kindTag} size="s" background="brand-alpha-weak" onBackground="brand-strong">
                    {kind}
                  </Tag>
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
              <Text
                className={styles.description}
                wrap="balance"
                variant="body-default-s"
                onBackground="neutral-weak"
              >
                {description}
              </Text>
            )}
            <Flex className={styles.actions} gap="24" wrap>
              {href && (
                <SmartLink
                  suffixIcon="arrowRight"
                  className={styles.actionLink}
                  href={href}
                >
                  <Text variant="body-default-s">Ler estudo de caso</Text>
                </SmartLink>
              )}
              {link && (
                <SmartLink
                  suffixIcon="arrowUpRightFromSquare"
                  className={styles.actionLink}
                  href={link}
                >
                  <Text variant="body-default-s">Ver projeto online</Text>
                </SmartLink>
              )}
            </Flex>
          </Column>
        )}
      </Flex>
    </Column>
  );
};
