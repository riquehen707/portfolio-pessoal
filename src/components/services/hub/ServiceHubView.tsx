import type { ServiceHubGroup } from "@/data/service-hub";
import { ServiceHubCatalog } from "./ServiceHubCatalog";
import styles from "./ServiceHubView.module.scss";

type ServiceHubViewProps = {
  groups: readonly ServiceHubGroup[];
  contactHref: string;
};

export function ServiceHubView({ groups, contactHref }: ServiceHubViewProps) {
  return (
    <div className={styles.shell}>
      <section className={styles.hero} aria-labelledby="service-hub-title">
        <p className={styles.kicker}>Serviços</p>
        <h1 id="service-hub-title">Sites, portfólios e melhorias.</h1>
        <p className={styles.lead}>
          Compare serviços e preços.
        </p>
        <div className={styles.heroActions}>
          <a
            className={styles.primaryAction}
            href="#servicos-por-objetivo"
            data-analytics-event="services_intent_select"
            data-analytics-intent="all"
            data-analytics-location="services_hub_hero"
          >
            Ver serviços
          </a>
          <a className={styles.textAction} href={contactHref}>
            Falar comigo <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>

      <ServiceHubCatalog groups={groups} />

      <section className={styles.contact} id="ajuda-escolher" aria-labelledby="contact-title">
        <div className={styles.contactCopy}>
          <p className={styles.kicker}>Contato</p>
          <h2 id="contact-title">Não sabe qual serviço escolher?</h2>
          <p>Conte o que precisa mostrar, vender ou organizar.</p>
        </div>
        <div className={styles.contactActions}>
          <a
            className={styles.primaryAction}
            href={contactHref}
            data-analytics-event="services_help_click"
            data-analytics-location="services_hub_contact"
          >
            Falar comigo
          </a>
        </div>
      </section>
    </div>
  );
}
