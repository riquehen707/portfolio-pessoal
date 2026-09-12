"use client";

import { useCallback, useState } from "react";
import type { KeyboardEvent } from "react";

import { AnimatePresence, m, type PanInfo, useReducedMotion } from "framer-motion";
import Link from "next/link";

import styles from "./HeroShowCase.module.scss";

type HeroSlide = {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  cta: string;
  href: string;
  visualLabel: string;
  visualTitle: string;
  visualMeta: string;
  secondaryTitle: string;
  secondaryMeta: string;
  tertiaryTitle: string;
};

const slides: HeroSlide[] = [
  {
    id: "sites",
    eyebrow: "Desenvolvimento web",
    title: "Sites que",
    highlight: "trabalham por você.",
    description:
      "Projetos rápidos, personalizados e pensados para transformar visitas em oportunidades reais de negócio.",
    cta: "Conheça meu trabalho",
    href: "/portfolio",
    visualLabel: "Projeto em destaque",
    visualTitle: "Presença digital com função",
    visualMeta: "Design · Desenvolvimento · Conversão",
    secondaryTitle: "Portfólio profissional",
    secondaryMeta: "Identidade + conteúdo",
    tertiaryTitle: "Landing pages",
  },
  {
    id: "conteudo",
    eyebrow: "Conteúdo & descoberta",
    title: "Conteúdo feito para",
    highlight: "ser encontrado.",
    description:
      "Artigos, coleções e páginas construídas para continuar úteis depois da publicação e ganhar espaço nas buscas.",
    cta: "Explorar conteúdos",
    href: "/blogs",
    visualLabel: "Biblioteca editorial",
    visualTitle: "Conteúdo que continua trabalhando",
    visualMeta: "SEO · Pesquisa · Arquitetura",
    secondaryTitle: "Guias e listas",
    secondaryMeta: "Evergreen + busca",
    tertiaryTitle: "Coleções",
  },
  {
    id: "ferramentas",
    eyebrow: "Produtos & experimentos",
    title: "Ideias que viram",
    highlight: "coisas utilizáveis.",
    description:
      "Ferramentas, interfaces e experimentos digitais construídos para resolver problemas de forma simples.",
    cta: "Ver ferramentas",
    href: "/ferramentas",
    visualLabel: "Produto digital",
    visualTitle: "Interface antes de decoração",
    visualMeta: "Produto · UX · Implementação",
    secondaryTitle: "Experimentos",
    secondaryMeta: "Código + interação",
    tertiaryTitle: "Projetos públicos",
  },
];

export function HeroShowcase() {
  const reducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = slides[activeIndex];

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const goNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % slides.length);
  }, []);

  const goPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  }, []);

  const handleDragEnd = useCallback(
    (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const threshold = 55;

      if (info.offset.x <= -threshold) {
        goNext();
        return;
      }

      if (info.offset.x >= threshold) {
        goPrevious();
      }
    },
    [goNext, goPrevious],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === "ArrowRight") {
        goNext();
      }

      if (event.key === "ArrowLeft") {
        goPrevious();
      }
    },
    [goNext, goPrevious],
  );

  return (
    <section
      className={styles.root}
      aria-label="Apresentação"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className={styles.shell}>
        <nav className={styles.rail} aria-label="Navegação do destaque">
          <span className={styles.railLine} aria-hidden="true" />

          <div className={styles.railItems}>
            {slides.map((slide, index) => {
              const active = index === activeIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  className={styles.railButton}
                  data-active={active}
                  aria-label={`Mostrar ${slide.eyebrow}`}
                  aria-current={active ? "true" : undefined}
                  onClick={() => goToSlide(index)}
                >
                  <span className={styles.railDot} aria-hidden="true" />

                  <span className={styles.railIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className={styles.copy}>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={activeSlide.id}
              className={styles.copyInner}
              initial={
                reducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      y: 18,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={
                reducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      y: -12,
                    }
              }
              transition={{
                duration: reducedMotion ? 0.01 : 0.38,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className={styles.eyebrow}>{activeSlide.eyebrow}</p>

              <h1 className={styles.title}>
                {activeSlide.title}
                <span>{activeSlide.highlight}</span>
              </h1>

              <p className={styles.description}>{activeSlide.description}</p>

              <div className={styles.actions}>
                <Link
                  href={activeSlide.href}
                  className={styles.primaryAction}
                  data-analytics-event="cta_click"
                  data-analytics-label={activeSlide.cta}
                  data-analytics-location="home_hero"
                  data-analytics-type="primary"
                >
                  <span>{activeSlide.cta}</span>
                  <span className={styles.actionArrow} aria-hidden="true">
                    →
                  </span>
                </Link>

                <Link
                  href="/sobre"
                  className={styles.secondaryAction}
                  data-analytics-event="cta_click"
                  data-analytics-label="Sobre mim"
                  data-analytics-location="home_hero"
                  data-analytics-type="secondary"
                >
                  Sobre mim
                </Link>
              </div>

              <div className={styles.mobileProgress} aria-hidden="true">
                <span>
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>

                <span className={styles.mobileProgressLine}>
                  <span
                    style={{
                      width: `${((activeIndex + 1) / slides.length) * 100}%`,
                    }}
                  />
                </span>

                <span>{String(slides.length).padStart(2, "0")}</span>
              </div>
            </m.div>
          </AnimatePresence>
        </div>

        <div className={styles.showcase}>
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={activeSlide.id}
              className={styles.stage}
              drag={reducedMotion ? false : "x"}
              dragConstraints={{
                left: 0,
                right: 0,
              }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
              initial={
                reducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      x: 35,
                      scale: 0.985,
                    }
              }
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              exit={
                reducedMotion
                  ? { opacity: 1 }
                  : {
                      opacity: 0,
                      x: -28,
                      scale: 0.99,
                    }
              }
              transition={{
                duration: reducedMotion ? 0.01 : 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <article className={`${styles.mockCard} ${styles.primaryCard}`}>
                <div className={styles.browserBar}>
                  <div className={styles.browserDots} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>

                  <span className={styles.browserAddress}>
                    henrique.dog
                  </span>
                </div>

                <div className={styles.mockContent}>
                  <div className={styles.mockTop}>
                    <span className={styles.mockMark} />

                    <span className={styles.mockMenu}>
                      <i />
                      <i />
                      <i />
                    </span>
                  </div>

                  <div className={styles.mockHero}>
                    <span className={styles.mockEyebrow}>
                      {activeSlide.visualLabel}
                    </span>

                    <strong>{activeSlide.visualTitle}</strong>

                    <span className={styles.mockMeta}>
                      {activeSlide.visualMeta}
                    </span>

                    <span className={styles.mockButton}>
                      Explorar
                      <span>→</span>
                    </span>
                  </div>

                  <div className={styles.mockGrid}>
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </article>

              <article className={`${styles.mockCard} ${styles.secondaryCard}`}>
                <div className={styles.miniBrowserBar}>
                  <span />
                  <span />
                  <span />
                </div>

                <div className={styles.secondaryVisual}>
                  <span className={styles.secondaryNumber}>
                    0{activeIndex + 1}
                  </span>

                  <div>
                    <strong>{activeSlide.secondaryTitle}</strong>
                    <p>{activeSlide.secondaryMeta}</p>
                  </div>

                  <span className={styles.secondaryGraphic} />
                </div>
              </article>

              <article className={`${styles.mockCard} ${styles.tertiaryCard}`}>
                <div className={styles.tertiaryContent}>
                  <span>0{activeIndex + 1}</span>

                  <strong>{activeSlide.tertiaryTitle}</strong>

                  <div className={styles.tertiaryLines}>
                    <i />
                    <i />
                    <i />
                  </div>
                </div>
              </article>

              <div className={styles.swipeHint} aria-hidden="true">
                <span>Arraste</span>
                <span>←</span>
                <span>→</span>
              </div>
            </m.div>
          </AnimatePresence>

          <div className={styles.desktopControls}>
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Destaque anterior"
            >
              ←
            </button>

            <span>
              {String(activeIndex + 1).padStart(2, "0")}
              <i />
              {String(slides.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={goNext}
              aria-label="Próximo destaque"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}