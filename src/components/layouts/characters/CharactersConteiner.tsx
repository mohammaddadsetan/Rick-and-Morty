import { getCharactersByFilter } from "@/services/rickandmorty";
import Characters from "./Characters";
import { notFound } from "next/navigation";

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
  if (!data?.results?.length) {
    return notFound();
  }

  return (
    <Characters
      character={data.results}
      page={data.info?.pages ?? 1}
      currentPage={page}
    />
  );
}
