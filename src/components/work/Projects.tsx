import type { ComponentProps } from "react";

import { ProjectCard } from "@/components";
import { buildOgImage } from "@/utils/og";
import { getPosts } from "@/utils/utils";
import { Column } from "@once-ui-system/core";

const kindLabels = {
  personal: "Projeto pessoal",
  study: "Estudo de caso",
  client: "Case de cliente",
} as const;

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  compact?: boolean;
  marginBottom?: ComponentProps<typeof Column>["marginBottom"];
  paddingX?: ComponentProps<typeof Column>["paddingX"];
}

export function Projects({
  range,
  exclude,
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
    <Column fillWidth gap="xl" marginBottom={marginBottom} paddingX={paddingX}>
      {displayedProjects.map((post, index) => {
        const fallbackSubtitle = post.metadata.tag ?? post.metadata.tags?.[0] ?? "Projeto";
        const images =
          post.metadata.images && post.metadata.images.length > 0
            ? post.metadata.images
            : post.metadata.image
              ? [post.metadata.image]
              : [buildOgImage(post.metadata.title, fallbackSubtitle)];

        return (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`/work/${post.slug}`}
            images={images}
            title={post.metadata.title}
            description={post.metadata.summary ?? post.metadata.title}
            content={post.content}
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
