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

export function getWorkProjectKindLabel(project: BlogFile) {
  return project.metadata.kind ? kindLabels[project.metadata.kind] : undefined;
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
