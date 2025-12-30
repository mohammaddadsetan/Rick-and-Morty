import CharactersFilter from "./CharactersFilter";
import { Suspense } from "react";
import CharactersSection from "./CharactersSection";
import CharactersSkeleton from "./CharactersSkeleton";

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

  return (
    <section className="w-full  sm:px-10 flex items-center flex-col justify-center">
      <CharactersFilter />

      <Suspense
        fallback={<CharactersSkeleton />}
        key={`${page}-${status}-${species}-${name}`}>
        <CharactersSection
          page={page}
          species={species}
          name={name}
          status={status}
        />
      </Suspense>
    </section>
  );
}
