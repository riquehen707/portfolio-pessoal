import { seriesBySlug } from "@/content/series/series";
import { getSeriesOffers } from "@/content/series/seriesOffers";
import styles from "./SeriesCard.module.scss";

export function SeriesCard({ series, context }:{series:string;context:string}) {
  const item=seriesBySlug.get(series); if(!item) return <p>Série não encontrada no acervo: {series}.</p>;
  const offers=getSeriesOffers(item.id);
  return <article className={styles.card} id={item.slug}>
    <div className={styles.art} aria-hidden="true">Série<br/>recomendada</div>
    <div className={styles.content}>
      <header><h3>{item.titleBr}</h3>{item.originalTitle!==item.titleBr?<p className={styles.original}>{item.originalTitle}</p>:null}</header>
      <div className={styles.meta}><span>{item.startYear}{item.endYear&&item.endYear!==item.startYear?`–${item.endYear}`:""}</span><span>{item.seasons} {item.seasons===1?"temporada":"temporadas"}</span><span>{item.countries.join(" · ")}</span></div>
      <p className={styles.description}>{item.shortDescription}</p><p className={styles.context}>{context}</p>
      {offers.length?<ul className={styles.offers}>{offers.map((offer)=><li key={offer.id}><a href={offer.url} target="_blank" rel="noopener noreferrer">{offer.provider}</a>: T{offer.seasonFrom}{offer.seasonTo!==offer.seasonFrom?`–T${offer.seasonTo}`:""}</li>)}</ul>:<p className={styles.missing}>Sem streaming legal confirmado no Brasil nesta revisão.</p>}
      {offers.some((offer)=>offer.note)?<p className={styles.warning}>{offers.map((offer)=>offer.note).filter(Boolean).join(" ")}</p>:null}
    </div>
  </article>;
}
