import Link from "next/link";
import type { ServiceHubGroup } from "@/data/service-hub";
import { ServiceCard } from "./ServiceCard";
import styles from "./ServiceGroupCarousel.module.scss";

const minimumCardsForViewAll = 6;

export function ServiceGroupCarousel({
  group,
  priority = false,
}: {
  group: ServiceHubGroup;
  priority?: boolean;
}) {
  const titleId = `${group.id}-title`;
  const descriptionId = `${group.id}-description`;
  const showAll = Boolean(group.allHref && group.cards.length >= minimumCardsForViewAll);

  return (
    <section className={styles.section} id={group.id} aria-labelledby={titleId}>
      <header className={styles.header}>
        <div className={styles.heading}>
          <h2 id={titleId}>{group.title}</h2>
          <p id={descriptionId}>{group.description}</p>
        </div>
        {showAll ? (
          <Link className={styles.viewAll} href={group.allHref!}>
            Ver todos <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </header>

      <ol
        className={styles.track}
        aria-label={`Serviços em ${group.title.toLowerCase()}`}
        aria-describedby={descriptionId}
        tabIndex={0}
      >
        {group.cards.map((service, index) => (
          <li className={styles.slide} key={service.id}>
            <ServiceCard service={service} priority={priority && index === 0} />
          </li>
        ))}
      </ol>
    </section>
  );
}
