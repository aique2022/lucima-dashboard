"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";
import { SalesStatisticsCard } from "@/components/sales-statistics-card";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useFetchData } from "@/utils/fetchApi";

const DashboardPage = () => {
  const { data } = useFetchData<any>(`/transactions/assignee/lucima/count`);

  const formattedData = {
    today: data?.data.today || 0,
    total: data?.data.total || 0,
  };

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

            <SalesStatisticsCard data={formattedData} />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage;
