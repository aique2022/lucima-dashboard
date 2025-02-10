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
import { TransactionStatusFilter } from "./components/filters/pandora/transactionStatus";

export default function PandoraPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const [status, setStatus] = useState<string>("");

  const [search, setSearch] = useState<string>("");

  const debounced = useDebounce(search, 500);

  const transactionStatusOptions = [
    // { label: "for-confirmation ", value: "for-confirmation" },
    // { label: "for-pickup", value: "for-pickup" },
    // { label: "in-logistics", value: "in-logistics" },
    // { label: "rider-dropped", value: "rider-dropped" },
    // { label: "processing", value: "processing" },
    // { label: "processed", value: "processed" },
    // { label: "rider-pickup", value: "rider-pickup" },
    // { label: "merchant-pickup", value: "merchant-pickup" },
    // { label: "out-for-delivery", value: "out-for-delivery" },
    { label: "Dropped", value: "dropped" },
    { label: "Completed", value: "completed" },
  ];

  const dateRangeQuery =
    startDate && endDate
      ? `&startDate=${startDate}&endDate=${new Date(
          new Date(endDate).getTime() + 86400000
        ).toISOString()}`
      : "";

  const {
    data,
    error,
    isLoading,
    refetch: refetchTransactions,
  } = useFetchData<any>(
    `/transactions/assignee/lucima?page=${page}&limit=${pageSize}${dateRangeQuery}&status=${status}&search=${debounced}`
  );

  const transactionsData = data?.data || [];
  const totalTransactions = data?.total || 0;
  const numOfPages = Math.ceil(totalTransactions / (data?.data?.limit || 1));

  const {
    data: dataExport,
    error: errorExport,
    isLoading: isLoadingExport,
    refetch: refetchExport, // Separate refetch for export
  } = useFetchData<any>(
    `/transactions/assignee/lucima?${dateRangeQuery}&status=${status}&search=${debounced}`,
    "",
    false
  );

  // const exportData = dataExport?.data || [];
  // const totalExportData = dataExport?.total || 0;

  const handleDownload = async () => {
    const { data: exportFetchedData } = await refetchExport();

    if (!exportFetchedData?.data?.length) {
      console.warn("No data available for export.");
      return;
    }

    const filteredData = exportFetchedData.data.map((row: any) => {
      const { _id, lockerName, rate, ...rest } = row;
      return rest;
    });

    // Convert data to CSV
    const headers = Object.keys(filteredData[0]).join(",") + "\n";

    const csvContent =
      headers +
      filteredData
        .map((row: any) =>
          Object.values(row)
            .map((value, index) => {
              const key = Object.keys(row)[index];

              // Format `doors` as "5, medium"
              if (key === "doors" && Array.isArray(value)) {
                return `"${value
                  .map((door) => `${door.number}, ${door.size}`)
                  .join("; ")}"`;
              }

              // Replace `+63` with `0` in mobile numbers
              if (key === "mobileNumber" || key === "receiverMobileNumber") {
                return `"${String(value).replace(/^\+63/, "0")}"`;
              }

              // Stringify other objects, keep normal values as is
              return typeof value === "object" && value !== null
                ? `"${JSON.stringify(value)}"`
                : `"${value}"`;
            })
            .join(",")
        )
        .join("\n");

    // Create Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `export-${new Date().toISOString()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSelectTransStatus = (status: string, isChecked: boolean) => {
    if (isChecked) {
      setStatus(status);
      setPage(1);
    } else {
      setStatus("");
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

    setStatus("");

    setSearch("");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-col gap-4 min-h-full p-4 sm:p-6 lg:p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">List of Transaction</h2>
          </div>

          {error && <div className="text-red-500">{error.message}</div>}

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-start gap-2 w-full md:w-auto">
              <div className=" w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground flex " />
                <Input
                  type="text"
                  placeholder="Search Transaction No#"
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
                transactionStatusOptions={transactionStatusOptions}
                handleSelectTransStatus={handleSelectTransStatus}
                status={status}
              />

              {(search || status?.length > 0 || startDate || endDate) && (
                <Button
                  variant="ghost"
                  className="h-8 px-2 lg:px-3 mt-4 md:mt-0"
                  onClick={resetFilters}
                >
                  Reset
                  <Cross2Icon className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>

            <Button onClick={handleDownload} disabled={isLoadingExport}>
              {isLoadingExport ? "Downloading..." : "Download"}
            </Button>
          </div>

          {isLoading ? (
            <TableSkeleton />
          ) : (
            <DataTable
              columns={columns(page, pageSize)}
              data={transactionsData ?? []}
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
