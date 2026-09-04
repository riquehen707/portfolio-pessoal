import Link from "next/link";

import type { ReadingWork } from "@/content/reading/readingSchema";
import { readingEditions, readingVolumes } from "@/content/reading/reading";
import { ReadingCover } from "./ReadingCover";

import styles from "./ReadingShelfCard.module.scss";

export function ReadingShelfCard({ work }: { work: ReadingWork }) {
  const volumeIds = new Set(readingVolumes.filter((item) => item.workId === work.id).map((item) => item.id));
  const edition = readingEditions.find((item) => item.workId === work.id || Boolean(item.volumeId && volumeIds.has(item.volumeId)));
  const href = work.comicTradition ? `/quadrinhos/${work.slug}` : `/livros/${work.slug}`;
  const title = work.titleBr ?? work.originalTitle;
  return <article className={styles.card}>
    <Link href={href} className={styles.coverLink} aria-label={`Conhecer ${title}`}><ReadingCover work={work} image={work.image ?? edition?.cover} /></Link>
    <h4><Link href={href}>{title}</Link></h4>
    {work.publicationStart ? <p>{work.publicationStart}</p> : null}
  </article>;
}
