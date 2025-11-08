import { PlanetsImgData } from "../../../../components/layouts/planets/PlanetsData";
import { GetLocationsById } from "@/services/contentSercives";
import CharacterSection from "@/components/layouts/planet/characterSection/CharacterSection";
import { character } from "../page";
import PlanetInfoSection from "@/components/layouts/planet/PlanetInfoSection";

interface ParamsProps {
  params: {
    planet: string;
  };
}
interface Character {
  origin: { name: string; url: string };
  location: { name: string; url: string };
}

const page = async ({ params }: ParamsProps) => {
  const paramsData = await params;
  const planetNumber = paramsData.planet.split("_")[1];

  const planetImg = PlanetsImgData.find(
    (img) => img.url === `/svg/planet${planetNumber}.svg`
  );

  const PlanetData = await GetLocationsById(Number(planetNumber));

  const planetCharacter = character.data.results.filter(
    (char: Character) =>
      char.origin.url === PlanetData.data.url ||
      char.location.url === PlanetData.data.url
  );

  console.log(planetCharacter);
  return (
    <section className="text-neutral-50 flex flex-col items-center pb-20">
      <PlanetInfoSection
        planetData={PlanetData.data}
        planetImg={planetImg?.url || "/svg/planet1.svg"}
      />

      <CharacterSection character={planetCharacter} />
    </section>
  );
};
export default page;
