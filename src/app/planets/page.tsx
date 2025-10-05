"use client";
import Image from "next/image";

export default function page() {
  const imageUrls = [
    { url: "/svg/planet1.svg", size: 154 },
    { url: "/svg/planet2.svg", size: 154 },
    { url: "/svg/planet3.svg", size: 105 },
    { url: "/svg/planet4.svg", size: 79 },
    { url: "/svg/planet5.svg", size: 128 },
    { url: "/svg/planet6.svg", size: 266 },
    { url: "/svg/planet7.svg", size: 186 },
    { url: "/svg/planet8.svg", size: 253 },
    { url: "/svg/planet9.svg", size: 175 },
    { url: "/svg/planet10.svg", size: 152 },
    { url: "/svg/planet11.svg", size: 204 },
    { url: "/svg/planet12.svg", size: 93 },
    { url: "/svg/planet13.svg", size: 96 },
    { url: "/svg/planet14.svg", size: 333 },
    { url: "/svg/planet15.svg", size: 122 },
  ];

  return (
    <main className="w-full h-full p-5">
      <div className=" w-full h-full px-[10%]  grid grid-cols-5 grid-rows-3 items-center justify-center grid-flow-col gap-5  ">
        {imageUrls.map((img, index) => {
          const justifyClass =
            index % 2 === 0
              ? "justify-self-end self-end"
              : "justify-self-center self-start";
          return (
            <Image
              width={img.size}
              height={img.size}
              alt="planet icon"
              src={img.url}
              key={index}
              className={`${justifyClass} animate-zoom-in   hover:scale-105 hover:drop-shadow-[0px_0px_20px]  hover:drop-shadow-amber-200 transform duration-100  ease-in size-[${img.size}] shrink-0`}
              onAnimationEnd={(e) => {
                e.currentTarget.classList.remove("animate-zoom-in");
                e.currentTarget.classList.add("rotate");
              }}
            />
          );
        })}
      </div>
    </main>
  );
}
