import { BookCard } from "./BookCard";
import { MangaCard } from "./MangaCard";
import { getReadingWorkOrThrow, isGraphicReadingWork } from "./readingCardData";

export function ReadingWorkCard({ workId, editionId, variant = "editorial", comment }: { workId: string; editionId?: string; variant?: "compact" | "editorial"; comment?: string }) {
  const work = getReadingWorkOrThrow(workId);
  return isGraphicReadingWork(work)
    ? <MangaCard workId={workId} variant={variant} comment={comment} />
    : <BookCard workId={workId} editionId={editionId} variant={variant} comment={comment} />;
}
