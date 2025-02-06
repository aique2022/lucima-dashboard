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
        label: "Preparing ",
        icon: <Clock className="h-4 w-4 " />,
        color: "bg-yellow-100 text-yellow-800",
      };

    case "2":
      return {
        label: "Edit Order",
        icon: <Clock className="h-4 w-4 " />,
        color: "bg-yellow-100 text-yellow-800",
      };

    case "3":
      return {
        label: "For Return",
        icon: <Clock className="h-4 w-4 " />,
        color: "bg-yellow-100 text-yellow-800",
      };
    case "4":
      return {
        label: "Pick Up",
        icon: <CheckCircle2 className="h-4 w-4" />,
        color: "bg-green-100 text-green-800",
      };
    case "5":
      return {
        label: "Completed",
        icon: <XCircle className="h-4 w-4" />,
        color: "bg-green-100 text-green-800",
      };
    default:
      return {
        label: "",
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
        <div className="h-[400px] w-full rounded-md border px-2 py-4 overflow-y-auto">
          <div className="relative">
            <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gray-400" />{" "}
            <div className="space-y-6 relative">
              {" "}
              {/* Added relative */}
              {milestoneData
                .sort(
                  (a, b) =>
                    new Date(b.mDateCreated).getTime() -
                    new Date(a.mDateCreated).getTime()
                )
                .map((milestone, index) => {
                  const status = getStatusDetails(milestone.tStatus);
                  return (
                    <div
                      key={index}
                      className="relative pl-10 flex items-start"
                    >
                      {" "}
                      {/* Flex for alignment */}
                      <div
                        className="absolute left-4 top-8 -translate-y-1/2 w-6 h-6 rounded-full border-2 
                   text-white bg-green-600 flex items-center justify-center z-10"
                      />{" "}
                      {/* Dot aligned with content */}
                      <div className="bg-white p-4 rounded-lg border shadow-sm w-full">
                        {" "}
                        {/* Full width */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <Badge className={status.color}>
                              {status.label}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {formatDate(milestone.mDateCreated)}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            QPIN: {milestone.qpin}
                          </div>
                        </div>
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
