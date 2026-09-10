import Image from "next/image";
import Link from "next/link";

import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import { getServiceExamplePath } from "@/data/service-examples";

import { ServiceExamplesRailControls } from "./ServiceExamplesRailControls";

import styles from "./ServiceExamplesPreview.module.scss";

export function ServiceExamplesPreview({
  examples,
}: {
  examples: ServiceExample[];
}) {
  const visibleExamples = examples.filter((example) => example.coverImage);

  if (!visibleExamples.length) {
    return null;
  }

  return (
    <section
      className={styles.section}
      id="projetos"
      aria-labelledby="examples-preview-title"
    >
      <header className={styles.heading}>
        <div className={styles.headingCopy}>
          <p className={styles.kicker}>Projetos demonstrativos</p>

          <h2 id="examples-preview-title">
            Diferentes negócios pedem diferentes direções.
          </h2>

          <p className={styles.description}>
            Exemplos navegáveis para mostrar como estrutura, conteúdo e
            identidade visual podem mudar de acordo com cada projeto.
          </p>
        </div>

        <div className={styles.headingActions}>
          <ServiceExamplesRailControls
            trackId="service-projects-track"
            className={styles.arrows}
          />

          <Link
            className={styles.galleryLink}
            href="/servicos/exemplos"
          >
            Ver todos
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>

      <div
        className={styles.track}
        id="service-projects-track"
        tabIndex={0}
        aria-label="Projetos demonstrativos. Role horizontalmente para conhecer outros exemplos."
      >
        {visibleExamples.map((example, index) => (
          <article
            className={styles.project}
            key={example.id}
          >
            <Link
              className={styles.preview}
              href={getServiceExamplePath(example.slug)}
              aria-label={`Abrir projeto demonstrativo ${example.title}`}
            >
              <div className={styles.image}>
                <Image
                  src={example.coverImage!.src}
                  alt={example.coverImage!.alt}
                  fill
                  sizes="(max-width: 760px) 88vw, (max-width: 1200px) 52vw, 39rem"
                />
              </div>

              <div className={styles.previewMeta}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span>Explorar projeto</span>
              </div>
            </Link>

            <div className={styles.projectCopy}>
              <div className={styles.projectIdentity}>
                <p>{example.segment}</p>

                <h3>{example.title}</h3>
              </div>

              <p className={styles.projectDescription}>
                {example.shortDescription}
              </p>

              <Link
                className={styles.projectLink}
                href={getServiceExamplePath(example.slug)}
              >
                Ver projeto
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>

      <footer className={styles.footer}>
        <p>
          Os projetos acima utilizam marcas e negócios fictícios para
          demonstrar possibilidades reais de estrutura e direção visual.
        </p>

        <Link href="/servicos/exemplos">
          Galeria completa
          <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </section>
  );
}