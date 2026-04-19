// src/components/mdx/HoverNote.tsx
"use client";

import React, { useId } from "react";

import styles from "./HoverNote.module.scss";

export function HoverNote({
  children,
  note,
}: {
  children: React.ReactNode;
  note: string;
}) {
  const id = useId();

  return (
    <span className={styles.root} aria-describedby={id} tabIndex={0}>
      {children}
      <span className={styles.bubble} role="tooltip" id={id}>
        {note}
      </span>
    </span>
  );
}
