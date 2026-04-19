import {
  getFeaturedHomeWorkProjects,
  getWorkProjectCategory,
  getWorkProjectKindLabel,
  getWorkProjectObjective,
  getWorkProjectStack,
  resolveWorkProjectMediaSrc,
} from "@/app/work/projectData";
import { contact, contentStrategy, work } from "@/resources";
import { type BlogFile } from "@/utils/utils";

import { FeaturedWorksShowcaseClient } from "./FeaturedWorksShowcaseClient";

const homeWorksSection = contentStrategy.pages.home.sections.find(
  (section) => section.id === "works",
);

type FeaturedWorksShowcaseProps = {
  projects: BlogFile[];
};

function getProjectImage(project: BlogFile) {
  const candidate = project.metadata.image || project.metadata.images?.[0];
  return resolveWorkProjectMediaSrc(candidate) ?? candidate;
}

export function FeaturedWorksShowcase({ projects }: FeaturedWorksShowcaseProps) {
  const featuredProjects = getFeaturedHomeWorkProjects(3, projects);
  const [mainProject, ...sideProjects] = featuredProjects;

  if (!mainProject) {
    return null;
  }

  return (
    <FeaturedWorksShowcaseClient
      eyebrow={homeWorksSection?.label ?? "Projetos em destaque"}
      title={homeWorksSection?.title ?? "Projetos que unem estetica, estrategia e execucao."}
      description={
        homeWorksSection?.description ??
        "Cada projeto resolve um desafio diferente, mas todos seguem o mesmo principio: clareza, performance e resultado real."
      }
      actionLabel={homeWorksSection?.ctaLabel ?? "Ver todos os projetos"}
      workHref={work.path}
      contactHref={contact.path}
      mainProject={{
        slug: mainProject.slug,
        title: mainProject.metadata.title,
        summary: mainProject.metadata.summary ?? "",
        category: getWorkProjectCategory(mainProject),
        kind: getWorkProjectKindLabel(mainProject),
        stack: getWorkProjectStack(mainProject).slice(0, 3),
        image: getProjectImage(mainProject),
        objective: getWorkProjectObjective(mainProject),
      }}
      sideProjects={sideProjects.map((project) => ({
        slug: project.slug,
        title: project.metadata.title,
        summary: project.metadata.summary ?? "",
        category: getWorkProjectCategory(project),
        kind: getWorkProjectKindLabel(project),
        stack: getWorkProjectStack(project).slice(0, 2),
        image: getProjectImage(project),
        objective: getWorkProjectObjective(project),
      }))}
    />
  );
}
