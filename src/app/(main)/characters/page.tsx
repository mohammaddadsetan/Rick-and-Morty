import CharactersContainer from "@/components/layouts/characters/CharactersConteiner";
import React from "react";

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return <CharactersContainer searchParams={searchParams} />;
}
