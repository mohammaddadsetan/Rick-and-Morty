import { getCharacters } from "@/services/rickandmorty";
import { CharacterProvider } from "./CharacterContext";

export default async function CharacterDataWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const characters = await getCharacters();

  return (
    <CharacterProvider initialCharacters={characters}>
      {children}
    </CharacterProvider>
  );
}
