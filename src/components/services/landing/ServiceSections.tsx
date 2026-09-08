import Image from "next/image";
import type { ReactNode } from "react";
import type {
  ServiceLanding,
  ServiceMedia,
  ServiceSection,
} from "@/content/service-landings/serviceLandingSchema";
import type { ServiceTrackingContext } from "./analytics";
import { ServiceAction } from "./ServiceAction";
import styles from "./ServiceLanding.module.scss";

export function ServiceImage({
  media,
  priority = false,
}: { media: ServiceMedia; priority?: boolean }) {
  return (
    <figure className={styles.media}>
      <Image
        src={media.src}
        alt={media.alt}
        width={media.width}
        height={media.height}
        sizes="(max-width: 720px) 100vw, 560px"
        priority={priority}
      />
      <figcaption>
        {media.caption} · {media.credit}
      </figcaption>
    </figure>
  );
}

export function ServiceHero({
  landing,
  context,
  visual,
}: { landing: ServiceLanding; context: ServiceTrackingContext; visual?: ReactNode }) {
  const { hero } = landing;
  const monthly = landing.sections
    .find((section) => section.type === "pricing")
    ?.items.find((item) => item.cadence === "monthly");
  return (
    <section
      id="inicio"
      aria-labelledby="service-title"
      className={`${styles.hero} ${hero.layout === "split" && (hero.image || visual) ? styles.split : ""}`}
    >
      <div>
        <p className={styles.eyebrow}>{hero.eyebrow}</p>
        <h1 id="service-title">{hero.title}</h1>
        <p className={styles.lead}>{hero.description}</p>
        <p>
          <strong>{hero.benefit}</strong>
        </p>
        <p>{hero.audience}</p>
        {hero.price && <p className={styles.price}>{hero.price}</p>}
        {monthly && <p>{monthly.details}</p>}
        <ServiceAction conversion={landing.conversion} context={context} location="hero" />
      </div>
      {visual ?? (hero.image && <ServiceImage media={hero.image} priority />)}
    </section>
  );
}

type ItemsSection = Extract<ServiceSection, { items: { title: string; description: string }[] }>;
export function ServiceBenefits({ section }: { section: ItemsSection }) {
  return (
    <ul className={styles.items}>
      {section.items.map((item) => (
        <li key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ul>
  );
}
export const ServiceDeliverables = ServiceBenefits;

export function ServiceProcess({
  section,
}: { section: Extract<ServiceSection, { type: "process" }> }) {
  return (
    <ol className={styles.process}>
      {section.items.map((item) => (
        <li key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </li>
      ))}
    </ol>
  );
}

const cadenceLabels = {
  once: "Implantação",
  monthly: "Por mês",
  yearly: "Por ano",
  included: "Incluído",
  "on-request": "Sob consulta",
};
export function ServicePricing({
  section,
}: { section: Extract<ServiceSection, { type: "pricing" }> }) {
  return (
    <>
      <p>{section.description}</p>
      <dl className={styles.pricing}>
        {section.items.map((item) => (
          <div key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              <strong>{item.amount}</strong> · {cadenceLabels[item.cadence]}
              <p>{item.details}</p>
            </dd>
          </div>
        ))}
      </dl>
      <p>{section.terms}</p>
    </>
  );
}

export function ServiceProof({ section }: { section: Extract<ServiceSection, { type: "proof" }> }) {
  return (
    <div className={styles.proof}>
      {section.items.map((item) => (
        <div key={item.title}>
          <h3>{item.title}</h3>
          {item.kind === "testimonial" ? (
            <blockquote>{item.description}</blockquote>
          ) : (
            <p>{item.description}</p>
          )}
          <p className={styles.caption}>{item.attribution}</p>
        </div>
      ))}
    </div>
  );
}

export function ServiceFAQ({ section }: { section: Extract<ServiceSection, { type: "faq" }> }) {
  return (
    <div className={styles.faq}>
      {section.items.map((item) => (
        <details key={item.question}>
          <summary>{item.question}</summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function ServiceSectionContent({ section }: { section: ServiceSection }) {
  switch (section.type) {
    case "problem":
    case "solution":
      return (
        <>
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </>
      );
    case "benefits":
    case "audience":
      return <ServiceBenefits section={section} />;
    case "deliverables":
      return <ServiceDeliverables section={section} />;
    case "process":
      return <ServiceProcess section={section} />;
    case "pricing":
      return <ServicePricing section={section} />;
    case "proof":
      return <ServiceProof section={section} />;
    case "faq":
      return <ServiceFAQ section={section} />;
    case "demonstration":
      return (
        <>
          {section.illustrative && (
            <p className={styles.eyebrow}>Projeto demonstrativo · sem resultados de cliente</p>
          )}
          <p>{section.description}</p>
          {section.image && <ServiceImage media={section.image} />}
        </>
      );
  }
}
