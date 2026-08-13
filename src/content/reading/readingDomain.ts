import type { ReadingWork } from "./readingSchema";

export function isComicWork(work: Pick<ReadingWork,"comicTradition"|"comicFormat">) { return Boolean(work.comicTradition && work.comicFormat); }
export function getReadingWorkPath(work: Pick<ReadingWork,"slug"|"comicTradition"|"comicFormat">) { return `${isComicWork(work) ? "/quadrinhos" : "/livros"}/${work.slug}`; }
