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
import { BookingOriginFilter } from "./components/filters/pandora/booking-origin";
import { LocationFilter } from "./components/filters/pandora/location";
import { ServiceFilter } from "./components/filters/pandora/service";
import { TransactionStatusFilter } from "./components/filters/pandora/transactionStatus";

export default function PandoraPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [moduleData, setModuleData] = useState<string[]>([]);
  const [locData, setLocData] = useState<string[]>([]);
  const [transStatus, setTransStatus] = useState<string[]>([]);
  const [booking_Origin, setBooking_Origin] = useState<string[]>([]);
  const [transNumber, setTransNumber] = useState<string>("");

  const debouncedTransNumber = useDebounce(transNumber, 500);

  const serviceOptions = [
    { label: "Wash", value: "0001" },
    { label: "Drop", value: "0002" },
    { label: "Keep", value: "0003" },
    { label: "Food", value: "0004" },
  ];

  const locationOptions = [
    { label: "Main Office", value: "1000" },
    { label: "Amaia Steps Sucat", value: "1001" },
    { label: "One Eastwood Avenue Tower 1", value: "1002" },
    { label: "One Eastwood Avenue Tower 2", value: "1003" },
    { label: "Paseo Heights", value: "1004" },
    { label: "Uptown Ritz", value: "1005" },
    { label: "The Trion Towers", value: "1006" },
    { label: "Greenbelt Hamilton", value: "1007" },
    { label: "SMDC Light Residences", value: "1008" },
    { label: "Serendra", value: "1009" },
    { label: "SMDC Shore Residences", value: "1010" },
    { label: "The Florence", value: "1011" },
    { label: "The Pearl Place", value: "1012" },
    { label: "101 Newport Boulevard", value: "1013" },
    { label: "The Sapphire Bloc", value: "1014" },
    { label: "Axis Residences", value: "1015" },
    { label: "Eastwood LeGrand 3", value: "1016" },
    { label: "Eastwood Excelsior - Lobby", value: "1017" },
    { label: "Salcedo Skysuites", value: "1018" },
    { label: "Viceroy Tower 3 & 4", value: "1019" },
    { label: "Greenbelt Madison", value: "1020" },
    { label: "Torre De Manila", value: "1021" },
    { label: "La Verti", value: "1022" },
    { label: "Viceroy Tower 1 & 2", value: "1023" },
    { label: "81 Newport Boulevard", value: "1024" },
    { label: "Stamford Executive Residences", value: "1025" },
    { label: "Morgan Suites Residences", value: "1026" },
    { label: "Cyberscape Alpha", value: "1027" },
    { label: "Exxa and Zeta Towers", value: "1028" },
    { label: "Venice 1", value: "1029" },
    { label: "Greenbelt Excelsior", value: "1030" },
    { label: "Venice 2", value: "1031" },
    { label: "Eastwood Excelsior - Main Entrance", value: "1032" },
    { label: "Palm Tree Villas 2", value: "1033" },
    { label: "Eastwood Park Residences", value: "1034" },
    { label: "Eastwood Parkview Tower 2", value: "1035" },
    { label: "IBM Plaza", value: "1036" },
    { label: "Cybergate Tower 1", value: "1037" },
    { label: "Robinson Cyber Sigma", value: "1038" },
    { label: "Cybergate Plaza", value: "1039" },
    { label: "Summit Center", value: "1040" },
  ];

  const transactionStatusOptions = [
    { label: "Preparing ", value: "1" },
    { label: "Edit Order", value: "2" },
    { label: "For Return", value: "3" },
    { label: "Pick Up", value: "4" },
    { label: "Completed", value: "5" },
  ];

  const bookingOriginOptions = [
    { label: "Locker", value: "1" },
    { label: "Web", value: "2" },
    { label: "Mobile App", value: "3" },
  ];

  const dateRangeQuery =
    startDate && endDate ? `&startDate=${startDate}&endDate=${endDate}` : "";

  const { data, error, isLoading } = useFetchData<any>(
    `/transactions/pandora?page=${page}&limit=${pageSize}${dateRangeQuery}&moduleData=${moduleData}&locData=${locData}&transStatus=${transStatus}&booking_Origin=${booking_Origin}&transNumber=${debouncedTransNumber}`
  );

  const transactionsData = data?.data?.transactions || [];
  const totalTransactions = data?.data?.totalTransactions || 0;
  const numOfPages = data?.numOfPages;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTransNumber(event.target.value);
  };

  const handleSelectTransStatus = (status: string, isChecked: boolean) => {
    if (isChecked) {
      setTransStatus((prev) => [...prev, status]);
    } else {
      setTransStatus((prev) => prev.filter((s) => s !== status));
    }
  };

  const handleSelectBookingOrigin = (status: string, isChecked: boolean) => {
    if (isChecked) {
      setBooking_Origin((prev) => [...prev, status]);
    } else {
      setBooking_Origin((prev) => prev.filter((s) => s !== status));
    }
  };

  const handleSelectService = (status: string, isChecked: boolean) => {
    if (isChecked) {
      setModuleData((prev) => [...prev, status]);
    } else {
      setModuleData((prev) => prev.filter((s) => s !== status));
    }
  };

  const handleSelectLocation = (status: string, isChecked: boolean) => {
    if (isChecked) {
      setLocData((prev) => [...prev, status]);
    } else {
      setLocData((prev) => prev.filter((s) => s !== status));
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
    setModuleData([]);
    setLocData([]);
    setTransStatus([]);
    setBooking_Origin([]);
    setTransNumber("");
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        <main className="flex flex-col gap-4 min-h-full p-4 sm:p-6 lg:p-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold"> Pandora</h2>
          </div>

          {error && <div className="text-red-500">{error.message}</div>}

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col md:flex-row items-start gap-2 w-full md:w-auto">
              <div className=" w-full">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground flex " />
                <Input
                  type="text"
                  placeholder="Search Transaction No#"
                  value={transNumber}
                  onChange={handleSearchChange}
                  className="w-full"
                />
              </div>
              <DateRangePicker
                handleDateRangeChange={handleDateRangeChange}
                startDate={startDate}
                endDate={endDate}
              />

              <ServiceFilter
                label="Service"
                serviceOptions={serviceOptions}
                setModuleData={setModuleData}
                handleSelectService={handleSelectService}
                moduleData={moduleData}
              />

              <LocationFilter
                label="Location"
                locationOptions={locationOptions}
                handleSelectLocation={handleSelectLocation}
                locData={locData}
              />

              <TransactionStatusFilter
                label="Transaction Status"
                transactionStatusOptions={transactionStatusOptions}
                handleSelectTransStatus={handleSelectTransStatus}
                transStatus={transStatus}
              />

              <BookingOriginFilter
                label="Booking Origin"
                bookingOriginOptions={bookingOriginOptions}
                handleSelectBookingOrigin={handleSelectBookingOrigin}
                booking_Origin={booking_Origin}
              />

              {(transNumber ||
                booking_Origin?.length > 0 ||
                transStatus?.length > 0 ||
                locData?.length > 0 ||
                moduleData?.length > 0 ||
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
