"use client";

/**
 * Theme Provider Component
 * Provides dark/light theme context using next-themes
 */

import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}

// Re-export useTheme for convenience
export { useTheme };
