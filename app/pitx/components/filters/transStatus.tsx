import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CirclePlusIcon } from "lucide-react";

interface TransStatusOption {
  label: string;
  value: string;
}

interface TransactionStatusFilterProps {
  label: string;
  transStatusOptions: TransStatusOption[];
  transStatus: string[];
  handleSelectTransStatus: (status: string, isChecked: boolean) => void;
}

export function TransactionStatusFilter({
  label,
  transStatusOptions,
  transStatus,
  handleSelectTransStatus,
}: TransactionStatusFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 border-dashed">
          <CirclePlusIcon className="mr-2 h-4 w-4" />
          {label}:{" "}
          {transStatus.length > 0 &&
            transStatusOptions
              .filter((option) => transStatus.includes(option.value))
              .map((option) => option.label)
              .join(", ")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="space-y-2 p-2">
          {transStatusOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent cursor-pointer"
            >
              <Checkbox
                checked={transStatus.includes(option.value)}
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
