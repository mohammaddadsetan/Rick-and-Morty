import { PlanetsImgData } from "../../../../components/layouts/planets/PlanetsData";
import CharacterSection from "@/components/layouts/planet/characterSection/CharacterSection";
import PlanetInfoSection from "@/components/layouts/planet/PlanetInfoSection";
import { getCharacters, getLocationById } from "@/services/rickandmorty";
import { CharacterType } from "@/services/rickandmorty";
import { notFound } from "next/navigation";

interface ParamsProps {
  params: Promise<{ planet: string }>;
}

export default async function Page({ params }: ParamsProps) {
  const { planet } = await params;

  const match = planet.match(/^([A-Za-z'\-\s]+)_(\d+)$/);
  if (!match) {
    notFound();
  }

  const [, namePart, idPart] = match;
  const planetId = Number(idPart);

  if (planetId < 1 || planetId > 126) {
    notFound();
  }

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
  const characters = await getCharacters();

  const planetCharacter = characters.filter(
    (char: CharacterType) =>
      char.origin.url === PlanetData.url || char.location.url === PlanetData.url
  );
  const planetImg = PlanetsImgData.find(
    (img) => img.url === `/svg/planet${planetId}.svg`
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
