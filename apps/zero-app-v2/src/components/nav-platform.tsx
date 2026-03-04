"use client";

import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";

export function NavPlatform({ label }: { label: string }) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
    </SidebarGroup>
  );
}
