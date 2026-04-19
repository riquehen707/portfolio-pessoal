"use client";

import { type PointerEvent, useRef, useState } from "react";

import classNames from "classnames";
import { m, useReducedMotion } from "framer-motion";

import { SectionHeader } from "@/components/SectionHeader";
import { MarketCard } from "@/components/cards/MarketCard";
import {
  createRevealVariants,
  createStaggerContainer,
  getHoverLift,
  motionViewport,
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
  const viewportRef = useRef<HTMLDivElement>(null);
  const pendingDragRef = useRef(false);
  const draggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartScrollRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;

    if (!viewport) {
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
  };

  const stopDragging = (pointerId?: number) => {
    const viewport = viewportRef.current;

    if (pointerId !== undefined && viewport?.hasPointerCapture?.(pointerId)) {
      viewport.releasePointerCapture(pointerId);
    }

    pendingDragRef.current = false;
    draggingRef.current = false;
    setIsDragging(false);
  };

  return (
    <m.section
      className={styles.root}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={createStaggerContainer(reducedMotion, 0.08, 0.04)}
    >
      <m.div variants={createRevealVariants(reducedMotion, 24, 0.992)}>
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
      </m.div>

      <m.div className={styles.carousel} variants={createRevealVariants(reducedMotion, 18, 0.996)}>
        <div
          ref={viewportRef}
          className={classNames(styles.viewport, {
            [styles.dragging]: isDragging,
          })}
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
            {items.map((item) => (
              <m.div
                className={styles.cardSlot}
                key={item.title}
                whileHover={getHoverLift(reducedMotion, -4, 1.004)}
              >
                <MarketCard
                  title={item.title}
                  summary={item.summary}
                  bullets={item.bullets}
                  detail={item.detail}
                />
              </m.div>
            ))}
          </div>
        </div>
      </m.div>
    </m.section>
  );
}
