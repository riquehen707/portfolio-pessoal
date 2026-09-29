"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/motion/Reveal";
import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { getServiceExamplePath } from "@/data/service-examples";
import {
  getServiceInspirationPath,
  type ServiceInspiration,
} from "@/data/service-inspirations";

import styles from "./ServiceHubView.module.scss";
import { StoryProgress } from "./StoryProgress";

type SnapFilter =
  | "all"
  | "advocacy"
  | "health"
  | "local-business"
  | "architecture"
  | "portfolio";

type ExampleCard = {
  category: string;
  title: string;
  description: string;
  href: string;
  image: string;
  mobileImage?: string;
  alt: string;
  filters: SnapFilter[];
};

const filters: Array<{ id: SnapFilter; label: string }> = [
  { id: "all", label: "Todos" },
  { id: "advocacy", label: "Advocacia" },
  { id: "health", label: "Saúde" },
  { id: "local-business", label: "Negócio local" },
  { id: "architecture", label: "Arquitetura" },
  { id: "portfolio", label: "Portfólio" },
];

function exampleCard(example: ServiceExample): ExampleCard | undefined {
  if (!example.coverImage) {
    return undefined;
  }

  return {
    category: example.segment,
    title: example.title,
    description: example.shortDescription,
    href: getServiceExamplePath(example.slug),
    image: example.coverImage.src,
    mobileImage: example.coverImage.mobileSrc,
    alt: example.coverImage.alt,
    filters: [
      "all",
      ...(example.slug === "arquitetura"
        ? (["architecture", "portfolio"] as const)
        : []),
      ...(example.slug === "psicologia" ? (["health"] as const) : []),
      ...(example.slug === "barbearia"
        ? (["local-business"] as const)
        : []),
    ],
  };
}

export function ServiceExamplesSnap({
  examples,
  localBusinessInspiration,
}: {
  examples: ServiceExample[];
  localBusinessInspiration?: ServiceInspiration;
}) {
  const [selectedFilter, setSelectedFilter] =
    useState<SnapFilter>("all");

  const cards = useMemo(() => {
    const exampleCards = examples
      .map(exampleCard)
      .filter((card): card is ExampleCard => Boolean(card));

    if (!localBusinessInspiration) {
      return exampleCards;
    }

    return [
      ...exampleCards,
      {
        category: localBusinessInspiration.category,
        title: localBusinessInspiration.title,
        description: localBusinessInspiration.description,
        href: getServiceInspirationPath(
          localBusinessInspiration.slug,
        ),
        image: localBusinessInspiration.image,
        alt: localBusinessInspiration.alt,
        filters: [
          "all",
          "local-business",
        ] as SnapFilter[],
      },
    ];
  }, [examples, localBusinessInspiration]);

  const visibleCards =
    selectedFilter === "all"
      ? cards
      : cards.filter((card) =>
          card.filters.includes(selectedFilter),
        );

  const primaryCard =
    visibleCards.find((card) =>
      card.filters.includes("architecture"),
    ) ?? visibleCards[0];

  const secondaryCards = visibleCards.filter(
    (card) => card.href !== primaryCard?.href,
  );

  return (
    <section
      className={styles.examplesSection}
      id="exemplos"
      aria-labelledby="examples-title"
    >
      <div className={styles.examplesChapter}>
        <header className={styles.examplesIntro}>
          <p className={styles.kicker}>Projetos demonstrativos</p>

          <h2 id="examples-title">
            Um site diferente para cada negócio.
          </h2>

          <p>
            Estrutura, identidade e experiência mudam de acordo
            com o que cada projeto precisa comunicar.
          </p>
        </header>

        <div className={styles.examplesControls}>
          <p>Explore por área</p>

          <div
            className={styles.exampleFilters}
            role="group"
            aria-label="Filtrar exemplos por área"
          >
            {filters.map((filter) => (
              <button
                aria-pressed={selectedFilter === filter.id}
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                type="button"
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {primaryCard ? (
        <Reveal
          className={styles.examplesShowcase}
          distance={18}
        >
          <article className={styles.showcasePrimary}>
            <Link
              className={styles.showcasePrimaryImage}
              href={primaryCard.href}
              aria-label={`Ver exemplo ${primaryCard.title}`}
            >
              <Image
                src={primaryCard.image}
                alt={primaryCard.alt}
                fill
                sizes="(max-width: 900px) 100vw, 68vw"
              />
            </Link>

            <div className={styles.showcasePrimaryIndex}>
              <span>01</span>
              <span>Projeto em destaque</span>
            </div>

            <div className={styles.showcasePrimaryCopy}>
              <p>{primaryCard.category}</p>

              <h3>{primaryCard.title}</h3>

              <span>{primaryCard.description}</span>

              <Link
                className={styles.exampleLink}
                href={primaryCard.href}
              >
                Explorar projeto
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </article>

          <aside
            className={styles.showcaseSecondaryList}
            aria-label="Outros projetos"
          >
            <div className={styles.secondaryHeading}>
              <span>Outros projetos</span>
              <span>
                {String(secondaryCards.length).padStart(2, "0")}
              </span>
            </div>

            {secondaryCards.map((card, index) => (
              <article
                className={styles.showcaseSecondary}
                key={card.href}
              >
                <Link
                  className={styles.showcaseSecondaryImage}
                  href={card.href}
                  aria-label={`Ver exemplo ${card.title}`}
                >
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    sizes="(max-width: 620px) 8rem, (max-width: 900px) 40vw, 13rem"
                  />

                  <span className={styles.secondaryNumber}>
                    {String(index + 2).padStart(2, "0")}
                  </span>
                </Link>

                <div className={styles.showcaseSecondaryCopy}>
                  <p>{card.category}</p>

                  <h3>{card.title}</h3>

                  <span>{card.description}</span>

                  <Link
                    className={styles.exampleLink}
                    href={card.href}
                  >
                    Ver projeto
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </aside>
        </Reveal>
      ) : (
        <p
          className={styles.exampleEmpty}
          role="status"
        >
          Ainda não há um exemplo demonstrativo nesta área.
        </p>
      )}

      <footer className={styles.examplesFooter}>
        <StoryProgress
          chapter={2}
          label="Continue explorando"
        />

        <Link
          className={styles.textLink}
          href="/servicos/exemplos"
        >
          Ver todos os exemplos
          <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </section>
  );
}