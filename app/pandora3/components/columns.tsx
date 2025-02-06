"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "../data/type";

import { Badge } from "@/components/ui/badge";
import { CalendarCell } from "./calendar-cell";
import { MilestoneModal } from "./modal";

import Drop from "@/app/assets/svg/services/drop.svg";
import Food from "@/app/assets/svg/services/food.svg";
import Keep from "@/app/assets/svg/services/keep.svg";
import Wash from "@/app/assets/svg/services/wash.svg";
import Image from "next/image";

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
    accessorKey: "DateCreated",
    header: "Date Created",
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
    accessorKey: "transNumber",
    header: "Transaction Number",
  },
  {
    accessorKey: "locData",
    header: "Location Data",
  },

  {
    accessorKey: "locName",
    header: "Location Name",
  },

  {
    accessorKey: "moduleData",
    header: "Module Data",
    cell: (info) => {
      const value = info.getValue();
      let moduleLabel = "";
      let moduleClass = "";
      let Icon = null;

      switch (value) {
        case "0001":
          moduleLabel = "Wash";

          Icon = (
            <Image
              src={Wash}
              alt="Wash"
              className="w-10 h-10 inline-block mr-2"
            />
          );
          break;
        case "0002":
          moduleLabel = "Drop";

          Icon = (
            <Image
              src={Drop}
              alt="Drop"
              className="w-10 h-10 inline-block mr-2"
            />
          );
          break;
        case "0003":
          moduleLabel = "Keep";

          Icon = (
            <Image
              src={Keep}
              alt="Keep"
              className="w-10 h-10 inline-block mr-2"
            />
          );
          break;
        case "0004":
          moduleLabel = "Food";

          Icon = (
            <Image
              src={Food}
              alt="Food"
              className="w-10 h-10 inline-block mr-2"
            />
          );
          break;
        default:
          moduleLabel = "Unknown";
          Icon = <div className="w-10 h-10 inline-block mr-2 bg-gray-400" />;
          break;
      }

      return (
        <div className={`px-4 py-2 rounded-lg `}>
          {Icon}
          {moduleLabel}
        </div>
      );
    },
  },

  {
    accessorKey: "merchantPartner",
    header: "Merchant Partner",
  },

  {
    accessorKey: "mobileNumber",
    header: "Mobile Number",
  },
  {
    accessorKey: "receiverNumber",
    header: "Receiver Number",
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: (info) => {
      const value = info.getValue();
      return (
        <Badge
          variant="outline" // Use the outline variant for Badge
          className={
            value === "1"
              ? "border-green-600 text-green-600"
              : "border-red-600 text-red-600"
          }
        >
          {value === "1" ? "Paid" : "Unpaid"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "transStatus",
    header: "Transaction Status",
    cell: (info) => {
      const value = info.getValue();
      let badgeClass = "";
      let status = "";

      switch (value) {
        case "1":
          badgeClass = "border-yellow-600 text-yellow-600";
          status = "Preparing";
          break;
        case "2":
          badgeClass = "border-yellow-600 text-yellow-600";
          status = "EditOrder";
          break;
        case "3":
          badgeClass = "border-red-600 text-red-600";
          status = "For Return";
          break;
        case "4":
          badgeClass = "border-yellow-600 text-yellow-600";
          status = "Pick Up";
          break;
        case "5":
          badgeClass = "border-green-600 text-green-600";
          status = "Completed";
          break;
        default:
          badgeClass = "border-gray-600 text-gray-600";
          status = "Unknown";
      }

      return (
        <Badge variant="outline" className={badgeClass}>
          {status}
        </Badge>
      );
    },
  },

  {
    accessorKey: "checkinTime",
    header: "Check-in Time",
    cell: (info) => formatDate(info.getValue()),
  },
  {
    accessorKey: "DateRecieve",
    header: "Date Received",
    cell: (info) => formatDate(info.getValue()),
  },
  {
    accessorKey: "DateDrop",
    header: "Date Drop",
    cell: (info) => formatDate(info.getValue()),
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",
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
    accessorKey: "doorSize",
    header: "Door Size",
  },

  {
    accessorKey: "qpin",
    header: "QPIN",
  },

  {
    accessorKey: "booking_Origin",
    header: "Booking Origin",
    cell: (info) => {
      const value = info.getValue();
      return (
        <div>
          {(value === "1" && "Locker") ||
            (value === "2" && "Web") ||
            (value === "3" && "Mobile App")}
        </div>
      );
    },
  },
  {
    accessorKey: "milestone",
    header: "Milestone",
    cell: (info) => {
      const milestoneData = info.getValue();

      return Array.isArray(milestoneData) && milestoneData.length > 0 ? (
        <MilestoneModal milestoneData={milestoneData} />
      ) : (
        "N/A"
      );
    },
  },
];
