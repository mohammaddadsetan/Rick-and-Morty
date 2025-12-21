"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import CharacterCard from "../../characters/CharacterCard";
import { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CharacterContext } from "@/context/CharacterContext/CharacterContext";
import { CharacterType } from "@/services/rickandmorty";

interface CharacterSectionProps {
  planetNumber: string;
}

export default function CharacterSection({
  planetNumber,
}: CharacterSectionProps) {
  const context = useContext(CharacterContext);
  const characters = context?.characters || [];

  const planetCharacters = characters.filter(
    (char: CharacterType) => char.location.url === planetNumber
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanPrev(scrollLeft > 0);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const isOverflow = container.scrollWidth > container.clientWidth;

      if (!isOverflow) return;

      e.preventDefault();
      const speed = 4;
      container.scrollLeft += e.deltaY * speed;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", updateButtons);

    updateButtons();

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", updateButtons);
    };
  }, [planetCharacters.length]);

  const scrollNext = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: -scrollRef.current.clientWidth,
      behavior: "smooth",
    });
  };
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
    <section className="relative w-full py-8 px-10 flex justify-center items-center gap-8 max-md:grid grid-rows-[1fr_auto] ">
      {planetCharacters.length > 0 && (
        <button
          onClick={scrollPrev}
          disabled={!canPrev}
          className="z-10 hidden md:block disabled:opacity-40 cursor-pointer">
          <ChevronLeft size={100} className="text-primary-100 drop-shadow-lg" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide "
        style={{ overscrollBehaviorX: "contain" }}>
        {planetCharacters.length > 0 ? (
          planetCharacters.map((char) => (
            <div key={char.id} className="snap-start flex shrink-0 ">
              <CharacterCard
                character_img={char.image}
                species={char.species}
                character_name={char.name}
                status={char.status}
                id={char.id}
              />
            </div>
          ))
        ) : (
          <div className="flex max-md:flex-col items-center  gap-4 relative  rounded-3xl  p-10 z-1   max-w-[1000px]">
            <Image
              alt="image"
              src={"/svg/pikle-rick-vectorize 1.svg"}
              width={200}
              height={200}
              className="max-md:w-20"
            />
            <p
              ref={ref}
              className=" text-2xl sm:text-3xl md:text-5xl font-mono w-full">
              {typedText}
            </p>
            <span className="absolute inset-0 -z-1 overflow-hidden   rounded-3xl opacity-50">
              <span className="absolute  animate-border-spin   inset-[-1000%]  bg-[conic-gradient(from_0deg,transparent_0deg_10%,#87F54E_50%,transparent_100%)]" />

              <span className="absolute inset-1  bg-black rounded-3xl z-10 "></span>
            </span>
          </div>
        )}
      </div>

      {planetCharacters.length > 0 && (
        <button
          onClick={scrollNext}
          disabled={!canNext}
          className="z-10 hidden md:block disabled:opacity-40 cursor-pointer">
          <ChevronRight
            size={100}
            className="text-primary-100 drop-shadow-lg"
          />
        </button>
      )}

      {planetCharacters.length > 0 && (
        <div className="flex justify-center gap-16 mt-8 md:hidden">
          <button
            onClick={scrollPrev}
            disabled={!canPrev}
            className="disabled:opacity-40">
            <ChevronLeft size={100} className="text-primary-100" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canNext}
            className="disabled:opacity-40">
            <ChevronRight size={100} className="text-primary-100" />
          </button>
        </div>
      )}
    </section>
  );
}
