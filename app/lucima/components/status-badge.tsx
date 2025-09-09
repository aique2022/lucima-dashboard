import { Badge } from "@/components/ui/badge";

type StatusType = "READY_FOR_PICKUP" | "COMPLETED";

interface StatusConfig {
  label: string;
  color: string;
}

const statusConfig: Record<StatusType, StatusConfig> = {
  READY_FOR_PICKUP: {
    label: "Ready for pickup",
    color: "bg-orange-500 text-white",
  },
  COMPLETED: {
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
