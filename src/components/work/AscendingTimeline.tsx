import { Heading, SmartLink, Tag, Text } from "@once-ui-system/core";

import {
  formatWorkTimelineDate,
  type WorkJourneyEntry,
  workJourneyStatusMeta,
} from "@/app/work/timelineData";

import styles from "./AscendingTimeline.module.scss";

type AscendingTimelineProps = {
  entries: WorkJourneyEntry[];
};

export function AscendingTimeline({ entries }: AscendingTimelineProps) {
  const currentEntry = entries[0];

  return (
    <section className={styles.root} aria-labelledby="work-journey-heading">
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.skyGlow} />
        <div className={styles.starField} />
        <div className={styles.mistLayer} />
        <div className={styles.groundGlow} />
      </div>

      <div className={styles.content}>
        <div className={styles.intro}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Portfólio
          </Tag>
          <Heading id="work-journey-heading" as="h2" variant="display-strong-s">
            Linha do tempo em ascensão
          </Heading>
          <Text className={styles.introLead} onBackground="neutral-weak" variant="body-default-m">
            O topo mostra o momento atual. A base guarda a origem. Cada marco entra com data,
            tarefa e status para dar continuidade ao que está sendo construído.
          </Text>
        </div>

        {currentEntry && (
          <div className={styles.markerRow}>
            <div className={styles.marker}>
              <span className={styles.markerOrb} aria-hidden="true" />
              <Text variant="label-default-s">Hoje</Text>
            </div>
            <Text onBackground="neutral-weak" variant="body-default-s">
              Etapa atual: {currentEntry.task} em {formatWorkTimelineDate(currentEntry.date)}.
            </Text>
          </div>
        )}

        <div className={styles.timeline}>
          <div className={styles.axisTop}>
            <div className={styles.axisStarWrap}>
              <span className={styles.axisStar} aria-hidden="true" />
            </div>
            <div className={styles.axisTopCopy}>
              <Text className={styles.axisEyebrow} variant="label-default-s" onBackground="neutral-weak">
                Céu atual
              </Text>
              <Text variant="body-default-s" onBackground="neutral-weak">
                O ponto mais alto marca o estado presente da jornada.
              </Text>
            </div>
          </div>

          {entries.map((entry, index) => {
            const statusMeta = workJourneyStatusMeta[entry.status];
            const itemClassName = index % 2 === 0 ? styles.itemLeft : styles.itemRight;
            const currentClassName = index === 0 ? styles.itemCurrent : "";

            return (
              <article
                className={`${styles.item} ${itemClassName} ${currentClassName}`.trim()}
                key={entry.id}
              >
                <div className={styles.card}>
                  <div className={styles.cardMeta}>
                    <time className={styles.date}>{formatWorkTimelineDate(entry.date)}</time>
                    <span className={styles.statusPill} data-status={entry.status}>
                      {statusMeta.label}
                    </span>
                  </div>

                  <div className={styles.cardHeader}>
                    <Tag size="s" background="neutral-alpha-weak">
                      {entry.category}
                    </Tag>
                  </div>

                  <Heading as="h3" variant="heading-strong-l" wrap="balance">
                    {entry.task}
                  </Heading>

                  <Text onBackground="neutral-weak" variant="body-default-s">
                    {entry.summary}
                  </Text>

                  <div className={styles.pointList}>
                    {entry.points.map((point) => (
                      <span className={styles.point} key={`${entry.id}-${point}`}>
                        {point}
                      </span>
                    ))}
                  </div>

                  {entry.href && entry.ctaLabel && (
                    <SmartLink href={entry.href} suffixIcon="arrowRight">
                      {entry.ctaLabel}
                    </SmartLink>
                  )}
                </div>

                <div className={styles.node}>
                  <span className={styles.nodeDot} aria-hidden="true" />
                </div>
              </article>
            );
          })}

          <div className={styles.axisBottom}>
            <div className={styles.originCard}>
              <span className={styles.originSeal}>Origem</span>
              <Text variant="body-default-s" onBackground="neutral-weak">
                A base fica aqui embaixo. O movimento sobe etapa por etapa, do chão ao céu.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
