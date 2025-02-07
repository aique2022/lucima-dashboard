import { Badge } from "@/components/ui/badge";

type StatusType =
  | "for-confirmation"
  | "for-pickup"
  | "in-logistics"
  | "rider-dropped"
  | "processing"
  | "processed"
  | "rider-pickup"
  | "merchant-pickup"
  | "out-for-delivery"
  | "dropped"
  | "completed";

interface StatusConfig {
  label: string;
  color: string;
}

const statusConfig: Record<StatusType, StatusConfig> = {
  "for-confirmation": {
    label: "For Confirmation",
    color: "bg-blue-500 text-white",
  },
  "for-pickup": {
    label: "For Pick-up",
    color: "bg-orange-500 text-white",
  },
  "in-logistics": {
    label: "In Logistics",
    color: "bg-orange-500 text-white",
  },
  "rider-dropped": {
    label: "Rider Dropped-off",
    color: "bg-emerald-500 text-white",
  },
  processing: {
    label: "Processing",
    color: "bg-blue-500 text-white",
  },
  processed: {
    label: "Processed",
    color: "bg-emerald-500 text-white",
  },
  "rider-pickup": {
    label: "Rider Pick-up",
    color: "bg-orange-500 text-white",
  },
  "merchant-pickup": {
    label: "Merchant Pick-up Confirm",
    color: "bg-emerald-500 text-white",
  },
  "out-for-delivery": {
    label: "Out for Delivery",
    color: "bg-orange-500 text-white",
  },
  dropped: {
    label: "Dropped",
    color: "bg-orange-500 text-white",
  },
  completed: {
    label: "Completed",
    color: "bg-emerald-500 text-white",
  },
};

interface StatusBadgeProps {
  status: StatusType;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] || {
    label: "Unknown",
    color: "border-gray-500 text-gray-500 bg-gray-50",
  };

  return (
    <Badge variant="outline" className={config.color}>
      {config.label}
    </Badge>
  );
}
