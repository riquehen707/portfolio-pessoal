import { games, gamesById, gamesBySlug } from "@/content/games/games";

export const getAllGames = async () => games;
export const getPublishedGames = async () => games.filter((game) => game.status === "published");
export const getGameById = async (id: string) => gamesById.get(id);
export const getGameBySlug = async (slug: string) => gamesBySlug.get(slug);

export type { Game } from "@/content/games/gameSchema";
