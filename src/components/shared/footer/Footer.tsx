import MultiNavButton from "@/components/ui/MultiNavButton";
import Image from "next/image";
import Link from "next/link";
import { HeaderLinks } from "../header/Data";
export default function Footer() {
  return (
    <footer className="px-5 py-2 bg-[#272727d2] w-full  h-fit flex items-center gap-9  text-neutral-50 font-mono  ">
      <Link
        href={"/"}
        className="relative size-20 shrink-0 order-1 max-xsm:hidden">
        <Image fill alt="logo" src={"svg/rickandmorty-logo.svg"} />
      </Link>

      <div className="w-[1px] bg-neutral-50 h-full order-2"></div>
      <MultiNavButton
        data={HeaderLinks}
        activeMode={false}
        linkClassName="hover:text-primary-100 text-sm sm:text-base md:text-lg font-semibold"
        containerClassName="lg:gap-3 md:gap-0 w-full justify-start max-md:grid max-md:grid-cols-2 max-sm:grid-cols-1 gap-y-2 gap-x-15 order-3"
      />
      <Link
        target="blank"
        href={"https://github.com/mohammaddadsetan"}
        className="flex flex-col items-center gap-1 hover:text-primary-100 text-sm cursor-pointer order-4 max-xsm:order-1
          shrink-0">
        <p className="hidden md:block font-semibold">Developer GitHub</p>
        <Image width={40} height={40} src={"/svg/git-logo.svg"} alt="git svg" />
      </Link>
    </footer>
  );
}
