"use client";
import CharacterCard from "@/components/layouts/characters/CharacterCard";
import { character } from "@/app/(main)/planets/page";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Input from "@/components/ui/Input";
interface Character {
  image: string;
  species: string;
  name: string;
  id: number;
  status: "Alive" | "Dead" | "unknown";
}
const option = [
  { value: "Alive", label: "Alive" },
  { value: "Dead", label: "Dead" },
  { value: "unknown", label: "unknown" },
];

function Characters() {
  const [moreCharacters, setMoreCharacters] = useState(false);
  const characterData: Character[] = character.data.results;
  const visibleCharacters = moreCharacters
    ? characterData
    : characterData.slice(0, 8);

  return (
    <section className="w-full flex flex-col items-center gap-10">
      <div className="flex items-center justify-center ">
        <Input options={option} label="status" />
      </div>

      <div className="grid grid-cols-[auto_auto_auto_auto] justify-center items-center  w-auto mx-auto my-10 gap-10 ">
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

      {!moreCharacters && characterData.length >= 8 && (
        <ChevronDown
          className="text-primary-100 cursor-pointer animate-bounce"
          size={90}
          onClick={() => setMoreCharacters(true)}
        />
      )}
    </section>
  );
}

export default Characters;
