"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { TooltipProvider } from "./ui/tooltip";

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
