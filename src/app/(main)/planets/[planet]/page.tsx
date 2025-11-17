import { PlanetsImgData } from "../../../../components/layouts/planets/PlanetsData";
import CharacterSection from "@/components/layouts/planet/characterSection/CharacterSection";
import PlanetInfoSection from "@/components/layouts/planet/PlanetInfoSection";
import { getCharacters, getLocationById } from "@/services/rickandmorty";
import { CharacterType } from "@/services/rickandmorty";

interface ParamsProps {
  params: Promise<{ planet: string }>;
}

export default async function Page({ params }: ParamsProps) {
  const { planet } = await params;
  const planetNumber = parseInt(planet.split("_")[1]);

  const planetImg = PlanetsImgData.find(
    (img) => img.url === `/svg/planet${planetNumber}.svg`
  );

  const PlanetData = await getLocationById(planetNumber);
  const characters = await getCharacters();

  const planetCharacter = characters.filter(
    (char: CharacterType) =>
      char.origin.url === PlanetData?.url ||
      char.location.url === PlanetData?.url
  );

  return (
    <section className="text-neutral-50 flex flex-col items-center pb-20 w-full">
      <PlanetInfoSection
        planetData={PlanetData}
        planetImg={planetImg?.url || "/svg/planet1.svg"}
      />

      <CharacterSection character={planetCharacter} />
    </section>
  );
}
