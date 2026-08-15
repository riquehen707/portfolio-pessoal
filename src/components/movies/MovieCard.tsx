import { getMovieById, getMovieBySlug } from "@/data/movies";
import { MovieListCard } from "./MovieListCard";

type EditorialText = { comment: string; context?: never } | { context: string; comment?: never };
type SharedProps = EditorialText & { position?: number; compact?: boolean; showAction?: boolean };
type MovieCardProps = SharedProps & (
  | { movieId: string; movie?: never }
  | { movie: string; movieId?: never }
);

export async function MovieCard({ movieId, movie: legacySlug, comment, context, ...props }: MovieCardProps) {
  const movie = movieId ? await getMovieById(movieId) : await getMovieBySlug(legacySlug!);
  const reference = movieId ?? legacySlug;
  if (!movie) throw new Error(`MovieCard recebeu uma referência inexistente: ${reference}`);
  return <MovieListCard movie={movie} variant="editorial" context={comment ?? context} {...props} />;
}
