import Image from "next/image";
import Link from "next/link";
import type { ServiceHubCard } from "@/content/service-hub/serviceHubCardSchema";
import styles from "./ServiceCard.module.scss";

type ServiceCardProps = {
  service: ServiceHubCard;
  headingLevel?: "h2" | "h3";
  priority?: boolean;
};

export function ServiceCard({ service, headingLevel = "h3", priority = false }: ServiceCardProps) {
  const Heading = headingLevel;
  const href = `/servicos/${service.slug}`;

  return (
    <article className={styles.root} data-preview={service.preview.kind}>
      <Link
        className={styles.card}
        href={href}
        aria-label={`Ver serviço: ${service.title}`}
        data-analytics-event="services_card_click"
        data-analytics-service-id={service.id}
        data-analytics-intent={service.intent}
        data-analytics-location="services_hub_card"
      >
        <div className={styles.preview}>
          {service.preview.kind === "image" ? (
            <Image
              className={styles.image}
              src={service.preview.src}
              alt={service.preview.alt}
              fill
              sizes="(max-width: 520px) 82vw, (max-width: 719px) 78vw, (max-width: 1119px) 47vw, 31vw"
              priority={priority}
              data-position={service.preview.position}
            />
          ) : (
            <div className={styles.fallback} data-tone={service.preview.tone} aria-hidden="true">
              <span className={styles.browserBar}>henrique.dog / serviços</span>
              <span className={styles.fallbackTitle}>{service.preview.label}</span>
              <span className={styles.fallbackLine} />
              <span className={styles.fallbackLine} />
            </div>
          )}

          {service.badge ? (
            <span className={styles.badge} data-kind={service.badge.kind}>
              {service.badge.label}
            </span>
          ) : null}
        </div>

        <div className={styles.content}>
          <div className={styles.identity}>
            <Heading className={styles.title}>{service.title}</Heading>
            <p className={styles.context}>{service.context}</p>
          </div>

          <p className={styles.benefit}>{service.benefit}</p>

          <div className={styles.footer}>
            <div className={styles.price}>
              <span>{service.price.label}</span>
              <strong>{service.price.value}</strong>
            </div>
            <span className={styles.cta}>
              Ver serviço <span aria-hidden="true">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
