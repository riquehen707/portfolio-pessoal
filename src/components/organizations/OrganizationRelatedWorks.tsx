import { getWorksForOrganization } from "@/data/organizations";
import { MovieListCard } from "@/components/movies/MovieListCard";
import { SeriesCard } from "@/components/series/SeriesCard";
import { ReadingWorkCard } from "@/components/reading/ReadingWorkCard";
import { GameListCard } from "@/components/games/GameListCard";
import styles from "./OrganizationWorks.module.scss";
type Works = Awaited<ReturnType<typeof getWorksForOrganization>>;
export function OrganizationRelatedWorks({ works }: { works: Works }) {
  const total =
    works.movies.length +
    works.series.length +
    works.reading.length +
    works.animation.length +
    works.games.length;
  if (!total) return null;
  return (
    <section>
      <header>
        <span>Obras no acervo</span>
        <h2>Produções e relações confirmadas</h2>
        <p>Esta seleção é calculada a partir dos relacionamentos das próprias obras.</p>
      </header>
      {works.movies.length ? (
        <div className={styles.list}>
          {works.movies.map((movie) => (
            <MovieListCard key={movie.id} movie={movie} variant="organization" compact />
          ))}
        </div>
      ) : null}
      {works.series.length ? (
        <div className={styles.list}>
          {works.series.map((series) => (
            <SeriesCard key={series.id} seriesId={series.id} />
          ))}
        </div>
      ) : null}
      {works.reading.length ? (
        <div className={styles.list}>
          {works.reading.map((work) => (
            <ReadingWorkCard key={work.id} workId={work.id} />
          ))}
        </div>
      ) : null}
      {works.animation.map((work) => (
        <article key={work.id}>
          <span>
            {work.year} · {work.format}
          </span>
          <h3>{work.title}</h3>
          <p>{work.summary}</p>
        </article>
      ))}
      {works.games.length ? (
        <div className={styles.list}>
          {works.games.map((game) => (
            <GameListCard key={game.id} game={game} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
