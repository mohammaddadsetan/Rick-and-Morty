"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Background() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <div className="fixed h-screen w-screen -z-10 pointer-events-none">
      <Image
        src="/svg/light-bg.webp"
        alt="background light"
        fill
        priority={true}
        className={`object-cover absolute inset-0  ${
          isDark ? "invert" : "invert-0"
        }`}
      />
    </div>
  );
}
