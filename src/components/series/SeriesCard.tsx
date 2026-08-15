import Image from "next/image";
import Link from "next/link";
import { seriesById, seriesBySlug } from "@/content/series/series";
import { getSeriesOffers } from "@/content/series/seriesOffers";
import styles from "./SeriesCard.module.scss";

type Props = ({ seriesId: string; series?: never } | { series: string; seriesId?: never }) & {
  comment?: string;
  context?: string;
  variant?: "editorial" | "library";
  priority?: boolean;
};

const formatLabels={"live-action":"live-action",animation:"animação",anime:"anime","web-series":"websérie"} as const;

export function SeriesCard({ seriesId, series: legacySlug, comment, context, variant = "editorial", priority }:Props) {
  const item=seriesId ? seriesById.get(seriesId) : seriesBySlug.get(legacySlug!);
  const reference=seriesId ?? legacySlug;
  if(!item) throw new Error(`SeriesCard recebeu uma referência inexistente: ${reference}`);
  const offers=getSeriesOffers(item.id);
  const editorialComment=comment ?? context;
  const publicHref=item.status === "published" ? `/series/${item.slug}` : undefined;
  return <article className={styles.card} data-variant={variant} id={item.slug}>
    <div className={styles.art} data-placeholder={!item.image || undefined}>
      {item.image ? <Image alt={item.image.alt} fill priority={priority} sizes="(max-width: 520px) 112px, 128px" src={item.image.src} /> : <span aria-label={`Sem imagem para ${item.titleBr}`}>Série<br/>recomendada</span>}
    </div>
    <div className={styles.content}>
      <header><h3>{publicHref?<Link href={publicHref}>{item.titleBr}</Link>:item.titleBr}</h3>{item.originalTitle!==item.titleBr?<p className={styles.original}>{item.originalTitle}</p>:null}</header>
      <div className={styles.meta}><span>{item.startYear}{item.endYear&&item.endYear!==item.startYear?`–${item.endYear}`:""}</span><span>{item.seasons} {item.seasons===1?"temporada":"temporadas"} · {formatLabels[item.format]}</span></div>
      <div className={styles.details} aria-label="Informações da série">{item.genres.slice(0,2).map((genre)=><span key={genre}>{genre}</span>)}<span>{item.countries.join(" · ")}</span></div>
      {editorialComment?<p className={styles.context}>{editorialComment}</p>:<p className={styles.description}>{item.shortDescription}</p>}
      {offers.length?<div className={styles.availability}><strong>Onde assistir</strong><ul className={styles.offers}>{offers.map((offer)=><li key={offer.id}><a href={offer.url} target="_blank" rel="noopener noreferrer nofollow">{offer.provider}</a><span>T{offer.seasonFrom}{offer.seasonTo!==offer.seasonFrom?`–T${offer.seasonTo}`:""}</span></li>)}</ul></div>:null}
      {offers.some((offer)=>offer.note)?<p className={styles.warning}>{offers.map((offer)=>offer.note).filter(Boolean).join(" ")}</p>:null}
    </div>
  </article>;
}
