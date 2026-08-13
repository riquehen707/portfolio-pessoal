import type { ReadingWork } from "@/content/reading/readingSchema";
import { ReadingAuthors } from "./ReadingAuthors";
import { ReadingCover } from "./ReadingCover";
import styles from "./ReadingLibrary.module.scss";

export function ReadingCard({ work, variant = "editorial", comment }: { work: ReadingWork; variant?: "compact" | "editorial"; comment?: string }) {
  const classification=work.comicTradition?`${work.comicTradition} · ${work.comicFormat}`:work.format;
  return <article className={`${styles.card} ${styles[variant]}`}><ReadingCover work={work}/><div className={styles.body}><span className={styles.eyebrow}>{classification} · {work.publicationStart??"data não cadastrada"}</span><h3 className={styles.title}>{work.titleBr??work.originalTitle}</h3>{work.titleBr&&work.titleBr!==work.originalTitle&&<div className={styles.meta}>{work.originalTitle}</div>}<ReadingAuthors credits={work.credits}/>{variant==="editorial"&&<p className={styles.description}>{comment??work.shortDescription}</p>}</div></article>;
}
