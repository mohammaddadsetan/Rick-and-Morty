import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#262626]">
      <Image
        alt="loading..."
        src={"/svg/Loading component.svg"}
        width={300}
        height={300}
        className="animate-pulse"
      />
    </div>
  );
}
