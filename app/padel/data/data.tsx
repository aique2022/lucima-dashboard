import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";
import { TicketPriority, TicketStatus, TransStatus } from "./enum";

export const transStatus = [
  {
    value: TransStatus.Pending,
    label: "Pending",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: TransStatus.Hold,
    label: "Hold",
    icon: StopwatchIcon,
  },
  {
    value: TransStatus.Completed,
    label: "Completed",
    icon: CheckCircledIcon,
  },
];

export const priorities = [
  {
    value: TicketPriority.Low,
    label: "Low",
    icon: ArrowDownIcon,
  },
  {
    value: TicketPriority.Medium,
    label: "Medium",
    icon: ArrowRightIcon,
  },
  {
    value: TicketPriority.High,
    label: "High",
    icon: ArrowUpIcon,
  },
];
