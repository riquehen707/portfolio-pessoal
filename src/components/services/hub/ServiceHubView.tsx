import Image from "next/image";
import Link from "next/link";

import { ServicesAreaNav } from "@/components/services/ServicesAreaNav";
import {
  getServiceInspirationPath,
  type ServiceInspiration,
} from "@/data/service-inspirations";

import styles from "./ServiceHubView.module.scss";

type ServiceHubViewProps = {
  inspirations: ServiceInspiration[];
  contactHref: string;
};

const included = [
  {
    title: "Criação e design",
    description: "Eu organizo o conteúdo, desenho a interface e desenvolvo o site.",
  },
  {
    title: "Domínio e hospedagem",
    description: "Configuro o endereço e a infraestrutura necessária para publicar.",
  },
  {
    title: "SEO técnico",
    description: "Entrego uma base preparada para indexação, desempenho e evolução.",
  },
  {
    title: "Manutenção e suporte",
    description: "Continuo cuidando da parte técnica e de pequenos ajustes recorrentes.",
  },
] as const;

export function ServiceHubView({
  inspirations,
  contactHref,
}: ServiceHubViewProps) {
  return (
    <main className={styles.shell}>
      <ServicesAreaNav active="overview" />

      <section
        className={styles.hero}
        id="visao-geral"
        aria-labelledby="service-hub-title"
      >
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>Site profissional completo</p>

          <h1 id="service-hub-title">
            Meu site ajuda pessoas a encontrar meu trabalho. O seu pode fazer o
            mesmo.
          </h1>

          <p className={styles.heroStatement}>
            Eu crio, publico e mantenho um site para apresentar seu trabalho,
            transmitir confiança e facilitar o contato com seu negócio.
          </p>

          <div className={styles.heroActions}>
            <a
              className={styles.primaryAction}
              href={contactHref}
              data-analytics-event="services_help_click"
              data-analytics-location="services_hub_hero"
            >
              Quero meu site <span aria-hidden="true">→</span>
            </a>

            <a className={styles.secondaryAction} href="#exemplos">
              Ver como seu site pode ficar
            </a>
          </div>

          <p className={styles.heroOffer}>
            <strong>A partir de R$147/mês</strong>
            <span aria-hidden="true">·</span>
            Domínio, hospedagem, manutenção e suporte incluídos.
          </p>
        </div>
      </section>

      <section className={styles.readySection} aria-labelledby="ready-title">
        <p className={styles.kicker}>Do começo ao site publicado</p>

        <div className={styles.readyLayout}>
          <h2 id="ready-title">
            Um criador de sites entrega uma ferramenta. Eu entrego o site
            pronto.
          </h2>

          <div className={styles.readyCopy}>
            <p>
              Fazer sozinho também é possível, mas exige aprender a ferramenta,
              organizar o conteúdo, montar o design e resolver domínio,
              hospedagem, celular, SEO e manutenção.
            </p>
            <p>
              No meu serviço, essa parte fica comigo. Você participa das decisões
              e recebe uma estrutura publicada, sem precisar assumir outra função
              no seu negócio.
            </p>
          </div>
        </div>
      </section>

      <section
        className={styles.examplesSection}
        id="exemplos"
        aria-labelledby="examples-title"
      >
        <header className={styles.sectionHeader}>
          <div>
            <p className={styles.kicker}>Exemplos</p>
            <h2 id="examples-title">Veja como seu site pode ficar.</h2>
            <p className={styles.sectionDescription}>
              E o que ele pode ajudar seu negócio a organizar, apresentar e
              receber.
            </p>
          </div>

          <Link className={styles.textLink} href="/servicos/inspiracoes">
            Ver todos os exemplos <span aria-hidden="true">→</span>
          </Link>
        </header>

        <div className={styles.examplesGrid}>
          {inspirations.map((inspiration, index) => (
            <article className={styles.example} key={inspiration.slug}>
              <Link
                className={styles.exampleImage}
                href={getServiceInspirationPath(inspiration.slug)}
                aria-label={`Ver exemplo ${inspiration.title}`}
              >
                <Image
                  src={inspiration.image}
                  alt={inspiration.alt}
                  fill
                  priority={index < 2}
                  sizes="(max-width: 760px) 100vw, 50vw"
                />
              </Link>

              <div className={styles.exampleCaption}>
                <div>
                  <p>{inspiration.category}</p>
                  <h3>
                    <Link href={getServiceInspirationPath(inspiration.slug)}>
                      {inspiration.title}
                    </Link>
                  </h3>
                </div>
                <span aria-hidden="true">→</span>
              </div>

              <p className={styles.exampleDescription}>
                {inspiration.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className={styles.includedSection}
        id="incluso"
        aria-labelledby="included-title"
      >
        <header className={styles.includedIntro}>
          <p className={styles.kicker}>O que está incluso</p>
          <h2 id="included-title">
            Não é apenas o espaço onde o site fica hospedado.
          </h2>
          <p>
            A mensalidade reúne a criação, a infraestrutura e o cuidado contínuo
            necessários para o site permanecer útil e publicado.
          </p>
        </header>

        <div className={styles.includedContent}>
          <ul className={styles.includedList}>
            {included.map((item) => (
              <li key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </li>
            ))}
          </ul>

          <aside className={styles.price} aria-label="Preço do serviço">
            <p>Site profissional completo</p>
            <strong>
              R$147<small>/mês</small>
            </strong>
            <span>Sem taxa inicial.</span>
            <p>
              Páginas, sistemas, integrações e alterações maiores recebem um
              escopo próprio antes do início.
            </p>
          </aside>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="contact-title">
        <p className={styles.kicker}>Vamos conversar?</p>
        <h2 id="contact-title">
          Seu site pode começar a trabalhar pelo seu negócio.
        </h2>
        <p>
          Você me explica o projeto e eu te ajudo a entender qual estrutura faz
          sentido antes de começarmos.
        </p>
        <a
          className={styles.primaryAction}
          href={contactHref}
          data-analytics-event="services_help_click"
          data-analytics-location="services_hub_contact"
        >
          Falar no WhatsApp <span aria-hidden="true">→</span>
        </a>
      </section>
    </main>
  );
}
