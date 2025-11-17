import Characters from "@/components/layouts/characters/Characters";
import { getCharacters } from "@/services/rickandmorty";
import React from "react";

async function page() {
  const characters = await getCharacters();
  return <Characters character={characters} />;
}

export default page;
