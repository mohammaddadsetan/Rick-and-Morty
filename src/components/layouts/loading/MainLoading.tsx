"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface LineData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;
}

export default function MainLoading() {
  const [loading, setLoading] = useState<boolean | null>(true);
  const [visited, setVisited] = useState<boolean | null>(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const linesRef = useRef<LineData[]>([]);
  const animationId = useRef<number | null>(null);

  const LINES_COUNT = 40;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasVisited = sessionStorage.getItem("hasVisited");
    if (hasVisited) {
      setLoading(false);
      return;
    } else {
      setVisited(false);
    }
    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const lines: LineData[] = Array.from({ length: LINES_COUNT }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 4,
    }));

    linesRef.current = lines;

    function animate() {
      if (!container) return;

      const children = container.children;

      linesRef.current.forEach((line, i) => {
        line.x += line.vx;
        line.y += line.vy;

        if (line.x <= 0 || line.x >= width - 4) line.vx *= -1;
        if (line.y <= 0 || line.y >= height - 4) line.vy *= -1;

        line.rotation += line.rotationSpeed;

        const el = children[i] as HTMLDivElement;
        if (el) {
          el.style.transform = `translate(${line.x}px, ${line.y}px) rotate(${line.rotation}deg)`;
        }
      });

      animationId.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  const handleStart = () => {
    sessionStorage.setItem("hasVisited", "true");
    setLoading(false);
  };

  if (!loading) return null;

  return (
    <>
      <style jsx global>{`
        body,
        * {
          cursor: url("svg/gun.svg") 0 0, auto !important;
        }
      `}</style>

      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br bg-black from-black via-gray-900 to-black z-50">
        <div className="relative">
          {visited ? (
            <div className="flex flex-col items-center justify-center gap-2">
              <Image
                src={"/svg/rick-head.svg"}
                width={200}
                height={200}
                alt="image"
                priority={true}
                quality={10}
                className="animate-spin"
              />
              <p className="text-5xl font-black tracking-widest whitespace-nowrap grid grid-cols-2 ">
                <span className="text-cyan-400">Loading</span>
                <span className=" text-emerald-400 animate-typing-delay overflow-hidden  border-r-8 border-emerald-400">
                  .........
                </span>
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
                <Image
                  src={"svg/rick and morthy_fuck_finger.svg"}
                  width={300}
                  height={300}
                  alt="image"
                  className="-mb-8"
                  priority={true}
                  quality={10}
                />
                <button
                  className="text-5xl border-2 rounded-[40px] w-full py-4 flex items-center justify-center pb-6 hover:bg-primary-100 hover:text-black text-white transition-all duration-300"
                  onClick={handleStart}>
                  Get Start
                </button>
              </div>
              <div className="absolute -inset-20 pointer-events-none">
                <div className="absolute inset-0 rounded-full border-4 border-cyan-500/40 animate-ping" />
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/50 animate-spin-slow" />
                <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-spin-fast [animation-direction:reverse]" />
              </div>
            </>
          )}
        </div>
      </div>

      <div
        ref={containerRef}
        className="fixed inset-0 z-50 pointer-events-none">
        {Array.from({ length: LINES_COUNT }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full shadow-md opacity-35"
          />
        ))}
      </div>
    </>
  );
}
