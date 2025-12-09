"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HeaderLinks } from "./Data";
import MultiNavButton from "@/components/ui/MultiNavButton";
import { useContext } from "react";
import { FavoriteContext } from "@/context/FavoriteContext";
export default function Header() {
  const pathname = usePathname();
  const favoritesContext = useContext(FavoriteContext);
  if (!favoritesContext) return null;
  const { favorites } = favoritesContext;
  return pathname === "/" ? (
    <header className=" py-5 relative w-full h-full max-h-40">
      <Image
        fill
        alt="logo"
        src={"/svg/rick-and-morty-green-logo.svg"}
        className="w-full h-full px-10"
      />
    </header>
  ) : (
    <header>
      <div className="flex items-center justify-between px-10 py-5 h-full">
        <Image
          alt=""
          src={"/svg/rick-and-morty-green-logo.svg"}
          width={460}
          height={100}
          className="h-full w-auto"
        />

        <MultiNavButton
          data={HeaderLinks}
          containerClassName="text-primary-100 gap-10 text-lg"
          countBox={4}
          countNumber={favorites.length}
        />
      </div>
    </header>
  );
}
