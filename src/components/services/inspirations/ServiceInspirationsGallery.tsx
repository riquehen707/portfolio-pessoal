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
      className={`${styles.section} ${isPreview ? styles.preview : styles.catalog}`}
      aria-labelledby="service-inspirations-title"
    >
      <header className={styles.heading}>
        <p className={styles.kicker}>
          Inspirações
        </p>
        <Heading id="service-inspirations-title">
          {isPreview
            ? "Como seu site pode ficar?"
            : "Encontre uma direção para o seu site."}
        </Heading>
        <p className={styles.description}>
          {isPreview
            ? "Explore algumas possibilidades visuais. Cada site é adaptado ao seu conteúdo, à sua identidade e aos seus objetivos."
            : "Navegue por referências de ritmos, cores e composições. Elas servem como ponto de partida: o projeto final é criado para o seu negócio."}
        </p>
      </header>

      <div className={styles.gallery}>
        {inspirations.map((inspiration, index) => (
          <article className={styles.item} key={inspiration.slug}>
            <Link
              className={styles.itemLink}
              href={getServiceInspirationPath(inspiration.slug)}
              aria-label={`Ver inspiração ${inspiration.title}`}
            >
              <span className={styles.imageLink}>
                <Image
                  className={styles.image}
                  src={inspiration.image}
                  alt={inspiration.alt}
                  width={inspiration.width}
                  height={inspiration.height}
                  priority={index < 2}
                  sizes="(max-width: 360px) 100vw, (max-width: 760px) 46vw, (max-width: 1120px) 31vw, (min-width: 1500px) 18vw, 24vw"
                />
                <span className={styles.imageAction} aria-hidden="true">
                  Ver inspiração <span>↗</span>
                </span>
              </span>

              <div className={styles.caption}>
                <span>{inspiration.category}</span>
                <h3>{inspiration.title}</h3>
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
              data-analytics-location="services_inspirations_preview"
            >
              Quero meu site
              <span aria-hidden="true">→</span>
            </a>
          ) : null}
          <Link className={styles.moreLink} href="/servicos/inspiracoes">
            Ver todas as inspirações <span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : null}
    </section>
  );
}
