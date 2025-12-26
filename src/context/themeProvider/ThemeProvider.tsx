"use client";

import { ThemeProvider } from "next-themes";

export function ThemeProviderr({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
