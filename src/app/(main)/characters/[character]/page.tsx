import React from "react";
import Character from "@/components/layouts/character/Character";
import { getCharacterById } from "@/services/rickandmorty";

type CharacterPageProps = {
  params: Promise<{ character: string }>;
};

export default async function Page({ params }: CharacterPageProps) {
  const { character } = await params;
  const characterId = parseInt(character);
  const characterData = await getCharacterById(characterId);

  return <Character characterData={characterData} />;
}
