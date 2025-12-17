"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import EpisodesCard from "./EpisodesCard";
import { EpisodeType } from "@/services/rickandmorty";

interface CharacterSectionProps {
  characterEpisodes: EpisodeType[];
}

export default function EpisodesScroller({
  characterEpisodes,
}: CharacterSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  /* ---------------- scroll buttons logic ---------------- */
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
      container.scrollLeft += e.deltaY * 5;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("scroll", updateButtons);

    updateButtons();

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("scroll", updateButtons);
    };
  }, [characterEpisodes.length]);

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

  /* ---------------- empty state typing effect ---------------- */
  const ref = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const text = "There is no character on this planet.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && setIsVisible(true),
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

  /* ---------------- render ---------------- */
  return (
    <section className="relative w-full flex items-center justify-center gap-6 max-md:flex-col">
      {characterEpisodes.length > 0 && (
        <button
          onClick={scrollPrev}
          disabled={!canPrev}
          className="hidden md:block disabled:opacity-40">
          <ChevronLeft size={80} className="text-whit" />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide max-w-[728px] w-full">
        {characterEpisodes.length > 0 ? (
          characterEpisodes.map((ep, index) => (
            <div key={index} className="snap-start shrink-0">
              <EpisodesCard
                air_date={ep.air_date}
                episode={ep.episode}
                name={ep.name}
              />
            </div>
          ))
        ) : (
          <div className="flex items-center gap-4 relative rounded-3xl p-10 w-full">
            <Image
              alt="image"
              src="/svg/pikle-rick-vectorize 1.svg"
              width={200}
              height={200}
            />
            <p ref={ref} className="text-5xl font-mono">
              {typedText}
            </p>

            <span className="absolute inset-0 -z-1 rounded-3xl opacity-50 overflow-hidden">
              <span className="absolute animate-border-spin inset-[-1000%] bg-[conic-gradient(from_0deg,transparent_0deg_10%,#87F54E_50%,transparent_100%)]" />
              <span className="absolute inset-1 bg-black rounded-3xl z-10" />
            </span>
          </div>
        )}
      </div>

      {characterEpisodes.length > 0 && (
        <button
          onClick={scrollNext}
          disabled={!canNext}
          className="hidden md:block disabled:opacity-40">
          <ChevronRight size={80} className="text-white" />
        </button>
      )}
      {characterEpisodes.length > 0 && (
        <div className="flex justify-center gap-16 mt-8 md:hidden">
          <button
            onClick={scrollPrev}
            disabled={!canPrev}
            className="disabled:opacity-40">
            <ChevronLeft size={100} className="white" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canNext}
            className="disabled:opacity-40">
            <ChevronRight size={100} className="white" />
          </button>
        </div>
      )}
    </section>
  );
}
