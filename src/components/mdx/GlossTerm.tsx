// src/components/mdx/GlossTerm.tsx
import React, { ReactNode } from "react";

export default function GlossTerm({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}) {
  // Render mínimo e seguro (Server Component ok)
  // Você pode trocar isso por HoverNote/Tooltip depois.
  return (
    <span
      data-gloss-term
      data-term={term}
      style={{
        fontWeight: 600,
        textDecoration: "underline dotted",
        cursor: "help",
      }}
      title={term}
    >
      {children}
    </span>
  );
}
