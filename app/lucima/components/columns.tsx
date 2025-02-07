"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "../data/type";

import { MilestoneModal } from "./modal";

import { StatusBadge } from "./status-badge";

const formatDate = (value: unknown): string => {
  if (value && (typeof value === "string" || typeof value === "number")) {
    const date = new Date(value);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
  return "N/A";
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "transactionHistory",
    header: "Milestone",
    cell: (info) => {
      const history = info.getValue() as {
        transactionId: string;
        status: string;
        createdAt: string;
      }[];

      return history.length ? (
        <MilestoneModal
          milestoneData={history.map((item) => ({
            transactionId: item.transactionId,
            status: item.status,
            createdAt: item.createdAt,
          }))}
        />
      ) : (
        "N/A"
      );
    },
  },
  {
    accessorKey: "_id",
    header: "ID",
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: (info) => formatDate(info.getValue()),
  },
  {
    accessorKey: "id",
    header: "Transaction Number",
  },
  {
    accessorKey: "mobileNumber",
    header: "Sender Mobile Number",
  },
  {
    accessorKey: "receiverMobileNumber",
    header: "Receiver Mobile Number",
  },
  {
    accessorKey: "doors",
    header: "Door details",
    cell: (info) => {
      const doors = info.getValue() as { number: number; size: string }[];
      return doors.length
        ? doors.map((door) => `Door ${door.number}, ${door.size}`).join(", ")
        : "N/A";
    },
  },
  {
    accessorKey: "status",
    header: "Transaction Status",
    cell: (info) => {
      const value = info.getValue() as any;
      return <StatusBadge status={value} />;
    },
  },
  {
    accessorKey: "pricing",
    header: "Order Pricing",
    cell: () => (
      <span className="bg-primary text-white px-4 py-1 text-sm rounded-full dark:text-black">
        Free
      </span>
    ),
  },

  {
    accessorKey: "qpin",
    header: "QPIN",
  },
];
