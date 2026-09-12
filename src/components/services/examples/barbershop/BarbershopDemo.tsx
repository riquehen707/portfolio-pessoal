import Image from "next/image";

import type { ServiceExampleRendererProps } from "../ServiceExampleRenderers";

import {
  BarbershopCommerce,
  BarbershopWhatsApp,
} from "./BarbershopDemoInteractions";
import {
  barbershopDemoLicense,
  barbershopDemoMedia,
} from "./barbershopDemoMedia";

import styles from "./BarbershopDemo.module.scss";

const galleryPhotos = [
  barbershopDemoMedia.cut,
  barbershopDemoMedia.space,
] as const;

export function BarbershopDemo({
  example,
}: ServiceExampleRendererProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: example.title,
    description: example.shortDescription,
    about:
      "Projeto demonstrativo de site para barbearia e negócio local",
    isPartOf: {
      "@type": "WebSite",
      name: "Henrique Reis",
    },
  };

  return (
    <div
      className={styles.site}
      id="barber-start"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            structuredData,
          ).replace(/</g, "\\u003c"),
        }}
      />

      <header className={styles.header}>
        <a
          className={styles.brand}
          href="#barber-start"
          aria-label="Traço 84 — voltar ao início"
        >
          <strong>TRAÇO</strong>
          <b>84</b>

          <span>
            barbearia
            <br />
            fictícia
          </span>
        </a>

        <nav
          aria-label="Navegação principal da demonstração"
        >
          <a href="#servicos">
            Serviços
          </a>

          <a href="#agendamento">
            Agendamento
          </a>

          <a href="#galeria">
            Galeria
          </a>

          <a href="#localizacao">
            Local
          </a>

          <a
            className={styles.navCta}
            href="#agendamento"
          >
            Agendar
          </a>
        </nav>
      </header>

      <main>
        <section
          className={styles.hero}
          aria-labelledby="barbershop-title"
        >
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>
              Centro · Salvador
              <span>
                localização demonstrativa
              </span>
            </p>

            <h1 id="barbershop-title">
              Corte bom.
              <br />
              Sem espera.
            </h1>

            <p className={styles.heroDescription}>
              Corte, barba e acabamento com
              horário marcado no centro da cidade.
            </p>

            <div className={styles.heroActions}>
              <a href="#agendamento">
                Agendar horário
              </a>

              <a href="#servicos">
                Ver preços
                <span aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className={styles.heroImage}>
            <Image
              src={barbershopDemoMedia.hero.src}
              alt={barbershopDemoMedia.hero.alt}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 58vw"
            />

            <div
              className={styles.heroImageLabel}
              aria-hidden="true"
            >
              <span>Salvador · BA</span>
              <span>2026</span>
            </div>
          </div>

          <div className={styles.heroStamp}>
            <span>TER—SÁB</span>
            <strong>09—19H</strong>
            <small>horário fictício</small>
          </div>
        </section>

        <BarbershopCommerce />

        <section
          className={styles.gallery}
          id="galeria"
          aria-labelledby="barber-gallery-title"
        >
          <div className={styles.galleryTitle}>
            <span>
              03 / Trabalhos e espaço
            </span>

            <h2 id="barber-gallery-title">
              Corte.
              <br />
              Detalhe.
              <br />
              Ambiente.
            </h2>

            <p>
              Referências visuais para demonstrar
              como fotografias reais poderiam dar
              identidade ao negócio.
            </p>

            <small>
              Imagens de banco — não representam
              clientes ou trabalhos da marca.
            </small>
          </div>

          {galleryPhotos.map(
            (photo, index) => (
              <figure
                className={
                  index === 0
                    ? styles.galleryPrimary
                    : styles.gallerySecondary
                }
                key={photo.src}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 760px) 100vw, 58vw"
                      : "(max-width: 760px) 100vw, 40vw"
                  }
                />

                <figcaption>
                  <span>
                    0{index + 1}
                  </span>

                  <a
                    href={photo.source}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Foto: {photo.credit} ↗
                  </a>
                </figcaption>
              </figure>
            ),
          )}

          <div
            className={styles.galleryQuote}
            aria-hidden="true"
          >
            <span>TRAÇO</span>
            <strong>84</strong>
          </div>
        </section>

        <section
          className={styles.team}
          aria-labelledby="barber-team-title"
        >
          <div className={styles.teamImage}>
            <Image
              src={
                barbershopDemoMedia.team.src
              }
              alt={
                barbershopDemoMedia.team.alt
              }
              fill
              sizes="(max-width: 760px) 100vw, 48vw"
            />

            <span
              className={styles.imageIndex}
              aria-hidden="true"
            >
              04
            </span>
          </div>

          <div className={styles.teamCopy}>
            <span>
              04 / Profissionais
            </span>

            <h2 id="barber-team-title">
              Escolha quem cuida do corte.
            </h2>

            <p className={styles.teamIntro}>
              Em um site real, cada profissional
              pode ter especialidade, agenda e
              horários próprios.
            </p>

            <div className={styles.people}>
              <p>
                <strong>Caio</strong>

                <small>
                  Cortes curtos
                  <br />
                  acabamento
                </small>

                <span aria-hidden="true">
                  01
                </span>
              </p>

              <p>
                <strong>Léo</strong>

                <small>
                  Barba
                  <br />
                  cortes médios
                </small>

                <span aria-hidden="true">
                  02
                </span>
              </p>
            </div>

            <p className={styles.teamNote}>
              Nomes fictícios e fotografia de
              banco utilizados apenas nesta
              demonstração.
            </p>
          </div>
        </section>

        <section
          className={styles.location}
          id="localizacao"
          aria-labelledby="barber-location-title"
        >
          <div
            className={styles.map}
            aria-label="Mapa ilustrativo do Centro de Salvador"
          >
            <span
              className={styles.mapRoadA}
            />
            <span
              className={styles.mapRoadB}
            />
            <span
              className={styles.mapRoadC}
            />

            <span
              className={styles.mapRoadD}
            />

            <i>84</i>

            <strong>
              CENTRO
              <br />
              SALVADOR
            </strong>

            <small>
              mapa ilustrativo
            </small>
          </div>

          <div className={styles.locationCopy}>
            <span>
              05 / Localização
            </span>

            <h2 id="barber-location-title">
              No caminho.
              <br />
              Sem complicar.
            </h2>

            <div className={styles.address}>
              <strong>
                Rua do Traço, 84
              </strong>

              <p>
                Centro, Salvador
                <br />
                endereço fictício
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Centro%2C+Salvador%2C+BA"
              target="_blank"
              rel="noreferrer"
            >
              Abrir o bairro no mapa
              <span aria-hidden="true">
                ↗
              </span>
            </a>

            <dl>
              <div>
                <dt>TER—SEX</dt>
                <dd>09:00 — 19:00</dd>
              </div>

              <div>
                <dt>SÁB</dt>
                <dd>09:00 — 17:00</dd>
              </div>

              <div>
                <dt>DOM—SEG</dt>
                <dd>Fechado</dd>
              </div>
            </dl>

            <small>
              Endereço e horários
              demonstrativos.
            </small>
          </div>
        </section>

        <section
          className={styles.contact}
          id="contato"
          aria-labelledby="barber-contact-title"
        >
          <div className={styles.contactHeading}>
            <span>
              06 / Contato direto
            </span>

            <h2 id="barber-contact-title">
              Seu próximo
              <br />
              corte começa
              <br />
              aqui.
            </h2>
          </div>

          <div className={styles.contactLinks}>
            <BarbershopWhatsApp />

            <a href="tel:+557100000000">
              <span>Telefone</span>
              <strong>
                (71) 0000-0000
              </strong>
              <small>
                número fictício
              </small>
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span>Social</span>
              <strong>
                Instagram
              </strong>
              <small>
                abrir exemplo ↗
              </small>
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <strong>
          TRAÇO 84
        </strong>

        <p>
          Marca, pessoas, endereço, valores
          e horários fictícios.
        </p>

        <p>
          Fotos sob{" "}
          <a
            href={barbershopDemoLicense.url}
            target="_blank"
            rel="noreferrer"
          >
            {barbershopDemoLicense.name}
          </a>
          .
        </p>

        <a href="#barber-start">
          Topo ↑
        </a>
      </footer>
    </div>
  );
}