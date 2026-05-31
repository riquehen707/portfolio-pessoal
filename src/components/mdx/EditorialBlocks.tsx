import { Children, isValidElement, type ReactElement, type ReactNode } from "react";

import clsx from "clsx";

import styles from "./EditorialBlocks.module.scss";

type BlockProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
  compact?: boolean;
  className?: string;
};

type Item = ReactNode;

type ListVariant = "default" | "check" | "numbered" | "decision" | "mistake" | "question";

type Pair = {
  label: string;
  value: ReactNode;
};

type ComparisonColumn = {
  title: string;
  items: Item[];
};

type TableColumn = {
  key: string;
  label: string;
  width?: string;
};

type TableRow = Record<string, ReactNode>;

type EditorialTableProps = {
  title?: string;
  caption?: string;
  columns?: TableColumn[];
  rows?: TableRow[];
  children?: ReactNode;
  compact?: boolean;
  mobileMode?: "cards" | "scroll";
  highlightFirstColumn?: boolean;
};

type NormalizedTable = {
  columns: TableColumn[];
  rows: TableRow[];
};

type FaqItem = {
  question: string;
  answer: ReactNode;
};

function EditorialBlock({ eyebrow, title, description, children, compact, className }: BlockProps) {
  return (
    <section className={clsx(styles.block, compact && styles.compact, className)}>
      {(eyebrow || title || description) && (
        <header className={styles.header}>
          {eyebrow ? (
            <span className={styles.eyebrow} data-reading-layer="quick">
              {eyebrow}
            </span>
          ) : null}
          {title ? (
            <h3 className={styles.title} data-reading-layer="intermediate">
              {title}
            </h3>
          ) : null}
          {description ? (
            <p className={styles.description} data-reading-layer="complete">
              {description}
            </p>
          ) : null}
        </header>
      )}
      {children ? <div className={styles.content}>{children}</div> : null}
    </section>
  );
}

function itemKey(item: Item, index: number) {
  return typeof item === "string" ? `${item}-${index}` : index;
}

function nodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return nodeText(node.props.children);
  return "";
}

function elementName(node: ReactNode): string | null {
  if (!isValidElement(node)) return null;

  const { type } = node;

  if (typeof type === "string") return type.toLowerCase();
  if (typeof type === "function") {
    const component = type as { displayName?: string; name?: string };
    return (component.displayName || component.name || "").toLowerCase();
  }
  if (typeof type === "object" && type && "displayName" in type) {
    const displayName = (type as { displayName?: string }).displayName;
    return displayName?.toLowerCase() ?? null;
  }

  return null;
}

function hasElementName(node: ReactNode, names: string[]) {
  const name = elementName(node);
  return name ? names.includes(name) : false;
}

function collectRows(node: ReactNode, rows: ReactElement<{ children?: ReactNode }>[] = []) {
  if (Array.isArray(node)) {
    node.forEach((child) => collectRows(child, rows));
    return rows;
  }

  if (isValidElement<{ children?: ReactNode }>(node)) {
    if (hasElementName(node, ["tr"])) {
      rows.push(node);
    }

    Children.toArray(node.props.children).forEach((child) => collectRows(child, rows));
    return rows;
  }

  return rows;
}

function directCells(row: ReactElement<{ children?: ReactNode }>, names: string[]) {
  return Children.toArray(row.props.children).filter((child) =>
    hasElementName(child, names),
  ) as ReactElement<{
    children?: ReactNode;
  }>[];
}

function tableFromChildren(children?: ReactNode): NormalizedTable | null {
  if (!children) return null;

  const tableRows = collectRows(children);
  const headerRow = tableRows.find((row) => directCells(row, ["th"]).length > 0);

  if (!headerRow) return null;

  const headerCells = directCells(headerRow, ["th"]);
  const columns = headerCells.map((cell, index) => ({
    key: `column-${index}`,
    label: nodeText(cell.props.children).trim() || `Coluna ${index + 1}`,
  }));

  const rows = tableRows
    .map((row) => directCells(row, ["td"]))
    .filter((cells) => cells.length > 0)
    .map((cells) =>
      columns.reduce<TableRow>((result, column, index) => {
        result[column.key] = cells[index]?.props.children ?? null;
        return result;
      }, {}),
    );

  if (!columns.length || !rows.length) return null;

  return { columns, rows };
}

function columnWidth(index: number, total: number, customWidth?: string) {
  if (customWidth) return customWidth;
  if (total <= 2) return index === 0 ? "38%" : "62%";
  if (total === 3) return index === 0 ? "30%" : "35%";
  if (total >= 6) return index === 0 ? "17%" : `${83 / (total - 1)}%`;
  return index === 0 ? "24%" : `${76 / (total - 1)}%`;
}

function EditorialList({
  items,
  ordered = false,
  variant = "default",
}: {
  items: Item[];
  ordered?: boolean;
  variant?: ListVariant;
}) {
  if (!items?.length) return null;

  const resolvedVariant = ordered ? "numbered" : variant;

  return (
    <ul
      data-reading-layer="quick"
      className={clsx(
        styles.list,
        resolvedVariant === "check" && styles.checkList,
        resolvedVariant === "numbered" && styles.numberedList,
        resolvedVariant === "decision" && styles.decisionList,
        resolvedVariant === "mistake" && styles.mistakeList,
        resolvedVariant === "question" && styles.questionList,
      )}
    >
      {items.map((item, index) => (
        <li className={styles.listItem} key={itemKey(item, index)}>
          {resolvedVariant === "numbered" ? (
            <span className={styles.number}>{String(index + 1).padStart(2, "0")}</span>
          ) : (
            <span
              className={clsx(styles.marker, styles[`${resolvedVariant}Marker`])}
              aria-hidden="true"
            />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function QuickSummary({
  title = "Resumo rápido",
  items,
  children,
}: {
  title?: string;
  items?: Item[];
  children?: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Resumo" title={title} className={styles.summaryBlock}>
      {items?.length ? <EditorialList items={items} /> : children}
    </EditorialBlock>
  );
}

export function ArticleIndex({
  title = "Neste artigo",
  items = [],
  children,
}: {
  title?: string;
  items?: Item[];
  children?: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Índice" title={title} compact className={styles.indexBlock}>
      {items.length ? <EditorialList items={items} ordered /> : children}
    </EditorialBlock>
  );
}

export function Definition({
  term,
  children,
}: {
  term: string;
  children: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Definição" compact>
      <div className={styles.definition}>
        <strong className={styles.term}>{term}</strong>
        <p className={styles.definitionText}>{children}</p>
      </div>
    </EditorialBlock>
  );
}

export function CommonMistake({
  title = "Erro comum",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Evite" title={title} compact className={styles.mistakeBlock}>
      {children}
    </EditorialBlock>
  );
}

export function CommonMistakes({
  title = "Erros comuns",
  items = [],
  children,
}: {
  title?: string;
  items?: Item[];
  children?: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Evite" title={title} compact className={styles.mistakeBlock}>
      {items.length ? <EditorialList items={items} variant="mistake" /> : children}
    </EditorialBlock>
  );
}

export function PracticalExample({
  title = "Exemplo prático",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Exemplo" title={title}>
      {children}
    </EditorialBlock>
  );
}

export function EditorialChecklist({
  title = "Checklist",
  items = [],
  children,
}: {
  title?: string;
  items?: Item[];
  children?: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Ação" title={title} className={styles.checklistBlock}>
      {items.length ? <EditorialList items={items} variant="check" /> : children}
    </EditorialBlock>
  );
}

export function NumberedContextList({
  title = "Sequência recomendada",
  items = [],
  children,
}: {
  title?: string;
  items?: Item[];
  children?: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Sequência" title={title} className={styles.indexBlock}>
      {items.length ? <EditorialList items={items} ordered /> : children}
    </EditorialBlock>
  );
}

export function DecisionPoints({
  title = "Pontos de decisão",
  items = [],
  children,
}: {
  title?: string;
  items?: Item[];
  children?: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Decisão" title={title} compact className={styles.decisionBlock}>
      {items.length ? <EditorialList items={items} variant="decision" /> : children}
    </EditorialBlock>
  );
}

export function EditorialComparison({
  title = "Comparação",
  left,
  right,
  children,
}: {
  title?: string;
  left?: ComparisonColumn;
  right?: ComparisonColumn;
  children?: ReactNode;
}) {
  if (!left || !right) {
    return (
      <EditorialBlock eyebrow="Comparação" title={title}>
        {children}
      </EditorialBlock>
    );
  }

  return (
    <EditorialBlock eyebrow="Comparação" title={title}>
      <div className={styles.comparison}>
        {[left, right].map((column) => (
          <div className={styles.comparisonColumn} key={column.title}>
            <strong className={styles.columnTitle}>{column.title}</strong>
            <EditorialList items={column.items} />
          </div>
        ))}
      </div>
    </EditorialBlock>
  );
}

export function EditorialTable({
  title = "Tabela",
  caption,
  columns,
  rows,
  children,
  compact,
  mobileMode = "cards",
  highlightFirstColumn = true,
}: EditorialTableProps) {
  const tableData =
    columns?.length && rows?.length ? { columns, rows } : tableFromChildren(children);
  const useCards = mobileMode === "cards" && !!tableData;

  if (!tableData) {
    return (
      <EditorialBlock
        eyebrow="Referência"
        title={title}
        compact={compact}
        className={styles.tableBlock}
      >
        {caption ? <p className={styles.tableIntro}>{caption}</p> : null}
        <div className={styles.tableFallback}>{children}</div>
      </EditorialBlock>
    );
  }

  return (
    <EditorialBlock
      eyebrow="Referência"
      title={title}
      compact={compact}
      className={styles.tableBlock}
    >
      {caption ? <p className={styles.tableIntro}>{caption}</p> : null}
      <div
        className={clsx(
          styles.tableSurface,
          useCards && styles.tableSurfaceWithCards,
          tableData.columns.length >= 6 && styles.manyColumns,
          highlightFirstColumn && styles.highlightFirstColumn,
        )}
      >
        <div className={styles.tableViewport}>
          <table className={styles.table}>
            {caption ? <caption className={styles.tableCaption}>{caption}</caption> : null}
            <colgroup>
              {tableData.columns.map((column, index) => (
                <col
                  key={column.key}
                  style={{ width: columnWidth(index, tableData.columns.length, column.width) }}
                />
              ))}
            </colgroup>
            <thead>
              <tr>
                {tableData.columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {tableData.columns.map((column) => (
                    <td key={column.key}>
                      <div className={styles.tableCell}>{row[column.key]}</div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {useCards ? (
        <div className={styles.tableCards} role="list" aria-label={title}>
          {tableData.rows.map((row, rowIndex) => {
            const [primaryColumn, ...detailColumns] = tableData.columns;
            const primaryValue = primaryColumn ? row[primaryColumn.key] : null;

            return (
              <article className={styles.tableCard} key={rowIndex} role="listitem">
                <h4 className={styles.tableCardTitle}>{primaryValue || `Linha ${rowIndex + 1}`}</h4>
                <dl className={styles.tableCardFields}>
                  {detailColumns.map((column) => (
                    <div className={styles.tableCardField} key={column.key}>
                      <dt>{column.label}</dt>
                      <dd>{row[column.key]}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            );
          })}
        </div>
      ) : null}
    </EditorialBlock>
  );
}

export function Diagnostic({
  title = "Diagnóstico rápido",
  items = [],
  children,
}: {
  title?: string;
  items?: Pair[];
  children?: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Diagnóstico" title={title} className={styles.diagnosticBlock}>
      {items.length ? (
        <EditorialList
          items={items.map((item) => (
            <>
              <strong>{item.label}:</strong> {item.value}
            </>
          ))}
          variant="question"
        />
      ) : (
        children
      )}
    </EditorialBlock>
  );
}

export function DiagnosticQuestions({
  title = "Perguntas de diagnóstico",
  items = [],
  children,
}: {
  title?: string;
  items?: Item[];
  children?: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Diagnóstico" title={title} className={styles.diagnosticBlock}>
      {items.length ? <EditorialList items={items} variant="question" /> : children}
    </EditorialBlock>
  );
}

export function Insight({
  title = "Insight",
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Insight" title={title} compact>
      {children}
    </EditorialBlock>
  );
}

export function FeaturedQuote({
  quote,
  source,
}: {
  quote: ReactNode;
  source?: ReactNode;
}) {
  return (
    <EditorialBlock eyebrow="Citação" compact>
      <blockquote className={styles.quote}>{quote}</blockquote>
      {source ? <footer className={styles.quoteFooter}>{source}</footer> : null}
    </EditorialBlock>
  );
}

export function EditorialFAQ({
  title = "Perguntas frequentes",
  items = [],
  children,
}: {
  title?: string;
  items?: FaqItem[];
  children?: ReactNode;
}) {
  if (!items.length) {
    return (
      <EditorialBlock eyebrow="FAQ" title={title}>
        {children}
      </EditorialBlock>
    );
  }

  return (
    <EditorialBlock eyebrow="FAQ" title={title}>
      <div className={styles.faq}>
        {items.map((item) => (
          <div className={styles.faqItem} key={item.question}>
            <strong className={styles.faqQuestion}>{item.question}</strong>
            <p className={styles.faqAnswer}>{item.answer}</p>
          </div>
        ))}
      </div>
    </EditorialBlock>
  );
}

export function NextSteps({
  title = "Próximos passos",
  items = [],
  children,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title?: string;
  items?: Item[];
  children?: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <EditorialBlock
      eyebrow="Próximos passos"
      title={title}
      className={clsx(styles.cta, styles.nextStepsBlock)}
    >
      {items.length ? <EditorialList items={items} ordered /> : children}
      {(primaryHref || secondaryHref) && (
        <div className={styles.ctaActions}>
          {primaryHref && primaryLabel ? (
            <a className={styles.button} href={primaryHref}>
              {primaryLabel}
            </a>
          ) : null}
          {secondaryHref && secondaryLabel ? (
            <a className={clsx(styles.button, styles.buttonSecondary)} href={secondaryHref}>
              {secondaryLabel}
            </a>
          ) : null}
        </div>
      )}
    </EditorialBlock>
  );
}

export function RelatedArticles({
  title = "Artigos relacionados",
  items = [],
  children,
}: {
  title?: string;
  items?: { title: string; href: string; description?: string }[];
  children?: ReactNode;
}) {
  if (!items.length) {
    return (
      <EditorialBlock eyebrow="Continue lendo" title={title}>
        {children}
      </EditorialBlock>
    );
  }

  return (
    <EditorialBlock eyebrow="Continue lendo" title={title}>
      <ul className={styles.list}>
        {items.map((item) => (
          <li className={styles.listItem} key={item.href}>
            <span className={styles.marker} aria-hidden="true" />
            <span>
              <a href={item.href}>{item.title}</a>
              {item.description ? <span> — {item.description}</span> : null}
            </span>
          </li>
        ))}
      </ul>
    </EditorialBlock>
  );
}
