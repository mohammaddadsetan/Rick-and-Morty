"use client";
import CharacterCard from "@/components/layouts/characters/CharacterCard";
import { character } from "@/app/(main)/planets/page";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
interface Character {
  image: string;
  species: string;
  name: string;
  id: number;
  status: "Alive" | "Dead" | "unknown";
}
const statusOption = [
  { value: "Alive", label: "Alive" },
  { value: "Dead", label: "Dead" },
  { value: "unknown", label: "unknown" },
];
const speciesOption = [
  { value: "Alien", label: "Alien" },
  { value: "Human", label: "Human" },
];

function Characters() {
  const [moreCharacters, setMoreCharacters] = useState(false);
  const [filteredStatus, setFilteredStatus] = useState<string>();
  const [filteredSpecies, setFilteredSpecies] = useState<string>();
  const [filteredName, setFilteredName] = useState<string>();
  const characterData: Character[] = character.data.results;

  const filteredCharacter = characterData.filter((item) => {
    const matchStatus = filteredStatus ? item.status === filteredStatus : true;
    const matchName = filteredName
      ? item.name.toLowerCase().startsWith(filteredName.toLowerCase())
      : true;
    const matchSpecies = filteredSpecies
      ? item.species === filteredSpecies
      : true;

    return matchStatus && matchSpecies && matchName;
  });

  const visibleCharacters = moreCharacters
    ? filteredCharacter
    : filteredCharacter.slice(0, 8);

  const handleStatusChange = (value: string) => {
    setFilteredStatus(value);
  };

  const handleSpeciesChange = (value: string) => {
    setFilteredSpecies(value);
  };
  const handleNameChange = (value: string) => {
    setFilteredName(value);
  };
  return (
    <section className="w-full flex flex-col items-center gap-10">
      <div className="flex items-center justify-center gap-5">
        <Input placeholder="search by name" onChange={handleNameChange} />
        <Select
          options={statusOption}
          label="status"
          onChange={handleStatusChange}
        />
        <Select
          options={speciesOption}
          label="species"
          onChange={handleSpeciesChange}
        />
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

      {!moreCharacters && filteredCharacter.length > 8 && (
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
