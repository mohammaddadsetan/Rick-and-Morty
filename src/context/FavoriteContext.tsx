"use client";
import { createContext, ReactNode, useEffect, useState } from "react";

export interface FavoriteContextType {
  favorites: number[];
  toggleFavorite: (id: number) => void;
}
interface FavoriteProviderProps {
  children: ReactNode;
}
export const FavoriteContext = createContext<FavoriteContextType | null>(null);

export default function FavoriteProvider({ children }: FavoriteProviderProps) {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(saved);
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];

      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };
  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoriteContext.Provider>
  );
}
