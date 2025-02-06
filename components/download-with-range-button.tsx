"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon, Download } from "lucide-react";
import { DateRange } from "react-day-picker";
import * as XLSX from "xlsx";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DownloadWithDateRange() {
  // Initialize with today's date and 7 days from today
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleDownload = async () => {
    if (date?.from && date?.to) {
      setIsLoading(true);
      const fromDate = format(date.from, "yyyy-MM-dd");
      const toDate = format(date.to, "yyyy-MM-dd");

      try {
        const response = await fetch(
          `http://localhost:8000/api/v1/payments/download?from=${fromDate}&to=${toDate}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const data = await response.json();
        const worksheet = XLSX.utils.json_to_sheet(data.transactions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
        XLSX.writeFile(workbook, `transactions_${fromDate}_to_${toDate}.xlsx`);
      } catch (error) {
        console.error("Error downloading data:", error);
        alert("Failed to download data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      alert("Please select a valid date range.");
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, yyyy")} -{" "}
                  {format(date.to, "LLL dd, yyyy")}
                </>
              ) : (
                format(date.from, "LLL dd, yyyy")
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
      <Button onClick={handleDownload} disabled={isLoading}>
        <Download className="mr-2 h-4 w-4" />
        {isLoading ? "Downloading..." : "Download"}
      </Button>
    </div>
  );
}
