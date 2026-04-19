"use client";

import { type PointerEvent, useCallback, useEffect, useRef, useState } from "react";

import classNames from "classnames";
import { m, useReducedMotion } from "framer-motion";

import { Icon, Text } from "@once-ui-system/core";

import { SectionHeader } from "@/components/SectionHeader";
import { MarketCard } from "@/components/cards/MarketCard";
import {
  createRevealVariants,
  createStaggerContainer,
  getHoverLift,
  getTapPress,
  motionViewport,
  revealTransition,
} from "@/components/motion/motionTokens";

import styles from "./MarketsSection.module.scss";

type MarketItem = {
  title: string;
  summary: string;
  bullets: string[];
  detail: string;
};

type MarketsSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: MarketItem[];
};

export function MarketsSection({ eyebrow, title, description, items }: MarketsSectionProps) {
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollFrameRef = useRef<number | null>(null);
  const wheelSnapTimeoutRef = useRef<number | null>(null);
  const autoCenterDoneRef = useRef(false);
  const pendingDragRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [isDragging, setIsDragging] = useState(false);

  const centerIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const viewport = viewportRef.current;
    const item = itemRefs.current[index];

    if (!viewport || !item) {
      return;
    }

    const nextScrollLeft = item.offsetLeft - (viewport.clientWidth - item.clientWidth) / 2;

    viewport.scrollTo({
      left: nextScrollLeft,
      behavior,
    });
  }, []);

  const resolveNearestIndex = useCallback(() => {
    const viewport = viewportRef.current;

    if (!viewport || itemRefs.current.length === 0) {
      return 0;
    }

    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    let nextIndex = 0;
    let smallestDistance = Number.POSITIVE_INFINITY;

    itemRefs.current.forEach((item, index) => {
      if (!item) {
        return;
      }

      const itemCenter = item.offsetLeft + item.clientWidth / 2;
      const distance = Math.abs(itemCenter - viewportCenter);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        nextIndex = index;
      }
    });

    return nextIndex;
  }, []);

  const syncActiveIndex = useCallback(() => {
    const nextIndex = resolveNearestIndex();

    setActiveIndex((currentIndex) => (currentIndex === nextIndex ? currentIndex : nextIndex));
    return nextIndex;
  }, [resolveNearestIndex]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || autoCenterDoneRef.current) {
          return;
        }

        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          autoCenterDoneRef.current = true;
          centerIndex(activeIndexRef.current, "smooth");
        }
      },
      {
        threshold: [0.6],
      },
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, [centerIndex]);

  useEffect(() => {
    const handleResize = () => {
      centerIndex(activeIndexRef.current, "auto");
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [centerIndex]);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current) {
        window.cancelAnimationFrame(scrollFrameRef.current);
      }

      if (wheelSnapTimeoutRef.current) {
        window.clearTimeout(wheelSnapTimeoutRef.current);
      }
    };
  }, []);

  const queueActiveSync = () => {
    if (scrollFrameRef.current) {
      return;
    }

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      syncActiveIndex();
    });
  };

  const goToIndex = (index: number) => {
    setActiveIndex(index);
    setExpandedIndex(index);
    centerIndex(index, "smooth");
  };

  const handleToggleExpand = (index: number) => {
    if (index !== activeIndex) {
      goToIndex(index);
      return;
    }

    setExpandedIndex((currentIndex) => (currentIndex === index ? null : index));
    centerIndex(index, "smooth");
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const target = event.target as HTMLElement;

    if (!viewport || target.closest("button, a")) {
      return;
    }

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pendingDragRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartYRef.current = event.clientY;
    dragStartScrollRef.current = viewport.scrollLeft;
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if ((!pendingDragRef.current && !draggingRef.current) || !viewport) {
      return;
    }

    const deltaX = event.clientX - dragStartXRef.current;
    const deltaY = event.clientY - dragStartYRef.current;

    if (!draggingRef.current) {
      if (Math.abs(deltaX) < 8 && Math.abs(deltaY) < 8) {
        return;
      }

      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        pendingDragRef.current = false;
        return;
      }

      draggingRef.current = true;
      setIsDragging(true);
      viewport.setPointerCapture?.(event.pointerId);
    }

    event.preventDefault();
    viewport.scrollLeft = dragStartScrollRef.current - deltaX;
    queueActiveSync();
  };

  const stopDragging = (pointerId?: number) => {
    const viewport = viewportRef.current;

    if (pointerId !== undefined && viewport?.hasPointerCapture?.(pointerId)) {
      viewport.releasePointerCapture(pointerId);
    }

    if (draggingRef.current) {
      const nextIndex = syncActiveIndex();
      centerIndex(nextIndex, "smooth");
    }

    pendingDragRef.current = false;
    draggingRef.current = false;
    setIsDragging(false);
  };

  return (
    <m.section
      className={styles.root}
      ref={rootRef}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={createStaggerContainer(reducedMotion, 0.08, 0.04)}
    >
      <m.div variants={createRevealVariants(reducedMotion, 24, 0.992)}>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      </m.div>

      <m.div className={styles.controls} variants={createRevealVariants(reducedMotion, 20, 0.994)}>
        <div className={styles.pillStrip} aria-label="Selecionar mercado">
          {items.map((item, index) => (
            <m.button
              className={styles.pill}
              type="button"
              key={item.title}
              data-active={activeIndex === index ? "true" : "false"}
              aria-pressed={activeIndex === index ? "true" : "false"}
              onClick={() => goToIndex(index)}
              whileTap={getTapPress(reducedMotion)}
            >
              {item.title}
            </m.button>
          ))}
        </div>

        <div className={styles.navButtons}>
          <m.button
            className={styles.navButton}
            type="button"
            aria-label="Mercado anterior"
            onClick={() => goToIndex(Math.max(0, activeIndex - 1))}
            disabled={activeIndex === 0}
            whileHover={getHoverLift(reducedMotion, -2, 1.01)}
            whileTap={getTapPress(reducedMotion)}
          >
            <Icon className={styles.navIconLeft} name="arrowRight" size="xs" />
          </m.button>
          <m.button
            className={styles.navButton}
            type="button"
            aria-label="Proximo mercado"
            onClick={() => goToIndex(Math.min(items.length - 1, activeIndex + 1))}
            disabled={activeIndex === items.length - 1}
            whileHover={getHoverLift(reducedMotion, -2, 1.01)}
            whileTap={getTapPress(reducedMotion)}
          >
            <Icon name="arrowRight" size="xs" />
          </m.button>
        </div>
      </m.div>

      <m.div className={styles.carousel} variants={createRevealVariants(reducedMotion, 18, 0.996)}>
        <div
          ref={viewportRef}
          className={classNames(styles.viewport, {
            [styles.dragging]: isDragging,
          })}
          onScroll={() => {
            queueActiveSync();

            if (wheelSnapTimeoutRef.current) {
              window.clearTimeout(wheelSnapTimeoutRef.current);
            }

            wheelSnapTimeoutRef.current = window.setTimeout(() => {
              const nextIndex = syncActiveIndex();
              centerIndex(nextIndex, "smooth");
            }, 140);
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={(event) => stopDragging(event.pointerId)}
          onPointerCancel={(event) => stopDragging(event.pointerId)}
          onLostPointerCapture={() => stopDragging()}
          onPointerLeave={(event) => {
            if (event.pointerType === "mouse" && !draggingRef.current) {
              stopDragging();
            }
          }}
          aria-label="Mercados atendidos"
        >
          <div className={styles.track}>
            {items.map((item, index) => (
              <m.div
                className={styles.cardSlot}
                data-active={activeIndex === index ? "true" : "false"}
                key={item.title}
                ref={(element) => {
                  itemRefs.current[index] = element;
                }}
                animate={
                  reducedMotion
                    ? { opacity: 1 }
                    : activeIndex === index
                      ? { opacity: 1, scale: 1, y: 0 }
                      : { opacity: 0.82, scale: 0.97, y: 8 }
                }
                transition={reducedMotion ? { duration: 0.01 } : revealTransition}
                whileHover={activeIndex === index ? getHoverLift(reducedMotion, -4, 1.004) : undefined}
              >
                <MarketCard
                  title={item.title}
                  summary={item.summary}
                  bullets={item.bullets}
                  detail={item.detail}
                  isActive={activeIndex === index}
                  isExpanded={expandedIndex === index}
                  onToggleExpand={() => handleToggleExpand(index)}
                />
              </m.div>
            ))}
          </div>
        </div>
      </m.div>

      <m.div variants={createRevealVariants(reducedMotion, 16, 0.998)}>
        <Text className={styles.bridge} onBackground="neutral-weak" variant="body-default-s">
          Cada mercado pede leitura diferente. Os projetos abaixo mostram como isso vira execucao.
        </Text>
      </m.div>
    </m.section>
  );
}
