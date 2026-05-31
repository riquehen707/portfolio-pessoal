import { Heading, SmartLink, Tag, Text } from "@once-ui-system/core";

import {
  workFeedCategoryMeta,
  workFeedStatusMeta,
  type WorkFeedCategory,
  type WorkFeedEntry,
} from "@/app/work/feedData";
import { formatDate } from "@/utils/formatDate";

import styles from "./WorkFeed.module.scss";

type WorkFeedProps = {
  entries: WorkFeedEntry[];
  blogHref: string;
  productsHref: string;
  servicesHref: string;
};

const categoryOrder: WorkFeedCategory[] = ["case", "backstage", "learning", "system", "experiment"];
const categoryTargets: Record<WorkFeedCategory, { href: string; cta: string }> = {
  case: { href: "#destaque", cta: "Ver registro principal" },
  backstage: { href: "#registros", cta: "Ver bastidores" },
  learning: { href: "#aprendizados", cta: "Ver aprendizados" },
  system: { href: "#registros", cta: "Ver sistemas" },
  experiment: { href: "#registros", cta: "Ver experimentos" },
};

function getCountLabel(count: number) {
  return count === 1 ? "1 registro" : `${count} registros`;
}

export function WorkFeed({ entries, blogHref, productsHref, servicesHref }: WorkFeedProps) {
  const [featuredEntry, ...secondaryEntries] = entries;
  const learningEntries = entries.slice(0, 3);
  const categoryCards = categoryOrder.map((category) => ({
    category,
    ...workFeedCategoryMeta[category],
    ...categoryTargets[category],
    count: entries.filter((entry) => entry.category === category).length,
  }));

  return (
    <section className={styles.root} aria-labelledby="work-feed-heading">
      <header className={styles.header}>
        <div className={styles.intro}>
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Work / Laboratório
          </Tag>
          <Heading id="work-feed-heading" as="h1" variant="display-strong-s" wrap="balance">
            Bastidores, decisões e aprendizados.
          </Heading>
          <Text className={styles.introLead} onBackground="neutral-weak" variant="body-default-m">
            Esta área registra decisões ainda quentes: o que mudei, por que mudei e o que aprendi
            antes de transformar isso em artigo ou ferramenta.
          </Text>
        </div>

        <div className={styles.headerNote}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Função
          </Text>
          <Text variant="body-default-s" onBackground="neutral-weak">
            Menos vitrine pronta. Mais decisão visível.
          </Text>
        </div>
      </header>

      <section
        className={styles.categorySection}
        id="categorias"
        aria-labelledby="work-categories-heading"
      >
        <div className={styles.sectionHeader}>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            O que você encontra
          </Text>
          <Heading id="work-categories-heading" as="h2" variant="heading-strong-xl">
            Registros separados por função.
          </Heading>
        </div>

        <div className={styles.categoryGrid}>
          {categoryCards.map((category) => (
            <a className={styles.categoryCard} href={category.href} key={category.category}>
              <div className={styles.categoryTop}>
                <Heading as="h3" variant="heading-strong-m">
                  {category.label}
                </Heading>
                <span className={styles.count}>{getCountLabel(category.count)}</span>
              </div>
              <Text variant="body-default-s" onBackground="neutral-weak">
                {category.description}
              </Text>
              <span className={styles.categoryCta}>{category.cta}</span>
            </a>
          ))}
        </div>
      </section>

      {featuredEntry ? (
        <section
          className={styles.featuredSection}
          id="destaque"
          aria-labelledby="work-featured-heading"
        >
          <div className={styles.sectionHeader}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Destaque principal
            </Text>
            <Heading id="work-featured-heading" as="h2" variant="heading-strong-xl">
              Um registro atual do laboratório.
            </Heading>
          </div>

          <article className={styles.featured}>
            <div className={styles.featuredMeta}>
              <time className={styles.date}>{formatDate(featuredEntry.date, false)}</time>
              <Tag size="s" background="neutral-alpha-weak">
                {featuredEntry.type}
              </Tag>
              <span className={styles.statusPill} data-status={featuredEntry.status}>
                {workFeedStatusMeta[featuredEntry.status].label}
              </span>
            </div>

            <div className={styles.featuredBody}>
              <Heading as="h3" variant="display-strong-xs" wrap="balance">
                {featuredEntry.title}
              </Heading>
              <Text
                className={styles.featuredSummary}
                onBackground="neutral-weak"
                variant="heading-default-m"
              >
                {featuredEntry.summary}
              </Text>
            </div>

            <div className={styles.insightGrid}>
              <div>
                <Text
                  className={styles.eyebrow}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Contexto
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {featuredEntry.context}
                </Text>
              </div>
              <div>
                <Text
                  className={styles.eyebrow}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Decisão
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {featuredEntry.decision}
                </Text>
              </div>
              <div>
                <Text
                  className={styles.eyebrow}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  Aprendizado
                </Text>
                <Text variant="body-default-s" onBackground="neutral-weak">
                  {featuredEntry.learning}
                </Text>
              </div>
            </div>
          </article>
        </section>
      ) : null}

      {secondaryEntries.length > 0 ? (
        <section
          className={styles.feedSection}
          id="registros"
          aria-labelledby="work-feed-list-heading"
        >
          <div className={styles.sectionHeader}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Registros disponíveis
            </Text>
            <Heading id="work-feed-list-heading" as="h2" variant="heading-strong-xl">
              Processo, decisões e sistemas em uma ordem legível.
            </Heading>
          </div>

          <div className={styles.feed}>
            {secondaryEntries.map((entry) => {
              const statusMeta = workFeedStatusMeta[entry.status];
              const categoryMeta = workFeedCategoryMeta[entry.category];

              return (
                <article className={styles.entry} key={entry.id}>
                  <div className={styles.entryMeta}>
                    <time className={styles.date}>{formatDate(entry.date, false)}</time>
                    <div className={styles.metaTrail}>
                      <Tag size="s" background="neutral-alpha-weak">
                        {categoryMeta.label}
                      </Tag>
                      <span className={styles.statusPill} data-status={entry.status}>
                        {statusMeta.label}
                      </span>
                    </div>
                  </div>

                  <div className={styles.entryBody}>
                    <Heading as="h3" variant="heading-strong-m" wrap="balance">
                      {entry.title}
                    </Heading>
                    <Text
                      className={styles.summary}
                      onBackground="neutral-weak"
                      variant="body-default-m"
                    >
                      {entry.summary}
                    </Text>

                    <dl className={styles.entryDetails}>
                      <div>
                        <dt>Problema</dt>
                        <dd>{entry.context}</dd>
                      </div>
                      <div>
                        <dt>Decisão</dt>
                        <dd>{entry.decision}</dd>
                      </div>
                      <div>
                        <dt>Aprendizado</dt>
                        <dd>{entry.learning}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className={styles.entryFooter}>
                    <div className={styles.tagRow}>
                      {entry.tags.map((tag) => (
                        <span className={styles.inlineTag} key={`${entry.id}-${tag}`}>
                          {tag}
                        </span>
                      ))}
                    </div>

                    {entry.href && entry.ctaLabel ? (
                      <SmartLink href={entry.href} suffixIcon="arrowRight">
                        {entry.ctaLabel}
                      </SmartLink>
                    ) : null}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      {learningEntries.length > 0 ? (
        <section
          className={styles.learningSection}
          id="aprendizados"
          aria-labelledby="work-learnings-heading"
        >
          <div className={styles.sectionHeader}>
            <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
              Aprendizados recentes
            </Text>
            <Heading id="work-learnings-heading" as="h2" variant="heading-strong-xl">
              Ideias que podem reaparecer em artigos, serviços ou produtos.
            </Heading>
          </div>

          <div className={styles.learningList}>
            {learningEntries.map((entry) => (
              <article className={styles.learningItem} key={`learning-${entry.id}`}>
                <Text
                  className={styles.eyebrow}
                  variant="label-default-s"
                  onBackground="neutral-weak"
                >
                  {entry.type}
                </Text>
                <Text variant="body-default-m" onBackground="neutral-weak">
                  {entry.learning}
                </Text>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className={styles.nextStep} id="proximo" aria-labelledby="work-next-heading">
        <div>
          <Text className={styles.eyebrow} variant="label-default-s" onBackground="neutral-weak">
            Próximo passo
          </Text>
          <Heading id="work-next-heading" as="h2" variant="heading-strong-xl" wrap="balance">
            Quando o registro fica estável, ele vira material de estudo.
          </Heading>
        </div>
        <Text variant="body-default-m" onBackground="neutral-weak">
          A biblioteca reúne os guias mais organizados. O Work mostra parte do caminho até eles.
        </Text>
        <div className={styles.nextStepLinks}>
          <SmartLink href={blogHref} suffixIcon="arrowRight">
            Continuar na biblioteca
          </SmartLink>
          <SmartLink href={productsHref} suffixIcon="arrowRight">
            Ver ferramentas
          </SmartLink>
          <SmartLink href={servicesHref} suffixIcon="arrowRight">
            Entender consultoria
          </SmartLink>
        </div>
      </section>
    </section>
  );
}
