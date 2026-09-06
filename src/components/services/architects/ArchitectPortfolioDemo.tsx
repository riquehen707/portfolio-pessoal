import Image from "next/image";
import { architectDemoMedia } from "@/content/service-landings/architectDemoMedia";
import styles from "./ArchitectLanding.module.scss";

/** Demonstração de interface; não representa projetos, clientes ou autoria arquitetônica reais. */
export function ArchitectPortfolioDemo({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`${styles.demo} ${compact ? styles.compact : styles.fullDemo}`}>
      <div className={styles.browserBar} aria-hidden="true">
        <span>● ● ●</span>
        <span>SEU SITE / PROJETOS</span>
      </div>
      <div className={styles.previewBody}>
        <header className={styles.previewHeader}>
          <strong>SEU NOME / ARQUITETURA</strong>
          <span>Projetos · Serviços · Perfil · Contato</span>
        </header>

        <div className={styles.previewIntro}>
          <div>
            <span>ARQUITETURA E INTERIORES</span>
            <p>Projetos apresentados com escala e contexto.</p>
          </div>
          {!compact && <span className={styles.mockAction}>Solicitar orçamento</span>}
        </div>

        <div className={styles.projectGrid}>
          {architectDemoMedia.map((project, index) => (
            <article key={project.src} className={styles.projectCard}>
              <Image
                src={project.src}
                width={project.width}
                height={project.height}
                alt={project.alt}
                sizes={compact ? "(max-width: 720px) 44vw, 280px" : "(max-width: 720px) 90vw, 380px"}
                priority={compact && index === 0}
              />
              <div>
                <strong>{project.category}</strong>
                <span>Projeto demonstrativo</span>
              </div>
            </article>
          ))}
        </div>

        {!compact && (
          <section className={styles.projectDetails} aria-label="Exemplo de descrição de projeto">
            <div>
              <span>COMO CADA PROJETO APARECE</span>
              <strong>Imagens acompanhadas das informações necessárias.</strong>
            </div>
            <ul>
              <li>Contexto e programa</li>
              <li>Soluções e materiais</li>
              <li>Etapa e ficha técnica</li>
            </ul>
          </section>
        )}
      </div>
      <figcaption>
        Exemplo de interface com fotografias de banco. Seu site usará projetos e informações
        autorizados por você.
      </figcaption>
    </figure>
  );
}
