"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "../index.css";
import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { useAuthSession } from "@/components/auth-client";
import Providers from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  const pathname = usePathname();
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

  useEffect(() => {
    const toasterId = "LOADING_SESSION_TOAST_ID";
    if (isPendingSession) {
      toast.loading("Loading Session.", { dismissible: false, id: toasterId });
    } else {
      toast.dismiss(toasterId);
      if (error) {
        toast.error(error.message);
      }
      if (!(session || pathname.startsWith("/auth"))) {
        router.push("/auth/signin");
      } else if (session && !pathname.startsWith("/app")) {
        router.push("/app");
      }
    }
  }, [isPendingSession, pathname, router, session, error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="[--header-height:calc(--spacing(10))]">
            <SidebarProvider
              className="flex flex-col"
              open={session ? undefined : false}
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
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
