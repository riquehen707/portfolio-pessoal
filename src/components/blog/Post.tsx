import { Avatar, Card, Column, Media, Row, Text } from "@once-ui-system/core";

import { person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { buildOgImage } from "@/utils/og";

import styles from "./Post.module.scss";

type Direction = "row" | "column";
type PostVariant = "default" | "feature" | "compact";

interface PostFrontmatter {
  title: string;
  publishedAt: string;
  tag?: string;
  tags?: string[];
  categories?: string[];
  image?: string;
  imageAlt?: string;
}

interface PostData {
  slug: string;
  metadata: PostFrontmatter;
}

interface PostProps {
  post: PostData;
  thumbnail?: boolean;
  direction?: Direction;
  priority?: boolean;
  variant?: PostVariant;
}

export default function Post({
  post,
  thumbnail = false,
  direction = "row",
  priority = false,
  variant = "default",
}: PostProps) {
  const { slug, metadata } = post;
  const { title, publishedAt, tag, tags, categories, image, imageAlt } = metadata || {};

  const displayTag = tag || tags?.[0] || categories?.[0];
  const fallbackImage = buildOgImage(title, displayTag || "Conteudo");
  const displayImage = image && image.trim() !== "" ? image : fallbackImage;
  const resolvedDirection = variant === "feature" ? "column" : direction;
  const showThumbnail = thumbnail && variant !== "compact";

  return (
    <Card
      className={`${styles.card} ${styles[variant]}`}
      data-variant={variant}
      fillWidth
      key={slug}
      href={`/blog/${slug}`}
      transition="micro-medium"
      direction={resolvedDirection}
      border="transparent"
      background="transparent"
      padding={variant === "feature" ? "0" : "4"}
      radius="l-4"
      gap={variant === "feature" ? "0" : resolvedDirection === "column" ? undefined : "20"}
      s={{ direction: "column" }}
    >
      {showThumbnail && (
        <div className={styles.thumb} data-direction={resolvedDirection}>
          <Media
            priority={priority}
            sizes={resolvedDirection === "row" ? "160px" : "(max-width: 768px) 100vw, 640px"}
            border="transparent"
            cursor="interactive"
            radius="l"
            src={displayImage}
            alt={imageAlt || `Thumbnail de ${title}`}
            aspectRatio="16 / 9"
          />
        </div>
      )}
      <Row fillWidth>
        <Column
          className={styles.content}
          maxWidth={variant === "compact" ? 32 : 28}
          paddingY={variant === "compact" ? "16" : "20"}
          paddingX={variant === "feature" ? "20" : "l"}
          gap={variant === "compact" ? "12" : "16"}
          vertical="center"
        >
          <Row className={styles.meta} gap="16" vertical="center" wrap>
            <Row vertical="center" gap="12">
              <Avatar src={person.avatar} size="s" />
              <Text variant="label-default-s">{person.name}</Text>
            </Row>
            {publishedAt && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {formatDate(publishedAt, false)}
              </Text>
            )}
          </Row>
          <Text
            className={styles.title}
            variant={variant === "compact" ? "heading-strong-m" : variant === "feature" ? "heading-strong-xl" : "heading-strong-l"}
            wrap="balance"
          >
            {title}
          </Text>
          {displayTag && (
            <Text className={styles.tag} variant="label-strong-s" onBackground="neutral-weak">
              {displayTag}
            </Text>
          )}
        </Column>
      </Row>
    </Card>
  );
}
