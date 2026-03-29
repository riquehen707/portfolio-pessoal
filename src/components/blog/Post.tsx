import { Avatar, Card, Column, Media, Row, Text } from "@once-ui-system/core";

import { person } from "@/resources";
import { formatDate } from "@/utils/formatDate";
import { buildOgImage } from "@/utils/og";

type Direction = "row" | "column";

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
}

export default function Post({
  post,
  thumbnail = false,
  direction = "row",
  priority = false,
}: PostProps) {
  const { slug, metadata } = post;
  const { title, publishedAt, tag, tags, categories, image, imageAlt } = metadata || {};

  const displayTag = tag || tags?.[0] || categories?.[0];
  const fallbackImage = buildOgImage(title, displayTag || "Conteudo");
  const displayImage = image && image.trim() !== "" ? image : fallbackImage;

  return (
    <Card
      fillWidth
      key={slug}
      href={`/blog/${slug}`}
      transition="micro-medium"
      direction={direction}
      border="transparent"
      background="transparent"
      padding="4"
      radius="l-4"
      gap={direction === "column" ? undefined : "24"}
      s={{ direction: "column" }}
    >
      {thumbnail && (
        <Media
          priority={priority}
          sizes={direction === "row" ? "160px" : "(max-width: 768px) 100vw, 640px"}
          border="neutral-alpha-weak"
          cursor="interactive"
          radius="l"
          src={displayImage}
          alt={imageAlt || `Thumbnail de ${title}`}
          aspectRatio="16 / 9"
        />
      )}
      <Row fillWidth>
        <Column maxWidth={28} paddingY="24" paddingX="l" gap="20" vertical="center">
          <Row gap="24" vertical="center">
            <Row vertical="center" gap="16">
              <Avatar src={person.avatar} size="s" />
              <Text variant="label-default-s">{person.name}</Text>
            </Row>
            {publishedAt && (
              <Text variant="body-default-xs" onBackground="neutral-weak">
                {formatDate(publishedAt, false)}
              </Text>
            )}
          </Row>
          <Text variant="heading-strong-l" wrap="balance">
            {title}
          </Text>
          {displayTag && (
            <Text variant="label-strong-s" onBackground="neutral-weak">
              {displayTag}
            </Text>
          )}
        </Column>
      </Row>
    </Card>
  );
}
