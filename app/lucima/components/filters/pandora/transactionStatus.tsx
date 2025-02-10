import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CirclePlusIcon } from "lucide-react";

interface TransactionStatusOption {
  label: string;
  value: string;
}

interface TransactionStatusFilterProps {
  label: string;
  transactionStatusOptions: TransactionStatusOption[];
  status: string;
  handleSelectTransStatus: (status: string, isChecked: boolean) => void;
}

export function TransactionStatusFilter({
  label,
  transactionStatusOptions,
  status,
  handleSelectTransStatus,
}: TransactionStatusFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 border-dashed">
          <CirclePlusIcon className="mr-2 h-4 w-4" />
          {label} <span className="text-gray-300">|</span>{" "}
          <span className="bg-gray-100 h-auto w-auto px-2 rounded-md dark:text-black">
            {status &&
              transactionStatusOptions
                .filter((option) => option.value === status)
                .map((option) => option.label)
                .join(", ")}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="space-y-2 p-2">
          {transactionStatusOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent cursor-pointer"
            >
              <Checkbox
                checked={status === option.value}
                onCheckedChange={(checked: boolean) =>
                  handleSelectTransStatus(option.value, checked)
                }
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
