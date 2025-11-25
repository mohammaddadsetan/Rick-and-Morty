"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CharacterCard from "../../characters/CharacterCard";
import { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import { CharacterContext } from "@/context/CharacterContext/CharacterContext";
import { CharacterType } from "@/services/rickandmorty";

interface CharacterSectionProps {
  planetNumber: string;
}

export default function CharacterSection({
  planetNumber,
}: CharacterSectionProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const context = useContext(CharacterContext);
  const characters = context.characters;

  const planetCharacters = characters.filter(
    (char: CharacterType) => char.location.url === planetNumber
  );

  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (planetCharacters.length >= 3) {
      e.preventDefault();
      setIsDragging(true);
      setStartX(e.clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    setCurrentTranslate(-startIndex * 296 + diff);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - startX;

    if (diff > 50) {
      setStartIndex((prev) => Math.max(prev - 3, 0));
    } else if (diff < -50) {
      setStartIndex((prev) => Math.min(prev + 3, planetCharacters.length - 3));
    }

    setCurrentTranslate(-startIndex * 296);
  };

  useEffect(() => {
    if (planetCharacters.length >= 3) {
      const slider = sliderRef.current;
      if (!slider) return;

      const handleWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (e.deltaY < 0) {
          setStartIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.deltaY > 0) {
          setStartIndex((prev) =>
            Math.min(prev + 1, planetCharacters.length - 3)
          );
        }
      };

      slider.addEventListener("wheel", handleWheel, { passive: false });
      return () => slider.removeEventListener("wheel", handleWheel);
    }
  }, [planetCharacters]);

  useEffect(() => {
    setCurrentTranslate(-startIndex * 296);
  }, [startIndex]);

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const text = "There is no character on this planet.";
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let index = 0;
    const interval = setInterval(() => {
      setTypedText(text.slice(0, index));
      index++;

      if (index > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [isVisible]);
  return (
    <section className="flex items-center gap-4 w-full justify-center">
      <button
        className={`cursor-pointer ${
          startIndex === 0 ? "opacity-50 pointer-events-none" : ""
        } ${planetCharacters.length <= 3 ? "hidden" : ""}`}
        onClick={() => setStartIndex((prev) => Math.max(prev - 1, 0))}>
        <ChevronLeft size={80} className="text-primary-100" />
      </button>

      <div className="overflow-hidden max-w-[880px] w-full">
        {planetCharacters.length > 0 ? (
          <div
            ref={sliderRef}
            className={`flex gap-2 transition-transform duration-500 ease-in-out cursor-grab select-none items-stretch ${
              planetCharacters.length <= 3 && "justify-center"
            } ${isDragging ? "cursor-grabbing" : ""}`}
            style={{ transform: `translateX(${currentTranslate}px)` }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}>
            {planetCharacters.map((char, index) => (
              <CharacterCard
                key={index}
                character_img={char.image}
                species={char.species}
                character_name={char.name}
                status={char.status}
                id={char.id}
              />
            ))}
          </div>
        ) : (
          <div className="flex  items-center  gap-4 relative  rounded-3xl  p-10 z-1 w-full  ">
            <Image
              alt="image"
              src={"/svg/pikle-rick-vectorize 1.svg"}
              width={200}
              height={200}
            />
            <p ref={ref} className="text-5xl font-mono">
              {typedText}
            </p>
            <span className="absolute inset-0 -z-1 overflow-hidden   rounded-3xl opacity-50">
              <span className="absolute  animate-border-spin   inset-[-1000%]  bg-[conic-gradient(from_0deg,transparent_0deg_10%,#87F54E_50%,transparent_100%)]" />

              <span className="absolute inset-[4px]  bg-black rounded-3xl z-10 "></span>
            </span>
          </div>
        )}
      </div>

      <button
        className={`cursor-pointer ${
          startIndex >= planetCharacters.length - 3
            ? "opacity-50 pointer-events-none"
            : ""
        } ${planetCharacters.length <= 3 ? "hidden" : ""}`}
        onClick={() =>
          setStartIndex((prev) =>
            Math.min(prev + 1, planetCharacters.length - 3)
          )
        }>
        <ChevronRight size={80} className="text-primary-100" />
      </button>
    </section>
  );
}
