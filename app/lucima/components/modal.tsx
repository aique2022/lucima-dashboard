import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";

interface MilestoneData {
  transactionId: string;
  status: string;
  createdAt: string;
}

interface MilestoneModalProps {
  milestoneData: MilestoneData[];
}

const transactionStatusOptions = [
  {
    label: "Ready for pickup",
    value: "READY_FOR_PICKUP",
    color: "bg-orange-600 text-white",
  },
  {
    label: "Completed",
    value: "COMPLETED",
    color: "bg-green-600 text-white",
  },
];

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusInfo = transactionStatusOptions.find(
    (option) => option.value === status
  ) || {
    label: "Unknown",
    color: "bg-gray-500 text-white",
  };

  return <Badge className={statusInfo.color}>{statusInfo.label}</Badge>;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export function MilestoneModal({ milestoneData }: MilestoneModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Transaction History
          </DialogTitle>
        </DialogHeader>
        <div className="h-[400px] w-full rounded-md border px-2 py-4 overflow-y-auto">
          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-400" />
            <div className="space-y-6 relative">
              {milestoneData
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((milestone, index) => {
                  const status = transactionStatusOptions.find(
                    (option) => option.value === milestone.status
                  ) || {
                    label: "Unknown",
                    color: "bg-gray-100 text-gray-800",
                  };

                  return (
                    <div
                      key={index}
                      className="relative pl-10 flex items-start"
                    >
                      <div className="absolute left-4 top-8 -translate-y-1/2 w-6 h-6 rounded-full border-2 text-white bg-green-600 flex items-center justify-center z-10" />
                      <div className="bg-white p-4 rounded-lg border shadow-sm w-full dark:bg-transparent">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2 text-md">
                            <StatusBadge status={milestone.status} />
                            <span className="text-sm text-gray-500">
                              {formatDate(milestone.createdAt)}
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 text-sm text-gray-500">
                          Transaction ID: {milestone.transactionId}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
