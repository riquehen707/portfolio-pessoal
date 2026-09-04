import { readingWorks } from "@/content/reading/reading";
import type { ReadingList as ReadingListData } from "@/content/reading/curations";
import { ReadingCard } from "./ReadingCard";
import styles from "./ReadingLibrary.module.scss";

export function ReadingList({ list, variant = "editorial" }: { list: ReadingListData; variant?: "compact" | "editorial" }) {
  const byId = new Map(readingWorks.map((work) => [work.id, work]));
  return <ol className={styles.list}>{list.items.map((item) => { const work = byId.get(item.workId); if (!work) throw new Error(`Obra de leitura não encontrada: ${item.workId}`); return <li key={item.workId}><ReadingCard work={work} variant={variant} comment={item.comment ?? item.justification} /></li>; })}</ol>;
}
