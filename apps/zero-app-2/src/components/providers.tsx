"use client";

import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "./ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      forcedTheme="dark"
      // enableSystem
    >
      <TooltipProvider>
      {children}
      <Toaster richColors />
      </TooltipProvider>
    </ThemeProvider>
  );
}
