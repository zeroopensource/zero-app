"use client";

import { ChevronsUpDown, LogOut, Plus, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  useAuthDeviceSessions,
  useAuthRevokeSession,
  useAuthSession,
  useAuthSetActiveSession,
  useAuthSignOut,
} from "@/components/auth-client";
import { Button } from "@/components/ui/button";
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
import { cn } from "@/lib/utils";

export function AppMenu() {
  const toasterId = "LOADING_SIGNOUT_TOAST_ID";
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { mutate: mutateSignOut } = useAuthSignOut();
  const { data: activeSession } = useAuthSession();
  const { mutate: mutateSetActiveSession } = useAuthSetActiveSession();
  const { mutate: mutateRevokeSession } = useAuthRevokeSession();

  const revokeSession = (session: any) => {
    toast.loading("Signing Out", {
      dismissible: false,
      id: toasterId,
    });
    mutateRevokeSession(
      { sessionToken: session.session.token },
      {
        onSuccess: () => {
          toast.dismiss(toasterId);
        },
        onError: () => {
          toast.dismiss(toasterId);
        },
      }
    );
  };

  const setActiveSession = (session: any) => {
    toast.loading("Switching Account", {
      dismissible: false,
      id: toasterId,
    });
    mutateSetActiveSession(
      { sessionToken: session.session.token },
      {
        onSuccess: () => {
          toast.dismiss(toasterId);
        },
        onError: () => {
          toast.dismiss(toasterId);
        },
      }
    );
  };

  const signOut = () => {
    toast.loading("Signing Out", {
      dismissible: false,
      id: toasterId,
    });
    mutateSignOut(undefined, {
      onSuccess: () => {
        toast.dismiss(toasterId);
      },
      onError: () => {
        toast.dismiss(toasterId);
      },
    });
  };
  const { data: sessions } = useAuthDeviceSessions();

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
                {/* <activeAccount.logo className="size-4" /> */}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {activeSession?.user.email}
                </span>
                <span className="truncate text-xs">{"Free"}</span>
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
            {sessions?.map((session) => {
              const isSessionActive =
                session.session.token === activeSession?.session.token;
              return (
                <DropdownMenuItem
                  className={cn(
                    "flex flex-col items-start gap-2 bg-transparent p-2 focus:bg-transparent",
                    isSessionActive && "!bg-accent"
                  )}
                  key={session.user.email}
                  // onClick={() => {
                  //   //setActiveAccount(session.session?.token || "")
                  // }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex size-6 items-center justify-center rounded-md border">
                      <User className="size-3.5 shrink-0" />
                    </div>
                    <div className="flex flex-col text-xs">
                      {session.user.email}
                      <div className="*:!text-zinc-300 flex gap-1 *:px-0">
                        <Button
                          disabled={isSessionActive}
                          onClick={() => setActiveSession({ session })}
                          variant="link"
                        >
                          Switch Account
                        </Button>
                        <Button
                          disabled={isSessionActive}
                          onClick={() => revokeSession({ session })}
                          variant="link"
                        >
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })}
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
