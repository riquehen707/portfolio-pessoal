import { Button, Column, Heading, Row, Tag, Text } from "@once-ui-system/core";
import { ReactNode } from "react";

import styles from "./ServiceComparisonTable.module.scss";

export type ComparisonTone = "positive" | "neutral" | "negative" | "highlight";

export type ServiceComparisonColumn = {
  id: string;
  name: string;
  eyebrow?: string;
  price: string;
  billing?: string;
  note?: string;
  badge?: string;
  highlight?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

export type ServiceComparisonCell =
  | ReactNode
  | {
      value: ReactNode;
      note?: ReactNode;
      tone?: ComparisonTone;
    };

export type ServiceComparisonRow = {
  label: string;
  description?: string;
  cells: Record<string, ServiceComparisonCell>;
};

type ServiceComparisonTableProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  dragHint?: string;
  columns: readonly ServiceComparisonColumn[];
  rows: readonly ServiceComparisonRow[];
  footnote?: ReactNode;
};

function normalizeCell(cell?: ServiceComparisonCell) {
  if (typeof cell === "string" || typeof cell === "number" || cell === null || cell === undefined) {
    return {
      value: cell ?? "—",
      note: undefined,
      tone: "neutral" as ComparisonTone,
    };
  }

  if (Array.isArray(cell)) {
    return {
      value: cell,
      note: undefined,
      tone: "neutral" as ComparisonTone,
    };
  }

  if (typeof cell === "object" && cell !== null && "value" in cell) {
    return {
      value: cell.value,
      note: cell.note,
      tone: cell.tone ?? "neutral",
    };
  }

  return {
    value: cell,
    note: undefined,
    tone: "neutral" as ComparisonTone,
  };
}

export function ServiceComparisonTable({
  eyebrow = "Comparativo",
  title,
  description,
  dragHint = "Arraste para o lado para comparar",
  columns,
  rows,
  footnote,
}: ServiceComparisonTableProps) {
  if (!columns.length || !rows.length) return null;

  return (
    <section className={styles.root}>
      <Column className={styles.header} gap="12">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          {eyebrow}
        </Tag>
        <Heading as="h3" variant="display-strong-s">
          {title}
        </Heading>
        {description && (
          <Text variant="body-default-m" onBackground="neutral-weak">
            {description}
          </Text>
        )}
      </Column>

      <Row className={styles.dragHint} gap="8" vertical="center">
        <span className={styles.dragDot} />
        <Text variant="label-default-s" onBackground="neutral-weak">
          {dragHint}
        </Text>
      </Row>

      <div className={styles.viewport}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={`${styles.featureHead} ${styles.stickyFeature}`} scope="col">
                <Column gap="8">
                  <Text variant="label-default-s" onBackground="neutral-weak">
                    Comparar por
                  </Text>
                  <Text variant="heading-strong-s">Escopo e suporte</Text>
                </Column>
              </th>

              {columns.map((column) => (
                <th
                  className={styles.serviceHead}
                  data-highlight={column.highlight ? "true" : "false"}
                  key={column.id}
                  scope="col"
                >
                  <Column gap="12">
                    <Row gap="8" wrap vertical="center">
                      {column.badge && (
                        <Tag
                          size="s"
                          background={column.highlight ? "brand-alpha-weak" : "neutral-alpha-weak"}
                          onBackground={column.highlight ? "brand-strong" : "neutral-strong"}
                        >
                          {column.badge}
                        </Tag>
                      )}
                      {column.eyebrow && (
                        <Text variant="label-default-s" onBackground="neutral-weak">
                          {column.eyebrow}
                        </Text>
                      )}
                    </Row>

                    <Column gap="8">
                      <Text variant="heading-strong-m">{column.name}</Text>
                      <Text className={styles.price} variant="heading-strong-l">
                        {column.price}
                      </Text>
                      {column.billing && (
                        <Text variant="body-default-s" onBackground="neutral-weak">
                          {column.billing}
                        </Text>
                      )}
                      {column.note && (
                        <Text variant="body-default-s" onBackground="neutral-weak">
                          {column.note}
                        </Text>
                      )}
                    </Column>

                    {column.ctaLabel && column.ctaHref && (
                      <Button
                        href={column.ctaHref}
                        variant={column.highlight ? "primary" : "secondary"}
                        size="s"
                        arrowIcon
                      >
                        {column.ctaLabel}
                      </Button>
                    )}
                  </Column>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th className={`${styles.featureCell} ${styles.stickyFeature}`} scope="row">
                  <Column gap="8">
                    <Text variant="label-default-m">{row.label}</Text>
                    {row.description && (
                      <Text variant="body-default-s" onBackground="neutral-weak">
                        {row.description}
                      </Text>
                    )}
                  </Column>
                </th>

                {columns.map((column) => {
                  const cell = normalizeCell(row.cells[column.id]);

                  return (
                    <td
                      className={styles.serviceCell}
                      data-highlight={column.highlight ? "true" : "false"}
                      key={`${row.label}-${column.id}`}
                    >
                      <Column gap="8">
                        <span className={styles.valueChip} data-tone={cell.tone}>
                          {cell.value}
                        </span>
                        {cell.note && (
                          <Text variant="body-default-s" onBackground="neutral-weak">
                            {cell.note}
                          </Text>
                        )}
                      </Column>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {footnote && (
        <Text className={styles.footnote} variant="body-default-s" onBackground="neutral-weak">
          {footnote}
        </Text>
      )}
    </section>
  );
}
