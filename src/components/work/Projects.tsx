import type { ComponentProps } from "react";

import { Column } from "@once-ui-system/core";

import { getWorkProjectRelevanceScore } from "@/app/work/projectData";
import { ProjectCard } from "@/components";
import { type BlogFile, getPosts } from "@/utils/utils";

import styles from "./Projects.module.scss";

const kindLabels = {
  personal: "Pessoal",
  study: "Estudo",
  client: "Cliente",
} as const;

type ProjectLayout = "stack" | "grid" | "editorial";
type ProjectCardVariant = "default" | "feature" | "compact";

interface ProjectsProps {
  projects?: BlogFile[];
  range?: [number, number?];
  exclude?: string[];
  layout?: ProjectLayout;
  cardVariant?: ProjectCardVariant;
  marginBottom?: ComponentProps<typeof Column>["marginBottom"];
  paddingX?: ComponentProps<typeof Column>["paddingX"];
}

export function Projects({
  projects,
  range,
  exclude,
  layout = "stack",
  cardVariant = "default",
  marginBottom = "40",
  paddingX = "l",
}: ProjectsProps) {
  let allProjects = projects ?? getPosts(["src", "app", "work", "projects"]);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = [...allProjects].sort((a, b) => {
    if (layout === "editorial") {
      return getWorkProjectRelevanceScore(b) - getWorkProjectRelevanceScore(a);
    }

    return (
      new Date(b.metadata.publishedAt ?? 0).getTime() -
      new Date(a.metadata.publishedAt ?? 0).getTime()
    );
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  if (displayedProjects.length === 0) {
    return null;
  }

  const renderCard = (
    post: BlogFile,
    index: number,
    variant: ProjectCardVariant,
  ) => {
    const images =
      post.metadata.images && post.metadata.images.length > 0
        ? post.metadata.images
        : post.metadata.image
          ? [post.metadata.image]
          : [];

    const displayLabels = Array.from(
      new Set(
        [post.metadata.tag, ...(post.metadata.stack ?? post.metadata.tags ?? [])].filter(
          Boolean,
        ) as string[],
      ),
    );

    return (
      <ProjectCard
        priority={index < 2}
        key={post.slug}
        href={`/work/${post.slug}`}
        images={images}
        title={post.metadata.title}
        objective={post.metadata.objective ?? undefined}
        description={post.metadata.summary ?? post.metadata.title}
        variant={variant}
        kindValue={post.metadata.kind}
        kind={
          post.metadata.kind
            ? kindLabels[post.metadata.kind as keyof typeof kindLabels]
            : undefined
        }
        stack={displayLabels}
        link={post.metadata.link || ""}
      />
    );
  };

  if (layout === "editorial") {
    const [leadProject, ...restProjects] = displayedProjects;

    return (
      <Column
        className={styles.editorial}
        fillWidth
        marginBottom={marginBottom}
        paddingX={paddingX}
      >
        {leadProject && <div className={styles.featureSlot}>{renderCard(leadProject, 0, "feature")}</div>}

        {restProjects.length > 0 && (
          <div className={styles.editorialGrid}>
            {restProjects.map((post, index) => renderCard(post, index + 1, "compact"))}
          </div>
        )}
      </Column>
    );
  }

  return (
    <Column
      className={layout === "grid" ? styles.grid : styles.list}
      fillWidth
      marginBottom={marginBottom}
      paddingX={paddingX}
    >
      {displayedProjects.map((post, index) => renderCard(post, index, cardVariant))}
    </Column>
  );
}
