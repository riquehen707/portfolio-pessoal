import Link from "next/link";
import { ReadingCardMedia } from "./ReadingCardMedia";
import { getReadingCardEdition, getReadingCardOffers, getReadingCreditNames, getReadingWorkOrThrow, isGraphicReadingWork, readingTitle } from "./readingCardData";
import styles from "./MangaCard.module.scss";

const traditionLabels: Record<string, string> = { manga: "Mangá", manhwa: "Manhwa", manhua: "Manhua", "western-comics": "HQ ocidental", "brazilian-comics": "HQ brasileira", other: "Quadrinhos" };
const formatLabels: Record<string, string> = { "serialized-series": "Série", "graphic-novel": "Graphic novel", "one-shot": "Volume único", webtoon: "Webtoon", "comic-strip": "Tiras", anthology: "Antologia" };
const statusLabels: Record<string, string> = { announced: "Anunciada", ongoing: "Em publicação", completed: "Concluída", hiatus: "Em hiato", cancelled: "Cancelada", "out-of-print": "Fora de catálogo" };

export function MangaCard({ workId, comment, variant = "editorial" }: { workId: string; comment?: string; variant?: "compact" | "editorial" | "library" }) {
  const work = getReadingWorkOrThrow(workId);
  if (!isGraphicReadingWork(work)) throw new Error(`MangaCard recebeu um livro ou light novel: ${workId}`);
  const edition = getReadingCardEdition(work);
  const offers = getReadingCardOffers(edition);
  const title = readingTitle(work);
  const authors = getReadingCreditNames(work);
  const tradition = work.comicTradition ? traditionLabels[work.comicTradition] : formatLabels[work.format] ?? "Quadrinhos";
  const format = work.comicFormat ? formatLabels[work.comicFormat] : undefined;
  const publication = work.confirmedVolumeCount ? `${work.confirmedVolumeCount} volumes` : statusLabels[work.publicationStatus];
  const titleNode = work.status === "published" ? <Link href={`/quadrinhos/${work.slug}`}>{title}</Link> : title;

  return <article className={styles.card} data-variant={variant}>
    <ReadingCardMedia image={work.image ?? edition?.cover} title={title} className={styles.cover} fallbackClassName={styles.fallback} sizes="(max-width: 520px) 112px, 144px" />
    <div className={styles.content}>
      <div className={styles.kicker}><span>{tradition}</span>{format && format !== tradition ? <span>{format}</span> : null}</div>
      <h3>{titleNode}</h3>
      {work.titleBr && work.titleBr !== work.originalTitle ? <p className={styles.original}>{work.originalTitle}</p> : null}
      {authors.length ? <p className={styles.authors}>{authors.join(" · ")}</p> : null}
      <div className={styles.meta}>{publication ? <span>{publication}</span> : null}{work.genres.slice(0, 2).map((genre) => <span key={genre}>{genre}</span>)}</div>
      {comment ? <p className={styles.comment}>{comment}</p> : null}
      {offers.length ? <div className={styles.offers} aria-label="Opções desta edição"><strong>Ler ou comprar</strong>{offers.map((offer) => <a key={offer.id} href={offer.url} rel="sponsored nofollow">{offer.store}</a>)}</div> : null}
    </div>
  </article>;
}
