"use client";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { usePathname, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuthSession } from "@/components/auth-client";
import Providers from "@/components/providers";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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
    isPending: isPendingAuthSession,
    error,
    // refetch,
  } = useAuthSession();
  const {
    session,
    // user
  } = authSession || {};
  const pathname = usePathname();
  const authedRoutes = ["/app"];
  const isInAuthedRoute = authedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  // const isInAuthRoute = pathname.startsWith("/auth");
  // const isSidebarEnabled = !isPendingAuthSession && !!session;
  const toasterId = "LOADING_SESSION_TOAST_ID";
  const [childrenVisible, setChildrenVisible] = useState(false);

  useEffect(() => {
    if (!session && isInAuthedRoute) {
      router.push("/auth/signin");
    }
    if (isPendingAuthSession) {
      toast.loading("Loading Session.", { dismissible: false, id: toasterId });
    } else {
      toast.dismiss(toasterId);
      setChildrenVisible(true);
      if (error) {
        toast.error(error.message);
      }
    }
  }, [isPendingAuthSession, router, session, error, isInAuthedRoute]);

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
                  "--sidebar-width": "12rem",
                  "--sidebar-width-mobile": "12rem",
                } as CSSProperties
              }
            >
              <SiteHeader />
              <div className="flex flex-1 overflow-auto">
                <AppSidebar />
                <SidebarInset className="min-w-0">
                  {childrenVisible && children}
                </SidebarInset>
              </div>
            </SidebarProvider>
          </div>
        </Providers>
      </body>
    </html>
  );
}
