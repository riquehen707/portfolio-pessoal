import type { ComponentProps } from "react";

import { ProjectCard } from "@/components";
import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";

import styles from "./Projects.module.scss";

const kindLabels = {
  personal: "Projeto pessoal",
  study: "Estudo de caso",
  client: "Case de cliente",
} as const;

type ProjectLayout = "stack" | "grid";
type ProjectCardVariant = "default" | "feature" | "compact";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  layout?: ProjectLayout;
  cardVariant?: ProjectCardVariant;
  marginBottom?: ComponentProps<typeof Column>["marginBottom"];
  paddingX?: ComponentProps<typeof Column>["paddingX"];
}

export function Projects({
  range,
  exclude,
  layout = "stack",
  cardVariant = "default",
  marginBottom = "40",
  paddingX = "l",
}: ProjectsProps) {
  let allProjects = getPosts(["src", "app", "work", "projects"]);

  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt ?? 0).getTime() -
      new Date(a.metadata.publishedAt ?? 0).getTime()
    );
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  return (
    <Column
      className={layout === "grid" ? styles.grid : styles.list}
      fillWidth
      marginBottom={marginBottom}
      paddingX={paddingX}
    >
      {displayedProjects.map((post, index) => {
        const images =
          post.metadata.images && post.metadata.images.length > 0
            ? post.metadata.images
            : post.metadata.image
              ? [post.metadata.image]
              : [];

        return (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`/work/${post.slug}`}
            images={images}
            title={post.metadata.title}
            description={post.metadata.summary ?? post.metadata.title}
            content={post.content}
            variant={cardVariant}
            kindValue={post.metadata.kind}
            kind={
              post.metadata.kind
                ? kindLabels[post.metadata.kind as keyof typeof kindLabels]
                : undefined
            }
            stack={post.metadata.stack ?? post.metadata.tags ?? []}
            avatars={
              post.metadata.team?.flatMap((member) =>
                member.avatar ? [{ src: member.avatar }] : [],
              ) ?? []
            }
            link={post.metadata.link || ""}
          />
        );
      })}
    </Column>
  );
}
