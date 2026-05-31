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
  matchedTerms: string[];
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

const quickQueries = [
  "ganhar dinheiro",
  "vender online",
  "SEO",
  "landing page",
  "diagnóstico",
  "clientes",
];

const intentGroups = [
  {
    label: "Renda online",
    triggers: ["ganhar dinheiro", "renda", "renda extra", "monetizar", "internet"],
    boosts: [
      "renda online",
      "freelancer",
      "trabalho remoto",
      "produtos digitais",
      "afiliados",
      "vender",
    ],
  },
  {
    label: "Vendas",
    triggers: ["vender", "vendas", "oferta", "produto", "serviço", "servico", "cliente"],
    boosts: ["vendas", "oferta", "clientes", "marketing", "serviços", "produtos", "loja"],
  },
  {
    label: "SEO e conteúdo",
    triggers: ["seo", "google", "conteúdo", "conteudo", "blog", "artigo", "tráfego", "trafego"],
    boosts: ["seo", "conteúdo", "blog", "google", "tráfego", "pesquisa", "palavra-chave"],
  },
  {
    label: "Site e conversão",
    triggers: ["site", "landing", "pagina", "página", "conversão", "conversao", "lead"],
    boosts: ["site", "landing page", "conversão", "cta", "página", "leads", "websites"],
  },
  {
    label: "Diagnóstico",
    triggers: ["diagnóstico", "diagnostico", "planejamento", "margem", "receita", "custo"],
    boosts: ["diagnóstico", "planejamento", "margem", "receita", "custos", "retorno"],
  },
];

const tokenSynonyms: Record<string, string[]> = {
  dinheiro: ["renda", "monetizar", "vender"],
  renda: ["dinheiro", "monetizar", "freelancer"],
  internet: ["online", "digital"],
  online: ["internet", "digital"],
  vender: ["vendas", "oferta", "produto", "serviço", "servico"],
  vendas: ["vender", "oferta", "clientes"],
  cliente: ["clientes", "lead", "captação", "captacao"],
  clientes: ["cliente", "leads", "captação", "captacao"],
  site: ["website", "websites", "landing", "página", "pagina"],
  pagina: ["página", "landing", "site"],
  página: ["pagina", "landing", "site"],
  seo: ["google", "busca", "tráfego", "trafego"],
  trafego: ["tráfego", "visitas", "seo"],
  tráfego: ["trafego", "visitas", "seo"],
  diagnostico: ["diagnóstico", "planejamento", "análise", "analise"],
  diagnóstico: ["diagnostico", "planejamento", "análise", "analise"],
};

type QueryAnalysis = {
  normalizedQuery: string;
  tokens: string[];
  expandedTokens: string[];
  intentLabels: string[];
};

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

function uniqStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function analyzeQuery(query: string): QueryAnalysis {
  const normalizedQuery = normalize(query);
  const tokens = tokenize(query);
  const expanded = new Set(tokens);
  const intentLabels: string[] = [];

  for (const token of tokens) {
    tokenSynonyms[token]?.forEach((synonym) =>
      tokenize(synonym).forEach((value) => expanded.add(value)),
    );
  }

  for (const group of intentGroups) {
    const hasIntent = group.triggers.some((trigger) => {
      const normalizedTrigger = normalize(trigger);
      const triggerTokens = tokenize(trigger);

      return (
        normalizedQuery.includes(normalizedTrigger) ||
        triggerTokens.every((token) => tokens.includes(token))
      );
    });

    if (hasIntent) {
      intentLabels.push(group.label);
      group.boosts.forEach((boost) => tokenize(boost).forEach((value) => expanded.add(value)));
    }
  }

  return {
    normalizedQuery,
    tokens,
    expandedTokens: Array.from(expanded).slice(0, 18),
    intentLabels: uniqStrings(intentLabels),
  };
}

function editDistance(left: string, right: string) {
  if (left === right) return 0;
  if (!left.length) return right.length;
  if (!right.length) return left.length;

  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);
  const current = Array.from({ length: right.length + 1 }, () => 0);

  for (let i = 1; i <= left.length; i += 1) {
    current[0] = i;

    for (let j = 1; j <= right.length; j += 1) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      current[j] = Math.min(current[j - 1] + 1, previous[j] + 1, previous[j - 1] + cost);
    }

    for (let j = 0; j <= right.length; j += 1) previous[j] = current[j];
  }

  return previous[right.length];
}

function tokenMatches(value: string, token: string) {
  if (value.includes(token)) return true;

  if (token.length < 4) return false;

  return tokenize(value).some((word) => {
    if (word.startsWith(token) || token.startsWith(word)) return true;
    if (Math.abs(word.length - token.length) > 2) return false;
    return editDistance(word, token) <= (token.length <= 5 ? 1 : 2);
  });
}

function matchedTokens(value: string, tokens: string[]) {
  const normalizedValue = normalize(value);
  return tokens.filter((token) => tokenMatches(normalizedValue, token));
}

function scoreItem(item: GlobalSearchItem, analysis: QueryAnalysis): RankedItem | null {
  const { normalizedQuery, tokens, expandedTokens, intentLabels } = analysis;

  if (!normalizedQuery || tokens.length === 0) return null;

  const title = normalize(item.title);
  const description = normalize(item.description);
  const label = normalize(item.label);
  const keywords = normalize(item.keywords.join(" "));
  const href = normalize(item.href);
  const haystack = `${title} ${description} ${label} ${keywords} ${href}`;

  let score = typePriority[item.type];
  let reason = typeLabels[item.type];
  const titleMatches = matchedTokens(title, tokens);
  const labelMatches = matchedTokens(label, tokens);
  const descriptionMatches = matchedTokens(description, tokens);
  const keywordMatches = matchedTokens(keywords, tokens);
  const expandedMatches = matchedTokens(haystack, expandedTokens);
  const directMatches = uniqStrings([
    ...titleMatches,
    ...labelMatches,
    ...descriptionMatches,
    ...keywordMatches,
  ]);

  if (title === normalizedQuery) {
    score += 120;
    reason = "Título exato";
  } else if (title.includes(normalizedQuery)) {
    score += 70;
    reason = "Título";
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

  score += titleMatches.length * 22;
  score += labelMatches.length * 10;
  score += descriptionMatches.length * 7;
  score += keywordMatches.length * 6;
  score += matchedTokens(href, tokens).length * 4;

  if (titleMatches.length > 0 && reason === typeLabels[item.type]) {
    reason = "Título";
  } else if (descriptionMatches.length > 0 && reason === typeLabels[item.type]) {
    reason = "Resumo";
  } else if (expandedMatches.length > directMatches.length && reason === typeLabels[item.type]) {
    reason = intentLabels[0] ? `Intenção: ${intentLabels[0]}` : "Termos relacionados";
  }

  const directRatio = directMatches.length / tokens.length;
  const expandedRatio = expandedMatches.length / Math.max(expandedTokens.length, 1);

  if (directMatches.length === 0 && expandedMatches.length < Math.min(2, expandedTokens.length))
    return null;

  score += Math.round(directRatio * 32);
  score += Math.min(expandedMatches.length, 8) * 3;

  for (const intentLabel of intentLabels) {
    const group = intentGroups.find((itemGroup) => itemGroup.label === intentLabel);
    if (!group) continue;

    const groupMatches = matchedTokens(haystack, group.boosts.flatMap(tokenize));
    if (groupMatches.length) score += Math.min(groupMatches.length, 5) * 4;
  }

  if (item.type === "article" && tokens.length > 1) score += 8;
  if (item.type === "topic" && directMatches.length >= 1) score += 7;
  if (
    item.type === "service" &&
    intentLabels.some((intent) => intent.includes("Site") || intent.includes("Vendas"))
  ) {
    score += 5;
  }

  return {
    ...item,
    score,
    reason,
    matchedTerms: uniqStrings([...directMatches, ...expandedMatches]).slice(0, 4),
  };
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
  const queryAnalysis = useMemo(() => analyzeQuery(query), [query]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return [...items]
        .filter(
          (item) => item.type === "article" || item.type === "service" || item.type === "page",
        )
        .slice(0, 8)
        .map((item, index) => ({
          ...item,
          score: 20 - index,
          reason: "Sugestão",
          matchedTerms: [],
        }));
    }

    return items
      .map((item) => scoreItem(item, queryAnalysis))
      .filter((item): item is RankedItem => Boolean(item))
      .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
      .slice(0, 9);
  }, [items, query, queryAnalysis]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable;

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
      <button
        className={styles.trigger}
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Buscar no site"
        aria-keyshortcuts="Control+K Meta+K"
      >
        <span className={styles.triggerIconShell} aria-hidden>
          <SearchIcon className={styles.triggerIcon} />
        </span>
        <span className={styles.triggerText}>
          <span className={styles.triggerLabel}>Buscar no site</span>
          <span className={styles.triggerHint}>Artigos, temas e serviços</span>
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
              <div className={styles.headerCopy}>
                <span className={styles.eyebrow}>Busca inteligente</span>
                <h2>Buscar no site</h2>
                <p>Digite um problema, tema, serviço ou palavra-chave.</p>
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
                Fechar
              </button>
            </div>

            {queryAnalysis.intentLabels.length > 0 ? (
              <div className={styles.intentRow} aria-label="Intenções identificadas">
                {queryAnalysis.intentLabels.map((intent) => (
                  <span className={styles.intentChip} key={intent}>
                    {intent}
                  </span>
                ))}
              </div>
            ) : null}

            <div className={styles.quickRow} aria-label="Sugestões de busca">
              {quickQueries.map((item) => (
                <button
                  className={styles.quickChip}
                  type="button"
                  key={item}
                  onClick={() => setQuery(item)}
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
                      {item.matchedTerms.length ? (
                        <span className={styles.termRow} aria-label="Termos relacionados">
                          {item.matchedTerms.map((term) => (
                            <span className={styles.termChip} key={term}>
                              {term}
                            </span>
                          ))}
                        </span>
                      ) : null}
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
