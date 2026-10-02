import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/Reveal";
import { ServicesAreaNav } from "@/components/services/ServicesAreaNav";
import type { ServiceExample } from "@/content/service-examples/serviceExampleSchema";
import type {
  serviceFaq,
  serviceInclusions,
  servicePlans,
  serviceProcess,
} from "@/data/service-hub";
import type { ServiceInspiration } from "@/data/service-inspirations";

import { ServiceExamplesSnap } from "./ServiceExamplesSnap";
import { ServiceFaqSnap } from "./ServiceFaqSnap";
import { ServiceFinalSnap } from "./ServiceFinalSnap";
import { ServiceInclusionsSnap } from "./ServiceInclusionsSnap";
import { ServicePlansSnap } from "./ServicePlansSnap";
import { ServiceProcessSnap } from "./ServiceProcessSnap";

import styles from "./ServiceHubView.module.scss";

type ServiceHubViewProps = {
  examples: ServiceExample[];
  inclusions: typeof serviceInclusions;
  process: typeof serviceProcess;
  plans: typeof servicePlans;
  faq: typeof serviceFaq;
  inspirations: ServiceInspiration[];
  contactHref: string;
};

export function ServiceHubView({
  examples,
  inclusions,
  process,
  plans,
  faq,
  inspirations,
  contactHref,
}: ServiceHubViewProps) {
  const showcaseExample =
    examples.find(
      (example) =>
        example.slug === "estudio-unhas" ||
        example.segment.toLowerCase().includes("unhas"),
    ) ?? examples[0];

  const architectureInspiration =
    inspirations.find(
      (inspiration) =>
        inspiration.slug === "arquitetura-editorial" ||
        inspiration.category.toLowerCase().includes("arquitetura"),
    ) ?? inspirations[0];

  const heroDesktopImage =
    showcaseExample?.coverImage?.src ??
    architectureInspiration?.image;

  const heroMobileImage =
    showcaseExample?.coverImage?.mobileSrc ??
    showcaseExample?.coverImage?.src ??
    architectureInspiration?.image;

  const heroImageAlt =
    showcaseExample?.coverImage?.alt ??
    architectureInspiration?.alt ??
    "Exemplo de site profissional.";

  const finalInspiration =
    inspirations.find(
      (inspiration) =>
        inspiration.slug !== architectureInspiration?.slug,
    ) ?? architectureInspiration;

  return (
    <main className={`${styles.shell} servicesWideRoot`}>
      <ServicesAreaNav active="overview" />

      <section
        className={styles.hero}
        aria-labelledby="services-hero-title"
      >
        <div className={styles.heroGrid}>
          <Reveal
            className={styles.heroCopy}
            distance={14}
            trigger="mount"
          >
            <p className={styles.kicker}>Criação e manutenção de sites</p>

            <h1 id="services-hero-title">
              Sites para mostrar seu trabalho e receber contatos.
            </h1>

            <p className={styles.heroStatement}>
              Para profissionais e pequenos negócios, crio o site, organizo o conteúdo
              e cuido da publicação e manutenção. Trabalho, serviços e contato ficam
              acessíveis no celular e no desktop.
            </p>

            <p className={styles.heroOffer}>
              <strong>A partir de R$300/mês</strong>
              <span>domínio, hospedagem e manutenção inclusos.</span>
            </p>

            <div className={styles.heroActions}>
              <a
                className={styles.primaryAction}
                href={contactHref}
                data-analytics-event="service_contact"
                data-analytics-location="services_hero"
              >
                Quero meu site
                <span aria-hidden="true">→</span>
              </a>

              <Link
                className={styles.secondaryAction}
                href="#exemplos"
              >
                Ver exemplos
              </Link>
            </div>

          </Reveal>

          {heroDesktopImage ? (
            <Reveal
              className={styles.heroVisual}
              distance={18}
              trigger="mount"
            >
              <figure className={styles.heroFigure}>
                <div className={styles.desktopPreview}>
                  <div
                    className={styles.browserChrome}
                    aria-hidden="true"
                  >
                    <i />
                    <i />
                    <i />

                    <small>seunegocio.com.br</small>
                  </div>

                  <Image
                    src={heroDesktopImage}
                    alt={heroImageAlt}
                    fill
                    priority
                    sizes="(max-width: 900px) 92vw, 55vw"
                  />
                </div>

                <div
                  className={styles.mobilePreview}
                  aria-hidden="true"
                >
                  <span />

                  <Image
                    src={heroMobileImage}
                    alt=""
                    fill
                    priority
                    sizes="14rem"
                  />
                </div>

                <figcaption>
                  Exemplo demonstrativo de projeto responsivo.
                </figcaption>
              </figure>
            </Reveal>
          ) : null}
        </div>

      </section>

      <ServiceExamplesSnap
        examples={examples}
      />

      <ServiceInclusionsSnap
        inclusions={inclusions}
        visual={architectureInspiration}
      />

      <ServiceProcessSnap
        process={process}
        contactHref={contactHref}
      />

      <ServicePlansSnap
        plans={plans}
        contactHref={contactHref}
      />

      <ServiceFaqSnap faq={faq} />

      <ServiceFinalSnap
        contactHref={contactHref}
        visual={finalInspiration}
      />
    </main>
  );
}
