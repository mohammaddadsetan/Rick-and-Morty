"use client";
import Image from "next/image";
import Link from "next/link";

interface PlanetsProps {
  index: number;
  href: string;
  className?: string;
  imgSize: number;
  src: string;
}
export default function Planets({
  index,
  href,
  className,
  imgSize,
  src,
}: PlanetsProps) {
  return (
    <Link
      href={`planets/${href.split(" ")[0]}`}
      key={index}
      className={`${className}`}>
      <Image
        width={imgSize}
        height={imgSize}
        alt="planet icon"
        src={src}
        key={index}
        className={` animate-zoom-in   hover:scale-105 hover:drop-shadow-[0px_0px_20px]  hover:drop-shadow-amber-200 transform duration-100  ease-in size-[${imgSize}] shrink-0`}
        onAnimationEnd={(e) => {
          e.currentTarget.classList.remove("animate-zoom-in");
          e.currentTarget.classList.add("rotate");
        }}
      />
    </Link>
  );
}
