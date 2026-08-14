import type { ReadingWork } from "@/content/reading/readingSchema";
import { ReadingAuthors } from "./ReadingAuthors";
import { ReadingCover } from "./ReadingCover";
import { readingEditions, readingVolumes } from "@/content/reading/reading";
import styles from "./ReadingLibrary.module.scss";

export function ReadingCard({ work, variant = "editorial", comment }: { work: ReadingWork; variant?: "compact" | "editorial"; comment?: string }) {
  const classification=work.comicTradition?`${work.comicTradition} · ${work.comicFormat}`:work.format;
  const volumeIds=new Set(readingVolumes.filter((item)=>item.workId===work.id).map((item)=>item.id));
  const edition=readingEditions.find((item)=>(item.workId===work.id||Boolean(item.volumeId&&volumeIds.has(item.volumeId)))&&item.country==="Brasil");
  return <article className={`${styles.card} ${styles[variant]}`}><ReadingCover work={work} image={work.image ?? edition?.cover}/><div className={styles.body}><span className={styles.eyebrow}>{classification} · {work.publicationStart??"data não cadastrada"}</span><h3 className={styles.title}>{work.titleBr??work.originalTitle}</h3>{work.titleBr&&work.titleBr!==work.originalTitle&&<div className={styles.meta}>{work.originalTitle}</div>}<ReadingAuthors credits={work.credits}/>{variant==="editorial"&&<p className={styles.description}>{comment??work.shortDescription}</p>}{variant==="editorial"&&<p className={styles.editionState}>{edition?`Edição brasileira cadastrada: ${edition.title} (${edition.availabilityStatus==="available"?"disponível":"indisponível"}).`:"Nenhuma edição brasileira foi confirmada no acervo nesta revisão."}</p>}</div></article>;
}
