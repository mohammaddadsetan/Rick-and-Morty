import Image from "next/image";
import { character } from "../page";
import { PlanetsImgData } from "../PlanetsData";
import { GetLocationsById } from "@/services/contentSercives";
import CharacterCard from "@/components/layouts/planet/characterSection/CharacterCard";
import { ChevronRight, ChevronLeft } from "lucide-react";
interface ParamsProps {
  params: {
    planet: string;
  };
}

const page = async ({ params }: ParamsProps) => {
  const paramsData = await params;
  const planetNumber = paramsData.planet.split("_")[1];
  const planetImg = PlanetsImgData.find(
    (img) => img.url === `/svg/planet${planetNumber}.svg`
  );
  const PlanetData = await GetLocationsById(Number(planetNumber));

  const characterImg = character.data.results[0].image;

  return (
    <section className="text-neutral-50 flex flex-col items-center">
      <div className="grid grid-cols-[45%_55%] items-center w-full">
        <div className="overflow-hidden ">
          <Image
            alt="planet image"
            src={planetImg ? planetImg.url : "/svg/planet1.svg"}
            width={700}
            height={700}
            className="-ml-40 rotate drop-shadow-[0px_0px_20px] drop-shadow-amber-100 p-10"
          />
        </div>

        <ul className="font-extrabold text-2xl space-y-3 drop-shadow-[0px_0px_2px] drop-shadow-[#87F54E]">
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

      <section className="flex">
        <button>
          <ChevronLeft size={120} className="text-primary-100" />
        </button>
        <div className="flex gap-2">
          {[
            character.data.results[0],
            character.data.results[1],
            character.data.results[2],
          ].map((char, index) => (
            <CharacterCard
              character_img={char.image}
              species={char.species}
              character_name={char.name}
              key={index}
              status={char.status}
            />
          ))}
        </div>
        <button>
          <ChevronRight size={120} className="text-primary-100" />
        </button>
      </section>
    </section>
  );
};

export default page;
