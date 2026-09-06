import Image from "next/image";
import { artistGalleryDemoMedia } from "@/content/service-landings/artistGalleryDemoMedia";
import styles from "./ArtistGalleryLanding.module.scss";

/** Interface ilustrativa, sem obras, artista, disponibilidade ou resultados atribuídos ao executor. */
export function ArtistGalleryDemo({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`${styles.demo} ${compact ? styles.compact : styles.fullDemo}`}>
      <div className={styles.browserBar} aria-hidden="true">
        <span>● ● ●</span>
        <span>SUA GALERIA / OBRAS</span>
      </div>
      <div className={styles.previewBody}>
        <header className={styles.previewHeader}>
          <strong>SEU NOME</strong>
          <span>Obras · Sobre · Contato</span>
        </header>

        <div className={styles.previewIntro}>
          <div>
            <span>GALERIA VIRTUAL</span>
            <p>Obras reunidas com espaço e contexto.</p>
          </div>
          {!compact && <span className={styles.mockAction}>Consultar uma obra</span>}
        </div>

        {!compact && (
          <nav className={styles.collectionList} aria-label="Exemplo de coleções da galeria">
            <span>Todas</span>
            <span>Pinturas</span>
            <span>Ilustrações</span>
            <span>Esculturas</span>
          </nav>
        )}

        <div className={styles.artGrid}>
          {artistGalleryDemoMedia.map((work, index) => (
            <article key={work.src} className={styles.artCard}>
              <Image
                src={work.src}
                width={work.width}
                height={work.height}
                alt={work.alt}
                sizes={compact ? "(max-width: 720px) 42vw, 260px" : "(max-width: 720px) 90vw, 350px"}
                priority={compact && index === 0}
              />
              <div>
                <strong>{work.category}</strong>
                <span>Exemplo ilustrativo</span>
              </div>
            </article>
          ))}
        </div>

        {!compact && (
          <section className={styles.previewProfile} aria-label="Exemplo de página sobre o artista">
            <div>
              <span>SOBRE O ARTISTA</span>
              <strong>Seu percurso e sua pesquisa</strong>
              <p>Biografia, técnicas, exposições e cidade com informações fornecidas por você.</p>
            </div>
            <span className={styles.mockAction}>Conversar pelo WhatsApp</span>
          </section>
        )}
      </div>
      <figcaption>
        Exemplo de interface com fotografias de banco. Sua galeria usará obras e informações
        autorizadas por você.
      </figcaption>
    </figure>
  );
}
