"use client";

import type { UrlObject } from "node:url";
import {
  BookOpen,
  ChevronRight,
  type LucideIcon,
  Link as LucideLink,
  Settings2,
} from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import { toast } from "sonner";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { PLATFORMS, usePlatform } from "@/hooks/use-platform";
import { PACKAGEJSON } from "@/lib/packagejson";

export const NavMisc = () => {
  const platform = usePlatform();
  const versionCode = `${PACKAGEJSON.displayName} v${PACKAGEJSON.version}+${PLATFORMS[platform].versionSuffix}`;

  const navMisc: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    disabled?: boolean;
    items?: {
      title: string;
      url: UrlObject | Route<string>;
      disabled?: boolean;
    }[];
  }[] = [
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          disabled: true,
          url: "#",
        },
        {
          title: "Usage",
          disabled: true,
          url: "#",
        },
        {
          title: "Billing",
          disabled: true,
          url: "#",
        },
      ],
    },
    {
      title: "Links",
      url: "#",
      icon: LucideLink,
      items: [
        {
          title: "ZeroOpenSource.org",
          url: "https://zeroopensource.org/",
          disabled: true,
        },
        {
          title: "Github",
          url: "https://github.com/zeroopensource",
          disabled: true,
        },
        {
          title: "Discord",
          url: "https://discord.gg/2a5HcmxvgC",
          disabled: true,
        },
        {
          title: "X (Twitter)",
          url: "https://x.com/ZeroOpenSource",
          disabled: true,
        },
        {
          title: "Facebook",
          url: "https://www.facebook.com/ZeroOpenSource",
          disabled: true,
        },
        {
          title: "Github Sponsor",
          url: "https://github.com/sponsors/zeroopensource",
          disabled: true,
        },
        {
          title: "Buy Me A Coffee",
          url: "https://buymeacoffee.com/zeroopensource",
          disabled: true,
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Help",
          url: "#",
          disabled: true,
        },
        {
          title: versionCode,
          url: "#",
          disabled: true,
        },
        {
          title: "About Zero",
          url: "#",
          disabled: true,
        },
        {
          title: "Terms & Conditions",
          url: "/docs/terms-and-conditions",
        },
        {
          title: "Privacy Policy",
          url: "/docs/privacy-policy",
        },
      ],
    },
  ];

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Misc</SidebarGroupLabel>
      <SidebarMenu>
        {navMisc.map((item) => (
          <Collapsible
            asChild
            className="group/collapsible"
            defaultOpen={item.isActive}
            key={item.title}
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => {
                    const disabled = item.disabled || subItem.disabled;
                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild
                          className={disabled ? "brightness-40" : ""}
                          onClick={
                            disabled
                              ? (e) => {
                                  e.preventDefault();
                                  toast("Disabled");
                                }
                              : undefined
                          }
                        >
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
