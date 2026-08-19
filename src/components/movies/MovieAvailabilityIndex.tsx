import { movies } from "@/content/movies/movies";
import { getMovieOffers } from "@/content/movies/movieOffers";
import styles from "./MovieAvailabilityIndex.module.scss";

export function MovieAvailabilityIndex({ slugs }: { slugs: string }) {
  const selected = slugs.split(",").map((slug) => movies.find((movie) => movie.slug === slug.trim())).filter(Boolean);
  const checkedAtValues: string[] = [];
  const groups = new Map<string, typeof selected>();
  const add = (label: string, movie: NonNullable<(typeof selected)[number]>) => {
    const list = groups.get(label) ?? [];
    if (!list.some((item) => item?.id === movie.id)) list.push(movie);
    groups.set(label, list);
  };
  for (const movie of selected) {
    if (!movie) continue;
    const offers = getMovieOffers(movie.id);
    checkedAtValues.push(...offers.map((offer) => offer.checkedAt));
    if (!offers.length) add("Sem disponibilidade confirmada", movie);
    for (const offer of offers) add(
      offer.offerType === "rent" ? "Aluguel" :
      offer.offerType === "buy" ? "Compra digital" :
      offer.offerType === "physical" ? "Mídia física" :
      offer.provider,
      movie,
    );
  }
  return <nav className={styles.index} aria-label="Índice de onde assistir">
    <strong>Onde assistir no Brasil</strong>
    <p>Atalhos gerados pelas ofertas verificadas até {new Intl.DateTimeFormat("pt-BR", { timeZone:"UTC" }).format(new Date(`${checkedAtValues.sort().at(-1) ?? "2026-08-14"}T12:00:00Z`))}. Catálogos mudam; confira o destino antes de assinar ou alugar.</p>
    <div>{[...groups].map(([label, list]) => <section key={label}><h3>{label}</h3><p>{list.map((movie, index) => <span key={movie!.id}>{index ? " · " : ""}<a href={`#${movie!.slug}`}>{movie!.titleBr}</a></span>)}</p></section>)}</div>
  </nav>;
}
