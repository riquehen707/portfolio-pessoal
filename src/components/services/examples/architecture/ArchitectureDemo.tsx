import Image from "next/image";

import type { ServiceExampleRendererProps } from "../ServiceExampleRenderers";

import {
  ArchitectureProjects,
  ArchitectureWhatsAppDemo,
} from "./ArchitectureDemoInteractions";
import {
  architectureDemoMedia,
  architectureDemoProjects,
} from "./architectureDemoData";

import styles from "./ArchitectureDemo.module.scss";

const services = [
  {
    number: "01",
    title: "Arquitetura residencial",
    description:
      "Casas e apartamentos desenvolvidos a partir do programa, terreno, rotina e necessidades de cada projeto.",
  },
  {
    number: "02",
    title: "Interiores",
    description:
      "Layout, materiais, iluminação, marcenaria e definição dos elementos permanentes do espaço.",
  },
  {
    number: "03",
    title: "Espaços comerciais",
    description:
      "Ambientes de atendimento e trabalho organizados de acordo com operação, circulação e identidade do negócio.",
  },
  {
    number: "04",
    title: "Reformas",
    description:
      "Levantamento do espaço existente, reorganização dos ambientes e documentação das alterações previstas.",
  },
  {
    number: "05",
    title: "Consultoria",
    description:
      "Análise pontual de layout, materiais ou possibilidades para quem ainda não precisa de um projeto completo.",
  },
] as const;

const process = [
  {
    number: "01",
    title: "Contexto",
    description:
      "Entendemos o local, o programa, as necessidades e as restrições do projeto.",
  },
  {
    number: "02",
    title: "Estudo",
    description:
      "São desenvolvidas alternativas de organização e uma direção espacial inicial.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description:
      "O projeto avança em materiais, dimensões, detalhamento e documentação técnica prevista.",
  },
  {
    number: "04",
    title: "Obra",
    description:
      "Quando contratado, o acompanhamento auxilia na interpretação e execução das decisões de projeto.",
  },
] as const;

export function ArchitectureDemo({
  example,
}: ServiceExampleRendererProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: example.title,
    description: example.shortDescription,
    about:
      "Projeto demonstrativo de portfólio para escritório de arquitetura",
    isPartOf: {
      "@type": "WebSite",
      name: "Henrique Reis",
    },
  };

  return (
    <div
      className={styles.site}
      id="arch-start"
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
          href="#arch-start"
        >
          <strong>PB—17</strong>

          <span>
            Plano Bruto 17
            <br />
            arquitetura
          </span>
        </a>

        <nav
          className={styles.desktopNav}
          aria-label="Navegação principal"
        >
          <a href="#projetos">
            Projetos
          </a>

          <a href="#estudio">
            Estúdio
          </a>

          <a href="#servicos-arquitetura">
            Serviços
          </a>

          <a href="#processo">
            Processo
          </a>

          <a
            className={styles.navAction}
            href="#contato-arquitetura"
          >
            Iniciar projeto
          </a>
        </nav>

        <details
          className={styles.mobileMenu}
        >
          <summary>Menu</summary>

          <nav aria-label="Navegação móvel">
            <a href="#projetos">
              Projetos
            </a>

            <a href="#estudio">
              Estúdio
            </a>

            <a href="#servicos-arquitetura">
              Serviços
            </a>

            <a href="#processo">
              Processo
            </a>

            <a href="#contato-arquitetura">
              Contato
            </a>
          </nav>
        </details>
      </header>

      <main>
        <section
          className={styles.hero}
          aria-labelledby="architecture-demo-title"
        >
          <div className={styles.heroImage}>
            <Image
              src={architectureDemoMedia[0].src}
              alt={architectureDemoMedia[0].alt}
              fill
              priority
              sizes="100vw"
            />
          </div>

          <div className={styles.heroTopline}>
            <span>
              Arquitetura residencial
            </span>

            <span>
              Interiores
            </span>

            <span>
              Comercial
            </span>
          </div>

          <div className={styles.heroTitle}>
            <span>
              Estúdio independente
            </span>

            <h1 id="architecture-demo-title">
              Plano
              <br />
              Bruto
              <sup>17</sup>
            </h1>
          </div>

          <div className={styles.heroCaption}>
            <p>
              Projetos que partem do uso,
              da matéria e da relação entre
              espaço e rotina.
            </p>

            <a href="#projetos">
              Ver projetos
              <span aria-hidden="true">
                ↓
              </span>
            </a>
          </div>

          <p className={styles.demoNotice}>
            Identidade e projetos
            demonstrativos.
          </p>
        </section>

        <section
          className={styles.projectsSection}
          id="projetos"
          aria-labelledby="projects-title"
        >
          <div className={styles.projectsHeading}>
            <div>
              <span>01</span>
              <p>
                Projetos selecionados
              </p>
            </div>

            <h2 id="projects-title">
              Espaços pensados a partir de
              como serão usados.
            </h2>

            <p>
              Três estudos demonstrativos
              mostram diferentes escalas,
              programas e direções de
              projeto.
            </p>
          </div>

          <ArchitectureProjects
            projects={
              architectureDemoProjects
            }
          />
        </section>

        <section
          className={styles.studio}
          id="estudio"
          aria-labelledby="studio-title"
        >
          <div className={styles.studioIndex}>
            <span>02</span>
            <p>Estúdio</p>
          </div>

          <div
            className={
              styles.studioStatement
            }
          >
            <h2 id="studio-title">
              Arquitetura não começa pela
              imagem.
            </h2>

            <p>
              Começa pelo espaço disponível,
              pelas pessoas que vão usá-lo e
              pelas decisões que precisam
              caber dentro de um orçamento,
              de um terreno e de uma rotina.
            </p>
          </div>

          <div
            className={styles.studioDetails}
          >
            <p>
              O Plano Bruto 17 é uma
              identidade fictícia criada para
              demonstrar como um escritório
              pode apresentar seus projetos,
              serviços e processo em um site
              próprio.
            </p>

            <dl>
              <div>
                <dt>Atuação</dt>
                <dd>
                  Residencial, interiores,
                  comercial e reformas
                </dd>
              </div>

              <div>
                <dt>Base</dt>
                <dd>
                  São Paulo · localização
                  demonstrativa
                </dd>
              </div>

              <div>
                <dt>Escala</dt>
                <dd>
                  Projetos residenciais e
                  pequenos espaços comerciais
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          className={styles.services}
          id="servicos-arquitetura"
          aria-labelledby="services-title"
        >
          <div
            className={
              styles.sectionIndex
            }
          >
            <span>03</span>

            <div>
              <p>O que fazemos</p>
              <h2 id="services-title">
                Serviços
              </h2>
            </div>
          </div>

          <div
            className={styles.serviceList}
          >
            {services.map((service) => (
              <details
                key={service.title}
              >
                <summary>
                  <span>
                    {service.number}
                  </span>

                  <strong>
                    {service.title}
                  </strong>

                  <i aria-hidden="true">
                    +
                  </i>
                </summary>

                <p>
                  {service.description}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section
          className={styles.process}
          id="processo"
          aria-labelledby="process-architecture-title"
        >
          <div
            className={
              styles.processHeading
            }
          >
            <span>04</span>

            <div>
              <p>Do briefing à obra</p>

              <h2
                id="process-architecture-title"
              >
                Um processo dividido em
                etapas claras.
              </h2>
            </div>
          </div>

          <ol>
            {process.map((item) => (
              <li key={item.number}>
                <span>
                  {item.number}
                </span>

                <div>
                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className={styles.contact}
          id="contato-arquitetura"
          aria-labelledby="architecture-contact-title"
        >
          <div
            className={
              styles.contactHeading
            }
          >
            <span>05 / Contato</span>

            <h2
              id="architecture-contact-title"
            >
              Tem um espaço
              <br />
              para transformar?
            </h2>
          </div>

          <div
            className={
              styles.contactStatement
            }
          >
            <p>
              Para uma primeira conversa,
              basta informar o tipo de espaço,
              a cidade, a metragem aproximada
              e em que etapa o projeto está.
            </p>

            <ArchitectureWhatsAppDemo />
          </div>

          <div
            className={styles.contactGrid}
          >
            <div>
              <small>
                E-mail
              </small>

              <a href="mailto:contato@planobruto17.example">
                contato@
                <br />
                planobruto17.example
              </a>
            </div>

            <div>
              <small>
                Atendimento
              </small>

              <p>
                Projetos sob consulta
                <br />
                São Paulo
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <strong>PB—17</strong>

        <span>
          Identidade, projetos e localizações
          fictícios para demonstração.
        </span>

        <a href="#arch-start">
          Topo ↑
        </a>
      </footer>
    </div>
  );
}