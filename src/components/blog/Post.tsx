import Image from "next/image";
import Link from "next/link";
import { Column, Row, Heading, Text } from "@once-ui-system/core";

import { buildOgImage } from "@/utils/og";

import styles from "./Post.module.scss";

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

  const hasImage = Boolean(image && image.trim() !== "");
  const displayTag = tag || tags?.[0] || categories?.[0];
  const fallbackSubtitle = displayTag || "Conteudo";
  const fallbackImage = buildOgImage(title, fallbackSubtitle);
  const displayImage = hasImage ? (image as string) : fallbackImage;

  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <Link className={styles.link} href={`/blog/${slug}`}>
      <Row
        className={styles.card}
        gap="16"
        padding="16"
        radius="m"
        background="surface"
        border="neutral-alpha-weak"
        direction={direction}
      >
        {thumbnail && displayImage && (
          <div className={styles.thumb} data-direction={direction}>
            <Image
              fill
              src={displayImage}
              alt={imageAlt || title}
              sizes={direction === "row" ? "160px" : "(max-width: 768px) 100vw, 480px"}
              unoptimized
              style={{ objectFit: "cover" }}
              {...(priority ? { loading: "eager" } : { loading: "lazy" })}
            />
          </div>
        )}

        <Column className={styles.content} gap="8">
          <Heading className={styles.title} as="h3" variant="heading-strong-m">
            {title}
          </Heading>

          <Row className={styles.meta} gap="8" wrap>
            {formattedDate && (
              <Text className={styles.date} variant="label-default-xs" color="text-dimmed">
                {formattedDate}
              </Text>
            )}

            {displayTag && (
              <Text className={styles.tag} variant="label-default-xs" color="accent-strong">
                {displayTag}
              </Text>
            )}
          </Row>
        </Column>
      </Row>
    </Link>
  );
}
