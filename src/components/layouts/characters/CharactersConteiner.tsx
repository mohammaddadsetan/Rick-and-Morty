import { getCharacters } from "@/services/rickandmorty";
import React from "react";
import Characters from "./Characters";

export default async function CharactersConteiner() {
  const characters = await getCharacters();
  return <Characters character={characters} />;
}
