"use client";

import { AppSidebar } from "@/components/app-sidebar";

import { BarCharts } from "@/components/charts/bar-charts";
import { RadialCharts } from "@/components/charts/radial-charts";
import Header from "@/components/header";
import { SalesStatisticsCard } from "@/components/sales-statistics-card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import LocationLeaderboard from "./_components/leaderboard";
import ServiceCard from "./_components/services";
import { useFetchData } from "@/utils/fetchApi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Box, Package } from "lucide-react";

const DashboardPage = () => {
  const { data, error, isLoading } = useFetchData<any>(
    `/transactions/assignee/lucima?&limit=5`
  );

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="min-h-full p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white dark:bg-transparent">
              <CardContent className="p-6 flex items-center justify-between">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">
                    Welcome to Pandora Locker Dashboard
                  </h1>
                  <p className="text-purple-100">
                    Manage your lockers and track deliveries efficiently
                  </p>
                  {/* <div className="flex space-x-2 pt-2">
                    <Badge
                      variant="secondary"
                      className="bg-purple-400 hover:bg-purple-300 text-white"
                    >
                      <Box className="w-4 h-4 mr-1" />
                      Active Lockers: 42
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-indigo-400 hover:bg-indigo-300 text-white"
                    >
                      <Package className="w-4 h-4 mr-1" />
                      Pending Deliveries: 7
                    </Badge>
                  </div> */}
                </div>
                <div className="hidden md:block">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="120"
                    height="120"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-teal-200 opacity-50"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
              </CardContent>
            </Card>

            <SalesStatisticsCard />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage;
