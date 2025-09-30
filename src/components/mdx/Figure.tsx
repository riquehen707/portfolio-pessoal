//src/components/mdx/Figure.tsx

"use client";

import { Column, Media, Text } from "@once-ui-system/core";

type Align = "left" | "center" | "right";

export default function Figure({
  src,
  alt,
  caption,
  width,        // ex.: "720px" ou "100%"
  align = "center",
  radius = "l",
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: string;
  align?: Align;
  radius?: "s" | "m" | "l";
}) {
  const justify =
    align === "left" ? "start" : align === "right" ? "end" : "center";

  return (
    <Column fillWidth horizontal={justify} gap="8" marginY="16">
      <div style={{ width: width || "min(100%, 960px)" }}>
        <Media
          src={src}
          alt={alt}
          radius={radius}
          border="neutral-alpha-weak"
          sizes="(min-width: 1024px) 960px, 100vw"
          aspectRatio="auto"
        />
        {caption && (
          <Text variant="body-default-xs" onBackground="neutral-weak" align="center" marginTop="8">
            {caption}
          </Text>
        )}
      </div>
    </Column>
  );
}
