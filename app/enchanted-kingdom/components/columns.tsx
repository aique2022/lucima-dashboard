"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "../data/type";
import { CalendarCell } from "./calendar-cell";

const formatDate = (value: unknown): string => {
  if (value && (typeof value === "string" || typeof value === "number")) {
    return new Date(value).toLocaleString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }
  return "N/A";
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "index",
    header: "#",
    cell: (info: any) => info.row.index + 1,
  },
  {
    accessorKey: "refNum",
    header: "Reference Number",
  },
  {
    accessorKey: "lockerLocation",
    header: "Locker Location",
  },

  {
    accessorKey: "doorNumber",
    header: "Door Number",
  },

  {
    accessorKey: "timeIn",
    header: "Check-in Time",
    cell: (info) => {
      const formattedDate = formatDate(info.getValue());
      return (
        <div className="p-2">
          <CalendarCell date={new Date(formattedDate)} />
        </div>
      );
    },
  },

  {
    accessorKey: "timeOut",
    header: "Check-out Time",
    cell: (info) => {
      const formattedDate = formatDate(info.getValue());
      return (
        <div className="p-2">
          <CalendarCell date={new Date(formattedDate)} />
        </div>
      );
    },
  },

  {
    accessorKey: "payType",
    header: "Payment Type",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: (info) => {
      const value = info.getValue();
      return typeof value === "number"
        ? new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "PHP",
          }).format(value)
        : value;
    },
  },

  {
    accessorKey: "billsCounter",
    header: "Bills Counter",
    cell: (info) => {
      const bills = info.getValue() as { [key: string]: number };
      return (
        <div>
          {Object.entries(bills).map(([denomination, count]) => (
            <div key={denomination}>{`${denomination}: ${count}`}</div>
          ))}
        </div>
      );
    },
  },
];
