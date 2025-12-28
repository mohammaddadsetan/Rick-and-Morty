import Image from "next/image";
import { PlanetsImgData } from "../planets/PlanetsData";
import { getCharacterById } from "@/services/rickandmorty";
import { notFound } from "next/navigation";
import Episodes from "./episodes/Episodes";
interface CharacterPageProps {
  characterId: number;
}

export default async function Character({ characterId }: CharacterPageProps) {
  const characterData = await getCharacterById(characterId);
  if (!characterData || !characterId) {
    notFound();
  }
  const planetId = characterData.location.url.split("/").pop();
  const planetImg = PlanetsImgData.find(
    (item) => `/svg/planet${planetId}.svg` === item.url
  )?.url;

  return (
    <section className="w-full flex items-center justify-center mt-20 mb-20 flex-col gap-10 px-5  sm:px-15 md:px-20 ">
      <div className="bg-(--neutral-700) w-full max-w-[1000px] rounded-4xl p-5 sm:p-10 flex gap-5 sm:gap-10 relative  max-lg:flex-col max-lg:justify-center max-lg:items-center">
        <div className="absolute sm:-right-15 sm:-top-15  overflow-hidden max-sm:-top-25">
          <Image
            width={150}
            height={150}
            src={planetImg || `/svg/unknown_planet.png`}
            alt="Image"
            className="rotate"
          />
        </div>

        <div className="border-2 border-white rounded-3xl overflow-hidden w-full max-lg:h-[400px] max-w-[400px] max-sm:h-[300px]">
          <Image
            alt="image"
            src={characterData.image}
            width={300}
            height={300}
            className="w-full h-full "
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="flex flex-col gap-10 text-black w-full lg:w-2/3  justify-between md:flex-row lg:flex-col ">
          <div className="flex flex-col gap-5 bg-primary-100 rounded-3xl p-5 md:p-10 border-2 border-white max-lg:w-full">
            <h1 className="text-5xl font-bold font-mono max-md:text-3xl">
              {characterData.name}
            </h1>
            <hr className="w-1/2" />
            <div className="flex flex-col gap-1 font-mono *:font-extrabold">
              <p>
                Status:{" "}
                <span className="font-extralight">
                  {characterData.status || "unknown"}
                </span>
              </p>
              <p>
                Species:{" "}
                <span className="font-extralight">
                  {characterData.species || "unknown"}
                </span>
              </p>
              <p>
                Type:{" "}
                <span className="font-extralight">
                  {characterData.type || "unknown"}
                </span>
              </p>
              <p>
                Gender:{" "}
                <span className="font-extralight">
                  {characterData.gender || "unknown"}
                </span>
              </p>
              <p>
                Origin:{" "}
                <span className="font-extralight">
                  {characterData.origin.name || "unknown"}
                </span>
              </p>
              <p>
                Location:{" "}
                <span className="font-light">
                  {characterData.location.name || "unknown"}
                </span>
              </p>
            </div>
          </div>

          <div className="flex gap-2 bg-primary-100 rounded-3xl p-4 justify-evenly lg:h-20 md:flex-col lg:flex-row">
            <Image
              src={"/svg/gun-icon.svg"}
              width={60}
              height={60}
              alt=""
              className="max-md:size-12 max-sm:size-8"
            />
            <Image
              src={"/svg/atom-icon.svg"}
              width={60}
              height={60}
              alt=""
              className="max-md:size-12 max-sm:size-8"
            />
            <Image
              src={"/svg/neptune-icon.svg"}
              width={60}
              height={60}
              alt=""
              className="max-md:size-12 max-sm:size-8"
            />
            <Image
              src={"/svg/space-icon.svg"}
              width={60}
              height={60}
              alt=""
              className="max-md:size-12 max-sm:size-8"
            />
          </div>
        </div>
      </div>
      <Episodes characterNumber={characterId} />
    </section>
  );
}
