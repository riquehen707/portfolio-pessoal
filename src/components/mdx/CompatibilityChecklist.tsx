"use client";

import { useId, useState } from "react";

import styles from "./CompatibilityChecklist.module.scss";

export type CompatibilityChecklistGroup = {
  title: string;
  items: string[];
};

export function CompatibilityChecklist({
  title = "Checklist de compatibilidade",
  description,
  groups,
  data,
}: {
  title?: string;
  description?: string;
  groups?: CompatibilityChecklistGroup[];
  data?: string;
}) {
  const id = useId();
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  let parsedGroups = groups ?? [];
  if (!parsedGroups.length && data) {
    try {
      const parsed = JSON.parse(data) as unknown;
      parsedGroups = Array.isArray(parsed)
        ? parsed.filter(
            (group): group is CompatibilityChecklistGroup =>
              !!group &&
              typeof group === "object" &&
              "title" in group &&
              typeof group.title === "string" &&
              "items" in group &&
              Array.isArray(group.items) &&
              group.items.every((item: unknown) => typeof item === "string"),
          )
        : [];
    } catch {
      parsedGroups = [];
    }
  }
  const total = parsedGroups.reduce((sum, group) => sum + group.items.length, 0);
  const completed = Object.values(checked).filter(Boolean).length;

  return (
    <section className={styles.block} aria-labelledby={`${id}-title`}>
      <header className={styles.header}>
        <span className={styles.eyebrow}>Verificação</span>
        <h3 id={`${id}-title`} className={styles.title}>
          {title}
        </h3>
        {description ? <p className={styles.description}>{description}</p> : null}
        <p className={styles.progress} aria-live="polite">
          {completed} de {total} itens marcados
        </p>
      </header>

      {total === 0 ? (
        <p className={styles.empty}>Nenhum item foi configurado para este checklist.</p>
      ) : null}

      <div className={styles.groups}>
        {parsedGroups.map((group, groupIndex) => (
          <fieldset className={styles.group} key={group.title}>
            <legend>{group.title}</legend>
            <div className={styles.items}>
              {group.items.map((item, itemIndex) => {
                const itemId = `${id}-${groupIndex}-${itemIndex}`;
                return (
                  <label className={styles.item} htmlFor={itemId} key={item}>
                    <input
                      id={itemId}
                      type="checkbox"
                      checked={!!checked[itemId]}
                      onChange={(event) =>
                        setChecked((current) => ({
                          ...current,
                          [itemId]: event.target.checked,
                        }))
                      }
                    />
                    <span>{item}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        ))}
      </div>
    </section>
  );
}

export default CompatibilityChecklist;
