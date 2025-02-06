"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { CalendarCell } from "./calendar-cell";

export interface PadelTransaction {
  _id: string;
  refNum: string;
  lockerLocation: string;
  doorNumber: string;
  alias: string;
  qpin: string;
  timeIn: string;
  transStatus: string;
  timeOut: string;
  __v: number;
}

export const columns: ColumnDef<PadelTransaction>[] = [
  {
    accessorKey: "_id",
    header: "#",
    cell: (info: any) => info.row.index + 1,
  },
  {
    accessorKey: "timeIn",
    header: "Time In",
    cell: (info) => (
      <div className="p-2">
        <CalendarCell date={new Date(info.getValue() as string)} />
      </div>
    ),
  },
  {
    accessorKey: "refNum",
    header: "Reference Number",
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: "lockerLocation",
    header: "Locker Location",
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: "doorNumber",
    header: "Door Number",
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: "alias",
    header: "Alias",
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: "qpin",
    header: "QPIN",
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: "timeOut",
    header: "Time Out",
    cell: (info) => {
      const timeOutValue = info.getValue() as string;

      if (!timeOutValue || isNaN(new Date(timeOutValue).getTime())) {
        return null;
      }
      return (
        <div className="p-2">
          <CalendarCell date={new Date(timeOutValue)} />
        </div>
      );
    },
  },

  {
    accessorKey: "transStatus",
    header: "Transaction Status",
    cell: (info) => info.getValue() as string,
  },
];
