import { z } from "zod";
import type { ReadingWork } from "./readingSchema";

export const ReadingListSchema = z.object({
  id: z.string().regex(/^reading_list_[a-z0-9_]+$/), slug: z.string().min(1), title: z.string().min(1), href: z.string().startsWith("/blog/"),
  items: z.array(z.object({ workId: z.string().regex(/^read_work_[a-z0-9_]+$/), position: z.number().int().positive().optional(), comment: z.string().min(1).optional(), justification: z.string().min(1).optional(), recommendedFor: z.string().min(1).optional(), startingPointEditionId: z.string().regex(/^read_edition_[a-z0-9_]+$/).optional(), readingOrder: z.string().min(1).optional(), note: z.string().min(1).optional() })),
});
export type ReadingList = z.infer<typeof ReadingListSchema>;
export const readingCurations: ReadingList[] = [];
export function resolveReadingList(list: ReadingList, works: readonly ReadingWork[]) { const byId = new Map(works.map((work) => [work.id, work])); return list.items.map((item) => byId.get(item.workId)).filter((work): work is ReadingWork => Boolean(work)); }
