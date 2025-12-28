"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
interface ImageProps {
  src: string;
  className?: string;
  width: number;
  height: number;
  alt: string;
}

export default function ImageInverter({
  src,
  className,
  width,
  height,
  alt,
}: ImageProps) {
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
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isDark ? "" : "invert"}`}
    />
  );
}
