import type { ReadingWork } from "@/content/reading/readingSchema";
import styles from "./ReadingLibrary.module.scss";

export function ReadingRelations({ work, works }: { work: ReadingWork; works: readonly ReadingWork[] }) {
  const byId = new Map(works.map((item) => [item.id, item]));
  if (!work.relatedWorks.length && !work.adaptations.length) return null;
  return <section className={styles.relations} aria-label="Relações e adaptações">{work.relatedWorks.map((relation) => <span key={relation.workId}>{byId.get(relation.workId)?.titleBr ?? byId.get(relation.workId)?.originalTitle ?? relation.workId} ({relation.relationship})</span>)}{work.adaptations.map((item) => <span key={`${item.kind}-${item.title}`}>{item.title} ({item.relationship} · {item.kind})</span>)}</section>;
}
