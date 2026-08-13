import { getMovieOffers, isMovieOfferStale, type MovieOffer } from "@/content/movies/movieOffers";
import type { Movie } from "@/content/movies/movieSchema";
import styles from "./MovieAvailability.module.scss";

const labels: Record<MovieOffer["offerType"], string> = {
  stream: "assinatura", "free-with-ads": "grátis com anúncios", rent: "aluguel", buy: "compra", physical: "mídia física",
};

const dateLabel = (value: string) => new Intl.DateTimeFormat("pt-BR", { timeZone:"UTC" }).format(new Date(`${value}T12:00:00Z`));

export function MovieAvailability({ movie }: { movie: Pick<Movie, "id"> }) {
  const offers = getMovieOffers(movie.id);
  if (!offers.length) return <div className={styles.box}><strong>Onde assistir</strong><span>Sem disponibilidade legal confirmada no Brasil.</span></div>;
  const checkedAt = offers.map((item) => item.checkedAt).sort().at(-1)!;
  return <div className={styles.box}>
    <strong>Onde assistir</strong>
    <span>{offers.map((offer, index) => <span key={offer.id}>{index ? " · " : ""}<a href={offer.url} target="_blank" rel="noopener noreferrer nofollow">{offer.provider}</a> ({labels[offer.offerType]})</span>)}</span>
    <small>Verificado em {dateLabel(checkedAt)}{isMovieOfferStale(checkedAt) ? " · verificação vencida" : ""}</small>
  </div>;
}
