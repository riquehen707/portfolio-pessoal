import Image from "next/image";
import Link from "next/link";

import {
  getServiceInspirationPath,
  type ServiceInspiration,
} from "@/data/service-inspirations";

import styles from "./ServiceInspirationsGallery.module.scss";

export function ServiceInspirationsGallery({
  inspirations,
}: {
  inspirations: ServiceInspiration[];
}) {
  if (!inspirations.length) return null;

  return (
    <section
      className={styles.section}
      aria-labelledby="service-inspirations-title"
    >
      <header className={styles.heading}>
        <p className={styles.kicker}>Inspirações</p>
        <h2 id="service-inspirations-title">Como seu site pode ficar?</h2>
        <p className={styles.description}>
          Explore direções visuais e encontre estilos que combinam com o seu
          negócio. Cada site é adaptado ao seu conteúdo, à sua identidade e aos
          seus objetivos.
        </p>
      </header>

      <div className={styles.gallery}>
        {inspirations.map((inspiration, index) => (
          <article className={styles.item} key={inspiration.slug}>
            <Link
              className={styles.imageLink}
              href={getServiceInspirationPath(inspiration.slug)}
              aria-label={`Ver inspiração ${inspiration.title}`}
            >
              <Image
                className={styles.image}
                src={inspiration.image}
                alt={inspiration.alt}
                width={inspiration.width}
                height={inspiration.height}
                priority={index < 2}
                sizes="(max-width: 360px) 100vw, (max-width: 760px) 46vw, (max-width: 1120px) 31vw, 24vw"
              />
              <span className={styles.imageAction} aria-hidden="true">
                Ver inspiração <span>↗</span>
              </span>
            </Link>

            <div className={styles.caption}>
              <p>{inspiration.category}</p>
              <h3>
                <Link href={getServiceInspirationPath(inspiration.slug)}>
                  {inspiration.title}
                </Link>
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
