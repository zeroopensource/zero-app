"use client";

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LifeBuoy,
  Map as LucideMap,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { usePathname } from "next/navigation";
import type * as React from "react";
import { useEffect } from "react";
import { TeamSwitcher } from "@/components/team-switcher";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { PLATFORMS, usePlatform } from "@/hooks/use-platform";
import { PACKAGEJSON } from "@/lib/packagejson";
import { NavMain } from "./nav-main";
import { NavMisc } from "./nav-misc";
import { NavUser } from "./nav-user";

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: LucideMap,
    },
  ],
};

/*
version
home
search
auth
settings
contact
about zero
support
*/

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { setOpenMobile } = useSidebar();
  const pathname = usePathname();
  const platform = usePlatform();
  // biome-ignore lint/correctness/useExhaustiveDependencies: Intentional
  useEffect(() => {
    setOpenMobile(false);
  }, [pathname, setOpenMobile]);

  const versionCode = `${PACKAGEJSON.displayName} v${PACKAGEJSON.version}+${PLATFORMS[platform].versionSuffix}`;

  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
          <NavMisc />
          {/* <NavSecondary className="mt-auto" items={data.navSecondary} /> */}
          {/* <NavPlatform label={versionCode} /> */}
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
