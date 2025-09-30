import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

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
        className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[150px_1fr_100px] min-h-screen  antialiased bg-no-repeat  bg-cover bg-center`}
        style={{
          backgroundImage:
            "url('/svg/fondo-hiperespacial-3d-efecto-tunel-urdimbre 1.svg')",

          backgroundPosition: "center20%",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
