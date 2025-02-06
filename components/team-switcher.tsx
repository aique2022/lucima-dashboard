"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

import Link from "next/link";
import Logo from "../app/assets/img/logo.png";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan: string;
  }[];
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Link href="/dashboard">
                <div className="flex items-center justify-center">
                  <Image
                    src={Logo}
                    alt="logo"
                    height={40}
                    width={41}
                    className="me-1"
                  />
                  <span className="truncate font-semibold">
                    <p className="font-bold text-xl">
                      <span className=" text-slate-600 text-2xl">
                        Dashboard
                      </span>
                    </p>
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
