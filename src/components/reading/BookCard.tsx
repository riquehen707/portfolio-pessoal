import Link from "next/link";

import { OfferAction } from "@/components/offers/OfferAction";
import { readingEditions } from "@/content/reading/reading";
import { amazonBrazilIsbnSearchUrl } from "@/content/reading/amazonBrazil";

import { ReadingCardMedia } from "./ReadingCardMedia";
import { getReadingCardEdition, getReadingCardOffers, getReadingCreditNames, getReadingWorkOrThrow, isGraphicReadingWork, readingPublisher, readingTitle, readingYear } from "./readingCardData";
import styles from "./BookCard.module.scss";

const categoryLabels: Record<string, string> = { fiction: "Ficção", "non-fiction": "Não ficção", philosophy: "Filosofia", science: "Ciência", business: "Negócios", marketing: "Marketing", biography: "Biografia", essay: "Ensaio", poetry: "Poesia", "short-stories": "Contos", "light-novel": "Light novel", comics: "Quadrinhos" };

export function BookCard({ workId, editionId, comment, variant = "editorial", priority = false }: { workId: string; editionId?: string; comment?: string; variant?: "compact" | "editorial" | "library"; priority?: boolean }) {
  const work = getReadingWorkOrThrow(workId);
  if (isGraphicReadingWork(work)) throw new Error(`BookCard recebeu uma obra gráfica: ${workId}`);
  const requestedEdition = editionId ? readingEditions.find((candidate) => candidate.id === editionId && candidate.workId === work.id) : undefined;
  if (editionId && !requestedEdition) throw new Error(`Edição ${editionId} não corresponde à obra ${work.id}`);
  const edition = requestedEdition ?? getReadingCardEdition(work);
  const offers = getReadingCardOffers(edition);
  const amazonSearch = requestedEdition?.country === "Brasil" && requestedEdition.isbn13 && !offers.length
    ? amazonBrazilIsbnSearchUrl(requestedEdition.isbn13) : null;
  const title = readingTitle(work);
  const authors = getReadingCreditNames(work);
  const publisher = readingPublisher(edition);
  const category = work.format === "light-novel" ? "Light novel" : work.genres[0] ?? categoryLabels[work.categories[0]];
  const titleNode = work.status === "published" ? <Link href={`/livros/${work.slug}`}>{title}</Link> : title;

  return <article className={styles.card} data-variant={variant}>
    <ReadingCardMedia image={requestedEdition ? (edition?.cover ?? work.image) : (work.image ?? edition?.cover)} title={title} className={styles.cover} fallbackClassName={styles.fallback} sizes="(max-width: 520px) 112px, 144px" priority={priority} />
    <div className={styles.content}>
      {work.format === "light-novel" ? <span className={styles.badge}>Light novel</span> : null}
      <h3>{titleNode}</h3>
      {authors.length ? <p className={styles.authors}>{authors.join(" · ")}</p> : null}
      <div className={styles.meta}>{readingYear(work) ? <span>{readingYear(work)}</span> : null}{category ? <span>{category}</span> : null}{publisher ? <span>{publisher}</span> : null}</div>
      {variant === "library" ? <p className={styles.description}>{work.shortDescription}</p> : null}
      {requestedEdition ? <p className={styles.editionState}>Edição selecionada: {requestedEdition.title}{requestedEdition.isbn13 ? ` · ISBN ${requestedEdition.isbn13}` : ""}</p> : null}
      {variant === "library" && !requestedEdition ? <p className={styles.editionState}>{edition ? `Edição cadastrada: ${edition.title}` : "Edição brasileira ainda não confirmada"}</p> : null}
      {comment ? <p className={styles.comment}>{comment}</p> : null}
      {offers.length ? <div className={styles.offers} aria-label="Opções desta edição"><strong>Edição disponível</strong>{offers.map((offer) => <OfferAction key={offer.id} offer={offer} kind="reading" />)}</div> : null}
      {amazonSearch ? <div className={styles.offers} aria-label="Busca afiliada pela edição">
        <strong>Buscar pelo ISBN · estoque não confirmado</strong>
        <OfferAction
          offer={{retailer:"Amazon Brasil",url:amazonSearch,affiliateProgram:"Amazon Associados",commissionDisclosure:"Link de afiliado: posso receber uma comissão sem custo adicional para você. A busca não garante que a edição esteja disponível."}}
          label="Buscar esta edição na Amazon"
          kind="reading"
        />
      </div> : null}
    </div>
  </article>;
}
