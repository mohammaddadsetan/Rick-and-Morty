"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function NotFound() {
  const router = useRouter();
  return (
    <section className="flex items-center justify-center h-full py-10 font-mono gap-20">
      <div className="flex items-center justify-evenly flex-col h-full ">
        <p className="text-7xl drop-shadow-[0px_0px_5px] drop-shadow-primary-100 font-bold">
          planet not found
        </p>
        <p className="text-4xl max-w-150 font-bold">
          Rick says this URL is wrong. Morty says try another one!
        </p>
        <div className="flex items-center justify-center flex-col w-full">
          <Image
            alt="image"
            src={"/svg/rick and morthy_fuck_finger.svg"}
            width={220}
            height={101}
            className="-mb-6"
          />
          <button
            onClick={() => router.back()}
            className="rounded-[50px] border-4 border-primary-100 text-5xl flex items-center justify-center w-full h-28 max-w-[300px] cursor-pointer hover:bg-primary-100 hover:text-black duration-100 transition-all">
            Go back
          </button>
        </div>
      </div>
      <Image
        width={200}
        height={200}
        alt="image"
        src={"/svg/MORTY TALKING.svg"}
      />
    </section>
  );
}
