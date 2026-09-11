import Image from "next/image";
import Link from "next/link";

import {
  architectureDemoProjects,
  type ArchitectureDemoProject,
} from "./architectureDemoData";

import styles from "./ArchitectureDemo.module.scss";

export function ArchitectureProjectPage({
  project,
}: {
  project: ArchitectureDemoProject;
}) {
  const projectIndex =
    architectureDemoProjects.findIndex(
      (item) =>
        item.slug === project.slug,
    );

  const previous =
    architectureDemoProjects[
      (projectIndex -
        1 +
        architectureDemoProjects.length) %
        architectureDemoProjects.length
    ];

  const next =
    architectureDemoProjects[
      (projectIndex + 1) %
        architectureDemoProjects.length
    ];

  return (
    <div
      className={`${styles.site} ${styles.projectPage}`}
    >
      <header
        className={styles.projectHeader}
      >
        <Link href="/servicos/exemplos/arquitetura">
          PB—17
        </Link>

        <Link href="/servicos/exemplos/arquitetura#projetos">
          ← Todos os projetos
        </Link>
      </header>

      <main>
        <section
          className={styles.projectHero}
        >
          <div
            className={
              styles.projectHeroTitle
            }
          >
            <p>
              {project.category}
            </p>

            <h1>{project.title}</h1>
          </div>

          <dl>
            <div>
              <dt>Local</dt>
              <dd>{project.location}</dd>
            </div>

            <div>
              <dt>Área</dt>
              <dd>{project.area}</dd>
            </div>

            <div>
              <dt>Ano</dt>
              <dd>{project.year}</dd>
            </div>

            <div>
              <dt>Escopo</dt>
              <dd>{project.scope}</dd>
            </div>
          </dl>
        </section>

        <figure
          className={styles.projectLead}
        >
          <Image
            src={project.gallery[0].src}
            alt={project.gallery[0].alt}
            fill
            priority
            sizes="100vw"
          />
        </figure>

        <section
          className={
            styles.projectNarrative
          }
        >
          <div
            className={
              styles.projectNarrativeLabel
            }
          >
            <span>01</span>
            <p>Sobre o projeto</p>
          </div>

          <div
            className={
              styles.projectNarrativeCopy
            }
          >
            <p
              className={
                styles.projectSummary
              }
            >
              {project.summary}
            </p>

            <p>
              {project.concept}
            </p>
          </div>
        </section>

        <section
          className={
            styles.projectGallery
          }
          aria-label={`Galeria de ${project.title}`}
        >
          {project.gallery
            .slice(1)
            .map((media, index) => (
              <figure
                key={`${media.src}-${index}`}
              >
                <div
                  className={
                    styles.projectGalleryImage
                  }
                >
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </div>

                <figcaption>
                  Imagem demonstrativa ·{" "}
                  <a
                    href={media.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {media.credit} ↗
                  </a>
                </figcaption>
              </figure>
            ))}
        </section>

        <section
          className={
            styles.projectDisclaimer
          }
        >
          <span>Nota</span>

          <p>
            Este é um estudo fictício
            apresentado com imagens de banco.
            Em um projeto real, esta página
            poderia reunir plantas,
            fotografias da obra, conceito,
            programa, materiais e ficha
            técnica completa.
          </p>
        </section>

        <nav
          className={styles.projectEnd}
          aria-label="Navegação entre projetos"
        >
          <Link
            href={`/servicos/exemplos/arquitetura/projetos/${previous.slug}`}
          >
            <small>Anterior</small>
            <span>
              ← {previous.title}
            </span>
          </Link>

          <Link
            className={
              styles.projectEndAll
            }
            href="/servicos/exemplos/arquitetura#projetos"
          >
            Todos os projetos
          </Link>

          <Link
            href={`/servicos/exemplos/arquitetura/projetos/${next.slug}`}
          >
            <small>Próximo</small>
            <span>
              {next.title} →
            </span>
          </Link>
        </nav>
      </main>
    </div>
  );
}