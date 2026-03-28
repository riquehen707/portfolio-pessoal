"use client";

import { useEffect, useState } from "react";

type DecodedTextProps = {
  className?: string;
  words: string[];
  pauseMs?: number;
};

const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/";

export function DecodedText({
  className,
  words,
  pauseMs = 1800,
}: DecodedTextProps) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState(words[0] ?? "");

  useEffect(() => {
    if (words.length === 0) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(words[0]);
      return;
    }

    const target = words[index] ?? words[0];
    let frame = 0;
    let holdTimeout: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      frame += 1;
      const revealCount = Math.floor(frame / 2);

      const nextDisplay = target
        .split("")
        .map((char, charIndex) => {
          if (char === " ") return " ";
          if (charIndex < revealCount) return char;
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join("");

      setDisplay(nextDisplay);

      if (revealCount >= target.length) {
        clearInterval(interval);
        setDisplay(target);

        if (words.length > 1) {
          holdTimeout = setTimeout(() => {
            setIndex((current) => (current + 1) % words.length);
          }, pauseMs);
        }
      }
    }, 42);

    return () => {
      clearInterval(interval);
      if (holdTimeout) clearTimeout(holdTimeout);
    };
  }, [index, pauseMs, words]);

  return (
    <span aria-label={words[index] ?? ""} className={className}>
      {display}
    </span>
  );
}
