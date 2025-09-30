// src/components/blog/Post.tsx
"use client";

import { memo, useMemo } from "react";
import { Card, Column, Media, Row, Avatar, Text } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";

type Direction = "row" | "column";

interface PostFrontmatter {
  title: string;
  publishedAt: string; // ISO string
  tag?: string;
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
  /** Define prioridade de carregamento da imagem (use no destaque) */
  priority?: boolean;
}

function PostComponent({ post, thumbnail = false, direction, priority = false }: PostProps) {
  const { slug, metadata } = post || {};
  const { title, publishedAt, tag, image, imageAlt } = metadata || {};

  const titleId = useMemo(() => `post-${slug}-title`, [slug]);
  const hasImage = Boolean(image && thumbnail);

  return (
    <Card
      as="article"
      aria-labelledby={titleId}
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
      {hasImage && (
        <Media
          // Carregue com prioridade só em cards de destaque
          priority={priority}
          sizes="(max-width: 768px) 100vw, 640px"
          border="neutral-alpha-weak"
          cursor="interactive"
          radius="l"
          src={image!}
          alt={imageAlt ?? `Capa de ${title}`}
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

          <Text id={titleId} variant="heading-strong-l" wrap="balance">
            {title}
          </Text>

          {tag && (
            <Text variant="label-strong-s" onBackground="neutral-weak">
              {tag}
            </Text>
          )}
        </Column>
      </Row>
    </Card>
  );
}

const Post = memo(PostComponent);
export default Post;
