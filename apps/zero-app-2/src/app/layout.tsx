import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import { AppSidebar } from "@/components/app-sidebar";
import Providers from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { PACKAGEJSON } from "@/lib/packagejson";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: PACKAGEJSON.displayName,
  description: PACKAGEJSON.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="[--header-height:calc(--spacing(14))]">
            <SidebarProvider
              // style={
              //   {
              //     "--sidebar-width": "16rem",
              //   } as CSSProperties
              // }
              className="flex flex-col"
            >
              <SiteHeader />
              <div className="flex flex-1">
                <AppSidebar />
                <SidebarInset>
                  {children}
                  {/* 
                  <div className="grid h-svh grid-rows-[auto_1fr]">
                    <Header />
                    {children}
                  </div> 
                  */}
                </SidebarInset>
              </div>
            </SidebarProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
