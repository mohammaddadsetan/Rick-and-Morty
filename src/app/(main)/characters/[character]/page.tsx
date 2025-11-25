import React from "react";
import Character from "@/components/layouts/character/Character";
import { getCharacterById } from "@/services/rickandmorty";
import { notFound } from "next/navigation";

type CharacterPageProps = {
  params: Promise<{ character: string }>;
};

export default async function Page({ params }: CharacterPageProps) {
  const { character } = await params;
  const isOnlyNumber = /^\d+$/.test(character.toString());
  if (!isOnlyNumber) {
    notFound();
  }
  const characterId = parseInt(character);

  return <Character characterId={characterId} />;
}
