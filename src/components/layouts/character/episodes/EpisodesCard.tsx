import React from "react";
import { truncate } from "@/utils/truncate";
interface EpisodesCardProps {
  name: string;
  air_date: string;
  episode: string;
}

export default function EpisodesCard({
  name,
  air_date,
  episode,
}: EpisodesCardProps) {
  return (
    <div className="border-2 h-70 border-primary-100 rounded-xl p-5 *:font-mono font-bold *:flex *:flex-col *:items grid grid-rows-3 w-[176px] shrink-0 ">
      <p>
        Name:
        <span className="font-extralight self-center">
          {truncate(name, 20)}
        </span>
      </p>
      <p>
        Air_date:
        <span className="font-extralight self-center">{air_date}</span>
      </p>
      <p>
        episode: <span className="font-extralight self-center">{episode}</span>
      </p>
    </div>
  );
}
