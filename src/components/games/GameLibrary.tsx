"use client";
import { useMemo, useState } from "react";
import type { Game } from "@/content/games/gameSchema";
import { CatalogControls, CatalogEmpty } from "@/components/entertainment/CatalogControls";
import { normalizeCatalogText, uniqueCatalogValues } from "@/components/entertainment/catalog";
import { GameListCard } from "./GameListCard";
import styles from "./GameLibrary.module.scss";
export function GameLibrary({ games }: { games: readonly Game[] }) {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [platform, setPlatform] = useState("all");
  const genres = useMemo(
    () => uniqueCatalogValues(games.flatMap((game) => [...game.genres, ...game.subgenres])),
    [games],
  );
  const platforms = useMemo(
    () => uniqueCatalogValues(games.flatMap((game) => game.platforms)),
    [games],
  );
  const visible = useMemo(() => {
    const tokens = normalizeCatalogText(query).split(/\s+/).filter(Boolean);
    return games.filter((game) => {
      const haystack = normalizeCatalogText(
        [
          game.title,
          ...game.genres,
          ...game.subgenres,
          ...game.tags,
          ...game.platforms,
          game.description,
        ].join(" "),
      );
      return (
        tokens.every((token) => haystack.includes(token)) &&
        (genre === "all" || [...game.genres, ...game.subgenres].includes(genre)) &&
        (platform === "all" || game.platforms.includes(platform))
      );
    });
  }, [games, genre, platform, query]);
  const clear = () => {
    setQuery("");
    setGenre("all");
    setPlatform("all");
  };
  return (
    <>
      <CatalogControls
        query={query}
        onQueryChange={setQuery}
        placeholder="Título, gênero, mecânica ou plataforma"
        filters={[
          {
            id: "genre",
            label: "Gênero",
            value: genre,
            allLabel: "Todos",
            options: genres.map((value) => ({ value, label: value })),
            onChange: setGenre,
          },
          {
            id: "platform",
            label: "Plataforma",
            value: platform,
            allLabel: "Todas",
            options: platforms.map((value) => ({ value, label: value })),
            onChange: setPlatform,
          },
        ]}
        sort="editorial"
        sortOptions={[{ value: "editorial", label: "Seleção editorial" }]}
        onSortChange={() => {}}
        resultCount={visible.length}
        singular="jogo encontrado"
        plural="jogos encontrados"
        hasFilters={Boolean(query || genre !== "all" || platform !== "all")}
        onClear={clear}
      />
      {visible.length ? (
        <div className={styles.grid}>
          {visible.map((game, index) => (
            <GameListCard game={game} key={game.id} priority={index < 2} />
          ))}
        </div>
      ) : (
        <CatalogEmpty noun="jogo" onClear={clear} />
      )}
      <p className={styles.credit}>
        Imagens promocionais oficiais distribuídas pelas páginas dos jogos na Steam; direitos
        pertencem aos respectivos titulares.
      </p>
    </>
  );
}
