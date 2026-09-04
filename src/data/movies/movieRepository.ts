import type { Movie } from "@/content/movies/movieSchema";
import type { MovieCuration } from "@/content/movies/curations";

export type MovieReference = Pick<Movie, "id" | "slug" | "aliases" | "status">;

export interface MovieRepository {
  getAll(): Promise<readonly Movie[]>;
  getById(id: string): Promise<Movie | undefined>;
  getBySlug(slug: string): Promise<Movie | undefined>;
  getManyByIds(ids: readonly string[]): Promise<Movie[]>;
  getPublished(): Promise<Movie[]>;
  getCurationsForMovie(movieId: string): Promise<Array<{ curation: MovieCuration; item: MovieCuration["items"][number] }>>;
}
