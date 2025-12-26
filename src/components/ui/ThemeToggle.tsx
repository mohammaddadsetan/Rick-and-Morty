"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className=" px-3 py-2 rounded-lg text-2xl absolute bg-neutral-800  top-1/3 z-50 -left-10 hover:left-1 transition-all duration-300 cursor-pointer">
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
