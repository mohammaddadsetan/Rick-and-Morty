import Image from "next/image";
import { PlanetsImgData } from "../PlanetsData";
import { GetLocationsById } from "@/services/contentSercives";
import CharacterSection from "@/components/layouts/planet/characterSection/CharacterSection";
import { character } from "../page";

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
    (char: Character) => char.origin.url === PlanetData.data.url
  );

  return (
    <section className="text-neutral-50 flex flex-col items-center">
      <div className="grid grid-cols-[45%_55%] w-full">
        <div className="overflow-hidden">
          <Image
            alt="planet image"
            src={planetImg ? planetImg.url : "/svg/planet1.svg"}
            width={700}
            height={700}
            className="-ml-40 rotate drop-shadow-[0px_0px_20px] drop-shadow-amber-100 p-10"
          />
        </div>

        <ul className="font-extrabold text-2xl space-y-3 drop-shadow-[0px_0px_2px] drop-shadow-[#87F54E] mt-20">
          <li>
            Planet:
            <ul>
              <li className="text-lg font-normal list-disc pl-5 list-inside">
                {PlanetData.data.name}
              </li>
            </ul>
          </li>
          <li>
            Type:
            <ul>
              <li className="text-lg font-normal list-disc pl-5 list-inside">
                {PlanetData.data.type}
              </li>
            </ul>
          </li>
          <li>
            Dimension:
            <ul>
              <li className="text-lg font-normal list-disc pl-5 list-inside">
                {PlanetData.data.dimension}
              </li>
            </ul>
          </li>
          <li>
            Created:
            <ul>
              <li className="text-lg font-normal list-disc pl-5 list-inside">
                {PlanetData.data.created}
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <CharacterSection character={planetCharacter} />
    </section>
  );
};
export default page;
