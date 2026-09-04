type PrerenderableReadingWork = {
  slug: string;
  updatedAt: string;
  titleBr?: string;
  originalTitle: string;
};

export const READING_PRERENDER_LIMIT = 24;

export function selectReadingPrerenderWorks<T extends PrerenderableReadingWork>(
  works: readonly T[],
  limit = READING_PRERENDER_LIMIT,
) {
  return [...works]
    .sort((left, right) => {
      const dateDifference = right.updatedAt.localeCompare(left.updatedAt);
      if (dateDifference !== 0) return dateDifference;
      const leftTitle = left.titleBr ?? left.originalTitle;
      const rightTitle = right.titleBr ?? right.originalTitle;
      return leftTitle.localeCompare(rightTitle, "pt-BR");
    })
    .slice(0, limit);
}
