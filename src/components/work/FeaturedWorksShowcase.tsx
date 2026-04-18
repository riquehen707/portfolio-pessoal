import Link from "next/link";

import { Column, Heading, Icon, Media, Row, SmartLink, Tag, Text } from "@once-ui-system/core";

import {
  getWorkProjectKindLabel,
  getWorkProjectStack,
  resolveWorkProjectMediaSrc,
} from "@/app/work/projectData";
import { work } from "@/resources";
import { type BlogFile } from "@/utils/utils";

import styles from "./FeaturedWorksShowcase.module.scss";

type FeaturedWorksShowcaseProps = {
  projects: BlogFile[];
};

function getProjectBaseScore(project: BlogFile) {
  const kindScore =
    project.metadata.kind === "client" ? 42 : project.metadata.kind === "study" ? 28 : 18;
  const hasImageScore = project.metadata.image || project.metadata.images?.length ? 18 : 0;
  const stackScore = Math.min(getWorkProjectStack(project).length, 4) * 3;
  const tagScore = project.metadata.tag ? 6 : 0;
  const date = new Date(project.metadata.updatedAt ?? project.metadata.publishedAt ?? 0).getTime();
  const recencyScore = Number.isFinite(date) ? date / 1_000_000_000_000 : 0;

  return kindScore + hasImageScore + stackScore + tagScore + recencyScore;
}

function getProjectDiversityScore(project: BlogFile, selected: BlogFile[]) {
  if (selected.length === 0) return 0;

  return selected.reduce((score, current) => {
    const currentStack = new Set(getWorkProjectStack(current));
    const projectStack = getWorkProjectStack(project);
    const sharedStackCount = projectStack.filter((item) => currentStack.has(item)).length;
    const sameKind = current.metadata.kind && current.metadata.kind === project.metadata.kind;
    const sameTag = current.metadata.tag && current.metadata.tag === project.metadata.tag;

    let total = score;

    if (!sameKind) total += 7;
    if (!sameTag) total += 8;
    if (sharedStackCount === 0) total += 5;
    if (sharedStackCount >= 2) total -= 3;

    return total;
  }, 0);
}

function selectFeaturedProjects(projects: BlogFile[]) {
  const pool = [...projects];
  const selected: BlogFile[] = [];

  while (pool.length > 0 && selected.length < 3) {
    let bestIndex = 0;
    let bestScore = -Infinity;

    pool.forEach((project, index) => {
      const score = getProjectBaseScore(project) + getProjectDiversityScore(project, selected);

      if (score > bestScore) {
        bestIndex = index;
        bestScore = score;
      }
    });

    selected.push(pool.splice(bestIndex, 1)[0]);
  }

  return selected;
}

function getProjectLead(project: BlogFile) {
  return project.metadata.summary?.trim() || project.metadata.tag || project.metadata.title;
}

function getProjectImage(project: BlogFile) {
  const candidate = project.metadata.image || project.metadata.images?.[0];
  return resolveWorkProjectMediaSrc(candidate) ?? candidate;
}

export function FeaturedWorksShowcase({ projects }: FeaturedWorksShowcaseProps) {
  const featuredProjects = selectFeaturedProjects(projects);
  const [mainProject, ...sideProjects] = featuredProjects;

  if (!mainProject) {
    return null;
  }

  const mainImage = getProjectImage(mainProject);
  const mainKind = getWorkProjectKindLabel(mainProject);
  const mainStack = getWorkProjectStack(mainProject);
  const supportCards = [
    {
      key: "curation",
      eyebrow: "Curadoria em expansão",
      title: "Novos cases entram aqui conforme passam por revisão editorial.",
      description:
        "A vitrine prioriza poucos projetos por vez para manter leitura forte, contraste entre nichos e sensação de portfólio premium.",
      cta: "Explorar seção Works",
    },
    {
      key: "explore",
      eyebrow: "Mais projetos",
      title: "Veja a seção completa para acompanhar próximos estudos de caso.",
      description:
        "A seleção cresce automaticamente conforme novos projetos ganham relevância, imagem forte e contexto estratégico.",
      cta: "Ir para Works",
    },
  ].slice(0, Math.max(0, 2 - sideProjects.length));

  return (
    <section className={styles.section} aria-labelledby="featured-works-heading">
      <Row className={styles.header} fillWidth horizontal="between" s={{ direction: "column" }}>
        <Column className={styles.copy} gap="8">
          <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
            Works
          </Tag>
          <Heading id="featured-works-heading" as="h2" variant="display-strong-s">
            Projetos selecionados para mostrar direção, execução e critério.
          </Heading>
          <Text onBackground="neutral-weak" variant="heading-default-m" wrap="balance">
            Uma amostra enxuta dos trabalhos mais relevantes, pensada para destacar solução,
            acabamento visual e leitura estratégica.
          </Text>
        </Column>

        <SmartLink href={work.path} suffixIcon="arrowRight">
          Ver portfólio completo
        </SmartLink>
      </Row>

      <div className={styles.layout}>
        <Link className={styles.mainCard} href={`/work/${mainProject.slug}`}>
          {mainImage && (
            <div className={styles.mainMedia}>
              <Media
                priority
                src={mainImage}
                alt={mainProject.metadata.title}
                aspectRatio="16 / 10"
                sizes="(max-width: 900px) 100vw, 780px"
              />
            </div>
          )}

          <Column className={styles.mainContent} gap="16">
            <Row className={styles.metaRow} wrap gap="8">
              {mainKind && (
                <Tag size="s" background="brand-alpha-weak" onBackground="brand-strong">
                  {mainKind}
                </Tag>
              )}
              {mainStack.slice(0, 3).map((item) => (
                <Tag key={`${mainProject.slug}-${item}`} size="s" background="neutral-alpha-weak">
                  {item}
                </Tag>
              ))}
            </Row>

            <Column gap="12">
              <Heading className={styles.title} as="h3" variant="display-strong-s" wrap="balance">
                {mainProject.metadata.title}
              </Heading>
              <Text className={styles.mainDescription} onBackground="neutral-weak" wrap="balance">
                {getProjectLead(mainProject)}
              </Text>
            </Column>

            <Row className={styles.cardHint} gap="8" vertical="center">
              <Text variant="label-default-s">Ver projeto</Text>
              <Icon name="arrowRight" size="xs" />
            </Row>
          </Column>
        </Link>

        <div className={styles.sideColumn}>
          {sideProjects.map((project) => {
            const image = getProjectImage(project);
            const stack = getWorkProjectStack(project);

            return (
              <Link className={styles.sideCard} key={project.slug} href={`/work/${project.slug}`}>
                {image && (
                  <div className={styles.sideMedia}>
                    <Media
                      src={image}
                      alt={project.metadata.title}
                      aspectRatio="5 / 4"
                      sizes="(max-width: 900px) 100vw, 240px"
                    />
                  </div>
                )}

                <Column className={styles.sideContent} gap="12">
                  <Column gap="8">
                    <Heading as="h3" variant="heading-strong-m" wrap="balance">
                      {project.metadata.title}
                    </Heading>
                    <Text
                      className={styles.summary}
                      onBackground="neutral-weak"
                      variant="body-default-s"
                    >
                      {getProjectLead(project)}
                    </Text>
                  </Column>

                  {stack.length > 0 && (
                    <Row className={styles.stackRow} wrap gap="8">
                      {stack.slice(0, 2).map((item) => (
                        <Tag
                          key={`${project.slug}-${item}`}
                          size="s"
                          background="neutral-alpha-weak"
                        >
                          {item}
                        </Tag>
                      ))}
                    </Row>
                  )}
                </Column>
              </Link>
            );
          })}

          {supportCards.map((card) => (
            <div className={styles.supportCard} key={card.key}>
              <Column gap="12">
                <Text className={styles.note} variant="label-default-s" onBackground="neutral-weak">
                  {card.eyebrow}
                </Text>
                <Heading as="h3" variant="heading-strong-m" wrap="balance">
                  {card.title}
                </Heading>
                <Text onBackground="neutral-weak" variant="body-default-s">
                  {card.description}
                </Text>
              </Column>

              <div className={styles.ctaRow}>
                <SmartLink href={work.path} suffixIcon="arrowRight">
                  {card.cta}
                </SmartLink>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
