import { Heading, Icon, Row, SmartLink, Tag, Text } from "@once-ui-system/core";

import {
  formatWorkTimelineDate,
  type WorkJourneyEntry,
  workJourneyStatusMeta,
} from "@/app/work/timelineData";
import { type IconName } from "@/resources/icons";

import styles from "./AscendingTimeline.module.scss";

type AscendingTimelineProps = {
  entries: WorkJourneyEntry[];
};

function getEntryIcon(entry: WorkJourneyEntry): IconName {
  if (entry.status === "published") return "document";
  if (entry.category === "Origem") return "calendar";
  if (entry.category === "Estrutura") return "grid";
  if (entry.category === "Direção") return "chart";
  if (entry.category === "Serviços") return "globe";
  return "rocket";
}

export function AscendingTimeline({ entries }: AscendingTimelineProps) {
  const currentEntry = entries[0];
  const publishedCount = entries.filter((entry) => entry.status === "published").length;
  const timelineCount = entries.length;

  return (
    <section className={styles.root} aria-labelledby="work-journey-heading">
      <div className={styles.header}>
        <div className={styles.intro}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Portfólio
          </Tag>
          <Heading id="work-journey-heading" as="h1" variant="display-strong-s" wrap="balance">
            Linha do tempo de projetos, estrutura e direção.
          </Heading>
          <Text className={styles.introLead} onBackground="neutral-weak" variant="body-default-m">
            O topo mostra o momento atual. Cada item pode ser aberto para revelar contexto, stack,
            próximos passos e registros do que já foi publicado.
          </Text>
        </div>

        <div className={styles.overview}>
          <div className={styles.overviewCard}>
            <Text className={styles.overviewLabel} variant="label-default-s" onBackground="neutral-weak">
              Agora
            </Text>
            <Heading as="h2" variant="heading-strong-m" wrap="balance">
              {currentEntry?.task ?? "Momento atual"}
            </Heading>
            {currentEntry && (
              <Text variant="body-default-s" onBackground="neutral-weak">
                {formatWorkTimelineDate(currentEntry.date)} ·{" "}
                {workJourneyStatusMeta[currentEntry.status].label}
              </Text>
            )}
          </div>

          <Row className={styles.stats} gap="8" wrap>
            <div className={styles.statPill}>
              <span className={styles.statValue}>{publishedCount}</span>
              <span className={styles.statLabel}>projetos publicados</span>
            </div>
            <div className={styles.statPill}>
              <span className={styles.statValue}>{timelineCount}</span>
              <span className={styles.statLabel}>marcos registrados</span>
            </div>
          </Row>
        </div>
      </div>

      <div className={styles.railSection}>
        <div className={styles.rail} aria-hidden="true" />

        <div className={styles.entryList}>
          {entries.map((entry, index) => {
            const statusMeta = workJourneyStatusMeta[entry.status];
            const markerIcon = getEntryIcon(entry);
            const isCurrent = index === 0;

            return (
              <details className={`${styles.entry} ${isCurrent ? styles.entryCurrent : ""}`} key={entry.id} open={isCurrent}>
                <summary className={styles.entrySummary}>
                  <div className={styles.markerColumn}>
                    <span className={styles.marker}>
                      <Icon name={markerIcon} size="s" />
                    </span>
                    {index < entries.length - 1 && <span className={styles.markerLine} />}
                  </div>

                  <div className={styles.entryCard}>
                    <div className={styles.entryMeta}>
                      <time className={styles.date}>{formatWorkTimelineDate(entry.date)}</time>

                      <div className={styles.metaTrail}>
                        <Tag size="s" background="neutral-alpha-weak">
                          {entry.category}
                        </Tag>
                        <span className={styles.statusPill} data-status={entry.status}>
                          {statusMeta.label}
                        </span>
                      </div>
                    </div>

                    <div className={styles.entryHeadlineRow}>
                      <Heading as="h2" variant="heading-strong-m" wrap="balance">
                        {entry.task}
                      </Heading>
                      <span className={styles.disclosureIcon} aria-hidden="true" />
                    </div>

                    <Text className={styles.summary} onBackground="neutral-weak" variant="body-default-m">
                      {entry.summary}
                    </Text>
                  </div>
                </summary>

                <div className={styles.entryContent}>
                  <Text className={styles.detailsLabel} variant="label-default-s" onBackground="neutral-weak">
                    {entry.detailsTitle ?? "Detalhes"}
                  </Text>

                  <ul className={styles.pointList}>
                    {entry.points.map((point) => (
                      <li className={styles.point} key={`${entry.id}-${point}`}>
                        {point}
                      </li>
                    ))}
                  </ul>

                  {entry.href && entry.ctaLabel && (
                    <SmartLink href={entry.href} suffixIcon="arrowRight">
                      {entry.ctaLabel}
                    </SmartLink>
                  )}
                </div>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
