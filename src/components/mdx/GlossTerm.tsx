"use client";

import { type ReactNode, useId, useState } from "react";

import styles from "./GlossTerm.module.scss";

export default function GlossTerm({
  term,
  note,
  children,
}: {
  term: string;
  note?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const noteId = useId();

  if (!note) return <>{children}</>;

  return (
    <span className={styles.root} data-gloss-term data-term={term}>
      <button
        type="button"
        className={styles.trigger}
        aria-expanded={open}
        aria-describedby={open ? noteId : undefined}
        onClick={() => setOpen((current) => !current)}
      >
        {children}
      </button>
      {open ? (
        <span className={styles.note} id={noteId} role="note">
          {note}
        </span>
      ) : null}
    </span>
  );
}
