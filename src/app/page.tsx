"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [animateClass, setAnimateClass] = useState("");

  useEffect(() => {
    setAnimateClass("animate-zoom-in");
  }, []);

  return (
    <div className="w-full flex justify-center relative h-70 mx-20">
      <Image
        fill
        src="/svg/rick-car.svg"
        alt="car"
        className={`h-full shadow-lime-50 ${animateClass}`}
        onAnimationEnd={() => {
          if (animateClass === "animate-zoom-in") {
            setAnimateClass("animate-shake");
          }
        }}
      />
    </div>
  );
}
