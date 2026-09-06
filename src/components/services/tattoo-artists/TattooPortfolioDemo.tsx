import Image from "next/image";
import { tattooDemoMedia } from "@/content/service-landings/tattooDemoMedia";
import styles from "./TattooLanding.module.scss";

/** Interface ilustrativa: não exibe clientes, agenda, endereço ou resultados reais. */
export function TattooPortfolioDemo({ compact = false }: { compact?: boolean }) {
  const photos = compact ? tattooDemoMedia.slice(0, 2) : tattooDemoMedia;

  return (
    <figure className={`${styles.demo} ${compact ? styles.compact : styles.fullDemo}`}>
      <div className={styles.browserBar} aria-hidden="true">
        <span>● ● ●</span>
        <span>SEU PORTFÓLIO / TRABALHOS</span>
      </div>
      <div className={styles.previewBody}>
        <header className={styles.previewHeader}>
          <strong>
            SEU NOME <span>TATTOO</span>
          </strong>
          <span>Portfólio · Estilos · Orçamentos</span>
        </header>

        <div className={styles.previewIntro}>
          <div>
            <span className={styles.previewLabel}>TATUAGEM AUTORAL</span>
            <p>Seu traço em primeiro plano.</p>
          </div>
          {!compact && <span className={styles.mockAction}>Pedir orçamento</span>}
        </div>

        {!compact && (
          <div className={styles.styleList} aria-label="Exemplo de organização por estilos">
            <span>Todos</span>
            {tattooDemoMedia.map((photo) => (
              <span key={photo.style}>{photo.style}</span>
            ))}
          </div>
        )}

        <div className={styles.tattooGrid}>
          {photos.map((photo, index) => (
            <article key={photo.src} className={styles.tattooCard}>
              <Image
                src={photo.src}
                width={photo.width}
                height={photo.height}
                alt={photo.alt}
                sizes={compact ? "(max-width: 720px) 42vw, 260px" : "(max-width: 720px) 88vw, 360px"}
                priority={compact && index === 0}
              />
              <div>
                <strong>{photo.style}</strong>
                <span>Ver trabalhos</span>
              </div>
            </article>
          ))}
        </div>

        {!compact && (
          <section className={styles.previewProfile} aria-label="Exemplo de perfil e contato">
            <div>
              <span>SOBRE O ARTISTA</span>
              <strong>Seu nome</strong>
              <p>Estilos, cidade e forma de atendimento em poucas linhas.</p>
            </div>
            <span className={styles.mockAction}>Chamar no WhatsApp</span>
          </section>
        )}
      </div>
      <figcaption>
        Exemplo de interface com fotografias de banco. Seu portfólio usará seus próprios trabalhos.
      </figcaption>
    </figure>
  );
}
