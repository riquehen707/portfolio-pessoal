import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineChartBar,
  HiOutlineComputerDesktop,
  HiOutlineLifebuoy,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

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
import { StoryProgress } from "./StoryProgress";

import styles from "./ServiceHubView.module.scss";

type ServiceHubViewProps = {
  examples: ServiceExample[];
  inclusions: typeof serviceInclusions;
  process: typeof serviceProcess;
  plans: typeof servicePlans;
  faq: typeof serviceFaq;
  inspirations: ServiceInspiration[];
  localBusinessInspiration?: ServiceInspiration;
  contactHref: string;
};

const heroBenefits = [
  {
    label: "Design personalizado",
    icon: HiOutlineComputerDesktop,
  },
  {
    label: "Pronto para crescer",
    icon: HiOutlineChartBar,
  },
  {
    label: "Infraestrutura inclusa",
    icon: HiOutlineShieldCheck,
  },
  {
    label: "Suporte contínuo",
    icon: HiOutlineLifebuoy,
  },
] as const;

export function ServiceHubView({
  examples,
  inclusions,
  process,
  plans,
  faq,
  inspirations,
  localBusinessInspiration,
  contactHref,
}: ServiceHubViewProps) {
  const architectureExample =
    examples.find(
      (example) =>
        example.slug === "arquitetura" ||
        example.segment.toLowerCase().includes("arquitetura"),
    ) ?? examples[0];

  const architectureInspiration =
    inspirations.find(
      (inspiration) =>
        inspiration.slug === "arquitetura-editorial" ||
        inspiration.category.toLowerCase().includes("arquitetura"),
    ) ?? inspirations[0];

  const heroDesktopImage =
    architectureExample?.coverImage?.src ??
    architectureInspiration?.image;

  const heroMobileImage =
    architectureExample?.coverImage?.mobileSrc ??
    architectureExample?.coverImage?.src ??
    architectureInspiration?.image;

  const heroImageAlt =
    architectureExample?.coverImage?.alt ??
    architectureInspiration?.alt ??
    "Exemplo de site profissional.";

  const finalInspiration =
    inspirations.find(
      (inspiration) =>
        inspiration.slug !== architectureInspiration?.slug,
    ) ?? architectureInspiration;

  return (
    <main className={styles.shell}>
      <ServicesAreaNav active="overview" />

      <section
        className={styles.hero}
        aria-labelledby="services-hero-title"
      >
        <div className={styles.heroGrid}>
          <Reveal
            className={styles.heroCopy}
            distance={14}
          >
            <p className={styles.kicker}>
              Sites profissionais
            </p>

            <h1 id="services-hero-title">
              Seu negócio merece um site à altura.
            </h1>

            <p className={styles.heroStatement}>
              Design, desenvolvimento e manutenção em um único
              serviço. Um site pensado para apresentar seu
              trabalho com clareza e transformar visitas em
              oportunidades.
            </p>

            <ul
              className={styles.heroBenefits}
              aria-label="Benefícios do serviço"
            >
              {heroBenefits.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <span
                    className={styles.benefitIcon}
                    aria-hidden="true"
                  >
                    <Icon />
                  </span>

                  <span>{label}</span>
                </li>
              ))}
            </ul>

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

            <p className={styles.heroOffer}>
              <strong>A partir de R$300/mês</strong>
              <span>
                domínio, hospedagem e manutenção inclusos.
              </span>
            </p>
          </Reveal>

          {heroDesktopImage ? (
            <Reveal
              className={styles.heroVisual}
              distance={18}
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

                <div
                  className={styles.performanceNote}
                  aria-hidden="true"
                >
                  <strong>Performance</strong>
                  <span>
                    Estrutura rápida e preparada para SEO.
                  </span>
                </div>

                <div
                  className={styles.responsiveNote}
                  aria-hidden="true"
                >
                  <span>
                    <i />
                    <i />
                    <i />
                  </span>

                  <strong>100% responsivo</strong>
                </div>

                <figcaption>
                  Exemplo demonstrativo de projeto responsivo.
                </figcaption>
              </figure>
            </Reveal>
          ) : null}
        </div>

        <StoryProgress
          chapter={1}
          label="Conheça o serviço"
        />
      </section>

      <ServiceExamplesSnap
        examples={examples}
        localBusinessInspiration={localBusinessInspiration}
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
