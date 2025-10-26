import Image from "next/image";
import { character } from "../page";
import { PlanetsImgData } from "../PlanetsData";
import { GetLocationsById } from "@/services/contentSercives";
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

      <section>
        <div>
          <div className="w-full max-w-72 overflow-hidden rounded-3xl ">
            <div className="w-full h-72 relative">
              <div className="bg-neutral-800 rounded-full size-12 flex items-center justify-center absolute top-0 left-0 overflow-hidden m-1 z-10">
                <Image
                  alt="like"
                  src={"/svg/star.svg"}
                  width={37}
                  height={37}
                />
              </div>
              <Image
                alt="character"
                src={characterImg}
                width={300}
                height={400}
                objectFit="cover"
              />
              <div className="bg-neutral-800 drop-shadow-[0px_0px_12px] drop-shadow-[#0000004f] -mb-8 mr-1 rounded-full text-2xl size-22 flex items-center justify-center absolute bottom-0 right-0 border-4 border-[#87F54E]">
                Go
              </div>
            </div>
            <div className="text-[#4D4D4D] bg-[#87F54E] px-4 py-3 flex flex-col pb-0 gap-3">
              <div>
                <p className="text-lg font-bold">Name:</p>
                <p>Rick</p>
                <p className="text-lg font-bold">Status:</p>
                <p>Alive</p>
              </div>
              <div className="bg-neutral-800 w-fit  self-center flex items-center justify-center px-8 py-5 rounded-t-3xl">
                <Image
                  alt="gun icon"
                  src={"/svg/gun.svg"}
                  width={44}
                  height={27}
                />
                <span className="ml-2">Earth (C-137)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default page;
