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
import { LocationFilter } from "./components/filters/location";
import { PayTypeFilter } from "./components/filters/paymentType";

export default function EKPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [lockerLocation, setLockerLocation] = useState<string[]>([]);
  const [payType, setPayType] = useState<string[]>([]);
  const [booking_Origin, setBooking_Origin] = useState<string[]>([]);
  const [refNum, setRefNum] = useState<string>("");

  const debouncedRefNum = useDebounce(refNum, 500);

  const locationOptions = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
    { label: "E", value: "E" },
    { label: "F", value: "F" },
  ];

  const payTypeOptions = [
    { label: "CASH ", value: "CASH" },
    { label: "QRPH", value: "QRPH" },
    { label: "G-CASH", value: "gcash" },
    { label: "NARWHAL", value: "NARWHAL" },
  ];

  const dateRangeQuery =
    startDate && endDate ? `&startDate=${startDate}&endDate=${endDate}` : "";

  const { data, error, isLoading } = useFetchData<any>(
    `/transactions/enchanted-kingdom?page=${page}&limit=${pageSize}${dateRangeQuery}&lockerLocation=${lockerLocation}&payType=${payType}&refNum=${debouncedRefNum}`
  );

  const transactionsData = data?.data?.transactions || [];
  const totalTransactions = data?.data?.totalTransactions || 0;
  const numOfPages = data?.numOfPages;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRefNum(event.target.value);
  };

  const handleSelectPaymentType = (status: string, isChecked: boolean) => {
    if (isChecked) {
      setPayType((prev) => [...prev, status]);
    } else {
      setPayType((prev) => prev.filter((s) => s !== status));
    }
  };

  const handleSelectLocation = (status: string, isChecked: boolean) => {
    if (isChecked) {
      setLockerLocation((prev) => [...prev, status]);
    } else {
      setLockerLocation((prev) => prev.filter((s) => s !== status));
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
    setLockerLocation([]);
    setPayType([]);
    setBooking_Origin([]);
    setRefNum("");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-col gap-4 min-h-full p-4 sm:p-6 lg:p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Enchanted Kingdom</h2>
          </div>

          {error && <div className="text-red-500">{error.message}</div>}

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-start gap-2 w-full md:w-auto">
              <div className=" w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground flex " />
                <Input
                  type="text"
                  placeholder="Search Ref No#"
                  value={refNum}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>
              <DateRangePicker
                handleDateRangeChange={handleDateRangeChange}
                startDate={startDate}
                endDate={endDate}
              />

              <LocationFilter
                label="Location"
                locationOptions={locationOptions}
                handleSelectLocation={handleSelectLocation}
                lockerLocation={lockerLocation}
              />

              <PayTypeFilter
                label="Payment Type"
                payTypeOptions={payTypeOptions}
                handleSelectPaymentType={handleSelectPaymentType}
                payType={payType}
              />

              {(refNum ||
                booking_Origin?.length > 0 ||
                payType?.length > 0 ||
                lockerLocation?.length > 0 ||
                startDate ||
                endDate) && (
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
