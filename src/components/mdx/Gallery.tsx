//src/components/mdx/Gallery.tsx

"use client";

import { Grid, Media } from "@once-ui-system/core";

import { MediaCredit, type MediaCreditProps } from "./MediaCredit";

type Item = MediaCreditProps & {
  src: string;
  alt: string;
};

export default function Gallery({
  items,
  columns = 2,
  gap = "16",
  radius = "m",
}: {
  items: Item[];
  columns?: 1 | 2 | 3;
  gap?: "8" | "12" | "16" | "24";
  radius?: "s" | "m" | "l";
}) {
  if (!items?.length) return null;
  return (
    <Grid columns={String(columns) as "1" | "2" | "3"} s={{ columns: 1 }} gap={gap} marginY="16">
      {items.map((it, i) => (
        <figure key={`${it.src}-${i}`} style={{ margin: 0 }}>
          <Media
            src={it.src}
            alt={it.alt}
            radius={radius}
            border="neutral-alpha-weak"
            aspectRatio="16/9"
            sizes="(min-width: 1024px) 960px, 100vw"
          />
          <MediaCredit
            caption={it.caption}
            source={it.source}
            accessedAt={it.accessedAt}
            sourceHref={it.sourceHref}
          />
        </figure>
      ))}
    </Grid>
  );
}
