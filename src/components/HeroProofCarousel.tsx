"use client";

import { useEffect, useRef, useState } from "react";

import { Icon, Row, Text } from "@once-ui-system/core";

import { IconName } from "@/resources/icons";

import styles from "./HeroProofCarousel.module.scss";

type HeroProofItem = {
  icon: IconName;
  label: string;
};

type HeroProofCarouselProps = {
  items: HeroProofItem[];
  speed?: number;
};

export function HeroProofCarousel({ items, speed = 0.36 }: HeroProofCarouselProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const inViewRef = useRef(true);
  const prefersReducedMotionRef = useRef(false);
  const hoveredRef = useRef(false);
  const pausedRef = useRef(false);
  const pendingDragRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);
  const visibleItems = items;

  useEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport || visibleItems.length === 0) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inViewRef.current = Boolean(entry?.isIntersecting);
      },
      {
        threshold: [0, 0.1],
      },
    );

    observer.observe(viewport);

    return () => observer.disconnect();
  }, [visibleItems.length]);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncMotionPreference = () => {
      prefersReducedMotionRef.current = motionQuery.matches;
      pausedRef.current = motionQuery.matches || hoveredRef.current;
    };

    syncMotionPreference();

    motionQuery.addEventListener?.("change", syncMotionPreference);

    return () => {
      motionQuery.removeEventListener?.("change", syncMotionPreference);
    };
  }, []);

  const normalizeScroll = () => {
    const viewport = viewportRef.current;
    const segment = segmentRef.current;

    if (!viewport || !segment) return;

    const segmentWidth = segment.scrollWidth;

    if (segmentWidth <= 0) return;

    if (viewport.scrollLeft < 0) {
      viewport.scrollLeft += segmentWidth;
    } else if (viewport.scrollLeft >= segmentWidth) {
      viewport.scrollLeft -= segmentWidth;
    }
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    const segment = segmentRef.current;

    if (!viewport || !segment || visibleItems.length === 0) return;

    const animate = () => {
      if (
        inViewRef.current &&
        !prefersReducedMotionRef.current &&
        !pausedRef.current &&
        !pendingDragRef.current &&
        !draggingRef.current
      ) {
        viewport.scrollLeft += speed;
        normalizeScroll();
      }

      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [speed, visibleItems.length]);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    pendingDragRef.current = true;
    pausedRef.current = true;
    dragStartXRef.current = event.clientX;
    dragStartYRef.current = event.clientY;
    dragStartScrollRef.current = viewport.scrollLeft;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const segment = segmentRef.current;

    if ((!pendingDragRef.current && !draggingRef.current) || !viewport || !segment) return;

    const segmentWidth = segment.scrollWidth;

    if (segmentWidth <= 0) return;

    const delta = event.clientX - dragStartXRef.current;
    const deltaY = event.clientY - dragStartYRef.current;

    if (!draggingRef.current) {
      if (Math.abs(delta) < 8 && Math.abs(deltaY) < 8) {
        return;
      }

      if (Math.abs(deltaY) > Math.abs(delta)) {
        pendingDragRef.current = false;
        pausedRef.current = prefersReducedMotionRef.current || hoveredRef.current;
        return;
      }

      draggingRef.current = true;
      setIsDragging(true);
      viewport.setPointerCapture?.(event.pointerId);
    }

    event.preventDefault();

    let nextScrollLeft = dragStartScrollRef.current - delta;

    if (nextScrollLeft < 0) {
      nextScrollLeft += segmentWidth;
    } else if (nextScrollLeft >= segmentWidth) {
      nextScrollLeft -= segmentWidth;
    }

    viewport.scrollLeft = nextScrollLeft;
  };

  const stopDragging = (pointerId?: number) => {
    const viewport = viewportRef.current;

    if (pointerId !== undefined && viewport?.hasPointerCapture?.(pointerId)) {
      viewport.releasePointerCapture(pointerId);
    }

    pendingDragRef.current = false;
    draggingRef.current = false;
    pausedRef.current = prefersReducedMotionRef.current || hoveredRef.current;
    setIsDragging(false);
  };

  if (visibleItems.length === 0) {
    return null;
  }

  return (
    <div className={styles.root}>
      <div
        ref={viewportRef}
        className={`${styles.viewport} ${isDragging ? styles.dragging : ""}`}
        onMouseEnter={() => {
          hoveredRef.current = true;
          pausedRef.current = true;
        }}
        onMouseLeave={() => {
          hoveredRef.current = false;
          if (!draggingRef.current) pausedRef.current = prefersReducedMotionRef.current;
        }}
        onFocusCapture={() => {
          pausedRef.current = true;
        }}
        onBlurCapture={() => {
          pausedRef.current = prefersReducedMotionRef.current || hoveredRef.current;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={(event) => stopDragging(event.pointerId)}
        onPointerCancel={(event) => stopDragging(event.pointerId)}
        onLostPointerCapture={() => stopDragging()}
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse" && !event.currentTarget.hasPointerCapture(event.pointerId)) {
            stopDragging();
          }
        }}
        onScroll={normalizeScroll}
        aria-label="Diferenciais do trabalho"
      >
        <div ref={segmentRef} className={styles.track}>
          {visibleItems.map((item) => (
            <div className={styles.card} key={item.label}>
              <Row className={styles.cardRow} gap="12">
                <Row className={styles.iconWrap} horizontal="center" vertical="center">
                  <Icon name={item.icon} size="s" />
                </Row>
                <Text className={styles.label} variant="body-default-m">
                  {item.label}
                </Text>
              </Row>
            </div>
          ))}
        </div>

        <div className={styles.track} aria-hidden="true">
          {visibleItems.map((item) => (
            <div className={styles.card} key={`${item.label}-duplicate`}>
              <Row className={styles.cardRow} gap="12">
                <Row className={styles.iconWrap} horizontal="center" vertical="center">
                  <Icon name={item.icon} size="s" />
                </Row>
                <Text className={styles.label} variant="body-default-m">
                  {item.label}
                </Text>
              </Row>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
