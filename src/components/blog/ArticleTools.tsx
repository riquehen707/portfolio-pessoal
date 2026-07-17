"use client";

import { useEffect, useMemo, useState } from "react";

import { createPortal } from "react-dom";

import styles from "./ArticleTools.module.scss";

type TocItem = {
  id: string;
  text: string;
};

type ArticleToolsProps = {
  articleId?: string;
  title: string;
  readingTime?: number;
  url: string;
};

export function ArticleTools({
  articleId = "article-content",
  title,
  readingTime,
  url,
}: ArticleToolsProps) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [focusMode, setFocusMode] = useState(false);
  const [status, setStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [mobileTocSlot, setMobileTocSlot] = useState<HTMLElement | null>(null);

  const absoluteUrl = useMemo(() => {
    if (typeof window === "undefined") return url;
    return new URL(url, window.location.origin).toString();
  }, [url]);

  useEffect(() => {
    const container = document.getElementById(articleId);
    if (!container) return;

    setMobileTocSlot(document.getElementById("article-mobile-toc-slot"));

    const headings = Array.from(container.querySelectorAll("h2[id]")).map((heading) => ({
      id: heading.id,
      text: heading.textContent?.trim() ?? "",
    }));

    setItems(headings.filter((item) => item.id && item.text));
  }, [articleId]);

  useEffect(() => {
    const container = document.getElementById(articleId);
    if (!container) return;

    let ticking = false;
    const updateProgress = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const start = window.scrollY + rect.top;
        const available = Math.max(container.offsetHeight - window.innerHeight, 1);
        const current = Math.min(Math.max(window.scrollY - start, 0), available);
        setProgress(current / available);
        ticking = false;
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
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

  function scrollTop() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  const renderToc = () =>
    items.map((item) => (
      <a
        className={styles.tocLink}
        data-active={activeId === item.id}
        href={`#${item.id}`}
        key={item.id}
      >
        {item.text}
      </a>
    ));

  const mobileToc = items.length ? (
    <details className={styles.mobileToc}>
      <summary>Neste artigo</summary>
      <nav className={styles.toc} aria-label="Seções do artigo">
        {renderToc()}
      </nav>
    </details>
  ) : null;

  return (
    <>
      <div
        className={styles.progress}
        style={{ transform: `scaleX(${progress})` }}
        role="progressbar"
        aria-label="Progresso de leitura"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      />
      {mobileTocSlot && mobileToc ? createPortal(mobileToc, mobileTocSlot) : mobileToc}
      <aside className={styles.rail} aria-label="Ferramentas do artigo">
        <section className={styles.section}>
          <span className={styles.label}>Índice</span>
          <nav className={styles.toc} aria-label="Seções do artigo">
            {items.length ? (
              renderToc()
            ) : (
              <p className={styles.summary}>As seções aparecem quando o artigo carrega.</p>
            )}
          </nav>
        </section>

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

      </aside>
    </>
  );
}
