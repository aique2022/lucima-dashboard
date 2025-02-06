import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

interface MilestoneData {
  mlocData?: string; // Optional properties
  qpin: string;
  dSize: string;
  moduleData: string;
  tStatus: string;
  mDateCreated: string;
}

interface MilestoneModalProps {
  milestoneData: MilestoneData[];
}

const getStatusDetails = (status: string) => {
  switch (status) {
    case "1":
      return {
        label: "Pending",
        icon: <Clock className="h-4 w-4" />,
        color: "bg-yellow-100 text-yellow-800",
      };
    case "4":
      return {
        label: "Completed",
        icon: <CheckCircle2 className="h-4 w-4" />,
        color: "bg-green-100 text-green-800",
      };
    case "5":
      return {
        label: "Cancelled",
        icon: <XCircle className="h-4 w-4" />,
        color: "bg-red-100 text-red-800",
      };
    default:
      return {
        label: "Unknown",
        icon: <AlertCircle className="h-4 w-4" />,
        color: "bg-gray-100 text-gray-800",
      };
  }
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
        <Button variant="outline" size="sm">
          View History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            Transaction History
          </DialogTitle>
        </DialogHeader>
        <div className="mt-6 relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div className="space-y-6">
            {milestoneData.map((milestone, index) => {
              const status = getStatusDetails(milestone.tStatus);
              return (
                <div key={index} className="relative pl-10">
                  <div className="absolute left-2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                    {status.icon}
                  </div>
                  <div className="bg-white p-4 rounded-lg border shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge className={status.color}>{status.label}</Badge>
                        <span className="text-sm text-gray-500">
                          {formatDate(milestone.mDateCreated)}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        QPIN: {milestone.qpin}
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Location: </span>
                        {milestone.mlocData || "N/A"}
                      </div>
                      <div>
                        <span className="font-medium">Module: </span>
                        {milestone.moduleData || "N/A"}
                      </div>
                      <div>
                        <span className="font-medium">Door Size: </span>
                        {milestone.dSize || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
