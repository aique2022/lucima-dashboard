import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CirclePlusIcon } from "lucide-react";

interface ServiceOption {
  label: string;
  value: string;
}

interface StatusFilterProps {
  label: string;
  serviceOptions: ServiceOption[];
  moduleData: string[];
  setModuleData: React.Dispatch<React.SetStateAction<string[]>>;
  handleSelectService: (status: string, isChecked: boolean) => void;
}

export function ServiceFilter({
  label,
  serviceOptions,
  moduleData,
  setModuleData,
  handleSelectService,
}: StatusFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="h-10 border-dashed">
          <CirclePlusIcon className="mr-2 h-4 w-4" />
          {label}:{" "}
          {moduleData.length > 0 &&
            serviceOptions
              .filter((option) => moduleData.includes(option.value))
              .map((option) => option.label)
              .join(", ")}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <div className="space-y-2 p-2">
          {serviceOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent cursor-pointer"
            >
              <Checkbox
                checked={moduleData.includes(option.value)}
                onCheckedChange={(checked: boolean) =>
                  handleSelectService(option.value, checked)
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
