"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  Cross2Icon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DateRangePicker } from "@/components/date-range-picker";

import { Button } from "@/components/ui/button";
import { StatusFilter } from "./filters/pandora/status";

const statusIcons = {
  pending: <QuestionMarkCircledIcon className="h-4 w-4" />,
  hold: <StopwatchIcon className="h-4 w-4" />,
  completed: <CheckCircledIcon className="h-4 w-4" />,
};

interface DataTableProps<TData> {
  collectionSchema: any[];
  data: TData[];
  totalTransactions: number;
  limit: number;
  page: number;
  startDate: string | null;
  endDate: string | null;
  selectedStatuses: string[];
  onPageChange: (page: number) => void;
  searchQuery: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleLimitChange: (page: number) => void;
  handleDateRangeChange: (start: string | null, end: string | null) => void;
  setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>;
  statusOptions: any[];
}

export function DataTable<TData>({
  collectionSchema,
  data,
  totalTransactions,
  limit,
  page,
  startDate,
  endDate,
  selectedStatuses,
  onPageChange,
  searchQuery,
  handleSearchChange,
  handleLimitChange,
  handleDateRangeChange,
  setSelectedStatuses,
  statusOptions,
}: DataTableProps<TData>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const onLimitChange = (newLimit: number) => {
    onPageChange(1);
  };

  const dynamicColumns: ColumnDef<TData>[] = Array.isArray(collectionSchema)
    ? collectionSchema.map((field: any) => ({
        accessorKey: field.name || "", // Ensure it's valid
        header: ({ column }) => (
          <DataTableColumnHeader
            column={column}
            title={field.label || field.name}
          />
        ),
        cell: ({ row }) => {
          const cellValue = row.getValue(field.name);

          // Handle null, undefined, or empty objects
          if (
            cellValue == null ||
            (typeof cellValue === "object" &&
              Object.keys(cellValue).length === 0)
          ) {
            return <span className="text-xs">N/A</span>;
          }

          // If it's an object, try to render specific properties or stringify it
          if (typeof cellValue === "object") {
            return <span className="text-xs">{JSON.stringify(cellValue)}</span>;
          }

          // Ensure cellValue is a valid ReactNode (string, number, JSX, etc.)
          return <span className="text-xs">{String(cellValue)}</span>;
        },
      }))
    : []; // Fallback to an empty array if collectionSchema is invalid or not an array

  const table = useReactTable({
    data,
    columns: dynamicColumns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: { pageSize: limit, pageIndex: page - 1 }, // Ensure page index starts from 0
    },
    manualPagination: true, // To use pagination externally
    pageCount: Math.ceil(totalTransactions / limit), // This ensures the page count is updated
  });

  return (
    <div className="space-y-2 grid auto-rows-min gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
      {/* <DataTableToolbar
        table={table}
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        handleDateRangeChange={handleDateRangeChange}
        startDate={startDate}
        endDate={endDate}
      /> */}
      {/* FILTER  */}
      <div className="flex items-center gap-4">
        <DateRangePicker
          handleDateRangeChange={handleDateRangeChange}
          startDate={startDate}
          endDate={endDate}
        />

        <StatusFilter
          label="Locker Location"
          statusOptions={statusOptions}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
        />

        <StatusFilter
          label="Services"
          statusOptions={statusOptions}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
        />

        <StatusFilter
          label="Status"
          statusOptions={statusOptions}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
        />

        <StatusFilter
          label="Booking Origin"
          statusOptions={statusOptions}
          selectedStatuses={selectedStatuses}
          setSelectedStatuses={setSelectedStatuses}
        />

        {(startDate || endDate || selectedStatuses.length > 0) && (
          <Button
            variant="destructive"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b transition-colors hover:bg-muted/5"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="h-11 px-6 text-xs font-medium text-muted-foreground/80"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-6 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={dynamicColumns.length}
                  className="h-32 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-lg font-medium text-muted-foreground/60">
                      No results found
                    </p>
                    <p className="text-sm text-muted-foreground/50">
                      Try adjusting your search or filters
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        totalTransactions={totalTransactions}
        limit={limit}
        page={page}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
        handleLimitChange={handleLimitChange}
      />
    </div>
  );
}
