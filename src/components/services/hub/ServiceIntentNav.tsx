import type { ServiceHubGroup } from "@/data/service-hub";
import styles from "./ServiceIntentNav.module.scss";

export function ServiceIntentNav({ groups }: { groups: readonly ServiceHubGroup[] }) {
  return (
    <nav className={styles.nav} aria-label="Navegação por intenção">
      <div className={styles.rail}>
        <a
          className={styles.link}
          href="#servicos-por-objetivo"
          data-analytics-event="services_intent_select"
          data-analytics-intent="all"
          data-analytics-location="services_hub_navigation"
        >
          Todos
        </a>
        {groups.map((group) => (
          <a
            className={styles.link}
            href={`#${group.id}`}
            key={group.intent}
            data-analytics-event="services_intent_select"
            data-analytics-intent={group.intent}
            data-analytics-location="services_hub_navigation"
          >
            {group.navigationLabel}
          </a>
        ))}
      </div>
    </nav>
  );
}
