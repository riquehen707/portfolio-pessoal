import Image from "next/image";

import type { ServiceExampleRendererProps } from "../ServiceExampleRenderers";
import {
  PsychologyCareGuide,
  PsychologyContactForm,
  PsychologyWhatsAppButton,
} from "./PsychologyDemoInteractions";

import styles from "./PsychologyDemo.module.scss";

const practicalInfo = [
  {
    label: "Público",
    value: "Adultos",
  },
  {
    label: "Modalidade",
    value: "Online e presencial",
  },
  {
    label: "Sessão",
    value: "Cerca de 50 minutos",
  },
] as const;

const steps = [
  {
    number: "01",
    title: "Você envia uma mensagem",
    description:
      "Conta brevemente o que procura e informa sua preferência por atendimento online ou presencial.",
  },
  {
    number: "02",
    title: "Combinamos um horário",
    description:
      "A disponibilidade é confirmada diretamente antes do primeiro encontro.",
  },
  {
    number: "03",
    title: "A primeira sessão acontece",
    description:
      "É um primeiro espaço para compreender sua procura, expectativas e dúvidas sobre o processo.",
  },
] as const;

const credentials = [
  {
    term: "Formação",
    detail: "Graduação em Psicologia · informação demonstrativa",
  },
  {
    term: "Registro",
    detail: "CRP 00/000000 · registro fictício",
  },
  {
    term: "Atendimento",
    detail: "Adultos · individual",
  },
  {
    term: "Modalidades",
    detail: "Online e presencial",
  },
] as const;

const faq = [
  [
    "Como funciona a primeira sessão?",
    "É um primeiro encontro para compreender o motivo da procura, conversar sobre expectativas e esclarecer como o acompanhamento pode funcionar.",
  ],
  [
    "Preciso saber exatamente o que quero trabalhar?",
    "Não. É possível chegar com uma situação específica, um incômodo ou apenas com a percepção de que alguma coisa não está bem.",
  ],
  [
    "O atendimento pode ser online?",
    "Sim. Neste projeto demonstrativo, a profissional oferece atendimento online e presencial. Em um site real, disponibilidade e requisitos seriam informados pela psicóloga.",
  ],
  [
    "Qual é a frequência das sessões?",
    "A frequência não é definida de forma automática. Ela é conversada considerando a avaliação profissional, o momento da pessoa e a disponibilidade.",
  ],
  [
    "Como faço para agendar?",
    "O contato pode começar pelo WhatsApp ou pelo formulário. Depois da mensagem, os horários disponíveis são combinados diretamente.",
  ],
] as const;

export function PsychologyDemo({
  example,
}: ServiceExampleRendererProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: example.title,
    description: example.shortDescription,
    about:
      "Projeto demonstrativo de site institucional para profissional de psicologia",
    isPartOf: {
      "@type": "WebSite",
      name: "Henrique Reis",
    },
  };

  return (
    <div className={styles.site} id="inicio">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(
            /</g,
            "\\u003c",
          ),
        }}
      />

      <header className={styles.header}>
        <a
          className={styles.brand}
          href="#inicio"
          aria-label="Elisa Veral — início"
        >
          <strong>Elisa Veral</strong>
          <span>Psicologia</span>
        </a>

        <nav
          className={styles.desktopNav}
          aria-label="Navegação principal"
        >
          <a href="#atendimento">Atendimento</a>
          <a href="#atuacao">Motivos de procura</a>
          <a href="#sobre">Sobre</a>
          <a href="#duvidas">Dúvidas</a>

          <a
            className={styles.navAction}
            href="#contato"
          >
            Consultar horários
          </a>
        </nav>

        <details className={styles.mobileMenu}>
          <summary>Menu</summary>

          <nav aria-label="Navegação móvel">
            <a href="#atendimento">Atendimento</a>
            <a href="#atuacao">Motivos de procura</a>
            <a href="#sobre">Sobre</a>
            <a href="#duvidas">Dúvidas</a>
            <a href="#contato">Consultar horários</a>
          </nav>
        </details>
      </header>

      <main>
        <section
          className={styles.hero}
          aria-labelledby="psychology-demo-title"
        >
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>
              Psicoterapia individual para adultos
            </p>

            <h1 id="psychology-demo-title">
              Um espaço para entender o que está pesando.
            </h1>

            <p className={styles.heroLead}>
              Atendimento psicológico online e presencial para
              conversar sobre emoções, relações, mudanças e
              dificuldades que têm ocupado espaço demais na sua
              rotina.
            </p>

            <div className={styles.heroActions}>
              <a
                className={styles.primaryButton}
                href="#contato"
              >
                Consultar horários
              </a>

              <a
                className={styles.textAction}
                href="#atendimento"
              >
                Entender como funciona
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <p className={styles.registration}>
              Elisa Veral é uma identidade fictícia criada para
              demonstrar este projeto · CRP 00/000000
            </p>
          </div>

          <div className={styles.heroVisual}>
            <figure className={styles.heroMedia}>
              <Image
                src="/images/services/site-arquitetos/interiores.webp"
                alt="Ambiente claro e tranquilo utilizado como imagem demonstrativa para o consultório."
                fill
                priority
                sizes="(max-width: 760px) 100vw, 48vw"
              />

              <figcaption>
                Imagem demonstrativa ·{" "}
                <a
                  href="https://unsplash.com/photos/modern-interior-with-clean-lines-and-natural-light-RZ0A_iNe_pQ"
                  target="_blank"
                  rel="noreferrer"
                >
                  Seongjin Park / Unsplash
                </a>
              </figcaption>
            </figure>

            <div
              className={styles.heroCard}
              aria-label="Informações principais do atendimento"
            >
              <span>Atendimento</span>
              <strong>Online e presencial</strong>
              <p>Horários combinados após o primeiro contato.</p>
            </div>
          </div>
        </section>

        <section
          className={styles.practicalStrip}
          aria-label="Informações práticas"
        >
          {practicalInfo.map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        <section
          className={styles.attendance}
          id="atendimento"
          aria-labelledby="attendance-title"
        >
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>
              Primeiro atendimento
            </p>

            <h2 id="attendance-title">
              Começar pode ser mais simples do que parece.
            </h2>

            <p>
              Você não precisa chegar com uma explicação pronta.
              O primeiro contato serve para combinar o encontro;
              a conversa começa de verdade na sessão.
            </p>
          </div>

          <ol className={styles.steps}>
            {steps.map((item) => (
              <li key={item.number}>
                <span>{item.number}</span>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className={styles.areas}
          id="atuacao"
          aria-labelledby="areas-title"
        >
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>
              Motivos de procura
            </p>

            <h2 id="areas-title">
              Algumas coisas podem ser difíceis de organizar
              sozinho.
            </h2>

            <p>
              Estes exemplos mostram como um site pode apresentar
              temas comuns de procura sem tentar diagnosticar quem
              está lendo.
            </p>
          </div>

          <PsychologyCareGuide />
        </section>

        <section
          className={styles.approach}
          aria-labelledby="approach-title"
        >
          <div className={styles.approachLabel}>
            <p className={styles.eyebrow}>Abordagem</p>
            <span>01</span>
          </div>

          <div className={styles.approachCopy}>
            <h2 id="approach-title">
              Orientação cognitivo-comportamental.
            </h2>

            <p>
              O trabalho pode observar como situações,
              pensamentos, emoções e comportamentos se relacionam
              no cotidiano. A abordagem não oferece respostas
              automáticas: ela ajuda a investigar padrões,
              construir compreensão e experimentar outras formas
              de lidar com determinadas situações.
            </p>

            <small>
              Texto demonstrativo. Em um projeto real, esta seção
              seria escrita a partir da formação e prática
              efetivamente informadas pela profissional.
            </small>
          </div>
        </section>

        <section
          className={styles.about}
          id="sobre"
          aria-labelledby="about-title"
        >
          <div className={styles.aboutHeading}>
            <p className={styles.eyebrow}>
              Perfil profissional
            </p>

            <h2 id="about-title">
              Elisa Veral.
            </h2>
          </div>

          <div className={styles.aboutStatement}>
            <p>
              Em um site real, este espaço apresentaria a
              profissional antes de listar diplomas: como trabalha,
              para quem atende e o que considera importante no
              processo terapêutico.
            </p>

            <p>
              A identidade desta página é fictícia. O objetivo é
              demonstrar como informações profissionais podem ser
              apresentadas de forma clara, humana e verificável.
            </p>
          </div>

          <dl className={styles.credentials}>
            {credentials.map((item) => (
              <div key={item.term}>
                <dt>{item.term}</dt>
                <dd>{item.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className={styles.faq}
          id="duvidas"
          aria-labelledby="faq-title"
        >
          <div className={styles.faqHeading}>
            <p className={styles.eyebrow}>
              Antes da primeira sessão
            </p>

            <h2 id="faq-title">
              Dúvidas que podem aparecer antes de começar.
            </h2>

            <p>
              Informações objetivas evitam que a pessoa precise
              mandar uma mensagem apenas para entender o básico.
            </p>
          </div>

          <div className={styles.faqList}>
            {faq.map(([question, answer], index) => (
              <details key={question}>
                <summary>
                  <span className={styles.faqNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{question}</span>

                  <span
                    className={styles.faqIcon}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>

                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section
          className={styles.contact}
          id="contato"
          aria-labelledby="contact-title"
        >
          <div className={styles.contactIntro}>
            <p className={styles.eyebrow}>
              Primeiro contato
            </p>

            <h2 id="contact-title">
              Você pode começar com uma mensagem curta.
            </h2>

            <p>
              Não é necessário explicar tudo agora. Informe seu
              nome, um canal de retorno e se prefere atendimento
              online ou presencial.
            </p>

            <PsychologyWhatsAppButton />

            <div
              className={styles.socialLinks}
              aria-label="Redes sociais demonstrativas"
            >
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
                <span> exemplo</span>
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
                <span> exemplo</span>
              </a>
            </div>
          </div>

          <div className={styles.contactForm}>
            <div className={styles.formHeading}>
              <span>Formulário de contato</span>
              <p>
                Somente as informações necessárias para retornar
                sua mensagem.
              </p>
            </div>

            <PsychologyContactForm />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <strong>Elisa Veral</strong>
          <span>
            Identidade, registro e conteúdo profissional fictícios.
          </span>
        </div>

        <a href="#inicio">
          Voltar ao início
          <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </div>
  );
}