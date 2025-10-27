"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeaderLinks } from "./Data";
export default function Header() {
  const pathname = usePathname();
  return pathname === "/" ? (
    <header className="px-10 py-5">
      <Image
        width={457}
        height={51}
        alt="logo"
        src={"/svg/rick-and-morty-logo.svg"}
        className="w-full h-full"
      />
    </header>
  ) : (
    <header>
      <div className="flex items-center justify-between px-10 py-5 h-full">
        <Image
          alt=""
          src={"/svg/rick-and-morty-green-logo.svg"}
          width={460}
          height={100}
          className="h-full w-auto"
        />
        <div className="flex justify-end gap-10 text-lg  text-[#87F54E] w-full">
          {HeaderLinks.map((link, index) => (
            <Link key={index} href={link.href}>
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
