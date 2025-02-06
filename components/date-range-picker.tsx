"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateRangePickerProps {
  handleDateRangeChange: (start: string | null, end: string | null) => void;
  startDate: string | null;
  endDate: string | null;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  handleDateRangeChange,
  startDate, // Receive startDate from the parent
  endDate, // Receive endDate from the parent
}) => {
  // Update the date and notify the parent when a range is selected
  const handleDateChange = (selectedDate: DateRange | undefined) => {
    // Extract start and end dates from the selected range
    const startDate = selectedDate?.from
      ? format(selectedDate.from, "yyyy-MM-dd")
      : null;
    const endDate = selectedDate?.to
      ? format(selectedDate.to, "yyyy-MM-dd")
      : null;

    // Pass the start and end dates to the parent function (which updates state and the URL)
    handleDateRangeChange(startDate, endDate);
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
              !startDate && !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {startDate ? (
              endDate ? (
                <>
                  {format(new Date(startDate), "LLL dd, yyyy")} -{" "}
                  {format(new Date(endDate), "LLL dd, yyyy")}
                </>
              ) : (
                format(new Date(startDate), "LLL dd, yyyy")
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
            selected={{
              from: startDate ? new Date(startDate) : undefined,
              to: endDate ? new Date(endDate) : undefined,
            }}
            onSelect={handleDateChange} // Update state and notify parent when a date range is selected
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
