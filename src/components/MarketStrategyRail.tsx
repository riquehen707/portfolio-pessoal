"use client";

import { type CSSProperties, type KeyboardEvent, useEffect, useRef, useState } from "react";

import classNames from "classnames";

import { Column, Heading, Icon, Row, Tag, Text } from "@once-ui-system/core";

import { IconName } from "@/resources/icons";

import styles from "./MarketStrategyRail.module.scss";

type MarketStrategyItem = {
  title: string;
  icon: IconName;
  bullets: string[];
  insight: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
};

const marketStrategies: MarketStrategyItem[] = [
  {
    title: "Alimentação",
    icon: "send",
    bullets: ["Pedidos recorrentes", "Ticket médio maior", "Menos dependência de apps"],
    insight:
      "Oferta, pedido e recompra precisam conversar. O digital aqui funciona melhor quando simplifica decisão e cria retorno.",
    accent: "#ff8b3d",
    accentSoft: "rgba(255, 139, 61, 0.18)",
    accentBorder: "rgba(255, 139, 61, 0.34)",
  },
  {
    title: "Imóveis",
    icon: "globe",
    bullets: ["Leads qualificados", "Mais confiança", "Resposta rápida"],
    insight:
      "A operação precisa filtrar curiosos, valorizar prova social e reduzir tempo entre interesse e resposta comercial.",
    accent: "#5e97ff",
    accentSoft: "rgba(94, 151, 255, 0.18)",
    accentBorder: "rgba(94, 151, 255, 0.34)",
  },
  {
    title: "Estética",
    icon: "calendar",
    bullets: ["Agenda previsível", "Imagem premium", "Fidelização"],
    insight:
      "O ganho vem de percepção de valor, recorrência e rotina operacional. A estratégia precisa proteger agenda e marca ao mesmo tempo.",
    accent: "#ff6e96",
    accentSoft: "rgba(255, 110, 150, 0.18)",
    accentBorder: "rgba(255, 110, 150, 0.34)",
  },
  {
    title: "Serviços Profissionais",
    icon: "person",
    bullets: [
      "Autoridade digital",
      "Reputação sólida",
      "Comunicação compatível com exigências éticas",
    ],
    insight:
      "Antes do contato, o cliente já precisa sentir clareza, segurança e compatibilidade. O digital entra como filtro de confiança.",
    accent: "#7fd7b9",
    accentSoft: "rgba(127, 215, 185, 0.18)",
    accentBorder: "rgba(127, 215, 185, 0.34)",
  },
];

function scrollElementIntoCenter(
  viewport: HTMLDivElement | null,
  element: HTMLElement | null,
  behavior: ScrollBehavior = "smooth",
) {
  if (!viewport || !element) {
    return;
  }

  const viewportRect = viewport.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();
  const centeredOffset =
    elementRect.left - viewportRect.left - (viewportRect.width - elementRect.width) / 2;

  viewport.scrollTo({
    left: viewport.scrollLeft + centeredOffset,
    behavior,
  });
}

export function MarketStrategyRail() {
  const tabsViewportRef = useRef<HTMLDivElement>(null);
  const cardsViewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const scrollCardIntoView = (index: number, behavior: ScrollBehavior = "smooth") => {
    scrollElementIntoCenter(cardsViewportRef.current, cardRefs.current[index], behavior);
  };

  const scrollTabIntoView = (index: number, behavior: ScrollBehavior = "smooth") => {
    const tabsViewport = tabsViewportRef.current;
    const activeButton = tabsViewport?.querySelector<HTMLElement>(`[data-tab-index="${index}"]`);

    scrollElementIntoCenter(tabsViewport ?? null, activeButton ?? null, behavior);
  };

  const selectMarket = (index: number, behavior: ScrollBehavior = "smooth") => {
    setActiveIndex(index);
    scrollCardIntoView(index, behavior);
    scrollTabIntoView(index, behavior);
  };

  useEffect(() => {
    const viewport = cardsViewportRef.current;

    if (!viewport) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        let bestIndex = -1;
        let bestRatio = 0;

        for (const entry of entries) {
          const index = Number((entry.target as HTMLElement).dataset.index);

          if (entry.intersectionRatio > bestRatio) {
            bestIndex = index;
            bestRatio = entry.intersectionRatio;
          }
        }

        if (bestRatio >= 0.58) {
          setActiveIndex((current) => (current === bestIndex ? current : bestIndex));
        }
      },
      {
        root: viewport,
        threshold: [0.36, 0.58, 0.78],
      },
    );

    for (const card of cardRefs.current) {
      if (card) {
        observer.observe(card);
      }
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    scrollTabIntoView(activeIndex);
  }, [activeIndex]);

  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) {
      return;
    }

    event.preventDefault();

    const lastIndex = marketStrategies.length - 1;
    let targetIndex = activeIndex;

    if (event.key === "Home") {
      targetIndex = 0;
    } else if (event.key === "End") {
      targetIndex = lastIndex;
    } else {
      const direction = event.key === "ArrowRight" ? 1 : -1;
      targetIndex = (activeIndex + direction + marketStrategies.length) % marketStrategies.length;
    }

    selectMarket(targetIndex);

    window.requestAnimationFrame(() => {
      const targetButton = tabsViewportRef.current?.querySelector<HTMLButtonElement>(
        `[data-tab-index="${targetIndex}"]`,
      );

      targetButton?.focus();
    });
  };

  return (
    <section className={styles.section} aria-labelledby="market-strategy-heading">
      <Column className={styles.header} gap="12">
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Estratégia por mercado
        </Tag>
        <Column className={styles.copy} gap="8">
          <Heading id="market-strategy-heading" as="h2" variant="display-strong-s">
            Mercados diferentes exigem estratégias diferentes.
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            Crescimento sustentável depende de dados reais, planejamento claro e constância na
            execução.
          </Text>
        </Column>
      </Column>

      <div ref={tabsViewportRef} className={styles.tabsViewport} aria-label="Setores atendidos">
        <div
          className={styles.tabs}
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={handleTabKeyDown}
        >
          {marketStrategies.map((item, index) => (
            <button
              key={item.title}
              id={`market-tab-${index}`}
              type="button"
              role="tab"
              data-tab-index={index}
              className={classNames(styles.tab, {
                [styles.tabActive]: activeIndex === index,
              })}
              aria-controls={`market-panel-${index}`}
              aria-selected={activeIndex === index}
              tabIndex={activeIndex === index ? 0 : -1}
              onClick={() => {
                selectMarket(index);
              }}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={cardsViewportRef}
        className={styles.viewport}
        aria-label="Trilho horizontal de estratégias por mercado"
      >
        <div className={styles.track}>
          {marketStrategies.map((item, index) => (
            <article
              key={item.title}
              id={`market-panel-${index}`}
              role="tabpanel"
              aria-labelledby={`market-tab-${index}`}
              ref={(node) => {
                cardRefs.current[index] = node;
              }}
              data-index={index}
              className={classNames(styles.card, {
                [styles.cardActive]: activeIndex === index,
              })}
              style={
                {
                  "--market-accent": item.accent,
                  "--market-accent-soft": item.accentSoft,
                  "--market-accent-border": item.accentBorder,
                } as CSSProperties
              }
            >
              <Column gap="16">
                <Row className={styles.cardHeader} gap="12">
                  <Row className={styles.iconWrap} horizontal="center" vertical="center">
                    <Icon name={item.icon} size="s" />
                  </Row>
                  <Heading as="h3" variant="heading-strong-m" className={styles.cardTitle}>
                    {item.title}
                  </Heading>
                </Row>

                <Column as="ul" className={styles.bulletList} gap="12">
                  {item.bullets.map((bullet) => (
                    <Text
                      as="li"
                      key={bullet}
                      className={styles.bulletItem}
                      variant="body-default-m"
                    >
                      {bullet}
                    </Text>
                  ))}
                </Column>

                <button
                  type="button"
                  className={styles.expandButton}
                  aria-expanded={expandedIndex === index}
                  onClick={() => {
                    selectMarket(index);
                    setExpandedIndex((current) => (current === index ? null : index));
                  }}
                >
                  {expandedIndex === index ? "Ocultar abordagem" : "Ver abordagem estratégica"}
                </button>

                {expandedIndex === index && (
                  <div className={styles.insight}>
                    <Text onBackground="neutral-weak">{item.insight}</Text>
                  </div>
                )}
              </Column>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
