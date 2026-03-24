"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { useEffect } from "react";
import { useAuthSession } from "@/components/auth-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { AppMenu } from "./app-menu";
import { NavMain } from "./nav-main";
import { NavMisc } from "./nav-misc";
import { SearchForm } from "./search-form";

/*
search
*/

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const {
    data: authSession,
    isPending: isPendingAuthSession,
    // error,
    // refetch,
  } = useAuthSession();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Intentional
  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader className="p-0">
        {authSession && <AppMenu />}
        {!authSession && (
          <div className="px-2 pt-2">
            <Link href="/auth/signin">
              <Button className="w-full" disabled={isPendingAuthSession}>
                Sign in
              </Button>
            </Link>
          </div>
        )}

        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          {authSession && <NavMain />}
          {/* <NavProjects projects={data.projects} /> */}
          <NavMisc />
          {/* <NavSecondary className="mt-auto" items={data.navSecondary} /> */}
          {/* <NavPlatform label={versionCode} /> */}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
