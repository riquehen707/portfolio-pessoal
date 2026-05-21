import { Heading, SmartLink, Tag, Text } from "@once-ui-system/core";

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

  return (
    <section className={styles.root} aria-labelledby="work-feed-heading">
      <div className={styles.header}>
        <div className={styles.intro}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Work
          </Tag>
          <Heading id="work-feed-heading" as="h1" variant="display-strong-s" wrap="balance">
            Feed de projetos, construcao e publicacoes.
          </Heading>
          <Text className={styles.introLead} onBackground="neutral-weak" variant="body-default-m">
            O /work agora funciona como um feed limpo de projetos pessoais, sistemas, cases e
            atualizacoes do que está sendo construido.
          </Text>
        </div>

        <div className={styles.aside}>
          <div className={styles.asideBlock}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Em /work
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Projetos pessoais, sistemas autorais, bastidores e artigos do próprio portfolio.
            </Text>
          </div>

          <div className={styles.asideBlock}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Em /blog
            </Text>
            <Text variant="body-default-s" onBackground="neutral-weak">
              Estudos, analises e possiveis noticias ligadas a marketing, design e negócio.
            </Text>
            <SmartLink href={blogHref} suffixIcon="arrowRight">
              Ver blog
            </SmartLink>
          </div>

          <div className={styles.statRow}>
            <div className={styles.statPill}>
              <span className={styles.statValue}>{publishedArticles}</span>
              <span className={styles.statLabel}>artigos publicados</span>
            </div>
            <div className={styles.statPill}>
              <span className={styles.statValue}>{internalUpdates}</span>
              <span className={styles.statLabel}>atualizacoes</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.feed}>
        {entries.map((entry) => {
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
  );
}
