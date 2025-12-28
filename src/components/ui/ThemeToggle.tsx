"use client";

import { ChevronRightIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div
      className={` sm:px-2 p-1 py-2 rounded-lg text-2xl flex items-center justify-center fixed  bg-neutral-800 border-2 border-(var--neutral)  bottom-15 z-50 ${
        isOpen ? "left-1" : " -left-13"
      } sm:gap-2 gap-1 transition-all duration-300 cursor-pointer`}>
      <button
        aria-label="Toggle theme"
        className="p-1 cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
      <ChevronRightIcon
        onClick={() => setIsOpen(!isOpen)}
        className={` transition-all duration-200 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    </div>
  );
}
