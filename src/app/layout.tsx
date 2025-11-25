import type { Metadata } from "next";
import "./globals.css";
import "@/styles/globals.css";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import FavoriteProvider from "@/context/FavoriteContext";
import Image from "next/image";
import MainLoading from "@/components/layouts/loading/MainLoading";
import CharacterDataWrapper from "@/context/CharacterContext/CharacterDataWrapper";

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
      <body className="relative h-screen overflow-x-hidden grid grid-rows-[150px_1fr_100px] bg-black">
        <MainLoading />
        <div className="fixed inset-0 -z-100">
          <Image
            src="/svg/fondo-hiperespacial-3d-efecto-tunel-urdimbre 1.svg"
            alt="background"
            className="w-full h-full object-cover"
            fill
            priority={true}
          />
        </div>

        <FavoriteProvider>
          <Header />
          <CharacterDataWrapper>
            <main className="flex items-center justify-center">{children}</main>
          </CharacterDataWrapper>
          <Footer />
        </FavoriteProvider>
      </body>
    </html>
  );
}
