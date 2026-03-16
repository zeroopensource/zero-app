"use client";

import { SidebarIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSidebar } from "@/components/ui/sidebar";
import { ZeroLogo } from "@/components/ui/zero-logo";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const pathnameSegments = pathname.split("/").filter(Boolean);
  const [pathname2, setPathname2] = useState("");

  useEffect(() => {
    setPathname2(window.location.pathname);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex w-full items-center border-b bg-background">
      <div className="flex h-(--header-height) w-full items-center">
        <Button
          className="h-10 w-10"
          onClick={toggleSidebar}
          size="icon"
          variant="ghost"
        >
          <SidebarIcon />
        </Button>
        <Separator className="mr-2" orientation="vertical" />
        <Breadcrumb className="hidden sm:block">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">
                <ZeroLogo className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            {pathnameSegments.map((s, id) => (
              <Fragment key={id}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{s}</BreadcrumbPage>
                </BreadcrumbItem>
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <span className="ml-4 text-xs">{pathname}</span>
        <span className="ml-4 text-xs">{pathname2}</span>
        {/* <SearchForm className="w-full sm:ml-auto sm:w-auto" /> */}
      </div>
    </header>
  );
}
