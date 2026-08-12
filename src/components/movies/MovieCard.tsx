import { getMovieBySlug } from "@/data/movies";
import { MovieListCard } from "./MovieListCard";

type MovieCardProps = { movie: string; context: string; position?: number; compact?: boolean; showAction?: boolean };

export async function MovieCard({ movie: slug, ...props }: MovieCardProps) {
  const movie = await getMovieBySlug(slug);
  if (!movie) throw new Error(`MovieCard recebeu um slug inexistente: ${slug}`);
  return <MovieListCard movie={movie} variant="editorial" {...props} />;
}
