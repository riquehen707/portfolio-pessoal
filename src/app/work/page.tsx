import { Button, Column, Heading, Meta, Row, Schema, Tag, Text } from "@once-ui-system/core";

import { getAllWorkProjects } from "@/app/work/projectData";
import {
  buildWorkJourneyEntries,
  formatWorkTimelineCompactDate,
  formatWorkTimelineDate,
  workFocusAreas,
  workJourneyStatusMeta,
} from "@/app/work/timelineData";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { AscendingTimeline } from "@/components/work/AscendingTimeline";
import { about, baseURL, contact, contentStrategy, person, servicesPage, work } from "@/resources";

import styles from "./work.module.scss";

const workStrategy = contentStrategy.pages.work;

function formatStatValue(value: number) {
  return value.toString().padStart(2, "0");
}

export async function generateMetadata() {
  return {
    ...Meta.generate({
      title: work.title,
      description: work.description,
      baseURL,
      image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
      path: work.path,
    }),
    keywords: workStrategy.seo.keywords,
  };
}

export default function Work() {
  const projects = getAllWorkProjects();
  const journeyEntries = buildWorkJourneyEntries(projects);
  const latestEntry = journeyEntries[0];

  if (!latestEntry) {
    return null;
  }

  return (
    <Column className={styles.page} fillWidth paddingTop="24" gap="24">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Início", url: baseURL },
          { name: "Projetos", url: `${baseURL}${work.path}` },
        ]}
      />

      <section className={styles.heroSection}>
        <div className={styles.heroGrid}>
          <div className={styles.heroMain}>
            <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
              Linha do tempo
            </Tag>

            <Heading as="h1" className={styles.heroTitle} variant="display-strong-s">
              Do chão ao céu: portfólio, serviços e direção em movimento.
            </Heading>

            <Text
              className={styles.heroLead}
              onBackground="neutral-weak"
              variant="heading-default-m"
              wrap="balance"
            >
              Esta página registra marcos reais. O topo mostra o momento atual. A base guarda o
              início da jornada. Cada nova etapa entra com data, tarefa e status.
            </Text>

            <Row className={styles.heroActions} gap="12" wrap>
              <Button
                href={contact.path}
                variant="primary"
                size="m"
                arrowIcon
                data-analytics-event="cta_click"
                data-analytics-label="Falar sobre um projeto"
                data-analytics-location="work_hero"
                data-analytics-type="primary"
              >
                Falar sobre um projeto
              </Button>
              <Button
                href={servicesPage.path}
                variant="secondary"
                size="m"
                arrowIcon
                data-analytics-event="cta_click"
                data-analytics-label="Ver serviços"
                data-analytics-location="work_hero"
                data-analytics-type="secondary"
              >
                Ver serviços
              </Button>
            </Row>

            <Text className={styles.heroNote} onBackground="neutral-weak" variant="body-default-s">
              A página não tenta parecer finalizada. Ela funciona como registro vivo da construção.
            </Text>
          </div>

          <aside className={styles.heroAside}>
            <div className={styles.currentCard}>
              <Text className={styles.sideEyebrow} variant="label-default-s" onBackground="neutral-weak">
                Momento atual
              </Text>

              <Heading as="h2" variant="heading-strong-l" wrap="balance">
                {latestEntry.task}
              </Heading>

              <div className={styles.currentMeta}>
                <span className={styles.statusPill} data-status={latestEntry.status}>
                  {workJourneyStatusMeta[latestEntry.status].label}
                </span>
                <Tag size="s" background="neutral-alpha-weak">
                  {latestEntry.category}
                </Tag>
              </div>

              <Text onBackground="neutral-weak" variant="body-default-s">
                Atualizado em {formatWorkTimelineDate(latestEntry.date)}.
              </Text>

              <div className={styles.snapshotRail}>
                <div className={styles.snapshotCard}>
                  <span className={styles.snapshotValue}>
                    {formatWorkTimelineCompactDate(latestEntry.date)}
                  </span>
                  <Text onBackground="neutral-weak" variant="body-default-s">
                    Última data
                  </Text>
                </div>
                <div className={styles.snapshotCard}>
                  <span className={styles.snapshotValue}>{formatStatValue(journeyEntries.length)}</span>
                  <Text onBackground="neutral-weak" variant="body-default-s">
                    Marcos
                  </Text>
                </div>
                <div className={styles.snapshotCard}>
                  <span className={styles.snapshotValue}>{formatStatValue(projects.length)}</span>
                  <Text onBackground="neutral-weak" variant="body-default-s">
                    Portfólio
                  </Text>
                </div>
              </div>
            </div>

            <div className={styles.focusPanel}>
              <Text className={styles.sideEyebrow} variant="label-default-s" onBackground="neutral-weak">
                Frentes de trabalho
              </Text>

              <div className={styles.focusList}>
                {workFocusAreas.map((area) => (
                  <div className={styles.focusItem} key={area.label}>
                    <Text className={styles.focusLabel} variant="label-default-s" onBackground="neutral-weak">
                      {area.label}
                    </Text>
                    <Text variant="body-default-s" onBackground="neutral-weak">
                      {area.value}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <AscendingTimeline entries={journeyEntries} />

      <section className={styles.notePanel}>
        <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
          Próximo passo
        </Tag>

        <Heading as="h2" variant="display-strong-s">
          Se quiser entrar nessa linha do tempo com um projeto real, vamos conversar.
        </Heading>

        <Text onBackground="neutral-weak" variant="body-default-m">
          Hoje o foco está em negócios locais e serviços que precisam de presença clara, captação
          melhor e operação digital mais organizada.
        </Text>

        <Row className={styles.panelActions} gap="12" wrap>
          <Button
            href={contact.path}
            variant="primary"
            size="m"
            arrowIcon
            data-analytics-event="cta_click"
            data-analytics-label="Vamos conversar"
            data-analytics-location="work_final_cta"
            data-analytics-type="primary"
          >
            Vamos conversar
          </Button>
          <Button href={about.path} variant="secondary" size="m" arrowIcon>
            Conhecer minha história
          </Button>
        </Row>
      </section>
    </Column>
  );
}
