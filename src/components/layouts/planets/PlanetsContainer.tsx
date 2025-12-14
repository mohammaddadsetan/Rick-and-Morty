import React from "react";
import Planets from "./Planets";
import { PlanetsImgData } from "./PlanetsData";
import { getLocations } from "@/services/rickandmorty";

export default async function PlanetsContainer() {
  const locations = await getLocations();

  return (
    <section className="w-full h-full p-5">
      <div className="w-full h-full grid grid-cols-5 grid-rows-3  grid-flow-col gap-5 overflow-hidden p-10 shrink-0">
        {PlanetsImgData.map((img, index) => {
          const justifyClass =
            index % 2 === 0
              ? " mb-30 justify-self-center self-end"
              : " justify-self-end self-end mt-30";

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
