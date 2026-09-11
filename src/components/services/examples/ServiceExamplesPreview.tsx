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
  const visibleExamples = examples.filter(
    (example) => example.coverImage,
  );

  if (!visibleExamples.length) {
    return null;
  }

  return (
    <section
      className={styles.section}
      aria-labelledby="examples-preview-title"
    >
      <header className={styles.heading}>
        <div className={styles.headingCopy}>
          <p className={styles.kicker}>
            Projetos demonstrativos
          </p>

          <h2 id="examples-preview-title">
            Um site diferente para cada tipo de negócio.
          </h2>

          <p className={styles.description}>
            Não trabalho com um único modelo. Estrutura,
            conteúdo e direção visual mudam de acordo com o
            projeto.
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

      <div className={styles.railFrame}>
        <div
          className={styles.track}
          id="service-projects-track"
          tabIndex={0}
          aria-label="Projetos demonstrativos. Role horizontalmente para conhecer outros exemplos."
        >
          {visibleExamples.map((example, index) => {
            const projectPath = getServiceExamplePath(
              example.slug,
            );

            return (
              <article
                className={styles.project}
                key={example.id}
              >
                <Link
                  className={styles.preview}
                  href={projectPath}
                  aria-label={`Abrir projeto demonstrativo ${example.title}`}
                >
                  <div className={styles.image}>
                    <Image
                      src={example.coverImage!.src}
                      alt={example.coverImage!.alt}
                      fill
                      priority={index === 0}
                      sizes="(max-width: 760px) 88vw, (max-width: 1100px) 66vw, 42rem"
                    />
                  </div>

                  <div className={styles.previewOverlay}>
                    <span className={styles.previewNumber}>
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    <span className={styles.previewAction}>
                      Explorar
                      <span aria-hidden="true">↗</span>
                    </span>
                  </div>
                </Link>

                <div className={styles.projectCopy}>
                  <div className={styles.projectIdentity}>
                    <p>{example.segment}</p>

                    <h3>{example.title}</h3>
                  </div>

                  <p
                    className={
                      styles.projectDescription
                    }
                  >
                    {example.shortDescription}
                  </p>

                  <Link
                    className={styles.projectLink}
                    href={projectPath}
                  >
                    Ver projeto
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <footer className={styles.footer}>
        <p>
          Marcas e negócios fictícios criados para demonstrar
          possibilidades reais de estrutura e direção visual.
        </p>

        <Link href="/servicos/exemplos">
          Explorar galeria
          <span aria-hidden="true">↗</span>
        </Link>
      </footer>
    </section>
  );
}