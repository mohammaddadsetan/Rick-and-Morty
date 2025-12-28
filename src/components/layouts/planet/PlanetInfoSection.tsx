import Image from "next/image";
import React from "react";
import { LocationType } from "@/services/rickandmorty";
interface planetDataProps {
  planetData: LocationType | null;
  planetImg: string;
}
export default function PlanetInfoSection({
  planetImg,
  planetData,
}: planetDataProps) {
  return (
    <div className="flex w-full justify-center items-center max-sm:flex-col">
      <div className="overflow-hidden p-10">
        <Image
          alt="planet image"
          src={planetImg ? planetImg : "/svg/planet1.svg"}
          width={1000}
          height={1000}
          className="sm:-ml-[30%] pointer-events-none  -z-1 max-w-200 w-full  rotate drop-shadow-[0px_0px_20px] drop-shadow-amber-100 sm:absolute sm:opacity-50 lg:opacity-70 top-0 left-0"
        />
      </div>

      <ul className="font-extrabold text-2xl space-y-3 drop-shadow-[0px_0px_2px] drop-shadow-primary-100 mt-5 text-(--text)">
        <li>
          Planet:
          <ul>
            <li className="text-lg font-normal list-disc pl-5 list-inside">
              {planetData?.name}
            </li>
          </ul>
        </li>
        <li>
          Type:
          <ul>
            <li className="text-lg font-normal list-disc pl-5 list-inside">
              {planetData?.type}
            </li>
          </ul>
        </li>
        <li>
          Dimension:
          <ul>
            <li className="text-lg font-normal list-disc pl-5 list-inside">
              {planetData?.dimension}
            </li>
          </ul>
        </li>
        <li>
          Created:
          <ul>
            <li className="text-lg font-normal list-disc pl-5 list-inside">
              {planetData?.created}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
