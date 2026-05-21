import { Heading, Media, SmartLink, Tag, Text } from "@once-ui-system/core";

import { workFeedStatusMeta, type WorkFeedEntry } from "@/app/work/feedData";
import { formatDate } from "@/utils/formatDate";

import styles from "./WorkFeed.module.scss";

type WorkFeedProps = {
  entries: WorkFeedEntry[];
  blogHref: string;
};

export function WorkFeed({ entries, blogHref }: WorkFeedProps) {
  const publishedArticles = entries.filter((entry) => entry.status === "published").length;
  const internalUpdates = entries.length - publishedArticles;
  const [featuredEntry, ...secondaryEntries] = entries;
  const highlightedEntries = secondaryEntries.slice(0, 3);
  const gridEntries = secondaryEntries.slice(3);

  return (
    <section className={styles.root} aria-labelledby="work-feed-heading">
      <header className={styles.header}>
        <div className={styles.intro}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Work
          </Tag>
          <Heading id="work-feed-heading" as="h1" variant="display-strong-s" wrap="balance">
            Projetos e bastidores em construção.
          </Heading>
          <Text className={styles.introLead} onBackground="neutral-weak" variant="body-default-m">
            Decisões, aprendizados e registros do processo.
          </Text>
        </div>

        <div className={styles.heroVisual}>
          <Media
            src="/api/og/generate?title=Work&subtitle=projetos%20e%20bastidores"
            alt="Capa editorial da seção Work"
            aspectRatio="16/10"
            sizes="(max-width: 900px) 100vw, 520px"
            border="neutral-alpha-weak"
            radius="m"
          />
        </div>
      </header>

      <div className={styles.overview}>
        <div className={styles.overviewBlock}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Em /work
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Sistemas, estudos e registros em andamento.
          </Text>
        </div>

        <div className={styles.overviewBlock}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Em /blog
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Estratégia, marketing e design aplicados a negócios digitais.
          </Text>
          <SmartLink href={blogHref} suffixIcon="arrowRight">
            Ver blog
          </SmartLink>
        </div>

        <div className={styles.statRow}>
          <div className={styles.statPill}>
            <span className={styles.statValue}>{publishedArticles}</span>
            <span className={styles.statLabel}>leituras prontas</span>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statValue}>{internalUpdates}</span>
            <span className={styles.statLabel}>registros em ajuste</span>
          </div>
        </div>
      </div>

      {featuredEntry ? (
        <article className={styles.featured}>
          <div className={styles.featuredMeta}>
            <time className={styles.date}>{formatDate(featuredEntry.date, false)}</time>
            <span className={styles.statusPill} data-status={featuredEntry.status}>
              {workFeedStatusMeta[featuredEntry.status].label}
            </span>
          </div>
          <div className={styles.featuredBody}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Destaque
            </Text>
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              {featuredEntry.title}
            </Heading>
            <Text className={styles.featuredSummary} onBackground="neutral-weak" variant="heading-default-m">
              {featuredEntry.summary}
            </Text>
          </div>
          {featuredEntry.notes.length > 0 && (
            <ul className={styles.featuredList}>
              {featuredEntry.notes.map((note) => (
                <li key={`${featuredEntry.id}-${note}`}>{note}</li>
              ))}
            </ul>
          )}
        </article>
      ) : null}

      {highlightedEntries.length > 0 ? (
        <section className={styles.highlights} aria-labelledby="work-highlights-heading">
          <div className={styles.sectionHeader}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Destaques
            </Text>
            <Heading id="work-highlights-heading" as="h2" variant="heading-strong-xl">
              Leituras rápidas do processo
            </Heading>
          </div>

          <div className={styles.highlightList}>
            {highlightedEntries.map((entry, index) => (
              <article className={styles.highlightItem} key={entry.id}>
                <span className={styles.highlightIndex}>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <Heading as="h3" variant="heading-strong-m" wrap="balance">
                    {entry.title}
                  </Heading>
                  <Text className={styles.summary} onBackground="neutral-weak" variant="body-default-m">
                    {entry.summary}
                  </Text>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {gridEntries.length > 0 ? (
        <section className={styles.feedSection} aria-labelledby="work-feed-list-heading">
          <div className={styles.sectionHeader}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Arquivo
            </Text>
            <Heading id="work-feed-list-heading" as="h2" variant="heading-strong-xl">
              Todos os registros
            </Heading>
          </div>

          <div className={styles.feed}>
            {gridEntries.map((entry) => {
              const statusMeta = workFeedStatusMeta[entry.status];

              return (
              <article className={styles.entry} key={entry.id}>
                <div className={styles.entryMeta}>
                  <time className={styles.date}>{formatDate(entry.date, false)}</time>
                  <div className={styles.metaTrail}>
                    <Tag size="s" background="neutral-alpha-weak">
                      {entry.type}
                    </Tag>
                    <span className={styles.statusPill} data-status={entry.status}>
                      {statusMeta.label}
                    </span>
                  </div>
                </div>

                <div className={styles.entryBody}>
                  <Heading as="h2" variant="heading-strong-m" wrap="balance">
                    {entry.title}
                  </Heading>
                  <Text className={styles.summary} onBackground="neutral-weak" variant="body-default-m">
                    {entry.summary}
                  </Text>

                  {entry.notes.length > 0 && (
                    <ul className={styles.noteList}>
                      {entry.notes.map((note) => (
                        <li className={styles.note} key={`${entry.id}-${note}`}>
                          {note}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className={styles.entryFooter}>
                  <div className={styles.tagRow}>
                    {entry.tags.map((tag) => (
                      <span className={styles.inlineTag} key={`${entry.id}-${tag}`}>
                        {tag}
                      </span>
                    ))}
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
          </div>
        </section>
      ) : null}
    </section>
  );
}
