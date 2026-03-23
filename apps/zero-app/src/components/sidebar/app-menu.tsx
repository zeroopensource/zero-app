"use client";

import {
  AudioWaveform,
  ChevronsUpDown,
  Command,
  GalleryVerticalEnd,
  LogOut,
  Plus,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { authClient, useAuthDeviceSessions } from "@/components/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const accounts = [
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
];

export function AppMenu() {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const [activeAccount, setActiveAccount] = useState(accounts[0]);
  // const { data: authSession } = useAuthSession();
  // const {
  //   // session,
  //   user,
  // } = authSession || {};
  const signOut = async () => {
    await authClient.signOut();
  };
  // const { data, error, useSession } =
  //   authClient.multiSession.listDeviceSessions();
  // const {
  //     data: authSession,
  //     isPending: isPendingSession,
  //     error,
  //     // refetch,
  //   } = useAuthSession();
  // const data = authClient.multiSession.listDeviceSessions();
  const { data, error, isLoading } = useAuthDeviceSessions();

  console.log("data", data);

  if (!activeAccount) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeAccount.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeAccount.name}
                </span>
                <span className="truncate text-xs">{activeAccount.plan}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Accounts
            </DropdownMenuLabel>
            {accounts.map((account) => (
              <DropdownMenuItem
                className="gap-2 p-2"
                key={account.name}
                onClick={() => setActiveAccount(account)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <account.logo className="size-3.5 shrink-0" />
                </div>
                {account.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => router.push("/auth/signin")}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium">Add Account</div>
            </DropdownMenuItem>
            <DropdownMenuItem className="gap-2 p-2" onClick={() => signOut()}>
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <LogOut className="size-4" />
              </div>
              <div className="font-medium">Sign out Accounts</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
