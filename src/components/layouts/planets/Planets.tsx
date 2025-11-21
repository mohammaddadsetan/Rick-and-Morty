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
      href={`planets/${href.split(" ")[0]}_${index + 1}`}
      key={index}
      className={`${className} relative transform duration-100 hover:scale-110  ease-in  rounded-full`}>
      <div className="absolute inset-0  z-1 rounded-full shadow-[inset_0_0_10px_5px_rgba(0,0,0,0.6)] pointer-events-none"></div>
      <Image
        width={imgSize}
        height={imgSize}
        alt="planet icon"
        priority={true}
        src={src}
        quality={80}
        className={` animate-zoom-in   hover:drop-shadow-[0px_0px_20px]  transform duration-100  ease-in size-[${imgSize}] `}
        onAnimationEnd={(e) => {
          e.currentTarget.classList.remove("animate-zoom-in");
          e.currentTarget.classList.add("rotate");
        }}
      />
    </Link>
  );
}
