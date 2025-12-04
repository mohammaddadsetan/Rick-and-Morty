import { getCharactersByFilter } from "@/services/rickandmorty";
import Characters from "./Characters";
import CharactersFilter from "./CharactersFilter";
import Image from "next/image";

export default async function CharactersContainer({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const SearchParams = await searchParams;
  const page = Number(SearchParams.page) || 1;
  const status = SearchParams.status?.toString() || "";
  const species = SearchParams.species?.toString() || "";
  const name = SearchParams.name?.toString() || "";
  const data = await getCharactersByFilter({ status, species, name, page });

  return (
    <section className="w-full">
      <CharactersFilter />

      {data ? (
        <Characters
          character={data.results}
          page={data.info?.pages ?? 1}
          currentPage={page}
        />
      ) : (
        <div className="flex items-center justify-center h-full py-10 font-mono">
          <p className="text-7xl drop-shadow-[0px_0px_5px] drop-shadow-primary-100 font-bold">
            character not found
          </p>

          <Image
            width={300}
            height={300}
            alt="image"
            src={"/svg/rick-head.svg"}
          />
        </div>
      )}
    </section>
  );
}
