"use client";

import { useEffect, useMemo, useState } from "react";

import styles from "./ArticleTools.module.scss";

type TocItem = {
  id: string;
  text: string;
};

type ArticleToolsProps = {
  articleId?: string;
  title: string;
  summary?: string;
  readingTime?: number;
  url: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function ArticleTools({
  articleId = "article-content",
  title,
  summary,
  readingTime,
  url,
}: ArticleToolsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const [focusMode, setFocusMode] = useState(false);
  const [status, setStatus] = useState("");

  const absoluteUrl = useMemo(() => {
    if (typeof window === "undefined") return url;
    return new URL(url, window.location.origin).toString();
  }, [url]);

  useEffect(() => {
    const container = document.getElementById(articleId);
    if (!container) return;

    const headings = Array.from(container.querySelectorAll("h2[id]")).map((heading) => ({
      id: heading.id,
      text: heading.textContent?.trim() ?? "",
    }));

    setItems(headings.filter((item) => item.id && item.text));
  }, [articleId]);

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -68% 0px",
        threshold: [0.1, 0.4, 0.8],
      },
    );

    items.forEach((item) => {
      const heading = document.getElementById(item.id);
      if (heading) observer.observe(heading);
    });

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    document.documentElement.style.setProperty("--article-font-scale", String(scale));
  }, [scale]);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-article-focus", focusMode);

    return () => {
      document.documentElement.removeAttribute("data-article-focus");
    };
  }, [focusMode]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(absoluteUrl);
      setStatus("Link copiado.");
    } catch {
      setStatus("Não foi possível copiar.");
    }
  }

  async function shareArticle() {
    try {
      if (navigator.share) {
        await navigator.share({
          title,
          text: summary,
          url: absoluteUrl,
        });
        setStatus("Compartilhamento aberto.");
        return;
      }

      await navigator.clipboard.writeText(absoluteUrl);
      setStatus("Link copiado para compartilhar.");
    } catch {
      setStatus("Compartilhamento cancelado.");
    }
  }

  function changeScale(delta: number) {
    setScale((current) => clamp(Number((current + delta).toFixed(2)), 0.92, 1.16));
  }

  function scrollTop() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  return (
    <aside className={styles.rail} aria-label="Ferramentas do artigo">
      <section className={styles.section}>
        <span className={styles.label}>Índice</span>
        <nav className={styles.toc} aria-label="Seções do artigo">
          {items.length ? (
            items.map((item) => (
              <a
                className={styles.tocLink}
                data-active={activeId === item.id}
                href={`#${item.id}`}
                key={item.id}
              >
                {item.text}
              </a>
            ))
          ) : (
            <p className={styles.summary}>As seções aparecem quando o artigo carrega.</p>
          )}
        </nav>
      </section>

      {summary ? (
        <section className={styles.section}>
          <span className={styles.label}>Resumo rápido</span>
          <p className={styles.summary}>{summary}</p>
        </section>
      ) : null}

      <section className={styles.section}>
        <span className={styles.label}>Leitura</span>
        <span className={styles.readingTime}>
          {readingTime ? `${readingTime} min` : "Tempo curto"}
        </span>
      </section>

      <section className={styles.section}>
        <span className={styles.label}>Ferramentas</span>
        <div className={styles.actions}>
          <button className={styles.button} type="button" onClick={copyLink}>
            Copiar link
          </button>
          <button className={styles.button} type="button" onClick={shareArticle}>
            Compartilhar
          </button>
          <button
            className={styles.button}
            data-active={focusMode}
            type="button"
            onClick={() => setFocusMode((current) => !current)}
          >
            Modo foco
          </button>
          <button className={styles.button} type="button" onClick={scrollTop}>
            Voltar ao topo
          </button>
        </div>
        <div className={styles.status} role="status" aria-live="polite">
          {status}
        </div>
      </section>

      <section className={styles.section}>
        <span className={styles.label}>Texto</span>
        <div className={styles.stepper} aria-label="Ajustar tamanho da fonte">
          <button
            className={styles.stepperButton}
            type="button"
            onClick={() => changeScale(-0.04)}
            aria-label="Diminuir fonte"
          >
            A-
          </button>
          <span className={styles.scaleValue}>{Math.round(scale * 100)}%</span>
          <button
            className={styles.stepperButton}
            type="button"
            onClick={() => changeScale(0.04)}
            aria-label="Aumentar fonte"
          >
            A+
          </button>
        </div>
      </section>
    </aside>
  );
}
