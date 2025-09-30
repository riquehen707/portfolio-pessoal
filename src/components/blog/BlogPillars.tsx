// components/blog/BlogPillars.tsx
"use client";

import React from "react";
import { Row, Badge } from "@once-ui-system/core";
import { PILLARS } from "@/utils/pillars";

type BlogPillarsProps = {
  currentPillar?: string; // slug atual para destacar
  basePath?: string;      // por padrão "/blog"
};

export function BlogPillars({ currentPillar, basePath = "/blog" }: BlogPillarsProps) {
  return (
    <Row gap="8" wrap="wrap" paddingTop="8" paddingBottom="8">
      {PILLARS.map((p) => {
        const href = `${basePath}?pillar=${p.slug}`;
        const active = currentPillar === p.slug;
        return (
          <Badge
            key={p.slug}
            href={href}
            background={active ? "brand-alpha-weak" : "neutral-alpha-weak"}
            onBackground={active ? "brand-strong" : "neutral-strong"}
            paddingX="12"
            paddingY="6"
            textVariant="label-default-s"
            arrow={false}
            data-active={active ? "true" : "false"}
          >
            {p.label}
          </Badge>
        );
      })}
    </Row>
  );
}
