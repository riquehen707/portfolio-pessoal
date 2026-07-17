//src/components/mdx/Figure.tsx

"use client";

import { Column, Media, Text } from "@once-ui-system/core";

import { MediaCredit, type MediaCreditProps } from "./MediaCredit";

type Align = "left" | "center" | "right";

export default function Figure({
  src,
  alt,
  caption,
  width,        // ex.: "720px" ou "100%"
  align = "center",
  radius = "l",
  aspectRatio = "16/9",
  source,
  accessedAt,
  sourceHref,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: string;
  align?: Align;
  radius?: "s" | "m" | "l";
  aspectRatio?: "16/9" | "4/3" | "1/1";
} & MediaCreditProps) {
  const justify =
    align === "left" ? "start" : align === "right" ? "end" : "center";

  return (
    <Column fillWidth horizontal={justify} gap="8" marginY="16">
      <figure style={{ width: width || "min(100%, 960px)", margin: 0 }}>
        <Media
          src={src}
          alt={alt}
          radius={radius}
          border="neutral-alpha-weak"
          sizes="(min-width: 1024px) 960px, 100vw"
          aspectRatio={aspectRatio}
        />
        {caption && (
          <Text variant="body-default-xs" onBackground="neutral-weak" align="center" marginTop="8">
            {caption}
          </Text>
        )}
        <MediaCredit source={source} accessedAt={accessedAt} sourceHref={sourceHref} />
      </figure>
    </Column>
  );
}
