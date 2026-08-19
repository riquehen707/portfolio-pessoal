import Link from "next/link";
import { ReadingCardMedia } from "./ReadingCardMedia";
import { getReadingCardEdition, getReadingCardOffers, getReadingCreditNames, getReadingWorkOrThrow, isGraphicReadingWork, readingTitle, readingYear } from "./readingCardData";
import styles from "./BookCard.module.scss";

const categoryLabels: Record<string, string> = {
  fiction: "Ficção", "non-fiction": "Não ficção", philosophy: "Filosofia", science: "Ciência", business: "Negócios", marketing: "Marketing", biography: "Biografia", essay: "Ensaio", poetry: "Poesia", "short-stories": "Contos", "light-novel": "Light novel", comics: "Quadrinhos",
};

export function BookCard({ workId, comment, variant = "editorial", priority = false }: { workId: string; comment?: string; variant?: "compact" | "editorial" | "library"; priority?: boolean }) {
  const work = getReadingWorkOrThrow(workId);
  if (isGraphicReadingWork(work)) throw new Error(`BookCard recebeu uma obra gráfica: ${workId}`);
  const edition = getReadingCardEdition(work);
  const offers = getReadingCardOffers(edition);
  const title = readingTitle(work);
  const authors = getReadingCreditNames(work);
  const category = work.format === "light-novel" ? "Light novel" : work.genres[0] ?? categoryLabels[work.categories[0]];
  const titleNode = work.status === "published" ? <Link href={`/livros/${work.slug}`}>{title}</Link> : title;

  return <article className={styles.card} data-variant={variant}>
    <ReadingCardMedia image={work.image ?? edition?.cover} title={title} className={styles.cover} fallbackClassName={styles.fallback} sizes="(max-width: 520px) 112px, 144px" priority={priority} />
    <div className={styles.content}>
      {work.format === "light-novel" ? <span className={styles.badge}>Light novel</span> : null}
      <h3>{titleNode}</h3>
      {authors.length ? <p className={styles.authors}>{authors.join(" · ")}</p> : null}
      <div className={styles.meta}>{readingYear(work) ? <span>{readingYear(work)}</span> : null}{category ? <span>{category}</span> : null}</div>
      {variant === "library" ? <p className={styles.description}>{work.shortDescription}</p> : null}
      {variant === "library" ? <p className={styles.editionState}>{edition ? `Edição cadastrada: ${edition.title}` : "Edição brasileira ainda não confirmada"}</p> : null}
      {comment ? <p className={styles.comment}>{comment}</p> : null}
      {offers.length ? <div className={styles.offers} aria-label="Opções desta edição"><strong>Ler ou comprar</strong>{offers.map((offer) => <a key={offer.id} href={offer.url} rel="sponsored nofollow">{offer.store}</a>)}</div> : null}
    </div>
  </article>;
}
