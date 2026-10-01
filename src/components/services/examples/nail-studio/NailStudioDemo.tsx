import Image from "next/image";

import type { ServiceExampleRendererProps } from "../ServiceExampleRenderers";

import { NailStudioBookingDemo } from "./NailStudioBookingDemo";
import {
  nailStudioExperience,
  nailStudioMedia,
  nailStudioServices,
  nailStudioWorks,
} from "./nailStudioDemoData";

import styles from "./NailStudioDemo.module.scss";

export function NailStudioDemo({
  example,
}: ServiceExampleRendererProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: example.title,
    description: example.shortDescription,
    about: "Projeto demonstrativo de site para um estúdio de unhas fictício",
    isPartOf: {
      "@type": "WebSite",
      name: "Henrique Reis",
    },
  };

  return (
    <div className={styles.site} id="tinta-inicio">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className={styles.header}>
        <a className={styles.brand} href="#tinta-inicio" aria-label="Tinta, início">
          <strong>Tinta</strong>
          <span>estúdio de unhas</span>
        </a>

        <nav className={styles.desktopNav} aria-label="Navegação do estúdio demonstrativo">
          <a href="#tinta-servicos">Serviços</a>
          <a href="#tinta-trabalhos">Trabalhos</a>
          <a href="#tinta-estudio">Estúdio</a>
          <a className={styles.navAction} href="#tinta-agenda">Agendamento</a>
        </nav>

        <details className={styles.mobileMenu}>
          <summary>Menu</summary>
          <nav aria-label="Navegação móvel do estúdio demonstrativo">
            <a href="#tinta-servicos">Serviços</a>
            <a href="#tinta-trabalhos">Trabalhos</a>
            <a href="#tinta-estudio">Estúdio</a>
            <a href="#tinta-agenda">Agendamento</a>
          </nav>
        </details>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="tinta-demo-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Atendimento individual · com hora marcada</p>
            <h1 id="tinta-demo-title">
              Manicure, gel e <em>nail art</em> com atendimento marcado.
            </h1>
            <p>
              Uma bancada, um horário por vez e serviços definidos antes de começar.
            </p>
            <a className={styles.primaryAction} href="#tinta-servicos">
              Escolher serviço
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <figure className={styles.heroMedia}>
            <Image
              src={nailStudioMedia.hero.src}
              alt={nailStudioMedia.hero.alt}
              fill
              priority
              sizes="(max-width: 760px) 100vw, 58vw"
            />
            <figcaption>
              <span>01</span>
              <span>Cor da vez · vinho fechado</span>
            </figcaption>
          </figure>

          <p className={styles.demoNotice}>
            Identidade, agenda e valores fictícios para demonstração.
          </p>
        </section>

        <section className={styles.services} id="tinta-servicos" aria-labelledby="tinta-services-title">
          <header className={styles.sectionHeading}>
            <p>Serviços</p>
            <h2 id="tinta-services-title">Escolha o cuidado antes de pedir o horário.</h2>
            <span>Valores ilustrativos</span>
          </header>

          <div className={styles.serviceList}>
            {nailStudioServices.map((service) => (
              <article key={service.name}>
                <span>{service.number}</span>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <dl>
                  <div><dt>Duração</dt><dd>{service.duration}</dd></div>
                  <div><dt>Valor</dt><dd>{service.price}</dd></div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.statement} aria-label="Posicionamento do estúdio demonstrativo">
          <span>T / 02</span>
          <p>
            Agenda curta.
            <br />
            Atendimento individual.
          </p>
          <small>Sem fila e sem encaixe.</small>
        </section>

        <section className={styles.works} id="tinta-trabalhos" aria-labelledby="tinta-works-title">
          <header className={styles.worksHeading}>
            <div>
              <p>Trabalhos</p>
              <h2 id="tinta-works-title">Cores curtas, desenho preciso.</h2>
            </div>
            <span>Seleção demonstrativa · 03</span>
          </header>

          <div className={styles.workGrid}>
            {nailStudioWorks.map((work, index) => (
              <figure key={work.name} data-position={index + 1}>
                <div>
                  <Image
                    src={work.image.src}
                    alt={work.image.alt}
                    fill
                    sizes="(max-width: 760px) 100vw, 45vw"
                  />
                </div>
                <figcaption>
                  <strong>{work.name}</strong>
                  <span>{work.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.studio} id="tinta-estudio" aria-labelledby="tinta-studio-title">
          <figure>
            <Image
              src={nailStudioMedia.studio.src}
              alt={nailStudioMedia.studio.alt}
              fill
              sizes="(max-width: 760px) 100vw, 55vw"
            />
          </figure>

          <div className={styles.studioCopy}>
            <p>O estúdio</p>
            <h2 id="tinta-studio-title">Uma bancada preparada para receber uma pessoa por vez.</h2>
            <p>
              Serviço, duração e cuidados prévios são combinados antes da reserva, para que a bancada esteja pronta no horário marcado.
            </p>
            <dl>
              <div><dt>Formato</dt><dd>Atendimento individual</dd></div>
              <div><dt>Agenda</dt><dd>Somente com horário marcado</dd></div>
              <div><dt>Local</dt><dd>Endereço fictício · informado na confirmação</dd></div>
            </dl>
          </div>
        </section>

        <section className={styles.experience} aria-labelledby="tinta-experience-title">
          <header>
            <p>Antes de vir</p>
            <h2 id="tinta-experience-title">O que precisa ser combinado.</h2>
          </header>
          <ol>
            {nailStudioExperience.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.booking} id="tinta-agenda" aria-labelledby="tinta-booking-title">
          <div>
            <p>Agendamento demonstrativo</p>
            <h2 id="tinta-booking-title">Escolha o serviço e peça um horário.</h2>
          </div>
          <div className={styles.bookingDetails}>
            <p>Informe o serviço desejado, se existe gel para remover e os melhores períodos para atendimento.</p>
            <NailStudioBookingDemo />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.brand} href="#tinta-inicio">
          <strong>Tinta</strong>
          <span>estúdio de unhas</span>
        </a>
        <p>Projeto fictício · imagens, preços, endereço e agenda ilustrativos.</p>
        <a href="#tinta-inicio">Topo ↑</a>
      </footer>
    </div>
  );
}
