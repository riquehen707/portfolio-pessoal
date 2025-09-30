import { ReactNode } from "react";
import clsx from "clsx";
import { HoverNote } from "./HoverNote";

type QuoteProps = {
  author?: string;
  source?: string;
  sourceHref?: string;
  authorNote?: string; // exibe HoverNote no autor
  children: ReactNode;
  className?: string;
  quoteMarks?: "none" | "auto"; // "none" evita aspas duplas no MDX
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
  const text =
    quoteMarks === "auto" ? (
      <span className="before:content-['“'] after:content-['”']">{children}</span>
    ) : (
      <>{children}</>
    );

  const Author = author ? (
    authorNote ? (
      <HoverNote note={authorNote}>
        <span className="font-semibold underline decoration-dotted underline-offset-2 cursor-help">
          {author}
        </span>
      </HoverNote>
    ) : (
      <span className="font-semibold">{author}</span>
    )
  ) : null;

  return (
    <figure
      className={clsx(
        "my-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
        "dark:border-gray-800 dark:bg-neutral-900",
        className
      )}
    >
      <blockquote className="text-lg leading-relaxed italic text-gray-900 dark:text-gray-100">
        {text}
      </blockquote>
      {(author || source) && (
        <figcaption className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {Author}
          {author && source ? " — " : null}
          {source ? (
            sourceHref ? (
              <a
                href={sourceHref}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-dotted"
              >
                {source}
              </a>
            ) : (
              <cite className="not-italic">{source}</cite>
            )
          ) : null}
        </figcaption>
      )}
    </figure>
  );
}
