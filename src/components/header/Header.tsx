import Image from "next/image";

export default function Header() {
  return (
    <header>
      <Image
        width={457}
        height={51}
        alt="logo"
        src={"/svg/rick-and-morty-logo.svg"}
        className="w-full h-full"
      />
    </header>
  );
}
