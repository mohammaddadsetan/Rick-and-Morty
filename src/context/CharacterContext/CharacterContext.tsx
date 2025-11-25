"use client";

import { createContext, ReactNode } from "react";
import { CharacterType } from "@/services/rickandmorty";

interface CharacterContextType {
  characters: CharacterType[];
}

export const CharacterContext = createContext<CharacterContextType>({
  characters: [],
});

export const CharacterProvider = ({
  children,
  initialCharacters,
}: {
  children: ReactNode;
  initialCharacters: CharacterType[];
}) => {
  return (
    <CharacterContext.Provider
      value={{
        characters: initialCharacters,
      }}>
      {children}
    </CharacterContext.Provider>
  );
};
