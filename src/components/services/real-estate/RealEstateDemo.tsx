import Image from "next/image";
import { realEstateDemoMedia } from "@/content/service-landings/realEstateDemoMedia";
import styles from "./RealEstateLanding.module.scss";

export function RealEstateDemo({ compact = false }: { compact?: boolean }) {
  const featured = realEstateDemoMedia[0];

  return (
    <figure className={`${styles.demo} ${compact ? styles.compact : styles.fullDemo}`}>
      <div className={styles.browserBar} aria-hidden="true">
        <span>● ● ●</span>
        <span>SEU SITE / IMÓVEIS</span>
      </div>
      <div className={styles.previewBody}>
        <div className={styles.previewNav}>
          <strong>
            SEU NOME
            <span>corretor de imóveis</span>
          </strong>
          <span>Imóveis · Perfil · Contato</span>
        </div>

        <div className={styles.featuredProperty}>
          <Image
            src={featured.src}
            width={featured.width}
            height={featured.height}
            alt={featured.alt}
            sizes={compact ? "(max-width: 720px) 92vw, 440px" : "(max-width: 720px) 92vw, 760px"}
            priority={compact}
          />
          <div className={styles.featuredCopy}>
            <span className={styles.propertyTag}>IMÓVEL EM DESTAQUE · EXEMPLO</span>
            <strong>Uma oportunidade apresentada com clareza.</strong>
            <p>Tipo, região e informações essenciais do imóvel escolhido por você.</p>
            <span className={styles.mockButton}>Falar sobre este imóvel</span>
          </div>
        </div>

        {!compact && (
          <>
            <div className={styles.previewHeading}>
              <div>
                <span>OPORTUNIDADES SELECIONADAS</span>
                <strong>Imóveis em destaque</strong>
              </div>
              <p>Uma vitrine curta para orientar o interesse antes do contato.</p>
            </div>
            <div className={styles.propertyGrid}>
              {realEstateDemoMedia.map((property) => (
                <article key={property.src} className={styles.propertyCard}>
                  <Image
                    src={property.src}
                    width={property.width}
                    height={property.height}
                    alt={property.alt}
                    sizes="(max-width: 720px) 88vw, 260px"
                  />
                  <div>
                    <span>{property.kind} · exemplo</span>
                    <strong>Informações fornecidas por você</strong>
                    <p>Localização, características e situação do imóvel.</p>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.profilePreview}>
              <span className={styles.avatar} aria-hidden="true">
                SN
              </span>
              <div>
                <span>QUEM VAI ATENDER</span>
                <strong>Seu Nome · Corretor de imóveis</strong>
                <p>CRECI e região de atendimento informados por você.</p>
              </div>
              <span className={styles.profileAction}>Conhecer o corretor</span>
            </div>

            <div className={styles.contactPreview}>
              <div>
                <span>VAMOS CONVERSAR?</span>
                <strong>Facilite o primeiro contato.</strong>
                <p>O visitante pode chamar no WhatsApp ou explicar o que procura.</p>
                <span className={styles.mockButton}>Chamar no WhatsApp</span>
              </div>
              <div className={styles.mockForm} aria-label="Exemplo visual de formulário">
                <span>Nome</span>
                <span>WhatsApp</span>
                <span>Imóvel ou necessidade</span>
                <strong>Enviar interesse</strong>
              </div>
            </div>
          </>
        )}
      </div>
      <figcaption>
        Demonstração de interface com identidade, dados e imóveis ilustrativos. O site final usa o
        conteúdo autorizado do corretor.
      </figcaption>
    </figure>
  );
}
