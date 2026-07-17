type MediaCreditProps = {
  caption?: string;
  source?: string;
  accessedAt?: string;
  sourceHref?: string;
};

export function MediaCredit({ caption, source, accessedAt, sourceHref }: MediaCreditProps) {
  if (!caption && !source && !accessedAt) return null;

  return (
    <figcaption
      style={{
        display: "grid",
        gap: "0.2rem",
        marginTop: "0.65rem",
        color: "var(--neutral-on-background-weak)",
        fontSize: "0.82rem",
        lineHeight: 1.5,
      }}
    >
      {caption ? <span>{caption}</span> : null}
      {source || accessedAt ? (
        <span>
          {source ? (
            sourceHref ? (
              <a href={sourceHref} target="_blank" rel="noopener noreferrer">
                Fonte: {source}
              </a>
            ) : (
              <>Fonte: {source}</>
            )
          ) : null}
          {source && accessedAt ? " · " : null}
          {accessedAt ? `Consulta: ${accessedAt}` : null}
        </span>
      ) : null}
    </figcaption>
  );
}

export type { MediaCreditProps };
