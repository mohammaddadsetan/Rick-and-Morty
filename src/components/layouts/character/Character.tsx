import React from "react";
import Image from "next/image";
import { PlanetsImgData } from "../planets/PlanetsData";
import { CharacterType } from "@/services/rickandmorty";
interface CharacterPageProps {
  characterData: CharacterType;
}

export default function Character({ characterData }: CharacterPageProps) {
  if (!characterData) return <div>Character not found</div>;

  const planetId = characterData.location.url.split("/").pop();
  const planetImg = PlanetsImgData.find(
    (item) => `/svg/planet${planetId}.svg` === item.url
  )?.url;

  return (
    <section className="w-full flex items-stretch justify-center mt-20 mb-20">
      <div className="bg-white w-full max-w-[1000px] rounded-4xl p-10 flex gap-10 relative">
        <Image
          width={150}
          height={150}
          src={planetImg || `/svg/unknown_planet.png`}
          alt="Image"
          className="absolute -right-15 -top-15 rotate"
        />

        <div className="border-2 border-black rounded-3xl overflow-hidden w-[500px] relative">
          <Image
            alt="image"
            src={characterData.image}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="flex flex-col gap-10 text-black w-2/3">
          <div className="flex flex-col gap-5 bg-primary-100 rounded-3xl p-10 border-2 border-black">
            <h1 className="text-5xl font-bold font-mono">
              {characterData.name}
            </h1>
            <hr className="w-1/2" />
            <div className="flex flex-col gap-1 font-mono">
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
                  {characterData.Gender || "unknown"}
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

          <div className="flex gap-2 bg-primary-100 rounded-3xl p-4 justify-evenly h-20">
            <Image src={"/svg/gun-icon.svg"} width={60} height={60} alt="" />
            <Image src={"/svg/atom-icon.svg"} width={60} height={60} alt="" />
            <Image
              src={"/svg/neptune-icon.svg"}
              width={60}
              height={60}
              alt=""
            />
            <Image src={"/svg/space-icon.svg"} width={60} height={60} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
