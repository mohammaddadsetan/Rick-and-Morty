import { getLocationById } from "@/services/rickandmorty";
import { notFound } from "next/navigation";
import React from "react";
import { PlanetsImgData } from "../planets/PlanetsData";
import PlanetInfoSection from "./PlanetInfoSection";
import CharacterSection from "./characterSection/CharacterSection";
interface PlanetContainerProps {
  planetId: number;
  namePart: string;
}

export default async function PlanetContainer({
  planetId,
  namePart,
}: PlanetContainerProps) {
  const PlanetData = await getLocationById(planetId);

  if (
    !PlanetData ||
    PlanetData.id !== planetId ||
    !PlanetData.name
      .toLowerCase()
      .replace(/[^a-z]/g, "")
      .startsWith(namePart.toLowerCase().replace(/[^a-z]/g, ""))
  ) {
    notFound();
  }

  const planetImg = PlanetsImgData.find(
    (img) => img.url === `/svg/planet${planetId}.svg`
  );
  return (
    <section className="text-neutral-50 flex flex-col items-center pb-20 w-full">
      <PlanetInfoSection
        planetData={PlanetData}
        planetImg={planetImg?.url || "/svg/planet1.svg"}
      />

      <CharacterSection planetNumber={PlanetData.url} />
    </section>
  );
}
