import { readingWorks } from "@/content/reading/reading";
import { ReadingCard } from "./ReadingCard";

export function ReadingWorkCard({ workId, variant = "editorial", comment }: { workId: string; variant?: "compact" | "editorial"; comment?: string }) {
  const work = readingWorks.find((item) => item.id === workId);
  if (!work) throw new Error(`Obra de leitura não encontrada: ${workId}`);
  return <ReadingCard work={work} variant={variant} comment={comment} />;
}
