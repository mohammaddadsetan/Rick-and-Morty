"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { HeaderLinks } from "./Data";
import MultiNavButton from "@/components/ui/MultiNavButton";
import { useContext, useEffect, useState } from "react";
import { FavoriteContext } from "@/context/FavoriteContext";
import { X } from "lucide-react";
import Link from "next/link";
import ImageInverter from "@/components/ui/ImageInverter";
export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);
  const pathname = usePathname();
  const favoritesContext = useContext(FavoriteContext);
  if (!favoritesContext) return null;
  const { favorites } = favoritesContext;
  return pathname === "/" ? (
    <header className="py-5 relative w-full h-full max-h-50">
      <Image
        width={100}
        height={100}
        alt="logo"
        src={"/svg/rick-and-morty-green-logo.svg"}
        className="w-full h-full px-10"
      />
    </header>
  ) : (
    <>
      <header className="flex items-center justify-between px-5 sm:px-10 py-5 gap-5 lg:gap-10 ">
        <Link href={"/"}>
          <Image
            alt="logo"
            src={`/svg/rick&morty_black.svg`}
            width={50}
            height={50}
            className="h-full w-auto bg-white rounded-[10px] p-1 block sm:hidden"
          />
        </Link>

        <Link className="hidden sm:block w-full" href={"/"}>
          <Image
            alt=""
            src={`/svg/rick-and-morty-green-logo.svg`}
            width={460}
            height={100}
            className="h-full w-60 md:w-100"
          />
        </Link>

        <button
          className="cursor-pointer z-101"
          onClick={() => {
            setIsOpen(!isOpen);
          }}>
          {isOpen ? (
            <X size={50} />
          ) : (
            <ImageInverter
              width={50}
              height={50}
              alt="menu"
              className="block md:hidden"
              src="/svg/burger-menu.svg"
            />
          )}
        </button>
        <MultiNavButton
          data={HeaderLinks}
          containerClassName="text-primary-100 gap-0  lg:gap-10 text-lg font-mono hidden md:flex"
          countBox={4}
          countNumber={favorites.length}
        />
      </header>

      <aside
        className="bg-[#000000d7] fixed top-0 size-full gap-5 transition-all duration-400 z-100 flex items-center justify-center pointer-events-auto"
        style={{ right: isOpen ? "0" : "-100%" }}>
        <MultiNavButton
          data={HeaderLinks}
          containerClassName="text-primary-100  gap-20 flex-col text-2xl font-mono "
          countBox={4}
          countNumber={favorites.length}
          onclock={() => setIsOpen(false)}
        />
      </aside>
    </>
  );
}
