import Image from "next/image";
import React from "react";
import Characters from "./Characters";
import { getCharactersByFilter } from "@/services/rickandmorty";

interface characterSection {
  status: string;
  species: string;
  name: string;
  page: number;
}

export default async function CharactersSection({
  status,
  species,
  name,
  page,
}: characterSection) {
  const data = await getCharactersByFilter({ status, species, name, page });

  return (
    <div>
      {data ? (
        <Characters
          character={data.results}
          page={data.info?.pages ?? 1}
          currentPage={page}
        />
      ) : (
        <div className="flex items-center justify-center h-full gap-10 lg:gap-20 font-mono max-md:flex-col p-10 text-center">
          <p className="text-4xl md:text-7xl drop-shadow-[0px_0px_5px] drop-shadow-primary-100 font-bold text-(--text)">
            character not found
          </p>
          <Image
            width={300}
            height={300}
            alt="image"
            src={"/svg/rick-head.svg"}
            className="max-lg:w-70 max-md:w-50"
          />
        </div>
      )}
    </div>
  );
}
