import Image from "next/image";
import type { Movie } from "@/content/movies/movieSchema";

type MoviePosterProps = {
  movie: Pick<Movie, "titleBr" | "year" | "poster">;
  className: string;
  sizes: string;
  priority?: boolean;
};

export function MoviePoster({ movie, className, sizes, priority = false }: MoviePosterProps) {
  return (
    <div className={className} data-placeholder={!movie.poster || undefined}>
      {movie.poster ? (
        <Image alt={movie.poster.alt} fill priority={priority} quality={76} sizes={sizes} src={movie.poster.src} />
      ) : (
        <span aria-label={`Sem capa para ${movie.titleBr}`}>{movie.year}</span>
      )}
    </div>
  );
}
