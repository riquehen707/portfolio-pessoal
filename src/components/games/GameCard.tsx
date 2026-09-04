import { getGameById } from "@/data/games";
import { GameListCard } from "./GameListCard";
export async function GameCard({ gameId }: { gameId: string }) {
  const game = await getGameById(gameId);
  if (!game) return null;
  return <GameListCard game={game} />;
}
