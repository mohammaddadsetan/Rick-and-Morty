"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" w-full flex justify-center p-2 h-full">
      <Image
        width={418}
        height={380}
        src={"/svg/rick-car.svg"}
        alt="car"
        className="h-full animate-zoom-in shadow-lime-50"
        onAnimationEnd={(e) => {
          e.currentTarget.classList.remove("animate-zoom-in");
          e.currentTarget.classList.add("animate-shake");
        }}
      />
    </div>
  );
}
