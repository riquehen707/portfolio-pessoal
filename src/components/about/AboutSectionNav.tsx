"use client";

import { type ReactNode, useEffect, useState } from "react";

import styles from "./about.module.scss";

type AboutSectionNavItem = {
  id: string;
  label: string;
};

type AboutSectionNavProps = {
  items: AboutSectionNavItem[];
};

type AboutScrollButtonProps = {
  targetId: string;
  children: ReactNode;
  className?: string;
};

function scrollToId(id: string) {
  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

export function AboutScrollButton({
  targetId,
  children,
  className,
}: AboutScrollButtonProps) {
  return (
    <button
      className={className ?? styles.heroJump}
      onClick={() => scrollToId(targetId)}
      type="button"
    >
      {children}
    </button>
  );
}

export function AboutSectionNav({ items }: AboutSectionNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let nextId = "";
        let nextRatio = 0;

        entries.forEach((entry) => {
          const sectionId = entry.target.getAttribute("id");

          if (!sectionId || !entry.isIntersecting) {
            return;
          }

          if (entry.intersectionRatio >= nextRatio) {
            nextId = sectionId;
            nextRatio = entry.intersectionRatio;
          }
        });

        if (nextId) {
          setActiveId(nextId);
        }
      },
      {
        rootMargin: "-20% 0px -60% 0px",
        threshold: [0.15, 0.4, 0.7],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Secoes da pagina sobre" className={styles.sectionNav}>
      <div className={styles.sectionNavRail}>
        {items.map((item) => {
          const active = activeId === item.id;

          return (
            <button
              aria-current={active ? "location" : undefined}
              className={active ? styles.sectionNavButtonActive : styles.sectionNavButton}
              key={item.id}
              onClick={() => scrollToId(item.id)}
              type="button"
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
