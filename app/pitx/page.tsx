"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { DateRangePicker } from "@/components/date-range-picker";
import Header from "@/components/header";
import { TableSkeleton } from "@/components/table-skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { useDebounce } from "@/hooks/useDebounce";
import { useFetchData } from "@/utils/fetchApi";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Search } from "lucide-react";
import { useState } from "react";
import { columns } from "./components/columns";
import { DataTable } from "./components/data-table";
import { TransactionStatusFilter } from "./components/filters/transStatus";

export default function PitxPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [transStatus, setTransStatus] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const debounced = useDebounce(search, 500);

  const transStatusOptions = [
    { label: "Completed", value: "Completed" },
    { label: "Active", value: "Active" },
  ];

  const dateRangeQuery =
    startDate && endDate ? `&startDate=${startDate}&endDate=${endDate}` : "";

  const { data, error, isLoading } = useFetchData<any>(
    `/transactions/pitx?page=${page}&limit=${pageSize}${dateRangeQuery}&transStatus=${transStatus}&search=${debounced}`
  );

  const transactionsData = data?.data?.transactions || [];
  const totalTransactions = data?.data?.totalTransactions || 0;
  const numOfPages = data?.numOfPages;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSelectTransStatus = (status: string, isChecked: boolean) => {
    if (isChecked) {
      setTransStatus((prev) => [...prev, status]);
    } else {
      setTransStatus((prev) => prev.filter((s) => s !== status));
    }
  };

  const handleDateRangeChange = (start: string | null, end: string | null) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handlePaginationChange = (newPage: number, newPageSize: number) => {
    setPage(newPage);
    setPageSize(newPageSize);
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setTransStatus([]);
    setSearch("");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-col gap-4 min-h-full p-4 sm:p-6 lg:p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">PITX</h2>
          </div>

          {error && <div className="text-red-500">{error.message}</div>}

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-start gap-2 w-full md:w-auto">
              <div className="relative w-full">
                {/* <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground flex" /> */}
                <Input
                  type="text"
                  placeholder="Search Mobile/Transaction No#"
                  value={search}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>
              <DateRangePicker
                handleDateRangeChange={handleDateRangeChange}
                startDate={startDate}
                endDate={endDate}
              />
              <TransactionStatusFilter
                label="Transaction Status"
                transStatusOptions={transStatusOptions}
                handleSelectTransStatus={handleSelectTransStatus}
                transStatus={transStatus}
              />
              {(search || transStatus?.length > 0 || startDate || endDate) && (
                <Button
                  variant="destructive"
                  className="h-8 px-2 lg:px-3 mt-4 md:mt-0"
                  onClick={resetFilters}
                >
                  Reset
                  <Cross2Icon className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              columns={columns}
              data={transactionsData}
              totalItems={totalTransactions}
              numOfPages={numOfPages}
              onPaginationChange={handlePaginationChange}
              currentPage={page}
              pageSize={pageSize}
            />
          )}
        </main>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
