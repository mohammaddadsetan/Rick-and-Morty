import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { FavoriteContext } from "@/context/FavoriteContext";
interface characterCardProps {
  character_img: string;
  character_name: string;
  species: string;

  id: number;
  status: "Alive" | "Dead" | "unknown";
}

export default function CharacterCard({
  character_img,
  character_name,
  species,
  id,
  status = "Alive",
}: characterCardProps) {
  const ctx = useContext(FavoriteContext);
  if (!ctx) return null;
  const { favorites, toggleFavorite } = ctx;

  const color =
    status === "Alive" ? "#87F54E" : status === "Dead" ? "#fb2c36" : "#ffd230";
  return (
    <div className="w-full min-w-72 max-w-72 overflow-hidden rounded-3xl ">
      <div className="w-full h-72 relative">
        <button
          onClick={() => toggleFavorite?.(id)}
          className="bg-neutral-800 cursor-pointer   rounded-full size-10 flex items-center justify-center absolute top-0 left-0 overflow-hidden m-1 z-10">
          <Star
            color={`${favorites.includes(id) ? "#ffd900" : "white"}`}
            fill={`${favorites.includes(id) ? "#ffd900" : ""}`}
          />
        </button>
        <Image alt="character" src={character_img} objectFit="cover" fill />
        <Link
          href={`/characters/${id}`}
          className="bg-neutral-800 hover:scale-108 transition-all duration-300 cursor-pointer drop-shadow-[0px_0px_10px] drop-shadow-[#0000004f] -mb-8 mr-1 rounded-full text-2xl size-20 flex items-center justify-center absolute bottom-0 right-0 border-4 border-[#87F54E]">
          Go
        </Link>
      </div>
      <div className="text-[#4d4d4d] bg-[#87F54E] px-4 py-4 flex flex-col pb-0 gap-3">
        <div>
          <p className="text-lg font-bold">Name:</p>
          <p>{character_name}</p>
          <p className="text-lg font-bold">species:</p>
          <p>{species}</p>
        </div>
        <div
          className="w-full max-w-2/4 text-lg self-center flex items-center justify-center gap-2 py-2 rounded-t-3xl bg-neutral-800"
          style={{ color: color }}>
          <div
            className="rounded-full size-2.5 shrink-0"
            style={{ backgroundColor: color }}></div>
          <span>{status}</span>
        </div>
      </div>
    </div>
  );
}
