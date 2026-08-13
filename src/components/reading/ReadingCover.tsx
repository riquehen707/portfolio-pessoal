import Image from "next/image";
import type { ReadingWork } from "@/content/reading/readingSchema";
import styles from "./ReadingLibrary.module.scss";

export function ReadingCover({ work }: { work: ReadingWork }) {
  if (!work.image) return <div className={styles.cover} aria-label={`Capa ainda não cadastrada para ${work.titleBr ?? work.originalTitle}`}><span className={styles.fallback}>Sem capa cadastrada</span></div>;
  return <div className={styles.cover}><Image src={work.image.src} alt={work.image.alt} fill sizes="(max-width: 600px) 34vw, 176px" /></div>;
}
