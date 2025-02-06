"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { DataTable } from "./components/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import { Notification } from "@/components/notification";
import { ModeToggle } from "@/components/toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Payment } from "./data/type";
import { TableSkeleton } from "@/components/table-skeleton";
import { DateRangePicker } from "@/components/date-range-picker";
import { start } from "repl";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProjectBanner } from "@/components/project-banner";
import Link from "next/link";
// import { DownloadWithDateRange } from "@/components/download-with-range-button";

export default function TransactionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<any[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [totalItems, setTotalItems] = useState<number>(0);
  const [numOfPages, setNumOfPages] = useState<number>(2);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [collections, setCollections] = useState([]);
  const [collectionSchema, setCollectionSchema] = useState<string[]>([]);

  const statusOptions = [{ value: "Backlog" }, { value: "Todo" }];

  async function fetchCollectionData(
    collectionName: string,
    page: number,
    limit: number,
    searchQuery: string = ""
  ): Promise<{
    data: any[];
    totalItems: number;
    numOfPages: number;
  }> {
    try {
      setLoading(true);

      const searchParam = searchQuery ? `&search=${searchQuery}` : "";

      const response = await fetch(
        `http://localhost:8000/api/v1/payments?collectionName=${collectionName}&page=${page}&limit=${limit}${searchParam}`,
        { cache: "no-store" }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();

      if (
        !responseData.data ||
        !Array.isArray(responseData.data.transactions)
      ) {
        console.error("Unexpected structure of response data:", responseData);
        throw new Error(
          "Expected 'data.transactions' to be an array but got something else."
        );
      }

      const items = responseData.data.transactions;

      setData(items);

      setLoading(false);

      return {
        data: items,
        totalItems: responseData.results || 0,
        numOfPages: Math.ceil(responseData.results / limit),
      };
    } catch (error) {
      console.error("Error fetching collection data:", error);
      setLoading(false);
      throw new Error("Failed to fetch data. Please try again later.");
    }
  }

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch("localhost:8000/api/v1/collections");
        if (!response.ok) {
          throw new Error("Failed to fetch collections");
        }
        const data = await response.json();
        setCollections(data);
      } catch (err) {
        setError(err as any);
      }
    };

    fetchCollections();
  }, []);

  useEffect(() => {
    const fetchCollectionSchema = async () => {
      if (selectedCollection) {
        try {
          const response = await fetch(
            `localhost:8000/api/v1/collections/${selectedCollection}/schema`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch collection schema");
          }
          const schemaData = await response.json();

          // Transform the schema to have 'schemaName' and numerical 'id'
          const transformedSchema = schemaData.map(
            (field: any, index: number) => ({
              id: index + 1,
              name: Object.values(field)
                .filter((key) => key !== "id")
                .join(""),
            })
          );

          setCollectionSchema(transformedSchema);
        } catch (err) {
          setError(err as any);
        }
      }
    };

    fetchCollectionSchema();
  }, [selectedCollection]);

  useEffect(() => {
    const limitFromUrl = searchParams.get("limit");
    const pageFromUrl = searchParams.get("page");
    const collectionFromUrl = searchParams.get("collectionName");

    if (collectionFromUrl) {
      setSelectedCollection(collectionFromUrl);
    }

    if (pageFromUrl) {
      setPage(Number(pageFromUrl));
    }

    if (limitFromUrl) {
      setLimit(Number(limitFromUrl));
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        if (selectedCollection) {
          const { data, totalItems, numOfPages } = await fetchCollectionData(
            selectedCollection,
            page,
            limit
          );

          setData(data);
          setTotalItems(totalItems);
          setNumOfPages(numOfPages);
        }
      } catch (error: any) {
        setError(error.message || "An unknown error occurred.");
      }
    };

    fetchData();
  }, [selectedCollection, page, limit, searchQuery, startDate, endDate]);

  // Helper function to update URL
  const updateURL = () => {
    const queryParams = new URLSearchParams();

    if (selectedCollection)
      queryParams.set("collectionName", selectedCollection);
    if (startDate) queryParams.set("startDate", startDate);
    if (endDate) queryParams.set("endDate", endDate);
    if (page) queryParams.set("page", String(page));
    if (limit) queryParams.set("limit", String(limit));

    router.push(`?${queryParams.toString()}`);
  };

  // Handle collection change
  // const handleCollectionChange = (value: string) => {
  //   setSelectedCollection(value);
  //   setPage(1);
  //   setLimit(10);
  //   setStartDate("");
  //   setEndDate("");
  //   router.push(`transactions?collectionName=${value}`);
  // };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    if (!event.target.value) {
      setPage(1);
    }
    updateURL();
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage > 0) {
      setPage(newPage);
      // updateURL();
    }
  };

  // Handle date range change
  const handleDateRangeChange = (start: string | null, end: string | null) => {
    setStartDate(start);
    setEndDate(end);
    updateURL();
  };

  // Handle limit change
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    // updateURL();
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 border-b bg-green-600 md:bg-background lg:bg-background px-4 shadow-sm transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16">
          <div className="flex flex-1 items-center gap-4">
            <div className="flex items-center justify-center">
              <SidebarTrigger className="-ml-2 bg-white me-2 dark:bg-black" />
              <Link href="/dashboard">
                <span className="text-bold text-white text-xl sm:hidden">
                  Qube Dashboard
                </span>
              </Link>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <ModeToggle />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        <main className="flex flex-col gap-4 min-h-full p-4 sm:p-6 lg:p-8">
          {/* <ProjectBanner
            selectedCollection={selectedCollection}
            collections={collections}
            handleCollectionChange={handleCollectionChange}
            error={error}
            totalCollections={collections.length}
            totalData={data.length}
          /> */}

          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">All Transactions</h2>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          {loading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              data={data}
              limit={limit}
              totalTransactions={totalItems}
              page={page}
              onPageChange={handlePageChange}
              searchQuery={searchQuery}
              startDate={startDate}
              endDate={endDate}
              handleSearchChange={handleSearchChange}
              handleLimitChange={handleLimitChange}
              handleDateRangeChange={handleDateRangeChange}
              collectionSchema={collectionSchema}
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
              statusOptions={statusOptions}
            />
          )}
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
