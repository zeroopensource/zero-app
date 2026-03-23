"use client";

import { usePathname } from "next/navigation";
import type * as React from "react";
import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { AppMenu } from "./app-menu";
import { NavMain } from "./nav-main";
import { NavMisc } from "./nav-misc";

/*
search
*/

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
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
        <AppMenu />
        {/* <NavUser /> */}
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          <NavMain />
          {/* <NavProjects projects={data.projects} /> */}
          <NavMisc />
          {/* <NavSecondary className="mt-auto" items={data.navSecondary} /> */}
          {/* <NavPlatform label={versionCode} /> */}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}
