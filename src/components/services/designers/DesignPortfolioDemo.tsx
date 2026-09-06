import styles from "./DesignerLanding.module.scss";

const projects = [
  { kind: "identity", area: "Identidade visual", title: "Sistema de marca" },
  { kind: "product", area: "UI/UX", title: "Fluxo de produto" },
  { kind: "web", area: "Web design", title: "Página responsiva" },
] as const;

/** Projetos visuais fictícios usados somente para demonstrar a interface do portfólio. */
export function DesignPortfolioDemo({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`${styles.demo} ${compact ? styles.compact : styles.fullDemo}`}>
      <div className={styles.browserBar} aria-hidden="true">
        <span>● ● ●</span>
        <span>SEU PORTFÓLIO / PROJETOS</span>
      </div>
      <div className={styles.previewBody}>
        <header className={styles.previewHeader}>
          <strong>SEU NOME — DESIGN</strong>
          <span>Projetos · Sobre · Currículo · Contato</span>
        </header>

        <div className={styles.previewIntro}>
          <div>
            <span>PORTFÓLIO PROFISSIONAL</span>
            <p>Projetos apresentados com contexto e decisão.</p>
          </div>
          {!compact && <span className={styles.mockAction}>Vamos conversar</span>}
        </div>

        <div className={styles.projectGrid}>
          {projects.map((project) => (
            <article key={project.kind} className={styles.projectCard}>
              <div
                className={`${styles.projectVisual} ${styles[project.kind]}`}
                aria-label={`${project.title}: composição visual inteiramente fictícia`}
                role="img"
              >
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
              </div>
              <div className={styles.projectMeta}>
                <span>{project.area}</span>
                <strong>{project.title}</strong>
                <small>Projeto ilustrativo</small>
              </div>
            </article>
          ))}
        </div>

        {!compact && (
          <section className={styles.casePreview} aria-label="Exemplo da estrutura de um case">
            <span>CASE EM FOCO</span>
            <strong>Da necessidade à solução</strong>
            <div>
              <span>01 · Contexto e papel</span>
              <span>02 · Restrições e decisões</span>
              <span>03 · Entrega e evidências</span>
            </div>
          </section>
        )}
      </div>
      <figcaption>
        Demonstração com projetos fictícios. Seu portfólio usará trabalhos e informações reais
        autorizados por você.
      </figcaption>
    </figure>
  );
}
