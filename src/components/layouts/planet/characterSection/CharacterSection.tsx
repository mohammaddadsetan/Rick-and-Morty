"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CharacterCard from "./CharacterCard";
import { useState, useRef, useEffect } from "react";

interface Character {
  image: string;
  species: string;
  name: string;
  status: "Alive" | "Dead" | "unknown";
}

interface CharacterSectionProps {
  character: Character[];
}

export default function CharacterSection({ character }: CharacterSectionProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setStartX(e.clientX);
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
      setStartIndex((prev) => Math.min(prev + 3, character.length - 3));
    }

    setCurrentTranslate(-startIndex * 296);
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        setStartIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.deltaY > 0) {
        setStartIndex((prev) => Math.min(prev + 1, character.length - 3));
      }
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    return () => slider.removeEventListener("wheel", handleWheel);
  }, [character]);

  useEffect(() => {
    setCurrentTranslate(-startIndex * 296);
  }, [startIndex]);

  return (
    <section className="flex items-center gap-4">
      <button
        className={`cursor-pointer ${
          startIndex === 0 ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={() => setStartIndex((prev) => Math.max(prev - 1, 0))}>
        <ChevronLeft size={80} className="text-primary-100" />
      </button>

      <div className="overflow-hidden max-w-[880px] w-full">
        <div
          ref={sliderRef}
          className="flex gap-2 transition-transform duration-500 ease-in-out cursor-pointer select-none"
          style={{ transform: `translateX(${currentTranslate}px)` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}>
          {character.map((char, index) => (
            <CharacterCard
              key={index}
              character_img={char.image}
              species={char.species}
              character_name={char.name}
              status={char.status}
            />
          ))}
        </div>
      </div>

      <button
        className={`cursor-pointer ${
          startIndex >= character.length - 3
            ? "opacity-50 pointer-events-none"
            : ""
        }`}
        onClick={() =>
          setStartIndex((prev) => Math.min(prev + 1, character.length - 3))
        }>
        <ChevronRight size={80} className="text-primary-100" />
      </button>
    </section>
  );
}
