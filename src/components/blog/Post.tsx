import { Card, Column, Media, Row, Text } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";

import styles from "./Post.module.scss";

type Direction = "row" | "column";
type PostVariant = "default" | "feature" | "compact";

interface PostFrontmatter {
  title: string;
  publishedAt: string;
  summary?: string;
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
  showSummary?: boolean;
}

export default function Post({
  post,
  thumbnail = false,
  direction = "row",
  priority = false,
  variant = "default",
  showSummary = false,
}: PostProps) {
  const { slug, metadata } = post;
  const { title, publishedAt, summary, tag, tags, categories, image, imageAlt } = metadata || {};

  const displayTag = categories?.[0] || tag || tags?.[0];
  const displayImage = image && image.trim() !== "" ? image.trim() : undefined;
  const resolvedDirection = variant === "feature" ? "column" : direction;
  const showThumbnail = thumbnail && variant !== "compact" && Boolean(displayImage);
  const isCoverless = thumbnail && variant !== "compact" && !displayImage;
  const shouldShowSummary = showSummary && variant !== "compact" && Boolean(summary?.trim());

  return (
    <Card
      className={`${styles.card} ${styles[variant]}`}
      data-coverless={isCoverless ? "true" : "false"}
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
            src={displayImage!}
            alt={imageAlt || `Capa de ${title}`}
            aspectRatio="16 / 9"
          />
        </div>
      )}
      <Column
        className={styles.content}
        maxWidth={variant === "compact" ? 32 : 28}
        paddingY={variant === "compact" ? "16" : "20"}
        paddingX={variant === "feature" ? "20" : "l"}
        gap={variant === "compact" ? "12" : "16"}
        vertical="center"
      >
        {(publishedAt || displayTag) && (
          <Row className={styles.meta} gap="12" vertical="center" wrap>
            {publishedAt && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {formatDate(publishedAt, false)}
              </Text>
            )}
            {displayTag && (
              <Text className={styles.tag} variant="label-strong-s" onBackground="neutral-weak">
                {displayTag}
              </Text>
            )}
          </Row>
        )}
        <Text
          className={styles.title}
          variant={
            variant === "compact"
              ? "heading-strong-m"
              : variant === "feature"
                ? "heading-strong-xl"
                : "heading-strong-l"
          }
          wrap="balance"
        >
          {title}
        </Text>
        {shouldShowSummary && (
          <Text className={styles.summary} onBackground="neutral-weak" variant="body-default-m">
            {summary}
          </Text>
        )}
      </Column>
    </Card>
  );
}
