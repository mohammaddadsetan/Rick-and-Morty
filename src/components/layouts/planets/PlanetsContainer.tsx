import React from "react";
import Planets from "./Planets";
import { PlanetsImgData } from "./PlanetsData";
import { getLocations } from "@/services/rickandmorty";

export default async function PlanetsContainer() {
  const locations = await getLocations();

  return (
    <section className="w-full h-full p-5">
      <div className=" h-full flex flex-wrap justify-center gap-5 overflow-hidden p-10 shrink-0 w-full  mx-auto">
        {PlanetsImgData.map((img, index) => {
          const justifyClass =
            index % 3 === 0
              ? " sm:mb-20 lg:mb-30 self-start ml-10 "
              : " self-end mr-10 sm:mr-10  ";

          const planetName = locations[index]?.name || "unknown";

          return (
            <Planets
              href={planetName}
              imgSize={img.size}
              index={index}
              key={index}
              className={justifyClass}
              src={img.url}
            />
          );
        })}
      </div>
    </section>
  );
}
