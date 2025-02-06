"use client";

import {
  DatabaseZapIcon,
  GalleryVerticalEnd,
  PieChartIcon,
} from "lucide-react";
import * as React from "react";

import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "lucima admin",
    email: "lucima@qube.com",
    avatar: "@/app/assets/img/logo.png",
  },
  teams: [],

  projects: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: PieChartIcon,
    },
    {
      name: "Lucima Transaction",
      url: "/lucima",
      icon: DatabaseZapIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        {/* <NavMain items={data.navMain} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
