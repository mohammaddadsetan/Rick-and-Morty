import type { Metadata } from "next";
import "./globals.css";
import "@/styles/globals.css";
import Header from "@/components/shared/header/Header";
import Footer from "@/components/shared/footer/Footer";
import FavoriteProvider from "@/context/FavoriteContext";
import MainLoading from "@/components/layouts/loading/MainLoading";
import CharacterDataWrapper from "@/context/CharacterContext/CharacterDataWrapper";
import { ThemeProviderr } from "@/context/themeProvider/ThemeProvider";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Background from "@/components/shared/background/Background";

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
    <html lang="en" suppressHydrationWarning>
      <body className="relative h-screen overflow-x-hidden flex flex-col justify-between bg-black">
        <ThemeProviderr>
          <ThemeToggle />
          <MainLoading />
          <Background />

          <FavoriteProvider>
            <Header />
            <CharacterDataWrapper>
              <main className="flex items-center justify-center ">
                {children}
              </main>
            </CharacterDataWrapper>
            <Footer />
          </FavoriteProvider>
        </ThemeProviderr>
      </body>
    </html>
  );
}
