import type { ReadingEdition } from "@/content/reading/readingSchema";
import styles from "./ReadingLibrary.module.scss";

export function ReadingEditionInfo({ edition }: { edition?: ReadingEdition }) {
  if (!edition) return <p className={styles.notice}>Nenhuma edição cadastrada para este recorte.</p>;
  return <dl className={styles.edition}><div><dt>Edição</dt><dd>{edition.title}</dd></div><div><dt>Idioma e país</dt><dd>{edition.language} · {edition.country}</dd></div><div><dt>Formato</dt><dd>{edition.medium}</dd></div>{edition.isbn13 && <div><dt>ISBN-13</dt><dd>{edition.isbn13}</dd></div>}{edition.pageCount && <div><dt>Páginas</dt><dd>{edition.pageCount}</dd></div>}</dl>;
}
