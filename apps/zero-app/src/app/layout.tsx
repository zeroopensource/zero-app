"use client";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { useAuthSession } from "@/components/auth-client";
import Providers from "@/components/providers";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// export const metadata: Metadata = {
//   title: PACKAGEJSON.displayName,
//   description: PACKAGEJSON.description,
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const {
    data: authSession,
    isPending: isPendingSession,
    error,
    // refetch,
  } = useAuthSession();
  const {
    session,
    // user
  } = authSession || {};
  const pathname = usePathname();
  const isAuthPathname = pathname.startsWith("/auth");
  // const isSidebarEnabled = !isPendingSession && !!session;

  useEffect(() => {
    const toasterId = "LOADING_SESSION_TOAST_ID";
    if (isPendingSession) {
      toast.loading("Loading Session.", { dismissible: false, id: toasterId });
    } else {
      toast.dismiss(toasterId);
      if (error) {
        toast.error(error.message);
        // router.push("/auth/signin");
      }
      if (!(session || isAuthPathname)) {
        router.push("/auth/signin");
      } else if (session && !pathname.startsWith("/app")) {
        router.push("/app");
      }
    }
  }, [isPendingSession, router, session, error, pathname, isAuthPathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "antialiased",
          fontMono.variable,
          "font-sans",
          inter.variable
        )}
      >
        <Providers>
          <div className="[--header-height:calc(--spacing(10))]">
            <SidebarProvider
              className="flex flex-col"
              // open={isSidebarEnabled ? undefined : false}
              // openMobile={isSidebarEnabled ? undefined : false}
              style={
                {
                  "--sidebar-width": "16rem",
                } as CSSProperties
              }
            >
              <SiteHeader />
              <div className="flex flex-1">
                <AppSidebar />
                <SidebarInset>{!isPendingSession && children}</SidebarInset>
              </div>
            </SidebarProvider>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
