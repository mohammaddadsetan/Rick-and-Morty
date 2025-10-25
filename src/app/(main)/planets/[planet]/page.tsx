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
  const planetNumber = params.planet.split("_")[1];
  const planetImg = PlanetsImgData.find(
    (img) => img.url === `/svg/planet${planetNumber}.svg`
  );
  const PlanetData = await GetLocationsById(Number(planetNumber));
  console.log(PlanetData);
  return (
    <section className="text-neutral-50">
      <div className="grid grid-cols-[40%_60%] items-center ">
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
    </section>
  );
};

export default page;
