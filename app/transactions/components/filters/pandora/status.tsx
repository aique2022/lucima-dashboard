import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CirclePlusIcon } from "lucide-react";

interface StatusFilterProps {
  label: string;
  statusOptions: any[];
  selectedStatuses: string[];
  setSelectedStatuses: React.Dispatch<React.SetStateAction<string[]>>;
}

export function StatusFilter({
  label,
  statusOptions,
  selectedStatuses,
  setSelectedStatuses,
}: StatusFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 border-dashed">
          <CirclePlusIcon className="mr-2 h-4 w-4" />
          {label}:{" "}
          {selectedStatuses?.length > 0 ? selectedStatuses.join(", ") : ""}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="space-y-2 p-2">
          {statusOptions?.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent cursor-pointer"
            >
              <Checkbox
                checked={selectedStatuses.includes(option.value)}
                onCheckedChange={(checked: boolean) => {
                  setSelectedStatuses((prev: string[]) => {
                    return checked
                      ? [...prev, option.value]
                      : prev.filter((value) => value !== option.value);
                  });
                }}
              />
              <div className="flex flex-1 items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span>{option.value}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
