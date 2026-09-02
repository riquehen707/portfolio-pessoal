"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

import { trackEvent } from "@/components/analytics/analytics";
import type { GlobalSearchItem, GlobalSearchItemType } from "@/lib/globalSearch";

import styles from "./GlobalSearch.module.scss";

type RankedItem = GlobalSearchItem & {
  score: number;
  reason: string;
};

const SearchIcon = HiOutlineMagnifyingGlass;

const typeLabels: Record<GlobalSearchItemType, string> = {
  article: "Artigo",
  idea: "Ideia",
  page: "Página",
  product: "Produto",
};

const typePriority: Record<GlobalSearchItemType, number> = {
  article: 8,
  idea: 7,
  page: 5,
  product: 7,
};

const quickQueries = ["SEO", "landing page", "clientes", "conteúdo", "tráfego", "vender online"];

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
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

function uniqStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function scoreItem(item: GlobalSearchItem, query: string): RankedItem | null {
  const tokens = tokenize(query);
  if (!tokens.length) return null;

  const title = normalize(item.title);
  const description = normalize(item.description);
  const label = normalize(item.label);
  const keywords = normalize(item.keywords.join(" "));
  const href = normalize(item.href);
  const haystack = `${title} ${description} ${label} ${keywords} ${href}`;
  const matchedTerms = uniqStrings(tokens.filter((token) => haystack.includes(token)));

  if (!matchedTerms.length) return null;

  let score = typePriority[item.type] + matchedTerms.length * 10;
  let reason = typeLabels[item.type];
  const normalizedQuery = normalize(query);

  if (title === normalizedQuery) {
    score += 80;
    reason = "Título exato";
  } else if (title.includes(normalizedQuery)) {
    score += 48;
    reason = "Título";
  } else if (description.includes(normalizedQuery)) {
    score += 24;
    reason = "Resumo";
  } else if (keywords.includes(normalizedQuery)) {
    score += 18;
    reason = "Relacionado";
  }

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

type SearchIndexResponse = {
  items: GlobalSearchItem[];
};

type LoadingState = "idle" | "loading" | "ready" | "error";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [items, setItems] = useState<GlobalSearchItem[]>([]);
  const [loadingState, setLoadingState] = useState<LoadingState>("idle");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const requestRef = useRef<Promise<void> | null>(null);
  const searchOpenedAtRef = useRef<number | null>(null);
  const router = useRouter();

  const loadSearchIndex = useCallback(() => {
    if (loadingState === "ready") return Promise.resolve();
    if (requestRef.current) return requestRef.current;

    setLoadingState("loading");
    const startedAt = performance.now();
    const request = fetch("/api/search-index", {
      headers: { Accept: "application/json" },
    })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Busca indisponivel (${response.status})`);
        const payload = (await response.json()) as SearchIndexResponse;
        if (!Array.isArray(payload.items)) throw new Error("Indice de busca invalido");
        setItems(payload.items);
        setLoadingState("ready");
        trackEvent("search_index_loaded", {
          duration_ms: Math.round(performance.now() - startedAt),
          item_count: payload.items.length,
        });
      })
      .catch(() => {
        setLoadingState("error");
        trackEvent("search_index_error", {
          duration_ms: Math.round(performance.now() - startedAt),
        });
      })
      .finally(() => {
        requestRef.current = null;
      });

    requestRef.current = request;
    return request;
  }, [loadingState]);

  const openSearch = useCallback((source: "button" | "keyboard") => {
    searchOpenedAtRef.current = performance.now();
    setOpen(true);
    trackEvent("search_open", { source });
    void loadSearchIndex();
  }, [loadSearchIndex]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return [...items]
        .slice(0, 8)
        .map((item, index) => ({
          ...item,
          score: 20 - index,
          reason: "Sugestão",
        }));
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
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openSearch("keyboard");
        return;
      }

      if (!isTyping && event.key === "/" && !open) {
        event.preventDefault();
        openSearch("keyboard");
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, openSearch]);

  useEffect(() => {
    const normalizedQuery = query.trim();
    if (!open || loadingState !== "ready" || normalizedQuery.length < 2) return;

    const timeout = window.setTimeout(() => {
      trackEvent("search_results", {
        query_length: normalizedQuery.length,
        query_token_count: tokenize(normalizedQuery).length,
        result_count: results.length,
        has_results: results.length > 0,
        time_since_open_ms: searchOpenedAtRef.current
          ? Math.round(performance.now() - searchOpenedAtRef.current)
          : undefined,
      });
    }, 600);

    return () => window.clearTimeout(timeout);
  }, [loadingState, open, query, results.length]);

  useEffect(() => {
    if (!open) return;

    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  function closeSearch() {
    setOpen(false);
    setQuery("");
  }

  function goToActive() {
    const item = results[activeIndex];
    if (!item) return;
    trackSearchSelection(item, activeIndex, "keyboard");
    closeSearch();
    router.push(item.href);
  }

  function trackSearchSelection(
    item: RankedItem,
    index: number,
    source: "click" | "keyboard",
  ) {
    trackEvent("search_result_click", {
      source,
      result_type: item.type,
      result_position: index + 1,
      match_reason: item.reason,
      had_query: Boolean(query.trim()),
    });
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
      <button
        className={styles.trigger}
        type="button"
        onClick={() => openSearch("button")}
        aria-label="Buscar no blog"
        aria-keyshortcuts="Control+K Meta+K"
      >
        <span className={styles.triggerIconShell} aria-hidden>
          <SearchIcon className={styles.triggerIcon} />
        </span>
        <span className={styles.triggerText}>
          <span className={styles.triggerLabel}>Buscar</span>
          <span className={styles.triggerHint}>Artigos, temas e guias</span>
        </span>
      </button>

      {open ? (
        <div className={styles.overlay} role="presentation" onMouseDown={closeSearch}>
          <dialog
            open
            className={styles.dialog}
            aria-modal="true"
            aria-label="Busca do blog"
            onKeyDown={handleDialogKeyDown}
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className={styles.dialogHeader}>
              <div className={styles.headerCopy}>
                <span className={styles.eyebrow}>Busca editorial</span>
                <h2>Buscar no blog</h2>
                <p>Digite um problema, tema ou palavra-chave.</p>
              </div>
            </div>

            <div className={styles.searchBar}>
              <SearchIcon aria-hidden className={styles.searchIcon} />
              <input
                ref={inputRef}
                className={styles.input}
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveIndex(0);
                }}
                placeholder="Busque artigos, temas e guias"
                type="search"
                autoComplete="off"
              />
              <button className={styles.closeButton} type="button" onClick={closeSearch}>
                Fechar
              </button>
            </div>

            <div className={styles.quickRow} aria-label="Sugestões de busca">
              {quickQueries.map((item) => (
                <button
                  className={styles.quickChip}
                  type="button"
                  key={item}
                  onClick={() => {
                    setQuery(item);
                    trackEvent("search_suggestion_click", {
                      suggestion_position: quickQueries.indexOf(item) + 1,
                    });
                  }}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className={styles.metaRow}>
              <span>
                {query.trim() ? `${results.length} resultados` : "Sugestões para começar"}
              </span>
              <span>{items.length} itens indexados</span>
            </div>

            <div className={styles.results} aria-label="Resultados da busca">
              {loadingState === "loading" || loadingState === "idle" ? (
                <div className={styles.searchStatus} role="status">
                  <strong>Preparando a busca...</strong>
                  <span>Carregando o índice editorial.</span>
                </div>
              ) : loadingState === "error" ? (
                <div className={styles.searchStatus} role="alert">
                  <strong>Não foi possível carregar a busca.</strong>
                  <span>Confira sua conexão e tente novamente.</span>
                  <button type="button" className={styles.retryButton} onClick={() => void loadSearchIndex()}>
                    Tentar novamente
                  </button>
                </div>
              ) : results.length > 0 ? (
                results.map((item, index) => (
                  <Link
                    className={styles.result}
                    data-active={activeIndex === index}
                    href={item.href}
                    key={item.id}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      trackSearchSelection(item, index, "click");
                      closeSearch();
                    }}
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
                  <span>Tente buscar por um problema, tema ou palavra mais curta.</span>
                </div>
              )}
            </div>
          </dialog>
        </div>
      ) : null}
    </>
  );
}
