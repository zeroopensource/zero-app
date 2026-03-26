"use client";

import type { UrlObject } from "node:url";
import {
  Book,
  BookUser,
  ChevronRight,
  House,
  type LucideIcon,
  MessageCircle,
  Plus,
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

const items: {
  title: string;
  url: UrlObject | Route<string>;
  icon?: LucideIcon;
  isActive?: boolean;
  disabled?: boolean;
  items?: {
    icon?: LucideIcon;
    target?: string;
    title: string;
    url: UrlObject | Route<string>;
    disabled?: boolean;
  }[];
}[] = [
  {
    title: "Chat",
    url: "/app",
    disabled: true,
    icon: MessageCircle,
  },
  {
    title: "Index",
    url: "#",
    icon: Book,
    isActive: true,
    items: [
      {
        title: "Add Record",
        url: "/app/add-record",
        icon: Plus,
      },
      {
        title: "Browse",
        url: "/app/browse",
        icon: House,
      },
      {
        title: "My Index",
        url: "/app/browse",
        icon: BookUser,
      },
    ],
  },
];

export function NavMain() {
  return (
    <SidebarGroup className="px-0">
      <SidebarGroupLabel>Main</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.items) {
            return (
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
                              <Link href={subItem.url} target={subItem.target}>
                                {subItem.icon && <subItem.icon />}
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
            );
          }
          return (
            <SidebarMenuButton
              disabled={item.disabled}
              onClick={() => toast("Open Chat")}
              tooltip={item.title}
            >
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
