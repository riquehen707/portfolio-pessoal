import { movieCurations } from "@/content/movies/curations";
import { movies } from "@/content/movies/movies";
import type { MovieRepository } from "./movieRepository";

const byId = new Map(movies.map((movie) => [movie.id, movie]));
const bySlug = new Map(movies.flatMap((movie) => [movie.slug, ...movie.aliases].map((slug) => [slug, movie] as const)));

const invalidCurationReferences = movieCurations.flatMap((curation) =>
  curation.items.filter((item) => !byId.has(item.movieId)).map((item) => `${curation.slug}:${item.movieId}`),
);

if (invalidCurationReferences.length) {
  throw new Error(`Curadorias apontam para filmes inexistentes: ${invalidCurationReferences.join(", ")}`);
}

export const localMovieRepository: MovieRepository = {
  async getAll() { return movies; },
  async getById(id) { return byId.get(id); },
  async getBySlug(slug) { return bySlug.get(slug); },
  async getManyByIds(ids) { return ids.map((id) => byId.get(id)).filter((movie) => movie !== undefined); },
  async getPublished() { return movies.filter((movie) => movie.status === "published"); },
  async getCurationsForMovie(movieId) {
    const movie = byId.get(movieId);
    if (!movie) return [];
    return movieCurations.flatMap((curation) => {
      const item = curation.items.find((entry) => entry.movieId === movie.id);
      return item ? [{ curation, item }] : [];
    });
  },
};
