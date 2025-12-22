import { getCharacters } from "@/services/rickandmorty";
import Characters from "../characters/Characters";

export default async function FavoritesContainer() {
  const characters = await getCharacters();
  return <Characters character={characters} />;
}
