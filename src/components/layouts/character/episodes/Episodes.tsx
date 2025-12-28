import React from "react";
import EpisodesScroller from "./EpisodesScroller";
import { getAllEpisodes } from "@/services/rickandmorty";
interface EpisodeProps {
  characterNumber: number;
}
export default async function Episodes({ characterNumber }: EpisodeProps) {
  const episodes = await getAllEpisodes();
  const CharacterEpisodes = episodes.filter((item) =>
    item.characters.includes(
      `https://rickandmortyapi.com/api/character/${characterNumber}`
    )
  );
  return (
    <div className="bg-(--neutral-700) w-full max-w-[1000px] rounded-3xl p-5 sm:p-10 flex gap-10 relative text-(--text) flex-col items-center justify-center">
      <h3 className="text-5xl font-mono font-extrabold w-full max-sm:text-3xl">
        Episodes
      </h3>
      <EpisodesScroller characterEpisodes={CharacterEpisodes} />
    </div>
  );
}
