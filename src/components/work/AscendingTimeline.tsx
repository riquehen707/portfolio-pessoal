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
  const currentStatusLabel = currentEntry ? workJourneyStatusMeta[currentEntry.status].label : null;

  return (
    <section className={styles.root} aria-labelledby="work-journey-heading">
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.skyGlow} />
        <div className={styles.starField} />

        <div className={styles.cloudBank}>
          <span className={`${styles.cloud} ${styles.cloudOne}`} />
          <span className={`${styles.cloud} ${styles.cloudTwo}`} />
          <span className={`${styles.cloud} ${styles.cloudThree}`} />
          <span className={`${styles.cloud} ${styles.cloudFour}`} />
        </div>

        <div className={styles.horizonGlow} />

        <div className={styles.terrain}>
          <span className={`${styles.hill} ${styles.hillLeft}`} />
          <span className={`${styles.hill} ${styles.hillCenter}`} />
          <span className={`${styles.hill} ${styles.hillRight}`} />
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.legend}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Portfólio
          </Tag>
          <Text className={styles.legendText} onBackground="neutral-weak" variant="body-default-m">
            A história começa no chão e sobe até as estrelas. O topo mostra o momento atual; a base
            guarda a origem do que está sendo construído.
          </Text>
        </div>

        <div className={styles.timeline}>
          <div className={styles.axisTop}>
            <div className={styles.axisStarWrap}>
              <span className={styles.axisStar} aria-hidden="true" />
            </div>

            <div className={styles.axisTopCopy}>
              <Text className={styles.axisEyebrow} variant="label-default-s" onBackground="neutral-weak">
                Hoje
              </Text>

              {currentEntry ? (
                <>
                  <Heading id="work-journey-heading" as="h1" variant="heading-strong-l" wrap="balance">
                    {currentEntry.task}
                  </Heading>
                  <Text onBackground="neutral-weak" variant="body-default-s">
                    {formatWorkTimelineDate(currentEntry.date)} · {currentStatusLabel}
                  </Text>
                </>
              ) : (
                <Heading id="work-journey-heading" as="h1" variant="heading-strong-l">
                  Momento atual
                </Heading>
              )}
            </div>
          </div>

          {entries.map((entry, index) => {
            const statusMeta = workJourneyStatusMeta[entry.status];
            const itemClassName = index % 2 === 0 ? styles.itemLeft : styles.itemRight;
            const currentClassName = index === 0 ? styles.itemCurrent : "";
            const detailsTitle = entry.detailsTitle ?? (entry.href ? "Ferramentas e estrutura" : "O que mudou");

            return (
              <article
                className={`${styles.item} ${itemClassName} ${currentClassName}`.trim()}
                key={entry.id}
              >
                <div className={styles.card}>
                  <div className={styles.cardMeta}>
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

                  <Heading as="h2" variant="heading-strong-l" wrap="balance">
                    {entry.task}
                  </Heading>

                  <Text className={styles.summary} onBackground="neutral-strong" variant="body-default-m">
                    {entry.summary}
                  </Text>

                  <div className={styles.detailsBlock}>
                    <Text className={styles.detailsLabel} variant="label-default-s" onBackground="neutral-weak">
                      {detailsTitle}
                    </Text>

                    <ul className={styles.pointList}>
                      {entry.points.map((point) => (
                        <li className={styles.point} key={`${entry.id}-${point}`}>
                          {point}
                        </li>
                      ))}
                    </ul>
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
                O ponto de partida fica aqui embaixo. Cada nova etapa sobe um pouco mais a história
                do portfólio, dos serviços e da direção do estúdio.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
