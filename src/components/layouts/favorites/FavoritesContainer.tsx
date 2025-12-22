"use client";

import { CharacterType } from "@/services/rickandmorty";
import CharacterCard from "../characters/CharacterCard";
import { useContext } from "react";
import { FavoriteContext } from "@/context/FavoriteContext";
import { CharacterContext } from "@/context/CharacterContext/CharacterContext";
import Image from "next/image";

export default function FavoritesContainer() {
  const ctx = useContext(FavoriteContext);
  const context = useContext(CharacterContext);

  if (!ctx || !context) return null;

  const { favorites } = ctx;
  const characters = context.characters || [];

  const planetCharacters = characters.filter((char: CharacterType) =>
    favorites?.includes(char.id)
  );

  return (
    <div className="flex flex-col items-center justify-between gap-10 py-10 md:px-10 px-5">
      <Image alt="image" src={"/svg/favorites.svg"} width={400} height={300} />
      {planetCharacters.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center w-auto mx-auto my-10 gap-10">
          {planetCharacters.map((item) => (
            <CharacterCard
              key={item.id}
              character_img={item.image}
              character_name={item.name}
              species={item.species}
              status={item.status}
              id={item.id}
            />
          ))}
        </div>
      ) : (
        <p className=" md:text-2xl drop-shadow-[0px_0px_5px] drop-shadow-primary-100 font-bold max-w-[500px] text-center">
          There doesn't seem to be anything to show here currently, if you see a
          character you want to add to favorites, hit the white heart so you can
          see them here!
        </p>
      )}
    </div>
  );
}
