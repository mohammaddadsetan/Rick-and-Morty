"use client";
import CharacterCard from "@/components/layouts/characters/CharacterCard";
import React, { useContext, useState } from "react";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { FavoriteContext } from "@/context/FavoriteContext";
import { CharacterType } from "@/services/rickandmorty";
import Pagination from "@/components/ui/Pagination";

interface characterProps {
  character: CharacterType[] | null;
  page?: number;
  currentPage?: number;
}

function Characters({ character, page = 1, currentPage = 1 }: characterProps) {
  const [moreCharacters, setMoreCharacters] = useState(false);
  const pathname = usePathname();
  const ctx = useContext(FavoriteContext);
  if (!character) return null;
  if (!ctx) return null;
  const { favorites } = ctx;
  const characterData: CharacterType[] =
    pathname !== "/favorites"
      ? character
      : character.filter((item) => favorites.includes(item.id));

  const visibleCharacters = moreCharacters
    ? characterData
    : characterData.slice(0, 8);

  return (
    <section className="w-full flex flex-col items-center gap-10">
      <div className="flex flex-wrap justify-center items-center  w-auto mx-auto my-10 gap-10 ">
        {visibleCharacters.map((item, index) => (
          <CharacterCard
            key={index}
            character_img={item.image}
            character_name={item.name}
            species={item.species}
            status={item.status}
            id={item.id}
          />
        ))}
      </div>

      {!moreCharacters && characterData.length > 8 && (
        <ChevronDown
          className="text-primary-100 cursor-pointer animate-bounce"
          size={90}
          onClick={() => setMoreCharacters(true)}
        />
      )}
      {moreCharacters && pathname !== "/favorites" && (
        <Pagination page_lenght={page} current_page={currentPage} />
      )}
    </section>
  );
}

export default Characters;
