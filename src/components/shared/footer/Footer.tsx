import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="px-5 py-2 bg-[#272727d2] w-full h-full flex items-center gap-9  text-neutral-50">
        <Image
          width={250}
          height={90}
          alt="logo"
          src={"/svg/rick-and-morty-logo.svg"}
        />

        <div className="w-[1px] bg-neutral-50 h-full"></div>
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-10">
            <Link className="hover:text-[#87F54E]" href={"/"}>
              Home
            </Link>
            <Link className="hover:text-[#87F54E]" href={"/planets"}>
              Planets
            </Link>
            <Link className="hover:text-[#87F54E]" href={"/characters"}>
              Characters
            </Link>
            <Link className="hover:text-[#87F54E]" href={"/favorites"}>
              Favorites
            </Link>
          </div>
          <div
            className="flex flex-col items-center gap-1
              ">
            <p>Developer GitHub</p>
            <Image
              width={30}
              height={30}
              src={"/svg/git-logo.svg"}
              alt="git svg"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
