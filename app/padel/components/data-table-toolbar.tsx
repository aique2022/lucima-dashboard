"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DateRangePicker } from "@/components/date-range-picker";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchQuery: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateRangeChange: (start: string | null, end: string | null) => void;
  startDate: string | null;
  endDate: string | null;
}

export function DataTableToolbar<TData>({
  table,
  searchQuery,
  startDate,
  endDate,
  handleSearchChange,
  handleDateRangeChange,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* Search Input */}
        <Input
          placeholder="Filter Transaction Number..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        <div className="flex items-center gap-4">
          <DateRangePicker
            handleDateRangeChange={handleDateRangeChange}
            startDate={startDate}
            endDate={endDate}
          />
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
