// src/components/blog/Post.tsx
import Link from "next/link";
import { Column, Row, Heading, Text } from "@once-ui-system/core";

type Direction = "row" | "column";

interface PostFrontmatter {
  title: string;
  publishedAt: string;
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
  thumbnail?: boolean;           // se true, tentamos mostrar imagem (se houver)
  direction?: Direction;         // layout row | column
  priority?: boolean;            // pode usar pra <Image priority />
}

export default function Post({
  post,
  thumbnail = false,
  direction = "row",
  priority = false,
}: PostProps) {
  const { slug, metadata } = post;
  const { title, publishedAt, tag, image, imageAlt } = metadata || {};

  // tem imagem válida?
  const hasImage = Boolean(image && image.trim() !== "");

  // formata data simples (opcional; ajusta pro formato que vc quiser)
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <Link
      href={`/blog/${slug}`}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
    >
      <Row
        gap="16"
        padding="16"
        radius="m"
        background="surface"
        border="neutral-alpha-weak"
        direction={direction}
        style={{
          width: "100%",
          height: "100%",
          background: "var(--layer-1)",
        }}
      >
        {/* Thumbnail só aparece se:
            - thumbnail === true E
            - hasImage === true
        */}
        {thumbnail && hasImage && (
          <div
            style={{
              flexShrink: 0,
              width: direction === "row" ? 160 : "100%",
              height: direction === "row" ? 96 : 180,
              borderRadius: 12,
              backgroundColor: "var(--layer-2)",
              overflow: "hidden",
            }}
          >
            {/* você pode trocar por next/image se quiser otimização */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image as string}
              alt={imageAlt || title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
              {...(priority ? { loading: "eager" } : { loading: "lazy" })}
            />
          </div>
        )}

        {/* Conteúdo textual */}
        <Column gap="8" style={{ minWidth: 0, flexGrow: 1 }}>
          <Heading
            as="h3"
            variant="heading-strong-m"
            style={{ lineHeight: 1.3, wordWrap: "break-word" }}
          >
            {title}
          </Heading>

          <Row gap="8" wrap>
            {formattedDate && (
              <Text
                variant="label-default-xs"
                color="text-dimmed"
                style={{ whiteSpace: "nowrap" }}
              >
                {formattedDate}
              </Text>
            )}

            {tag && (
              <Text
                variant="label-default-xs"
                color="accent-strong"
                style={{
                  background: "var(--accent-alpha-weak)",
                  borderRadius: 6,
                  padding: "2px 6px",
                  maxWidth: "100%",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                }}
              >
                {tag}
              </Text>
            )}
          </Row>
        </Column>
      </Row>
    </Link>
  );
}
