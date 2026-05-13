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

const curveClasses = [styles.curveA, styles.curveB, styles.curveC, styles.curveD];

export function AscendingTimeline({ entries }: AscendingTimelineProps) {
  const currentEntry = entries[0];
  const currentStatusLabel = currentEntry ? workJourneyStatusMeta[currentEntry.status].label : null;

  return (
    <section className={styles.root} aria-labelledby="work-journey-heading">
      <div className={styles.scene} aria-hidden="true">
        <div className={styles.spaceBand} />
        <div className={styles.starField} />
        <div className={styles.skyBand} />

        <div className={styles.cloudBank}>
          <span className={`${styles.cloud} ${styles.cloudOne}`} />
          <span className={`${styles.cloud} ${styles.cloudTwo}`} />
          <span className={`${styles.cloud} ${styles.cloudThree}`} />
        </div>

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
            O topo encosta no espaço. No meio ainda existe céu. A base fica no chão, onde começa esta
            fase da jornada.
          </Text>
        </div>

        <div className={styles.timeline}>
          <div className={styles.pathGuide} aria-hidden="true">
            <svg className={styles.pathSvg} viewBox="0 0 160 1200" preserveAspectRatio="none">
              <path
                className={styles.pathGlow}
                d="M 106 32 C 140 148, 132 246, 82 344 S 34 556, 88 694 S 128 918, 70 1168"
              />
              <path
                className={styles.pathStroke}
                d="M 106 32 C 140 148, 132 246, 82 344 S 34 556, 88 694 S 128 918, 70 1168"
              />
            </svg>
          </div>

          <div className={`${styles.axisTop} ${styles.curveTop}`}>
            <div className={styles.axisNode}>
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
            const curveClassName = curveClasses[index % curveClasses.length];
            const currentClassName = index === 0 ? styles.itemCurrent : "";
            const detailsTitle = entry.detailsTitle ?? (entry.href ? "Ferramentas e estrutura" : "O que mudou");

            return (
              <article className={`${styles.item} ${curveClassName} ${currentClassName}`.trim()} key={entry.id}>
                <div className={styles.node}>
                  <span className={styles.nodeDot} aria-hidden="true" />
                </div>

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
              </article>
            );
          })}

          <div className={`${styles.axisBottom} ${styles.curveBottom}`}>
            <div className={styles.originNode}>
              <span className={styles.originDot} aria-hidden="true" />
            </div>

            <div className={styles.originCard}>
              <span className={styles.originSeal}>Origem</span>
              <Text variant="body-default-s" onBackground="neutral-weak">
                A base fica no chão. É daqui que esta fase sobe: estudo, trabalho e construção do
                portfólio andando juntos.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
