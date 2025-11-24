// src/components/blog/ArticleToc.tsx

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Column, Row, SmartLink, Text } from "@once-ui-system/core";

type TocItem = {
  id: string;
  text: string;
  level: number;
};

export default function ArticleToc({
  containerId = "article-content",
  minLevel = 2,
  maxLevel = 4,
}: {
  containerId?: string;
  minLevel?: 2 | 3 | 4;
  maxLevel?: 2 | 3 | 4;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const items: TocItem[] = useMemo(() => {
    if (typeof document === "undefined") return [];
    const container = document.getElementById(containerId);
    if (!container) return [];

    const selector = Array.from({ length: maxLevel - minLevel + 1 }, (_, i) => {
      const lvl = minLevel + i;
      return `h${lvl}[id]`;
    }).join(", ");

    return Array.from(container.querySelectorAll(selector)).map((h) => ({
      id: h.id,
      text: h.textContent || "",
      level: Number(h.tagName.replace("H", "")),
    }));
  }, [containerId, minLevel, maxLevel]);

  useEffect(() => {
    if (!items.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // pega o heading mais visível no topo
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0.1, 0.5, 1],
      }
    );

    items.forEach((it) => {
      const el = document.getElementById(it.id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <Column gap="8" paddingLeft="4">
      {items.map((it) => {
        const isActive = activeId === it.id;
        const indent =
          it.level === 2 ? 0 : it.level === 3 ? 12 : 22;

        return (
          <Row key={it.id} style={{ paddingLeft: indent }}>
            <SmartLink href={`#${it.id}`} underline="hover">
              <Text
                variant="label-default-s"
                onBackground={isActive ? "brand-strong" : "neutral-weak"}
                style={{
                  fontWeight: isActive ? 600 : 400,
                  opacity: isActive ? 1 : 0.85,
                }}
              >
                {it.text}
              </Text>
            </SmartLink>
          </Row>
        );
      })}
    </Column>
  );
}