import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and Morty API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[150px_1fr_100px]  antialiased h-screen  bg-no-repeat  bg-cover bg-center`}
        style={{
          backgroundImage:
            "url('/svg/fondo-hiperespacial-3d-efecto-tunel-urdimbre 1.svg')",
          backgroundPosition: "center20%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}>
        <header>
          <Image
            width={457}
            height={51}
            alt="logo"
            src={"/svg/rick-and-morty-logo.svg"}
            className="w-full h-full"
          />
        </header>
        {children}
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
                <button>Home</button>
                <button>Favorites</button>
                <button>Contact</button>
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
      </body>
    </html>
  );
}
