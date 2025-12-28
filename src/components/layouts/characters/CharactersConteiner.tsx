import { getCharactersByFilter } from "@/services/rickandmorty";
import Characters from "./Characters";
import CharactersFilter from "./CharactersFilter";
import Image from "next/image";

export default async function CharactersContainer({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const SearchParams = await searchParams;
  const page = Number(SearchParams.page) || 1;
  const status = SearchParams.status?.toString() || "";
  const species = SearchParams.species?.toString() || "";
  const name = SearchParams.name?.toString() || "";
  const data = await getCharactersByFilter({ status, species, name, page });

  return (
    <section className="w-full  sm:px-10 flex items-center flex-col justify-center">
      <CharactersFilter />

      {data ? (
        <Characters
          character={data.results}
          page={data.info?.pages ?? 1}
          currentPage={page}
        />
      ) : (
        <div className="flex items-center justify-center h-full gap-10 lg:gap-20 font-mono max-md:flex-col p-10 text-center">
          <p className="text-4xl md:text-7xl drop-shadow-[0px_0px_5px] drop-shadow-primary-100 font-bold">
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
    </section>
  );
}
