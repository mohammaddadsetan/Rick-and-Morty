import { PlanetsImgData } from "./PlanetsData";
import Planets from "./Planets";
import { GetCaracters, GetLocations } from "@/services/contentSercives";
interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}
export const character = await GetCaracters();
const res = await GetLocations();
const locations: Location[] = res.data.results;

export default function Page() {
  return (
    <main className="w-full h-full p-5">
      <div className=" w-full h-full px-[10%]  grid grid-cols-5 grid-rows-3 items-center justify-center grid-flow-col gap-5  ">
        {PlanetsImgData.map((img, index) => {
          const justifyClass =
            index % 2 === 0
              ? "justify-self-end self-end"
              : "justify-self-center self-start";
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
    </main>
  );
}
