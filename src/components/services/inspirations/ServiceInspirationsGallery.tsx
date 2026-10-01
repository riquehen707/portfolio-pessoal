import Image from "next/image";
import Link from "next/link";

import {
  getServiceInspirationPath,
  type ServiceInspiration,
} from "@/data/service-inspirations";

import styles from "./ServiceInspirationsGallery.module.scss";

export function ServiceInspirationsGallery({
  inspirations,
  variant = "catalog",
  contactHref,
}: {
  inspirations: ServiceInspiration[];
  variant?: "preview" | "catalog";
  contactHref?: string;
}) {
  if (!inspirations.length) return null;

  const isPreview = variant === "preview";
  const Heading = isPreview ? "h2" : "h1";

  return (
    <section
      className={`${styles.section} ${
        isPreview ? styles.preview : styles.catalog
      }`}
      aria-labelledby="service-examples-title"
    >
      <header className={styles.heading}>
        <p className={styles.kicker}>Inspirações</p>

        <Heading id="service-examples-title">
          Direções visuais para seu site.
        </Heading>

        <p className={styles.description}>
          {isPreview
            ? "Referências de composição e linguagem visual para começar a conversa. O projeto final parte do seu conteúdo."
            : "Explore composição, imagem e tipografia. Cada referência abre uma página com mais contexto sobre aquela direção."}
        </p>
      </header>

      <div className={styles.gallery}>
        {inspirations.map((inspiration, index) => (
          <article
            className={styles.item}
            key={inspiration.slug}
          >
            <Link
              className={styles.itemLink}
              href={getServiceInspirationPath(inspiration.slug)}
              aria-label={`Explorar direção visual ${inspiration.title}`}
            >
              <span className={styles.imageFrame}>
                <Image
                  className={styles.image}
                  src={inspiration.image}
                  alt={inspiration.alt}
                  width={inspiration.width}
                  height={inspiration.height}
                  priority={index < 3}
                  sizes={isPreview
                    ? "(max-width: 760px) 82vw, (max-width: 1120px) 46vw, 31vw"
                    : "(max-width: 420px) 92vw, (max-width: 760px) 46vw, (max-width: 1120px) 31vw, 23vw"}
                />
              </span>

              <div className={styles.caption}>
                <span className={styles.category}>
                  {inspiration.category}
                </span>

                <div className={styles.captionMain}>
                  <h3>{inspiration.title}</h3>

                  <span
                    className={styles.arrow}
                    aria-hidden="true"
                  >
                    ↗
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {isPreview ? (
        <div className={styles.previewActions}>
          {contactHref ? (
            <a
              className={styles.conversionLink}
              href={contactHref}
              data-analytics-event="services_help_click"
              data-analytics-location="services_examples_preview"
            >
              Quero um site assim
              <span aria-hidden="true">→</span>
            </a>
          ) : null}

          <Link
            className={styles.moreLink}
            href="/servicos/inspiracoes"
          >
            Ver todos os exemplos
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : null}
    </section>
  );
}
