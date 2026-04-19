import { ReactNode } from "react";

import clsx from "clsx";

import styles from "./Quote.module.scss";
import { HoverNote } from "./HoverNote";

type QuoteProps = {
  author?: string;
  source?: string;
  sourceHref?: string;
  authorNote?: string;
  children: ReactNode;
  className?: string;
  quoteMarks?: "none" | "auto";
};

export function Quote({
  author,
  source,
  sourceHref,
  authorNote,
  children,
  className,
  quoteMarks = "none",
}: QuoteProps) {
  const text = quoteMarks === "auto" ? <span className={styles.autoQuote}>{children}</span> : <>{children}</>;

  const authorNode = author ? (
    authorNote ? (
      <HoverNote note={authorNote}>
        <span className={styles.authorInteractive}>{author}</span>
      </HoverNote>
    ) : (
      <span className={styles.author}>{author}</span>
    )
  ) : null;

  return (
    <figure className={clsx(styles.root, className)}>
      <blockquote className={styles.blockquote}>{text}</blockquote>
      {(author || source) && (
        <figcaption className={styles.caption}>
          {authorNode}
          {author && source ? " / " : null}
          {source ? (
            sourceHref ? (
              <a href={sourceHref} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                {source}
              </a>
            ) : (
              <cite className={styles.source}>{source}</cite>
            )
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}
