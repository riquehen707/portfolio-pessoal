import { localMovieRepository } from "./localMovieRepository";

// Único ponto que deverá mudar quando uma fonte remota realmente existir.
const movieRepository = localMovieRepository;

export const getAllMovies = () => movieRepository.getAll();
export const getMovieById = (id: string) => movieRepository.getById(id);
export const getMovieBySlug = (slug: string) => movieRepository.getBySlug(slug);
export const getMoviesByIds = (ids: readonly string[]) => movieRepository.getManyByIds(ids);
export const getPublishedMovies = () => movieRepository.getPublished();
export const getMovieCurations = (movieId: string) => movieRepository.getCurationsForMovie(movieId);

export type { MovieRepository, MovieReference } from "./movieRepository";
