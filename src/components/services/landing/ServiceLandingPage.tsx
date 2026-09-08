import type { ReactNode } from "react";
import Link from "next/link";
import type {
  ServiceLanding,
  ServiceSection,
} from "@/content/service-landings/serviceLandingSchema";
import { ServiceAction } from "./ServiceAction";
import { ServiceHero, ServiceSectionContent } from "./ServiceSections";
import { ServiceTracking } from "./ServiceTracking";
import styles from "./ServiceLanding.module.scss";

export function ServiceLandingPage({
  landing,
  form,
  renderSection,
  className = "",
  heroVisual,
}: {
  landing: ServiceLanding;
  form?: ReactNode;
  renderSection?: (section: ServiceSection) => ReactNode | undefined;
  className?: string;
  heroVisual?: ReactNode;
}) {
  if (landing.conversion.kind === "form" && !form) {
    throw new Error(`A landing ${landing.id} exige um formulário integrado.`);
  }
  const context = {
    service_id: landing.id,
    landing_slug: landing.slug,
    conversion_kind: landing.conversion.kind,
    experiment_id: landing.experiment?.id,
    variant_id: landing.experiment?.variant,
  };
  return (
    <div
      className={`standaloneLandingRoot ${styles.page} ${landing.stickyCTA ? styles.withSticky : ""} ${className}`}
    >
      <ServiceTracking context={context} />
      <a href="#inicio" className={styles.skip}>
        Ir para a oferta
      </a>
      <header className={styles.brand}>
        <Link href="/" aria-label="henrique.dog — início">henrique.dog</Link>
        <Link href="/servicos">Voltar para serviços</Link>
      </header>
      <div className={styles.container}>
        <ServiceHero landing={landing} context={context} visual={heroVisual} />
        {landing.sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            data-section-type={section.type}
            aria-labelledby={`${section.id}-title`}
            className={styles.section}
          >
            <h2 id={`${section.id}-title`}>{section.title}</h2>
            {renderSection?.(section) ?? <ServiceSectionContent section={section} />}
            {section.type === "pricing" && (
              <ServiceAction
                conversion={landing.conversion}
                context={context}
                location={section.id}
              />
            )}
          </section>
        ))}
        {landing.conversion.kind === "form" && (
          <section id="contato" aria-labelledby="contato-title" className={styles.section}>
            <h2 id="contato-title">{landing.conversion.label}</h2>
            {form}
          </section>
        )}
        <section
          id="acao-final"
          className={`${styles.section} ${styles.final}`}
          aria-labelledby="acao-final-title"
        >
          <h2 id="acao-final-title">{landing.finalCTA.title}</h2>
          <p>{landing.finalCTA.description}</p>
          <ServiceAction conversion={landing.conversion} context={context} location="final" />
        </section>
        <footer className={styles.footer}>
          <p>
            <strong>{landing.provider.name}</strong> · {landing.provider.description}
          </p>
          {landing.legalLinks.length > 0 && (
            <nav aria-label="Informações legais">
              {landing.legalLinks.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </footer>
      </div>
      {landing.stickyCTA && (
        <ServiceAction
          conversion={landing.conversion}
          context={context}
          location="mobile-sticky"
          sticky
        />
      )}
    </div>
  );
}
