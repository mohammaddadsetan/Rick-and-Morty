import { PlanetsImgData } from "@/components/layouts/planets/PlanetsData";
import Planets from "@/components/layouts/planets/Planets";
import { getLocations } from "@/services/rickandmorty";

export default async function Page() {
  const locations = await getLocations();

  return (
    <section className="w-full h-full p-5">
      <div className="w-full h-full grid grid-cols-5 grid-rows-3 items-center justify-center grid-flow-col gap-5 overflow-hidden p-10">
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
    </section>
  );
}
