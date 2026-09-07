import type { ServiceHubGroup } from "@/data/service-hub";
import { ServiceGroupCarousel } from "./ServiceGroupCarousel";
import { ServiceIntentNav } from "./ServiceIntentNav";
import styles from "./ServiceHubCatalog.module.scss";

export function ServiceHubCatalog({ groups }: { groups: readonly ServiceHubGroup[] }) {
  return (
    <div className={styles.catalog} id="servicos-por-objetivo">
      <ServiceIntentNav groups={groups} />
      <div className={styles.groups}>
        {groups.map((group, index) => (
          <ServiceGroupCarousel group={group} key={group.intent} priority={index === 0} />
        ))}
      </div>
    </div>
  );
}
