// src/components/mdx/HoverNote.tsx
"use client";

import React, { useId } from "react";

export function HoverNote({
  children,
  note,
}: {
  children: React.ReactNode; // o texto que aparece no fluxo
  note: string;              // conteúdo da nota
}) {
  const id = useId();
  return (
    <span className="hover-note" aria-describedby={id}>
      {children}
      <span className="hover-note__bubble" role="tooltip" id={id}>
        {note}
      </span>
    </span>
  );
}
