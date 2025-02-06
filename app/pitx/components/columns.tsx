"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { CalendarCell } from "./calendar-cell";

export interface Transaction {
  _id: string;
  doorNumber: string[];
  transNumber: string;
  locData: string;
  locName: string;
  mpin: string;
  mobileNumber: string;
  initialPrice: number;
  transStatus: "Completed" | "Pending" | "Failed";
  dateCreated: string;
  dateCompleted?: string;
  totalPrice: number;
  __v: number;
}

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "index",
    header: "#",
    cell: (info: any) => info.row.index + 1,
  },
  {
    accessorKey: "dateCreated",
    header: "Date Created",
    cell: (info) => (
      <div className="p-2">
        <CalendarCell date={new Date(info.getValue() as string)} />
      </div>
    ),
  },

  {
    accessorKey: "transNumber",
    header: "Transaction Number",
    cell: (info) => info.getValue() as string,
  },

  // {
  //   accessorKey: "locData",
  //   header: "Location Data",
  //   cell: (info) => info.getValue() as string,
  // },
  // {
  //   accessorKey: "locName",
  //   header: "Location Name",
  //   cell: (info) => info.getValue() as string,
  // },
  {
    accessorKey: "doorNumber",
    header: "Door Number",
    cell: (info) => {
      const doors = info.getValue() as string[];
      return doors.join(", ");
    },
  },

  {
    accessorKey: "mpin",
    header: "MPIN",
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: "mobileNumber",
    header: "Mobile Number",
    cell: (info) => info.getValue() as string,
  },
  {
    accessorKey: "initialPrice",
    header: "Initial Price",
    cell: (info) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(info.getValue() as number),
  },
  {
    accessorKey: "transStatus",
    header: "Transaction Status",
    cell: (info) => info.getValue() as string,
  },

  {
    accessorKey: "totalPrice",
    header: "Total Price",
    cell: (info) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "PHP",
      }).format(info.getValue() as number),
  },
  {
    accessorKey: "dateCompleted",
    header: "Date Completed",
    cell: (info) =>
      info.getValue() ? (
        <div className="p-2">
          <CalendarCell date={new Date(info.getValue() as string)} />
        </div>
      ) : (
        "N/A"
      ),
  },
];
