import { cache } from "react";

import { getProjectDashboardSnapshot, getProjectExecutiveSummary } from "@/domain";
import { baseURL, work } from "@/resources";
import { buildOgImage } from "@/utils/og";
import { type BlogFile, getPosts } from "@/utils/utils";

const WORK_PROJECTS_PATH = ["src", "app", "work", "projects"] as const;

export const kindLabels = {
  personal: "Pessoal",
  study: "Estudo",
  client: "Cliente",
} as const;

export function normalizeWorkProjectSlug(slugParam: string | string[] | undefined): string {
  if (!slugParam) return "";
  return Array.isArray(slugParam) ? slugParam.join("/") : slugParam;
}

export const getAllWorkProjects = cache(() => getPosts([...WORK_PROJECTS_PATH]));

export const getWorkProjectBySlug = cache((slug: string) => {
  return getAllWorkProjects().find((project) => project.slug === slug) ?? null;
});

export const getWorkProjectStaticParams = cache(() => {
  const seen = new Set<string>();

  return getAllWorkProjects().flatMap((project) => {
    const slug = project.slug.trim();

    if (!slug || seen.has(slug)) {
      return [];
    }

    seen.add(slug);
    return [{ slug }];
  });
});

export const getWorkProjectSummaryStaticParams = cache(() => {
  return getWorkProjectStaticParams().filter(({ slug }) => hasWorkProjectPrintableSummary(slug));
});

export function getWorkProjectPath(slug: string) {
  return `${work.path}/${slug}`;
}

export function getWorkProjectSummaryPath(slug: string) {
  return `${getWorkProjectPath(slug)}/resumo`;
}

export function getWorkProjectSeoImage(project: BlogFile) {
  return (
    project.metadata.image ||
    project.metadata.images?.[0] ||
    buildOgImage(project.metadata.title, project.metadata.tag ?? project.metadata.tags?.[0] ?? "Projeto")
  );
}

export function getWorkProjectSummarySeoImage(project: BlogFile) {
  return (
    project.metadata.image ||
    project.metadata.images?.[0] ||
    buildOgImage(`Resumo executivo ${project.metadata.title}`, "Diagnostico")
  );
}

export function getWorkProjectStack(project: BlogFile) {
  return Array.from(
    new Set(
      [project.metadata.tag, ...(project.metadata.stack ?? project.metadata.tags ?? [])].filter(
        Boolean,
      ) as string[],
    ),
  );
}

export function getWorkProjectCategory(project: BlogFile) {
  return project.metadata.category ?? project.metadata.categories?.[0] ?? project.metadata.tag;
}

export function getWorkProjectObjective(project: BlogFile) {
  return project.metadata.objective ?? project.metadata.summary ?? project.metadata.tag ?? project.metadata.title;
}

export function getWorkProjectKindLabel(project: BlogFile) {
  return project.metadata.kind ? kindLabels[project.metadata.kind] : undefined;
}

function getWorkProjectDateScore(project: BlogFile) {
  const timestamp = new Date(project.metadata.updatedAt ?? project.metadata.publishedAt ?? 0).getTime();
  return Number.isFinite(timestamp) ? timestamp / 1_000_000_000_000 : 0;
}

export function getWorkProjectRelevanceScore(project: BlogFile) {
  const explicitScore = project.metadata.score ?? 0;
  const featuredHomeBoost = project.metadata.featuredHome ? 90 : 0;
  const featuredBoost = project.metadata.featured ? 18 : 0;
  const kindScore =
    project.metadata.kind === "client" ? 20 : project.metadata.kind === "study" ? 14 : 10;
  const imageScore = project.metadata.image || project.metadata.images?.length ? 10 : 0;
  const categoryScore = getWorkProjectCategory(project) ? 6 : 0;
  const objectiveScore = project.metadata.objective ? 8 : 0;
  const stackScore = Math.min(getWorkProjectStack(project).length, 4) * 2;

  return (
    explicitScore +
    featuredHomeBoost +
    featuredBoost +
    kindScore +
    imageScore +
    categoryScore +
    objectiveScore +
    stackScore +
    getWorkProjectDateScore(project)
  );
}

function getWorkProjectDiversityScore(project: BlogFile, selected: BlogFile[]) {
  if (selected.length === 0) {
    return 0;
  }

  const projectCategory = getWorkProjectCategory(project);
  const projectStack = new Set(getWorkProjectStack(project));

  return selected.reduce((total, current) => {
    const currentCategory = getWorkProjectCategory(current);
    const currentStack = new Set(getWorkProjectStack(current));
    const sharedStackCount = [...projectStack].filter((item) => currentStack.has(item)).length;

    let score = total;

    if (projectCategory && currentCategory && projectCategory !== currentCategory) score += 10;
    if (project.metadata.kind && current.metadata.kind && project.metadata.kind !== current.metadata.kind) score += 6;
    if (project.metadata.tag && current.metadata.tag && project.metadata.tag !== current.metadata.tag) score += 6;
    if (sharedStackCount === 0) score += 5;
    if (sharedStackCount >= 2) score -= 4;

    return score;
  }, 0);
}

export function getFeaturedHomeWorkProjects(limit = 3, projects = getAllWorkProjects()) {
  const pool = [...projects];
  const selected: BlogFile[] = [];

  while (pool.length > 0 && selected.length < limit) {
    let bestIndex = 0;
    let bestScore = -Infinity;

    pool.forEach((project, index) => {
      const score = getWorkProjectRelevanceScore(project) + getWorkProjectDiversityScore(project, selected);

      if (score > bestScore) {
        bestIndex = index;
        bestScore = score;
      }
    });

    selected.push(pool.splice(bestIndex, 1)[0]);
  }

  return selected;
}

export function toAbsoluteWorkProjectUrl(pathOrUrl?: string): string | undefined {
  if (!pathOrUrl) return undefined;

  try {
    return new URL(pathOrUrl, baseURL).toString();
  } catch {
    return pathOrUrl;
  }
}

export function resolveWorkProjectMediaSrc(src?: string): string | undefined {
  if (!src) return undefined;

  try {
    const resolvedUrl = new URL(src, baseURL);
    const baseUrl = new URL(baseURL);

    if (resolvedUrl.origin === baseUrl.origin) {
      return `${resolvedUrl.pathname}${resolvedUrl.search}`;
    }

    return resolvedUrl.toString();
  } catch {
    return src;
  }
}

export const hasWorkProjectPrintableSummary = cache((slug: string) => {
  return Boolean(getProjectDashboardSnapshot(slug) && getProjectExecutiveSummary(slug));
});
