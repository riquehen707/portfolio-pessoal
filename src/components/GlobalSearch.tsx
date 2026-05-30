"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

import { iconLibrary } from "@/resources/icons";
import type { GlobalSearchItem, GlobalSearchItemType } from "@/lib/globalSearch";

import styles from "./GlobalSearch.module.scss";

type GlobalSearchProps = {
  items: GlobalSearchItem[];
};

type RankedItem = GlobalSearchItem & {
  score: number;
  reason: string;
};

const SearchIcon = iconLibrary.seo;

const typeLabels: Record<GlobalSearchItemType, string> = {
  article: "Artigo",
  topic: "Tema",
  page: "Página",
  service: "Serviço",
  audience: "Público",
  project: "Projeto",
  product: "Produto",
};

const typePriority: Record<GlobalSearchItemType, number> = {
  article: 8,
  topic: 7,
  service: 6,
  page: 5,
  audience: 4,
  project: 3,
  product: 2,
};

const quickQueries = ["renda online", "SEO", "landing page", "diagnóstico", "serviços"];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s/-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(value: string) {
  return normalize(value)
    .split(" ")
    .filter((token) => token.length >= 2);
}

function scoreItem(item: GlobalSearchItem, query: string): RankedItem | null {
  const normalizedQuery = normalize(query);
  const tokens = tokenize(query);

  if (!normalizedQuery || tokens.length === 0) return null;

  const title = normalize(item.title);
  const description = normalize(item.description);
  const label = normalize(item.label);
  const keywords = normalize(item.keywords.join(" "));
  const href = normalize(item.href);
  const haystack = `${title} ${description} ${label} ${keywords} ${href}`;

  let score = typePriority[item.type];
  let reason = typeLabels[item.type];

  if (title === normalizedQuery) {
    score += 120;
    reason = "Titulo exato";
  } else if (title.includes(normalizedQuery)) {
    score += 70;
    reason = "Titulo";
  }

  if (label.includes(normalizedQuery)) {
    score += 36;
    reason = item.label;
  }

  if (description.includes(normalizedQuery)) {
    score += 26;
    reason = "Resumo";
  }

  if (keywords.includes(normalizedQuery)) {
    score += 22;
    reason = "Relacionado";
  }

  for (const token of tokens) {
    if (title.includes(token)) score += 18;
    if (label.includes(token)) score += 8;
    if (description.includes(token)) score += 6;
    if (keywords.includes(token)) score += 5;
    if (href.includes(token)) score += 3;
  }

  const matchedTokens = tokens.filter((token) => haystack.includes(token));
  if (matchedTokens.length === 0) return null;

  score += Math.round((matchedTokens.length / tokens.length) * 18);

  if (item.type === "article" && tokens.length > 1) score += 8;
  if (item.type === "topic" && matchedTokens.length >= 1) score += 7;

  return { ...item, score, reason };
}

function formatDate(value?: string) {
  if (!value) return "";

  const date = new Date(value);
  if (!Number.isFinite(date.getTime())) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    month: "short",
    year: "numeric",
  }).format(date);
}

export function GlobalSearch({ items }: GlobalSearchProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const results = useMemo(() => {
    if (!query.trim()) {
      return [...items]
        .filter((item) => item.type === "article" || item.type === "service" || item.type === "page")
        .slice(0, 8)
        .map((item, index) => ({ ...item, score: 20 - index, reason: "Sugestão" }));
    }

    return items
      .map((item) => scoreItem(item, query))
      .filter((item): item is RankedItem => Boolean(item))
      .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
      .slice(0, 9);
  }, [items, query]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen(true);
        return;
      }

      if (!isTyping && event.key === "/" && !open) {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  function closeSearch() {
    setOpen(false);
    setQuery("");
  }

  function goToActive() {
    const item = results[activeIndex];
    if (!item) return;
    closeSearch();
    router.push(item.href);
  }

  function handleDialogKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch();
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, Math.max(results.length - 1, 0)));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    }

    if (event.key === "Enter") {
      event.preventDefault();
      goToActive();
    }
  }

  return (
    <>
      <button className={styles.trigger} type="button" onClick={() => setOpen(true)}>
        <SearchIcon aria-hidden className={styles.triggerIcon} />
        <span className={styles.triggerLabel}>Buscar</span>
        <span className={styles.shortcut} aria-hidden>
          Ctrl K
        </span>
      </button>

      {open ? (
        <div className={styles.overlay} role="presentation" onMouseDown={closeSearch}>
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-label="Busca do site"
            onKeyDown={handleDialogKeyDown}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.dialogHeader}>
              <span className={styles.eyebrow}>Busca inteligente</span>
              <div className={styles.headerCopy}>
                <h2>Encontre o próximo conteúdo certo.</h2>
                <p>Pesquise artigos, temas, serviços, públicos, projetos e páginas do site.</p>
              </div>
            </div>

            <div className={styles.searchBar}>
              <SearchIcon aria-hidden className={styles.searchIcon} />
              <input
                ref={inputRef}
                className={styles.input}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Busque artigos, temas, serviços e projetos"
                type="search"
                autoComplete="off"
              />
              <button className={styles.closeButton} type="button" onClick={closeSearch}>
                Esc
              </button>
            </div>

            <div className={styles.quickRow} aria-label="Sugestões de busca">
              {quickQueries.map((item) => (
                <button className={styles.quickChip} type="button" key={item} onClick={() => setQuery(item)}>
                  {item}
                </button>
              ))}
            </div>

            <div className={styles.metaRow}>
              <span>{query.trim() ? `${results.length} resultados` : "Sugestões para começar"}</span>
              <span>Use setas e Enter</span>
            </div>

            <div className={styles.results} role="listbox" aria-label="Resultados da busca">
              {results.length > 0 ? (
                results.map((item, index) => (
                  <Link
                    className={styles.result}
                    data-active={activeIndex === index}
                    href={item.href}
                    key={item.id}
                    role="option"
                    aria-selected={activeIndex === index}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={closeSearch}
                  >
                    <span className={styles.resultType}>
                      <span className={styles.typeDot} aria-hidden />
                      {typeLabels[item.type]}
                    </span>
                    <span className={styles.resultBody}>
                      <span className={styles.resultTitle}>{item.title}</span>
                      <span className={styles.resultDescription}>{item.description}</span>
                      <span className={styles.resultMeta}>
                        <span>{item.label}</span>
                        {formatDate(item.date) ? <span>{formatDate(item.date)}</span> : null}
                        <span>{item.reason}</span>
                      </span>
                    </span>
                    <span className={styles.resultArrow} aria-hidden>
                      {">"}
                    </span>
                  </Link>
                ))
              ) : (
                <div className={styles.empty}>
                  <strong>Nada encontrado.</strong>
                  <span>Tente buscar por um problema, serviço, tema ou palavra mais curta.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
