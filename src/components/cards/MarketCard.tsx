import { type MouseEvent } from "react";

import classNames from "classnames";

import { Heading, Icon, Text } from "@once-ui-system/core";

import styles from "./MarketCard.module.scss";

type MarketCardProps = {
  title: string;
  summary: string;
  bullets: string[];
  detail?: string;
  isActive?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  className?: string;
};

export function MarketCard({
  title,
  summary,
  bullets,
  detail,
  isActive = false,
  isExpanded = false,
  onToggleExpand,
  className,
}: MarketCardProps) {
  const hasToggleDetail = Boolean(detail && onToggleExpand);
  const hasInlineDetail = Boolean(detail && !onToggleExpand);

  const handleActionClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onToggleExpand?.();
  };

  return (
    <article
      className={classNames(styles.card, className)}
      data-active={isActive ? "true" : "false"}
      data-expanded={isExpanded ? "true" : "false"}
    >
      <div className={styles.content}>
        <div className={styles.header}>
          <Heading as="h3" variant="heading-strong-l" className={styles.title}>
            {title}
          </Heading>
        </div>
        <Text className={styles.summary} onBackground="neutral-weak" variant="body-default-m">
          {summary}
        </Text>
        <ul className={styles.list}>
          {bullets.map((bullet) => (
            <li className={styles.item} key={bullet}>
              <span className={styles.dot} aria-hidden="true" />
              <Text variant="body-default-s">{bullet}</Text>
            </li>
          ))}
        </ul>

        {hasInlineDetail && (
          <Text className={styles.inlineDetail} onBackground="neutral-weak" variant="body-default-s">
            {detail}
          </Text>
        )}

        {hasToggleDetail && (
          <div className={styles.footer}>
            <button
              className={styles.action}
              type="button"
              aria-expanded={isExpanded ? "true" : "false"}
              onClick={handleActionClick}
            >
              <span>{isExpanded ? "Ocultar abordagem" : "Ver abordagem estratégica"}</span>
              <Icon className={styles.actionIcon} name="arrowRight" size="xs" />
            </button>

            <div className={styles.detail} data-expanded={isExpanded ? "true" : "false"}>
              <div className={styles.detailInner}>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  {detail}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
