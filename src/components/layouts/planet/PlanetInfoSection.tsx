import Image from "next/image";
import React from "react";

interface planetDataProps {
  planetData: {
    name: string;
    type: string;
    dimension: string;
    created: string;
  };
  planetImg: string;
}
export default function PlanetInfoSection({
  planetImg,
  planetData,
}: planetDataProps) {
  return (
    <div className="grid grid-cols-[45%_55%] w-full">
      <div className="overflow-hidden">
        <Image
          alt="planet image"
          src={planetImg ? planetImg : "/svg/planet1.svg"}
          width={700}
          height={700}
          className="-ml-40 rotate drop-shadow-[0px_0px_20px] drop-shadow-amber-100 p-10"
        />
      </div>

      <ul className="font-extrabold text-2xl space-y-3 drop-shadow-[0px_0px_2px] drop-shadow-[#87F54E] mt-20">
        <li>
          Planet:
          <ul>
            <li className="text-lg font-normal list-disc pl-5 list-inside">
              {planetData.name}
            </li>
          </ul>
        </li>
        <li>
          Type:
          <ul>
            <li className="text-lg font-normal list-disc pl-5 list-inside">
              {planetData.type}
            </li>
          </ul>
        </li>
        <li>
          Dimension:
          <ul>
            <li className="text-lg font-normal list-disc pl-5 list-inside">
              {planetData.dimension}
            </li>
          </ul>
        </li>
        <li>
          Created:
          <ul>
            <li className="text-lg font-normal list-disc pl-5 list-inside">
              {planetData.created}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
